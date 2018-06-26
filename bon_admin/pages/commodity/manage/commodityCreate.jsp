<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品编辑页面</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- ueditor编辑器所需js -->
<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.all.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/lang/zh-cn/zh-cn.js"></script>

<link rel="stylesheet" href="./c_files/jquery.ui.20151022.min.css" media="screen">
<link rel="stylesheet" href="./c_files/goods_edit_0496c085e7.css"  media="screen">
<link rel="stylesheet" href="./c_files/chosen.css"  media="screen">

<link rel="stylesheet" href="${basePath}/tools/layui-v2.1.5/css/layui.css" media="all">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/chosen.jquery.20150826.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/dashboard_v4_7f51edc001.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/feature_a2159d53c2.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/jquery-ui.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/pc_7364614c8d.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/yz.css" >
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">
<link rel="stylesheet" href="${basePath}/ueditor/themes/iframe.css"></link>

<style type="text/css">
		table.onetable {
			font-family: verdana, arial, sans-serif;
			font-size: 12px;
			color: #333333;
			border-width: 0px;
			border-color: #666666;
			border-collapse: collapse;
			margin-left: 30px;
		}
		
		table.onetable th {
			border-width: 0px;
			padding: 10px;
			border-style: solid;
			border-color: #666666;
			background-color: #ffffff;
		}
		
		table.twotable {
			font-family: verdana, arial, sans-serif;
			font-size: 12px;
			color: #333333;
			border-width: 0px;
			border-color: #666666;
			border-collapse: collapse;
			margin-left: 30px;
		}
		
		table.twotable th {
			border-width: 0px;
			padding: 30px;
			border-style: solid;
			border-color: #666666;
			background-color: #ffffff;
		}
		.input-prepend span.add-on{
			line-height:20px;
		}


	   /* 引入微页面需要的样式 */
        #root {
            margin: 10px;
            padding: 15px;
            background-color: #fff;
            height: auto;
            overflow: hidden;
        }

       #total a {
            color: #38f;
        }
        
       #total a:hover, a:focus {
            color: #07d;
            text-decoration: none;
        }

        #total form div input {
            display: inline-block;
            height: 20px;
            padding: 4px 6px;
            font-size: 12px;
            line-height: 20px;
            color: #555;
            vertical-align: middle;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            transition: border linear .2s,box-shadow linear .2s;
            background-color: #fff;
            border: 1px solid #ccc;

            margin-bottom: 0;

        }
        .controls ,#total input{
            display: inline-block;
        }
        
        #total label{
            display: inline-block;
        }
        
        #total .btn {
            padding: 4px 12px;
            margin-bottom: 0;
            font-size: 14px;
            color: #333;
            vertical-align: middle;
            cursor: pointer;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
        #total .btn:hover {
            border-color: rgba(82,168,236,.8);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
            transition: border linear .2s,box-shadow linear .2s;
        }
        #total .cuxiao{
        	width:100% !important;
        	display:block !important;
        	font-size:16px;
        	margin:1px !important;
        }
        #total .checkbox.inline+.checkbox.inline, #total .radio.inline+.radio.inline {
            margin-left: 10px;
        }
        #total .checkbox.inline, #total .radio.inline {
            display: inline-block;
            padding-top: 5px;
            margin-bottom: 0;
            vertical-align: middle;
        }
        #total .app-preview .sc-goods-list.list .goods-card .photo-block {
            float: left;
            margin-right: 13px;
            width: 125px;
            height: 125px
        } 
        
        
        #modality>div{ 
        	display: none; 
        }
        #modality>div:first-child{
         	display: block; 
        }
        
        /* 左右留边的样式 */
        .left-right-margin{
        	margin: 0 10px!important;	
        }
        .add-on{
        	height:20px !important;
        }
        #form_info .controls{
        	margin-left:15px !important;
        } 
        .ui-popover-inner{
        	width:350px;
        	background: #fff;
        	border-radius: 2px;
        	padding: 10px 20px;
			z-index: 2000;
			position: relative;
			left: 0;
			top: 38%;
			display:none;    
			box-shadow: 0px 1px 6px rgba(0,0,0,0.2);
        }
        .js-save1{
        	color: #fff;
		    background: #07d;
	        border: 1px solid #ddd;
		    border-color: #006cc9;
		    display: inline-block;
		    border-radius: 2px;
		    height: 26px;
		    line-height: 26px;
		    padding: 0 12px;
		    cursor: pointer;
		    text-align: center;
		    -webkit-box-sizing: content-box;
		    -moz-box-sizing: content-box;
		    box-sizing: content-box;
        }
        .js-cancel1{
        	display: inline-block;
		    border-radius: 2px;
		    height: 26px;
		    line-height: 26px;
		    padding: 0 12px;
		    cursor: pointer;
		    color: #333;
		    background: #f8f8f8;
		    border: 1px solid #ddd;
		    text-align: center;
		    -webkit-box-sizing: content-box;
		    -moz-box-sizing: content-box;
		    box-sizing: content-box;
        }
        .notifications {
		    position: fixed;
		    z-index: 10000;
		    top: 35px;
		    left: 50%;
		    margin-left: -225px;
		}
		.bord{
			border:3px solid red;
		}
		#modality .dropdown-menu a{
			color:#333;
		}
		#modality .dropdown-menu a:hover{
			color:#fff;
		}
		.inner-page-main.layui-clear {
    	margin-top: 0;
		}
		.layui-tab-title li {
			padding:0;
		}
		.inner-page-main {
    		border: 1px solid #e5e5e5;
    		background-color: #F2F2F2;
    		height: auto;
    		overflow: hidden;
		}
		.inner-page-main-container {
    		margin: 10px;
    		background-color: #fff;
    		height: auto;
    		overflow: hidden;
		}
		.layui-tab{
			margin:0;
		}
		.inner-page-top {
    		width: auto;
    		padding: 17px 21px;
		}
		#splice .close-modal{
		position: absolute;
    	top: 123px;
    	right: -50px;
    	width: 50px;
    	height: 18px;
    	font-size: 14px;
    	line-height: 18px;
    	border-radius: 9px;
    	background: rgba(153, 153, 153, 0.6);
    	text-align: center;
    	color:#fff;
	}
	#img_urls .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
	}
