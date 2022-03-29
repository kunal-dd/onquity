export interface JwtPayload {
  readonly email: string;
  readonly session_id?: string
}
