// // setup.ts
// import { expect, it, describe } from "vitest";
// import * as matchers from "@testing-library/jest-dom/matchers";

// global.describe = describe;
// global.it = it;
// global.expect = expect;

// expect.extend(matchers);

// // Additional setup can be added here if needed.

// // Ensure this file is imported in your test files.

// // Example:
// // import './__tests__/setup';
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});
