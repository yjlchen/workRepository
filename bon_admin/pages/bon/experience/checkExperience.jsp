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
<link rel="stylesheet" href="${basePath}/ueditor/themes/iframe.css"></link>
<script type="text/javascript" src="checkExperience.js"></script>
<style type="text/css">
/* 必选项 样式 */
em.required {
	    font-size: 16px;
	    color: #f00;
	    vertical-align: middle;
}
/* 图片的css样式 */
.goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
}
/* 商品图片的样式 */
div.p_img{
	width:50px;
	height:50px;
	border:1px solid #DDDDDD;
	float:left;
	position:relative;
	display:none;
}
	
</style>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">心得审核</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div id="addBannerContent">
			    		
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">心得内容：</label>
							    <div class="layui-input-inline" > 
							       <textarea id="experience_content" name="experience_content" type="text"  placeholder="请输入简介" lay-verify="experience_content" autocomplete="off" class="layui-input" readonly="readonly" style="width:600px;height:120px; border:none;outline:medium;margin-top: 5px"></textarea>
							    </div>
						    </div>
						 </div>
						<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">星级评分：</label>
							     <input id="score_star" name="score_star" type="text"  readonly="readonly" placeholder="请输入1~5" autocomplete="off" class="layui-input" style=" border:none;outline:medium;width: 100px;display:none">
							    <div class="layui-input-inline" style="margin-top: 5px"> 
							      <span id="star1" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star2" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star3" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star4" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							      <span id="star5" style="margin-right: 5px; display: inline-block; background: rgba(0, 0, 0, 0) url(&quot;star_unsele.png&quot;) repeat scroll 0% 0% / 16px 16px; width: 16px; height: 16px; position: relative;"></span>
							    </div>
						    </div>
						</div>
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟收藏：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_collect_amount" name="unreal_collect_amount" type="text" readonly="readonly"  placeholder="请输入整数" autocomplete="off" class="layui-input" style="border:none;outline:medium;width: 100px;">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟点赞：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_praise_amount" name="unreal_praise_amount" type="text"  placeholder="请输入整数" autocomplete="off"  readonly="readonly" class="layui-input" style="border:none;outline:medium;width: 100px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: 10px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">首页图片：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
			                        <ul class="module-goods-list clearfix" name="img_urls" id="img_urls">
			                        </ul>
			                        <input type="hidden" id="img_url" name="img_url"/>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品名称：</label>
							    <div class="layui-input-inline" > 
							       <input id="commodity_name" name="commodity_name" type="text" readonly="readonly"  placeholder="请输入整数"  autocomplete="off" class="layui-input" style="border:none;outline:medium;width: 800px;">
							    </div>
						    </div>
						 </div>
					 	  <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品信息：</label>
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
							    </div>
						    </div>
						 </div>
						 
						<div id="is_reject" class="layui-form-item" style="margin-top: 10px;display:none">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">通过：</label>
							    <div class="layui-input-inline" id="is_pay">
						             <input type="radio"  name="is_pay"  value="1" title="通过" checked="checked">
				      				 <input type="radio"  name="is_pay"  value="0" title="驳回" >
							    </div>
						    </div>
					 	</div>
						 <div class="layui-form-item" style="margin-top: 10px;display:none" id="original_bon_point">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>驳回意见：</label>
							    <div class="layui-input-inline" > 
							       <textarea type="text"  name="reject_reason" id="reject_reason"
								       autocomplete="off" class="layui-input" style="width: 500px;height: 60px"></textarea>
							    </div>
						    </div>
						 </div>
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<button style="display:none" class="layui-btn" lay-submit lay-filter="formDemo" id="commit">提交</button>
     						 	<a id="backPage" class="layui-btn" >取消</a>
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