<!-- SimpleKeyboard.vue -->
<template>
  <div class="keyboard-box">
    <div :class="keyboardClass"></div>
  </div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { onMounted, ref, watch } from "vue";


import delIcon from "@/assets/img/yes.svg";
import lockIcon from "@/assets/img/yes.svg";
import bigIcon from "@/assets/img/yes.svg";

const emit = defineEmits(["onChange", "onKeyPress"]);
const visible = ref(true);
const props = defineProps({
  keyboardClass: { type: String, default: "simple-keyboard" },
  input: String,
  layout: {
    type: Object,
    default: () => {
      return {
        default: [
          "1 2 3 {bksp}",
          "4 5 6 .",
          "7 8 9 @",
          "{close} 0 {abc} {enter}",
        ],
        abc: [
          "q w e r t y u i o p",
          "a s d f g h j k l",
          "{lock} z x c v b n m {bksp}",
          "{123} . 0 @ {close} {enter}",
        ],
        lock: [
          "Q W E R T Y U I O P",
          "A S D F G H J K L",
          "{big} Z X C V B N M {bksp}",
          "{123} . 0 @ {close} {enter}",
        ],
      };
    },
  },
});
let keyboard = ref(null);
onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    onChange: onChange,
    onKeyPress: onKeyPress,
  });
  keyboard.value.setOptions({
    layoutName: "default",
    layout: props.layout,
    display: {
      "{enter}": "enter",
      "{123}": "123",
      "{tab}": "tab",
      "{shift}": "shift",
      "{space}": " ",
      "{bksp}": 'delete',
      "{big}": 'lockIcon',
      "{lock}": 'bigIcon',
      "{close}": "close",
      "{abc}": "abc",
    },
  });
});

watch(() => props.input, (newValue, oldValue) => {
  keyboard.value.setInput(newValue);
});

const onChange = (input) => {
  emit("onChange", input);
};

const onKeyPress = (button) => {
  emit("onKeyPress", button);
  if (button === "{123}" || button === "{abc}") {
    handleShift();
  }
  if (button === "{lock}" || button === "{big}") {
    handleLock();
  }
};

const handleShift = () => {
  let currentLayout = keyboard.value.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "abc" : "default";
  keyboard.value.setOptions({
    layoutName: shiftToggle,
  });
};

const handleLock = () => {
  let currentLayout = keyboard.value.options.layoutName;
  let shiftToggle = currentLayout === "abc" ? "lock" : "abc";
  keyboard.value.setOptions({
    layoutName: shiftToggle,
  });
};
</script>

<style scoped>
.keyboard-box {
  width: 100%;
  margin: auto;
}
.simple-keyboard {
  background: none !important;
  font-size: 20px;
}
::v-deep(.hg-button:nth-of-type(4)),
::v-deep(.hg-button-close),
::v-deep(.hg-button-abc) {
  box-sizing: border-box;
  width: 20px;
  max-width: none !important;
}
</style>