import { ISummaryResponse, ISubmissionSummary, IRawSubmissionDetails, ISubmissionDetails } from './model';


// https://challenge.isic-archive.com/api/leaderboard/52/by-team?limit=200&offset=0

export function getByTeam(baseUrl: string): Promise<ISummaryResponse> {
  return fetch(`${baseUrl}/by-team`).then((r) => r.json());
}

export function getByApproach(baseUrl: string): Promise<ISummaryResponse> {
  return fetch(`${baseUrl}/by-approach`).then((r) => r.json());
}

function parseDetails(data: IRawSubmissionDetails): ISubmissionDetails {
  return {
    overall: data.overall,
    validation: data.validation
  };
}

export function fetchDetails(baseUrl: string, submission: ISubmissionSummary): Promise<ISubmissionDetails> {
  return fetch(`${baseUrl}/submission/${submission.submission_id}/score`).then((r) => r.json()).then(parseDetails);
}
