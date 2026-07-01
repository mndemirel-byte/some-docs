import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: () => Promise.resolve() },
  configurable: true,
});

afterEach(() => {
  cleanup();
});
