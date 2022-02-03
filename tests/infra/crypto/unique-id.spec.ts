import { UniqueID } from '@/infra/crypto'

describe('UniqueID', () => {
  it('should return the correct uuid', () => {
    const sut = new UniqueID(new Date(2022, 9, 3, 10, 10, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20221003101010')
  })

  it('should return the correct uuid', () => {
    const sut = new UniqueID(new Date(2018, 2, 10, 18, 1, 0))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20180310180100')
  })
})
