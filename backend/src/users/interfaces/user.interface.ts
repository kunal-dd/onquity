import { ROLES } from 'src/utils/constant';

export interface IUsers {
  readonly id: number;
  readonly full_name: string;
  readonly email: string;
  readonly mobile_no: number;
  password: string;
  readonly role: ROLES;
  reset_password_otp? : string
  session_id?: string
}
