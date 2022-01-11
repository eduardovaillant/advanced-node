import { makeFacebookAuthenticationService } from '@/main/factories/services'
import { FacebookLoginControler } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginControler => {
  return new FacebookLoginControler(makeFacebookAuthenticationService())
}
