import { getDataForCreating } from '@libs/parse-date'
import { Database, db, ProductQueries, CommonQueries } from 'src/db'
import { DBTables } from 'src/constants'
import type { CreateProductData, Product } from 'src/types'

class ProductService {
  #db: Database

  constructor(db: Database) {
    this.#db = db
  }

  createProduct = async (product: CreateProductData): Promise<string> => {
    const dbClient = await this.#db.getClient()

    try {
      await dbClient.query(CommonQueries.begin())

      const { count, ...rest } = product

      const productTable = getDataForCreating(rest)
      const { rows } = await dbClient.query(
        CommonQueries.create(DBTables.PRODUCTS, productTable.columns, productTable.values),
      )
      const product_id = rows[0].id

      const stockTable = getDataForCreating({ count, product_id }, [{ currentName: 'count', newName: '"count"' }])
      await dbClient.query(CommonQueries.create(DBTables.STOCKS, stockTable.columns, stockTable.values))

      await dbClient.query(CommonQueries.commit())

      return product_id
    } catch (error) {
      await dbClient.query(CommonQueries.rollback())
      throw error
    } finally {
      dbClient.release()
    }
  }

  getProductById = async (id: string): Promise<Product | null> => {
    const { rows } = await this.#db.query(ProductQueries.getById(id))

    return rows.length ? rows[0] : null
  }

  getAllProducts = async (): Promise<Product[]> => {
    const data = await this.#db.query(ProductQueries.getAll())

    return data.rows
  }
}

const productService = new ProductService(db)

export { productService }
