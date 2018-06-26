<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>折扣编辑页面</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">
<link rel="stylesheet" href="${basePath}/pages/order/allorder/pc.css">
<link rel="stylesheet" href="${basePath}/pages/marketing/groupon/groupon.css">
<!-- 日历控件样式 -->
<link rel="stylesheet" href="${basePath}/pages/marketing/coupon/jquery-ui.min.css">
<link rel="stylesheet" href="discountEdit.css">	
<style>
	.js-app-main {
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
	.page-groupon{
		border: 1px solid #e2e2e2;
    	border-radius: 2px;
    	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
	} 
	h3.reward-sub-title{
		padding: 10px 30px;
	    font-size: 14px;
	    margin: 20px auto 0;
	    font-weight: bold;
	}
	p.img-pre{
		text-align:center;
	}
	.image-hover{
		display: none;
	    width: 318px;
	    height: 150px;
	    padding: 10px;
	    background: #fff;
	    border: 1px solid #ddd;
	    position: absolute;
	    left: 230px;
	    top: 20px;
	    z-index: 1;
	    -webkit-box-shadow: 0 0 4px #ddd;
	    box-shadow: 0 0 4px #ddd;
	}
	span.gray.help-text{
		font-size: 12px;
	    position: relative;
	}
	ul.period-block{
		border:1px solid #ddd;
	}
	li.period-item{
		padding: 13px 10px;
    	border-bottom: 1px dashed #ddd;
	}
	input.input-time{
	    width: 36px;
    	font-size: 14px;
	}
	.controls-time{
		    display: inline-block;
	}
	.page-groupon .w30 {
	    width: 50px;
	    padding: 0;
	}
	.app-design {
	    width: auto;
	    margin: 0 0; 
	}
	.layui-tab-card{
		margin-left:10px;
	}
	.layui-form input[type=checkbox], .layui-form input[type=radio], .layui-form select{
		display:none
	}
	input.layui-input.layui-unselect {
	    height: 38px;
	    line-height: 38px;
	    line-height: 36px \9;
	    border: 1px solid #e6e6e6;
	    background-color: #fff;
	    border-radius: 2px;
	}
	input#conditions_name {
	    height: 38px;
	    line-height: 38px;
	    line-height: 36px \9;
	    border: 1px solid #e6e6e6;
	    background-color: #fff;
	    border-radius: 2px;
	}
	input[type=text]{
		display: inline-block;
		height:auto;
	  	}
	i.layui-icon {
   	 	float: left;
	}
	span.aa{
		float:left;
		margin-left:10px;
	}
	th.sorting_disabled{
		padding-left:40px;
	}
</style>

<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui-timepicker-addon.min.js"></script>
<script type="text/javascript" src="jquery-ui-timepicker-zh-CN.js"></script>	
</head>
<body>
<script type="text/javascript">
	var id = getUrlParam("id");
	$(function(){
		//活动id隐藏域赋值
		$("input[name='id']").val(id);
		//点击选项卡跳转		
		$("#discountList li").click(function(){
			var index = $("#discountList li").index(this);
			location.href = "discountList.jsp?discount_flag="+index;
		});
	    var date = ['1980-05-02','1980-05-03','1980-05-05','1980-05-08','1980-05-03'];
	    $(".Wdate").bind('click',function(){
	        WdatePicker({startDate:'1980-05-01',disabledDates:date});//如何禁用多个日期
	        $(this).next().prop('checked','true')
	    })
	})
</script>
<div class="inner-page-top layui-clear">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:0;margin-bottom:9px;" id="discountList">
		    <li class="layui-this">所有促销</li>
		    <li>未开始</li>
		    <li>进行中</li>
		    <li>已结束</li>
		  </ul>
	  </div>      
