import { Middleware } from '@/application/middlewares'
import { RequiredStringValidator } from '@/application/validation'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { Authorize } from '@/domain/use-cases'

type HttpRequest = { authorization: string }
type Model = Error | { userId: string }

export class AuthenticationMiddleware implements Middleware {
  constructor (
    private readonly authorize: Authorize
  ) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!this.validate({ authorization })) return unauthorized()
    try {
      const userId = await this.authorize({ token: authorization })
      return ok({ userId })
    } catch {
      return unauthorized()
    }
  }

  private validate ({ authorization }: HttpRequest): boolean {
    const error = new RequiredStringValidator(authorization, 'authorization').validate()
    return error === undefined
  }
}
