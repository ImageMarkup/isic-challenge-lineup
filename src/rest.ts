import { ISummaryResponse, ISubmissionSummary, IRawSubmissionDetails, ISubmissionDetails } from './model';


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

function parseDetails(data: IRawSubmissionDetails): ISubmissionDetails {
  return {
    overall: data.overall,
    validation: data.validation,
    ...data.macro_average
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
