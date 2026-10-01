it("verifies Jest setup", () => {
  expect(true).toBe(true);
});

it("verify global TI4", () => {
  expect(globalThis.TI4).toBeDefined();
});
