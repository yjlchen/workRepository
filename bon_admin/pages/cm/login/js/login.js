$(function(){
	shijian();
})
$(function(){
	   var str = getCookie("loginInfo");
	    str = str.substring(1,str.length-1);
	    var username = str.split(",")[0];
	    var password = str.split(",")[1];
	    //自动填充用户名和密码
	    $("#username").val(username);
	    $("#password").val(password);
	    if (password != null && password != "") {
	    	$("#remberPwd").attr("checked","checked");
		} else {
	    	$("#remberPwd").removeAttr("checked");
		}
})
//获取cookie
function getCookie(cname) {
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) != -1) 
    	return c.substring(name.length, c.length);
	}
return "";
}

//删除cookies
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var str = getCookie("loginInfo");
    str = str.substring(1,str.length-1);
    var username = str.split(",")[0];
    var password = str.split(",")[1];
    if(str!=null){
    	document.cookie= str + "={"+username+","+null+"};expires="+exp.toGMTString();
    }
} 


//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}



function shijian(){
	$("#btn1").click(function(){
		submitForm();
	});
}
function submitForm(){

	if($("#username").val()==''){
		$("#p1 :last-child").remove();
		$("#p1").append("<font color='red'>用户名不能为空</font>");
		//$("#p1").fadeOut(3000);
	}else if($("#password").val()==''){
		$("#p1 :last-child").remove();
		$("#p1").append("<font color='red'>密码不能为空</font>");
		//$("#p1").fadeOut(3000);
	}else if($("#kaptchaCode").val()==''){
		$("#p1 :last-child").remove();
		$("#p1").append("<font color='red'>验证码不能为空</font>");
		//$("#p1").fadeOut(3000);
	}else if($("#kaptchaCode").val().length!=4){
		$("#p1 :last-child").remove();
		$("#p1").append("<font color='red'>验证码长度错误</font>");
		//$("#p1").fadeOut(3000);
	}else{
		var queryCond = $('#login_form').serializeObject();
		var queryJsonStr=JSON.stringify(queryCond);
		$.ajax({
	     	 type:"post",
	         url: getRootPath()+"/login/login.action",
	         dataType:"json",
	         data : {queryJsonStr:queryJsonStr},
	         success : function (res) {
	            var data=res.data; 
	         	if( data.indexOf("success")>=0){
	         		if(data.indexOf(",")>0){
	         			alert("匹配虚拟用户:"+data.split(",")[1]);
	         		}
	         		window.location.href=getRootPath()+'/index.jsp';
	         	}else if("errorcode"==data){
	         		$("#kaptchaCode").val("");
	         		$("#p1 :last-child").remove();
	         		$("#p1").append("<font color='red'>验证码错误</font>");
	         		changeCode();
	         	}else if("nameEmpty"==data){
	         		$("#p1 :last-child").remove();
	         		$("#p1").append("<font color='red'>用户名不存在</font>");
	         		changeCodeNoFocus();
	         	}else if("errorpwd"==data){
	         		$("#p1 :last-child").remove();
	         		$("#p1").append("<font color='red'>密码错误</font>");
	         		changeCodeNoFocus();
	         	}else if("noBindXcx"==data){
	         		$("#p1 :last-child").remove();
	         		$("#p1").append("<font color='red'>请先关注小程序并绑定账号</font>");
	         		changeCodeNoFocus();
	         	}else if("noBindRole"==data){
	         		$("#p1 :last-child").remove();
	         		$("#p1").append("<font color='red'>请找管理员为您分配角色</font>");
	         		changeCodeNoFocus();
	         	}else if("noBindCus"==data){
	         		$("#p1 :last-child").remove();
	         		$("#p1").append("<font color='red'>主播需要绑定后台账号或小程序绑定账号</font>");
	         		changeCodeNoFocus();
	         	}
	         	
	         	
	         	
	         	
	         },
	         error:function(){
	        	 alert("error");
	         }
         
	    });
	}

}

function changeCode() {  //刷新验证码
	$('#kaptchaImage').hide().attr('src', getRootPath()+'/checkImg/getCode.action?' + Math.floor(Math.random()*100) ).fadeIn();
	$('#kaptchaCode').val('');
	$('#kaptchaCode').focus();
}

function changeCodeNoFocus(){
	$('#kaptchaImage').hide().attr('src', getRootPath()+'/checkImg/getCode.action?'  + Math.floor(Math.random()*100) ).fadeIn();
	$('#kaptchaCode').val('');
}

$(document).keyup(function(event){  
    if(event.keyCode ==13){  
      submitForm();  
    }  
  }); 
function getRootPath(){
	//获取当前网址
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
