import { defineStore } from 'pinia'
import axios from 'axios'
import { IProduct, TProductFilter } from './types'
import { LocationQueryValue } from 'vue-router'
export const useProductStore = defineStore('products', {
  state: () => ({ products: [] as IProduct[] }),
  getters: {
    categories(state): Set<string> {
      return new Set(state.products.map(product => product.category))
    },
    product(state) {
      return (filter?: { [x: string]: LocationQueryValue | LocationQueryValue[] }) => {
        if (!filter) {
          return state.products
        }
        let filtered = Object.assign([], state.products);

        for (const [key, value] of Object.entries(filter)) {
          const range = String(value).split(',')
            .map(el => Number(el))
          switch (key) {
            case 'price':
              if (range.length === 2) {
                filtered = filtered.filter(el => 
                  Number(el[key as TProductFilter]) >= range[0] && Number(el[key as TProductFilter]) <= range[1])
              }
              break;
            case 'category':
              if (value?.length) {
                filtered = filtered.filter(el => 
                  (el[key as TProductFilter] as string).indexOf(value as string) > -1)
              }
              break;
            case 'title':
              if (value?.length) {
                filtered = filtered.filter(el => 
                  (el[key as TProductFilter] as string)?.toLowerCase()
                  .includes((value as string).toLowerCase()) === true)
              }
              break;
            default:
              return filtered
          }
        }
        return filtered
      }
    },
  },
  actions: {
    setProducts() {
      axios.get<{ products: IProduct[] }>('http://localhost:8080/db.json')
      .then(({ data }) => {
        this.products = data.products
      })
    }
  }
})
