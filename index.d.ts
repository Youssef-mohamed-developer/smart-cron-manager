import type { ScheduledTask } from "node-cron";

export interface JobConfig {
  id: string;
  schedule: string;
  task: () => void;
  enabled?: boolean;
}

export interface JobData {
  job: ScheduledTask;
  schedule: string;
  task: () => void;
  running: boolean;
}

export interface SmartCronManagerInterface {
  addJob(config: JobConfig): void;
  updateJob(config: Partial<Omit<JobConfig, "id">> & { id: string }): void;
  deleteJob(id: string): void;
  stopJob(id: string): void;
  startJob(id: string): void;
  getJob(id: string): JobData | null;
  hasJob(id: string): boolean;
  listJobs(): { id: string; schedule: string; running: boolean }[];
  isRunning(id: string): boolean;
}

export declare class SmartCronManager implements SmartCronManagerInterface {
  private jobs: Map<string, JobData>;

  constructor();

  addJob(config: JobConfig): void;
  updateJob(config: Partial<Omit<JobConfig, "id">> & { id: string }): void;
  deleteJob(id: string): void;
  stopJob(id: string): void;
  startJob(id: string): void;
  getJob(id: string): JobData | null;
  hasJob(id: string): boolean;
  listJobs(): { id: string; schedule: string; running: boolean }[];
  isRunning(id: string): boolean;
}