# Test Examples

Examples illustrating the good/bad/tautological distinction from [SKILL.md](SKILL.md).

## Good: behavior through the public interface

```ts
test("user can checkout with a valid cart", () => {
  const cart = createCart([{ sku: "widget", qty: 2, price: 10 }]);
  const receipt = checkout(cart, { paymentMethod: "card" });

  expect(receipt.total).toBe(20);
  expect(receipt.status).toBe("paid");
});
```

This reads like a spec, exercises only the public `checkout` API, and doesn't care whether the total is computed with a loop, `reduce`, or a pricing service — it will survive any of those refactors.

## Bad: coupled to implementation

```ts
test("checkout calls calculateTotal", () => {
  const spy = jest.spyOn(pricing, "calculateTotal");
  checkout(cart, { paymentMethod: "card" });
  expect(spy).toHaveBeenCalled();
});
```

This breaks the moment `checkout` is refactored to compute the total a different way, even though the checkout behavior hasn't changed. It's testing *how*, not *what*.

```ts
test("cart has correct items", () => {
  const cart = createCart([{ sku: "widget", qty: 2, price: 10 }]);
  expect(cart._internalItems.length).toBe(1); // reaching into private state
});
```

Reaching into `_internalItems` couples the test to a field name and structure that could change without any user-visible behavior change.

## Tautological: passes by construction

```ts
test("add sums two numbers", () => {
  const a = 3, b = 4;
  expect(add(a, b)).toBe(a + b); // recomputes the same way the code does
});
```

If `add` is implemented wrong (e.g. `a - b`), this test can't catch it in general, but worse — for cases where the "wrong" computation happens to agree, or where the expected value is derived with the same logic as the implementation, the assertion can never disagree with the code. Replace `a + b` with an independent literal:

```ts
test("add sums two numbers", () => {
  expect(add(3, 4)).toBe(7); // known-good literal, independent of the implementation
});
```

## Rule of thumb

Before writing an assertion, ask: "If someone reimplemented this function correctly but differently, would this test still pass? If someone broke it, would this test fail?" If either answer is uncertain, the test needs an independent source of truth (a literal, a worked example, the spec) rather than a value derived from the code under test.
