import 'lib-flexible';

// import VConsole from 'vconsole';
import { isDebug, hideShare, hideCollect } from '../core/config';

let document = window.document;
export default ({ query }) => {
  init();
  // if ((query && query.debug == 1) || isDebug) new VConsole();
  if ((query && query.debug == 1) || isDebug) setDebug();
};
function init() {
  if (hideShare) {
    //android:安卓无法获得js方法的返回值，故需要条用enableShare方法通知安卓客户端
    if (window.ylwindow && ylwindow.enableShare) {
      ylwindow.enableShare(false);
    }
    //ios:
    window.appCallback_showShare = function () {
      return 0;
    };
  }

  if (hideCollect) {
    //android:安卓无法获得js方法的返回值，故需要条用enableCollect方法通知安卓客户端
    if (window.ylwindow && ylwindow.enableCollect) {
      ylwindow.enableCollect(false);
    }
    //ios:
    window.appCallback_showCollect = function () {
      return 0;
    };
  }
}
function setDebug() {
  let script = document.createElement('script');
  script.src = 'https://cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js';
  document.body.appendChild(script);

  setTimeout(() => {
    let script1 = document.createElement('script');
    let textNode = document.createTextNode('eruda.init();');
    script1.appendChild(textNode);
    document.body.appendChild(script1);
  }, 1000);
  //异步不能直接写入document
  // document.write(unescape('<script src="https://cdn.bootcdn.net/ajax/libs/eruda/2.4.1/eruda.min.js"></script>'));
  // document.write(unescape('<script > eruda.init();</script>'));
}

/**
 * cnzz埋点
 */
// document.write(
//   unescape(
//     "%3Cspan style='display:none;' id='cnzz_stat_icon_1280091761'%3E%3C/span%3E%3Cscript src='https://v1.cnzz.com/z_stat.php%3Fid%3D1280091761' type='text/javascript'%3E%3C/script%3E"
//   )
// );
