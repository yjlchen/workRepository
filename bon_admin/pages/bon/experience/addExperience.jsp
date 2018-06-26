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
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="addExperience.js"></script>
<style type="text/css">
/* 必选项 样式 */
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
/* 删除图标样式 */
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
/* 突破的边框 */
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
		<span style="font-size: 18px;">心得编辑</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div id="addBannerContent">
			    		<!-- 发布来源 ，后台默认是0-->
			    	    <input type="hidden" id="publish_origin" name="publish_origin" value="2"/>				    	
 						<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>心得内容：</label>
							    <div class="layui-input-inline" > 
							       <textarea id="experience_content" name="experience_content" type="text"  placeholder="请输入简介" lay-verify="experience_content" autocomplete="off" class="layui-input" style="width: 500px;height:200px"></textarea>
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>星级评分：</label>
							    <input id="score_star" name="score_star" type="text"  placeholder="请输入1~5" lay-verify="score_star" autocomplete="off" class="layui-input" style="width: 100px;display:none">
							    <div class="layui-input-inline" style="margin-top: 5px"> 
							      <span id="star1" onclick="selectStar(1)" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star2" onclick="selectStar(2)" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star3" onclick="selectStar(3)" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star4" onclick="selectStar(4)" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star5" onclick="selectStar(5)" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							    </div>
						    </div>
						</div>
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>虚拟收藏：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_collect_amount" name="unreal_collect_amount" type="text"  placeholder="请输入整数" lay-verify="unreal_collect_amount" autocomplete="off" class="layui-input" style="width: 100px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>虚拟点赞：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_praise_amount" name="unreal_praise_amount" type="text"  placeholder="请输入整数" lay-verify="unreal_praise_amount" autocomplete="off" class="layui-input" style="width: 100px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: 10px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;"><em class="required">*</em>首页图片(1~8张)：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                    <button type="button" class="layui-btn" id="uploadImgUrl">
									  	上传图片
									</button>
			                        <ul class="module-goods-list clearfix" name="img_urls" id="img_urls">
			                        </ul>
			                        <input type="hidden" id="img_url" name="img_url" lay-verify="img_url"/>
			                    </div>
						    </div>
						 </div>
						 
					 	 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>选择商品：</label>
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
					 	 
					 	 <div class="layui-inline" style="margin-left: 50px;margin-top: 10px">
						    <div class="layui-input-inline layui-input-btn">
						    	<button class="layui-btn" lay-submit lay-filter="formDemo" id="commit">存草稿</button>
						    	<button class="layui-btn" lay-submit lay-filter="formDemoSend" id="commitSend">提交</button>
     						 	<a id="backPage" class="layui-btn" >返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>

<!-- 图片上传loading -->
 <div id="loading" style="display:none;padding-top: 20px;padding-right: 30px;position:fixed;top:50%;left:50%;width:100%;">
 	<i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 80px; color: #1E9FFF;position:relative;">&#xe63d;</i> 
 </div>
</body>
</html>