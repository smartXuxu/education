
    $(function() {
        var flag = true;
        $("#click_hidden").click(function () {
            if (flag) {
                $("#hidden_location").css("display", "block");
                if(localStorage.getItem("location")){
                    localStorage.removeItem("location");
                }
                $("#container").css("display", "none");
                $("#tip").css("display", "none");
                flag = false;
            } else {
                $("#hidden_location").css("display", "none");
                $("#container").css("display", "block");
                $("#tip").css("display", "block");
                flag = true;
            }
        })
        /*    例子解释：
         检测是否支持地理定位
         如果支持，则运行 getCurrentPosition() 方法。如果不支持，则向用户显示一段消息。
         如果getCurrentPosition()运行成功，则向参数showPosition中规定的函数返回一个coordinates对象
         showPosition() 函数获得并显示经度和纬度 */

        // var x=document.getElementById("container");
        /*  if (navigator.geolocation)
         {
         alert("定位已开启");
         }
         else{
         alert("您已经拒绝使用定位");
         }*/
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {

            var map, geolocation;
            var map = new AMap.Map('container', {
                zoom:14,
                scrollWheel: false
            });

            /* AMap.plugin('AMap.ToolBar',function(){
             var toolbar = new AMap.ToolBar();
             map.addControl(toolbar)
             })*/
            AMap.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                //AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            });
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });
            positionPicker.on('success', function(positionResult) {
                document.getElementById('userlocaltionid').value=positionResult.position.lng+','+positionResult.position.lat;

                document.getElementById('userlocaltiontext').value=positionResult.regeocode.addressComponent.province+positionResult.regeocode.addressComponent.city+positionResult.regeocode.addressComponent.district+positionResult.regeocode.addressComponent.street+positionResult.regeocode.addressComponent.township+positionResult.regeocode.addressComponent.streetNumber;
                document.getElementById('addresscode').value=positionResult.regeocode.addressComponent.adcode;
                /* var str=['定位成功'];*/
                var str=[];
                str.push('地址：' +positionResult.regeocode.addressComponent.city+positionResult.regeocode.addressComponent.district+positionResult.regeocode.addressComponent.street+positionResult.regeocode.addressComponent.township);
                /*   str.push('经度：' + positionResult.position.lng);
                 str.push('纬度：' + positionResult.position.lat);
                 str.push('邮编：' + positionResult.regeocode.addressComponent.adcode);*/

                // str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                var tip=  document.getElementById('tip');
                tip.innerHTML =/* '<input type="text" id="searchgeo" /><button onclick="geocoder()">搜索</button><br/>'+*/str.join('<br>');

                /*document.getElementById('lnglat').innerHTML = positionResult.position;
                 document.getElementById('address').innerHTML = positionResult.address;
                 document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
                 document.getElementById('nearestRoad').innerHTML = positionResult.nearestRoad;
                 document.getElementById('nearestPOI').innerHTML = positionResult.nearestPOI;*/
                var location=localStorage.setItem("location",str);
            });
            positionPicker.on('fail', function(positionResult) {
                document.getElementById('userlocaltionid').value = ' ';
                document.getElementById('userlocaltiontext').value = ' ';
                document.getElementById('addresscode').value = ' ';
                document.getElementById('tip').innerHTML = ' ';
            });
            var onModeChange = function(e) {
                positionPicker.setMode(e.target.value)
            }
            /*var startButton = document.getElementById('start');
             var stopButton = document.getElementById('stop');
             var dragMapMode = document.getElementsByName('mode')[0];
             var dragMarkerMode = document.getElementsByName('mode')[1];
             AMap.event.addDomListener(startButton, 'click', function() {
             positionPicker.start(map.getBounds().getSouthWest())
             })
             AMap.event.addDomListener(stopButton, 'click', function() {
             positionPicker.stop();
             })
             AMap.event.addDomListener(dragMapMode, 'change', onModeChange)
             AMap.event.addDomListener(dragMarkerMode, 'change', onModeChange);*/
            positionPicker.start();
            map.panBy(0, 1);
            map.addControl(new AMap.ToolBar({
                liteStyle: true
            }))
        });

    })

