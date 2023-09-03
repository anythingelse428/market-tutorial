<template>
  <div class="catalog-item">
    <div class="catalog-item__img">
      <img :src="data.image" alt="" width="100" height="100">
    </div>
    <div class="catalog-item__title">{{ data.title }}</div>
    <div class="catalog-item__price">{{ data.price }}</div>
    <div class="catalog-item__category">{{ data.category }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IProduct } from '../../store/interfaces';
import { defineProps, PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<IProduct>,
    required: true
  }
})
</script>