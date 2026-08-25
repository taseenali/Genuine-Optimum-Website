# Security Policy

## Reporting a vulnerability

Email **security@genuineoptimum.com** (also published at [`/.well-known/security.txt`](public/.well-known/security.txt)). Please include steps to reproduce and, if possible, a proof of concept.

## Dependency policy

This project runs `npm audit --audit-level=high` as a CI gate (`.github/workflows/ci.yml`) and has Dependabot enabled (`.github/dependabot.yml`, weekly) for automated advisory alerts. Neither is a complete defense: both only catch *known, disclosed* vulnerabilities, not a zero-day supply-chain compromise landing between disclosure and detection. Given the wave of 2026 npm supply-chain attacks that shipped through version bumps of *already-trusted* packages (not typosquats), the following habits matter more than tooling alone:

- Before adding any new dependency, check it's actively maintained (recent releases, not abandoned).
- Prefer well-known, high-download packages over niche alternatives that solve the same problem.
- **Review the lockfile diff on every dependency bump.** Don't blindly accept `npm install`'s output. "I've used this package before" is not sufficient trust on its own anymore.
