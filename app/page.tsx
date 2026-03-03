"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [slug, setSlug] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (!trimmed) return;
    setIsNavigating(true);
    router.push(`/${trimmed}`);
  };

  return (
    <main className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="nav-brand">
            <div className="nav-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M12 11v6" />
                <path d="M9 14h6" />
              </svg>
            </div>
            <span className="nav-name">Bytes<span className="text-gradient">Share</span></span>
          </div>
          <div className="nav-links">
            <span className="nav-badge">Free &amp; Open</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Free online notepad &amp; clipboard
          </div>

          <h1 className="hero-title">
            Share text &amp; code across<br />
            <span className="text-gradient">any device, instantly</span>
          </h1>

          <p className="hero-desc">
            A free online notepad to instantly share text, code, and notes. Paste your content, get a shareable link in seconds — no sign-up, no install. Works on every device. Auto-expires in 24 hours.
          </p>

          {/* Main Input Card */}
          <form onSubmit={handleSubmit} className="hero-form">
            <div className="input-card">
              <label className="input-label" htmlFor="clip-name-input">Create or access a clip</label>
              <div className="input-group">
                <span className="input-prefix">bytesshare/</span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="your-clip-name"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  maxLength={64}
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Clip name"
                  id="clip-name-input"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={!slug.trim() || isNavigating}
                id="go-button"
              >
                {isNavigating ? (
                  <>
                    <span className="spinner" />
                    Opening…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                    Open Clip
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrap cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3>Lightning Fast</h3>
            <p>No sign-up, no apps to install. Create a clip in under 3 seconds and share instantly.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>Cross-Device</h3>
            <p>Works on any browser — phone, tablet, laptop, desktop. Paste on one, read on another.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrap green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Auto-Expires</h3>
            <p>Every clip self-destructs after 24 hours. Your data never stays longer than it needs to.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <h2 className="section-title">How it works</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-num">1</div>
            <div className="how-body">
              <h4>Pick a name</h4>
              <p>Choose any clip name like <code>meeting-notes</code> or <code>wifi-password</code>.</p>
            </div>
          </div>
          <div className="how-connector">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <div className="how-step">
            <div className="how-num">2</div>
            <div className="how-body">
              <h4>Paste your text</h4>
              <p>Write or paste anything — code snippets, links, notes, passwords.</p>
            </div>
          </div>
          <div className="how-connector">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <div className="how-step">
            <div className="how-num">3</div>
            <div className="how-body">
              <h4>Access anywhere</h4>
              <p>Open the same URL on any device and your content is right there.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <p>Ready to share?</p>
        <a href="#clip-name-input" className="btn btn-primary"
          onClick={(e) => { e.preventDefault(); document.getElementById('clip-name-input')?.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          Start a clip
        </a>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <span>Bytes Share — Your instant internet clipboard</span>
      </footer>
    </main>
  );
}
