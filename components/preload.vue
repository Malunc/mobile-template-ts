<template>
  <section class="preload">
    <div>预加载</div>
    <div class="progress">
      <van-progress :percentage="percent" color="#F6C8E6" track-color="#9887B0" pivot-color="#EFB1D9" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator';
import Preload from 'image-preload';
let i = 0;

@Component
export default class process extends Vue {
  @Emit('nextPage')
  toNext() {
    return 1;
  }
  percent: number | string = 0;

  //需要预加载的图片路径，图片需放在static文件夹目录下
  images: string[] = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg'];

  mounted() {
    this.images = Array.from(Array(200), (v, k) => k + '.jpg'); //为了测试，生成200张不存在的图片
    this.preload();
  }
  preload() {
    Preload(this.images, {
      onSingleImageComplete: (base64: string) => {
        i++;
        this.percent = ((i / this.images.length) * 100).toFixed(0);
        i === this.images.length && this.toNext();
      },
    });
  }
}
</script>

<style lang="less" scoped>
.preload {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  // background: url('@{subdir}images/process_bg.jpg');
  background-size: 100% 100%;
  .progress {
    width: 388px;
    margin: 20px 0;
  }
}
</style>
