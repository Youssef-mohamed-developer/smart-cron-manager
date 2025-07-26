# 🧠 smart-cron-manager

Smart, dynamic, and lightweight cron job manager for Node.js using `node-cron`. Easily add, update, delete, stop, or start scheduled tasks at runtime.

---

## 🚀 Installation

```bash
npm install smart-cron-manager
```

---

## 📦 Usage

```js
const SmartCronManager = ;
const cronManager = require("smart-cron-manager");

// Add a job
cronManager.addJob({
  id: "job1",
  schedule: "*/5 * * * * *", // every 5 seconds
  task: () => console.log("Task executed")
});

// Update the job later
cronManager.updateJob({
  id: "job1",
  schedule: "*/10 * * * * *"
});

// Stop the job
cronManager.stopJob("job1");

// Restart the job
cronManager.startJob("job1");

// Delete it
cronManager.deleteJob("job1");
```

---

## ✅ Features

- Add cron jobs dynamically at runtime
- Update job schedule or task
- Start and stop specific jobs
- Delete jobs safely
- List all managed jobs

---

## 🧩 API Reference

### `addJob({ id, schedule, task, enabled })`
Add a new job. Throws error if job with same ID exists.

### `updateJob({ id, schedule?, task? })`
Updates job's schedule or task. Throws error if job doesn't exist.

### `deleteJob(id)`
Stops and removes a job by ID.

### `stopJob(id)` / `startJob(id)`
Control individual job execution.

### `getJob(id)`
Returns job object (or `null`).

### `listJobs()`
Returns list of all jobs and their schedules.

### `isRunning(id)`
Checks if a job is currently running.

---

## 📜 License

MIT

---

## ✍️ Author

Youssef Mohamed - (SLASH)

## 🔗 Links
- [npm](https://www.npmjs.com/~slash2)
- [GitHub](https://github.com/Youssef-mohamed-developer)
- [Discord](https://discord.gg/kEWDQZH9xp)

Feel free to open issues or contribute! 🚧