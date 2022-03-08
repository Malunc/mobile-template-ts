import Vue from 'vue';
import { util } from '@wnl/util';
import { wnlShare, wxShare } from '@wnl/share';
import { subdir, activeName } from '@/core/config';

declare module 'vue/types/vue' {
  interface Vue {
    $log(message: any): void;
    $toURL(url: string): void;
    $loading(msg: string): void;
    $share(share: object): void;
    $toDateTime(date: any): string;

    $getScreen(): void;
    $getVisitor(): void;

    $randomItem(items: object[]): any;
    $randomInt(from: number, to: number): number;
    $hm(eventName: string, eventType: string): void;

    $upload2Qiniu(base64: string): string;
  }
}

Vue.prototype.$log = (message: any) => console.log(message);

Vue.prototype.$toURL = function (url: string) {
  this.$router.push(url);
};

Vue.prototype.$loading = function (msg: string = '加载中') {
  this.$toast.loading({
    mask: false,
    message: msg,
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
  });
};

Vue.prototype.$hm = function (eventName: string, eventType: string) {
  let f = '_',
    clt = 'wx',
    OS = 'az';

  util.isWnl && (clt = 'wnl');
  util.isIOS && (OS = 'ios');

  let evn = [
    '_trackEvent',
    activeName + f + eventName + f + clt,
    eventType,
    OS,
  ];

  //百度统计
  window._hmt.push(evn);
  //cnzz
  // window._czc && window._czc.push(evn);
};

Vue.prototype.$share = function (share: object) {
  // share = {
  //   title: '主标题',
  //   text: '副标题',
  //   image: '分享图地址，与imgUrl相同',
  //   imgUrl: '分享图地址，与image相同',
  //   url: '分享页面地址',
  //   callback: () => {},
  // };
  if (util.isWnl) wnlShare.setShareData(share);
  if (util.isWeixin) new wxShare(share);
};

Vue.prototype.$getScreen = () => {
  let height = screen.height,
    width = screen.width,
    availHeight = document.documentElement.clientHeight,
    availWidth = document.documentElement.clientWidth;

  console.log('屏幕', height, width, height / width);
  console.log('可见区域', availHeight, availWidth, availHeight / availWidth);
};

Vue.prototype.$getVisitor = async function () {
  let res = await this.$axios.get(
    'https://r.51wnl-cq.com/api/CommonUserVisitCount/GetUserVisitCount?key=' +
      subdir
  );
  sessionStorage.visitNo = res.data;
};

/**
 * 返回给定数组随机一项数据
 * @param {Array} items 数组
 * @returns 数组中随机的一条数据
 */
Vue.prototype.$randomItem = (items: object[] = []): any =>
  items[Math.floor(Math.random() * items.length)];

/**
 返回随机的 [from, to] 之间的整数(包括from，也包括to)
 */
Vue.prototype.$randomInt = (from: number, to: number): number =>
  Math.floor(Math.random() * (to - from + 1) + from);

Vue.prototype.$toDateTime = (date: any): string => {
  date = date || new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  let second = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

Vue.prototype.$upload2Qiniu = async function (base64: string) {
  const tokenUrl = 'https://msg.51wnl.com/api/Active/qintoken?bucket=wnlother';

  if (base64.indexOf('base64') > -1)
    base64 = base64.substr(base64.indexOf('base64,') + 7);

  const { token } = await this.$axios.get(tokenUrl);
  // const { token } = await getJSON(tokenUrl);

  const url = await uptoQiniu(token, base64);
  return url;
};
function uptoQiniu(token: string, base64: string) {
  return new Promise((resove) => {
    let url = 'https://upload.qiniup.com/putb64/-1'; //非华东空间需要根据注意事项 1 修改上传域名
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let resData = JSON.parse(xhr.responseText);
        resove('https://qiniu.other.cq-wnl.com/' + resData.key);
      }
    };

    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Authorization', 'UpToken ' + token);
    xhr.send(base64);
  });
}
