import { EntityRepository, Repository } from 'typeorm'
import RefreshToken from '../entities/refresh.entity'

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {}
