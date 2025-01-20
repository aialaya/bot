<template>
  <div class="home_page">
  <div class="content">
      <div v-if="currentData" class="question">
        <div class="task_txt" >Task   #{{ currentQuestion + 1  }}</div>
        <div class="task-title" >{{ currentData.title }}</div>
        <img class="img_url"  v-if="currentData.attr === 2" :src="currentData.url" alt="">
        <audio controls v-if="currentData.attr === 3" >
          <source :src="currentData.url" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <video class="img_url" controls v-if="currentData.attr === 4">
          <source :src="currentData.url" type="video/mp4">
          Your browser does not support the video element.
        </video>
        <div v-if="currentData.type === 1 " class="single-choice">
          <div
              v-for="option in currentData.option"
              :key="option.answer"
              :class="{ 'is-active': option.Letter === currentData.selected }"
              class="option"
              @click="selectOption('single', option.answer, option.Letter)"
          >
            {{ option.Letter }} {{ option.answer }}
          </div>
        </div>
        <div v-if="currentData.type === 2 " class="multiple-choice">
          <div
              v-for="option in currentData.option"
              :key="option.answer"
              :class="{ 'is-active': currentData.selected.includes(option.Letter) }"
              class="option"
              @click="selectOption('multiple', option.answer, option.Letter,currentData.id)"
          >
            {{ option.Letter }} {{ option.answer }}
          </div>
        </div>

        <div v-if="currentData.type === 3 ">
          <textarea class="text-input" v-model="currentText" @blur="textSet" @focus="focusFu" ></textarea>
        </div>
      </div>
      <div class="change-btn" >
        <button @click="prevQuestion" v-if="currentQuestion !== 0">previous</button>
        <button @click="nextQuestion(currentData.type)" v-if="currentQuestion !== questions.length - 1">next</button>
        <button v-else @click="postSubmit(currentData.type)">submit</button>
      </div>
      <div>{{ currentQuestion + 1 }} / {{ questions.length }}</div>
  </div>
    <div style="height: 800px" v-if="showBottom" ></div>
  <div class="position_none"></div>

    <van-popup v-model:show="show" :overlay="true"  :overlay-style="{ backgroundColor: 'transparent' }" >
    </van-popup>
</div>
</template>

<script setup >
import {ref, onMounted,  defineProps } from 'vue';
import {getAnswers, postAnswer} from '@/api/user'
import {  useTokenStore } from '@/store';
import { imgsPreloader } from './imgsPreloader.js'

const tokenStore = useTokenStore();


const currentQuestion = ref(0);
const currentData = ref (null)
const currentText = ref()
const askRet = new Map()


const questions = ref([{
  options: [{value: 'A', text: 'A'}, {value: 'B', text: 'B'}, {value: 'C', text: 'C'},],
  selected: [],
  type: '1'
},
  {
    options: [{value: 'A', text: 'A'}, {value: 'B', text: 'B'}, {value: 'C', text: 'C'},],
    selected: [],
    type: '2'
  },
  {
    options: [{value: 'A', text: 'A'}, {value: 'B', text: 'B'}, {value: 'C', text: 'C'},],
    selected: [],
    type: '3'
  },
]);

onMounted(() => {
  answers()
});
const getDeviceType = () => {
  const userAgent = navigator.userAgent || navigator || window.opera;
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }
  return 'Other';
}

// 聚焦时
const transparent = ref('[my-overlay]')
const show = ref(false);
const showBottom = ref(false);
const inputRef = ref(null);


const focusFu = () => {
  let ios = getDeviceType()
  if(ios === 'iOS') {
    showBottom.value = true;
    show.value = true
  }else {
  }
}


const textSet = (event)=>{
  event.preventDefault();
  let oidCurrentText = currentText.value;
  askRet.set(currentData.value.id,{result:oidCurrentText,val: oidCurrentText,type:"txt"})
  show.value = false
  showBottom.value = false
}


function selectOption(type, answer, Letter) {
  const question = questions.value[currentQuestion.value];

  switch (type) {
    case 'single':
      question.selected = Letter;
      askRet.set(question.id, {result:answer,val: Letter,type:"single"});
      break;
      case 'multiple':
        const idx = question.selected.indexOf(Letter);
        if (idx > -1) {
          question.selected.splice(idx, 1);
          let ret = askRet.get(question.id);
          if (ret) {
            ret.val.splice(Letter,1);
            ret.result.splice(answer,1);
            askRet.set(question.id,ret)
          }else {
            askRet.delete(question.id);
          }
        }else {
          question.selected.push(Letter);
          let ret = askRet.get(question.id);
          if (ret) {
            ret.val.push(Letter);
            ret.result.push(answer);
            askRet.set(question.id ,ret)
          }else {
            askRet.set(question.id,{result:[answer],val: [Letter],type:"multiple"});
          }
        }
        break
  }
}

