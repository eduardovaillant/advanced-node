import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  it('should call get with correct params', async () => {
    const fakeAxios = axios as jest.Mocked<typeof axios>
    const sut = new AxiosClient()
    const params = {
      url: 'any_url',
      params: {
        any: 'any'
      }
    }

    await sut.get(params)

    expect(fakeAxios.get).toHaveBeenCalledWith('any_url', { params: { any: 'any' } })
    expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  })
})

export class AxiosClient {
  async get (args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}