</style>

</head>
<body>
	<div class="inner-page-top layui-clear">
		<a href="#" id="to_commodity">商品信息管理</a> /发布商品
	</div>
	<div class="inner-page-main layui-clear">
	<div>
		<div class="inner-page-main-container">
			<div class="layui-tab layui-tab-card " lay-filter="commodityTab">
				<ul class="layui-tab-title" style="margin-left:0;">
					<!-- <li class="layui-this" lay-id="0" style="width: 34%"><div
							align="center">
							<b>1.选择商品品类</b>
						</div></li>  -->
					<li lay-id="0" class="layui-this" align="center" style="width: 50%"><b>1.编辑基本信息</b></li>
					<li lay-id="1" style="width: 50%"><b>2.编辑商品详情</b></li>
				</ul>
				<div class="layui-tab-content">
				<!-- 	<div class="layui-tab-item layui-show">
						<div align="center" class="select_one">
							<table class='onetable'>
								<tr>
									<th><button style="width: 200px" id="category1"
											onclick="tosel(1)" value="女人"
											class="layui-btn layui-btn-big layui-btn-primary">女人</button></th>
									<th><button style="width: 200px" id="category2"
											onclick="tosel(2)" value="男人"
											class="layui-btn layui-btn-big layui-btn-primary">男人</button></th>
									<th><button style="width: 200px" id="category3"
											onclick="tosel(3)" value="食品"
											class="layui-btn layui-btn-big layui-btn-primary">食品</button></th>
									<th><button style="width: 200px" id="category4"
											onclick="tosel(4)" value="美妆"
											class="layui-btn layui-btn-big layui-btn-primary">美妆</button></th>
								</tr>
								<tr>
									<th><button style="width: 200px" id="category5"
											onclick="tosel(5)" value="亲子"
											class="layui-btn layui-btn-big layui-btn-primary">亲子</button></th>
									<th><button style="width: 200px" id="category6"
											onclick="tosel(6)" value="居家"
											class="layui-btn layui-btn-big layui-btn-primary">居家</button></th>
									<th><button style="width: 200px" id="category7"
											onclick="tosel(7)" value="数码家电"
											class="layui-btn layui-btn-big layui-btn-primary">数码家电</button></th>
									<th><button style="width: 200px" id="category8"
											onclick="tosel(8)" value="其他"
											class="layui-btn layui-btn-big layui-btn-primary">其他</button></th>
								</tr>
							</table>
							<br> <br> <br> <br>
							<button style="width: 1000px" id="to_next" onclick="to_next()"
								class="layui-btn layui-btn-big  layui-btn-normal">下一步</button>
						</div>

					</div> -->
					<div class="layui-tab-item layui-show">
					  <form name="form_info" id="form_info">
						<div class="form-horizontal fm-goods-info" novalidate="true">
							<div id="base-info-region" class="goods-info-group">
								<div class="goods-info-group-inner">
									<div class="info-group-title vbox">
										<div class="group-inner">基本信息</div>
									</div>
									<div class="info-group-cont vbox">
										<div class="group-inner">
											<div class="layui-form-item">
												<label class="layui-form-label" style="width: 100px;padding-left:0;"><em class="required">*</em>商品分组：</label>
												<div class="layui-input-block">
													<select name="group_id" id="group_id" >
													
													</select>
												</div>
											</div>  
											<div class="layui-form-item">
												<label class="layui-form-label" style="width: 100px;padding-left:0;"><em class="required">*</em>商品标签：</label>
												<div class="layui-input-block">
													<select name="label_id" id="label_id"  multiple="">
													</select>
												</div>
											</div>
											<div class="control-group">
												<label class="control-label"><em class="required">*</em>所属国家：</label>
												<div class="controls">
                                                    <select name="country_id" id="country_id">
                                                    
                                                    </select>
                                                   
												</div>
											</div>
											<div class="control-group">
												<label class="control-label"><em class="required">*</em>商品品牌：</label>
												<div class="controls">
 													<select name="brand_id" id="brand_id"  >
 													  <option value=''></option>
 													</select>
 													 
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- 20180518 每个商品有且仅有一种规格 -->
							<!-- <div id="sku-info-region" class="goods-info-group">
								<div class="goods-info-group-inner">
									<div class="info-group-title vbox">
										<div class="group-inner">库存/规格</div>
									</div>
									<div class="info-group-cont vbox">
										<div class="group-inner">
											
											<div class="js-goods-sku control-group">
												<label class="js-goods-sku-control-label control-label">商品规格：</label>
												<div id="sku-region" style="width:90%" class="controls">
													<div class="sku-group">
														<div class="js-sku-list-container">

														</div>

														<div class="js-sku-group-opts sku-sub-group" id="toAddGG"
															style="display: block;">
															<h3 class="sku-group-title">
																<button type="button" class="js-add-sku-group btn"
																	id="add_specifications">添加规格项目</button>
															</h3>
														</div>
													</div>
												</div>
												<p class="help-desc hotel-sku-help"
													style="margin-left: 116px; display: none;">酒店类商品暂只支持1种规格项
												</p>
											</div>

											<div class="js-goods-stock control-group"
												style="display: none" id="s_store">
												<label class="js-goods-stock-control-label control-label">商品库存：</label>
												<div id="stock-region" class="controls sku-stock" style="width:88%">
													<table class="table-sku-stock">
														<thead>
															<tr>
																<th class="th-price"><em class="required">*</em>价格（元）</th>
																<th class="th-stock"><em class="required">*</em>库存</th>
																<th class="th-code">商家编码</th>
																<th class="text-cost-price"><em class="required">*</em>成本价</th>
																<th class="text-right"><em class="required">*</em>销量</th>
															</tr>
														</thead>
														<tbody id="s_table_tbody">
														</tbody>
														<tfoot>
															<tr>
																<td colspan="6">
																
																	<div class="batch-opts">
																		批量设置： 
																		<span class="js-batch-type"> 
																			<a class="js-batch-price" href="javascript:;">价格</a>
																			&nbsp;&nbsp; 
																			<a class="js-batch-stock" href="javascript:;">库存</a>
																		</span> 
																		<span class="js-batch-form" style="display: none;">
																			<input type="text" class="js-batch-txt input-mini" placeholder=""> 
																			<a class="js-batch-save" href="javascript:;">保存</a> 
																			<a class="js-batch-cancel" href="javascript:;">取消</a>
																			<p class="help-desc"></p>
																		</span>
																	</div>
																</td>
															</tr>
														</tfoot>
													</table>
												</div>
											</div>

											<div class="control-group" id="gross_inventory">
												<label class="control-label"><em class="required">*</em>总库存：</label>
												<div class="controls">
													<input type="text" maxlength="9" id="store_count" style='height:20px;'
														class="js-global-stock input-small" name="store_count"
														value="0" > 
													<label class="checkbox inline"> 
														<input type="checkbox" name="display_stock_flag"  id="hide_stock" value="0">页面不显示商品库存
													</label>

													<p class="help-desc help-desc-0">总库存为 0时，会上架到『已售罄的商品』列表里</p>
													<p class="help-desc help-desc-1">发布后商品同步更新，以库存数字为准</p>
													<p class="help-block error-message" style="display:none;color:#b94a48">总库存必须是数字。</p>
												</div>
											</div>
					 						<div class="control-group">
												<label class="control-label">商家编码：</label>
												<div class="controls">
													<input type="text" class="js-global-code input-small"  maxlength="30" style='height:20px;'
														name="merchant_code" id="merchant_code" value=""> <a
														style="display: none;" href="javascript:;"
														class="js-help-notes circle-help">?</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> -->
							<!-- end 20180518 每个商品有且仅有一种规格 -->
							
							<div id="goods-info-region" class="goods-info-group">
								<div class="goods-info-group-inner">
									<div class="info-group-title vbox">
										<div class="group-inner">商品信息</div>
									</div>
									<div class="info-group-cont vbox">
										<div class="group-inner">
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品名：
												</label>
												<div class="controls">
													<input type="text" name="commodity_name" id="commodity_name" value=""
														class="input-xxlarge " style='height:20px;'>
												</div>
											</div>
											<!-- 20180518 商品规格 -->
					<!-- 						<div class="layui-form-item">
												<label class="layui-form-label" style="width: 100px;padding-left:0;"><em class="required">*</em>商品规格：</label>
												<div class="layui-input-block">
													<select name="specification_value_id" id="specification_value_id" >
													
													</select>
												</div>
											</div> -->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品规格：</label>
												<div class="controls">
													<input type="text" maxlength="100" id="specification_value_name" style='height:20px;'
														class="js-global-stock input-small" name="specification_value_name" value="" > 
												</div>
											</div>  
											<!-- 价格 -->
											<div class="control-group">
												<label class="control-label"><em class="required">*</em>价格：</label>
												<div class="controls">
													<div class="input-prepend">
														<span class="add-on" style='height:30px;'>￥</span> 
														<input type="text" maxlength="9" name="price" id="price" value="0.00"
															class="js-price input-small " style='height:20px;'>
													</div>
												</div>
											</div>
											<!-- 原始价格 -->
											<div class="control-group">
												<label class="control-label">原始价格：</label>
												<div class="controls">
													<div class="input-prepend">
														<span class="add-on" style='height:30px;'>￥</span> 
														<input type="text" maxlength="9" name="original_price" id="original_price" value="0.00"
															class="js-price input-small " style='height:20px;'>
													</div>
												</div>
											</div>
											<!-- 虚拟销量与总销量 -->
											 <div class="control-group">
												<label class="control-label"><em></em>实际销量：</label>
												<div class="controls">
													<div class="input-prepend">
														<input type="text" maxlength="9"  id="total_sales" value=""
															class="js-price input-small " style='height:20px;' disabled>
													</div>
													&nbsp;&nbsp;虚拟销量：
													<input type="number"  name="unreal_total_sales" id="unreal_total_sales" 
														value="0" class="input-small " style='height:20px;'>
												</div>
											</div> 

											<div class="control-group">
												<label class="control-label"><em class="required">*</em>商品图：</label>
												<div class="controls">
													<input type="hidden" name="picture">
													<div class="picture-list ui-sortable">
														<ul class="js-picture-list app-image-list clearfix" style="margin-left:0;position: relative;"
															id="img_ul">
															<li><a href="javascript:;" onclick="addShopPho()"
																class="add-goods js-add-picture">+加图</a></li>
														</ul>
													</div>
													<p class="help-desc">建议尺寸：640 x 640 像素；你可以拖拽图片调整图片顺序。</p>
												</div>
											</div>
											<div class="control-group">
												<label class="control-label"><em class="required">*</em>商品属性图：</label>
												<div class="controls">
													<input type="hidden" name="pic_pro_ture">
													<div class="picture-list ui-sortable">
														<ul class="js-picture-list app-image-list clearfix" style="margin-left:0;position: relative;"
															id="img_pro_ul">
															<li><a href="javascript:;" onclick="addShopProPho()"
																class="add-goods js-add-picture">+加图</a></li>
														</ul>
													</div>
													<p class="help-desc">建议尺寸：640 x 640 像素；你可以拖拽图片调整图片顺序(用于商品详情页展示中)。</p>
												</div>
											</div>
											<!-- 商品条形码 -->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品条形码：
												</label>
												<div class="controls">
													<input type="text" maxlength="200" id="goods_barcode" style='height:20px;'
														class="js-global-stock input-small" name="goods_barcode" value="0" > 
												</div>
											</div>
											<!-- 商品计量单位 -->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品计量单位：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="goods_size" style='height:20px;'
														class="js-global-stock input-small" name="goods_size" value="0" > 
												</div>
											</div>
											<!-- 单价商品重量-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>单价商品重量：
												</label>
												<div class="controls">
													<input type="text" id="goods_gweight" style='height:20px;'
														class="js-global-stock input-small" name="goods_gweight" value="0" >&nbsp;kg 
												</div>
											</div>
											<!-- 单价商品毛重-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>单价商品毛重：
												</label>
												<div class="controls">
													<input type="text" id="goods_pkg_gweight" style='height:20px;'
														class="js-global-stock input-small" name="goods_pkg_gweight" value="0" >&nbsp;kg 
												</div>
											</div>
											<!-- 原产国代码-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>原产国代码：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="ycg_code" style='height:20px;'
														class="js-global-stock input-small" name="ycg_code" value="0" > 
												</div>
											</div>
											<!-- 商品HS编码-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品HS编码：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="hs_code" style='height:20px;'
														class="js-global-stock input-small" name="hs_code" value="0" > 
												</div>
											</div>
											<!-- 商品货号-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品货号：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="freight_number" style='height:20px;'
														class="js-global-stock input-small" name="freight_number" value="0" > 
												</div>
											</div>
											<!-- 成分-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>成分：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="component" style='height:20px;'
														class="js-global-stock input-small" name="component" value="0" > 
												</div>
											</div>
											<!-- 用途-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>用途：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="purpose" style='height:20px;'
														class="js-global-stock input-small" name="purpose" value="0" > 
												</div>
											</div>
											<!-- 保质期-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>保质期：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="quality_guarantee_period" style='height:20px;'
														class="js-global-stock input-small" name="quality_guarantee_period" value="0" > 
												</div>
											</div>
											<!-- 商品生产厂家-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>商品生产厂家：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="manufactor" style='height:20px;'
														class="js-global-stock input-small" name="manufactor" value="0" > 
												</div>
											</div>
											<!-- 供应商代码-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>供应商代码：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="supplier_code" style='height:20px;'
														class="js-global-stock input-small" name="supplier_code" value="0" > 
												</div>
											</div>
											<!-- 行邮税号-->
											<div class="control-group">
												<label class="control-label"> <em class="required">*</em>行邮税号：
												</label>
												<div class="controls">
													<input type="text" maxlength="100" id="postal_tax_number" style='height:20px;'
														class="js-global-stock input-small" name="postal_tax_number" value="0" > 
												</div>
											</div>
											<!-- 是否免关税 -->
											<div class="control-group">
												<label class="layui-form-label" style="width: 100px;padding-left:0;"><em class="required">*</em>是否免关税：</label>
												<div class="layui-input-block">
													<select name="is_dutyfree" id="is_dutyfree">
														<option value='0' selected="selected">否</option>
														<option value='1'>是</option>
													</select>
												</div>
											</div>
											<!-- 商品视频-->
											<div class="control-group">
												<label class="control-label">商品视频：
												</label>
												<div class="controls">
												    <input type="hidden" name="details_video" id="details_video"/>
													<button type="button" class="layui-btn" id="upload_details_video"><i class="layui-icon"></i>上传视频</button>
												    <div id="videoUrl" style="outline:none;"></div>
												</div>
											</div>
											<!-- 商品视频封面图片-->
											<!-- <div class="control-group">
												<label class="control-label"> 视频封面：
												</label>
												<div class="controls">
												    <input type="hidden" name="details_video_img" id="details_video_img"/>
													<button type="button" class="layui-btn" id="upload_details_video_img"><i class="layui-icon"></i>上传封面</button> 
												    <ul class="module-goods-list clearfix" name="img_urls" id="img_urls"></ul>
												</div>
											</div> -->
										</div>
									</div>
								</div>
							</div>
							<div id="other-info-region" class="goods-info-group">
								<div class="goods-info-group-inner">
								<!-- 	<div class="info-group-title vbox">
										<div class="group-inner">物流/其他</div>
									</div> -->
									<div class="info-group-cont vbox">
										<div class="group-inner">
											<!-- <div class="js-delivery-group" style="display: block;">
												<div class="control-group">
													<label class="control-label"><em class="required">*</em>运费设置：</label>
													<div class="controls">
													<label class="radio"> <input
														id="js-unified-postage" type="radio" name="delivery"
														value="0" checked="">统一邮费
														<div class="input-prepend">
															<span class="add-on" style='height:30px;'>￥</span> 
															<input type="text" maxlength="4" name="postage" id="postage" 
																value="0.00" class="input-small js-postage" style='height:20px;'>
														</div>
													</label>
													</div>
												</div>
											</div> -->
											<!-- <div class="control-group">
												<label class="control-label">每人限购：</label>
												<div class="controls ">
													<input type="text" name="limit_buy" id="limit_buy" value="0" type="text" maxlength="5"
														class="input-small js-quota" style='height:20px;'>

													<p class="help-desc quota-help-desc">0 代表不限购</p>

												</div>
											</div> -->
											<!-- <div class="control-group">
												<label class="control-label">返现比例：</label>
												<div class="controls ">
													<input type="text" name="recurrence_ratio" id="recurrence_ratio" value="0" type="text" maxlength="3"
														class="input-small js-quota" style='height:20px;'>

													<p class="help-desc quota-help-desc">商品被分享且被购买并确认收货时给分享人返现比例：0-1之间数值</p>

												</div>
											</div> -->
			 							<!--	<div class="control-group">
												<label class="control-label">要求留言：</label>
												<div class="controls">
													<input type="hidden" name="messages">
													<div id="messages-region">
														<div>
															<div class="js-message-container message-container"
																id="leave_message"></div>
															<div class="message-add">
																<a href="javascript:;" onclick="add_message()"
																	class="js-add-message control-action">+ 添加字段</a>
															</div>
															<p class="help-desc">单件商品最多可设置10条留言</p>
														</div>
													</div>
												</div>
											</div>
 
											<div class="control-group">
												<label class="control-label">开售时间：</label>
												<div class="controls ">
													<label class="radio"> <input type="radio"
														name="sell_type" value="1" checked="">立即开售
													</label> <label class="radio mat5" for="sell_type"> <input
														type="radio"  name="sell_type" value="2">定时开售
														<input id="sell_time" name="sell_time" style='height:20px;'
														onclick="layui.laydate({elem: this, istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"
														class="input-medium js-sold-time v-hide hasDatepicker"
														type="text" value="" readonly="">
													</label>
												</div>
											</div>-->

										</div>
									</div>
								</div>
							</div>
							
							<div class="app-actions" style=";padding: 10px 0;background:#ffc;margin:0">
								<div class="form-actions text-center" style="margin:0;">
									<input style="padding:5px;border-radius:3px;color: #fff;background: #38f;border: 0;" 
										type="button" onclick="to_next2()" value="下一步"/>
								</div>
							</div>
						</div>
						</form>
					</div>
					<div class="layui-tab-item" id="goodDetail">
						<div class="app layui-clear" id="total" style="float:none">
					    <!-- 编辑商品详情 -->
					    <%
					    	String commodity_id = request.getParameter("id");
					    	//新增时的情况，如果是修改，直接读取数据库中的html
					    	if(null == commodity_id || ""== commodity_id){
					    %>
						    <div class="inner-page-main-container app-inner" id="root">
						        <div class="app-init-container">
						            <div class="app__content js-app-main"><div class="app-design clearfix">
						                <div class="app-preview">
						                    <div class="app-entry" id="module">
						                        <div class="app-config js-config-region module_div">
						                            <div class="app-field clearfix editing">
						                                <h1 style="margin-top:0;"><span id="page-title"></span></h1>
						                                <span id="page-description" style="display:none;"></span>
						                            </div>
						                            
						                            <div class="js-config-region">
														<div class="app-field clearfix editing">
															<div class="control-group">
																<div class="goods-details-block" style="background: #fff;" id="goodDetailDiv">
																	<h4>商品详情区</h4>
																	<p>点击进行编辑</p>
																</div>
															</div>
															<div class="actions">
																<div class="actions-wrap">
																	<span class="action edit">编辑</span>
																</div>
															</div>
														</div>
													</div>
						                        </div>
						                    </div>
						                    <%--
						                    <div class="js-add-region" id="module_class">
						                        <div>
						                          <div class="app-add-field">
					                                <h4>添加内容</h4>
					                                <ul>
					                                    <!-- <li><a class="js-new-field" data-field-type="rich_text">富文本</a></li> -->
					                                    <li><a class="js-new-field" data-field-type="goods">商品</a></li>
					                                    <li><a class="js-new-field" data-field-type="goods_list">商品<br>列表</a></li>
					                                    <li><a class="js-new-field" data-field-type="image_ad">图片<br>广告</a></li>
					                                    <li><a class="js-new-field" data-field-type="cube2">魔方</a></li>
					                                    <li><a class="js-new-field" data-field-type="title">标题</a></li>
					                                    <li><a class="js-new-field" data-field-type="text_nav">文本<br>导航</a></li>
					                                    <li><a class="js-new-field" data-field-type="nav">图片<br>导航</a></li>
					                                    <!-- <li><a class="js-new-field" data-field-type="link">关联<br>链接</a></li> -->
					                                    <li><a class="js-new-field" data-field-type="search">商品<br>搜索</a></li>
					                                    <li><a class="js-new-field" data-field-type="showcase">橱窗</a></li>
					                                    <!-- <li><a class="js-new-field" data-field-type="line">辅助线</a></li> -->
					                                    <!-- <li><a class="js-new-field" data-field-type="white">辅助<br>空白</a></li> -->
					                                    <!-- <li><a class="js-new-field" data-field-type="component">自定义<br>模块</a></li> -->
					                                    <li><a class="js-new-field" data-field-type="store">进入<br>店铺</a></li>
					                                    <!-- <li><a class="js-new-field" data-field-type="tag_list">商品<br>分组</a></li> -->
					                                    <!-- <li><a class="js-new-field" data-field-type="audio">语音</a></li> -->
					                                    <li><a class="js-new-field" data-field-type="notice">公告</a></li>
					                                    <!-- <li><a class="js-new-field" data-field-type="coupon">优惠券</a></li> -->
					                                    <!-- <li><a class="js-new-field" data-field-type="ump_activity">营销活动</a></li> -->
					                                </ul>
						                          </div>
						                        </div>
						                    </div> --%>
						                </div>
						                <div id="modality">
						                <div class="app-sidebar keep" style="margin-top: 0px;">
						                    <div class="arrow"></div>
						                    <div class="app-sidebar-inner js-sidebar-region">
						                        <div>
						                        <script id="goodDetailEditor" type="text/plain"></script>
						                        </div>
						                     </div>
						                	</div>
						                </div>
						                <div class="app-actions" style="bottom: 0;">
						                    <div class="form-actions text-center">
						                     <%-- <button class="zent-btn zent-btn-primary js-btn-add" onclick="info_next(0)" id="js-btn-add">
						                     		上 架</button> --%>
						                     <%--<button class="zent-btn js-btn-save"  onclick="info_next(2)" id="js-btn-save">下架</button> --%>
						                      <%--   
						                      <button class="zent-btn js-btn-preview" onclick="info_next(1)" id="js-btn-preview">预览</button> --%>
						                         <button class="zent-btn js-btn-save"  onclick="upload_info()" id="">保存</button>
						                    </div>
						                </div>
						              </div>
						            </div>
						        </div>
						    </div>
						    <!-- 实例化该页面的编辑器 -->
							<script type="text/javascript">
								var ue = UE.getEditor("goodDetailEditor",{
									elementPathEnabled : false,//是否启用元素路径，默认是true显示
									wordCount:false//是否开启字数统计
								});
								/* 没用到
								//自定义文件上传目录
								UE.Editor.prototype._bkGetActionUrl=UE.Editor.prototype.getActionUrl;
						        UE.Editor.prototype.getActionUrl=function(action){
						            if (action == 'uploadimage'){
						                // 这里填上你自己的上传图片的action 
						                return getRootPath()+"/document/ueditorUploadImg.action";
						            }else{
						                return this._bkGetActionUrl.call(this, action);
						            }
						        } */
							</script>
						<%
					    	}
					    %>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>

	<!-- 
	<div class="js-notifications notifications">
		<div class="alert in fade alert-error" style="opacity: 0;;background-color:#ff4343;color:#fff;">
		已经添加了相同的规格值。
		</div>
	</div> -->
	
