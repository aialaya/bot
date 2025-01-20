import { createApp } from 'vue'
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'
import { Sticky,Swipe, SwipeItem, Checkbox, CheckboxGroup, RadioGroup, Radio, Field, CellGroup,Toast, Lazyload, ConfigProvider } from 'vant'
import VueLuckyCanvas from '@lucky-canvas/vue'
import router from "./router/index.js";
import { createPinia } from 'pinia'
import { InitWasm } from './utils/wasm.js'
import avatar from '@/assets/img/avatar.svg'
import 'lib-flexible'

const pinia = createPinia()


const app = createApp(App)

const seupApp = async () => {
    app.use(Sticky);
    app.use(Swipe);
    app.use(SwipeItem);
    app.use(Checkbox);
    app.use(CheckboxGroup);
    app.use(RadioGroup);
    app.use(Radio);
    app.use(Field);
    app.use(CellGroup);
    app.use(router);
    app.use(Toast);
    app.use(Lazyload, {
        lazyComponent: true,
        error:avatar
    });
    app.use(ConfigProvider)
    app.use(pinia)
    app.use(createPinia)
    app.use(VueLuckyCanvas)

    await InitWasm().then(() => {
        app.mount('#app');
    });
}

seupApp()



