const cron = require("node-cron");

class SmartCronManager {
  static jobs = new Map();

  addJob({ id, schedule, task, enabled = true }) {
    if (!id || !schedule || typeof task !== "function") throw new Error("Missing required parameters: id, schedule, or task must be provided.");
    if (SmartCronManager.jobs.has(id)) throw new Error(`Job with id '${id}' already exists.`);
    const job = cron.schedule(schedule, task, { scheduled: enabled });
    SmartCronManager.jobs.set(id, { job, schedule, task });
  }

  updateJob({ id, schedule, task }) {
    const existing = SmartCronManager.jobs.get(id);
    if (!existing) throw new Error(`Job with id '${id}' does not exist.`);
    // Stop and destroy the existing job
    existing.job.stop();
    // Create new job with updated data
    const newSchedule = schedule || existing.schedule;
    const newTask = task || existing.task;
    const job = cron.schedule(newSchedule, newTask);
    SmartCronManager.jobs.set(id, { job, schedule: newSchedule, task: newTask });
  }

  deleteJob(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    jobEntry.job.stop();
    SmartCronManager.jobs.delete(id);
  }

  stopJob(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    if (this.isRunning(id) === true) jobEntry.job.stop();
  }

  startJob(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    if (this.isRunning(id) === false) jobEntry.job.start();
  }

  getJob(id) {
    return SmartCronManager.jobs.get(id) || null;
  }

  hasJob(id) {
    return SmartCronManager.jobs.has(id);
  }

  listJobs() {
    return Array.from(SmartCronManager.jobs.entries()).map(([id, { schedule, job }]) => ({ id, schedule, running: job.getStatus() === "scheduled" }));
  }

  isRunning(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) return false;
    return jobEntry.job.getStatus() === "scheduled";
  }
}

module.exports = SmartCronManager;