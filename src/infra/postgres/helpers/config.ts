import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'kesavan.db.elephantsql.com',
  port: 5432,
  username: 'vbawbcxl',
  password: 'oPnUkq8ebENlieHoPccyld-YkTJyQTZ1',
  database: 'vbawbcxl',
  entities: ['dist/infra/postgres/entities/index.js']
}
