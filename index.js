const cron = require("node-cron");

class SmartCronManager {
  constructor() {
    this.jobs = new Map();
  }

  addJob({ id, schedule, task, enabled = true }) {
    if (!id || !schedule || typeof task !== "function") throw new Error("Missing required parameters: id, schedule, or task must be provided.");
    if (this.jobs.has(id)) throw new Error(`Job with id '${id}' already exists.`);
    const job = cron.schedule(schedule, task, { scheduled: enabled });
    this.jobs.set(id, { job, schedule, task, running: enabled });
  }

  updateJob({ id, schedule, task }) {
    const existing = this.jobs.get(id);
    if (!existing) throw new Error(`Job with id '${id}' does not exist.`);
    // Stop and destroy the existing job
    existing.job.stop();
    existing.job.destroy();
    // Create new job with updated data
    const newSchedule = schedule || existing.schedule;
    const newTask = task || existing.task;
    const job = cron.schedule(newSchedule, newTask);
    this.jobs.set(id, { job, schedule: newSchedule, task: newTask, running: true });
  }

  deleteJob(id) {
    const jobEntry = this.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    jobEntry.job.stop();
    jobEntry.job.destroy();
    this.jobs.delete(id);
  }

  stopJob(id) {
    const jobEntry = this.jobs.get(id);
    if (!jobEntry.running) throw new Error(`Job with id '${id}' is not running.`);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    jobEntry.running = false;
    jobEntry.job.stop();
  }

  startJob(id) {
    const jobEntry = this.jobs.get(id);
    if (jobEntry.running) throw new Error(`Job with id '${id}' is already running.`);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    jobEntry.running = true;
    jobEntry.job.start();
  }

  getJob(id) {
    return this.jobs.get(id) || null;
  }

  listJobs() {
    return Array.from(this.jobs.entries()).map(([id, { schedule, running }]) => ({ id, schedule, running }));
  }

  isRunning(id) {
    const jobEntry = this.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    return jobEntry.job.running;
  }
}

module.exports = SmartCronManager;