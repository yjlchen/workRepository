<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品品牌管理</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<style type="text/css">
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
	#addBrandContent .layui-form-item .module-goods-list .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
	}
	#addBrandContent .layui-form-item .module-goods-list li{
		position:relative;
	}
	#addBrandContent .layui-form-item .module-goods-list .close-modal{
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
</style>
</head>
<body>
<div style="padding-top: 20px;padding-right: 30px">
<form class="layui-form" method="post" id="brandForm1">
	<div id="addBrandContent">
  			<div class="layui-form-item" style="margin-top: 10px;">
	    		<div class="layui-inline">
				    <label class="layui-form-label" style="width: 150px;"><em class="required" style="color: red;">*</em>品牌名称：</label>
				    <div class="layui-input-inline">
				       <input id="brand_name" name="brand_name" type="text"  placeholder="请输入品牌名称" lay-verify="brand_name" autocomplete="off" class="layui-input" style="width: 500px;">
				    </div>
			    </div>
			 </div>
			 <div class="layui-form-item" style="margin-top: -15px;">
	    		<div class="layui-inline">
	    			<label class="layui-form-label" style="width: 150px;"><em class="required" style="color: red;">*</em>品牌图标：</label>
                    <div class="controls" style="width: 50px;height: 50px;border:1px solid #ddd;margin-left: 150px;margin-top: -4px;">
                        <ul class="module-goods-list clearfix" name="goods" id="pptb">
                            <li style="display:none;"> 
                            	<a class="goods-thumb"></a>
                            	<a class="close-modal js-delete-goods small" href="javascript:void(0);"  title="删除" onclick="delGrouponCommodity()">&times;</a> 
                            </li>
                            <li>
                            	<a href="javascript:void(0);" class="js-add-goods add-goods" onclick="addGrouponGoods()">
                            		<i class="icon-add" style="margin-top:17px;"></i>
                            	</a>
                            </li>
                        </ul>
                        <input type="hidden" id="brand_icon_url" name="brand_icon_url"/>
                    </div>
			    </div>
			 </div>
			  <div class="layui-form-item" style="margin-top: -15px;">
	    		<div class="layui-inline">
	    			<label class="layui-form-label" style="width: 150px;"><em class="required" style="color: red;">*</em>背景图片：</label>
                    <div class="controls" style="width: 50px;height: 50px;border:1px solid #ddd;margin-left: 150px;margin-top: -4px;">
                        <ul class="module-goods-list clearfix" name="goods" id="betu">
                            <li style="display:none;"> 
                            	<a class="goods-thumb"></a>
                            	<a class="close-modal js-delete-goods small" href="javascript:void(0);"  title="删除" onclick="delGrouponCommodity1()">&times;</a> 
                            </li>
                            <li>
                            	<a href="javascript:void(0);" class="js-add-goods add-goods" onclick="addGrouponGoods1()">
                            		<i class="icon-add" style="margin-top:17px;"></i>
                            	</a>
                            </li>
                        </ul>
                        <input type="hidden" id="brand_back_img" name="brand_back_img"/>
                    </div>
			    </div>
			 </div>
			 
			 <div class="layui-form-item" style="margin-top: -15px;">
	    		<div class="layui-inline">
				    <label class="layui-form-label" style="width: 150px;"><em class="required" style="color: red;">*</em>所属国家：</label>
				    <div class="layui-input-inline" >
				      	<select id="country_id" name="country_id" lay-filter="countryFilter" >
					        <option value="请选择国家"></option>
					     </select>
				    </div>
			    </div>
			    <div id="iconDiv" class="layui-inline" style="margin-left: -10px;margin-top: -10px">
				       <img id="icon" alt="" src="" style="width: 45px;height: 42px;">
				 </div>
			 </div>
			 
			  <div class="layui-form-item" style="margin-top: -15px;">
	    		<div class="layui-inline">
				    <label class="layui-form-label" style="width: 150px;">是否显示品牌：</label>
				    <div class="layui-input-inline">
				        <input type="radio" name="brand_show" value="1" title="是" checked>
	      				<input type="radio" name="brand_show" value="0" title="否">
				    </div>
			    </div>
			 </div>
			 
			 <div class="layui-form-item" style="margin-top: -15px;">
	    		<div class="layui-inline">
				    <label class="layui-form-label" style="width: 150px;"><em class="required" style="color: red;">*</em>品牌介绍：</label>
				    <div class="layui-input-inline">
				       <textarea id="brand_content" name="brand_content" placeholder="请输入品牌介绍" lay-verify="brand_content" class="layui-textarea" style="width: 500px;"></textarea>
				    </div>
			    </div>
			 </div>
		 	 
		 	  <div class="layui-inline" style="margin-left: 300px;">
			     <div class="layui-input-inline layui-input-btn">
			        <button id="confirmBtn" class="layui-btn layui-btn-normal" lay-submit lay-filter="confirmFilter">确定</button>
			        <a class="layui-btn" id="back">返回</a>
			     </div>
		 	 </div>
	</div>
</form>
</div>
</body>
<script type="text/javascript" src="addGoodsbrand.js"></script>
</html>


