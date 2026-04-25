# Agile Development Strategy

This document defines the Agile workflow for the QuantSim project, ensuring iterative delivery, minimal bloat, and high-quality features.

## 1. Framework: Scrum-Lite

We use a "Scrum-Lite" approach suitable for a solo/small team environment. 

*   **Sprints:** 1-week cycles focused on a specific Epic or set of User Stories.
*   **Backlog:** A prioritized list of features (Epics) and granular tasks (User Stories).
*   **Definition of Done (DoD):**
    *   Code is linted and follows project standards.
    *   Tests (Unit/Integration) are written and passing.
    *   Documentation (API contracts, UI state) is updated.
    *   Feature is verified against User Story acceptance criteria.

## 2. Hierarchy of Requirements

1.  **Epics:** Large, high-level functional blocks (e.g., "Trading Engine", "Live Market Data").
2.  **User Stories:** Specific, actionable features from the perspective of the user (e.g., "As a trader, I want to see a live price chart...").
3.  **Acceptance Criteria (AC):** Checklist of conditions a story must meet.
4.  **Test Cases:** Technical verification steps to ensure AC are met.

## 3. Prioritization Matrix (MoSCoW)

To avoid bloat, every requirement is categorized:

*   **Must-Have:** Critical for the MVP (e.g., Auth, Trade Execution).
*   **Should-Have:** Important but not vital for the first release (e.g., Portfolio Analytics).
*   **Could-Have:** "Nice to have" enhancements (e.g., Social features).
*   **Won't-Have (for now):** Out of scope for current phase (e.g., Real money integration).

## 4. Testing Strategy Alignment

Every User Story must have corresponding Test Cases. We follow the **Test-Driven Development (TDD)** mindset:
1.  Define the User Story and AC.
2.  Write the Test Case.
3.  Implement the feature until the Test Case passes.

---

*Last Updated: April 2026*
*Status: Strategy Defined*
