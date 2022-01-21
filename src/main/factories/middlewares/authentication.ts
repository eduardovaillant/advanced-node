import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { AuthenticationMiddleware } from '@/application/middlewares'
import { setupAuthorize } from '@/domain/use-cases'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  return new AuthenticationMiddleware(setupAuthorize(makeJwtTokenHandler()))
}
