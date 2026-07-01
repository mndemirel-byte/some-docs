# Refactor Candidates

Checklist for the "Refactor" step in [SKILL.md](SKILL.md). Only refactor at GREEN — never while RED.

## Extract duplication

If the same logic (not just similar-looking code, but the same *reason to change*) appears in two or more places after the last test passed, pull it into one place. Don't extract on the first occurrence — wait until duplication is real (rule of three is a reasonable default), otherwise you'll guess the wrong abstraction.

## Deepen modules

Run the `/codebase-design` skill's vocabulary here: look for **shallow modules** (large interface, thin implementation — mostly pass-through) uncovered by the tests you just wrote, and fold their behavior into the module that uses them so callers get more **leverage** per unit of interface. A good signal: if a test needed to know about three collaborating objects to set up, the interface is probably shallower than it should be.

## Apply SOLID where natural

Don't force a pattern that isn't there. Apply SOLID principles only where the code you just wrote actually reveals a violation (e.g. a function now branches on type where polymorphism would remove the branch) — not as a checklist to satisfy independent of the code.

## Consider what new code reveals about existing code

Every GREEN is new information about the domain. Ask: does this new test/implementation suggest the existing code was drawing an interface or seam in the wrong place? If so, that's a refactor candidate even if the new code itself is fine. This is often where the biggest wins are — not in the code you just wrote, but in the code it exposes as now-wrong.

## Run tests after each refactor step

Refactor in small steps and re-run the suite after each one. A refactor step should never require touching a test — if it does, you weren't refactoring (behavior changed), you were making a second, unplanned behavior change; go back to RED for that.

## Signal to stop

Stop refactoring when: tests are green, the module doing the most work has a proportionally small interface, and there's no duplication introduced by the tracer-bullet loop that a future reader would find surprising. Don't keep polishing past that point — further changes without new tests are speculative.
