import { ITaskSummaryResponse, ISubmissionSummary, IRawSubmissionDetails, ISubmissionDetails, IRocEntry, IChallengeResponse } from './model';
import { possibleCategories } from './components/constants';
import { simplifyLine } from './data';


// https://challenge.isic-archive.com/api/challenge/39

export function getChallenge(baseUrl: string, challenge: string): Promise<IChallengeResponse> {
  return fetch(`${baseUrl}/challenge/${challenge}`, {
    cache: 'force-cache'
  }).then((r) => r.json());
}

// https://challenge.isic-archive.com/api/leaderboard/52/by-team?limit=200&offset=0

export function getByTeam(baseUrl: string, task: number): Promise<ITaskSummaryResponse> {
  return fetch(`${baseUrl}/leaderboard/${task}/by-team`, {
    cache: 'force-cache'
  }).then((r) => r.json());
}

export function getByApproach(baseUrl: string, task: number): Promise<ITaskSummaryResponse> {
  return fetch(`${baseUrl}/leaderboard/${task}/by-approach`, {
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
    scores: possibleCategories.map((entry) => Object.assign({}, entry, data[entry.id] || {}, {
      roc: data[entry.id] ? simplify(data[entry.id].roc || []) : []
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
