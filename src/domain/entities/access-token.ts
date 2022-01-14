export class AccessToken {
  static expirationInMs: number = 30 * 60 * 1000

  constructor (readonly value: string) {}
}