</div>
<div class="app__content js-app-main" style="width:auto;margin-bottom:30px;">
    <div class="inner-page-main-container">
        <div class="page-groupon clearfix">
           <h2 class="groupon-title">设置限时折扣</h2>
           <div class="app-design">
           <form class="form-horizontal" id="discountForm" action="">
           <input type="hidden" name="id" value="" />
            <div class="js-basic-info-region"><div>
            <h3 class="reward-sub-title">活动信息</h3>
			<div class="control-group">
			    <label class="control-label"><em class="required">*</em>活动名称：</label>
			    <div class="controls">
			        <input type="text" name="discount_name" value="" placeholder="请填写活动名称" maxlength="20">
			        <span class="tips" id="check_discount_name">必须填写一个1-20字的活动名称</span>	
			    </div>
			</div>
			<div class="control-group">
			     <label class="control-label"><em class="required">*</em>生效时间：</label>
                        <div class="controls">
                            <input type="text" name="discount_active_stime" value="" id="data5" />
                            <span>至</span>
                            <input type="text" name="discount_active_etime" value="" id="data6" />
                          	<span class="tips" id="check_discount_active_time">必须选择一个过期时间</span>
                       	</div>
			</div>
			<!-- 活动标签 -->
			<div class="control-group select-goods-box">
                 <label class="control-label"><em class="required">*</em>活动标签：</label>
                 <div class="controls">
                     <ul class="module-goods-list clearfix" name="goods">
                         <li style="display:none;"> 
                         	<a class="goods-thumb"  href="javascript:;" ></a>
                         	<a class="close-modal js-delete-goods small hide"  title="删除" onclick="delete_activity_label()">&times;</a> 
                         </li>
                         <li>
                         	<!-- 添加活动标签 -->
                         	<a href="javascript:void(0);" class="js-add-goods add-goods" onclick="add_activity_label()">
                         		<i class="icon-add" style="margin-top:17px;"></i>
                         	</a>
                         </li>
                     </ul>
                     <!-- 活动标签图片url -->
                     <input type="hidden" name="activity_label" value="" />
                 </div>
             </div>
                    
			<div class="control-group">
			    <label class="control-label"></label>
			    <div class="controls">
			        <!-- 
			        <label class="checkbox inline js-period-label">
			            <input type="checkbox" class="checked-status">
			            <span class="origin-status js-lock-help-note">按周期重复</span>
			        </label>
			        <ul class="period-block hide">
			            <li class="period-item">
			                <label class="radio inline">
			                    <input type="radio" class="js-select-period" name="period" value="daily" checked="">
			                    <span>每天</span>
			                </label>
                        <div class="controls-time">
                            <input type="text" name="groupon_active_stime" value="00:00" id="data7" class="input-time"/>
                            <span>至</span>
                            <input type="text" name="groupon_active_etime" value="23:59" id="data8" class="input-time"/>
                       	</div>
			            </li>
			            <li class="period-item">
			                <label class="radio inline">
			                    <input type="radio" class="js-select-period" name="period" value="weekly">
			                    <span>每周</span>
			                </label>
			                <span class="week-selector js-period-item" data-type="weekly">
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="1" disabled="">
			                       <span>周一</span>
			                    </label>
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="2" disabled="">
			                       <span>周二</span>
			                    </label>
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="3" disabled="">
			                       <span>周三</span>
			                    </label>
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="4" disabled="">
			                       <span>周四</span>
			                    </label>
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="5" disabled="">
			                       <span>周五</span>
			                    </label>
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="6" disabled="">
			                       <span>周六</span>
			                    </label>
			                    <label class="checkbox inline week-item js-week-item  disabled">
			                       <input type="checkbox" name="week_day" value="0" disabled="">
			                       <span>周日</span>
			                    </label>
			                  </span>
			                    <div class="controls-time">
		                            <input type="text" name="groupon_active_stime" value="00:00" id="data9" class="input-time"/>
		                            <span>至</span>
		                            <input type="text" name="groupon_active_etime" value="23:59" id="data10" class="input-time"/>
                       			</div>
			            </li>
			        </ul>
			        <br> -->
			        <span class="gray help-text">活动开始前，商品详情页价格下方将会预告活动开始时间和折扣。
			            <a href="javascript:;" class="watch-example">查看示例</a>
			            <div class="image-hover" style="display: none;">
			                <p class="img-pre"><img src="shili1.jpg"></p>
			            </div>
			        </span>
			    </div>
			</div>
			<!-- 
			<div class="control-group">
			    <label class="control-label">活动标签：</label>
			    
			    <div class="controls">
			        <input type="text" name="description" value="" placeholder="限时折扣">
			        <br>
			        <span class="gray help-text">活动期间展示于商品详情的价格旁边，2至5字。
			            <a href="javascript:;" class="watch-example">查看示例</a>
			            <div class="image-hover" style="display: none;">
			                <p class="img-pre"><img src="shili2.jpg"></p>
			            </div>
			        </span>
			    </div>
			</div> -->
			</div>
			<div class="js-setting-region"><div>
			<div class="control-group">
		    <label class="control-label">限购设置：</label>
		    <div class="controls">
		        <label class="radio inline js-trigger-label">
		            <input type="radio" name="is_limit_buy" value="1" checked="">
		            <span class="origin-status">不限购</span>
		        </label>
		        <label class="radio inline js-trigger-label">
		            <input type="radio" name="is_limit_buy" value="0">
		            <span class="origin-status">每人每种商品限购</span>
		            <input type="number" min="1.0" class="quota-value w30 js-quota-value" name="limit_buy_num" value="">件
		            <span class="tips" id="check_limit_buy_num">请填写限购件数</span>
		        </label>
		        <!-- 
		        <label class="radio inline js-trigger-label">
		            <input type="radio" name="limit" value="-1">
		            <span class="origin-status">每人每种商品前</span>
		            <input type="text" class="quota-value w30 js-quota-value" name="quota" value="">件享受折扣
		        </label>
		        <label class="radio inline js-trigger-label">
		            <input type="radio" name="limit" value="-2">
		            <span class="origin-status">偶数件享受折扣</span>
		        </label> -->
		    </div>
		</div>

