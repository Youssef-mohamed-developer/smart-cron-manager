const cron = require("node-cron");

class SmartCronManager {
  static jobs = new Map();

  addJob({ id, schedule, task, enabled = true }) {
    if (!id || !schedule || typeof task !== "function") throw new Error("Missing required parameters: id, schedule, or task must be provided.");
    if (SmartCronManager.jobs.has(id)) throw new Error(`Job with id '${id}' already exists.`);
    const job = cron.schedule(schedule, task, { scheduled: enabled });
    SmartCronManager.jobs.set(id, { job, schedule, task, running: enabled });
  }

  updateJob({ id, schedule, task }) {
    const existing = SmartCronManager.jobs.get(id);
    if (!existing) throw new Error(`Job with id '${id}' does not exist.`);
    // Stop and destroy the existing job
    existing.job.stop();
    existing.job.destroy();
    // Create new job with updated data
    const newSchedule = schedule || existing.schedule;
    const newTask = task || existing.task;
    const job = cron.schedule(newSchedule, newTask);
    SmartCronManager.jobs.set(id, { job, schedule: newSchedule, task: newTask, running: true });
  }

  deleteJob(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    jobEntry.job.stop();
    jobEntry.job.destroy();
    SmartCronManager.jobs.delete(id);
  }

  stopJob(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    if (!jobEntry.running) throw new Error(`Job with id '${id}' is not running.`);
    jobEntry.running = false;
    jobEntry.job.stop();
  }

  startJob(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    if (jobEntry.running) throw new Error(`Job with id '${id}' is already running.`);
    jobEntry.running = true;
    jobEntry.job.start();
  }

  getJob(id) {
    return SmartCronManager.jobs.get(id) || null;
  }

  listJobs() {
    return Array.from(SmartCronManager.jobs.entries()).map(([id, { schedule, running }]) => ({ id, schedule, running }));
  }

  isRunning(id) {
    const jobEntry = SmartCronManager.jobs.get(id);
    if (!jobEntry) throw new Error(`Job with id '${id}' does not exist.`);
    return jobEntry.running;
  }
}

module.exports = SmartCronManager;