const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const I = { name: "My App!", pitch: "Pitch", users: "devs", features: "- A\n- B\n- C\n- D\n- E", platform: "cli", db: "SQLite", auth: true };
test("splits MVP vs later (60%)", () => {
  const p = C.plan(I);
  assert.match(p.prd, /## MVP scope\n- \[ \] A\n- \[ \] B\n- \[ \] C\n\n## Out of scope \(for now\)\n- D\n- E/);
  assert.equal(p.slug, "my-app");
});
test("tasks include platform, auth, db and launch", () => {
  const t = C.plan(I).tasks.map((x) => x.title);
  assert.match(t[0], /CLI/); assert.ok(t.some((x) => /authentication/.test(x))); assert.ok(t.some((x) => /SQLite/.test(x)));
  assert.ok(t.includes("Build: A") && t.includes("Later: E")); assert.ok(t.some((x) => /Deploy/.test(x)));
});
test("hours sum and ids", () => {
  const p = C.plan(I);
  assert.equal(p.tasks[0].id, "T01"); assert.ok(p.hours > 10);
  assert.match(p.prompt, /Start with T01\./); assert.doesNotMatch(p.prompt, /Later:/);
});
test("exports", () => {
  const p = C.plan(I);
  assert.match(C.tasksMarkdown(p.tasks), /## Setup\n- \[ \] T01/);
  assert.match(C.githubIssuesScript(p.tasks, "a/b"), /^gh issue create -R a\/b --title "T01 /);
  assert.match(C.md("## x"), /<h2/);
});
