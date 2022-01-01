export class AccessToken {
  static expirationInMs: number = 30 * 60 * 1000

  constructor (private readonly value: string) {}
}
