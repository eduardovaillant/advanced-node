import { UploadFile } from '@/domain/contracts/gateways'

import { config, S3 } from 'aws-sdk'

export class AwsS3FileStorage implements UploadFile {
  constructor (
    accessKeyId: string,
    secretAccessKey: string,
    private readonly bucket: string
  ) {
    config.update({ credentials: { accessKeyId, secretAccessKey } })
  }

  async upload ({ file, key }: UploadFile.Input): Promise<UploadFile.Output> {
    const s3 = new S3()
    await s3.putObject({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ACL: 'public-read'
    }).promise()
    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(key)}`
  }
}
