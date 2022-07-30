export class ProductQueries {
  static getById = (id: string): string => {
    return `
      SELECT
        p.*,
        s."count"
      FROM
        products p
      LEFT JOIN stocks s ON s.product_id = p.id
      WHERE p.id = '${id}'`
  }

  static getAll = (): string => {
    return `
      SELECT
        p.*,
        s."count"
      FROM
        products p
      LEFT JOIN stocks s ON s.product_id = p.id`
  }
}
