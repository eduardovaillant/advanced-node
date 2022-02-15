import { AwsS3FileStorage } from '@/infra/gateways'

import { mocked } from 'ts-jest/utils'
import { config, S3 } from 'aws-sdk'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let accessKeyId: string
  let secretAccessKey: string
  let bucket: string
  let key: string
  let sut: AwsS3FileStorage

  beforeAll(() => {
    accessKeyId = 'any_access_key_id'
    secretAccessKey = 'any_secret_access_key'
    bucket = 'any_bucket'
    key = 'any_key'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKeyId, secretAccessKey, bucket)
  })

  it('should config aws credentials on create', () => {
    expect(config.update).toHaveBeenCalledWith({ credentials: { accessKeyId, secretAccessKey } })
    expect(config.update).toHaveBeenCalledTimes(1)
  })

  describe('upload()', () => {
    let file: Buffer
    let putObjectSpy: jest.Mock
    let putObjectPromiseSpy: jest.Mock

    beforeAll(() => {
      file = Buffer.from('any_buffer')
      putObjectPromiseSpy = jest.fn()
      putObjectSpy = jest.fn().mockImplementation(() => ({ promise: putObjectPromiseSpy }))
      mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ putObject: putObjectSpy })))
    })

    it('should call putObject with correct input', async () => {
      await sut.upload({ file, key })

      expect(putObjectSpy).toBeCalledWith(
        {
          Bucket: bucket,
          Key: key,
          Body: file,
          ACL: 'public-read'
        }
      )
      expect(putObjectSpy).toHaveBeenCalledTimes(1)
      expect(putObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })

    it('should return imageUrl', async () => {
      const imageUrl = await sut.upload({ file, key })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${key}`)
    })

    it('should return encoded imageUrl', async () => {
      const imageUrl = await sut.upload({ file, key: 'any key' })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/any%20key`)
    })

    it('should rethrow if putObject throws', async () => {
      const error = new Error('upload_error')
      putObjectPromiseSpy.mockRejectedValueOnce(error)

      const promise = sut.upload({ file, key })

      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('delete()', () => {
    let deleteObjectSpy: jest.Mock
    let deleteObjectPromiseSpy: jest.Mock

    beforeAll(() => {
      deleteObjectPromiseSpy = jest.fn()
      deleteObjectSpy = jest.fn().mockImplementation(() => ({ promise: deleteObjectPromiseSpy }))
      mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ deleteObject: deleteObjectSpy })))
    })

    it('should call deleteObject with correct input', async () => {
      await sut.delete({ key })

      expect(deleteObjectSpy).toBeCalledWith(
        {
          Bucket: bucket,
          Key: key
        }
      )
      expect(deleteObjectSpy).toHaveBeenCalledTimes(1)
      expect(deleteObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })

    it('should rethrow if deleteObject throws', async () => {
      const error = new Error('delete_error')
      deleteObjectPromiseSpy.mockRejectedValueOnce(error)

      const promise = sut.delete({ key })

      await expect(promise).rejects.toThrow(error)
    })
  })
})
