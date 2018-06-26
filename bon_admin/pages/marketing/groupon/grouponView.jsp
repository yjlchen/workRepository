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
<title>拼团查看</title>
<link rel="stylesheet" href="${basePath}/tools/layui1.0.9/css/layui.css" media="all">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/allorder/pc.css">
<link rel="stylesheet" href="${basePath}/pages/marketing/groupon/groupon.css">
<link rel="stylesheet" href="${basePath}/pages/marketing/coupon/jquery-ui.min.css">

<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui-timepicker-addon.min.js"></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/tools/layui1.0.9/layui.js"></script>
</head>
<body>
<script type="text/javascript">
	var grouponId = getUrlParam("id");
	$(function(){
		//点击选项卡跳转		
		$(".layui-tab-title li").click(function(){
			var index = $(".layui-tab-title li").index(this);
			location.href = "grouponList.jsp?groupon_flag="+index;
		});
	    var date = ['1980-05-02','1980-05-03','1980-05-05','1980-05-08','1980-05-03'];
	    $(".Wdate").bind('click',function(){
	        WdatePicker({startDate:'1980-05-01',disabledDates:date});//如何禁用多个日期
	        $(this).next().prop('checked','true')
	    })
	})
</script>
<div class="inner-page-top layui-clear">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab">
		  <ul class="layui-tab-title">
		    <li class="layui-this">所有促销</li>
		    <li>未开始</li>
		    <li>进行中</li>
		    <li>已结束</li>
		  </ul>
	  </div>      
