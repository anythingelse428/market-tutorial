<template>
  <div class="catalog-filter d-flex justify-content-between pb-4">
    <input class="catalog-filter__item --search" name="search" type="text" placeholder="Найти"
      @input="$emit('filter', { name: 'title', value: title })" v-model="title" />

    <div class="catalog-filter__item--categories d-flex gap-2">
      <button class="catalog-filter__item --category btn"
              :class="currentFilterCategory != category ? 'btn-outline-secondary' : 'btn-secondary'"
              v-for="(category, idx) in categories"
              :key="idx"
              @click="$emit('filter', { name: 'category', value: category })">
        {{ category }}
      </button>
      <button class="catalog-filter__item --category btn"
              :class="currentFilterCategory != '' ? 'btn-outline-secondary' : 'btn-secondary'"
              @click="$emit('filter', { name: 'category', value: '' })">
        Все
      </button>
    </div>
    <div class="catalog-filter__item --price">
      Цена:
      <input v-model="minPrice" class="py-1 mx-2" type="number" name="min" step="1" min="0">
      <input v-model="maxPrice" class="py-1" type="number" name="max" step="1" min="0">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, defineEmits, onMounted, ref, watch } from 'vue';
import { useProductStore } from '@/store/catalogStore';
import router from '@/router';

const store = useProductStore()
const categories = store.categories

const emit = defineEmits(['filter'])

const initialCategory = router.currentRoute.value.query?.category as string || ''

const price = router.currentRoute.value.query?.price as string
const [initialMin, initialMax] = price?.split(',').map(el => Number(el)) || [0, 10000]
const minPrice = ref(initialMin)
const maxPrice = ref(initialMax)

const initialTitle = router.currentRoute.value.query?.title as string || ''
const title = ref(initialTitle)

function emitFilter() {
  if (Number.isInteger(minPrice.value)
    && Number.isInteger(maxPrice.value)) {
    emit('filter', {
      name: 'price',
      range: { min: minPrice.value, max: maxPrice.value }
    })
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

const currentFilterCategory: ComputedRef<string> = computed((): string => router.currentRoute.value.query.category as string || '')

</script>

<style lang="scss">
input {
  border-radius: 0.4rem;
  border: none;
  border-bottom: 1px solid #ccc;
  padding-left: 0.5rem;
  transition: all 400ms;

  &:focus {
    outline: none;
    border-bottom: 1px solid black;
    background-color: #ccc;
  }

  &[type=number] {
    &::-webkit-inner-spin-button {
      opacity: 1;
    }
  }
}
</style>
