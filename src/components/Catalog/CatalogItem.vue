<template>
  <div class="card" v-if="data">
    <img :src="data.image" class="card-img-top" alt="">
    <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title">{{ data.title }}</h5>
      <p class="card-text card-price my-0">Цена: <b>{{ data.price }}</b> руб.</p>
      <p class="card-text card-category">Категории: {{ data.category }}</p>
      <button class="catalog-item__btn add-to-cart btn btn-primary mt-auto" @click="cartStore.addProduct(data)"
        v-if="router.currentRoute.value.path.indexOf('cart') == -1 && !cartStore.getProductByArticle(data.article)">Добавить в корзину</button>

      <div class="cart-item__btns d-flex flex-column align-items-center gap-3"
        v-if="router.currentRoute.value.path.indexOf('cart') != -1 || cartStore.getProductByArticle(data.article)">
        <div class="cart-item__btns--count-change d-flex align-items-center gap-3">

          <button class="catalog-item__btn incr btn btn-outline-dark"
            @click="cartStore.changeCountProduct('incr', props.data.article)">+</button>

          <span class="cart-item count fs-3">{{ data?.count ??  cartStore.getProductByArticle(data.article).count}}</span> 

          <button class="catalog-item__btn desc btn btn-outline-dark"
            @click="cartStore.changeCountProduct('desc', props.data.article)">-</button>
        </div>

        <button class="catalog-item__btn remove-from-cart btn btn-danger"
          @click="cartStore.removeProductFromCart(data.article)">Удалить
          из корзины</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store/cartStore';
import { IProduct, IProductCart } from '../../store/types';
import { defineProps, PropType } from 'vue'
import router from '@/router';


const props = defineProps({
  data: {
    type: Object as PropType<IProduct | IProductCart>,
    required: true
  }
})

const cartStore = useCartStore()

</script>

<style lang="scss">
.card {
  width: 20rem;
}
</style>
