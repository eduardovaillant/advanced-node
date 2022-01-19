import { UnauthorizedError } from '@/application/errors'
import { HttpResponse, unauthorized } from '@/application/helpers'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware

  beforeEach(() => {
    sut = new AuthenticationMiddleware()
  })

  it('should return 401 if authorization is empty', async () => {
    const httpResponse = await sut.handle({ authorization: '' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 401 if authorization is null', async () => {
    const httpResponse = await sut.handle({ authorization: null as any })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 401 if authorization is undefined', async () => {
    const httpResponse = await sut.handle({ authorization: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })
})

type HttpRequest = { authorization: string }

export class AuthenticationMiddleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Error>> {
    return unauthorized()
  }
}
