<script setup >
import router from "@/router/index.js";
// import Clipboard from "clipboard";
import {ref} from "vue";
import {  useTokenStore } from '@/store/index.js';
import { showToast } from 'vant';


const tokenStore = useTokenStore().getUserInfo
const goBack = () => {
  router.back();
}

const copyLink = async (url) => {
  if (!url) {
    showToast('No content to copy');
    return;
  }

  try {
    const data = url.replace(/&text=[^&]*|(&|$)/, '$1');
    const input = document.createElement('input');
    input.value = data;
    input.setAttribute('readonly', '');
    input.style.cssText = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;';
    document.body.appendChild(input);

    if (navigator.userAgent.match(/ipad|iphone/i)) {
      input.contentEditable = true;
      input.readOnly = false;
      const range = document.createRange();
      range.selectNodeContents(input);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      input.setSelectionRange(0, data.length);
    } else {
      input.select();
    }

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showToast('Copied successfully');
      } else {
        showToast('Copy failed, please try again');
      }
    } catch (err) {
      console.error('execCommand failed:', err);
      showToast('Copy failed, please try again');
    }
    document.body.removeChild(input);

  } catch (err) {
    console.error('Copy failed:', err);
    showToast('Copy failed, please try again');
  }
};


const goToUrl = (url) => {
  if (!url) {
    showToast('No URL to share');
    return;
  }

  try {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
    window.location.href = shareUrl;
  } catch (err) {
    console.error('Share failed:', err);
    showToast('Share failed, please try again');
  }
};

</script>

<template>
  <div class="share_content">
  <van-sticky>
    <div style="background-color:#222436; width: 100vw">
      <div class="nav-box nav_padding">
        <img class="img-back-size" src="@/assets/img/back.png" alt="" @click="goBack()">
        <span class="nav-font">Referral</span>
      </div>
      <div class="description">
        Invite a friend to Alaya and get a spin.
      </div>
      <div class="space_box" ></div>
    </div>
  </van-sticky>
    <div style="padding: 20px">
    <div class="show-box" >
      <div class="show-box-title">share to</div>
      <div class="show-box-content">Invite your friends to increase your chances of winning </div>

      <div class="spinBtn select_btn" @click="goToUrl(tokenStore.invitationUrl)">
        <img class="img-size" src="@/assets/img/share.png" alt="">
        <div>INVITE FRIENDS</div>
      </div>
    </div>

    <div class="space_box" ></div>


    <div class="show-box">
      <div class="show-box-title select_btn" @click="goToUrl">Invite Link</div>
      <div class="show-box-content">
        Join us to complete the annotation problem to train AI and earn AIA.
      </div>
      <div class="spinBtn" @click="copyLink(tokenStore.invitationUrl)">
        <img class="img-size" src="@/assets/img/copy.png" alt="">
        <div class="copyLinkRef">COPY LINK</div>
      </div>
    </div>
    </div>

  </div>
</template>

<style scoped>
.space_box {
  padding-top: 20px;
}
.share_content {
  background-color: #222436;
}
.nav-box {
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #222436;
}
.img-back-size {
  width: 32px;
  height: 32px
}
.nav-font {
  font-size: 34px;
  margin-left: 5px
}
.description {
  padding: 0 20px;
  color: #8b8c95;
  line-height: 1.5
}
.show-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #fff;
  width: 100%;
  border:2px solid #7378AC;
  border-radius: 20px;
  background-color: #222436;
}
.show-box-title {
  width: 100%;
  font-weight: 700;
  padding: 15px 0;
  border-bottom:1px solid #7378AC
}
.show-box-content {
  padding: 15px 0;
  color: #8b8c95;
  line-height: 1.5;
}
.img-size {
  width: 28px;
  height: 28px;
  margin-right: 5px;
}
.spinBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  border-radius: 50px;
  text-align: center;
  font-weight: 700;
  color: #f9f9f9;
  padding: 8px 0;
  background: linear-gradient(to bottom, #379bfd 0% , #0275eb 100%);
  margin-bottom: 20px;
}
</style>