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
<title>管理</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.all.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/lang/zh-cn/zh-cn.js"></script>
	<link rel="stylesheet" href="${basePath}/ueditor/themes/iframe.css"></link>
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="checkVideo.js"></script>
<style type="text/css">
.chzn-container-multi .chzn-choices .search-field input{
   height:auto !important;
 }
div.p_img{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	float:left;
	position:relative;
	display:none;
}
/* 标签样式 */
.layui-select-title {
	display: none
}
/* 必选项样式  */
em.required {
	font-size: 16px;
	color: #f00;
	vertical-align: middle;
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
		<span style="font-size: 18px;">视频审核</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
				 <input type="hidden" value="" name="status" id="status" /><!-- 用于控制商品状态 -->
				 <input type="hidden" value="2" name="publish_origin" id="publish_origin" />
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"> 标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="title" name="title" type="text" disabled="disabled" placeholder="请输入标题" lay-verify="required" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"> 简介：</label>
							    <div class="layui-input-inline" > 
							       <textarea id="brief_introduce" name="brief_introduce" type="text" disabled="disabled" placeholder="请输入简介" lay-verify="required" autocomplete="off" class="layui-input" style="width: 300px;height: 200px"></textarea>
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟播放量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_play_amount" name="unreal_play_amount" disabled="disabled" type="text"  placeholder="请输入播放量" lay-verify="number" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟收藏量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_collect_amount" name="unreal_collect_amount" type="text"  disabled="disabled" placeholder="请输入收藏量" lay-verify="number" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟点赞量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_praise_amount" name="unreal_praise_amount" type="text" disabled="disabled" placeholder="请输入点赞量" lay-verify="number" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">视频封面图片：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
			                        <ul class="module-goods-list clearfix" name="img_urls" id="img_urls">
			                        </ul>
			                        <input type="hidden" id="video_img_url" lay-verify="video_img_url" name="video_img_url"/>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    		
				    			<label class="layui-form-label" style="width: 150px;"> 视频：</label>
			                    <div class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;">
			                        <div id="videoUrl" style="outline:none;">
                					</div>
                					<input type="hidden"  lay-verify="video_url" id="video_url" name="video_url"/>
			                    </div>
						    </div>
						 </div>
		 				  <div class="layui-form-item">
		 				  <label class="layui-form-label" style="width: 150px;"> 是否收费：</label>
						    <div id='payRadio' class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;"> 
						      <input type="radio" lay-filter="is_pay"   disabled name="is_pay" id='is_pay'  checked='checked' class='is_pay' value="1" title="收费" >
						      <input type="radio" lay-filter="is_pay"   disabled  name="is_pay" id='isnot_pay'  class='is_pay' value="0" title="免费">
						    </div>
						  </div>
						   <div id='price' class="layui-form-item" style="margin-top: 10px;">
						      											
								<label class="layui-form-label" style="width: 150px;"> 现在棒点：</label>
								
									<div class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;">
										<div class="input-prepend">
											<span class="add-on" style='height:30px;'>￥</span> 
											<input 
												type="text" maxlength="9" disabled="disabled" name="now_bon_point" id="now_bon_point" value="0"
												class="js-price input-small " style='height:27px;width: 79px;'>
										</div>
									</div>
									
								</div>
								<div id='price2'  class="layui-form-item" style="margin-top: 10px;">		
								<label class="layui-form-label" style="width: 150px;">原始棒点：</label>
								<div class="controls">
									<div   class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;">
										<span class="add-on" style='height:30px;'>￥</span> 
										<input 
											type="text" maxlength="9" disabled="disabled" name="original_bon_point" id="original_bon_point" value="0"
											class="js-price input-small " style='height:27px;width: 79px;'>
									</div>
								</div>
						   </div>
						 <div class="layui-form-item"    style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"> 标签：</label>
							    <div class="layui-input-inline" >
							    	<select name="label_id" id="label_id" disabled="disabled"  multiple="" style="width:400px">
									</select> 
							    </div>
						    </div>
						 </div>
						 
						 
					 	 <div class="layui-form-item shopOne" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img class="commPic"></img>	
							    		</div>	
							    		<div class="select_box">
							    			<a >+加图</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe" data-commid="" ></div>
							    </div>
						    </div>
						 </div>
						 		 
						 <div class="layui-form-item shopTwo" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms"  style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img class="commPic"></img>	
							    		</div>	
							    		<div class="select_box">
							    			<a >+加图</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe" data-commid=""></div>
							    </div>
						    </div>
					
					</div>
	 				  <div class="layui-form-item">
		 				  <label id='showSpan' class="layui-form-label" style="width: 150px;"> 是否通过：</label>
						    <div id='condition' class="controls" style="width: 100%;margin-left: 165px;margin-top: -4px;"> 
						     <input type="radio" id='allow'  name="reject"  lay-filter="reject"   checked='checked' class='reject' value="2" title="通过" >
						      <input type="radio" id='reject'  name="reject"   lay-filter="reject"  value="3" title="驳回">
						  
						    </div>
						    <div id='reson' class="layui-form-item">
						        <div  id="refuseReason"  class="layui-inline" style="display:none">
						      <label class="layui-form-label" style="width: 150px;"><em class="required">*</em> 驳回原因：</label>
						      <textarea id="textarea" rows="3" cols="75"></textarea>
						      </div>
						    </div>
				 			 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<button class="layui-btn" lay-submit lay-filter="formDemo"  id="commit">立即提交</button>
						        <a class="layui-btn"  id="goBack">返回</a>
						    </div>
					 	 </div>
					 	 </div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>