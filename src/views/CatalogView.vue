<template>
  <div class="catalog-page">
    <catalog-filter @filter="(e) => filterProducts(e)" />
    <catalog-list v-if="products" :products="products" />
  </div>
</template>
<script lang="ts" setup>
import CatalogFilter from '@/components/Catalog/CatalogFilter.vue';
import CatalogList from '../components/Catalog/CatalogList.vue'
import { Ref, ref } from 'vue';
import { useProductStore } from '@/store/store';
import { IProduct } from '@/store/interfaces';
import router from '@/router';
import { useRoute, useRouter } from 'vue-router';
const store = useProductStore()
const products: Ref<IProduct[] | undefined> = ref(store.product())
const currentRoute = useRouter().currentRoute
async function filterProducts(params: { name: string, value?: string, range?: { min: number, max: number } }) {
  const query = currentRoute.value.query
  await router.push({ query: { ...query, [params.name]: params.value ?? params.range?.min + ',' + params.range?.max } })
  products.value = store.product({ ...currentRoute.value.query })
}
</script>