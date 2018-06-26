<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html
	class=" js flexbox flexboxlegacy canvas canvastext postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
<meta name="keywords" content="">
<meta name="description" content="">
<link type="text/css" rel="stylesheet"href="${basePath}/pages/cm/login/css/login.css">
<script type="text/javascript">
        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if(clientWidth>750) clientWidth=750;
                    if (!clientWidth) return;
                    docEl.style.fontSize = Math.floor(100 * (clientWidth / 750)) + 'px';
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);//100px是1rem
    </script>
<script type="text/javascript"
	src="${basePath}/commons/js/jquery-1.11.3.min.js"></script>
<meta
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
	name="viewport">
</head>
<body>
<div class="login_top clear">
    <div class="logo">
        <img src="${basePath}/pages/cm/login/images/logo.png" alt="图片消失了！">
    </div>
    <div class="top_select clear">
        <div><span><a href="">用户注册</a></span>&nbsp|&nbsp</div>
        <div><span><a href="">帮助中心</a></span>&nbsp|&nbsp</div>
        <div><span><a href="">加入收藏</a></span></div>
    </div>
</div>
<div class="login_middle clear">
    <div class="login_panel clear">
        <p>棒健康后台管理系统</p>
        <form id="login_form" action="" method="post"
						onsubmit="return formSubmit();">       
        <div class="login_input">
            <span><img src="${basePath}/pages/cm/login/images/logo_phone.png" alt=""></span>
            <input id="username" autocomplete="off" name="login_user" value="" class="input-control"
									type="text" placeholder="请输入用户名" required  style="box-shadow: 0 0 0px 1000px #EEEEEE inset;;border:none;outline:none;background-color:#EEEEEE">
        </div>
        
        <div class="login_input">
            <span><img src="${basePath}/pages/cm/login/images/logo_lock.png" alt=""></span>
            <input id="password" autocomplete="off" name="login_pwd" value="" class="input-control"
									type="password" placeholder="请输入密码" required style="box-shadow: 0 0 0px 1000px #EEEEEE inset;;border:none;outline:none;background-color:#EEEEEE">
        </div>
        
        <div class="login_yanzheng" id="kaptchadiv">
				<div class="leftimg clear">
				<span class="clear">
				<img src="${basePath}/pages/cm/login/images/kaptchaImage.png" >
				<input name="code" type="text" id="kaptchaCode" maxlength="4" class="code-input-control" placeholder="验证码">
				</span>
				</div>	
				<div class="rightyanzheng clear">
				<img src="${basePath}/checkImg/getCode.action" id="kaptchaImage" class="kaptchaImage" 
				onclick="changeCode();" >
				<a href="#" class="change-code" onclick="changeCode();">换一张</a>
				</div>
		</div>
		
        <p class="error-info" id="p1" style="margin-left: 6px"></p>
        <!-- 记住用户名以及密码功能 -->
		<div class="form-div">
			<label for="remember-me"  class="login_handlepword">
			    <input id="remberPwd"  name="remberPwd" type="checkbox" >
			    <span style="font-weight:normal">记住密码</span>
			</label>
		</div>	
        <!-- <div class="login_handlepword">
            <input type="checkbox"><span>记住密码</span>
            <a href="">记住密码？</a>
        </div> -->
        <div id="btn1" class="login_btn" style="CURSOR: hand">
                                    登录
        </div>
        <div id="tianchong"></div>	
        </form>
    </div>
</div>
<div class="login_bottom">
    <ul class="clear">
        <li><img src="${basePath}/pages/cm/login/images/logo_convenient.png" alt=""><span>便捷</span></li>
        <li><img src="${basePath}/pages/cm/login/images/logo_efficient.png" alt=""><span>高效</span></li>
        <li><img src="${basePath}/pages/cm/login/images/logo_safe.png" alt=""><span>安全</span></li>
    </ul>
    <div>
        <span style="font-size:16px;">鲁 ICP 备 16039048号-2</span>
    </div>
    <div>
        <span style="font-size:16px;">济南智硕电子商务有限公司 Copyright &copy 2017-2015 电话：400-1599-550</span>
    </div>
</div>
</body>

<%-- <script type="text/javascript"
	src="${basePath}/pages/cm/login/modernizr.custom.js"></script> --%>
	<jsp:include page="commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript"
	src="${basePath}/commons/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript"
	src="${basePath}/commons/bootstrap/js/bootstrap.min.js"></script>
<%-- <script type="text/javascript" src="${basePath}/pages/cm/login/utils.js"></script> --%>
<script type="text/javascript" src="${basePath}/pages/cm/login/js/login.js"></script>
<script type="text/javascript">
layui.use('layer', function(){ 
	  var $ = layui.jquery,
	  layer = layui.layer; 
});
//跳出iframe框架
if (top.location != self.location){   
	top.location=self.location;   
}
//清除session
<%
	session.invalidate();
%>
</script>
</html>