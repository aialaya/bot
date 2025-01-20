<template>
  <Transition name="up">
    <div class="toasts" v-show="visible">
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const visible = ref(false);
onMounted(() => {
  visible.value = true;
});

</script>
<style scoped>
.toasts {
  max-width: 95vw;
  min-height: 40px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  bottom: 16%;
  background: rgba(17, 17, 17, 0.7);
  color: #fff;
  border-radius: 36px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  transform: translateX(-50%) translateY(-50%);
  padding: 16px;
  line-height: 40px;
  white-space: pre;
}
.up-enter-from {
  bottom: 0;
  opacity: 0;
}
.up-enter-active {
  transition: all 0.5s;
}
.up-enter-to {
  opacity: 1;
  bottom: 16%;
}
</style>
