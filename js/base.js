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
//var baseUrl="http://39.104.127.252:8080/dongdong/";
var baseUrl='http://192.168.1.181:8087';
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
//上拉加载
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
var _loadIndex =1,
    _loadState = 0;

function loadmore(element,url,userId,successFn) {
    $(element).on("scroll",function(){
        //当前可视容器高度
        var _elementHeight = $(element).outerHeight(),
        //当前滚动区域高度
            _elementChildHeight = $(element).children().outerHeight(),
        //滚动条高度
            _elementScroll = $(element).scrollTop();
        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){
            //console.log('没到底')
        }else {
            //console.log('到底了')
            //当状态为0 的时候进行加载，防止重复加载
            if(_loadState == 0){
                //状态更新为1
                _loadState = 1;
                //增加页数
                _loadIndex += 1;
                //添加正在加载loadding
                $(element).append('<p class="nowLoad">加载中...</p>');
                //请求当前页数ajax
                ajaxLoad(_loadIndex,userId);
            }
        }
    });
    //ajax请求
    function ajaxLoad(_loadIndex,userId) {
        //更新发向服务器的数据，添加页数key值
       /* dataObj.page = page;
        dataObj.size = 4;
        dataObj.userId = userId;*/
        $.ajax({
            url:baseUrl+url,
            xhrFields:{
                withCredentials:true
            },
            type:"post",
            dataType:'json',
            async:false,
            data:{
                size:3,
                page:_loadIndex,
                userId:userId
            },
            success:function (data) {
               // console.log(data);
                //数据渲染  ajajx回调
              successFn(data);
                //当数据不为空的时候，更新状态
                if(data.length > 0){
                    //更新状态 为 0
                    _loadState = 0;
                    //删除正在加载loadding
                    $('.nowLoad').remove();
                   /* function hg(){
                        $(".nowLoad").remove();
                    }
                    setTimeout(hg,1200);*/
                }else {
                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
                    _loadState = 2;
                    //删除正在加载loadding
                    $('.nowLoad').remove();
                    //更换loadding为没有数据
                    $(element).append('<p class="endLoad">没有数据了...</p>');
                    function fg(){
                        $(".endLoad").remove();
                    }
                    setTimeout(fg,3000);
                }
            },
            error:function (err) {
                //请求失败loadding
                console.log(data);
                sweetAlert(
                   "sorry",
                    data.msg,
                    "error"
                )
            }
        })
    }
};
//上拉加载调用js
/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
 $.each(data.data.list,function (key,val) {
 $('#wrapper ul').append();
 });
 },function () {
 });*/