<!-- 所需基础js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/tools/layui-v2.1.5/layui.js"></script>
<script type="text/javascript" src="${basePath}/commons/js/jquery.formHelp.js"></script>
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<!-- 编辑商品的js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/commodityCreate.js"></script>

<!-- 各模块公用的js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/total.js" ></script>
<!-- 日历控件引入的js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-ui-timepicker-addon.min.js" ></script>

<!-- 引入各个模块的js-->
<%-- 
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/goods.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/title.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/text_nav.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/nav.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/store.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/goods_list.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/notice.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/showcase.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/image_ad.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/cube2.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/search.js" ></script>
 --%>
<script>
$("body").on("click",function(){
	$("div.popover-inner").hide();
	var chi=$(modality).children();
	for(var i=0;i<chi.length;i++){
		var sty=$(chi[i]).css("display");
		if(sty=="block"){
			var top=parseInt($(chi[i]).css("top"));
			var height=$(chi[i]).height();
		}
	}
	var mCheight=$("#module_class").height();
    var rheight=$("#module").height();
    var zheight=rheight+mCheight;
    height=height+top;
    if(height>800||zheight>800){
        if(height>zheight){
        	$("#total").css("height",height+125+"px");
        	$("#root").css("height",height+35+"px");
        }else{
        	$("#total").css("height",zheight+125+"px");
        	$("#root").css("height",zheight+35+"px");
        }
    }
});
window.onload = function(){
	$("span.layui-unselect").remove();
}
</script>
</body>
</html>