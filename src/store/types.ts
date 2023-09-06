export interface IProduct {
  image: string,
  title: string,
  price: number,
  article: string,
  available: boolean,
  category: string,
}

export type TProductFilter = Exclude<keyof IProduct, 'image' | 'available'>

export type IProductCart = IProduct & {
  count?: number
}
