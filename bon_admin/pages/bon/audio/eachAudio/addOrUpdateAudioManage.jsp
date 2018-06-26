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
<title>音频分集编辑</title>
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
<%
	String status = request.getParameter("status");
%>
<script type="text/javascript">
	var status = '<%=status %>';
</script>
<style type="text/css">
/* 必选项 样式 */
em.required {
	    font-size: 16px;
	    color: #f00;
	    vertical-align: middle;
}
div.p_img{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	float:left;
	position:relative;
	display:none;
}
img.delete{
	width: 20px;
    height: 20px;
    position: absolute;
    right: -10px;
    top: -11px;
}
div.select_box{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	line-height:50px;
	text-align:center;
	float: left;
	margin-left: 30px;
}
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">音频分集编辑</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="title" name="title" type="text"  placeholder="请输入标题" lay-verify="required"
							       maxlength="64" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>本集正文：</label>
							    <div class="layui-input-inline" > 
							       <textarea name="main_text" placeholder="请输入简介" lay-verify="required" style="width: 300px;height: 160px;"></textarea>
							    </div>
						    </div>
						 </div>
				    	<div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>虚拟播放量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_play_amount" name="unreal_play_amount" type="text"  placeholder="请输入播放量"
							       maxlength="11" lay-verify="required|checkNumber" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" > 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>音频：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                    <button type="button" class="layui-btn" id="uploadAudioUrl">
									  <i class="layui-icon">&#xe67c;</i>上传音频
									</button>
			                        <div id="audioUrl" style="outline:none;">
                					</div>
                					<input type="hidden" id="audio_url" name="audio_url"/>
			                    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>第几集：</label>
							    <div class="layui-input-inline" > 
							       <input id="audio_num" name="audio_num" type="text"  placeholder="请输入第几集" lay-verify="required|checkNumber"
							       maxlength="11" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" id='ispay'>
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">是否试听：</label>
								<div class="layui-inline">
									<input type="radio" name="is_pay" lay-filter="is_pay" value="1" title="是" >
									<input type="radio" name="is_pay" lay-filter="is_pay" value="0" title="否" checked="">
								</div>
						    </div>
						 </div>
					 	 <div class="layui-form-item" style="">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img style="max-width: 100%;" class="commPic"/>
							    			<img src="delete.png" class="delete"></img>
							    		</div>	
							    		<div class="select_box">
							    			<a>+加图</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe" data-commid="">
							    	</div>
							    </div>
						    </div>
						 </div>
						 		 
						 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img style="max-width: 100%;" class="commPic"/>
							    			<img src="delete.png" class="delete"></img>
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
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<%if(status.equals("0")) {%>
						    	<button class="layui-btn" lay-submit lay-filter="submitToDraft" >保存为草稿</button>
						    	<%} %>
						    	<button class="layui-btn" lay-submit lay-filter="submitPublish" >发布</button>
						    	<a class="layui-btn" id="returnToList">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="addOrUpdateAudioManage.js"></script>
</html>