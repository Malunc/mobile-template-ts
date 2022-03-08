export default ({ store }) => {
  //android需定义invokeWnl方法
  if (window.ylwindow && window.ylwindow.getStatusBarHeight) {
    window.invokeWnl = function (cmd) {
      return prompt('__invoke__' + JSON.stringify(cmd), undefined);
    };
  }
  let cname = 'darkmode',
    mode =
      window.invokeWnl &&
      window.invokeWnl({
        command: 'queryTheme',
      });

  if (mode == 1) {
    store.commit('setIsDarkmode', true);
    //如果mode为1，增加暗黑样式
    document.body.classList.add(cname);
    document.documentElement.classList.add(cname);
  }
  //通过客户端回调来获取是否为暗黑模式（注：全局函数）
  window.__wnl__theme_changed = function (theme) {
    console.log('theme_changed');
    if (theme == 1) {
      //如果mode为1，增加暗黑样式
      store.commit('setIsDarkmode', true);
      document.body.classList.add(cname);
      document.documentElement.classList.add(cname);
    } else {
      store.commit('setIsDarkmode', false);
      document.body.classList.remove(cname);
      document.documentElement.classList.remove(cname);
    }
  };

  // 测试暗黑模式
  // __wnl__theme_changed(1);
};
