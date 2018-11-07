//点击退出键返回上一页  放在子页面

document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();
            } else {
                webview.close(); //hide,quit按手机返回键直接退出APP
                //plus.runtime.quit();
            }
        })
    });
});



/*
//放在主页面  点击两次退出APP 点击一次退出
document.addEventListener('plusready', function(a) {
    var first = null;
    plus.key.addEventListener('backbutton', function() {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
            first = new Date().getTime();

            document.write('再按一次退出应用');//用自定义toast提示最好
            setTimeout(function() {
                first = null;
            }, 1000);
        } else {
            if (new Date().getTime() - first < 1000) {
                plus.runtime.quit();
            }
        }
    }, false);
});
*/









/*
//完整版  点击一次返回上一页 ，连击两次退出APP
document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();
            } else {
                //webview.close(); //hide,quit
                //plus.runtime.quit();
                //首页返回键处理
                //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                var first = null;
                plus.key.addEventListener('backbutton', function() {
                    //首次按键，提示‘再按一次退出应用’
                    if (!first) {
                        first = new Date().getTime();
                        document.write('再按一次退出应用');
                        setTimeout(function() {
                            first = null;
                        }, 5000);
                    } else {
                        if (new Date().getTime() - first < 1500) {
                            plus.runtime.quit();
                        }
                    }
                }, false);
            }
        })
    });
});*/
