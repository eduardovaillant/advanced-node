import { FacebookAccount } from '@/domain/entities'

describe('FacebookAcount', () => {
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookId: 'any_facebook_id'
  }

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(
      {
        name: 'any_fb_name',
        email: 'any_fb_email',
        facebookId: 'any_facebook_id'
      }
    )
  })

  it('should update the name if its empty', () => {
    const accountData = { id: 'any_id' }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual(
      {
        id: 'any_id',
        name: 'any_fb_name',
        email: 'any_fb_email',
        facebookId: 'any_facebook_id'
      }
    )
  })

  it('should not update the name if its not empty', () => {
    const accountData = { id: 'any_id', name: 'any_name' }

    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual(
      {
        id: 'any_id',
        name: 'any_name',
        email: 'any_fb_email',
        facebookId: 'any_facebook_id'
      }
    )
  })
})
