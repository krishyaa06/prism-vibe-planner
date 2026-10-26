(() => {
  const { $, $$, copy, download, store, debounce, tabs, esc } = Prism;
  const EX = { name: "StreakSquad", pitch: "A Discord-linked habit tracker where your friends keep you accountable.", problem: "Solo habit apps are easy to ignore; people stick to habits when friends can see their streaks.", users: "students and indie devs in Discord communities", features: "Create habits with daily/weekly targets\nCheck in with one tap\nShared squad leaderboard\nDiscord bot posts daily streak updates\nPush reminders\nStreak freeze tokens\nAnalytics dashboard", platform: "web", stack: "Next.js + TypeScript + Tailwind", db: "Supabase", metric: "20 squads active for 7 days straight", auth: true };
  const FIELDS = ["name", "pitch", "problem", "users", "features", "platform", "stack", "db", "metric"];
  let I = store.get("vp:input", EX), view = "prd", done = store.get("vp:done", {}), P;
  function render() {
    store.set("vp:input", I);
    P = Core.plan(I); P.tasks.forEach((t) => (t.done = !!done[t.title]));
    $("#hrs").textContent = `${P.tasks.length} tasks · ~${P.hours}h`;
    $("#prd").innerHTML = Core.md(P.prd);
    const phases = [...new Set(P.tasks.map((t) => t.phase))];
    $("#tasks").innerHTML = phases.map((ph) => `<div class="phase">${esc(ph)}</div>` + P.tasks.filter((t) => t.phase === ph).map((t) => `<label class="task ${t.done ? "done" : ""}"><input type="checkbox" data-t="${esc(t.title)}" ${t.done ? "checked" : ""} /><span class="id">${t.id}</span><span>${esc(t.title)}</span><span class="est">${t.est}</span></label>`).join("")).join("");
    $$("[data-t]").forEach((c) => (c.onchange = () => { done[c.dataset.t] = c.checked; store.set("vp:done", done); render(); }));
    $("#prompt").textContent = P.prompt;
    $("#ghout").textContent = Core.githubIssuesScript(P.tasks, $("#repo").value || "owner/repo");
  }
  const text = () => view === "prd" ? P.prd : view === "tasks" ? Core.tasksMarkdown(P.tasks) : view === "prompt" ? P.prompt : $("#ghout").textContent;
  function fill() { FIELDS.forEach((f) => ($("#" + f).value = I[f] || "")); $("#auth").checked = !!I.auth; }
  FIELDS.forEach((f) => $("#" + f).addEventListener("input", debounce(() => { I[f] = $("#" + f).value; render(); }, 150)));
  $("#auth").onchange = () => { I.auth = $("#auth").checked; render(); };
  $("#repo").addEventListener("input", debounce(render, 150));
  tabs($("#view"), (v) => { view = v; $$(".pane").forEach((p) => (p.hidden = p.id !== v)); });
  $("#example").onclick = () => { I = { ...EX }; fill(); render(); };
  $("#copy").onclick = () => copy(text());
  $("#dl").onclick = () => download(view === "gh" ? "create-issues.sh" : `${P.slug}-${view}.md`, text(), "text/markdown");
  fill(); render();
})();
