<script setup >
import { ref } from 'vue'
import StartPage from "./components/startPage.vue";


const showLoading = ref(true)
setTimeout(() => {
  showLoading.value = false;
}, 3000);

</script>


<template>
<!--  <van-nav-bar safe-area-inset-top />-->
    <StartPage v-if="showLoading"></StartPage>
    <div v-else>
<!--      <keep-alive include="IndexView">-->
<!--      <router-view />-->
<!--      </keep-alive>-->
<!--      <router-view v-slot="{ Component }">-->
<!--        <keep-alive>-->
<!--          <component :is="Component" />-->
<!--        </keep-alive>-->
<!--      </router-view>-->
      <keep-alive exclude="IndexView">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </keep-alive>
    </div>
  <van-number-keyboard safe-area-inset-bottom />
</template>


<style scoped>

</style>
