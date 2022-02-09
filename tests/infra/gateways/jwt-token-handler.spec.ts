import { JwtTokenHandler } from '@/infra/gateways'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let sut: JwtTokenHandler
  let fakeJwt: jest.Mocked<typeof jwt>
  let key: string
  let secret: string

  beforeAll(() => {
    key = 'any_key'
    secret = 'any_secret'
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => 'any_token')
  })

  beforeEach(() => {
    sut = new JwtTokenHandler(secret)
  })

  describe('generate()', () => {
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      token = 'any_token'
      expirationInMs = 1000
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sign with correct params', async () => {
      await sut.generate({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a token on success', async () => {
      const generatedToken = await sut.generate({ key, expirationInMs })

      expect(generatedToken).toBe(token)
    })

    it('should rethrow if get throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token-error') })

      const promise = sut.generate({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token-error'))
    })
  })

  describe('validate()', () => {
    let token: string

    beforeAll(() => {
      token = 'any_token'
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call sign with correct params', async () => {
      await sut.validate({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return the key used to sign', async () => {
      const signKey = await sut.validate({ token })

      expect(signKey).toBe(key)
    })

    it('should throw if verify returns null', async () => {
      fakeJwt.verify.mockImplementationOnce(() => null)

      const promise = sut.validate({ token })

      await expect(promise).rejects.toThrow()
    })
  })
})
