<script setup>
import { ref } from 'vue';
import SimpleKeyboard from '@/components/SimpleKeyboard.vue';
const show = ref(false);
const currentText = ref('')
const keyboardClass = ref('keyboardClass')
const inputValue = ref('')
const  onChange = (input) => {
  inputValue.value = input;
}
const onKeyPress = (button) => {
  if(button === '{enter}' || button === '{close}') {
    show.value = false
  }
  console.log('Button pressed:', button);
}
</script>

<template>
  <div class="home_page">
          <textarea  v-model="currentText" @click.stop @touchstart.prevent @touchstart.stop="show = true"></textarea>
    <SimpleKeyboard v-if="show === true"
                    :keyboardClass="keyboardClass"
                    @onChange="onChange"
                    @onKeyPress="onKeyPress"
                    :input="inputValue"
    />
    </div>
</template>

<style scoped>

</style>