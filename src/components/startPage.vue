<script setup >
import {onMounted, ref} from 'vue';
import { login } from "@/api/user";
import { useTokenStore } from '@/store';
import { useLaunchParams } from '@telegram-apps/sdk-vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

const router = useRouter();
const tokenStore = useTokenStore();


const initDataRaw = ref('');


const getTelegramParams = () => {
  try {
    const { initDataRaw } = useLaunchParams();
      if (!initDataRaw) {
        throw new Error('No initDataRaw found');
      }
      return initDataRaw;
  } catch (error) {
    console.error('Failed to get Telegram params:', error);
    return null;
  }
};


const goWeb = async () => {
  try {
    const data = getTelegramParams();
    if (!data) {
      showToast('Login failed: No initDataRaw');
      return;
    }
    const ret = await login({ initData: data });
    if (ret.code === 200) {
      tokenStore.setToken(ret.data.accessToken);
      await tokenStore.RefreshInfo(true);
      router.push('/');
    } else {
      showToast('Login failed, please try again');
    }
  } catch (error) {
    showToast('Network error, please try again');
  }
};

onMounted(() => {
  goWeb();
  updateProgress();
});

const progress = ref(0);
const updateProgress = () => {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter >= 100) {
      clearInterval(interval);
    } else {
      counter++;
      progress.value = counter;
    }
  }, 20);
};

</script>

<template>
  <div class="start-page-box">
   <div class="start-position" >
     <img class="robot" src="../assets/img/robot.png" alt="">
     <div class="progress-container">
       <div class="progress-bar" :style="`width: ${progress}%`"></div>
     </div>
     <div class="start-loading">LOADING</div>
   </div>
  </div>
</template>

<style scoped>
.robot {
  width: 200px;
}
.start-page-box {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/start-page.svg") center / cover no-repeat fixed;
}
.start-position {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.progress-container {
  margin-top: 50px;
  width: 70%;
  background-color: #2B2D40;
  border-radius: 50px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}
.start-loading {
  font-weight: 700;
  font-size: 20px;
  color: #f9f9f9;
  margin-top: 25px
}
.progress-bar {
  height: 15px;
  background: linear-gradient(to left, #0c73dd 0% , #8088ed 100%);
  border-radius: 50px;
  color: white;
  padding: 0 10px;
  width: 0%;
  transition: width 0.3s ease-in-out;
}
</style>