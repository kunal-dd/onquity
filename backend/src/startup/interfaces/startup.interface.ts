import { COMPANY_SIZE, COMPANY_TYPE } from 'src/utils/constant';

export interface IStartupProfile {
  readonly startup_name: string;
  readonly startup_tagline: string;
  readonly incorporation_date: Date;
  readonly website: string;
  readonly description: string;
  readonly industry: string;
  readonly company_size: COMPANY_SIZE;
  readonly company_type: COMPANY_TYPE;
  readonly location: string;
  profile_completion: string;
}
