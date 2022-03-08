<template>
  <section class="share">
    <img :src="imgSrc" alt="分享图片" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class process extends Vue {
  imgSrc: string = '';

  mounted() {
    let img: any = this.$route.query.img;
    img && (this.imgSrc = decodeURIComponent(img));
  }
}
</script>

<style lang="less" scoped>
.share {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@{subdir}images/loading_bg.jpg');
  background-size: 100% 100%;
  // position: absolute;
  // top: 0;
  // left: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
