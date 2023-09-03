<template>
  <div class="catalog-filter">
    <input name="catalog-filter__item --search" placeholder="Найти"
      @input="$emit('filter', { name: 'title', value: title })" v-model="title" />
    <div class="catalog-filter__item --category" v-for="(category, idx) in categories" :key="idx"
      @click="$emit('filter', { name: 'category', value: category })">
      {{ category }}
    </div>
    <div class="catalog-filter__item" @click="$emit('filter', { name: 'category', value: '' })">
      Все
    </div>

    по цене
    <div class="catalog-filter__item --price">
      <input v-model="minPrice" type="number" name="min" step="1" min="0">
      <input v-model="maxPrice" type="number" name="max" step="1" min="0">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, onMounted, ref, watch } from 'vue';
import { useProductStore } from '@/store/store';
import router from '@/router';
const store = useProductStore()
const categories = store.categories
const emit = defineEmits(['filter'])
const price = router.currentRoute.value.query?.price as string
const [initialMin, initialMax] = price?.split(',').map(el => Number(el)) || [0, 10000]
const initialCategory = router.currentRoute.value.query?.category as string || ''
const initialTitle = router.currentRoute.value.query?.title as string || ''
const minPrice = ref(initialMin)
const maxPrice = ref(initialMax)
const title = ref(initialTitle)
function emitFilter() {
  if (Number.isInteger(minPrice.value) && Number.isInteger(maxPrice.value)) {
    emit('filter', { name: 'price', range: { min: minPrice.value, max: maxPrice.value } })
  }
}
watch([minPrice, maxPrice], emitFilter)
watch([minPrice, maxPrice], ([min, max]) => {
  if (min >= max) {
    maxPrice.value = min
    minPrice.value = max
  }
})
onMounted(() => {
  emitFilter()
  emit('filter', { name: 'category', value: initialCategory })
  emit('filter', { name: 'title', value: initialTitle })
})
</script>