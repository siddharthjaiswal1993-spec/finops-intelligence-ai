# Security and Permissions — FinOps Intelligence AI

## Security Principles

1. **Finance data requires authentication** — No finance data is accessible without authenticated session
2. **Human approval before action** — No external action (Jira, Slack, email) executes without explicit human approval
3. **Audit log for all sensitive actions** — Every AI insight, human approval, and action execution is logged
4. **Minimum required permissions** — Integrations request only read access to source systems
5. **CFO-level actions require elevated approval** — CFO brief distribution and high-impact recommendations require CFO-role approval

## Role-Based Access Control (Phase 4)

| Role | Access Level | Capabilities |
|---|---|---|
| CFO | Full read + approval | All pages, CFO brief approval, action approval |
| VP Finance | Full read + action create | All pages, create recommendations and actions |
| Finance Ops Manager | Full read + workflow manage | All pages, anomaly triage, report generation |
| Department Budget Owner | Department read only | Own department view, budget status |
| Engineering Ops | Cloud + budget read | Cloud anomalies, Engineering department view |
| CS Ops | Margin + account read | Margin Intelligence, account profitability |
| RevOps | Vendor + SaaS read | Vendor Insights, SaaS anomalies |
| Read Only | All pages, read only | No action capabilities |

## Authentication Requirements (Phase 2+)

- Primary: SSO via Okta, Google Workspace, or Azure AD
- 2FA: Required for all CFO-role users
- Session timeout: Configurable 1-24 hours (default: 8 hours)
- API tokens: Service accounts for integration connectors use rotating API tokens

## Data Encryption

- **In transit:** TLS 1.3 for all API traffic
- **At rest:** AES-256 encryption for all database storage
- **Secrets management:** AWS Secrets Manager or HashiCorp Vault for API credentials

## Integration Security

- All read integrations use minimum-scope OAuth 2.0 tokens (read-only scopes)
- Write integrations (Jira, Slack) use app-level OAuth with restricted write scopes
- No source system credentials stored in application code — all via secrets management
- Integration tokens rotated automatically every 90 days

## Audit Requirements

Full audit log maintained for 7 years (financial compliance requirement):

- All AI insight generations (agent, insight content, timestamp)
- All human approval decisions (user, decision, timestamp, edit if applicable)
- All external action executions (target system, content, execution result)
- All data access events for sensitive data categories (account ARR, vendor contracts)
- All authentication events (login, logout, failed login attempts)

## Compliance Roadmap

| Standard | Target Phase | Notes |
|---|---|---|
| SOC 2 Type I | Phase 3 | Security controls documentation |
| SOC 2 Type II | Phase 4 | Annual audit |
| GDPR | Phase 2 | Data residency and right-to-erasure for EU customers |
| CCPA | Phase 2 | California data privacy compliance |
