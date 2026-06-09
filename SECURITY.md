# Security Policy

Karyra Spark is a beta-stage educational frontend. The project is designed to guide users toward safer blockchain learning before wallet or ecosystem exploration.

## Supported Status

Current status:

```text
BETA 0.1
```

Security-related behavior may evolve as the product matures.

## Public Security Principles

Spark should not:

- ask users for seed phrases;
- ask users for private keys;
- store wallet secrets;
- perform onchain writes from the Spark frontend;
- expose a public Studio/admin writer surface;
- frame the product as financial advice or a trading tool.

Spark may:

- show educational wallet-safety content;
- show readiness and progress states;
- link users toward the Hub or external ecosystem resources;
- integrate with backend APIs for account, profile, progress, and readiness features.

## Reporting a Vulnerability

Please do not disclose vulnerabilities publicly before they are reviewed.

For now, open a private communication channel with the project maintainers or create a minimal GitHub issue that does not expose exploitable details.

Include:

- affected route or component;
- expected behavior;
- observed behavior;
- steps to reproduce;
- potential impact;
- screenshots or logs when safe to share.

## Sensitive Information

Never include the following in issues, pull requests, screenshots, or logs:

- private keys;
- seed phrases;
- production tokens;
- server credentials;
- full `.env` files;
- real user personal data;
- private grant or budget documents.

## Public Beta Notice

Spark is in beta and should be treated as an educational readiness product. It is not financial advice and should not be used to make investment decisions.
