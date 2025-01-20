<script setup>
import {onMounted, ref, computed, nextTick} from 'vue';
import router from "@/router/index.js";
import pointer from "@/assets/img/pointer.svg";
import aia from "@/assets/img/aia.png";
import { postTurning, getTurningList } from '@/api/user/index.js'
import empty from '@/assets/img/empty.svg'
import {  useTokenStore } from '@/store';

const userInfo = useTokenStore();
let rotaryTable = ref(userInfo.getUserInfo.rotaryTable)


onMounted(() => {
  funTurningList()
})



const blocks = [{padding: '13px', background: '#FFC13C'}]
const buttons = computed(() => [
  {
    radius: '22%',
    pointer: true,
    imgs: [{
      src: pointer,
      width: '100%',
      top: '-220%',
    }]
  },
  {
    radius: '40%',
    fonts: [{ 
      text: `${rotaryTable.value || '0'}`,
      top: '-20px', 
      fontWeight: 'bold',
      fontColor: '#9c5b01',
      fontSize: '23px' 
    }]
  },
  {
    radius: '20%',
    fonts: [{ 
      text: '\n Turns',
      left: '-1px', 
      top: '-5px', 
      fontColor: '#9c5b01', 
      fontSize: '10px' 
    }]
  }
])

const paddingImg = url =>{
  return {
    src: url ? url : empty,
    width:  url ? '25%' : '40%',
    top: '50%',
  }
}
const myLuckyRef = ref();
const TurningList = ref([])

const prizes = ref([])


const prizesColor = ref(['#54B0FE', '#23E7DB', '#62E060','#BFE551','#F9F023', '#FFDB51', '#FFC13C','#FEA55F', '#FE6673','#D953B2','#4389FE' ])
const reward = v => {
  if(v === '0') {
    return [{ text: '    Better Luck     next time!', top: '10%',fontSize:'10px',fontColor:'#9c5b01' }]
  }
  return [{ text: v, top: '10%' }]
}
const idIndex = new Map();
const funTurningList = async () => {
  let {code,data} = await getTurningList();
  if (code !== 200) {
    return;
  }
  TurningList.value = []
  for (let i = 0; i < data.turnings.length; i++) {
    let item = data.turnings[i]
    idIndex.set(item.id, i);
    TurningList.value.push({
      fonts: reward(item.reward),
      background: prizesColor.value[i]?? "#FFDB51",
      imgs: [paddingImg(item.icon)]??[paddingImg(aia)]
    })
  }
  prizes.value = TurningList.value
  myLuckyRef.value.init();

}
const title = ref('')
const show = ref(false)
const  funTurning = () => {
  postTurning().then(async res => {
    if(res.code === 200) {
      const index = idIndex.get(res.data.id);
      myLuckyRef.value.play()
      myLuckyRef.value.stop(index)
      await userInfo.RefreshInfo(true)
    } else {
      title.value = 'Please invite friends to get more spins';
      isClicking.value = false
      show.value = true
    }
  })
}


const isClicking = ref(false)

const startCallback = () => {
  if( isClicking.value ) {
    return
  }
    isClicking.value = true;
    funTurning()

}


const endCallback = () => {

  nextTick(() => {
    rotaryTable.value = userInfo.getUserInfo.rotaryTable
    if(rotaryTable.value <= 0) {
      title.value = 'Please invite friends to get more spins';
      isClicking.value = false
      show.value = true
    }
  })
  isClicking.value = false;
}


const goBack = () => {
  router.back()
}

</script>

<template>
   <div style="background-color:#222436;height: 100%">
       <div class="LuckyWheel_Top nav_padding">
         <img class="goBackIcon" src="@/assets/img/back.png" alt="" @click="goBack">
         <span class="goBackTxt">Lucky Wheel</span>
       </div>

     <div class="LuckyWheel-box container_margin" >
       <div class="luckyWheel_txt">
         Participate in Alaya every day and spin the lucky wheel to get rewards
       </div>
       <LuckyWheel
           ref="myLuckyRef"
           width="300px"
           height="300px"
           :prizes="prizes"
           :blocks="blocks"
           :buttons="buttons"
           @start="startCallback"
           @end="endCallback"
       />
       <div class="spinBtn"  @click="startCallback">
         <span >SPIN</span>
       </div>
     </div>
   </div>
  <van-config-provider theme="dark">
    <van-dialog v-model:show="show" width="50%" :title=title confirmButtonText="GO  BACK" @confirm="goBack" >
    </van-dialog>
  </van-config-provider>
</template>

<style scoped>
.LuckyWheel_Top {
  display: flex;
  align-items: center;
  color: #fff;
  width: 100vw;
}
.goBackIcon {
  width: 32px;
  height: 32px;
}
.goBackTxt {
  font-size: 34px;
  margin-left: 5px
}
.luckyWheel_txt {
  text-align: center;
  color: #f9f9f9;
  margin-bottom: 20px
}
.LuckyWheel-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border:2px solid #7378AC;
  padding: 20px;
  border-radius: 20px;
}
.spinBtn {
  width: 100%;
  border-radius: 50px;
  text-align: center;
  font-weight: 700;
  color: #f9f9f9;
  background: linear-gradient(to bottom, #379bfd 0% , #0275eb 100%);
  margin-top: 20px;
  padding: 12px 0;
}
</style>