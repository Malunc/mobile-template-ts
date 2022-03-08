<template>
  <section class="home">
    <div>过程页</div>
    <van-button @click="toNext" plain type="primary">去加载页</van-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator';

@Component
export default class process extends Vue {
  @Emit('nextPage')
  toNext() {
    return 3;
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/process_bg.jpg');
  background-size: 100% 100%;
}
</style>
