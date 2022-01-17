import { mock, MockProxy } from 'jest-mock-extended'

describe('Authorize', () => {
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize
  let token: string

  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('should call TokenValidator with correct params', async () => {
    await sut({ token })

    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })
})

type Setup = (crypto: TokenValidator) => Authorize
type Input = {token: string}
export type Authorize = (params: Input) => Promise<void>
export const setupAuthorize: Setup = crypto => async params => {
  await crypto.validateToken(params)
}

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<void>
}

export namespace TokenValidator {
  export type Params = {token: string}
}
