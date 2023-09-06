<template>
  <h1 v-if="cartStore?.products?.length == 0"
      class="mt-4 text-center align-self-center">Корзина пуста</h1>
  <catalog-list v-else :products="cartStore.products"></catalog-list>
</template>

<script lang="ts" setup>
import { useCartStore } from "@/store/cartStore";
import CatalogList from "@/components/Catalog/CatalogList.vue";

const cartStore = useCartStore()

</script>
