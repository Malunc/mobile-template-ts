<template>
  <section class="result">
    <div>结果页</div>
    <div class="tips">长按保存图片</div>
    <div class="footer">
      <img src="@/assets/images/btn_reload.png" alt="" @click="onReload" />
      <img src="@/assets/images/btn_share.png" alt="" @click="onShare" />
    </div>
    <img :src="shareImgBase64" class="shareImg" @click="$hm('changanbaocun', 'ck')" />
    <van-overlay :show="shareMaskShow" @click="shareMaskShow = false" z-index="10">
      <div class="mask"></div>
    </van-overlay>
  </section>
</template>

<script lang="ts">
let shareImg,
  lock = true;

import { subdir } from '../core/config';
import { util } from '@wnl/util';
import { wnlShare } from '@wnl/share';
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';

@Component
export default class process extends Vue {
  @Prop(Function) createShare!: Function;
  @Emit('nextPage')
  toNext() {
    return 3;
  }

  shareMaskShow: boolean = false;
  shareImgBase64: string = sessionStorage.shareImgBase64;

  async setShare(): Promise<void> {
    shareImg = await this.$upload2Qiniu(sessionStorage.shareImgBase64);
    lock = false;
    console.log(shareImg);
    const img = encodeURIComponent(shareImg);

    const share: object = {
      title: `主标题`,
      text: '副标题',
      image: location.origin + subdir + 'shareIcon.jpg',
      imgUrl: location.origin + subdir + 'shareIcon.jpg',
      url: location.origin + subdir + `?step=6&img=${img}`,
      callback: () => {
        this.$toast('分享成功');
        this.$hm('fenxiangchenggong', 'share');
        this.shareMaskShow = false;
      },
    };
    this.$share(share);
    wnlShare.setShareData({ image: shareImg });
  }
  onReload(): void {
    this.$hm('zaixuanyici', 'ck');
    this.createShare(); //这是来自父组件的方法
    this.toNext();
  }
  onShare(): any {
    this.$hm('xuanyaoyixia', 'ck');
    if (util.isWnl && lock) return this.$toast('请稍等，分享图片正在生成中~');
    if (util.isWnl) wnlShare.showSharePlatform();
    else this.shareMaskShow = true;
  }
}
</script>

<style lang="less" scoped>
.result {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url('@{subdir}images/result_bg.jpg');
  background-size: 100% 100%;
  .mask {
    position: absolute;
    top: 0;
    right: 40px;
    width: 124px;
    height: 204px;
    background: url('../assets/images/share.png');
    background-repeat: no-repeat;
    background-size: 124px auto;
  }
  .shareImg {
    position: absolute;
    overflow: hidden;
    height: 100%;
    left: 0;
    top: 0;
    // z-index: 9;
    width: 100%;
    height: 82%;
    bottom: 0;
    opacity: 0;
  }
  .tips {
    color: #a5623d;
    font-size: 24px;
    position: absolute;
    bottom: 13%;
    left: 50%;
    transform: translateX(-50%);
    user-select: none;
    animation: scale 2s infinite;
  }
}
@keyframes scale {
  0% {
    transform: translateX(-50%) scale(0.8);
  }
  50% {
    transform: translateX(-50%) scale(1);
  }
  100% {
    transform: translateX(-50%) scale(0.8);
  }
}
</style>
