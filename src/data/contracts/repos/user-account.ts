export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<void>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined
}

export interface CreateUserAccountRepository {
  createFromFacebook: (params: CreateUserAccountRepository.Params) => Promise<CreateUserAccountRepository.Result>
}

export namespace CreateUserAccountRepository {
  export type Params = {
    name: string
    email: string
    facebookId: string
  }

  export type Result = undefined
}
