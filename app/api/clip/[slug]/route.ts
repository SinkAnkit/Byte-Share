import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const MAX_CLIP_SIZE = 50_000;
const TTL_SECONDS = 86_400;

function clipKey(slug: string) {
    return `clip:${slug}`;
}

function hashPassword(password: string): string {
    return createHash("sha256").update(password).digest("hex");
}

interface ClipData {
    content: string;
    passwordHash?: string;
}

// GET — Retrieve clip (returns protected flag, withholds content if locked)
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const data = await redis.get<ClipData>(clipKey(slug));

        if (!data) {
            return NextResponse.json({ slug, exists: false, content: null });
        }

        // If password-protected, don't return content
        if (data.passwordHash) {
            return NextResponse.json({
                slug,
                exists: true,
                protected: true,
                content: null,
            });
        }

        return NextResponse.json({
            slug,
            exists: true,
            protected: false,
            content: data.content,
        });
    } catch (error) {
        console.error("GET clip error:", error);
        return NextResponse.json(
            { error: "Failed to retrieve clip" },
            { status: 500 }
        );
    }
}

// POST — Save clip or unlock a protected clip
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        // --- Unlock mode: verify password and return content ---
        if (body.action === "unlock") {
            const { password } = body;
            if (!password) {
                return NextResponse.json(
                    { error: "Password required" },
                    { status: 400 }
                );
            }

            const data = await redis.get<ClipData>(clipKey(slug));
            if (!data) {
                return NextResponse.json(
                    { error: "Clip not found" },
                    { status: 404 }
                );
            }

            if (!data.passwordHash || hashPassword(password) !== data.passwordHash) {
                return NextResponse.json(
                    { error: "Incorrect password" },
                    { status: 403 }
                );
            }

            return NextResponse.json({
                slug,
                unlocked: true,
                content: data.content,
            });
        }

        // --- Save mode ---
        const { content, password } = body;

        if (typeof content !== "string") {
            return NextResponse.json(
                { error: "Content must be a string" },
                { status: 400 }
            );
        }

        if (content.length > MAX_CLIP_SIZE) {
            return NextResponse.json(
                { error: `Content exceeds maximum size of ${MAX_CLIP_SIZE} characters` },
                { status: 413 }
            );
        }

        const clipData: ClipData = { content };
        if (password && typeof password === "string" && password.length > 0) {
            clipData.passwordHash = hashPassword(password);
        }

        await redis.set(clipKey(slug), clipData, { ex: TTL_SECONDS });

        return NextResponse.json({
            slug,
            saved: true,
            protected: !!clipData.passwordHash,
            expiresIn: TTL_SECONDS,
        });
    } catch (error) {
        console.error("POST clip error:", error);
        return NextResponse.json(
            { error: "Failed to save clip" },
            { status: 500 }
        );
    }
}

// DELETE — Remove clip
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await redis.del(clipKey(slug));

        return NextResponse.json({ slug, deleted: true });
    } catch (error) {
        console.error("DELETE clip error:", error);
        return NextResponse.json(
            { error: "Failed to delete clip" },
            { status: 500 }
        );
    }
}
