# Security Policy & Vulnerability Disclosure

Project: mobikom.bg — Master Institutional Portal  
Author: Mobikom Operations Directorate & Systems Architecture Board 
Scope: Production Edge & Master Repository  
Standard: OWASP Defense-in-Depth & Decoupled Edge Perimeter  

---

## 1. Architectural Security & Threat Model

The **mobikom.bg** network operates under a strict, defense-in-depth decoupled architecture engineered for zero data persistence and minimal attack surface:

* **Cryptographic Trust (Layer 1):** Domain integrity is anchored via **DNSSEC** at the national `.bg` registry level (Register.bg), preventing DNS cache poisoning and malicious rerouting.
* **Edge Perimeter Hardening (Layer 2 & 3):** All traffic is routed through Cloudflare Anycast edge nodes enforcing **TLS 1.3**, strict **HSTS** (`max-age=31536000; includeSubDomains; preload`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and a restrictive **Content Security Policy (CSP)**.
* **Zero Supply-Chain Dependencies (Layer 4):** Zero client-side JavaScript frameworks, zero npm packages, and zero third-party CDNs or tracking pixels. The platform is mathematically immune to Magecart digital skimming, dependency poisoning, and DOM-based Cross-Site Scripting (DOM XSS).
* **Ephemeral Volatile Memory:** Zero persistent storage writes (no Cookies, no `localStorage`, no `IndexedDB`). Session data resides strictly in volatile RAM and is wiped immediately upon tab closure.

---

## 2. Supported Environments

Because this platform is continuously integrated and deployed directly to global Anycast edge nodes, versioning operates under a rolling production model:

| Environment | Branch / Target | Security Status |
| :--- | :--- | :---: |
| **Production Edge** | `https://mobikom.bg/` | :white_check_mark: Active & Maintained |
| **Master Branch** | `main` (Root) | :white_check_mark: Active & Maintained |
| **Historical Repositories** | Decommissioned archives | :x: Unsupported |

---

## 3. Reporting a Vulnerability (Responsible Disclosure)

We take the security, privacy, and integrity of our digital media network seriously. If you identify a potential security vulnerability, protocol misconfiguration, or edge header bypass, we appreciate your coordinated responsible disclosure.
Canonical Policy: https://mobikom.bg/.well-known/security.txt.

### Reporting Channels:
Please do **NOT** open public GitHub Issues for security vulnerabilities. Instead, report directly to executive operations via verified email:

* **General Operations Inbox:** `ops@mobikom.bg`

### What to Include in Your Report:
1. Detailed description of the vulnerability and the affected URL/endpoint.
2. Step-by-step Proof of Concept (PoC) or reproducible request payload.
3. Potential impact assessment under CVSS criteria.

### Our Security Commitments:
* **Acknowledgement:** We will acknowledge receipt of your report within **24 to 48 business hours**.
* **Remediation:** If verified, we will deploy an edge patch or header reconfiguration to the production environment promptly.
* **Attribution:** With your consent, we will gladly credit your responsible contribution in our public acknowledgments and repository records.

---

## 4. Out of Scope

The following testing activities are strictly prohibited and outside the scope of this policy:
* Distributed Denial of Service (DDoS/DoS) volumetric stress testing against edge infrastructure.
* Zero-SBOM Compliance: 0 npm зависимости, 0 външни библиотеки, 0 известни уязвимости (CVE = 0).
* Social engineering or phishing campaigns targeting administrative personnel.
* Physical testing against routing hardware or upstream edge data centers.
* Automated high-frequency port scanning that degrades live services for readers of `dobrichnews.com`, `dobruja.com`, or `bestjobs.bg`.
