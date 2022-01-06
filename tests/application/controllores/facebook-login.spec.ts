describe('FacebookLoginControler', () => {
  it('should return 400 if token is empty', async () => {
    const sut = new FacebookLoginControler()

    const httpResponse = await sut.handle({ token: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The token field is required!')
    })
  })

  it('should return 400 if token is null', async () => {
    const sut = new FacebookLoginControler()

    const httpResponse = await sut.handle({ token: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The token field is required!')
    })
  })
})

class FacebookLoginControler {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The token field is required!')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}
