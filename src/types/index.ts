// Score Metrics Types
export interface ScoreMetric {
  id: number;
  name: string;
  scheduleType: 'DAILY' | 'MONTHLY';
  calculationFormula: string;
  createdAt: string;
}

export interface ScoreMetricFormData {
  name: string;
  scheduleType: 'DAILY' | 'MONTHLY';
  calculationFormula: string;
}

// Customer Scores Types
export interface CustomerScore {
  id: number;
  customerId: string;
  scoreMetricId: number;
  score: number;
  computationDate: string;
  sendStatus: 'SENT' | 'FAILED' | 'PENDING';
}

// Job Execution Logs Types
export interface JobExecutionLog {
  id: number;
  jobName: string;
  status: 'SUCCESS' | 'FAILED' | 'RUNNING';
  startTime: string;
  endTime?: string;
  errorMessage?: string;
}

// Common Types
export interface TableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}



