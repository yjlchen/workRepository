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
<title>编辑banner</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="addOrUpdateBanner.js"></script>
<style type="text/css">
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
	.layui-anim-upbit{
		width: 300px;
	}
.shanpin {
	height: 50px;
	padding: 10px 10px 10px 34px;
}
.shanpin.layui-form {
    min-width: 800px;
}
.shanpin div.layui-unselect {
	display: initial;
}

#goods_list tbody tr td .shanpin div.layui-unselect i {
	margin-bottom: 27px;
}

#goods_list2 tbody tr td .shanpin div.layui-unselect i {
	margin-bottom: 27px;
	margin-left: -7px;
}

#goods_list2 tfoot tr td .shanpin div.layui-unselect i{
	margin-bottom: 4px;
	margin-left: -121px;
}

#goods_list tfoot tr td .shanpin div.layui-unselect i{
	margin-bottom: 4px;
	margin-left: -121px;
}

.shanpin input {
	display: inline-block;
	margin-right: 10px;
}

.shanpin img {
	margin: -30px 10px 0;
	width: 50px;
	height: 34px;
}

.shanpin div {
	/**width: 75%;**/
	height: 50px;
	display: inline-block;
}

.sorting_disabled div.layui-unselect i {
	margin: 0 10px 0 27px;
}

.dataTables_length div.layui-unselect {
	display: none;
}

#joinDiv div.layui-form-radio i{
   	margin-top: -2px;
}
span.tips{
	color:red;
	display:none;
}
.control-group>.reward-table-wrap {
    padding-left: 50px;
}
table.reward-table{
	width:100%;
}
table.reward-table tr{
	border:1px solid #ddd;
}
.page-reward .reward-table tr .pl100 {
    padding-left: 100px;
    text-align: left;
}
.reward-table tr th {
    line-height: 36px;
    background: #f2f2f2;
    text-align:center;
}
.reward-table tr td .first-reward {
    margin-top: 5px;
}
p.help-block.error-message{
	display:none;
	color:red;
}
label.checkbox.inline.reward-label {
    margin-left: 18px;
}
span.origin-status.show {
    float: right;
}
</style>

</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">首页banner管理</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container" style='height:666px'>
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="bannerForm1" class="layui-form" action="">
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">banner标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="bannertitle" name="title" type="text"  placeholder="请输入banner标题" lay-verify="title" autocomplete="off" class="layui-input" style="width: 300px;">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">banner图片：</label>
			                    <div class="controls" style="width: 50px;height: 50px;border:1px solid #ddd;margin-left: 165px;margin-top: -4px;">
			                        <ul class="module-goods-list clearfix" name="goods">
			                            <li style="display:none;"> 
			                            	<a class="goods-thumb"></a>
			                            	<a class="close-modal js-delete-goods small" style="cursor: pointer;" title="删除" onclick="delGrouponCommodity()">x</a> 
			                            </li>
			                            <li>
			                            	<a href="javascript:void(0);" class="js-add-goods add-goods" onclick="addGrouponGoods()">
			                            		<i class="icon-add" style="margin-top:17px;"></i>
			                            	</a>
			                            </li>
			                        </ul>
			                        <input type="hidden" id="banner_img_url" name="banner_img_url"/>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">链接类型：</label>
							    <div class="layui-input-inline" style="width: 300px;">
							      	<select id="link_type" name="link_type" lay-verify="link_type" lay-filter="typeFilter" >
								       <option value="">请选择链接类型</option>
								       <option value="1">商品详情</option>
								       <option value="2">资讯详情</option>
								       <option value="3">音频总集</option>
								       <option value="4">视频详情</option>
								    </select>
							    </div>
						    </div>
						 </div>
						 
						 <!-- 商品详情页url -->
						 <div id="detail1" class="layui-form-item" style="margin-top: -15px;display: none;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品详情链接：</label>
							    <div class="layui-input-inline" style="width: 300px;">
							      	<select id="banner_img_href" name="banner_img_href" lay-filter="hrefFilter2" lay-search>
							      		<option value="">请选择商品详情页链接</option>
								    </select>
							    </div>
						    </div>
						 </div>
						 <!-- 资讯详情页url -->
						 <div id="detail2" class="layui-form-item" style="margin-top: -15px;display: none;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">资讯详情链接：</label>
							    <div class="layui-input-inline" style="width: 300px;">
							      	<select id="banner_img_href_infor" name="banner_img_href_infor" lay-filter="hrefFilter2" lay-search>
							      		<option value="">请选择资讯详情链接</option>
								    </select>
							    </div>
						    </div>
						 </div>
						 <!-- 音频详情页url -->
						 <div id="detail3" class="layui-form-item" style="margin-top: -15px;display: none;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">音频总集链接：</label>
							    <div class="layui-input-inline" style="width: 300px;">
							      	<select id="banner_img_href_audio" name="banner_img_href_audio" lay-filter="hrefFilter2" lay-search>
							      		<option value="">请选择音频总集链接</option>
								    </select>
							    </div>
						    </div>
						 </div>
						 <!-- 视频详情页url -->
						 <div id="detail4" class="layui-form-item" style="margin-top: -15px;display: none;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">视频详情链接：</label>
							    <div class="layui-input-inline" style="width: 300px;">
							      	<select id="banner_img_href_video" name="banner_img_href_video" lay-filter="hrefFilter2" lay-search>
							      		<option value="">请选择视频详情链接</option>
								    </select>
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="margin-top: -15px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">是否是主推banner：</label>
							    <div class="layui-input-inline" id="select_featured">
							        <input type="radio" id="is_featured" name="is_featured" value="1" title="主推" checked>
				      				<input type="radio" id="is_featured" name="is_featured" value="0" title="非主推">
							    </div>
						    </div>
						 </div>
						 <div class="layui-form-item" style="margin-top: -15px;" id="mysort">
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;" id="banner_sort">
		          					<em  style="color:red;">*</em>排序：
		          			  	</label>
		          			  	<div class="layui-input-inline" id="select_featured">
		          			  	 <input type="number" min="1" id="number_sort" step="1" name="sort" style="width: 60px;margin-top: 8px">
				    			</div>
				    		</div>
				    	</div>
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						       <a id="confirmBtn" class="layui-btn layui-btn-normal">确定</a>
							   <a id="backButton" class="layui-btn layui-btn-normal"
								style="height: 35px; margin-top: -2px;">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>