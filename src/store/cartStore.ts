import { defineStore } from "pinia";
import { IProductCart } from "./types";

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: localStorage.getItem('marketCart') ?
      [...JSON.parse(localStorage.getItem('marketCart') as string)] :
      [] as IProductCart[]
  }),

  actions: {
    setProductsToLS() {
      localStorage.setItem('marketCart', JSON.stringify(this.products))
    },
    addProduct(product: IProductCart) {
      if (this.products.filter(el => el.article == product.article)?.length == 0) {
        product.count = 1
        this.products.push(product)
        this.setProductsToLS()
      } else {
        this.changeCountProduct('incr', product.article)
      }
    },
    removeProductFromCart(article: string) {
      this.products = this.products.filter(el => el.article != article)
      this.setProductsToLS()
    },
    changeCountProduct(action: string, article: string) {
      this.products.forEach(item => {
        if (item.article === article && action === 'incr') {
          item.count += 1
        } else if (item.article == article && action === 'desc') {
          if (item.count - 1 === 0) {
            this.removeProductFromCart(article)
          } else {
            item.count -= 1
          }
        }
      })
      this.setProductsToLS()
    },
    getProductByArticle(article: string) {
      const product = this.products.filter(item => {
        if (item.article === article) {
          return item
        }
      })
      return product?.length > 0 ? product[0] : null
    }
  },
})
