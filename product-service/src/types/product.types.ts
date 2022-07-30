export interface CreateProductData {
  title: string
  description?: string
  price?: number
  count?: number
}

export interface Product {
  id: string
  title: string
  count: number
  description?: string
  price?: number
}

export type ProductList = Product[]
