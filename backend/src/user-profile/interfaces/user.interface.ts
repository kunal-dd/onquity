import { INDIVIDUAL_USER_TYPE, TRUE_FALSE_ENUM } from "src/utils/constant";

export interface IUserProfile {
  readonly user_type: INDIVIDUAL_USER_TYPE;
  readonly current_position: string;
  readonly industry: string;
  readonly location: string;
  readonly headline: string;
  readonly is_student: TRUE_FALSE_ENUM;
  readonly is_age_verified: TRUE_FALSE_ENUM;
  readonly about: string;
  readonly area_of_expertise: string[];
  readonly total_work_experience: string;
  profile_completion: string;
}
