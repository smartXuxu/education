/**
 * Created by Administrator on 2018/8/25.
 */
var falg=true;
$("#show").click(function(){
    $("#layer").css("left","80%");
    $("#layer").height("100%");
    $("#left").height("100%");
    $("#content_layer").css("overflow","hidden");
    $("#layer").css("overflow","hidden");
    $("#left").css("overflow","hidden");

    $("#layer").css("position","absolute");
    $("#layer").css("transition","left 0.1s ease");
    $("#left").show();
    $("#mask").show();
});
$("#mask").click(function(){
    $("#layer").css("position","relative");
    $("#layer").css("left","0%");
    $("#content_layer").css("overflow","auto");
    $("#left").css("display","none");
    $("#layer").css("transition","left 0.1s ease");
    $("#mask").css("display","none");
})


var startx, starty;
    //获得角度
    function getAngle(angx, angy) {
            return Math.atan2(angy, angx) * 180 / Math.PI;
       };

   //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
   function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
         var angy = endy - starty;
         var result = 0;

         //如果滑动距离太短
         if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
              return result;
          }

      var angle = getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
              result = 1;
          } else if (angle > 45 && angle < 135) {
              result = 2;
          } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
              result = 3;
          } else if (angle >= -45 && angle <= 45) {
              result = 4;
          }

         return result;
     }

//手指接触屏幕
  document.addEventListener("touchstart", function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
  //手指离开屏幕
  document.addEventListener("touchend", function(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
             /*case 0:
                     alert("未滑动！");
                     break;
                 case 1:
                     alert("向上！")
                     break;
                 case 2:
                     alert("向下！")
                     break;*/
                 case 3:
                     //alert("向左！");
                     $("#layer").css("position","relative");
                     $("#layer").css("left","0%");
                     $("#content_layer").css("overflow","auto");
                     $("#left").css("display","none");
                     $("#layer").css("transition","left 0.1s ease");
                     $("#mask").css("display","none");
                     break;
                /* case 4:
                     alert("向右！")
                     break;*/
                 default:
             }
      }, false);