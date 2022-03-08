import { Plugin, Context } from '@nuxt/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

// @ts-ignore
export default function ({ $axios }) {
  $axios.onRequest((config: AxiosRequestConfig) => {
    // ...
    console.log(config);

    return config;
  });

  $axios.onError((e: AxiosError<any>) => {
    // ...
  });
}
