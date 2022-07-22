import { Database, db, ProductQueries } from 'src/db'
import { Product } from 'src/types/product.types'

class ProductService {
  #db: Database

  constructor(db: Database) {
    this.#db = db
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
