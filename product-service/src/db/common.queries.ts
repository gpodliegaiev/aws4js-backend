export class CommonQueries {
  static begin = (): string => 'BEGIN'
  static commit = (): string => 'COMMIT'
  static rollback = (): string => 'ROLLBACK'
  static create = (table: string, columns: string, values: string): string => {
    return `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING id`
  }
}
