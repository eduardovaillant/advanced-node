import { mock } from 'jest-mock-extended'

describe('ChangeProfilePicture', () => {
  it('should call UploadFile with correct input', async () => {
    const file = Buffer.from('any_file')
    const fileStorage = mock<UploadFile>()
    const sut = setupChangeProfilePicture(fileStorage)

    await sut({ file, id: 'any_id' })

    expect(fileStorage.upload).toHaveBeenCalledWith({ key: 'any_id', file })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })
})

type Setup = (fileStorage: UploadFile) => ChangeProfilePicture
type Input = {id: string, file: Buffer}
type ChangeProfilePicture = (input: Input) => Promise<void>
const setupChangeProfilePicture: Setup = fileStorage => async ({ id, file }) => {
  await fileStorage.upload({ file, key: id })
}

export interface UploadFile {
  upload: (input: UploadFile.Input) => Promise<void>
}

export namespace UploadFile {
  export type Input = {file: Buffer, key: string}
}
