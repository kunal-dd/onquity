import { INDIVIDUAL_USER_TYPE, ROLES, WORKPLACE_TYPE, WORK_COMMITMENT_TYPE } from 'src/utils/constant';

export interface IPost {
  readonly id: number;
  readonly post_title: string;
  readonly categories: INDIVIDUAL_USER_TYPE[];
  readonly work_commitment: WORK_COMMITMENT_TYPE;
  readonly workplace: WORKPLACE_TYPE;
  readonly description: string;
  readonly equity: string;
  readonly expertise: string[];
}
