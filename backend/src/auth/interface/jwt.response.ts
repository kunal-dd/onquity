import User from "src/users/entities/user.entity";

export interface JwtResponse {
    user: User;
    session_id?: string
  }
  