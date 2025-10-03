---
title: "Rooting Phoenix Lab Linux Host"
summary: "From Kerberos reconnaissance to LD_PRELOAD persistence, this lab writeup covers every pivot I used to reach domain dominance."
pubDate: "2024-06-02"
updatedDate: "2024-08-14"
heroImage: "/images/writeups/phoenix/hero.jpg"
tags:
  - Active Directory
  - Linux PrivEsc
  - Lateral Movement
  - Kerberos
  - Azure AD
tools:
  - BloodHound
  - Rubeus
  - Evil-WinRM
  - AzureHound
---

> All screenshots referenced in this writeup live under `/public/images/writeups/phoenix/`. Drop your replacements there and keep the same filenames for a seamless swap.

## Reconnaissance Checklist

I began in a restricted Linux jump host with only domain user creds. The first goal was cataloging Kerberos exposure without touching the DC. `bloodhound-python` gave me a raw JSON map of relationships, while `GetUserSPNs.py` from Impacket confirmed two service accounts ripe for Kerberoasting.

```bash
bloodhound-python -u phoenix.audit -p '$3cr3t' -ns 10.10.5.5 -d phoenix.lab -c All -zip
GetUserSPNs.py phoenix.lab/phoenix.audit -request
```

## Leveraging Misconfigured Sudo

A careless admin left `LD_PRELOAD` enabled for a diagnostics binary. By dropping a shared object that spawns a reverse shell, I popped root on the box and pivoted into the Windows enclave via SSH tunneling.

![Pivot diagram](/images/writeups/phoenix/tunnel-topology.png)

## Azure Tenant Spillover

Once inside the hybrid identity connector, I replayed sync tokens with `aadinternals`. The highlight was discovering legacy OAuth scopes that allowed passive directory dumps without MFA.

| Scope | Risk | Mitigation |
| ----- | ---- | ---------- |
| `Directory.AccessAsUser.All` | Full directory read | Conditional access + consent reviews |
| `AuditLog.Read.All` | IR log theft | Archive to isolated workspace |

## Defensive Takeaways

- **Monitor for LD_PRELOAD usage** using eBPF or Sysmon for Linux; this misconfiguration is still widespread.
- Guard hybrid identity connectors as tier-0 assets.
- Rotate sync accounts and enforce consent governance for Azure applications.

Next steps include building detections for the pre-auth Kerberos abuse observed during the lab.
