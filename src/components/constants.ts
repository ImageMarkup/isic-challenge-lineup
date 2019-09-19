import { schemeSet3, schemeCategory10 } from 'd3-scale-chromatic';
import { ECategory, IScore } from '@/model';

export const aggregateMetricTypes = [
  {
    id: 'balanced_accuracy',
    name: 'Balanced Multiclass Accuracy',
    detail: `The greatest diagnosis category score determines the category prediction for each image;
the mean recall of this multiclass confusion matrix (i.e. the mean of the diagonal element-wise divided
by the positive incidences) is the balanced multiclass accuracy`,
    primary: true,
  }
];

const colors = schemeCategory10.slice();
function colorize(d: { id: string, name: string, detail: string }, i: number) {
  return Object.assign(d, { color: colors.pop()! }) as { id: keyof IScore, name: string, detail: string, color: string };
}

export const integralMetricTypes = [
  {
    id: 'auc',
    name: 'AUC',
    detail: 'Area under the receiver operating characteristic (ROC) curve',
  },
  {
    id: 'auc_sens_80',
    name: 'AUC, Sens > 80%',
    detail: 'Area under the receiver operating characteristic (ROC) curve, evaluated only '
      + 'for the region where sensitivity > 80%',
  },
  {
    id: 'ap',
    name: 'Average Precision',
    detail: 'Area under the interpolated precision-recall (PR) curve',
  },
].map(colorize);



export const thresholdMetricTypes = [
  {
    id: 'accuracy',
    name: 'Accuracy',
    detail: 'Accuracy',
  },
  {
    id: 'sensitivity',
    name: 'Sensitivity',
    detail: 'Recall',
  },
  {
    id: 'specificity',
    name: 'Specificity',
    detail: 'Specificity',
  },
  {
    id: 'dice',
    name: 'Dice Coefficient',
    detail: 'F1 Score',
  },
  {
    id: 'ppv',
    name: 'PPV',
    detail: 'Positive Predictive Value / Precision',
  },
  {
    id: 'npv',
    name: 'NPV',
    detail: 'Negative Predictive Value',
  },
].map(colorize);

export const possibleCategories = [
  {
    id: 'MEL',
    name: 'Melanoma',
  },
  {
    id: 'NV',
    name: 'Melanocytic nevus',
  },
  {
    id: 'BCC',
    name: 'Basal cell carcinoma',
  },
  {
    id: 'AK',
    name: 'Actinic keratosis',
  },
  // {
  //   id: 'AKIEC',
  //   name: 'Actinic keratosis / Bowen’s disease (intraepithelial carcinoma)',
  // },
  {
    id: 'BKL',
    name: 'Benign keratosis (solar lentigo / seborrheic keratosis / lichen planus-like keratosis)',
  },
  {
    id: 'DF',
    name: 'Dermatofibroma',
  },
  {
    id: 'VASC',
    name: 'Vascular lesion',
  },
  {
    id: 'SCC',
    name: 'Squamous cell carcinoma',
  },
  {
    id: 'UNK',
    name: 'None of the others / out of distribution',
  }
].map((d, i) => Object.assign(d, { color: schemeSet3[i] }) as { id: ECategory, name: string, color: string });
