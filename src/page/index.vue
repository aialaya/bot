<script setup>
import Home from './Home.vue'
import {onMounted, reactive, ref} from 'vue';
import { useRouter } from 'vue-router';
import Energy from "../components/dialog/Energy.vue";
import { userinfo,  } from '@/api/user'
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

const iconArr = [ B0,B1,B2,B3,B4,B5,B6,B7,B8,B9,B10 ]
const icon = (value) => {
  const index = iconArr.findIndex((item, idx) => idx === value);
  return iconArr[index];
}

const state = reactive({
  showPopupVisible: false
});
const onPopupUpdate = value  => {
  state.showPopupVisible = value;
};

const router = useRouter();
const goLuckyWheel = () => {
  router.push("/LuckyWheel");
}
const goShare = () => {
  router.push("/SharePage");
}
const goMyProfile = () => {
  router.push("/MyProfile");
}
const goTask = () => {
  router.push("/Task");
}

const myUserInfo = ref(null)
const tokenStore = useTokenStore();

const userInfo = async () => {
  userinfo().then(  res  => {
    myUserInfo.value = res.data
    tokenStore.setUserInfo(res.data)
  })
}



onMounted(() => {
  // userInfo()
})

</script>

<template>
    <div class="topBox" >
      <div class="header-left " @click="goMyProfile">
        <div class="avatar" >
          <lazy-component>
          <img class="img_icon " style="border-radius: 50px; " v-lazy="tokenStore.getUserInfo.avatar" >
          </lazy-component>
        </div>
        <div class="show-ellipsis nickname" >{{tokenStore.getUserInfo.nickname}}</div>
      </div>
      <div class="sticky-right" >
        <van-badge :content="tokenStore.getUserInfo.rotaryTable" color="#1dca39" >
          <img class="img_icon" src="../assets/img/w-full.png" alt=""
               @click="goLuckyWheel()"
          >
        </van-badge>
        <img class="img_icon" src="../assets/img/share.png" alt=""
              @click="goShare()"
        >
        <img class="img_desk" src="../assets/img/task.svg" alt=""
             @click="goTask()"
        >
       <div class="energy_box">
        <van-badge style="display: flex; align-items: center" :content="tokenStore.getUserInfo.answerNum"  color="#1dca39" >
        <img class="img_icon" :src=icon(tokenStore.getUserInfo.answerNum)  alt=""
              @click="state.showPopupVisible = true"
        >
        </van-badge>
       </div>
      </div>
    </div>
    <Home></Home>
  <Energy :show-popup-visible="state.showPopupVisible"  @update:showPopupVisible="onPopupUpdate" ></Energy>
</template>

<style scoped>
.nickname {
  margin-left: 10px;
}
.img_desk {
  height: 24px;
  width: 24px
}
.img_icon {
  height: 32px;
  width: 32px
}
.show-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
::v-deep(.van-badge--top-right) {
  top: 6px;
  right: 0;
  border: 0;
  font-size: 12px;
  color: black;
  border-radius: 5px;
}
.topBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #222436;
  color: #f9f9f9;
  height: 60px;
  width: 100vw;
  text-align: center;
}
.header-left {
  display: flex;
  align-items: center;
  width: 180px;
}
.sticky-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  margin-right: 15px;
}
.avatar {
  border: 1px solid #fff;
  width: 32px;
  height: 32px;
  border-radius: 50px;
  margin-left: 15px;
}

</style>
