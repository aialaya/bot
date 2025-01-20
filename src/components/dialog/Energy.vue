<script setup>
import { ref } from 'vue'
import {  useTokenStore } from '@/store';
import B0 from '@/assets/img/energy/B0.svg'
import B1 from '@/assets/img/energy/B1.svg'
import B2 from '@/assets/img/energy/B2.svg'
import B3 from '@/assets/img/energy/B3.svg'
import B4 from '@/assets/img/energy/B4.svg'
import B5 from '@/assets/img/energy/B5.svg'
import B6 from '@/assets/img/energy/B6.svg'
import B7 from '@/assets/img/energy/B7.svg'
import B8 from '@/assets/img/energy/B8.svg'
import B9 from '@/assets/img/energy/B9.svg'
import B10 from '@/assets/img/energy/B10.svg'



const tokenStore = useTokenStore();
const iconArr = [ B0,B1,B2,B3,B4,B5,B6,B7,B8,B9,B10 ]
const icon = (value) => {
  const index = iconArr.findIndex((item, idx) => idx === value);
  return iconArr[index];
}
const idx = tokenStore.getUserInfo.answerNum
const props = defineProps({
  showPopupVisible: {
    type: Boolean,
    default: false,
  },
});


const emit = defineEmits(['update:showPopupVisible']);

const popupVisible = ref(props.showPopupVisible);

const onClose = ()=> {
  popupVisible.value = false;
  emit('update:showPopupVisible', popupVisible.value);
};
</script>

<template>
    <van-popup :show="showPopupVisible"
               round
               closeable
               @close="onClose"
               :style="{ width: '100%', backgroundColor: '#222436', border: '1px solid #7378AC' }"
    >
      <div class="pop-content">
        <div class="energy_tips" >Robot Energy</div>
        <div class="energy_padding">
          <van-badge :content="tokenStore.getUserInfo.answerNum" color="#1dca39" v-if="tokenStore.getUserInfo.answerNum >= 0">
            <img class="icon_size" :src=icon(tokenStore.getUserInfo.answerNum)  >
          </van-badge>
        </div>
        <div style="line-height: 1.5; text-align: center" >
          You can get 10 free energy per day <br>
          Each task set attempt consumes <span class="num-color">1</span>  energy point.<br>
          Each new friend invited, you can get  <span class="num-color">1</span> energy point as a reward.
        </div>
        <div class="spinBtn select_btn" @click="onClose">
          <span>OK</span>
        </div>
      </div>

    </van-popup>

</template>

<style scoped>
::v-deep(.van-badge--top-right) {
  top: 0;
  right: 14px;
  border: 0;
  font-size: 17px;
  font-weight: 700;
  color: black;
  border-radius: 5px;
  padding: 0 8px;
}
.energy_padding {
  padding: 20px 0;
}
.pop-content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f9f9f9;
  background-color: #222436 !important;
}
.icon_size {
  width: 60px;
}
.num-color {
  font-size: 32px;
  color: #379bfd;
  padding: 3px;
}
.energy_tips {
  font-size: 34px;
  font-weight: 700;
  color: #f9f9f9;
  padding-top: 20px
}
.spinBtn {
  width: 80%;
  border-radius: 50px;
  text-align: center;
  font-weight: 700;
  color: #f9f9f9;
  padding: 10px 0;
  background: linear-gradient(to bottom, #379bfd 0% , #0275eb 100%);
  margin: 20px 0;
}
</style>