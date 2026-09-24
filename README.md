# Mobikom | High-Availability Web Operations & Digital Media Network

[![Website Status](https://img.shields.io/website-up-down-green-red/https/mobikom.bg.svg)](https://mobikom.bg/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Lighthouse: 100/100](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen.svg)](https://pagespeed.web.dev/)
[![Privacy: Zero--Tracking](https://img.shields.io/badge/Privacy-Zero--Tracking-success.svg)](https://mobikom.bg/privacy/)

Production repository for **[mobikom.bg](https://mobikom.bg/)** — an ultra-fast, zero-dependency digital media network, employment infrastructure, and corporate governance platform operating across Bulgaria, directed autonomously by Mobikom Operations Directorate.

Engineered as an open-source (MIT) reference architecture demonstrating how modern static web systems and diagnostic tools should be built: mathematically deterministic, battery-friendly, strictly privacy-engineered, and free of runtime bloat.

---

## 🏛️ Digital Media Network & Key Properties

The network directs four primary domains, maintaining strict operational separation between technical infrastructure, advertising syndication, and independent newsrooms:

* **[bestjobs.bg](https://bestjobs.bg)** — High-efficiency online job advertising and career classifieds board operating without intermediary recruiter fees.
* **[dobrichnews.com](https://www.dobrichnews.com)** — Regional daily digital news publication delivering verified public-interest journalism and civic reporting to Northeastern Bulgaria.
* **[dobruja.com](https://www.dobruja.com)** — Regional cultural journal, agricultural review, and community archive preserving the heritage of the Dobruja region.
* **[mobikom.bg](https://mobikom.bg)** — Central operational network gateway, telecommunications archive (1992 NMT-450 analog cellular network), scientific monograph repository, and open-source developer suite.

---

## ⚡ Core Engineering Principles

* **The 512-Byte Web Principle (RFC 6928):** Core document payloads resolve within the TCP Initial Congestion Window (`InitCwnd = 10 MSS` / ~14.6 KB), achieving $RTT = 1$ delivery and sub-0.1s First Contentful Paint (FCP) over degraded mobile and rural connectivity.
* **Zero External Dependencies:** 0 bytes of JavaScript frameworks, no third-party CDNs, zero tracking pixels, and no remote Google Fonts calls. Powered strictly by native system typography (`system-ui`).
* **Pure CSS Grid Level 2 & Subgrid:** Implements a native 4-track subgrid (`grid-auto-rows: auto auto 1fr auto;` and `grid-template-rows: subgrid;`) locking card categories, titles, descriptions, and action links onto identical baselines across viewports without client-side scripts.
* **CSS Color Module 4 `light-dark()`:** Dynamic color tokens declared natively without media-query selector duplication, decreasing stylesheet byte payload and parse overhead.
* **Universal Pattern 2 Prose Shell:** The entire domain relies on a unified, high-legibility typographic shell (`--max-w: 800px`, 1.05rem base, 1.65 fluid leading) with **Zero Inline CSS** for seamless layout transitions.
* **Zero `!important` Architecture:** Specificity is managed naturally through cascade layers and scoped layout containers.
* **Strict SEO Juice Isolation:** Active external links exist **exclusively** within the owned network ecosystem. All external institutions and vendors remain plain semantic text, eliminating PageRank leakage.
* **Dormant Search / 0-JS Default:** Client-side JavaScript execution is dormant by default, guaranteeing zero main-thread parse latency and zero battery drain.
* **Privacy by Default (GDPR Article 25):** 100% compliant by architecture. Zero tracking cookies, zero persistent storage identifiers (`localStorage` / `sessionStorage`), and no cookie consent banners needed.

---

## 🛡️ Edge Security & Infrastructure Architecture (Mil-Spec)

The public edge infrastructure for **mobikom.bg** is hardened according to **Maximum Government and Military-Grade (Zero-Trust)** isolation baselines. The domain operates entirely via an immutable static architecture deployed via GitHub Pages and proxied through **Cloudflare Edge**, leaving no exposed backend origin database or attack surface.

### 🔒 Cryptography & Transport Security
* **Minimum TLS Version:** `TLS 1.3 Only`. Legacy handshakes (TLS 1.0, 1.1, and 1.2) are permanently dropped at the boundary, forcing Perfect Forward Secrecy (PFS).
* **HTTP Strict Transport Security (HSTS):** Enforced with `max-age=63072000` (2 years), including `includeSubDomains` and `preload` arrays. Client endpoints are cryptographically blocked from ever initiating an unencrypted plain-text connection.
* **DNSSEC:** Cryptographically enabled and bonded with the registry via DS (Delegation Signer) records to eliminate DNS hijacking and cache-poisoning threats.
* **Automatic HTTPS Rewrites & Opportunistic Encryption:** Configured `ON` to mandate absolute end-to-end transport layer security.

### 🛡️ Web Application Firewall (WAF) Behavioral Fencing
The network operates two highly optimized behavior-driven perimeter rules, designed to allow **100% global organic traffic growth** while instantly dropping reconnaissance infrastructure:

* **Rule 1: Global Traffic Threat Mitigation**
  * *Expression:* `(not cf.client.bot)`
  * *Action:* `Managed Challenge`
  * *Purpose:* Enforces a silent verification check against all non-verified traffic to drop rogue automated botnets while permitting legitimate global users and whitelisted search engines.
* **Rule 2: Anti-Reconnaissance & Asset Protection**
  * *Expression:* `(not cf.client.bot and (http.user_agent contains "curl" or http.user_agent contains "wget" or http.user_agent contains "python" or http.request.uri.path contains ".env" or http.request.uri.path contains ".git" or http.request.uri.path contains "wp-admin"))`
  * *Action:* `Block`
  * *Purpose:* Instantly drops common vulnerability mapping tools and bad user-agents attempting directory traversals.

### 💡 Advanced Edge Transform Rules (Privacy Sandbox)
Custom response headers are injected directly at the Cloudflare Edge to sandbox the visitor's browser environment and prevent metadata or telemetry leakage:

* **`Content-Security-Policy`:** Strict Level 3 policy (`default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'none'; child-src 'none'; worker-src 'self'; manifest-src 'self'; frame-ancestors 'none'; form-action 'none'; base-uri 'none'; upgrade-insecure-requests; require-trusted-types-for 'script'; trusted-types default;`).
* **`Permissions-Policy`:** Set to `accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), interest-cohort=()`. Completely air-gaps the site from local hardware or tracking frameworks.
* **`Referrer-Policy`:** Set strictly to `no-referrer`. Zero internal paths or referral metadata strings are transmitted downstream.
* **`X-Frame-Options`:** Set strictly to `DENY` to neutralize advanced Clickjacking and UI-redressing methods.
* **`X-Content-Type-Options`:** Set to `nosniff` to block browser MIME-sniffing execution exploits.
* **`Cross-Origin Isolation`:** Hardened via `require-corp`, `same-origin` (COOP/CORP).

### 📈 SEO Continuity Framework
All custom firewall vectors explicitly whitelist the cryptographic `cf.client.bot` identifier. This ensures that verified global indexing crawlers (Googlebot, Bingbot) navigate the lightweight, semantic HTML skeleton unimpeded, preserving and maximizing the deep historical link equity ("SEO juice") feeding child digital networks like **bestjobs.bg**, **dobrichnews.com**, and **dobruja.com**.

---

## 🛠️ The Mobikom Engineering & Content Suite (`/tools/`)

The platform features 21 specialized diagnostic linters and sanitizers operating on a **Decentralized Client-Compute Architecture**:
* **Unlimited Capacity:** Executes directly on the visitor's local CPU and RAM via WebAssembly and HTML5 Web Streams (no artificial 100-page limits or paywalls).
* **100% Privacy by Design (GDPR Art. 25):** Zero bytes uploaded to remote servers. Unreleased manuscripts, trade secrets, and signed contracts remain strictly on the user's machine.
* **Open-Source Standard (MIT License):** Full transparency, zero telemetry, and zero tracking cookies.

### 1. Transport Layer, Speed & 512-Byte Web
* **[Scanner 1: 512-Byte & Head Auditor](/tools/head-auditor/):** Audits HTML `<head>` markup against the 512-byte boundary; strips marketing metadata bloat.
* **[Scanner 5: Edge Cache & Global Freshness](/tools/cache-freshness/):** Diagnoses stale code delivery; audits Cloudflare `CF-Cache-Status`, `Age`, and `Cache-Control`.
* **[Scanner 6: DoH Live DNS Propagation](/tools/dns-propagation/):** Real-time global DNS query for A, AAAA, MX, and TXT records across Cloudflare (1.1.1.1) and Google (8.8.8.8) Anycast DNS-over-HTTPS resolvers.
* **[Scanner 7: Redirect Chain & Trailing Slash](/tools/redirect-chain/):** Identifies multi-hop redirect cascades ($hops > 1$) and provides 1-click rules to collapse latency into a single direct hop.
* **[Scanner 9: Font Bloat & System Font Stack](/tools/font-analyzer/):** Eliminates Flash of Invisible Text (FOIT) and provides a 0-byte Native System Font Stack.
* **[Scanner 10: DOM Depth & Div-Soup Inspector](/tools/dom-inspector/):** Measures HTML tree depth and total node counts against Google Lighthouse thresholds.
* **[Scanner 14: Digital Decarbonization & CO2 Auditor](/tools/carbon-audit/):** Official W3C WSG carbon footprint calculator for web documents.

### 2. Cybersecurity, Privacy & Legal Guard
* **[Scanner 3: Security Headers & CSP Level 3](/tools/security-headers/):** Audits Layer 7 transport headers with ready-to-deploy Cloudflare Transform Rules and Nginx configurations.
* **[Scanner 4: Privacy & GDPR Tracker Inspector](/tools/privacy-tracker/):** Identifies third-party ad pixels, session recorders, and assesses mandatory consent banner obligations.
* **[Scanner 11: Mixed Content & Insecure Resources](/tools/mixed-content/):** Detects unencrypted `http://` scripts, forms, and assets that compromise browser TLS padlocks.
* **[Scanner 12: DMARC, SPF & Mail Security](/tools/mail-hardener/):** Live DoH query enforcing strict DMARC `p=reject` to protect domain email from spoofing.
* **[Scanner 13: Robots.txt & Sitemap Disaster Checker](/tools/robots-auditor/):** Catches accidental `Disallow: /` staging traps and administrative endpoint leaks.
* **[Scanner 16: PII, Secrets & Data Leak Inspector](/tools/text-pii-leak/):** Mathematical verification of national IDs (Bulgarian EGN Modulo 11), IBAN accounts, and cloud API keys with 1-click GDPR redaction.
* **[Scanner 17: QES Electronic Signature Validator](/tools/signature-validator/):** Verifies cryptographic authenticity of signed PDF documents (PAdES / eIDAS), detects fake stamp graphics, and audits post-signing tamper integrity.

### 3. Code Architecture, Design & Brand Identity
* **[Scanner 2: Link & Media Guard](/tools/link-guard/):** Reverse Tabnabbing mitigation (`rel="noopener noreferrer"`) and audit of mandatory WCAG alt and title attributes.
* **[Scanner 8: CSS Bloat & Specificity Auditor](/tools/css-auditor/):** Detects destructive `!important` rules, blocking `@import` statements, color drift, and legacy vendor prefixes.
* **[Logo, Favicon & BIMI 1.2 Studio](/tools/logo-studio/):** Eliminates blurry favicons and dark background matting. Generates strict **BIMI SVG Tiny 1.2 (P/S)** vectors for verified Gmail and Apple Mail inboxes.

### 4. Media, Education & Streaming Operations
* **[Scanner 15: Audiobook & Textbook Sanitizer (Unlimited)](/tools/audiobook-cleaner/):** Ingests PDF, TXT, HTML, and RTF textbooks of unlimited length. Strips page numbers, citation brackets, joins hyphenated breaks, and expands scientific formulas into smooth natural speech.
* **[Scanner 15-B: Scanned PDF to Audiobook (OCR)](/tools/pdf-ocr/):** Client-side Optical Character Recognition from scanned textbook images and camera photocopies directly in browser RAM.
* **[Scanner 18: EXIF & GPS Privacy Hunter](/tools/image-exif-privacy/):** Detects hidden geographic coordinates and camera hardware serials in photos. 1-click metadata stripping.
* **[Scanner 19: Image Dimension & WebP Budget](/tools/image-budget/):** Downsamples multi-megabyte images to ~40 KB for 800px containers without visual loss. Eliminates Cumulative Layout Shift (CLS).
* **[Scanner 20: Web Video & Mobile Readiness Linter](/tools/video-readiness/):** Prevents iOS Safari fullscreen hijacking (`playsinline`), eliminates parasitic background data drain, and validates EAA subtitles.
* **[Scanner 21: Video Bitrate & Carbon Drain](/tools/video-bandwidth/):** Optimizes streaming bitrates, prevents mobile buffering, and outputs production-ready two-pass FFmpeg commands.

---

## 🧭 Site Directory & Symmetrical Information Architecture

The website provides a 1:1 symmetrical English and Bulgarian dual-mirror architecture across all endpoints:

| English Route | Bulgarian Mirror | Pattern | Purpose |
| :--- | :--- | :---: | :--- |
| **[`/`](https://mobikom.bg/)** | **[`/bg/`](https://mobikom.bg/bg/)** | Pattern 2 (Prose) | Master institutional gateway & platform registry |
| **[`/about/`](https://mobikom.bg/about/)** | **[`/bg/about/`](https://mobikom.bg/bg/about/)** | Pattern 2 (Prose) | Telecom history: NMT-450 (`#nmt-450`), Pagers (`#pagers-mobika`), and 2011 founding |
| **[`/about/governance/`](https://mobikom.bg/about/governance/)** | **[`/bg/about/governance/`](https://mobikom.bg/bg/about/governance/)** | Pattern 2 (Prose) | Media transparency, corporate charters & Board Governance |
| **[`/portfolio/`](https://mobikom.bg/portfolio/)** | **[`/bg/portfolio/`](https://mobikom.bg/bg/portfolio/)** | Pattern 2 (Prose) | Technical Passports for dobrichnews, dobruja, bestjobs, and Sea Stars archive |
| **[`/blog/`](https://mobikom.bg/blog/)** | **[`/bg/blog/`](https://mobikom.bg/bg/blog/)** | Pattern 2 (Prose) | Insights index & technical monographs catalog |
| **[`/blog/manifesto-512/`](https://mobikom.bg/blog/manifesto-512/)** | **[`/bg/blog/manifesto-512/`](https://mobikom.bg/bg/blog/manifesto-512/)** | Pattern 2 (Prose) | The 512-Byte Web Architecture Whitepaper |
| **[`/blog/phd-philosophy/`](https://mobikom.bg/blog/phd-philosophy/)** | **[`/bg/blog/phd-philosophy/`](https://mobikom.bg/bg/blog/phd-philosophy/)** | Pattern 2 (Prose) | The Web Asceticism Matrix (5 Independent Academic Dissertations) |
| **[`/blog/computer-memory/`](https://mobikom.bg/blog/computer-memory/)** | **[`/bg/blog/computer-memory/`](https://mobikom.bg/bg/blog/computer-memory/)** | Pattern 2 (Prose) | Hardware Architecture & Volatile RAM Execution |
| **[`/blog/seastars/`](https://mobikom.bg/blog/seastars/)** | **[`/bg/blog/seastars/`](https://mobikom.bg/bg/blog/seastars/)** | Pattern 2 (Prose) | Pomorie lye balneology & BAS biochemical monograph |
| **[`/blog/dobruja/`](https://mobikom.bg/blog/dobruja/)** | **[`/bg/blog/dobruja/`](https://mobikom.bg/bg/blog/dobruja/)** | Pattern 2 (Prose) | 2011 Linux streaming media chronicle & Red5 clusters |
| **[`/blog/advertising/`](https://mobikom.bg/blog/advertising/)** | **[`/bg/blog/advertising/`](https://mobikom.bg/bg/blog/advertising/)** | Pattern 2 (Prose) | Zero-Cookie Sponsorship Economics |
| **[`/blog/nmt-450-retrospective/`](https://mobikom.bg/blog/nmt-450-retrospective/)** | **[`/bg/blog/nmt-450-retrospective/`](https://mobikom.bg/bg/blog/nmt-450-retrospective/)** | Pattern 2 (Prose) | 1992 RTC Mobikom Analogue History & Cellular Pioneer |
| **[`/tools/`](https://mobikom.bg/tools/)** | **[`/bg/tools/`](https://mobikom.bg/bg/tools/)** | Pattern 2 (Prose) | Developer & Content Engineering Suite Master Hub (21 Tools) |
| **[`/contact/`](https://mobikom.bg/contact/)** | **[`/bg/contact/`](https://mobikom.bg/bg/contact/)** | Pattern 2 (Prose) | Direct communications desk, Postbank IBAN & operations routing |
| **[`/privacy/`](https://mobikom.bg/privacy/)** | **[`/bg/privacy/`](https://mobikom.bg/bg/privacy/)** | Pattern 2 (Prose) | Zero-cookie architectural privacy declaration |
| **[`/terms/`](https://mobikom.bg/terms/)** | **[`/bg/terms/`](https://mobikom.bg/bg/terms/)** | Pattern 2 (Prose) | Terms of use & open-source MIT code permissions |
| **[`/gdpr/`](https://mobikom.bg/gdpr/)** | **[`/bg/gdpr/`](https://mobikom.bg/bg/gdpr/)** | Pattern 2 (Prose) | EU Regulation 2016/679 statutory data rights declaration |

---

## 📬 Corporate Communications

To prevent automated profiling and spam scraping, all correspondence is handled directly without third-party form widgets:

* **General Operations & Inquiries:** `desk@mobikom.bg`
* **Technical Infrastructure & Security:** `ops@mobikom.bg`

---

## ☕ Support & Sponsorship

If you wish to support independent public-interest web infrastructure, open-source standards, and zero-tracking regional journalism:

* **[Direct Stripe Settlement Checkout](https://buy.stripe.com/7sYdR8epV9RP4cCfDJ2B200)** &mdash; Fast, secure card checkout via Stripe.
* **[Institutional Desk Wire / Banking](https://mobikom.bg/contact/)** &mdash; Direct transfer via the Operations Desk.

---

## 📜 License & Intellectual Property

* **Web Architecture, Scanners & Code:** Released globally under the open-source **[MIT License](LICENSE)**.
* **Journalistic Content, Trademarks & Media Archives:** &copy; 2011&ndash;2026 Mobikom Bulgaria. All rights reserved across `dobrichnews.com`, `dobruja.com`, and `bestjobs.bg`.

```text
© 2026 mobikom.bg. Open-source under MIT License (github.com/mobikom). Zero-cookie architecture.
