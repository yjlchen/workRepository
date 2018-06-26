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
<title>资讯管理</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
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
	.chzn-container-multi .chzn-choices .search-field input{
    	height:auto !important;
    }
	.module-goods-list li .add-goods,
	.module-goods-list li .add,
	.app-image-list li .add-goods,
	.app-image-list li .add {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		cursor: pointer
	}
	#addBannerContent .layui-form-item .module-goods-list .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
	}
	#addBannerContent .layui-form-item .module-goods-list .close-modal{
		position: absolute;
    	top: -8px;
    	right: -8px;
    	width: 18px;
    	height: 18px;
    	font-size: 14px;
    	line-height: 16px;
    	border-radius: 9px;
    	background: rgba(153, 153, 153, 0.6);
    	text-align: center;
    	color:#fff;
	}
	#addBannerContent .layui-form-item .module-goods-list li {
	    position: relative;
	    margin-top: 20px;
	    margin-left: 15px;
	}
	.layui-anim-upbit{
		width: 300px;
	}

	.sorting_disabled div.layui-unselect i {
		margin: 0 10px 0 27px;
	}
	
	.dataTables_length div.layui-unselect {
		display: none;
	}
	
	label.checkbox.inline.reward-label {
	    margin-left: 18px;
	}
	
	.layui-select-title {
		display: none
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
		float:left;
		margin-left:30px;
	}
	div.standard{
		width:500px;
		height:auto;
		float:left;
		padding:10px 0;
		/* display:none */
	}
	div.standard>text,span{
		float:left;
		margin-top:5px;
	}
	div.standard>ul>li{
		width:auto;
		height:30px;
		line-height:30px;
		border:1px solid #DDDDDD;
		border-radius:5px;
		text-align:center;
		float:left;
		margin-left:15px;
	}
	li.selected{
		background-color:#4E97D9;
		color:#FFFFFF;
	}
	.edui-default .edui-editor-iframeholder{
		height:300px !important;
	}
	.view {word-break: break-all;overflow-y:auto !important;}
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">资讯编辑</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="title" name="title" type="text"  placeholder="请输入标题" lay-verify="required" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>简介：</label>
							    <div class="layui-input-inline" > 
							       <input id="brief_introduce" name="brief_introduce" type="text"  placeholder="请输入简介" lay-verify="required|lengthIn100" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>虚拟浏览量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_browse_amount" name="unreal_browse_amount" type="text"  placeholder="请输入浏览量" lay-verify="required|checkNumber" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>虚拟收藏量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_collect_amount" name="unreal_collect_amount" type="text"  placeholder="请输入收藏量" lay-verify="required|checkNumber" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>虚拟点赞量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_praise_amount" name="unreal_praise_amount" type="text"  placeholder="请输入点赞量" lay-verify="required|checkNumber" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>首页图片：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                    <button type="button" class="layui-btn" id="uploadImgUrl">
									  <i class="layui-icon">&#xe67c;</i>上传图片
									</button>
			                        <ul class="module-goods-list clearfix" name="img_urls" id="img_urls">
			                        </ul>
			                        <input type="hidden" id="img_url" name="img_url"/>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">
				    			<!-- <text  style="color:#DD4B3F">*</text> -->
				    			音频：</label>
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
						 
						 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><text  style="color:#DD4B3F">*</text>标签：</label>
							    <div class="layui-input-inline" >
							    	<select name="label_id" id="label_id"  multiple="" style="width:400px">
									</select> 
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
							    			<img class="commPic"></img>	
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
							    			<img class="commPic"></img>	
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
						 
					 	 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">内容：</label>
							    <div class="layui-input-inline" >
                          			<div style="width: 500px;"> <script id="editor1" type="text/plain"></script></div> 
                          			<script type="text/javascript">
                          				var ue = UE.getEditor("editor1",{
        									elementPathEnabled : false, //是否启用元素路径，默认是true显示
        									wordCount:false, //是否开启字数统计
        									initialFrameHeight:300,
        								});
                          			</script>
							    </div>
						    </div>
						 </div>
					 	  	 
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<%if(status.equals("0")) {%>
						    	<button class="layui-btn" lay-submit lay-filter="submitToDraft" id="submitToDraft">保存为草稿</button>
						    	<%} %>
						    	<button class="layui-btn" lay-submit lay-filter="submitPublish" id="submitPublish">发布</button>
						    	<a class="layui-btn" id="returnToList">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="addInformation.js"></script>
</html>