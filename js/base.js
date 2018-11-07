/**
 * Created by Administrator on 2018/7/23.
 */


/*(function($, doc) {
    $.init();
    $.plusReady(function() {
        var backButtonPress = 0;
        $.back = function(event) {
            backButtonPress++;
            if (backButtonPress > 1) {
                plus.runtime.quit();
            } else {
                plus.nativeUI.toast('再按一次退出应用');
            }
            setTimeout(function() {
                backButtonPress = 0;
            }, 1000);
            return false;
        };
    });
}(mui, document));
//禁止 回退
if (window.history && window.history.pushState) {
    $(window).on('popstate', function () {
        window.history.forward(1);
    });
}
//禁止 回退结束*/
//var baseUrl="http://192.168.1.125:8080/";
var baseUrl="http://39.104.127.252:8080/dongdong/";
function back(){
    history.go(-1);
}

function isUser(){
    var uName=localStorage.getItem('uName');
    if(uName){
        uName.replace(/\"/g,"");
        console.log("已经登录过了");
    }else{
        sweetAlert(
            "sorry",
            "您还没有登录，请您先登录",
            "error"
        ).then(function () {
                window.location.href="../login.html";
            })

    }
}
 /* mui.back = function(){
            if(!first) {
                first = new Date().getTime();
                //console.log(first);
                mui.toast('再按一次退出应用');
                setTimeout(function() {
                    first = null;
                }, 2000);
            } else {
                if(new Date().getTime() - first < 2000) {
                    plus.runtime.quit();
                }
            }
        };*/

//验证 身份证号
function isCardNo(card)
{
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false)
    {
        alert("身份证输入不合法");
        //$("#Idcard").val("");
        return false;
    }
}
//验证手机号
function checkTelNum(telNum){
    if(!/^1[0-9]{10}$/.test(telNum)){
        return false;
    }
    return true;
}
//验证不为空
function isNotBlank(data) {
    return (data == "" || typeof(data)  == "undefined"|| data == null ) ? false : true;
}
//获取所有的头像
 function getAvatar(ele){
     $.ajax({
         xhrFields: {
             withCredentials: true
         },
         type: "post",
         //async:false,
         url: baseUrl+"/worker/updateAvatar",
         dataType: 'json',
         success:function(data){
             console.log(data);
             if(data.success==true){
                 var html=template("getPic",data);
                // localStorage.setItem('gitPic',data.message);
                 ele.html(html);
             }else{
                 var html=template("getPic",data);
                 // localStorage.setItem('gitPic',data.message);
                 ele.html(html);
             }

         },
         error:function(data){
             console.log(data);
         }
     })
 }
//获取侧边栏用户信息
function userInfo(ele){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "post",
        url: baseUrl+"/student/getStudent",
        dataType: 'json',
        success:function(data){
            console.log(data);
            var html=template("userInfo",data);
            ele.html(html);
        },
        error:function(data){
            console.log(data);
        }
    })
}


//多选 span active 函数
function getData(flag,ele){
    $(ele).click(function () {
        if(flag){
            $(this).addClass("active");
            flag=false;
        }else{
            $(this).removeClass("active");
            flag=true;
        }
    })
}
//获取 选中的span active的值
function forEach(ele,arr){
    $(ele).each(function () {
        arr.push($(this).text());
    })
    console.log(arr);
}
function myAjax(parm,callback){
    $.ajax({
        type:parm.type||'get',
        dataType:"JSON",
        data:parm.data,
        url:baseUrl+parm.url,
        xhrFields: {
            withCredentials: true
        },
        async:parm.async||"true",
        success: function (data) {
            callback&&callback(data);
        },
        error: function (msg) {
            console.log(msg);
            sweetAlert(
                "sorry",
                "网络发生错误,请您重新登录",
                'error'
            ).then(function () {
                location.href="../login.html"
            })
        }
    })
}
/*
function ajax(url,data,type,callback){
    $.ajax({
        url:baseUrl+url,
        dataType:"JSON",
        data:data,
        type:type,
        xhrFields: {
            withCredentials: true
        },
        success: function (data) {
            callback()
        }

    })
}*/
