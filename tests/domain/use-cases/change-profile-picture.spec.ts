import { mock } from 'jest-mock-extended'

describe('ChangeProfilePicture', () => {
  it('should call UploadFile with correct input', async () => {
    const uuid = 'any_unique_id'
    const file = Buffer.from('any_file')
    const fileStorage = mock<UploadFile>()
    const crypto = mock<UUIDGenerator>()
    crypto.uuid.mockReturnValue(uuid)
    const sut = setupChangeProfilePicture(fileStorage, crypto)

    await sut({ file, id: 'any_id' })

    expect(fileStorage.upload).toHaveBeenCalledWith({ key: uuid, file })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = {id: string, file: Buffer}
type ChangeProfilePicture = (input: Input) => Promise<void>
const setupChangeProfilePicture: Setup = (fileStorage, crypto) => async ({ id, file }) => {
  await fileStorage.upload({ file, key: crypto.uuid({ key: id }) })
}

export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<void>
}

export namespace UploadFile {
  export type Input = {file: Buffer, key: string}
}
export interface UUIDGenerator {
  uuid: (input: UUIDGenerator.Input) => UUIDGenerator.Output
}

export namespace UUIDGenerator {
  export type Input = {key: string}
  export type Output = string
}
