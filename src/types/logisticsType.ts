export type LogisticsType = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  alt_phone: string | null;
  created_at: string;
  updated_at: string;
  destinations: LogisticsDestinationType[];
};

export type LogisticsDestinationType = {
  id: number;
  logistic_id: string;
  state_id: string;
  area: string;
  cost: string;

  state: {
    id: number;
    name: string;
  };
};
