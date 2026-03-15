# OSOH — Operational Security Hub

**OSOH (Operational Security Hub)** is a deterministic full-stack **centralized security operations MVP** designed to demonstrate how a monitored external surface, a platform layer, and a backend/API layer can operate as a connected but intentionally separated system.

This repository represents the **core operational platform** of the project.

It is not just a web application.  
It is a **documented, governed, deployable, evidence-backed MVP** built to support technical validation, controlled implementation, and academic defense in the context of a TFM.

## Project position inside the full MVP

The complete MVP is built around three connected but separated surfaces:

- `protowebstudio.com` — the main operational platform
- `api.protowebstudio.com` — the backend/API execution layer
- `sentinel.protowebstudio.com` — the external monitored trust and presentation surface

Within that architecture:

- **OSOH** provides the operational nucleus, system framing, and dashboard-oriented logic
- **API** provides backend execution, service behavior, and machine-facing interfaces
- **Sentinel** provides the public monitored surface used for external validation, trust presentation, and proof that a real site can be observed end to end

This separation is deliberate. It is part of both the technical value and the academic value of the project.

## What this repository is

This repository is:

- the **core platform repository** of the OSOH MVP
- the place where the main operational web surface is implemented
- a governed implementation environment
- part of a broader three-surface architecture
- an artifact intended to support reproducible validation, deployment discipline, and TFM defense

## What this repository is not

This repository is **not**:

- the totality of the full project
- the Sentinel public monitored surface
- only a marketing/presentation site
- only a backend service
- a generic dashboard template
- a throwaway academic mock-up with no deployment or validation intent

## Purpose

OSOH exists to demonstrate a realistic and bounded security-operations model in which:

- operational visibility is centralized
- monitoring results can be surfaced coherently
- backend execution is separated from public presentation
- risk and validation narratives remain explicit and auditable
- the system can be explained, tested, and defended as an MVP rather than oversold as a production SOC platform

## Core characteristics

The project emphasizes:

- deterministic behavior over ambiguity
- explicit scope boundaries
- bounded risk scoring and observability logic
- clear architecture separation
- deployment and runtime validation
- documentation-backed implementation
- governance-aware development
- technical honesty about limitations and current maturity

## Architecture summary

At a high level, the system is organized as follows:

### 1. Core platform layer
The main platform provides the operator-facing experience, application structure, workflow framing, and system-level presentation of the MVP.

### 2. API / execution layer
The backend/API layer handles machine-facing execution behavior, service orchestration, and integration logic required by the MVP.

### 3. Monitored external surface
The Sentinel surface exists as a separately deployed and publicly visible monitored target, allowing the broader system to demonstrate end-to-end monitoring and evidence of operation.

This three-part structure is one of the key foundations of the project.

## Security and governance posture

This project is designed with a strong emphasis on **bounded implementation** and **explicit control**.

The overall posture favors:

- controlled scope
- explainable architecture
- deterministic workflows
- explicit constraints
- auditable decisions
- documented limitations instead of hidden assumptions

The goal is not to simulate an infinitely extensible enterprise platform.  
The goal is to produce a credible, technically serious, and defensible MVP.

## MVP boundaries

This repository should be read through an MVP lens.

That means:

- some flows are intentionally narrowed
- some integrations are bounded
- some operational assumptions are documented rather than abstracted away
- the project favors proof of concept validity and architectural discipline over feature sprawl

That is an intentional design choice, not a defect.

## Current maturity

The project has moved beyond the level of a simple prototype.

Its current maturity is better described as:

- **implemented MVP**
- **documented system**
- **deployable architecture**
- **evidence-backed technical work**
- **TFM-ready foundation with clear boundaries**

It should still be interpreted honestly as an MVP rather than as a finished enterprise product.

## Relationship to Sentinel

The Sentinel repository/site should be understood as the **public monitored trust surface** of the same broader project.

That relationship matters because Sentinel provides:

- an external target that can be monitored
- a public-facing explanatory and trust layer
- visible evidence that the architecture is not purely theoretical
- an additional validation surface for the TFM narrative

OSOH and Sentinel are therefore related, but they do not serve the same role.

## Technology profile

Based on the current project direction, this repository is centered on a modern web-stack implementation with operational and documentation concerns built into the workflow.

The broader project currently reflects:

- frontend application structure
- backend/API separation
- deployment workflow discipline
- validation-oriented documentation
- test/build gate awareness
- repository-level governance and repeatability concerns

## Local development

Install dependencies:

```bash
npm install
```

Start the local development environment:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run the available quality or verification commands defined by the repository:

```bash
npm run test
npm run lint
```

If a command is not defined in the repository, treat that as a repository-specific constraint rather than substituting assumptions.

## Safe working model

Because this project is tied to a larger live and documented MVP, changes should be made through a controlled verification flow:

1. inspect current repo state
2. make a bounded change
3. run the defined verification/build commands
4. review the diff
5. commit only after local verification
6. push only after gates pass or after consciously handling any verified exception
7. re-check the affected live/project surfaces

The repository should be worked on as a **governed system component**, not as an ad hoc scratch project.

## Documentation role

This repository is also part of the project’s academic and documentary footprint.

Its documentation is expected to support:

- clear project framing
- scope definition
- architecture explanation
- reproducibility
- reviewability
- technical defense in a TFM context

That means README quality matters.  
The repository should explain what the system is, what role it plays, and what claims it does **not** make.

## Honest project claim

The strongest accurate claim for this repository is:

**OSOH is the core operational platform of a governed, evidence-backed, centralized security operations MVP with separated platform, API, and monitored public-surface layers.**

That is the right level of ambition:
serious, real, bounded, and defensible.

## Status note

This project is under active development and refinement.

That means some areas may continue to evolve, but the intended interpretation of the repository should remain stable:

- it is operationally serious
- it is MVP-bounded
- it is architecturally deliberate
- it is documentation-aware
- it is part of a broader validated system

## License / project context

Unless otherwise stated, this repository should be interpreted within the wider Protowebstudio / OSOH project context and its associated MVP, validation, and TFM-defense goals.
