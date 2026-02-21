# ADR-XXX — <Concise Decision Title>
Version: v1.1
Status: Proposed | Accepted | Rejected | Superseded
Date: YYYY-MM-DD

------------------------------------------------------------------------

## 1. Context

Describe:

- The concrete architectural problem.
- Technical constraints (time, MVP scope, deployment model).
- Security or performance considerations.
- Why a decision is required at this stage.

Context must be factual and implementation-driven.

------------------------------------------------------------------------

## 2. Decision

Clearly state:

- What was chosen.
- How it will be implemented.
- Boundaries of the decision.
- Explicit non-goals (if applicable).

Decision must be precise and unambiguous.

------------------------------------------------------------------------

## 3. Alternatives Considered

For each alternative:

- Brief description.
- Why it was rejected.
- Trade-off analysis (complexity, time, security, deployment impact).

Example:

- Option A — Rejected due to time constraint.
- Option B — Rejected due to deployment complexity.

------------------------------------------------------------------------

## 4. Consequences

### Positive

- Implementation clarity
- Reduced complexity
- Improved determinism
- Deployment simplicity

### Negative

- Technical limitations introduced
- Future refactoring required (if applicable)
- Reduced flexibility

Consequences must be honest and realistic.

------------------------------------------------------------------------

## 5. Implementation Impact

Specify:

- Files or modules affected.
- Database migrations required (Yes/No).
- Environment variables affected.
- CI configuration changes required.

------------------------------------------------------------------------

## 6. Risk Assessment

Assess impact:

- Security risk: Low / Medium / High
- Operational risk: Low / Medium / High
- Time impact: Low / Medium / High

------------------------------------------------------------------------

## 7. Validation Plan

How will this decision be validated?

- Unit tests
- Manual testing
- Deployment validation
- Performance verification

------------------------------------------------------------------------

END OF DOCUMENT