function nextQuestion(type) {
  if( tokenStore.getUserInfo.answerNum === 0) {
    showToast('no energy')
    return;
  }
  if (type === 1 || type === 2) {
    if (!askRet.get(currentData.value.id)) {
      showToast('Please Select')
      return;
    }
  } else {
    if (!currentText.value) {
      showToast('Please Answer')
      return;
    }
  }
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value = currentQuestion.value + 1
    currentData.value = questions.value[currentQuestion.value]
    if (currentData.value.type === 3){
      let ret = askRet.get(currentData.value.id)
      if (!ret) {
        currentText.value = ''
      }else {
        currentText.value = ret.val
      }
    }

  }
}

function prevQuestion() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
    currentData.value = questions.value[currentQuestion.value]
    if (currentData.value.type === 3) {
      let ret = askRet.get(currentData.value.id)
      currentText.value = ret.val
    }
  }
}
const optionAllId = ref([])
const taskPaperId = ref()
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H', 'I', 'J', 'K'];
const imgPreloaderList = ref([])
const answers = async () => {
  getAnswers().then(async res => {
    if (res.code === 200) {
      taskPaperId.value = res.data.askId
      questions.value = res.data.list.map( (item, index) => {
        item['selected'] = []
        if(item.url !== "") {
          imgPreloaderList.value.push(item.url)
        }
        item.option = item.option.map( (option, index) => {
          optionAllId.value.push(option.id)
          option.Letter = letters[index]
          return option;
        });
        if (index === 0) {
          currentData.value = item;
        }
        return item;
      })
      await imgsPreloader(imgPreloaderList.value);
    }
  }).catch( err => {
    console.log(err);
  })

}

const postSubmit = (type) => {
  if (type === 1 || type === 2) {
    if (!askRet.get(currentData.value.id)) {
      showToast('Please Select')
      return;
    }
  } else {
    if (!currentText.value) {
      showToast('Please Answer')
      return;
    }
  }
  let ret = new Map()
  askRet.forEach((v,k) => {
    let val = v.val
    if (v.type === "multiple") {
      val = v.val.join(",")
    }
    ret.set(String(k),val)
  })
  const data = {taskPaperId:taskPaperId.value, results:Object.fromEntries(ret)}

  postAnswer(data).then(res => {
    if (res.code === 200) {
      currentText.value = ''
      currentQuestion.value = 0
      currentData.value = null
      askRet.clear()
      imgPreloaderList.value = []
      tokenStore.RefreshInfo(true).then(() => {
        answers()
      })
      showToast('Your submission has been sent')
    }else {
      showToast(res.message)
    }
  }).catch( err => {
    console.log(err);
  })
}

</script>

<style scoped>
.position_none {
  margin-top: 20px;
}
.img_url {
  width: 90%;
  border-radius: 10px
}
.task_txt {
  font-size: 30px;
}
.option {
  border: 1px solid #7378AC;
  border-radius: 50px;
  text-align: left;
  padding: 15px 20px;
  margin: 15px auto;
}

.option:hover {
  border-color: #7378AC;
}

.is-active {
  background-color: #379BFD;
}
.task-title {
  word-wrap:break-word;
  padding: 10px
}
.home_page {
  padding: 0 15px;
}
.content {
  box-sizing: border-box;
  background-color: #2B2D40;
  border-radius: 20px;
  text-align: center;
  padding: 15px;
  border: 2px solid #7378AC;
  color: white;
}



.text-input {
  width: 90%;
  border-radius: 10px;
  border: 1px solid #7378AC;
  background-color: #2B2D40;
  margin: 5px 0;
  padding: 10px;
  font-size: 16px;
}

button {
  border: 0;
  color: #fff;
  border-radius: 50px;
  padding: 10px 5px;
  width: 100px;
  text-align: center;
  background-color: #379BFD;
  margin: 20px;
}
.change-btn {
  display: flex;
  justify-content: space-around;
  width: 100%
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.container {
  transition: transform 0.3s ease-in-out;
}
</style>