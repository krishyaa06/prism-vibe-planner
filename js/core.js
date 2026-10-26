/* Prism Vibe Planner · core logic */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const lines = (s) => String(s || "").split("\n").map((l) => l.replace(/^\s*[-*\d.)]+\s*/, "").trim()).filter(Boolean);
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "app";
  const PLATFORM_TASKS = {
    web: ["Scaffold the app and deploy an empty shell (Vercel/Netlify)", "Set up routing, layout and base styles"],
    mobile: ["Scaffold the Expo/React Native app and run it on a device", "Set up navigation and base theme"],
    cli: ["Scaffold the CLI with argument parsing and `--help`", "Publish a dry-run package to verify the bin works"],
    bot: ["Register the bot application and invite it to a test server", "Set up command registration and a `/ping` command"],
    api: ["Scaffold the API server with a health check endpoint", "Set up request validation and error handling"],
  };
  function plan(i) {
    const features = lines(i.features), must = features.slice(0, Math.max(1, Math.ceil(features.length * 0.6))), later = features.slice(must.length);
    const name = i.name?.trim() || "Untitled app", users = i.users?.trim() || "people who need this";
    const tasks = [];
    let n = 1; const T = (title, phase, est) => tasks.push({ id: `T${String(n++).padStart(2, "0")}`, title, phase, est, done: false });
    (PLATFORM_TASKS[i.platform] || PLATFORM_TASKS.web).forEach((t) => T(t, "Setup", "1h"));
    if (i.auth) T("Add authentication (sign up, log in, log out)", "Setup", "2h");
    if (i.db) T(`Design the data model in ${i.db} and seed sample data`, "Setup", "2h");
    must.forEach((f) => { T(`Build: ${f}`, "MVP", "3h"); T(`Test + polish: ${f}`, "MVP", "1h"); });
    T("Empty, loading and error states for every screen", "MVP", "2h");
    T("Mobile responsiveness pass", "MVP", "1h");
    T("Deploy to production + smoke test", "Launch", "1h");
    T("Write README with screenshots and a demo GIF", "Launch", "1h");
    T("Share it: post on X / Discord / Product Hunt", "Launch", "1h");
    later.forEach((f) => T(`Later: ${f}`, "Next", "?"));
    const hours = tasks.reduce((h, t) => h + (parseFloat(t.est) || 0), 0);
    const prd = [
      `# ${name}`, `> ${i.pitch?.trim() || "One-line pitch goes here."}`,
      `## Problem\n${i.problem?.trim() || `${users} struggle with this today.`}`,
      `## Target users\n${users}`,
      `## Goals\n- Ship a usable MVP in ~${Math.ceil(hours / 6)} focused days (~${hours}h)\n- ${i.metric?.trim() || "Get 10 real users to try it and give feedback"}`,
      `## MVP scope\n${must.map((f) => `- [ ] ${f}`).join("\n") || "- [ ] Core feature"}`,
      later.length ? `## Out of scope (for now)\n${later.map((f) => `- ${f}`).join("\n")}` : "",
      `## Tech\n- Platform: ${i.platform || "web"}${i.stack ? `\n- Stack: ${i.stack}` : ""}${i.db ? `\n- Data: ${i.db}` : ""}${i.auth ? "\n- Auth: yes" : ""}`,
      `## Risks & open questions\n- What is the smallest version that proves people want this?\n- Which feature is hardest technically? Prototype it first.`,
    ].filter(Boolean).join("\n\n");
    const prompt = `You are my senior pair-programmer. We're building **${name}** — ${i.pitch?.trim() || "an MVP"}.\n\nStack: ${i.stack || "your best suggestion"}${i.db ? `, data in ${i.db}` : ""}${i.auth ? ", with auth" : ""}.\nUsers: ${users}.\n\nWork through these tasks one at a time. For each: say which files you'll touch, implement it, then stop and wait for me to say "next".\n\n${tasks.filter((t) => t.phase !== "Next").map((t) => `${t.id}. ${t.title}`).join("\n")}\n\nStart with ${tasks[0].id}.`;
    return { name, slug: slug(name), prd, tasks, hours, prompt };
  }
  function tasksMarkdown(tasks) {
    const phases = [...new Set(tasks.map((t) => t.phase))];
    return phases.map((p) => `## ${p}\n${tasks.filter((t) => t.phase === p).map((t) => `- [${t.done ? "x" : " "}] ${t.id} ${t.title} (${t.est})`).join("\n")}`).join("\n\n");
  }
  function githubIssuesScript(tasks, repo = "owner/repo") {
    return tasks.filter((t) => t.phase !== "Next").map((t) => `gh issue create -R ${repo} --title ${JSON.stringify(`${t.id} ${t.title}`)} --label ${JSON.stringify(t.phase.toLowerCase())} --body ${JSON.stringify(`Estimate: ${t.est}`)}`).join("\n");
  }
  /* Tiny Markdown renderer (headings, lists, code, tables, quotes, links, images, html passthrough for <p>/<img>) */
    function md(src) {
      const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const inline = (s) => esc(s)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2" />')
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>")
        .replace(/~~([^~]+)~~/g, "<del>$1</del>");
      const lines = src.replace(/\r\n/g, "\n").split("\n"), out = [];
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (/^```/.test(l)) { const buf = []; i++; while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]); out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`); continue; }
        if (/^<(p|img|div|h\d|a|br|table|picture)\b/i.test(l.trim())) { const buf = [l]; while (i + 1 < lines.length && lines[i + 1].trim() && !/^#/.test(lines[i + 1])) buf.push(lines[++i]); out.push(`<div class="raw">${buf.join("\n").replace(/<script/gi, "&lt;script").replace(/ on\w+=/gi, " data-x=")}</div>`); continue; }
        let m;
        if ((m = /^(#{1,6})\s+(.*)$/.exec(l))) { out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); continue; }
        if (/^(-{3,}|\*{3,})$/.test(l.trim())) { out.push("<hr />"); continue; }
        if (/^>\s?/.test(l)) { const buf = []; while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, "")); i--; out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`); continue; }
        if (/^\|.*\|\s*$/.test(l) && i + 1 < lines.length && /^\|?\s*:?-+/.test(lines[i + 1])) {
          const row = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
          const head = row(l); i += 2; const body = [];
          while (i < lines.length && /^\|/.test(lines[i])) body.push(row(lines[i++])); i--;
          out.push(`<table><thead><tr>${head.map((h) => `<th>${inline(h)}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`); continue;
        }
        if (/^\s*([-*+]|\d+\.)\s+/.test(l)) {
          const ordered = /^\s*\d+\./.test(l), buf = [];
          while (i < lines.length && /^\s*([-*+]|\d+\.)\s+/.test(lines[i])) buf.push(lines[i++].replace(/^\s*([-*+]|\d+\.)\s+/, "")); i--;
          const tag = ordered ? "ol" : "ul";
          out.push(`<${tag}>${buf.map((b) => `<li>${inline(b).replace(/^\[ \]\s/, '<input type="checkbox" disabled /> ').replace(/^\[x\]\s/i, '<input type="checkbox" checked disabled /> ')}</li>`).join("")}</${tag}>`); continue;
        }
        if (!l.trim()) continue;
        const buf = [l]; while (i + 1 < lines.length && lines[i + 1].trim() && !/^(#|```|>|\||\s*([-*+]|\d+\.)\s|<)/.test(lines[i + 1])) buf.push(lines[++i]);
        out.push(`<p>${inline(buf.join(" "))}</p>`);
      }
      return out.join("\n");
    }
  
  return { md,  plan, tasksMarkdown, githubIssuesScript, lines, slug };
});