<h3 class="reward-sub-title">选择活动商品</h3>
	<!-- 下面为商品列表 -->
				  <div class="layui-tab layui-tab-card" id="goodsListDiv" >
					  <ul class="layui-tab-title">
					    <li class="layui-this">选择商品</li>
					    <li>已选商品</li>
					  </ul>
					  <div class="layui-tab-content">
					    <div class="layui-tab-item layui-show">
					    	<div id="goodsForm" class="layui-form" action="">
						    	<div class="layui-form-item">
						    		<div class="layui-inline">
									    <div class="layui-input-inline"  style="width: 150px;">
									       <select id="goodsSelect" name="goodsGroup" lay-filter="getGroupList">
											  <option value="">请选择分组</option>
											</select>
									    </div>
									    <div class="layui-input-inline" style="width: 150px;">
									       <select id="goodsType" name="goodsType" lay-filter="getGroupList2">
											  <option value="">请选择类别</option>
											  <option value="1">商品标题</option>
											  <option value="2">商品编码</option>
											</select>
									    </div>
									    <div class="layui-input-inline" style="width: 150px;">
									       <input id="conditions_name" name="conditions_name" type="text" lay-verify="" 
									       		placeholder="" autocomplete="off" class="layui-input">
									    </div>
								    </div>
									 <div class="layui-inline" style="left: -10px;">
									     <div class="layui-input-inline">
									        <a id="queryIntegralList" class="layui-btn layui-btn-normal" style="height: 35px;margin-top: -2px;">搜索</a>
									     </div>
								 	 </div>
								 </div>
							</div>
					    	<div class="tool_item clearfix layui-form">
						        <table id="goods_list" class="layui-table layui-form" >
						        	<colgroup>
								       <col width="60%">
								       <col width="18%">
								       <col>
						  		    </colgroup>
									<thead>
									     <tr>
											 <th style="padding-left:40px">
											 	<!-- <input id="checkall" type="checkbox" lay-skin="primary" lay-filter="allChoose"> -->
											 	商品信息
											 </th>
											 <th style="text-align: center;">库存</th>
											 <th style="text-align: center;">操作</th>
										</tr>
									</thead>
								    <tbody>
								   		
									</tbody>
									<tfoot>
										 <tr>
											<td colspan="3">
												<div class="shanpin">
													<input type="checkbox" name="batchJoinCheckbox" lay-skin="primary" 
														lay-filter="batchChoose" style="margin-left: -23px;" id="batchJoinCheckbox">
														<span class="aa">全选</span>
													<a style="margin-top:-2px;height:25px;margin-left:10px;cursor: pointer;float:left" 
														class="layui-btn layui-btn-primary layui-btn-mini" id="batchJoin">
														批量参加
													</a>
												</div>
											</td>
										</tr>
									</tfoot>
								</table>
						    </div>
					    </div>
					    <!-- 记录已选商品 -->
					    <div class="layui-tab-item">
						     <div class="tool_item clearfix layui-form">
						    	<table id="goods_list2" class="layui-table" >
					    			<colgroup>
								       <col width="15%">
								       <col width="40%">
								       <col width=10%>
						  		    </colgroup>
					    			<thead>
									     <tr>
											 <th class="sorting_disabled">
											 	商品信息
											 </th>
											 <th style="text-align: center;">优惠折扣</th>
											 <th style="text-align: center;">操作</th>
										</tr>
									</thead>
								    <tbody>
									</tbody>
									<tfoot>
										<tr>
											<td colspan="3">
												<div class="shanpin">
													<input type="checkbox" name="batchCancelCheckbox" lay-skin="primary"
													 lay-filter="batchChoose" style="margin-left: -23px;" id="batchCancelCheckbox">
													<span class="aa">全选</span>	 
													<a style="margin-top:-2px;height:25px;margin-left:10px;cursor: pointer;float:left" 
														class="layui-btn layui-btn-primary layui-btn-mini" onclick="batchCancel();">批量取消</a>
												</div>
											</td>
										</tr>
									</tfoot>
						    	</table>
						    </div>
					    </div>
					  </div>
				  </div>
				</div>
			</div>
		</div>
			<div class="layui-form-item">
			    <div class="layui-input-block">
				      <input type="button" value="确定" id="terst" class="layui-btn layui-btn-normal" />
				      <a id="cancel" class="layui-btn layui-btn-primary" >取消</a>
			    </div>
		    </div>  
			<!-- 商品列表截至 -->
		</form>
	</div>
	<!-- 
            <div class="app-design">
                <div class="app-actions">
                    <div class="form-actions text-center">
                        <input class="btn js-btn-quit" type="button" value="取 消" />
                        <input class="btn btn-primary js-btn-save" type="button" value="保 存" id="save_discount"/>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</div>
<script type="text/javascript" src="${basePath}/pages/marketing/discount/discountEdit.js"></script>
</body>
</html>