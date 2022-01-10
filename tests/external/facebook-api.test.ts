import { env } from '@/main/config/env'
import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'

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
    const fbUser = await sut.loadUser({ token: 'EAAsVfRM84ysBAE6hUIfAavp1mTmeA0EAgZAWnlZAZB3IA3R1jtJeM0mmJXSWeZC0DTdBVLxrnTUbcTU8JCBWxR8AoSqyuttuhU3vgP0F0FapWmMOnPzMLj1fsnhQztl6KygRTObEbzs4Pg3Wy3z4WlWJTGZASXEi01XUlwHX3gB63y0hoCq1TenG3bhZC1viGZC9KQqGV20YhnDZCX3i6x22' })

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
