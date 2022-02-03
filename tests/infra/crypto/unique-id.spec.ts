import { UUIDGenerator } from '@/domain/contracts/gateways'

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

export class UniqueID {
  constructor (
    private readonly date: Date
  ) {}

  uuid ({ key }: UUIDGenerator.Input): UUIDGenerator.Output {
    return key +
    '_' +
    this.date.getFullYear().toString() +
    (this.date.getMonth() + 1).toString().padStart(2, '0') +
    this.date.getDate().toString().padStart(2, '0') +
    this.date.getHours().toString().padStart(2, '0') +
    this.date.getMinutes().toString().padStart(2, '0') +
    this.date.getSeconds().toString().padStart(2, '0')
  }
}
