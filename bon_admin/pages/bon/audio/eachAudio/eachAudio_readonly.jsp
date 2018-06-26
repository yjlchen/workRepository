<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>音频分集审核</title>
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.all.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/lang/zh-cn/zh-cn.js"></script>
	<link rel="stylesheet" href="${basePath}/ueditor/themes/iframe.css"></link>
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<%
	String status = request.getParameter("status");
%>
<script type="text/javascript">
	var status = '<%=status %>';
</script>
<style type="text/css">
div.p_img{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	float:left;
	position:relative;
}
div.select_box{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	line-height:50px;
	text-align:center;
}	
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">音频分集审核</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="title" name="title" type="text" readonly  autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">本集正文：</label>
							    <div class="layui-input-inline" > 
							       <textarea name="main_text" placeholder="请输入简介" readonly style="width: 300px;height: 160px;"></textarea>
							    </div>
						    </div>
						 </div>
				    	<div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟播放量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_play_amount" name="unreal_play_amount" readonly type="text"  autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" > 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">音频：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                    
			                        <div id="audioUrl" style="">
                					</div>
			                    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">第几集：</label>
							    <div class="layui-input-inline" > 
							       <input id="audio_num" name="audio_num" type="text" readonly lay-verify="required|checkNumber" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="display: none" id="isPay">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">是否试听：</label>
								<div class="layui-inline" id="is_pay" style="padding-top:8px;">
									
								</div>
						    </div>
						 </div>
					 	 <div class="layui-form-item" style="display: none">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img class="commPic"></img>	
							    		</div>
							    	</div>	
							    	<div class="spe" data-commid="">
							    </div>
						    </div>
						 </div>
						 		 
						 <div class="layui-form-item" style="margin-top: 10px;display: none">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img class="commPic"></img>	
							    		</div>	
							    		<div class="select_box">
							    			<a>+加图</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe">
							    	</div>
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">审核结果：</label>
							    <div class="layui-input-inline" id="check_result">
							     <label id="pass" class="layui-form-label" style=" text-align: left;padding-left: 10px;display: none ">通过</label>
							     <label id="reject"  class="layui-form-label" style="text-align: left;padding-left: 10px;display: none">驳回</label>
							    </div>
						    </div>
						 </div> 
						 <div class="layui-form-item" style="margin-top: 10px;display:none" id="reject_reason">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">驳回原因：</label>
							    <div class="layui-input-inline" > 
							       <input type="text"  name="reject_reason" id="bohui" readonly="readonly" maxlength="250" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<a class="layui-btn" id="returnToList">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="eachAudio_readonly.js"></script>
</html>