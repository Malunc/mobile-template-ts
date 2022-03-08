import Vue from 'vue';
import { Store } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>;
    $axios: NuxtAxiosInstance; // 挂载的 vue 全局变量
  }
}

declare global {
  interface Window {
    _hmt: any;
    _czc: any;
    shareCallback: any;
  }
}
