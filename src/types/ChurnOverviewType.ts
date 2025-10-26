export type ChurnOverviewType = {
  period: {
    start: string;
    end: string;
  };
  days: string;
  active_users: number;
  churned_users: number;
  churn_rate: number;
  label: string;
};
