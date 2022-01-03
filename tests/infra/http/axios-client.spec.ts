import { AxiosHttpClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let fakeAxios: jest.Mocked<typeof axios>
  let sut: AxiosHttpClient
  let url: string
  let params: object

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('should call get with correct params', async () => {
    await sut.get({ url, params })

    expect(fakeAxios.get).toHaveBeenCalledWith(url, { params: params })
    expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if get throws', async () => {
    fakeAxios.get.mockRejectedValueOnce(new Error('http-error'))

    const promise = sut.get({ url, params })

    await expect(promise).rejects.toThrow(new Error('http-error'))
  })
})
