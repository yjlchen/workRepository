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
<title>音频总集查看</title>
<jsp:include page="../../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="totalAudioView.js"></script>
<style type="text/css">
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
	
/* 标签样式 */
span.label_item{
	height:30px;
	line-height:30px;
	border:1px solid #CCCCCC;
	text-align:center;
	padding:5px;
	margin:5px;
	margin-top:10px;
}
/* 是否收费、通过驳回样式  */
span.show_info{
	height:30px;
	line-height:30px;
	text-align:center;
	padding:5px;
	margin:5px;
	margin-top:10px;
}
	
</style>
</head>
<body>
<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	<span style="font-size: 18px;">音频总集查看</span>
</div>
<div class="inner-page-main layui-clear">
	<div class="inner-page-main-container">
		<div style="padding-top: 20px; padding-right: 20px">
			<form id="addOrUpdateForm" class="layui-form" action="">
		    	<div id="addBannerContent">
			    	<div class="layui-form-item" style="margin-top: 10px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">标题：</label>
						    <div class="layui-input-inline" > 
						       <input name="title" type="text" readonly class="layui-input" style="width: 300px;">
						    </div>
					    </div>
					 </div>
			    	<div class="layui-form-item" style="margin-top: 10px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">简介：</label>
						    <div class="layui-input-inline" > 
						       <textarea name="brief_introduce" placeholder="请输入简介" readonly style="width: 300px;height: 160px;"></textarea>
						    </div>
					    </div>
					 </div>
			    	<div class="layui-form-item" style="margin-top: 10px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">虚拟播放量：</label>
						    <div class="layui-input-inline" > 
						       <input name="unreal_play_amount" type="text" readonly class="layui-input" style="width: 300px;">
						    </div>
					    </div>
					 </div>
			    	<div class="layui-form-item" style="margin-top: 10px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">虚拟收藏量：</label>
						    <div class="layui-input-inline" > 
						       <input name="unreal_collect_amount" type="text" readonly class="layui-input" style="width: 300px;">
						    </div>
					    </div>
					 </div>
					 <div class="layui-form-item" style="margin-top: -15px;"> 
			    		<div class="layui-inline">
			    			<label class="layui-form-label" style="width: 150px;">封面图：</label>
		                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
		                        <ul class="module-goods-list clearfix">
			                        <li style="display:none;"> 
                         				<a class="goods-thumb"  href="javascript:;" ></a>
                         			</li>
		                        </ul>
		                        <input type="hidden" id="audio_img_url" name="audio_img_url"/>
		                    </div>
					    </div>
					 </div>
					 <div class="layui-form-item" style="margin-top: 20px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">标签：</label>
						    <div class="layui-input-inline" id="label_id" style="padding-top:9px;width:auto">
						    </div>
					    </div>
					 </div>
					 <div class="layui-form-item" style="margin-top: 10px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">是否收费：</label>
						    <div class="layui-input-inline" id="is_pay" style="padding-top:4px;">
						    </div>
					    </div>
					 </div> 
					 
					 <div class="layui-form-item" style="margin-top: 10px;display:none" id="original_bon_point">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">原始棒点：</label>
						    <div class="layui-input-inline" > 
						       <input type="text"  name="original_bon_point" readonly class="layui-input" style="width: 300px;">
						    </div>
					    </div>
					 </div>
					 
					 <div class="layui-form-item" style="margin-top: 10px;display:none" id="now_bon_point">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">现在棒点：</label>
						    <div class="layui-input-inline" > 
						       <input type="text"  name="now_bon_point" readonly class="layui-input" style="width: 300px;">
						    </div>
					    </div>
					 </div>
					 
					 <div class="layui-form-item" style="margin-top: 10px;">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">审核结果：</label>
						    <div class="layui-input-inline" id="check_result" style="padding-top:4px;">
						    </div>
					    </div>
					 </div> 
					 <div class="layui-form-item" style="margin-top: 10px;display:none" id="reject_reason">
			    		<div class="layui-inline">
						    <label class="layui-form-label" style="width: 165px;">驳回原因：</label>
						    <div class="layui-input-inline" > 
						       <textarea name="reject_reason" readonly style="width: 300px;height: 100px;"></textarea>
						    </div>
					    </div>
					 </div>
				 	 <div class="layui-inline" style="margin-left: 180px;">
					    <div class="layui-input-inline layui-input-btn">
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