
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

interface IScore {
  accuracy: number;
  ap: number;
  auc: number;
  auc_sens_80: number;
  dice: number;
  npv: number;
  ppv: number;
  sensitivity: number;
  specificity: number;
}

export interface IRocEntry {
  fpr: number;
  tpr: number;
  threshold: number;
}

interface IScoreWithRoc extends IScore {
  roc: IRocEntry[];
}

export declare type ECategory = 'AK' | 'BCC' | 'BKL' | 'DF' | 'MEL' | 'NV' | 'SCC' | 'UNK' | 'VASC';

export interface IRawSubmissionDetails {
  overall: number;
  validation: number;

  aggregate: {
    balanced_accuracy: number;
  };

  macro_average: IScore;

  AK: IScoreWithRoc;
  BCC: IScoreWithRoc;
  BKL: IScoreWithRoc;
  DF: IScoreWithRoc;
  MEL: IScoreWithRoc;
  NV: IScoreWithRoc;
  SCC: IScoreWithRoc;
  UNK: IScoreWithRoc;
  VASC: IScoreWithRoc;
}

export interface ITypedScore extends IScoreWithRoc {
  id: ECategory;
  name: string;
  color: string;
}


export interface ISubmissionDetails extends IScore {
  overall: number;
  validation: number;

  scores: ITypedScore[];
}
