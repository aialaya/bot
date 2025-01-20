<script setup >
import {onMounted, ref} from 'vue'
import router from "@/router/index.js";
import banana from '@/assets/img/banana.svg'
import catizen from '@/assets/img/catizen.svg'
import telegram from '@/assets/img/telegram.svg'
import tiwtter from '@/assets/img/tiwtter.svg'
import { postTask, getTask } from '@/api/user'
import {  useTokenStore } from '@/store'


const goBack = () => {
  router.back();
}
onMounted( () => {
  page.value = 1
  list.value = [];
  linklist.value = []
})

const userInfo = useTokenStore().getUserInfo
const loading = ref(false);
const finished = ref(false);

const img = ref([ {uname:'BANANA', icon: banana }, {uname:'CATIZEN', icon: catizen }, {uname:'Telegram', icon: telegram },
  {uname:'Tiwtter', icon: tiwtter } ]);

const currentIndex = ref(null)


const page = ref(1)
const list = ref([]);
const linklist = ref([])
const allList = ref(0)
const getList = async () => {
  getTask(page.value).then( res => {
    if(res.code === 200){
      if(finished.value)  {
        loading.value = false;
        finished.value = true;
        return
      }
      res.data.list.map(item => {
        if(item.category === 1) {
          list.value.push(item)
        }
        if(item.category === 2){
          linklist.value.push(item)
        }
      })
      page.value = page.value+1
      loading.value = false;
      allList.value = list.value.length + linklist.value.length
      if ( allList.value  >= res.data.total ) {
        finished.value = true;
      }
    }

  })
}

const toShare = ( i, id, url) => {
  if( i ) return
  if (url !== '') {
    window.open(url);
    getList()
  }
}

const goLink = (link) => {
  if(link !== '') {
    window.open(link);
  }
}

</script>

<template>
  <div style="background-color:#222436; color: #f9f9f9">
    <van-sticky>
      <div class="nav-box nav_padding" >
        <img class="img-back-size" src="@/assets/img/back.png" alt="" @click="goBack()" >
        <span class="nav-font">Task</span>
      </div>
    </van-sticky>
    <div class="">
      <div style="display: flex; align-items: flex-end;">
        <img class="aia_icon left_margin " src="@/assets/img/aia.png" alt="">
        <div class="aia_txt  " >AIA Balance:</div>
      </div>
      <div class="aia_num left_margin" >{{ userInfo.aiaBalance }}</div>
      <div class="space_box" ></div>
      <div class="scrollable-container container_margin">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            loading-text="loading..."
            finished-text=""
            @load="getList"
        >
          <div class="task_txt" >Task list</div>
          <div class="list-item"  :class="{ 'active': item.isComplete }"  ref="toShareRef"
               v-for="( item, index) in list" :key="index" @click="toShare(item.isComplete, item.id, item.link )">
            <div style="padding-left: 20px">{{ item.taskName }}</div>
            <img v-if="item.isComplete" class="icon_size" src="@/assets/img/yes.svg" alt="">

            <div class="item-position" v-else>
              <div>+ <span style=" color: #379BFD ">{{ item.rewards }}</span> </div>
              <img class="arrow_size" src="@/assets/img/arrow-right.svg" alt="">
            </div>

          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.space_box {
  width: 100%;
  height: 20px;
}
.active {
  background-color: #379BFD;
}
.nav-box {
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #222436;
}
.nav-font {
  margin-left: 10px;
  font-size: 30px;
}
.img-back-size {
  width: 32px;
  height: 32px
}
.scrollable-container {
  overflow-y: auto;
  background-color: #2B2D40;
  border-radius: 20px;
  border: 1px solid #7378AC;
  color: #f9f9f9;
  padding: 0 10px 20px 10px;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  margin-top: 10px;
  border-radius: 50px;
  border: 1px solid #7378AC;

}
.item-position {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px
}
.img-size {
  width: 32px;
  height: 32px;
}
.txt-size {
  font-size: 12px;
  padding: 5px 0;
}
.footer {
  display: flex;
  justify-content: space-between;
  background-color: #7378AC;
}
.aia_icon {
  width: 26px;
  height: 26px
}
.aia_txt {
  padding-left: 5px;
}
.aia_num {
  font-weight: 700;
  font-size: 30px;
  color: #379BFD;
  padding-top:5px;
}
.task_txt {
  text-align: center;
  padding-top: 20px
}
.icon_size {
  width: 20px;
  padding-right: 20px
}
.arrow_size {
  height: 22px;
  width: 22px;
}
.footer_list {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>