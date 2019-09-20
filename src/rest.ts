import { ISummaryResponse, ISubmissionSummary, IRawSubmissionDetails, ISubmissionDetails, IRocEntry } from './model';
import { possibleCategories } from './components/constants';
import { simplifyLine } from './data';


// https://challenge.isic-archive.com/api/leaderboard/52/by-team?limit=200&offset=0

export function getByTeam(baseUrl: string, challenge: string): Promise<ISummaryResponse> {
  return fetch(`${baseUrl}/leaderboard/${challenge}/by-team`, {
    cache: 'force-cache'
  }).then((r) => r.json());
}

export function getByApproach(baseUrl: string, challenge: string): Promise<ISummaryResponse> {
  return fetch(`${baseUrl}/leaderboard/${challenge}/by-approach`, {
    cache: 'force-cache'
  }).then((r) => r.json());
}

const url = new URL(window.location.href).searchParams;
const minArea = url.has('minArea') ? parseFloat(url.get('minArea')!) : 0.001;


function parseDetails(data: IRawSubmissionDetails): ISubmissionDetails {
  const simplify = (roc: IRocEntry[]) => {
    if (roc.length < 100) {
      return roc;
    }
    const simplifier = simplifyLine(roc, (v) => v.fpr, (v) => v.tpr);
    return simplifier(minArea);
  };

  return {
    overall: data.overall,
    validation: data.validation,
    ...data.macro_average,
    scores: possibleCategories.map((entry) => Object.assign({}, entry, {
      accuracy: data.accuracy[entry.id],
      ap: data.ap[entry.id],
      auc: data.auc[entry.id],
      auc_sens_80: data.auc_sens_80[entry.id],
      dice: data.dice[entry.id],
      npv: data.npv[entry.id],
      ppv: data.ppv[entry.id],
      sensitivity: data.sensitivity[entry.id],
      specificity: data.specificity[entry.id],
      roc: data.roc[entry.id] ? simplify(data.roc[entry.id] || []) : []
    }))
  };
}

export function fetchDetails(baseUrl: string, submission: ISubmissionSummary): Promise<ISubmissionDetails> {
  if (submission.details) {
    return Promise.resolve(submission.details);
  }
  return fetch(`${baseUrl}/submission/${submission.submission_id}/score`, {
    cache: 'force-cache'
  }).then((r) => r.json()).then(parseDetails).then((details) => {
    submission.details = details;
    return details;
  });
}
