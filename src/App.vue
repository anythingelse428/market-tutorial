<template>
  <my-navbar></my-navbar>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from './store/catalogStore';
import MyNavbar from './components/MyNavbar.vue';

const catalogStore = useProductStore()
catalogStore.setProducts()

</script>

