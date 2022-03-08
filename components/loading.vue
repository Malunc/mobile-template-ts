<template>
  <section class="loading">
    <div>加载中...</div>
    <div>一般在此处生成图片</div>
    <div id="shareImg">
      <resulting></resulting>
    </div>
    <van-button @click="onNext" plain type="primary">去结果页</van-button>
  </section>
</template>

<script lang="ts">
import html2canvas from 'html2canvas';
import { Component, Vue, Emit } from 'nuxt-property-decorator';

@Component
export default class loading extends Vue {
  shareImgDom: HTMLElement = document.getElementById('shareImg') as HTMLElement;

  @Emit('nextPage')
  onNext() {
    return 4;
  }

  getShareImg(): void {
    setTimeout(() => {
      html2canvas(this.shareImgDom).then(async (canvas) => {
        //背景图片容易模糊，img图片标签更适合
        let path = canvas.toDataURL('image/jpeg', 1);
        // let res = await this.$upload2Qiniu(path);
        // sessionStorage.shareImg = res;
        sessionStorage.shareImgBase64 = path;
        this.onNext();
        // this.$emit('nextPage', 4);
      });
    }, 100);
  }
}
</script>

<style lang="less" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/loading_bg.jpg');
  background-size: 100% 100%;

  #shareImg {
    position: absolute;
    left: -1000px;
    // left: 0;
    // top: 0;

    // width: 660px;
    margin: auto;
    z-index: 100;
  }
}
</style>
