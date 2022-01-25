import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/gateways'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use-cases'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepository(),
    makeJwtTokenHandler()
  )
}
