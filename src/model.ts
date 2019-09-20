
export interface ISubmissionSummary {
  submission_id: number;

  team_name: string;
  team_institution_name: string;
  team_institution_url: string;

  approach_name: string;
  approach_manuscript_url: string;
  approach_uses_external_data: boolean;

  overall_score: number;

  submission_created: string; // TimeStamp

  details?: ISubmissionDetails;
}

export interface ISummaryResponse {
  count: number;
  results: ISubmissionSummary[];
}

export interface IScore<T = number> {
  accuracy: T;
  ap: T;
  auc: T;
  auc_sens_80: T;
  dice: T;
  npv: T;
  ppv: T;
  sensitivity: T;
  specificity: T;
}

export interface IRocEntry {
  fpr: number;
  tpr: number;
  threshold: number;
}

export interface IByType<T> {
  AK: T;
  BCC: T;
  BKL: T;
  DF: T;
  MEL: T;
  NV: T;
  SCC: T;
  UNK: T;
  VASC: T;
}

export declare type ECategory = 'AK' | 'BCC' | 'BKL' | 'DF' | 'MEL' | 'NV' | 'SCC' | 'UNK' | 'VASC';

export interface IRawSubmissionDetails extends IScore<IByType<number>> {
  overall: number;
  validation: number;

  aggregate: {
    balanced_accuracy: number;
  };

  macro_average: IScore;

  accuracy: IByType<number>;
  ap: IByType<number>;
  auc: IByType<number>;
  auc_sens_80: IByType<number>;
  dice: IByType<number>;
  npv: IByType<number>;
  ppv: IByType<number>;
  sensitivity: IByType<number>;
  specificity: IByType<number>;
  roc: IByType<IRocEntry[]>;
}

export interface ITypedScore extends IScore {
  id: ECategory;
  name: string;
  color: string;

  roc: IRocEntry[];
}


export interface ISubmissionDetails extends IScore {
  overall: number;
  validation: number;

  scores: ITypedScore[];
}
