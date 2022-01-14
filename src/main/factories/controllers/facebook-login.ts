import { makeFacebookAuthentication } from '@/main/factories/use-cases'
import { FacebookLoginControler } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginControler => {
  return new FacebookLoginControler(makeFacebookAuthentication())
}
