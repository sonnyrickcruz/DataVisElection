import { CandidateModel } from './candidate.model';
import { VoterModel } from './voter.model';

export class VoteModel {
    voteId: number;
    candidate: CandidateModel;
    voter: VoterModel;
}
