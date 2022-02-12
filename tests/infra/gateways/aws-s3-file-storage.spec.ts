import { config } from 'aws-sdk'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let accessKeyId: string
  let secretAccessKey: string
  let sut: AwsS3FileStorage

  beforeAll(() => {
    accessKeyId = 'any_access_key_id'
    secretAccessKey = 'any_secret_access_key'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey)
  })

  it('should config aws credentials on create', () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({ credentials: { accessKeyId, secretAccessKey } })
    expect(config.update).toHaveBeenCalledTimes(1)
  })
})

class AwsS3FileStorage {
  constructor (
    private readonly accessKeyId: string,
    private readonly secretAccessKey: string
  ) {
    config.update({ credentials: { accessKeyId, secretAccessKey } })
  }
}
