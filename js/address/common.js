$(document).bind("mobileinit",function(){$.mobile.ajaxEnabled=false});function showLoader(t,c){$.mobile.loading('show',{text:"",textVisible:true,theme:'b',textonly:true,html:"<h1>"+t+"</h1><h1>"+c+"</h1>"});}
function hideLoader()
{$.mobile.loading('hide');}