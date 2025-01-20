import { defineStore } from "pinia";
import {userinfo} from "../../api/user/index.js";

export const useTokenStore= defineStore({
    id: "app-token",
    state: () => ({
        token: localStorage.getItem('KEY_TOKEN'),
        userinfo:  localStorage.getItem('USERINFO'),
        isGowallet: false,
    }),
    getters: {
        getToken(){
            return this.token ? this.token : "";
        },
        getUserInfo(){
            return this.userinfo ? this.userinfo : "";
        },
        getIsGowallet(){
            return this.isGowallet ?  this.isGowallet : false;
        }
    },
    actions: {
        clearToken() {
            this.token = '';
            this.userinfo = '';
            localStorage.removeItem('KEY_TOKEN');
            localStorage.removeItem('USERINFO');
        },
        
        setToken(token) {
            if (!token) {
                this.clearToken();
                return;
            }
            this.token = token;
            localStorage.setItem('KEY_TOKEN', token);
        },
        setIsGowallet(isGowalle){
            this.isGowallet = isGowalle;
        },
        setUserInfo(info) {
            this.userinfo = info;
            localStorage.setItem('USERINFO', info);
        },
        async RefreshInfo(isRefresh = false) {
            try {
                if (this.userinfo && !isRefresh) {
                    return;
                }
                const res = await userinfo();
                if (res && res.code === 200) {
                    this.setUserInfo(res.data);
                } else {
                    throw new Error('Failed to refresh user info');
                }
            } catch (error) {
                console.error('RefreshInfo error:', error);
                throw error;
            }
        }
    },
});
