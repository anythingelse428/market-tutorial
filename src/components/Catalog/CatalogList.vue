<template>
  <div class="catalog-list">
    <catalog-item v-for="product in products" :data="product" :key="product.article" />
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '../../store/store';
import CatalogItem from './CatalogItem.vue';
import { IProduct } from '../../store/interfaces';
import { PropType, defineProps } from 'vue';
const props = defineProps({
  products: {
    type: Array as PropType<IProduct[]>,
    required: true
  }
})
// const store = useProductStore()

// const products: IProduct[] | undefined = store.product()

// const a = store.categories
</script>