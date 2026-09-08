<!--
  ==============================================================================
  FILE: README.md
  PROJECT: mobikom.bg — Master Institutional Portal & Open-Source Engine
  LICENSE: MIT (https://opensource.org/licenses/MIT)
  AUTHOR: Stoyan Stoyanov / Mobikom Bulgaria (mobikom.bg)
  STANDARDS: CSS Grid Level 2 (Subgrid) • CSS Color 4 • W3C Semantic HTML5
  COMPLIANCE: Strict CSP Level 3 • Zero Trackers • Zero Cookies • GDPR Compliant
  ==============================================================================
  DESCRIPTION:
  Comprehensive technical documentation, architectural manifesto, network asset
  directory, and operational guide for the open-source mobikom.bg repository.
  ==============================================================================
-->

# Mobikom | High-Availability Web Operations & Digital Media Network

[![Website Status](https://img.shields.io/website-up-down-green-red/https/mobikom.bg.svg)](https://mobikom.bg/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Lighthouse: 100/100](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen.svg)](https://pagespeed.web.dev/)
[![Privacy: Zero--Tracking](https://img.shields.io/badge/Privacy-Zero--Tracking-success.svg)](https://mobikom.bg/privacy/)

Production repository for **[mobikom.bg](https://mobikom.bg/)** — an ultra-fast, zero-dependency digital media network, employment infrastructure, and corporate governance platform operating across Bulgaria.

Engineered as an open-source (MIT) reference architecture demonstrating how modern static web systems should be built: mathematically deterministic, battery-friendly, strictly privacy-engineered, and free of runtime bloat.

---

## 🏛️ Digital Media Network & Key Properties

The network directs four primary domains, maintaining strict operational separation between technical infrastructure, advertising syndication, and independent newsrooms:

* **[bestjobs.bg](https://bestjobs.bg)** — High-efficiency online job advertising and career classifieds board operating without intermediary recruiter fees.
* **[dobrichnews.com](https://www.dobrichnews.com)** — Regional daily digital news publication delivering verified public-interest journalism and civic reporting to Northeastern Bulgaria.
* **[dobruja.com](https://www.dobruja.com)** — Regional cultural journal, agricultural review, and community archive preserving the heritage of the Dobruja region.
* **[mobikom.bg](https://mobikom.bg)** — Central operational network gateway, telecommunications archive (1992 NMT-450 analog cellular network), and scientific monograph repository.

---

## ⚡ Core Engineering Principles

* **The 512-Byte Principle:** Minimalist markup and zero runtime bloat delivering sub-second First Contentful Paint (FCP) and optimal energy efficiency.
* **Zero External Dependencies:** 0 bytes of JavaScript frameworks, no third-party CDNs, zero tracking pixels, and no remote Google Fonts calls. Powered strictly by native system typography (`system-ui`).
* **Pure CSS Grid Level 2 & Subgrid:** Implements a native 4-track subgrid (`grid-auto-rows: auto auto 1fr auto;` and `grid-template-rows: subgrid;`) locking card categories, titles, descriptions, and action links onto identical baselines across viewports without client-side scripts.
* **CSS Color Module 4 `light-dark()`:** Dynamic color tokens declared natively without media-query selector duplication, decreasing stylesheet byte payload and parse overhead.
* **Two Universal Structural Patterns:** The entire domain relies on only two layouts:
  1. *Pattern 1 (The Grid Engine):* `.shell` + `.grid-cards` with 4-track subgrid for indexes, directories, and portfolios.
  2. *Pattern 2 (The Prose Engine):* `.shell-prose` (max 760px) + `.prose` for editorial monographs, history, governance, contact, and legal declarations with **zero inline CSS**.
* **Zero `!important` Architecture:** Specificity is managed naturally through cascade layers and scoped layout containers.
* **Strict SEO Juice Isolation:** Active external links (`<a>` tags) exist **exclusively** within the 4 owned network domains (`mobikom.bg`, `dobrichnews.com`, `dobruja.com`, `bestjobs.bg`). All external institutions and vendors remain plain text, eliminating PageRank leakage.
* **Strict Single-Page A4 Print Engine:** The executive dossier (`/stoyanov/` and `/stoyanov/bg/`) features a rigid 2-track grid header (`grid-template-columns: 1fr 75px;`) locking the thumbnail photo to the top-right corner with zero text drop, calibrated to print strictly onto **1 single A4 page**.
* **Bilingual Transliteration Search (`search.js`):** Lightweight client-side search engine pre-indexing DOM elements via `textContent` (zero reflows) with multi-token AND logic and bidirectional Bulgarian Cyrillic &harr; Latin phonetic transliteration.
* **Privacy by Default:** 100% GDPR compliant by design. Zero tracking cookies, zero persistent identifiers, and no cookie consent banners needed.

---
## 🛡️ Edge Security & Infrastructure Architecture (Mil-Spec)

The public edge infrastructure for **mobikom.bg** is hardened according to **Maximum Government and Military-Grade (Zero-Trust)** isolation baselines. The domain operates entirely via an immutable serverless architecture deployed on **Cloudflare Pages**, leaving no exposed backend origin database or attack surface.

Below is the definitive configuration manifest maintained at the Cloudflare Edge network layer:

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
  * *Purpose:* Enforces a silent browser verification check against all non-verified traffic to drop rogue automated botnets while permitting legitimate global users and whitelisted search engines.
* **Rule 2: Anti-Reconnaissance & Asset Protection**
  * *Expression:* `(not cf.client.bot and (http.user_agent contains "curl" or http.user_agent contains "wget" or http.user_agent contains "python" or http.request.uri.path contains ".env" or http.request.uri.path contains ".git" or http.request.uri.path contains "wp-admin"))`
  * *Action:* `Block`
  * *Purpose:* Instantly drops common vulnerability mapping tools and bad user-agents attempting directory traversals.

### 💡 Advanced Edge Transform Rules (Privacy Sandbox)
Custom response headers are injected directly at the edge to sandbox the visitor's browser environment and prevent metadata or telemetry leakage:

* **`Permissions-Policy`:** Set to `accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), usb=(), interest-cohort=()`. Completely air-gaps the site from local hardware or tracking frameworks to eliminate device fingerprinting vectors.
* **`Referrer-Policy`:** Set strictly to `no-referrer`. Zero internal paths or referral metadata strings are transmitted downstream when links are clicked.
* **`X-Frame-Options`:** Set strictly to `DENY` to neutralize advanced Clickjacking and UI-redressing methods.
* **`X-Content-Type-Options`:** Set to `nosniff` to block browser MIME-sniffing execution exploits.

### 📈 SEO Continuity Framework
All custom firewall vectors explicitly whitelist the cryptographic `cf.client.bot` identifier. This ensures that verified global indexing crawlers (Googlebot, Bingbot) navigate the lightweight, semantic HTML skeleton unimpeded, preserving and maximizing the deep historical link equity ("SEO juice") feeding child digital networks like **bestjobs.bg**, **dobrichnews.com**, and **dobruja.com**.

---
## 🧭 Site Directory & Symmetrical Information Architecture

The website provides a 1:1 symmetrical English and Bulgarian dual-mirror architecture:

| English Route | Bulgarian Mirror | Pattern | Purpose |
| :--- | :--- | :---: | :--- |
| **[`/`](https://mobikom.bg/)** | **[`/bg/`](https://mobikom.bg/bg/)** | Pattern 1 (Grid) | Master network gateway & platform registry |
| **[`/about/`](https://mobikom.bg/about/)** | **[`/bg/about/`](https://mobikom.bg/bg/about/)** | Pattern 2 (Prose) | Telecom history: NMT-450 (`#nmt-450`), Pagers (`#pagers-mobika`), and 2011 founding (`#ostatus-2011`) |
| **[`/about/governance/`](https://mobikom.bg/about/governance/)** | **[`/bg/about/governance/`](https://mobikom.bg/bg/about/governance/)** | Pattern 2 (Prose) | Media transparency, editorial charters & Executive Leadership Bio |
| **[`/portfolio/`](https://mobikom.bg/portfolio/)** | **[`/bg/portfolio/`](https://mobikom.bg/bg/portfolio/)** | Pattern 1 (Grid) | Asset directory & Sea Stars archive (`#seastars`) |
| **[`/blog/`](https://mobikom.bg/blog/)** | **[`/bg/blog/`](https://mobikom.bg/bg/blog/)** | Pattern 1 (Grid) | Insights index & technical monographs directory |
| **[`/blog/seastars/`](https://mobikom.bg/blog/seastars/)** | **[`/bg/blog/seastars/`](https://mobikom.bg/bg/blog/seastars/)** | Pattern 2 (Prose) | Pomorie lye balneology & BAS biochemical monograph |
| **[`/stoyanov/`](https://mobikom.bg/stoyanov/)** | **[`/stoyanov/bg/`](https://mobikom.bg/stoyanov/bg/)** | ATS Single-Sheet | Stoyan Stoyanov Master Dossier & 1-page A4 print engine |
| **[`/contact/`](https://mobikom.bg/contact/)** | **[`/bg/contact/`](https://mobikom.bg/bg/contact/)** | Pattern 2 (Prose) | Direct communications desk & operations routing |
| **[`/privacy/`](https://mobikom.bg/privacy/)** | **[`/bg/privacy/`](https://mobikom.bg/bg/privacy/)** | Pattern 2 (Prose) | Zero-cookie architectural privacy declaration |
| **[`/terms/`](https://mobikom.bg/terms/)** | **[`/bg/terms/`](https://mobikom.bg/bg/terms/)** | Pattern 2 (Prose) | Terms of use & open-source MIT code permissions |
| **[`/gdpr/`](https://mobikom.bg/gdpr/)** | **[`/bg/gdpr/`](https://mobikom.bg/bg/gdpr/)** | Pattern 2 (Prose) | EU Regulation 2016/679 statutory data rights declaration |

---

## 📬 Corporate Communications

To prevent automated profiling and spam scraping, all correspondence is handled directly without third-party form widgets:

* **General Operations & Inquiries:** `desk@mobikom.bg`
* **Technical Infrastructure & Security:** `ops@mobikom.bg`
* **Executive Desk & Management (Stoyan Stoyanov):** `stoyanov@mobikom.bg`

---

## 📜 License & Intellectual Property

* **Web Architecture & Source Code:** Released globally under the open-source **[MIT License](LICENSE)**.
* **Journalistic Content, Trademarks & Media Archives:** &copy; 2011&ndash;2026 Mobikom Bulgaria & Stoyan Stoyanov. All rights reserved across `dobrichnews.com`, `dobruja.com`, and `bestjobs.bg`.

---

## ☕ Support & Sponsorship

If you wish to support independent public-interest web infrastructure, open-source standards, and zero-tracking regional journalism:

* **[Direct Stripe Settlement Checkout](https://buy.stripe.com/7sYdR8epV9RP4cCfDJ2B200)** &mdash; Fast, secure card checkout via Stripe.
* **[Institutional Desk Wire / Banking](https://mobikom.bg/contact/)** &mdash; Direct transfer via the Operations Desk.
