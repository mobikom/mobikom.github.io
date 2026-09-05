# Contributing to Mobikom

Thank you for your interest in contributing to **[mobikom.bg](https://mobikom.bg/)**. 

This repository powers an ultra-lightweight, high-availability digital media network and executive portal. To protect the performance, security, and integrity of the platform, all contributions must strictly adhere to our core engineering standards.

---

## ⚡ The Golden Rules of Our Architecture

1. **Zero External Dependencies:**
   * Do not introduce external JavaScript libraries, frameworks (React, Vue, jQuery), or third-party CDNs.
   * All client-side code must be pure native Vanilla JavaScript (ES6+).
2. **The 512-Byte Principle:**
   * Keep markup lean, semantic, and free of redundant wrapper `<div>` tags.
   * Code must achieve near-instant First Contentful Paint (FCP) and maintain a 100/100 Google PageSpeed score.
3. **Privacy by Design (Zero-Leak):**
   * Never introduce tracking pixels, third-party analytics cookies, or invasive telemetry scripts.
   * Maintain our strict board-level commitment to user privacy and GDPR compliance.
4. **Pure CSS Standards:**
   * Layouts must use native CSS Grid Level 2 and Subgrid with graceful fallbacks.
   * Do not import external fonts (e.g., Google Fonts); use native system font stacks (`system-ui` and `Georgia`).
5. **Symmetrical Bilingual Mirroring:**
   * Any structural update made to the English pages (`/`) must be mirrored identically in the Bulgarian portal (`/bg/`).

---

## 🛠️ Contribution Workflow

1. **Fork the Repository:** Create your own fork of `mobikom.github.io`.
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/improvement-name
