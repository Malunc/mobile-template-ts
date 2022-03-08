<template>
  <section class="home">
    <van-button @click="onHm" plain type="primary">埋个点</van-button>
    <van-button @click="createShare" plain type="primary">分享下</van-button>
    <van-button @click="onGet" plain type="primary">GET一下</van-button>
  </section>
</template>

<script lang="ts">
import { subdir, activeName } from '@/core/config';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  head(this: IndexPage0): object {
    return {
      title: '标题',
    };
  },
})
export default class IndexPage0 extends Vue {
  get isDarkmode() {
    return this.$store.state.isDarkmode;
  }
  onHm(): void {
    this.$hm('start', 'click');
  }
  async onGet(): Promise<void> {
    let res = await this.$axios.get(
      'https://r.51wnl-cq.com/api/CommonUserVisitCount/GetUserVisitCount?key=' +
        activeName
    );
    console.log(res);
  }
  createShare(): void {
    let share = {
      title: '主标题',
      text: '副标题',
      image: 'https://img.yzcdn.cn/vant/cat.jpeg',
      imgUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      url: location.origin + subdir,
      callback: () => {
        this.$toast('分享成功');
      },
    };
    this.$share(share);
  }
}
</script>

<style lang="less" scoped>
.home {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
