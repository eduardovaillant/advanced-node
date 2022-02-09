import { env } from '@/main/config/env'
import { FacebookApi, AxiosHttpClient } from '@/infra/gateways'

describe('FacebookAPI Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook user if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: env.facebookApi.accessToken })

    expect(fbUser).toEqual({
      facebookId: '105894805319913',
      name: 'Advanced Node Test',
      email: 'advanced_sonawft_test@tfbnw.net'
    })
  })

  it('should return a undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid_token' })

    expect(fbUser).toBeUndefined()
  })
})
