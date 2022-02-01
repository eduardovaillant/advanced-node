import { UserProfile } from '@/domain/entities'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_id')
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPictureUrl({ pictureUrl: 'any_url', name: 'any_name' })

    expect(sut).toEqual(
      {
        id: 'any_id',
        pictureUrl: 'any_url',
        initials: undefined
      }
    )
  })

  it('should create with empty initials when pictureUrl is provided', () => {
    sut.setPictureUrl({ pictureUrl: 'any_url' })

    expect(sut).toEqual(
      {
        id: 'any_id',
        pictureUrl: 'any_url',
        initials: undefined
      }
    )
  })

  it('should create initials with first letter of first and last name', () => {
    sut.setPictureUrl({ name: 'eduardo brito vaillant' })

    expect(sut).toEqual(
      {
        id: 'any_id',
        pictureUrl: undefined,
        initials: 'EV'
      }
    )
  })

  it('should create initials with first two letters of name', () => {
    sut.setPictureUrl({ name: 'eduardo' })

    expect(sut).toEqual(
      {
        id: 'any_id',
        pictureUrl: undefined,
        initials: 'ED'
      }
    )
  })

  it('should create initials with first letter', () => {
    sut.setPictureUrl({ name: 'e' })

    expect(sut).toEqual(
      {
        id: 'any_id',
        pictureUrl: undefined,
        initials: 'E'
      }
    )
  })

  it('should create with empty initials when name and pictureUrl are not provided', () => {
    sut.setPictureUrl({ name: '' })

    expect(sut).toEqual(
      {
        id: 'any_id',
        pictureUrl: undefined,
        initials: undefined
      }
    )
  })
})
