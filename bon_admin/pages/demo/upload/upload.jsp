<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<%-- <script type="text/javascript" src="${basePath}/commons/bootstrap/js/jquery.js"></script> --%>
<%-- <script type="text/javascript" src="${basePath}/tools/layui-v2.1.5/layui.js"></script> --%>
<%-- <link rel="stylesheet" href="${basePath}/tools/layui-v2.1.5/css/layui.css" media="all"> --%>

<!-- <link rel="stylesheet" href="layui.css" media="all"> -->
<%-- <script type="text/javascript" src="${basePath}/commons/js/commons.js"></script> --%>
<title>上传测试</title>
</head>
<style>
.layui-input, .layui-textarea{
	width:300px;
}

.layui-form-label {
	width:120px;
}
</style>
<!-- <script type="text/javascript" src="upload.js"></script> -->
<body>
<div class="inner-page-top layui-clear">
   上传测试
</div>
<div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">
            
<!--             <div class="layui-upload"> -->
<!-- 			  <button type="button" class="layui-btn" id="test1">上传图片</button> -->
<!-- 			  <div class="layui-upload-list"> -->
<!-- 			    <img class="layui-upload-img" id="demo1" style="width:70px;height:80px"> -->
<!-- 			    <p id="demoText"></p> -->
<!-- 			  </div> -->
<!-- 			</div>  -->
			<button type="button" class="layui-btn" id="test5"><i class="layui-icon"></i>上传视频</button>
			<button type="button" class="layui-btn" id="test6"><i class="layui-icon"></i>上传音频</button> 
<!-- 			</br> -->
<!-- 			<div class="layui-progress layui-progress-big" lay-showpercent="true" lay-filter="demo" style="margin-top: 20px; margin-bottom: 0;"> -->
<!-- 			  <div class="layui-progress-bar layui-bg-red" lay-percent="0%"></div> -->
<!-- 			</div> -->
<!-- 			<div class="site-demo-button" style="margin-top: 5px; margin-bottom: 0;"> -->
<!-- 			  <button class="layui-btn site-demo-active" data-type="setPercent">设置50%</button> -->
<!-- 			  <button class="layui-btn site-demo-active" data-type="loading">模拟loading</button> -->
<!-- 			</div> -->
            <div class="layui-form-item" style="margin-top: 5px; margin-bottom: 0;">
                <div class="layui-input-block">
                    <button class="layui-btn" lay-submit="" lay-filter="save" id="save">保存</button>
                </div>
            </div>
    </div>
</div>
</body>
<script type="text/javascript">
$(function(){
// 	$.ajax({
//   		url : getRootPath()+ '/uploadtest/test.action?type=分享',
//   		type : 'POST',
//   		dataType : 'json',
//   		success : function(result){
//   			 if(result){
//   			 }
//   		}
//   	});
})


layui.use(['form','layer','upload','element'], function(){
	  var layer = layui.layer;
	  var form = layui.form;
	  var upload = layui.upload;
	  var element = layui.element;
	  upload.render({
	    elem: '#test5'
	    ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=video'
	    ,accept: 'video' //视频
	    ,before: function(obj){
	    	uploading();
		}
	    ,done: function(res){
	    }
	  });
	  upload.render({
		    elem: '#test6'
		    	 ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=voice'
		    ,accept: 'audio' //音频
		    ,before: function(obj){
			    	uploading();
			}
		    ,done: function(res){
		      console.log(res)
		    }
		  });
})	

 //上传进度显示	
 function uploading(){
	parent.document.getElementById("upload_speed").innerHTML='上传准备中...';
	parent.document.getElementById("upload_mask").style.display="block";
    var timer = setInterval(function(){
	      $.ajax({
	  		url : getRootPath()+ '/uploadCommon/queryUploadInfo.action',
	  		type : 'POST',
	  		dataType : 'json',
	  		success : function(result){
	  			 if(result){
	  				  var speed=result.speed;               //本次获得的上传进度
	  				  var filePath=result.filePath;         //上传的文件路径
	  				  if(speed=="100" || speed=="-1"){      //100：上传完毕100%;-1://上传失败,需要重新上传    这里自己进行处理 获取文件路径
	  					 clearInterval(timer);
// 	  				     console.info(filePath)
	  					 parent.document.getElementById("upload_speed").innerHTML=(speed=="-1")?'上传失败！请重新上传':'已上传'+parseInt(speed)+'%';
	  					 setTimeout('parent.document.getElementById("upload_mask").style.display="none"',500);
	  				  }else if(speed!="0"){
		  				 parent.document.getElementById("upload_speed").innerHTML='已上传'+parseInt(speed)+'%';
		  			 }
	  			 }
	  		}
	  	});
    }, 10);
}


</script>
</html>