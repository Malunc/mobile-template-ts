<template>
  <div class="container" @touchstart="autoPlay">
    <music :playing="playing"></music>
    <preload v-if="step == 0" @nextPage="nextPage"></preload>
    <home v-if="step == 1" @nextPage="nextPage"></home>
    <process v-if="step == 2" @nextPage="nextPage"></process>
    <loading v-if="step == 3" @nextPage="nextPage"></loading>
    <result
      v-if="step == 4"
      :createShare="createShare"
      @nextPage="nextPage"
    ></result>
    <share v-if="step == 5"></share>
  </div>
</template>

<script lang="ts">
let _this: any;
import { subdir } from '../core/config';
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  head(this: Index): object {
    return {
      title: '标题',
    };
  },
})
export default class Index extends Vue {
  step: number | string = 0;
  playing: boolean = false;

  //计算属性
  get isDarkmode() {
    return this.$store.state.isDarkmode;
  }

  mounted(): void {
    _this = this;
    let _step: any = this.$route.query.step;
    if (_step != 5) this.createShare();
    else this.step = _step;

    this.$getVisitor();

    this.$hm('yemianfangwen', 'im');
  }

  createShare(): void {
    let share = {
      title: '主标题',
      text: '副标题',
      image: location.origin + subdir + 'shareIcon.jpg',
      imgUrl: location.origin + subdir + 'shareIcon.jpg',
      url: location.origin + subdir,
      callback: window.shareCallback,
    };
    this.$share(share);
  }
  nextPage(step: number): void {
    this.step = step;
    console.log('step' + step);
  }
  autoPlay(): void {
    if (this.step == 1) {
      this.playing = true;
    }
  }
}

// function shareCallback() {
//   _this.$hm('shared', 'share');
// }
window.shareCallback = () => {
  _this.$hm('shared', 'share');
};
</script>

<style lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
