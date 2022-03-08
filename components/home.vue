<template>
  <section class="home">
    <div>首页</div>
    <van-button @click="toNext" plain type="primary">去过程页</van-button>
    <van-button @click="getEnv" plain type="primary">当前环境</van-button>
    <van-button @click="toUrl" plain type="primary">跳转页面</van-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator';

@Component
export default class home extends Vue {
  @Emit('nextPage')
  toNext() {
    return 2;
  }

  getEnv() {
    if (self != top) alert('在iframe中');
    else alert('其他');
  }
  toUrl() {
    window.location.href = 'https://www.51wnl.com';
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  // height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/home_bg.png');
  background-size: 100% 100%;
}
</style>
