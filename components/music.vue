<template>
  <section class="topbar">
    <div v-if="showIcon" class="logo"></div>
    <div
      v-if="showMusic"
      :class="['music', isplay ? 'playing' : 'playing pause']"
      @click="onPlay()"
    >
      <audio
        id="audio"
        preload="auto"
        :autoplay="autoplay"
        :loop="loop"
        :src="bgm"
      ></audio>
    </div>
  </section>
</template>

<script lang="ts">
import { util } from '@wnl/util';
import bgm from '@/assets/music/bgm.mp3';
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator';

@Component
export default class music extends Vue {
  isplay: boolean = false;
  // audio: string = '';
  bgm: any = bgm;

  @Prop({ default: false }) readonly autoplay!: boolean;
  @Prop({ default: true }) readonly showIcon!: boolean;
  @Prop({ default: true }) readonly showMusic!: boolean;
  @Prop({ default: true }) readonly loop!: boolean;
  @Prop({ default: false }) readonly playing!: boolean;

  @Watch('playing')
  onplaying(newValue: boolean) {
    let audio: any = document.getElementById('audio');
    if (newValue) {
      audio.play();
      this.isplay = true;
    } else {
      audio.pause();
      this.isplay = false;
    }
  }

  init(): void {
    if (this.autoplay) {
      let voice: any = document.getElementById('audio');
      voice.play();
      this.isplay = true;
      let iosplay = false;
      voice.addEventListener('ended', () => {}, false);
      document.addEventListener('touchstart', function (e) {
        if (iosplay === false) {
          voice.play();
          iosplay = true;
        }
      });
      document.addEventListener(
        'WeixinJSBridgeReady',
        function () {
          voice.play();
        },
        false
      );
    }
  }
  onPlay(): void {
    let audio: any = document.getElementById('audio');

    console.log(this.isplay);
    if (audio.paused) {
      audio.play();
      this.isplay = true;
    } else {
      audio.pause();
      this.isplay = false;
    }
  }
  // isPageLeave(): void {
  //   let audio: any = document.getElementById('audio');

  //   let hiddenProperty: any =
  //     'hidden' in document
  //       ? 'hidden'
  //       : 'webkitHidden' in document
  //       ? 'webkitHidden'
  //       : 'mozHidden' in document
  //       ? 'mozHidden'
  //       : null;
  //   let visibilityChangeEvent = hiddenProperty.replace(
  //     /hidden/i,
  //     'visibilitychange'
  //   );
  //   let onVisibilityChange = () => {
  //     let p: boolean = document[hiddenProperty];
  //     if (p && audio.played) {
  //       audio.pause();
  //       this.isplay = false;
  //     }
  //   };
  //   document.addEventListener(visibilityChangeEvent, onVisibilityChange);
  // }

  mounted(): void {
    // this.isPageLeave();
    if (util.isAndroid) {
      let voice: any = document.getElementById('audio');
      voice.play();
      this.isplay = true;
    }
  }
}
</script>

<style lang="less">
.topbar {
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  z-index: 5;
  .logo {
    position: absolute;
    top: 20px;
    left: 40px;
    height: 70px;
    width: 200px;
    background: url('../assets/images/logo.png') no-repeat center center;
    background-size: contain;
  }
  .music {
    position: fixed;
    top: 20px;
    right: 30px;
    height: 60px;
    width: 60px;
    background: url('../assets/images/music.png') no-repeat center center;
    background-size: contain;
  }
}

@keyframes playing {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.playing {
  animation: playing 3s linear infinite;
}
.pause {
  animation-play-state: paused;
}
</style>
