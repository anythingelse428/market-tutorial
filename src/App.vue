<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/catalog">Catalog</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useProductStore } from './store/store';

const store = useProductStore()
store.setProducts()
</script>
