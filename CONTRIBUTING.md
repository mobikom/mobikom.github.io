# Contributing to Mobikom

Thank you for your interest in contributing to **[mobikom.bg](https://mobikom.bg/)**. 

This repository powers an ultra-lightweight, high-availability digital media network, employment infrastructure, and institutional web operations gateway. To protect the performance, security, and architectural integrity of the platform, all contributions must strictly adhere to our core engineering standards.

---

## ⚡ The Golden Rules of Our Architecture

1. **Zero External Dependencies & Static-First Execution:**
   * Do not introduce external JavaScript libraries, frameworks (React, Vue, Angular, jQuery), or third-party CDNs.
   * All client-side code must be vanilla, isolated, and dormant by default (0-JS default policy).
   * Prioritize semantic HTML5 and modern CSS over programmatic DOM manipulation.

2. **The 512-Byte Principle & Packet Mechanics (RFC 6928):**
   * Keep document markup lean, semantic, and free of redundant wrapper `<div>` tags.
   * Core document payloads must resolve within initial TCP congestion windows (InitCwnd = 10 MSS / ~14.6 KB) to sustain sub-0.1s First Contentful Paint (FCP) and a 100/100 PageSpeed score.

3. **Zero Inline CSS & Strict CSP Level 3 Compliance:**
   * Never use `style="..."` inline attributes in HTML markup.
   * Never write inline `<script>...</script>` blocks.
   * All styling must derive strictly from classes defined in `assets/css/style.css` to comply with our edge `script-src 'self'` and `style-src 'self'` directives.

4. **Privacy by Design (Zero-Leak Architecture):**
   * Never introduce tracking pixels, third-party analytics cookies, or invasive telemetry scripts.
   * Maintain our strict institutional commitment to GDPR Article 25 compliance without client-side disk persistence (`localStorage`, `sessionStorage`, `IndexedDB`).

5. **Pure Modern CSS Standards:**
   * Layouts must utilize native CSS Grid Level 2 and Subgrid with graceful fallbacks.
   * Dual-width container paradigm: `.shell` (max 1100px for media hub, tools, and indexes) and `.shell-prose` (max 800px for academic monographs and legal declarations).
   * Do not import remote fonts (e.g., Google Fonts); style sheets rely strictly on native system font stacks (`system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`).
   * Theme colors must be declared via CSS Color Module 4 `light-dark()` tokens.

6. **Hermetic Outbound Link Isolation:**
   * Active hyperlinks (`<a>` tags) exist **exclusively** within the four owned network domains (`mobikom.bg`, `dobrichnews.com`, `dobruja.com`, `bestjobs.bg`).
   * All external vendors, institutions, and partners must remain plain semantic text to prevent PageRank leakage.

7. **Symmetrical Bilingual Mirroring:**
   * Every structural update made to the English pages (`/`) must be mirrored identically in the Bulgarian portal (`/bg/`).

---

## 🛠️ Contribution & Development Workflow

1. **Fork the Repository:**
   * Create your own fork of `github.com/mobikom/mobikom.bg` on GitHub.

2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/improvement-name
