import { expect, test } from "bun:test";
import { ESLint } from "eslint";

test("lint configuration checks TypeScript with core and plugin rules", async () => {
  const eslint = new ESLint();
  const [result] = await eslint.lintText(
    "const unused: number = 1;\nmissingFunction();\n",
    { filePath: "src/lint-fixture.ts" }
  );

  expect(result.fatalErrorCount).toBe(0);
  expect(result.messages.map((message) => message.ruleId)).toEqual(
    expect.arrayContaining(["@typescript-eslint/no-unused-vars", "no-undef"])
  );
});
