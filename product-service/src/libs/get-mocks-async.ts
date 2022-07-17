import { Product } from 'src/types/product.types'
import products from '../../mocks/products.json'

export const getMocksAsync = (): Promise<Product[]> => Promise.resolve(products)
