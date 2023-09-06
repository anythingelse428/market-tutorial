<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link fw-medium" :class="{'active': routeName == 'home'}" aria-current="page" to="/">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-medium" :class="{'active': routeName == 'catalog'}" aria-current="page" to="/catalog">Каталог</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-medium" :class="{'active': routeName == 'cart'}" aria-current="page" to="/cart">Корзина</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script lang="ts" setup>
import router from "@/router";
import { computed, ComputedRef } from "vue";

const routeName: ComputedRef<string> = computed((): string => router.currentRoute.value.name as string)

</script>

<style lang="scss">
.nav-link {
  text-transform: uppercase;
}
</style>
