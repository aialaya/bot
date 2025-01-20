<script setup >
import router from '@/router/index.js'
import {  useTokenStore } from '@/store/index.js';
import {getRecord} from "@/api/user/index.js";
import {ref, reactive, watch} from "vue";
import WithDraw from "@/components/dialog/WithDraw.vue";

import  model  from '@/config/appKitConfig'
import { formatString } from'@/config/stringfun.js'
import { useAppKitAccount } from "@reown/appkit/vue";
import { useDisconnect } from '@reown/appkit/vue'
import { update } from '@/utils/web3.js'
import { postUpdate } from "@/api/user/index.js";


const goBack = () => {
  router.back()
}
const showLoading = ref(false);
const page = ref(1)

const tokenStore = useTokenStore();


const myRecord = ref([])

const loading = ref(false);
const finished = ref(false);


const Record = async () => {
  getRecord(page.value).then(res => {
    if(res.code === 200) {

      res.data.list.map(item => {
        myRecord.value.push(item)
      })
      page.value = page.value + 1

      loading.value = false;
      if ( myRecord.value.length  >= res.data.total ) {
        finished.value = true;
      }
    }

  })
}


const state = reactive({
  showPopupVisible: false
});
const onPopupUpdate = (value) => {
  state.showPopupVisible = value;
  page.value = 1
  myRecord.value = []
  Record()

};

const accountData = useAppKitAccount()
// const addressInfo = ref(accountData.value.address)
// console.log(addressInfo.value,'address')
// watch(addressInfo, (newAccount, oldAccount) => {
//   showToast('Wallet account changed:')
//   // console.log('Wallet account changed:', newAccount, oldAccount);
// });


const walletAddress = ref('')

const goWallet = () => {
  state.showPopupVisible = true
}


const goUpdate = async () => {
    if (!accountData.value.isConnected) {
        showToast('Please connect wallet first');
        return;
    }

    showLoading.value = true;
    try {
        const receipt = await update();
        
        if (receipt && receipt.status === 1) {
            try {
                const res = await postUpdate({'address': accountData.value.address });
                if (res.code === 200) {
                    showToast('Transaction successful!');
                } else {
                    showToast('API update failed');
                }
            } catch (apiError) {
                console.error('API error:', apiError);
                showToast('Failed to update server');
            }
        } else {
            showToast('Transaction failed');
        }
    } catch (error) {
        console.error('Update error:', error);
        const errorMessage = error.message || 'Transaction failed';
        showToast(errorMessage);
        
    } finally {
        showLoading.value = false;
    }
};
function getOS() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.match(/Android/i)) {
    return 'Android';
  } else if (userAgent.match(/iPhone|iPad|iPod|iOS/i)) {
    return 'iOS'; 
  }
  return 'Unknown';
}
const token = tokenStore.getToken;

const { disconnect } = useDisconnect()
const loginOut = () => {
  let state = `${accountData.value.isConnected}`
  if( state === 'false') {
      model.open()
  }else {
    disconnect()
    showToast('Disconnect successfully')
  }

}

</script>

<template>
    <van-sticky>
      <div style="background-color:#222436;">
        <div class="nav-box nav_padding">
          <img class="img-back-size select_btn" src="@/assets/img/back.png" @click="goBack()">
          <span class="nav-font">My Profile</span>
        </div>
      </div>
    </van-sticky>
      <div class="show-box container_margin " >
        <div class="show-box-title">Balance</div>
        <div class="aia_box" >
          <div style="display: flex; align-items: center">
            <img class="bi_icon" src="@/assets/img/aia.png">
            <span>AIA</span>
          </div>
          <div class="num_right">{{tokenStore.getUserInfo.aiaBalance}}</div>
        </div>

        <div class="aia_box" >
          <div style="display: flex; align-items: center">
            <img class="bi_icon" src="@/assets/img/usdt.png">
            <span>USDT</span>
          </div>
          <div class="num_right">{{tokenStore.getUserInfo.usdtBalance}}</div>
        </div>
        <div class="aia_box" v-if="accountData.isConnected">
          <div style="display: flex; align-items: center; padding-left: 10px" >
            <span>ADDRESS</span>
          </div>
          <div class="num_right">{{formatString(accountData.address,16)}}</div>
        </div>
       <div class="btn_box">
         <div class="spinBtn select_btn" @click="loginOut">
           <span >{{ accountData.isConnected ? 'Disconnect wallet' : 'Connect wallet' }}</span>
         </div>
         <div class="spinBtn select_btn" @click="goWallet">
           <span >Withdraw USDT</span>
         </div>

        <div class="spinBtn" v-if="false" @click="goUpdate">
          <van-loading v-if="showLoading" >loading...</van-loading>
          <span v-else>Training</span>
        </div>
       </div>
      </div>
      <div class="show-box container_margin " v-if="tokenStore.getUserInfo">
        <div class="show-box-title">Records</div>
        <div>
        <van-list
            class="van_list_box"
            v-model:loading="loading"
            loading-text="loading..."
            :finished="finished"
            finished-text="no more"
            @load="Record"
        >
        <div class="list_box" v-for="item in myRecord" :key="item.id">
          <div style="display: flex; justify-content: space-between;align-items: center; width: 100%">
            <div class="left_txt">{{item.msg}}</div>
            <div style="display: flex; justify-content: space-between; width: 40%;">
              <div style="display: flex; align-items: center" v-if="item.type === 6 || item.type === 1 || item.type === 8 ">
                <img class="bi_icon" src="@/assets/img/usdt.png">
                <span>USDT</span>
              </div>
              <div style="display: flex; align-items: center" v-else>
                <img class="bi_icon" src="@/assets/img/aia.png">
                <span>AIA</span>

              </div>
              <div class="item_num">{{item.num}}</div>
            </div>
          </div>
          <div class="time_sty item_num">{{item.createTime}}</div>
        </div>
        </van-list>
        </div>
        </div>
    <WithDraw :show-popup-visible="state.showPopupVisible" :walletAddress="accountData.address" @update:showPopupVisible="onPopupUpdate" ></WithDraw>
</template>

<style scoped>
.nav-box {
  width: 100vw;
  display: flex;
  align-items: center;
  color: #fff;
  background-color:#222436;
}
.address_text {
  width: 300px;
}
.hide_text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.my_profile_box {
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.num_right {
  padding-right: 10px;
}
.van_list_box {
  width: 100%;
}

.left_txt {
  width: 45%;
  text-align: left;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-back-size {
  width: 32px;
  height: 32px
}
.nav-font {
  font-size: 34px;
  margin-left: 5px
}
.show-box {
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  border:2px solid #7378AC;
  border-radius: 20px;
  margin-bottom: 20px;
}
.show-box-title {
  width: 100%;
  font-weight: 700;
  padding: 10px 0;
  border-bottom:1px solid #7378AC
}
.btn_box {
  padding: 0 10px;
}
.spinBtn {
  border-radius: 50px;
  text-align: center;
  font-weight: 700;
  padding: 10px;
  color: #f9f9f9;
  background: linear-gradient(to bottom, #379bfd 0% , #0275eb 100%);
  margin: 20px 0;
}
.list_box {
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #7378AC;
}
.aia_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}
.bi_icon {
  width: 20px;
  margin:0 10px
}
.time_sty {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #8b8c95;
  padding-top: 10px
}
.item_num {
  padding-right: 10px;
}
</style>