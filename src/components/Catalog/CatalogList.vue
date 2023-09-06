<template>
  <div class="catalog-list">
    <catalog-item v-for="product in products"
    :data="product"
    :key="product.article" />
  </div>
</template>

<script lang="ts" setup>
import CatalogItem from './CatalogItem.vue'
import { IProduct } from '../../store/types'
import { PropType, defineProps } from 'vue'

const props = defineProps({
  products: {
    type: Array as PropType<IProduct[]>,
    required: true
  }
})
</script>

<style lang="scss">
.catalog-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

</style>
