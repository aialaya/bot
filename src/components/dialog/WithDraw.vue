<script setup >
import {ref, watch} from 'vue'
import opBNB from '@/assets/img/opBNB.png'
import atb from '@/assets/img/atr.png'
import {  useTokenStore } from '@/store';
import { postWithDrawal } from  '@/api/user'
import { showToast } from "vant";
import { useAppKitAccount } from "@reown/appkit/vue";


const emit = defineEmits(['update:showPopupVisible']);
const props = defineProps({
  showPopupVisible: {
    type: Boolean,
    default: false,
  },
  walletAddress: {
    type: String,
    default: '',
  }
});
const popupVisible = ref(props.showPopupVisible);

const userInfo = useTokenStore().getUserInfo
const tokenStore = useTokenStore()

const AmountMoney = ref('')

const address = ref(props.walletAddress)

 watch(() => props.walletAddress, (newValue, oldValue) => {
   address.value = newValue;
});

const getPaste = async () => {
  if (!navigator.clipboard) {
    showToast('Not Support');
    return;
  }
  try {
    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText.trim() === '') {
      address.value = clipboardText;
      return;
    }
    await navigator.clipboard.writeText(clipboardText);
    address.value = clipboardText;
  } catch (err) {
    showToast(err);
  }
}

const onClose = () => {
  showPopover.value = false
  popupVisible.value = false;
  emit('update:showPopupVisible', popupVisible.value);
};


const showPopover = ref(false);
const selectText = ref('');

const actions = [
  { text: 'opBNB', icon: opBNB },
];
const isClick = ref(false);
const onSelect = action => {
  isClick.value = !isClick.value;
  selectText.value = action;
}


const getMax = () => {
  const min = String( Math.min( Number(userInfo.withdrawalAmount), Number(userInfo.usdtBalance)) )
  if(min > 0) {
    AmountMoney.value = min

  }else {
    showToast('No available amount')
  }
}
const  showLoading = ref(false);

const postMoney = async () => {
  if(showLoading.value){return }
  if( AmountMoney.value === '' || address.value === '' || AmountMoney.value === '0' ) {
    showToast('Can not Be Empty')
    return
  }
  const max = Math.min( Number(userInfo.withdrawalAmount), Number(userInfo.usdtBalance))
  if( AmountMoney.value > max ) {
    showToast('Excess！')
    return
  }
  const data = {
    address: address.value,
    chain: selectText.value.text === 'opBNB' ? 2 : 1,
    amount: Number(AmountMoney.value),
  }
  showLoading.value = true

  postWithDrawal(data).then(res => {
    if(res.code === 200) {
      showLoading.value = false
      tokenStore.RefreshInfo(true);
      showToast('Success！')
    }else {
      showToast(res.message)
      console.log(res.message)
      showLoading.value = false
    }
  }).catch(err => {
    showLoading.value = false
    showToast(err);
  })
}
</script>

<template>
  <van-popup class="pop-box" :show="showPopupVisible" :close-on-click-overlay="false"
             round
             closeable
             @close="onClose"
             :style="{ width: '80%' }"
  >
  <div class="pop-content">
    <div>Withdrawals</div>
    <div class="dsc_txt" >Withdrawal requests will be processed within 7 days.</div>
    <van-popover  v-model:show="showPopover" :actions="actions" @select="onSelect" theme="dark">
      <template #reference>
        <div class="opt-box">
          <div class="opt-content" >
            <div style="display: flex; align-items: center;">
              <img class="opt-img" style="" :src="selectText.icon?? opBNB" alt="">
              <span>{{selectText.text?? 'opBNB'}}</span>
            </div>
            <img v-if="showPopover" class="opt-img" src="@/assets/img/arrow-up.svg" alt="">
            <img v-if="!showPopover" class="opt-img" src="@/assets/img/arrow-down.svg" alt="">
          </div>
        </div>
      </template>
    </van-popover>
    <div class="opt-box">
      <div style="width: 90%">
        <input class="ellipsis_line" v-model="address" disabled placeholder="Withdrawal address" />
      </div>
    </div>
    <div class="opt-box">
      <div>Amount</div>
      <div class="cost_size">
        <input v-model="AmountMoney"  />
      </div>
    </div>
    <div class="btn_bottom" >
      <div class="confirm select_btn" @click="postMoney" >
        <van-loading v-if="showLoading" >loading...</van-loading>
        <span v-else>Confirm</span>
      </div>
      <div class="confirm select_btn" @click="getMax" >  Max  </div>
    </div>
    <div class="btn_bottom">
      <div class="tip-txt" > Available: <span class="num-color">
        {{userInfo.withdrawalAmount?userInfo.withdrawalAmount : 0}}
      </span> </div>
      <div class="tip-txt" >  Amount: <span class="num-color">
        {{userInfo.usdtBalance ? userInfo.usdtBalance : 0}}
      </span></div>
    </div>
    <div style="color: #999; text-align: center; font-size: 12px ">
      <div style="color: #379BFD">Tips:</div>
      <div>1. USDT withdrawals can be activated after 50 successful invites.</div>
      <div>2. For every 10 successful invites, 0.1 USDT will be available for withdrawal.</div>
    </div>
  </div>
  </van-popup>


</template>

<style scoped>
.dsc_txt {
  padding: 10px 20px;
  font-size: 12px
}
input {
  width: 100%;
  padding: 8px 0;
  font-size: 12px; 
  background-color: transparent;
  border: 0;
  border-radius: 50px;
}
.pop-box {
  border: 1px solid #7378AC !important;
  background-color: #222436 !important;
}
.van-popup {
  box-sizing: border-box;
  background-color: #222436 !important;
}

.pop-content {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f9f9f9;
  background-color: #222436 !important;
}
.opt-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color:#000;
  width: 180px;
  height: 40px;
  border-radius: 20px;
  padding-left: 20px;
  margin: 10px 0;
}
.opt-content{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.opt-img {
  width: 20px;
  height: 20px;
  margin-right: 10px
}
.confirm {
  background-color:#000;
  width: 90px;
  height: 30px;
  border-radius: 20px;
  line-height: 30px;
  text-align: center;
  padding: 3px 0;
  border: 1px solid #7378AC;
}
.tip-txt {
  min-width: 80px;
  min-height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding-left: 15px;
  display: -webkit-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: clip;
}
.num-color {
  color: #379BFD;
}
.cost_size {
  width: 60px;
  padding-right: 10px
}
.btn_bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 220px;
  margin-top: 10px;
  overflow: hidden;
}
</style>