</div>
<div class="app__content js-app-main" style="width:auto;margin-bottom:30px;">
    <div>
        <div class="page-groupon clearfix">
            <h2 class="groupon-title">设置拼团活动</h2>
            <div class="app-design">
                <form class="form-horizontal" novalidate="">
                    <input type="hidden" name="id" value="" />
                    <div class="control-group select-goods-box">
                        <label class="control-label"><em class="required">*</em>选择商品：</label>
                        <div class="controls">
                            <ul class="module-goods-list clearfix" name="goods">
                                <li> 
                                	<a class="goods-thumb"  href="#" target="_blank"></a>
                                </li>
                            </ul>
                            <input type="hidden" name="commodity_id" value="" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><em class="required">*</em>活动名称：</label>
                        <div class="controls">
                            <input type="text" name="groupon_name" value="" placeholder="输入活动名称" disabled="disabled"/>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"><em class="required">*</em>生效时间：</label>
                        <div class="controls">
                            <input type="text" name="groupon_active_stime" value="" id="data3" disabled="disabled" style="background-color: #eee;"/>
                            <span>至</span>
                            <input type="text" name="groupon_active_etime" value="" id="data4" disabled="disabled" style="background-color: #eee;"/>
                        </div>
                    </div>
                    <!-- 活动标签 -->
					<div class="control-group select-goods-box">
		                 <label class="control-label"><em class="required">*</em>活动标签：</label>
		                 <div class="controls">
		                     <ul class="module-goods-list clearfix" name="goods">
		                         <li style="display:none;"> 
		                         	<a class="goods-thumb"  href="javascript:;" ></a>
		                         	<!-- 
		                         	<a class="close-modal js-delete-goods small hide"  title="删除" onclick="delete_activity_label()">&times;</a>  
		                         	-->
		                         </li>
		                         <!-- <li>
		                         	添加活动标签
		                         	<a href="javascript:void(0);" class="js-add-goods add-goods" onclick="add_activity_label()">
		                         		<i class="icon-add" style="margin-top:17px;"></i>
		                         	</a>
		                         </li> -->
		                     </ul>
		                     <!-- 活动标签图片url -->
		                     <input type="hidden" name="activity_label" value="" />
		                 </div>
		             </div>
                    <!-- 
                    <div class="control-group">
                        <label class="control-label"><em class="required">*</em>参团人数：</label>
                        <div class="controls">
                            <input type="text" name="attend_person_num" value="2" disabled="disabled"/>
                            <p class="gray">请填写2-100的数字哟</p>
                        </div>
                    </div> -->
                    <div class="control-group" id="is_limit_attend_num">
                        <label class="control-label"><em class="required">*</em>是否固定人数：</label>
                        <div class="controls">
                        <label class="radio inline" style="font-size: 14px;line-height: 18px;">
                        	<input name="is_limit_attend_num" type="radio" value="0" checked=""  disabled="disabled"/>是
                        </label>
                        <label class="radio inline" style="font-size: 14px;line-height: 18px;">
                        	<input name="is_limit_attend_num" type="radio" value="1"  disabled="disabled"/>否
                        </label>
                        <div style="display: block;font-size: 14px;line-height: 18px;" id="attend_person_num">
                       		<em class="required">*</em>固定人数：
                            <input type="text" name="attend_person_num" value="" disabled="disabled"/>
                        </div>
                        <div style="display: none;font-size: 14px;line-height: 18px;" id="min_person_num">
                        	<em class="required">*</em>最低人数：
                            <input type="text" name="min_person_num" value="" disabled="disabled"/>
                        </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">
                       	 商品限购：</label>
                        <div class="controls controls-limit">
                            <label> 
                            <input type="checkbox" checked  id="is_limit_buy" disabled="disabled"/> 
                            <span>开启限购</span>
                            </label>
                            <input name="limit_buy_num" class="w30" type="text" value="" disabled="disabled"/>
                            <span>件/人</span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">凑团设置：</label>
                        <div class="controls controls-join-group">
                            <label> 
                            <input class="js-join-group-switch" type="checkbox" id="is_open_groupon" disabled="disabled"/> 
                            <span>开启凑团</span>
                            </label>
                            <p class="autogroup-tip gray"> 
                            <span>开启凑团后，对于未参团的买家，活动商品详情页会显示未成团的团列表，买家可以直接任选一个参团，提升成团率。</span>
                            </p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">模拟成团：</label>
                        <div class="controls controls-auto-group">
                            <label> 
                            <input class="js-auto-group-switch" type="checkbox" id="is_open_simulation_team" disabled="disabled"/> 
                            <span>开启模拟成团</span> 
                            </label>
                            <p class="autogroup-tip gray"> 
                            <span>开启模拟成团后，24小时内人数未满的团，系统将会模拟“匿名买家”凑满人数，使该团成团。<br />你只需要对已付款参团的真实买家发货。建议合理开启，以提高成团率。</span>
                             <a href="javascript:;" class="js-tuan-example tuan-example">团详情示例</a> 
                             <span class="tuan-example-img">
                              	<img src="groupon_example.jpg" /> 
                             </span></p>
                        </div>
                    </div>
                    <!-- <div class="control-group header-collection-option">
                        <label class="control-label">团长代收：</label>
                        <div class="controls controls-auto-group">
                            <label> <input class="js-chief-collection-switch" type="checkbox" checked="" /> <span>开启团长代收</span> </label>
                            <div class="collection-root">
                                <span class="collection-container "> 
                                <label class="collection-item"> 
                                <input type="radio" name="agency_receive_type" value="1" class="js-name-to-model-value" /> 
                                <span class="input-desc">团员可选是否代收</span> 
                                </label> 
                                <label class="collection-item"> 
                                <input type="radio" class="js-name-to-model-value" name="agency_receive_type" value="2" checked="" /> 
                                <span class="input-desc">团员订单必须由团长代收</span> 
                                </label> 
                                </span>
                            </div>
                            <p class="autogroup-tip gray"> 
                            	<span>开启团长代收后，代收的订单将发货给团长。 <span class="red">适用于收货地址相同的买家拼团，如：公司同事、同校学生。</span> <br /> 
                            	团员可以免付邮费，商家也可以少发包裹节省成本。虚拟商品不支持代收。 </span> </p>
                        </div>
                    </div> -->
                    <div class="control-group">
                        <label class="control-label">团长优惠：</label>
                        <div class="controls controls-auto-group">
                            <label>
                            <input class="js-chief-discount-switch" type="checkbox" disabled="disabled" id="is_captain_discount"/> 
                            <span>团长享受优惠价</span> 
                            </label>
                            <p class="autogroup-tip gray"> 
                            <span> 开启团长(开团人)优惠后，团长将享受更优惠价格，有助于提高开团率和成团率。 </span> <br /> 
                            <span class="red"> 请注意：模拟成团的团长也能享受团长优惠，请谨慎设置，避免资金损失。 </span> 
                            </p>
                        </div>
                    </div>
                    <div class="control-group control-sku" style="display:none;" id="set_groupon_discount">
                        <label class="control-label"><em class="required">*</em>优惠设置：</label>
                        <!-- <button class="js-refresh-sku ui-btn ui-btn-link hide">刷新</button> -->
                    </div>
                    <div class="control-group control-sku" style="display:none;" id="set_groupon_discount_table">
					    <table class="ui-table ui-table-thead-weight ui-table-simple data-set-table">
					        <thead>
					        <tr>
					            <td style="width: 55px;display: none"><!-- 第1种规格 --></td>
					        	<td style="width: 55px;display: none"><!-- 第2种规格 --></td>
					        	<td style="width: 55px;display: none"><!-- 第3种规格 --></td>
					            <td style="width: 100px;">微商城原价(元)</td>
					            <td style="width: 210px;">拼团价(元)</td>
					            <td style="width: 210px;">
					                <div class="chief-discount">
					                   	 团长优惠价(元)
					                </div></td>
					            <td style="width: 50px;">库存</td>
					        </tr>
					        </thead>
					        <tbody>
					        <!-- 动态加载 -->
					        </tbody>
					        <!-- 
					        <tfoot>
					        <tr>
					            <td colspan="4">
					                拼团价 批量设置: <a class="ui-btn ui-btn-link js-control-setting">拼团价</a> 
					                <input type="text" class="input-mini js-batch-setting js-setting-value" placeholder="输入价格"/> 
					                <a class="ui-btn ui-btn-link js-batch-setting js-setting-set">保存</a> 
					                <a class="ui-btn ui-btn-link js-batch-setting js-setting-cancel">取消</a>
					                勾选了团长优惠选项才开启该按钮
					                团长优惠价 <a class="ui-btn ui-btn-link js-chief-control-setting">团长优惠价</a> 
					                <input type="text" class="input-mini js-chief-batch-setting js-chief-setting-value" placeholder="输入价格"/>
					                <a class="ui-btn ui-btn-link js-chief-batch-setting js-chief-setting-set">保存</a> 
					                <a class="ui-btn ui-btn-link js-chief-batch-setting js-chief-setting-cancel">取消</a> 
					            </td>
					        </tr>
					        </tfoot> -->
					    </table>
					</div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${basePath}/pages/marketing/groupon/grouponEdit.js"></script>
</body>
</html>