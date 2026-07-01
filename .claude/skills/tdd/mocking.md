# Mocking Guidelines

Consistent with [SKILL.md](SKILL.md)'s core principle: tests should verify behavior through public interfaces, not implementation details. Mocking is one of the easiest ways to accidentally violate that principle, so treat it as a last resort, not a default.

## Prefer the real thing

Use the real implementation whenever it's fast, deterministic, and side-effect-free within the test environment (in-memory data structures, pure functions, a real in-memory/test database instance). This is what makes a test genuinely integration-style — it exercises real code paths.

## When mocking is appropriate

Mock only at true system boundaries, where the real thing is:

- **External and outside your control** — third-party APIs, payment gateways, email/SMS providers.
- **Slow or flaky in a way that would make the test suite unreliable** — network calls, real clocks/timers.
- **Non-deterministic** — randomness, current time — inject or stub these instead of leaving them to chance.
- **Destructive or expensive to run repeatedly** — sending real emails, charging real cards.

In these cases, mock at the boundary (the HTTP client, the payment SDK), not the internal function that calls it.

## Never mock internal collaborators

Don't mock your own modules, internal services, or private methods just to isolate "the unit under test." That produces exactly the bad tests described in [SKILL.md](SKILL.md): they break on refactors that don't change behavior, and they verify that code called other code in a particular way rather than that the system produced the right result.

```ts
// BAD — mocks an internal collaborator
test("checkout processes payment", () => {
  const mockProcessor = jest.fn();
  checkout(cart, { processor: mockProcessor });
  expect(mockProcessor).toHaveBeenCalledWith(20);
});

// GOOD — mocks only the real external boundary (the payment gateway SDK)
test("checkout processes payment", async () => {
  mockPaymentGateway.charge.mockResolvedValue({ status: "succeeded" });
  const receipt = await checkout(cart, { paymentMethod: "card" });
  expect(receipt.status).toBe("paid");
});
```

## Warning signs you're over-mocking

- The test has more mock setup than assertions.
- A passing test gives you no confidence the feature actually works end-to-end.
- Refactoring internal code (without changing behavior) breaks the test.
- You're mocking a function defined in the same codebase, not a third-party dependency.

If you see these, prefer restructuring the test to go through the real public interface, and mock only the unavoidable external boundary underneath it.
