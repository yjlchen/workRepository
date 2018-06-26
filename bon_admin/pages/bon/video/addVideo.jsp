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
<title>视频管理</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="addVideo.js"></script>
<style type="text/css">
/* 必选项样式  */
em.required {
	font-size: 16px;
	color: #f00;
	vertical-align: middle;
}
/* 删除图片 */
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
/* 标签 */
.chzn-container-multi .chzn-choices .search-field input{
    height:auto !important;
}
.icon-add {
	display: inline-block;
	width: 14px;
	height: 14px;
	background-image: url("${basePath}/pages/order/allorder/icon-add.png");
	background-repeat: no-repeat;
	background-position: 0
}
/* 标签样式 */
.layui-select-title {
	display: none
}
/* +图边框 */
div.select_box{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	line-height:50px;
	text-align:center;
	float: left;
    margin-left: 30px;
}
/* 上传图片css */
#addBannerContent .layui-form-item .module-goods-list .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
}
#addBannerContent .layui-form-item .module-goods-list li{
	position:relative;
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
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">视频编辑</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
				 <input type="hidden" value="" name="status" id="status" /><!-- 用于控制商品状态 -->
				 <input type="hidden" value="2" name="publish_origin" id="publish_origin" /><!-- 用于控制发布来源 -->
				 <input type="hidden" value="" name="time_length" id="time_length" />
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="title" name="title" type="text"  placeholder="请输入标题" lay-verify="video_title" autocomplete="off" class="layui-input" style="width: 300px;" maxlength="64">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 简介：</label>
							    <div class="layui-input-inline" > 
							       <textarea id="brief_introduce" name="brief_introduce" type="text"  placeholder="请输入简介" lay-verify="brief_introduce" autocomplete="off" class="layui-input" style="width: 300px;height: 200px" maxlength="250"></textarea>
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>虚拟播放量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_play_amount" name="unreal_play_amount" type="text"  placeholder="请输入播放量" lay-verify="unreal_play_amount" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>虚拟收藏量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_collect_amount" name="unreal_collect_amount" type="text"  placeholder="请输入收藏量" lay-verify="unreal_collect_amount" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>虚拟点赞量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_praise_amount" name="unreal_praise_amount" type="text"  placeholder="请输入点赞量" lay-verify="unreal_praise_amount" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
 						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 视频初始图片：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                    <button type="button" class="layui-btn" id="uploadImgUrl">
									  <i class="layui-icon">&#xe67c;</i>上传图片
									</button>
			                        <ul class="module-goods-list clearfix" name="img_urls" id="img_urls">
			                        </ul>
			                        <input type="hidden" id="video_img_url" lay-verify="video_img_url" name="video_img_url"/>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    		
				    			<label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 视频：</label>
			                    <div class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;">
				                    <button type="button" class="layui-btn" id="uploadAudioUrl">
									  <i class="layui-icon">&#xe67c;</i>上传视频
									</button>
			                        <div id="videoUrl" style="outline:none;">
                					</div>
                					<input type="hidden"  lay-verify="video_url" id="video_url" name="video_url"/>
			                    </div>
						    </div>
						 </div>
		 				  <div class="layui-form-item">
		 				  <label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 是否收费：</label>
						    <div class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;"> 
						      <input type="radio" lay-filter="is_pay" name="is_pay" id='is_pay'  class='is_pay' value="1" title="收费" >
						      <input type="radio" lay-filter="is_pay" name="is_pay" id='isnot_pay'  class='is_pay' value="0" title="免费" checked='checked'>
						    </div>
						  </div>
						   <div id='price' class="layui-form-item" style="margin-top: 10px;display: none">
						      											
								<label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 现在棒点：</label>
								
									<div class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;">
										<div class="input-prepend">
											<span class="add-on" style='height:30px;'>￥</span> 
											<input 
												type="text" maxlength="9" name="now_bon_point" id="now_bon_point" value="0"
												class="js-price input-small " style='height:27px;width: 79px;'>
										</div>
									</div>
									
								</div>
								<div id='price2'  class="layui-form-item" style="margin-top: 10px;display: none">		
								<label class="layui-form-label" style="width: 165px;">原始棒点：</label>
								<div class="controls">
									<div   class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;">
										<span class="add-on" style='height:30px;'>￥</span> 
										<input 
											type="text" maxlength="9" name="original_bon_point" id="original_bon_point" value="0"
											class="js-price input-small " style='height:27px;width: 79px;'>
									</div>
								</div>
						   </div>
						 <div class="layui-form-item"    style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em> 标签：</label>
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
							    			<img style="max-width: 100%;" class="commPic"/>
							    			<img src="delete.png" class="delete"></img>
							    		</div>	
							    		<div class="select_box">
							    			<a>+加图</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe" data-commid="" ></div>
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
							    	<div class="spe" data-commid=""></div>
							    </div>
						    </div>
						 </div>
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<button class="layui-btn" lay-submit lay-filter="formDemo"  id="commit1">保存</button>
						    	<button class="layui-btn" lay-submit lay-filter="formDemo"  id="commit2">立即提交</button>
     						 	<a class="layui-btn"  id="goBack">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>

 <div id="loading" style="display:none;padding-top: 20px;padding-right: 30px;position:fixed;top:50%;left:50%;width:100%;">
 <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 80px; color: #1E9FFF;position:relative;">&#xe63d;</i> 
 </div>
 
</body>
</html>