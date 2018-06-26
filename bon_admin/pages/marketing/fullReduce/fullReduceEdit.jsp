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
<title>满减送编辑页面</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include> 
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">
<link rel="stylesheet" href="${basePath}/pages/order/allorder/pc.css">
<link rel="stylesheet" href="${basePath}/pages/marketing/groupon/groupon.css">
<!-- 日历控件样式 -->
<link rel="stylesheet" href="${basePath}/pages/marketing/coupon/jquery-ui.min.css">
<link rel="stylesheet" href="fullReduceEdit.css">
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
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
.reward-table-wrap {
    padding-left: 50px;
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

<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui-timepicker-addon.min.js"></script>
<script type="text/javascript" src="jquery-ui-timepicker-zh-CN.js"></script>
<script type="text/javascript">
	var id = getUrlParam("id");
	$(function(){
		//活动id隐藏域赋值
		$("input[name='id']").val(id);
		//点击选项卡跳转		
		$("#fullReduceList li").click(function(){
			var index = $("#fullReduceList li").index(this);
			location.href = "fullReduceList.jsp?fullReduce_flag="+index;
		});
	    var date = ['1980-05-02','1980-05-03','1980-05-05','1980-05-08','1980-05-03'];
	    $(".Wdate").bind('click',function(){
	        WdatePicker({startDate:'1980-05-01',disabledDates:date});//如何禁用多个日期
	        $(this).next().prop('checked','true')
	    })
	})
</script>
<script type="text/javascript" src="${basePath}/pages/marketing/fullReduce/fullReduceEdit.js"></script>
</head>
<body>
<div class="inner-page-top layui-clear">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab" style="margin:0;">
		  <ul class="layui-tab-title" style="border-bottom:0;margin-bottom:9px;" id="fullReduceList">
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
           <h2 class="groupon-title">设置满减送</h2>
           <div class="app-design">
           <form class="form-horizontal" id="discountForm" action="">
           <input type="hidden" name="id" value="" />
            <div class="js-basic-info-region"><div>
            <h3 class="reward-sub-title">活动信息</h3>
			<div class="control-group">
			    <label class="control-label"><em class="required">*</em>活动名称：</label>
			    <div class="controls">
			        <input type="text" name="full_reduce_name" value="" placeholder="请填写活动名称" maxlength="10">
			        <span class="tips" id="check_full_reduce_name">必须填写一个1-10字的活动名称</span>	
			    </div>
			</div>
			<div class="control-group">
	              <label class="control-label"><em class="required">*</em>是否主推：</label>
	              <div class="controls">
		              <label class="radio inline" style="font-size: 14px;line-height: 18px;">
		              	<input name="is_featured" type="radio" value="1" />是
		              </label>
		              <label class="radio inline" style="font-size: 14px;line-height: 18px;">
		              	<input name="is_featured" type="radio" value="0" checked="checked"  />否
		              </label>
		              <label class="radio inline" style="font-size: 14px;line-height: 18px;display:none" id="full_reduce_sort" >
		          		    <em class="required">*</em>
		          		 排序：<input type="number" min="1"  step="1" name="sort" style="width: 60px">
		          	 </label>
	       		  </div>
       		</div>
			<div class="control-group">
			     <label class="control-label"><em class="required">*</em>生效时间：</label>
                 <div class="controls">
                     <input type="text" name="full_reduce_active_stime" value=""  id="data5"/>
                     <span>至</span>
                     <input type="text" name="full_reduce_active_etime" value=""  id="data6"/>
                   	 <span class="tips" id="check_full_reduce_active_time">必须选择一个过期时间</span>
                  </div>
			</div>
			<!-- 活动标签 -->
			<div class="control-group select-goods-box">
                 <label class="control-label"><em class="required">*</em>活动标签：</label>
                 <div class="controls">
                     <ul class="module-goods-list clearfix">
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
             <!-- 功能标签 -->
<!--         <div class="control-group">
			    <label class="control-label"><em class="required">*</em>功能标签：</label>
			    <div class="controls">
			        <select id="gongneng_label" multiple="multiple">
			        </select>
			    </div>
			</div> -->
             <!-- 背景图 -->
			<div class="control-group select-goods-box">
                 <label class="control-label"><em class="required">*</em>活动背景图 ：</label>
                 <div class="controls">
                     <ul class="module-goods-list clearfix" >
                         <li style="display:none;"> 
                         	<a class="goods-thumb"  href="javascript:;" ></a>
                         	<a class="close-modal js-delete-goods small hide"  title="删除" onclick="delete_background_image()">&times;</a> 
                         </li>
                         <li>
                         	<!-- 添加背景图  -->
                         	<a href="javascript:void(0);" class="js-add-goods add-goods" onclick="add_background_image()">
                         		<i class="icon-add" style="margin-top:17px;"></i>
                         	</a>
                         </li>
                     </ul>
                     <!-- 背景图 url -->
                     <input type="hidden" name="background_image_url" value="" />
                 </div>
             </div>
             <!-- 背景图链接的微页面 -->
            <!--  
            <div class="control-group">
			    <label class="control-label">背景图链接：</label>
			    <div class="controls">
			        <select name="background_image_weipage_url">
			        	<option value="">---无链接---</option>
			        </select>
			    </div>
			</div> -->
			</div>
			<div class="js-setting-region">
			<div>
			<h3 class="reward-sub-title">优惠设置</h3>
			<div class="control-group">
   			<div class="reward-table-wrap">
   			<table class="reward-table">
      		<thead>
            	<tr>
                 <th width="10%">层级</th>
                 <th width="25%">优惠门槛</th>
                 <th width="55%" style="padding-left:100px;text-align:left">优惠方式(可多选)</th>
                 <th width="10%">操作</th>
            	</tr>
       		</thead>
            <tbody id="reward-condition">
            <tr>
            <td align="center">1</td>
			<td align="center">
			    <div class="control-group">
			        <div class="controls" style="margin:0;">
			            <span>满</span>
			            <input type="text" name="full_reduce_money" class="span1" value="">
			            <span>
			               	元
			            </span>
			            <p class="help-block error-message"></p>
			         </div>
			    </div>
			</td>
			<td>
			    <div class="control-group reward-setting first-reward">
			        <div class="controls">
			            <div class="checkbox inline reward-label">
			                <input type="radio" class="checked-status js-preferential-type" value="0" name="cash_or_discount">
			                <span class="origin-status">减现金</span>
			                <span class="replace-status hide">
			                   	 减 <input type="text" name="minus_cash" value="" class="span1 js-valid-input"> 元
			                </span>
			               <p class="help-block error-message"></p>
			            </div>
			            </div>
			    </div>
			    <div class="control-group reward-setting">
			        <div class="controls">
			            <div class="checkbox inline reward-label">
			                <input type="radio" class="checked-status js-preferential-type" value="1" name="cash_or_discount">
			                <span class="origin-status">打折</span>
			                <span class="replace-status hide">
			                   	 打 <input type="text" name="discount_value" value="" class="span1 js-valid-input"> 折
			                </span>
			                <p class="help-block error-message"></p>
			            </div>
			        </div>
			    </div>
			    <div class="control-group reward-setting">
			        <div class="controls">
			            <div class="checkbox inline reward-label">
			                <input type="radio" class="checked-status js-preferential-type" value="2" name="cash_or_discount" checked="checked">
			                <span class="origin-status">无</span>
			            </div>
			        </div>
			    </div>
			    <div class="control-group reward-setting">
			        <div class="controls">
			            <label class="checkbox inline reward-label">
			                <input type="checkbox" class="checked-status" name="is_free_postage">
			                <span class="origin-status">免邮</span>
			            </label>
			        </div>
			    </div>
			    <div class="control-group reward-need-one">
			        <div class="controls">
			            <!-- <input type="hidden" name="needOne"> -->
			        </div>
   				 </div>
			</td>
			<td align="center">
			</td>
			</tr>
			</tbody>
            </table>
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
												<div class="shanpin layui-form">
													<input type="checkbox" name="batchJoinCheckbox" lay-skin="primary" 
														lay-filter="batchChoose" style="margin-left: -23px;" id="batchJoinCheckbox">
													<span class="aa">全选</span>		
													<a style="margin-top:-2px;height:25px;margin-left:10px;cursor: pointer;float:left" 
														class="layui-btn layui-btn-primary layui-btn-mini" id="batchJoin">批量参加</a>
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
											 <th class="sorting_disabled" style="padding-left:40px">
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
												<div class="shanpin layui-form">
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
				      <input type="button" value="确定" id="saveFullReduce" class="layui-btn layui-btn-normal" />
				      <a id="cancel" class="layui-btn layui-btn-primary" >取消</a>
			    </div>
		    </div>  
			<!-- 商品列表截至 -->
		</form>
		</div>
        </div>
    </div>
</div>
</body>
</html>