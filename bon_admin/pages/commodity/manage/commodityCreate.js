/**
 * 商品发布，编辑js
 */
// var category1; //记录选择的商品品类名称
//var speArr = []; // 用于记录选择的规则值id
var phoArr = []; // 用于记录商品图片
var proArr = []; // 用于记录商品属性图片
var messArr = [];// 记录留言id的数组
var spe_id; // 记录选择要进行图片上传的规则值id
var commodity_id; // 商品id
var element ;
$(function() {
	initgroup(); //商品所属分组
	initlabel(); // 商品标签下拉框
	initBrandAndCountry(); // 商品品牌和所属国家下拉框
});

layui.use([ 'form', 'element', 'layer', 'laydate','upload' ], function() {
	var form = layui.form;
	element = layui.element;
	var laydate = layui.laydate;
	var layer = layui.layer ;
	var upload = layui.upload;
	fun_element();
	initEvent();
	initEdit();
	uploadVideoInfo(upload);  //上传商品视频和封面
	form.render(); // 更新全部
	
})

/**
 * 实现选项卡
 * 
 * @param element
 */
function fun_element() {
	element.on('tab(commodityTab)', function(data) {
		var index = data.index;
		if (index == 1) {// 选项卡改变事件基本信息验证
			to_detail_info(element);
		}
	});
}

/**
 * 事件初始
 */
function initEvent() {
	// 跳转回商品管理列表页
	$("#to_commodity").click(function() {
		var data_pjax = $("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		parent.document.getElementById(data_pjax).src = getRootPath()+ "/pages/commodity/manage/commodityList.jsp"
	});
	// 是否预售商品
	/*
	 * $("#presell_flag").change(function() {
	 * if($("#presell_flag").get(0).checked){ $("#presell_div").show(); }else{
	 * $("#presell_div").hide(); } });
	 */
	// 添加规格项目
	$("#add_specifications").click(function() {
			var len = $("#sku-region .js-sku-list-container").children().length;
			if (len > 0&& $(this).parents("#toAddGG").prev().children().last().find(".js-sku-atom-list>div").length <= 0) {
				alert_mess("请先选择上一级");
			} else {
				var html = '<div class="sku-sub-group">'
						+ '<h3 class="sku-group-title">'
						+ '    <div class="select2-container js-sku-name" style="width: 100px;">'
						+ '        <select name="specifications_id">'
						+ '			<option value="aa"> </option>'
						+ '        </select>'
						+ '    </div>'
						+ '    <input type="hidden" name="sku_name" value="14" class="js-sku-name select2-offscreen" tabindex="-1">'
						+ '    <a class="js-remove-sku-group remove-sku-group">×</a>'
						+ '</h3>' + '</div>';
				$("#sku-region .js-sku-list-container").append(html);
				initspecifications();
				var len = $("#sku-region .js-sku-list-container").children().length;
				if (len == 3) {
					$("#toAddGG").hide();
				}
			}
		});
	function specPopup(obj) {
		$(obj).next().show();
	}
	// 开售时间radio 改变事件
	/*
	 * $('input:radio[name="sell_type"]').change( function(){ var e_t =
	 * $('input:radio[name="sell_type"]:checked').val(); //0 立即开售 1 定时开售
	 * if(e_t==0){ $("#sell_time").val(""); } })
	 */
	// 预售radio 改变
	/*
	 * $('input:radio[name="etd_type"]').change(function(){ var e_t =
	 * $('input:radio[name="etd_type"]:checked').val(); //0 发货时间 1 几天后发货
	 * if(e_t==0){ $("#after_days").val(""); }else{ $("#deliver_time").val(""); } })
	 */
	// 国家品牌联动
	$("#country_id").change(function() {
		queryBrandByCountryID($("#country_id").val());
	});
}
// 根据国家id获取品牌
function queryBrandByCountryID(country_id) {
	if (country_id == null || country_id == undefined) {
		return false;
	}
	$.ajax({
			url : getRootPath() + "/commodity/queryBrandByCountyID.action",
			type : "post",
			"dataType" : "json",
			async : false,// 同步
			data : {
				"country_id" : country_id
			},
			success : function(gdata) {
				if (gdata != null) {
					var blist = gdata.brand;
					$("#brand_id").html("");
					$("#brand_id").append("<option value=''>请选择</option>");
					for (var i = 0; i < blist.length; i++) {
						var gindex = blist[i];
						var id = gindex.id;
						var name = gindex.brand_name;
						$("#brand_id").append("<option value='" + id + "'>" + name+ "</option>");
					}
				}
			}
		})
}

/**
 * 下一步按钮事件
 */
function to_next2(tabTag) {
	var tag = false;
	var guige = $("#sku-region .sku-group .js-sku-list-container .sku-sub-group");
	var standJudge = false;
	var inventory = false
	if (guige.length == 0) {
		standJudge = false;
	} else {
		for (var i = 0; i < guige.length; i++) {
			var len = $(guige[i]).find(".js-sku-atom-list>div").length;
			if (len == 0) {
				standJudge = true;
				break;
			}
		}
	}
	var sku_price = $("#s_table_tbody input[name='sku_price']");
	for (var i = 0; i < sku_price.length; i++) {
		$(sku_price[i]).next().remove();
		if ($(sku_price[i]).val() == "" || $(sku_price[i]).val() == 0) {
			$(sku_price[i]).css({
				"border-color" : "#b94a48"
			});
			$(sku_price[i]).val(parseFloat(0).toFixed(2));
			$(sku_price[i]).after('<div style="color:#b94a48">价格最小为 0.01</div>');
			inventory = true;
		}
	}
	var stock_num = $("#s_table_tbody input[name='stock_num']");
	for (var i = 0; i < stock_num.length; i++) {
		$(stock_num[i]).next().remove();
		if ($(stock_num[i]).val() == "") {
			$(stock_num[i]).css({
				"border-color" : "#b94a48"
			});
			$(stock_num[i]).after('<div style="color:#b94a48">库存不能为空</div>');
			inventory = true;
		}
	}
	var price = $("#price").val();
	var commodity_name = $("#commodity_name").val();
	var tpNum = $("#img_ul").children().length;
	var postage = $("#postage").val();

	var recurrence_ratio = toTrim($("#recurrence_ratio").val()); // 返现比例
	if (recurrence_ratio != "") {
		if (isNaN(recurrence_ratio) || parseInt(recurrence_ratio) > 1|| parseInt(recurrence_ratio) < 0) {
			$("#recurrence_ratio").focus();
			alert_mess('请填写0-1之间的返现比例');
			return false;
		}
	}

	// 验证商品标签必须选择
	var commodity_label = $("#label_id").val();
	var group_id=$("#group_id").val();
	// 验证商品品牌
	var brand_id = $("#brand_id").val();
	// 验证商品所属国家
	var country_id = $("#country_id").val();
	// 商品属性图片
	var proNum = $("#img_pro_ul").children().length;
	// 商品原始价格
	var original_price = parseFloat($("#original_price").val());
	// 商品价格
	var price = parseFloat($("#price").val());
	var unreal_total_sales = $("#unreal_total_sales").val();
	//库存
	var store_count=$("#store_count").val();
	//物流录入的值
	var goods_barcode=$("#goods_barcode").val();
	var goods_size=$("#goods_size").val();
	var goods_gweight=$("#goods_gweight").val();
	var goods_pkg_gweight=$("#goods_pkg_gweight").val();
	var ycg_code=$("#ycg_code").val();
	var hs_code=$("#hs_code").val();

	var country_id=$("#country_id").val();
	var brand_id=$("#brand_id").val();
	var specification_value_name=$("#specification_value_name").val();
	var freight_number=$("#freight_number").val();
	var component=$("#component").val();
	var purpose=$("#purpose").val();
	var quality_guarantee_period=$("#quality_guarantee_period").val();
	var manufactor=$("#manufactor").val();
	var supplier_code=$("#supplier_code").val();
	var postal_tax_number=$("#postal_tax_number").val();
	//var details_video_img=$("#details_video_img").val();  //视频封面
	var details_video=$("#details_video").val();          //视频地址
	if (0.00 != original_price) {
		if (original_price < price) {
			alert_mess('商品价格应小于原始价格');
			return false;
		}
	}
	if (0 > unreal_total_sales) {
		alert_mess('虚拟销量必须设置为大于0');
		return false;
	}
	var falg = true;
	$("#stock-region").find("tbody tr").each(function(j, n) {
		// 成本价
		var cost_price = $(n).children("td").eq(-2).find("input").val();
		// 商家编码
		var merchant_code = $(n).children("td").eq(-3).find("input").val();
		// 库存
		var stock = $(n).children("td").eq(-4).find("input").val();
		// 价格
		var detail_price = $(n).children("td").eq(-5).find("input").val();
		if (cost_price > detail_price) {
			alert_mess("价格需大于成本价");
			falg = false;
		}
	})
	if (!falg) {
		return falg;
	}
	// 验证必填项必须填写
   if(!group_id||group_id==null||""==group_id){
		alert_mess('请选择商品分组');
	}else if (!commodity_label || commodity_label == null || commodity_label == ""
		|| commodity_label.length == 0) {
	    alert_mess('请选择商品标签');
	}else if (inventory) {
		alert_mess('请完成商品规格选项!');
	} else if (standJudge) {
		alert_mess('请完成规格项目选择!');
	} else if(!country_id||null==country_id || "" == country_id) {
   	 	alert_mess('请选择国家');
    } else if(!brand_id||null==brand_id||""==brand_id) {
   	 	alert_mess('请选择品牌');
    } else if (commodity_name == "") {
		alert_mess('请填写商品名!');
	} else if (!specification_value_name||specification_value_name==null||""==specification_value_name) {
		alert_mess('请填写商品规格!');
	} else if (price == 0 || price == "" || !Number(price)) {
		alert_mess('请填写价格相关信息!');
	} else if (tpNum == 1) {
		alert_mess('请添加图片信息!');
	} else if (proNum == 1) {
		alert_mess('请添加属性图片信息!');
	}
	/*else if ( details_video=="" && details_video_img !="") {
		alert_mess('请选择商品视频');
	} 
	else if ( details_video!="" && details_video_img =="") {
		alert_mess('请选择商品视频封面');
	}*/
//	}else if( null==store_count||store_count.trim()==''){
//		alert_mess('请填写总库存信息!');
//	}
	/*else if(!goods_barcode||goods_barcode==null||""==goods_barcode){
		alert_mess('请填写商品条形码!');
	}else if(!goods_size||goods_size==null||""==goods_size){
		alert_mess('请填写商品计量单位!');
	}else if(!ycg_code||ycg_code==null||""==ycg_code){
		alert_mess('请填写原产国代码!');
	}else if(!hs_code||hs_code==null||""==hs_code){
		alert_mess('请填写商品HS编码!');
	}else if (goods_gweight == 0 || goods_gweight == "" || !Number(goods_gweight)) {
		alert_mess('请填写单价商品重量!');
	}else if (goods_pkg_gweight == 0 || goods_pkg_gweight == "" || !Number(goods_pkg_gweight)) {
		alert_mess('请填写单价商品毛重!');
	} else if(!freight_number||freight_number==null||""==freight_number) {
		alert_mess('请填写商品货号!');
	} else if(!component||component==null||""==component) {
		alert_mess('请填写商品成分!');
	} else if(!purpose||purpose==null||""==purpose) {
		alert_mess('请填写商品用途!');
	} else if(!quality_guarantee_period||quality_guarantee_period==null||""==quality_guarantee_period) {
		alert_mess('请填写商品保质期!');
	} else if(!manufactor||manufactor==null||""==manufactor){
		alert_mess('请填写商品生产厂家!');
	} else if(!supplier_code||supplier_code==null||""==supplier_code) {
		alert_mess('请填写商品供应商代码!');
	} else if(!postal_tax_number||postal_tax_number==null||""==postal_tax_number) {
		alert_mess('请填写商品行邮税号!');
	}*/
	/*
	 * else if(postage ==""||!Number(postage)&&postage!=0){alert_mess('请填写运费相关信息!');}
	 */
	else { 
		if (tabTag != null) {
			tag = true;
		} else {
			element.tabChange('commodityTab', 1);
		}
	}
	return tag;
}


/**
 * 商品详情信息编辑
 */
function to_detail_info() {
	var tag = false;
	var guige = $("#sku-region .sku-group .js-sku-list-container .sku-sub-group");
	var standJudge = false;
	var inventory = false
	if (guige.length == 0) {
		standJudge = false;
	} else {
		for (var i = 0; i < guige.length; i++) {
			var len = $(guige[i]).find(".js-sku-atom-list>div").length;
			if (len == 0) {
				standJudge = true;
				break;
			}
		}
	}
	var sku_price = $("#s_table_tbody input[name='sku_price']");
	for (var i = 0; i < sku_price.length; i++) {
		$(sku_price[i]).next().remove();
		if ($(sku_price[i]).val() == "" || $(sku_price[i]).val() == 0) {
			$(sku_price[i]).css({
				"border-color" : "#b94a48"
			});
			$(sku_price[i]).val(parseFloat(0).toFixed(2));
			$(sku_price[i]).after('<div style="color:#b94a48">价格最小为 0.01</div>');
			inventory = true;
		}
	}
	var stock_num = $("#s_table_tbody input[name='stock_num']");
	for (var i = 0; i < stock_num.length; i++) {
		$(stock_num[i]).next().remove();
		if ($(stock_num[i]).val() == "") {
			$(stock_num[i]).css({
				"border-color" : "#b94a48"
			});
			$(stock_num[i]).after('<div style="color:#b94a48">库存不能为空</div>');
			inventory = true;
		}
	}
	var price = $("#price").val();
	var commodity_name = $("#commodity_name").val();
	var tpNum = $("#img_ul").children().length;
	var postage = $("#postage").val();
	var group_id=$("#group_id").val();
	/*
	var recurrence_ratio = toTrim($("#recurrence_ratio").val()); // 返现比例
	  if(recurrence_ratio!=""){ 
	  		if(isNaN(recurrence_ratio) || parseInt(recurrence_ratio)>1 || parseInt(recurrence_ratio)<0){
	  			$("#recurrence_ratio").focus(); alert_mess('请填写0-1之间的返现比例'); 
	  			return false; 
	  		} 
	 	} */
    var group_id=$("#group_id").val();
	// 验证商品标签必须选择
	var commodity_label = $("#label_id").val();
	// 验证商品品牌
	var brand_id = $("#brand_id").val();
	// 验证商品所属国家
	var country_id = $("#country_id").val();
	// 商品属性图片
	var proNum = $("#img_pro_ul").children().length;
	// 商品原始价格
	var original_price = parseFloat($("#original_price").val());
	// 商品价格
	var price = parseFloat($("#price").val());
    var store_count=$("#store_count").val();
	var unreal_total_sales = $("#unreal_total_sales").val();
	//录入的物流信息
	var goods_barcode=$("#goods_barcode").val();
	var goods_size=$("#goods_size").val();
	var goods_gweight=$("#goods_gweight").val();
	var goods_pkg_gweight=$("#goods_pkg_gweight").val();
	var ycg_code=$("#ycg_code").val();
	var hs_code=$("#hs_code").val();
	
	var country_id=$("#country_id").val();
	var brand_id=$("#brand_id").val();
	var specification_value_name=$("#specification_value_name").val();
	var freight_number=$("#freight_number").val();
	var component=$("#component").val();
	var purpose=$("#purpose").val();
	var quality_guarantee_period=$("#quality_guarantee_period").val();
	var manufactor=$("#manufactor").val();
	var supplier_code=$("#supplier_code").val();
	var postal_tax_number=$("#postal_tax_number").val();
	//var details_video_img=$("#details_video_img").val();  //视频封面
	var details_video=$("#details_video").val();          //视频地址
	if (0.00 != original_price) {
		if (original_price < price) {
			alert_mess('商品价格应小于原始价格');
			element.tabChange('commodityTab', 0);
			return false;
		}
	}
	if (0 > unreal_total_sales) {
		alert_mess('虚拟销量必须设置为大于0');
		element.tabChange('commodityTab', 0);
		return false;
	}
	var falg = true;
	$("#stock-region").find("tbody tr").each(function(j, n) {
		// 成本价
		var cost_price = $(n).children("td").eq(-2).find("input").val();
		// 商家编码
		var merchant_code = $(n).children("td").eq(-3).find("input").val();
		// 库存
		var stock = $(n).children("td").eq(-4).find("input").val();
		// 价格
		var detail_price = $(n).children("td").eq(-5).find("input").val();
		if (cost_price > detail_price) {
			alert_mess("价格需大于成本价");
			falg = false;
		}
	})
	if (!falg) {
		element.tabChange('commodityTab', 0);
		return falg;
	}

	// 验证必填项必须填写
     if(!group_id||null==group_id||""==group_id){
    	 alert_mess('请选择商品分组');
     }else if (!commodity_label || commodity_label == null || commodity_label == ""
			|| commodity_label.length == 0) {
		alert_mess('请选择商品标签');
	}else if (inventory) {
		alert_mess('请完成商品规格选项!');
	} else if (standJudge) {
		alert_mess('请完成规格项目选择!');
//	} else if( null==store_count||store_count.trim()==''){
//		alert_mess('请填写总库存信息!');
	} else if(!country_id||null==country_id || "" == country_id) {
   	 	alert_mess('请选择国家');
    } else if(!brand_id||null==brand_id||""==brand_id) {
   	 	alert_mess('请选择品牌');
    }else if (commodity_name == "") {
		alert_mess('请填写商品名!');
	} else if (!specification_value_name||specification_value_name==null||""==specification_value_name) {
		alert_mess('请填写商品规格');
	} else if (price == 0 || price == "" || !Number(price)) {
		alert_mess('请填写价格相关信息!');
	} else if (tpNum == 1) {
		alert_mess('请添加图片信息!');
	} else if (proNum == 1) {
		alert_mess('请添加属性图片信息!');
	}
	/*else if ( details_video=="" && details_video_img !="") {
		alert_mess('请选择商品视频');
	} 
	else if ( details_video!="" && details_video_img =="") {
		alert_mess('请选择商品视频封面');
	}*/
     /*else if(!goods_barcode||goods_barcode==null||""==goods_barcode){
		alert_mess('请填写商品条形码!');
	}else if(!goods_size||goods_size==null||""==goods_size){
		alert_mess('请填写商品计量单位!');
	}else if(!ycg_code||ycg_code==null||""==ycg_code){
		alert_mess('请填写原产国代码!');
	}else if(!hs_code||hs_code==null||""==hs_code){
		alert_mess('请填写商品HS编码!');
	}else if (goods_gweight == 0 || goods_gweight == "" || !Number(goods_gweight)) {
		alert_mess('请填写单价商品重量!');
	}else if (goods_pkg_gweight == 0 || goods_pkg_gweight == "" || !Number(goods_pkg_gweight)) {
		alert_mess('请填写单价商品毛重!');
	} else if(!freight_number||freight_number==null||""==freight_number){
		alert_mess('请填写商品货号!');
	}else if(!component||component==null||""==component){
		alert_mess('请填写商品成分!');
	}else if(!purpose||purpose==null||""==purpose){
		alert_mess('请填写商品用途!');
	}else if(!quality_guarantee_period||quality_guarantee_period==null||""==quality_guarantee_period){
		alert_mess('请填写商品保质期!');
	}else if(!manufactor||manufactor==null||""==manufactor){
		alert_mess('请填写商品生产厂家!');
	}else if(!supplier_code||supplier_code==null||""==supplier_code){
		alert_mess('请填写商品供应商代码!');
	}else if(!postal_tax_number||postal_tax_number==null||""==postal_tax_number){
		alert_mess('请填写商品行邮税号!');
	}*/
     /*
	 * else if(postage == ""||!Number(postage)&&postage!=0){
	 * 	alert_mess('请填写运费相关信息!'); 
	 * }
	 */
	else {
		tag = true;
	}
	if (!tag) {
		element.tabChange('commodityTab', 0);
	}
	return tag;
}

function alert_mess(mess) {
	parent.layer.alert(mess, {
		icon : 5
	});
}

/**
 * 初始化商品分组下拉框内容
 */
 function initgroup(){ 
	 $.ajax({ 
		 url :getRootPath()+"/commodity/queryCommodityGroupList.action", 
		 type : "post",
		 "dataType":"json", 
		 success : function (gdata) {
			  $("#group_id").append("<option value= ''>请选择</option>");
			  if(gdata!=null){ 
				  var glist=gdata.commodityGroupList; 
				  for(var i=0;i<glist.length;i++){
					  var gindex=glist[i];
					  var id=gindex.id; 
					  var commodity_group_name=gindex.commodity_group_name;
					  $("#group_id").append("<option value='"+id+"'>"+commodity_group_name+"</option>");
				}
			  }
		  //原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
		  //具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
		  jQuery.browser={};
		  (function(){
			 jQuery.browser.msie=false;
			 jQuery.browser.version=0;
			  if(navigator.userAgent.match(/MSIE ([0-9]+)./)) {
			  jQuery.browser.msie=true;
			  jQuery.browser.version=RegExp.$1;
		  }})();
		  //调用chosen插件方法
		  $("#group_id").chosen(); 
		  } 
	}) 
}
 

/**
 * 初始化商品标签下拉框内容
 */
function initlabel() {
		$.ajax({
				url : getRootPath()+ "/commodity/queryCommodityLabelList.action",
				type : "post",
				"dataType" : "json",
				success : function(gdata) {
					if (gdata != null) {
						var glist = gdata.data;
						for (var i = 0; i < glist.length; i++) {
							var gindex = glist[i];
							var id = gindex.id;
							var name = gindex.name;
							$("#label_id").append("<option value='" + id + "'>" + name+ "</option>");
						}
					}
					// 原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
					// 具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
					jQuery.browser = {};
					(function() {
						jQuery.browser.msie = false;
						jQuery.browser.version = 0;
						if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
							jQuery.browser.msie = true;
							jQuery.browser.version = RegExp.$1;
						}
					})();
					// 调用chosen插件方法
					$("#label_id").chosen();
				}
			})
}

/**
 * 初始化国家下拉框内容
 */
function initBrandAndCountry() {
	$.ajax({
		url : getRootPath() + "/commodity/queryCountryAndBrandList.action",
		type : "post",
		"dataType" : "json",
		success : function(gdata) {
			if (gdata != null) {
				if (gdata.country != null && gdata.country != undefined) {
					var clist = gdata.country; // 国家列表
					$("#country_id").append("<option value=''>请选择</option>");
					for (var i = 0; i < clist.length; i++) {
						var gindex = clist[i];
						var id = gindex.id;
						var name = gindex.country_name;
						$("#country_id").append("<option value='" + id + "'>" + name+ "</option>");
					}
				}
			}
		}
	})
}



//20180518 每个商品有且仅有一种规格
///**
// * 初始化商品规格
// */
//function initspecifications() {
//	$.ajax({
//		url : getRootPath() + "/commodity/querySpecificationsList.action",
//		type : "post",
//		"dataType" : "json",
//		success : function(gdata) {
//			if (gdata != null) {
//				var glist = gdata.data;
//				for (var i = 0; i < glist.length; i++) {
//					var gindex = glist[i];
//					var id = gindex.id;
//					var name = gindex.name;
//					$("#sku-region .js-sku-list-container .sku-sub-group:last")
//						.find("select[name='specifications_id']").append("<option value='" + id + "'>" + name+ "</option>");
//				}
//			}
//			// 原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
//			// 具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
//			jQuery.browser = {};
//			(function() {
//				jQuery.browser.msie = false;
//				jQuery.browser.version = 0;
//				if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
//					jQuery.browser.msie = true;
//					jQuery.browser.version = RegExp.$1;
//				}
//			})();
//			// 先销毁之前的
//			$("#sku-region .js-sku-list-container .sku-sub-group").find("select[name='specifications_id']").chosen("destroy");
//			// 更新数据
//			$("#sku-region .js-sku-list-container .sku-sub-group").find("select[name='specifications_id']").trigger("liszt:updated");
//			// 重新调用chosen插件方法
//			$("#sku-region .js-sku-list-container .sku-sub-group").find("select[name='specifications_id']").chosen();
//		}
//	})
//}
//
///**
// * 修改时，初始化商品规格下拉列表，默认选中之前保存的值
// */
//function initSpecificationsUpdate(specification_id, num) {
//		$.ajax({
//				url : getRootPath()+ "/commodity/querySpecificationsList.action",
//				type : "post",
//				dataType : "json",
//				success : function(gdata) {
//					if (gdata != null) {
//						var glist = gdata.data;
//						for (var i = 0; i < glist.length; i++) {
//							var gindex = glist[i];
//							var id = gindex.id;
//							var name = gindex.name;
//							// 获得规格的下拉列表
//							var speSelect = $("#sku-region .js-sku-list-container .sku-sub-group").eq(num).find("select[name='specifications_id']");
//							if (id == specification_id) {
//								speSelect.append("<option value='" + id+ "' selected>" + name + "</option>");
//								// 在表头追加th
//								var th = $("#stock-region").find("thead .th-price");
//								th.before("<th style='text-align: center;'>" + name + "</th>");
//							} else {
//								speSelect.append("<option value='" + id + "'>" + name + "</option>");
//							}
//						}
//					}
//					// 原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
//					// 具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
//					jQuery.browser = {};
//					(function() {
//						jQuery.browser.msie = false;
//						jQuery.browser.version = 0;
//						if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
//							jQuery.browser.msie = true;
//							jQuery.browser.version = RegExp.$1;
//						}
//					})();
//					// 先销毁之前的
//					$("#sku-region .js-sku-list-container .sku-sub-group").find("select[name='specifications_id']").chosen("destroy");
//					// 更新数据
//					$("#sku-region .js-sku-list-container .sku-sub-group").find("select[name='specifications_id']").trigger("liszt:updated");
//					// 重新调用chosen插件方法
//					$("#sku-region .js-sku-list-container .sku-sub-group").find("select[name='specifications_id']").chosen();
//				}
//			})
//}
//
///**
// * 修改时，初始化商品库存表格（1种规格时）
// */
//function initSpevalueTableWhenOne() {
//	// 获得tbody对象,用于之后追加tr
//	var tbody = $("#stock-region").find("tbody");
//	$.ajax({
//				url : getRootPath() + "/commodity/querySpevalue1List.action",
//				type : "post",
//				data : {
//					commodity_id : commodity_id
//				},
//				dataType : "json",
//				async : false,
//				success : function(data11) {
//					var spevalue1List = data11.data;
//					for (var l = 0; l < spevalue1List.length; l++) {
//						var index1 = spevalue1List[l];
//						var tr = '<tr class="'
//								+ index1.specification_value_id1
//								+ '_tr">'
//								+ ' <td  rowspan="1" class='
//								+ index1.specification_value_id1
//								+ ' speid='
//								+ index1.specifications_id1
//								+ '>'
//								+ index1.specification_value_name1
//								+ '</td>'
//								+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value='
//								+ index1.detail_price
//								+ ' maxlength="10"></td>'
//								+ ' <td><input type="text" style="height:30px;" name="stock_num" class="js-stock-num input-mini" value='
//								+ index1.stock
//								+ ' maxlength="9"></td>'
//								+ ' <td><input type="text" style="height:30px;" class="js-code input-small"  maxlength="30" value='
//								+ index1.merchant_code
//								+ '></td>'
//								+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value='
//								+ index1.cost_price + '></td>'
//								+ ' <td class="text-right">'
//								+ index1.sales_volume + '</td></tr>'
//						tbody.append(tr);
//					}
//				}
//			})
//	$("#s_store").show();
//	// 价格与总库存置灰
//	disable_store_text(true);
//	disable_price_text(true);
//}
//
///**
// * 修改时，初始化商品库存表格（2种规格时）
// */
//function initSpevalueTableWhenTwo() {
//	// 获得tbody对象,用于之后追加tr
//	var tbody = $("#stock-region").find("tbody");
//	// 首先获得 根据商品id查询有多少个不同的 第一种规格值id 的list
//	$.ajax({
//				url : getRootPath()+ "/commodity/queryDistinctSpevalue1List.action",
//				type : "post",
//				data : {
//					commodity_id : commodity_id
//				},
//				dataType : "json",
//				async : false,
//				success : function(gdata) {
//					var glist = gdata.data;
//					for (var i = 0; i < glist.length; i++) {
//						var dindex1 = glist[i];
//						var specification_value_id1 = dindex1.specification_value_id1;
//						// 第1种规格值名称，追加tr时用到
//						var specification_value_name1 = dindex1.specification_value_name1;
//						$.ajax({
//									url : getRootPath()+ "/commodity/querySpevalue2List.action",
//									type : "post",
//									data : {
//										commodity_id : commodity_id,
//										specification_value_id1 : specification_value_id1
//									},
//									dataType : "json",
//									async : false,
//									success : function(data22) {
//										var spevalue2List = data22.data;
//										// 商品有2种规格时，根据商品id、第1种规格值id,查询有多少个第2种规格值id，即该集合的长度
//										var spevalue2ListLength = spevalue2List.length;
//										for (var m = 0; m < spevalue2List.length; m++) {
//											var index2 = spevalue2List[m];
//											// 每次循环的第1行
//											if (m == 0) {
//												var tr = '<tr class="'
//														+ specification_value_id1
//														+ '_tr">'
//														+ ' <td rowspan='
//														+ spevalue2ListLength
//														+ ' class='
//														+ specification_value_id1
//														+ ' speid='
//														+ index2.specifications_id1
//														+ '>'
//														+ specification_value_name1
//														+ '</td>'
//														+ ' <td rowspan="1" class='
//														+ index2.specification_value_id2
//														+ ' speid='
//														+ index2.specifications_id2
//														+ '>'
//														+ index2.specification_value_name2
//														+ '</td>'
//														+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value='
//														+ index2.detail_price
//														+ ' maxlength="10"></td>'
//														+ ' <td><input type="text" style="height:30px;" name="stock_num" class="js-stock-num input-mini" value='
//														+ index2.stock
//														+ ' maxlength="9"></td>'
//														+ ' <td><input type="text" style="height:30px;" class="js-code input-small"  maxlength="30" value='
//														+ index2.merchant_code
//														+ '></td>'
//														+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value='
//														+ index2.cost_price
//														+ '></td>'
//														+ ' <td class="text-right">'
//														+ index2.sales_volume
//														+ '</td></tr>'
//												tbody.append(tr);
//											}
//											// 其他行
//											else {
//												var tr = '<tr class="'
//														+ specification_value_id1
//														+ '_tr">'
//														+ ' <td rowspan="1" class='
//														+ index2.specification_value_id2
//														+ ' speid='
//														+ index2.specifications_id2
//														+ '>'
//														+ index2.specification_value_name2
//														+ '</td>'
//														+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value='
//														+ index2.detail_price
//														+ ' maxlength="10"></td>'
//														+ ' <td><input type="text" style="height:30px;" name="stock_num" class="js-stock-num input-mini" value='
//														+ index2.stock
//														+ ' maxlength="9"></td>'
//														+ ' <td><input type="text" style="height:30px;" class="js-code input-small"  maxlength="30" value='
//														+ index2.merchant_code
//														+ '></td>'
//														+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value='
//														+ index2.cost_price
//														+ '></td>'
//														+ ' <td class="text-right">'
//														+ index2.sales_volume
//														+ '</td></tr>'
//												tbody.append(tr);
//											}
//										}
//									}
//								})
//					}
//				}
//			});
//	$("#s_store").show();
//	// 价格与总库存置灰
//	disable_store_text(true);
//	disable_price_text(true);
//}
//
///**
// * 修改时，初始化商品库存表格（三种规格时）
// */
//function initSpevalueTableWhenThree() {
//	// 获得tbody对象,用于之后追加tr
//	var tbody = $("#stock-region").find("tbody");
//	// 首先获得 根据商品id查询有多少个不同的 第一种规格值id 的list
//	$.ajax({
//				url : getRootPath()+ "/commodity/queryDistinctSpevalue1List.action",
//				type : "post",
//				data : {
//					commodity_id : commodity_id
//				},
//				dataType : "json",
//				async : false,
//				success : function(gdata) {
//					var glist = gdata.data;
//					if (glist.length > 0) {
//						for (var i = 0; i < glist.length; i++) {
//							var dindex1 = glist[i];
//							var specification_value_id1 = dindex1.specification_value_id1;
//							// 第1种规格值名称，追加tr时用到
//							var specification_value_name1 = dindex1.specification_value_name1;
//							// 然后 根据商品id、第1种规格值id,查询有多少个不同的 第2种规格值id
//							$.ajax({
//										url : getRootPath()+ "/commodity/queryDistinctSpevalue2List.action",
//										type : "post",
//										data : {
//											commodity_id : commodity_id,
//											specification_value_id1 : specification_value_id1
//										},
//										dataType : "json",
//										async : false,
//										success : function(data) {
//											var distinctSpevalue2List = data.data;
//											if (distinctSpevalue2List.length > 0) {
//												// 获得有多少个不同的第2种规格值id，即该集合的长度
//												var distinctSpevalue2Listlength = distinctSpevalue2List.length;
//												for (var j = 0; j < distinctSpevalue2List.length; j++) {
//													var dindex2 = distinctSpevalue2List[j];
//													var specification_value_id2 = dindex2.specification_value_id2;
//													// 第2种规格值名称，追加tr时用到
//													var specification_value_name2 = dindex2.specification_value_name2
//													// 再根据商品id、第1种规格值id、第2种规格值id,查询有多少个
//													// 第3种规格值id
//													$.ajax({
//																url : getRootPath()+ "/commodity/queryDistinctSpevalue3List.action",
//																type : "post",
//																data : {
//																	commodity_id : commodity_id,
//																	specification_value_id1 : specification_value_id1,
//																	specification_value_id2 : specification_value_id2
//																},
//																dataType : "json",
//																async : false,
//																success : function(
//																		data2) {
//																	var distinctSpevalue3List = data2.data;
//																	// 此时说明该商品有3种规格
//																	if (distinctSpevalue3List.length > 0) {
//																		// 获得第2列跨几行，即该集合的长度
//																		var kua2 = distinctSpevalue3List.length;
//																		// 获得第1列跨几行，kua2与之前获得的length相乘
//																		var kua1 = kua2
//																				* distinctSpevalue2Listlength;
//																		for (var k = 0; k < distinctSpevalue3List.length; k++) {
//																			var dindex3 = distinctSpevalue3List[k];
//																			// 每次循环的第一行
//																			if (k == 0
//																					&& j == 0) {
//																				var tr = '<tr class="'
//																						+ dindex3.specification_value_id1
//																						+ '_tr">'
//																						+ ' <td rowspan='
//																						+ kua1
//																						+ ' class='
//																						+ dindex3.specification_value_id1
//																						+ ' speid='
//																						+ dindex3.specifications_id1
//																						+ '>'
//																						+ specification_value_name1
//																						+ '</td>'
//																						+ ' <td rowspan='
//																						+ kua2
//																						+ ' class='
//																						+ dindex3.specification_value_id2
//																						+ ' speid='
//																						+ dindex3.specifications_id2
//																						+ '>'
//																						+ specification_value_name2
//																						+ '</td>'
//																						+ ' <td rowspan="1" class='
//																						+ dindex3.specification_value_id3
//																						+ '  speid='
//																						+ dindex3.specifications_id3
//																						+ '>'
//																						+ dindex3.specification_value_name3
//																						+ '</td>'
//																						+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value='
//																						+ dindex3.detail_price
//																						+ ' maxlength="10"></td>'
//																						+ ' <td><input type="text" style="height:30px;" name="stock_num" class="js-stock-num input-mini" value='
//																						+ dindex3.stock
//																						+ ' maxlength="9"></td>'
//																						+ ' <td><input type="text" style="height:30px;" class="js-code input-small"  maxlength="30" value='
//																						+ dindex3.merchant_code
//																						+ '></td>'
//																						+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value='
//																						+ dindex3.cost_price
//																						+ '></td>'
//																						+ ' <td class="text-right">'
//																						+ dindex3.sales_volume
//																						+ '</td></tr>'
//																				tbody
//																						.append(tr);
//																			}
//																			// 包含第2个td的行
//																			else if (k == 0
//																					&& j != 0) {
//																				var tr = '<tr class="'
//																						+ dindex3.specification_value_id1
//																						+ '_tr">'
//																						+ ' <td rowspan='
//																						+ kua2
//																						+ ' class='
//																						+ dindex3.specification_value_id2
//																						+ ' speid='
//																						+ dindex3.specifications_id2
//																						+ '>'
//																						+ specification_value_name2
//																						+ '</td>'
//																						+ ' <td rowspan="1" class='
//																						+ dindex3.specification_value_id3
//																						+ '  speid='
//																						+ dindex3.specifications_id3
//																						+ '>'
//																						+ dindex3.specification_value_name3
//																						+ '</td>'
//																						+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" maxlength="10" value='
//																						+ dindex3.detail_price
//																						+ ' ></td>'
//																						+ ' <td><input type="text" style="height:30px;" name="stock_num" class="js-stock-num input-mini" value='
//																						+ dindex3.stock
//																						+ ' maxlength="9"></td>'
//																						+ ' <td><input type="text" style="height:30px;" class="js-code input-small"  maxlength="30" value='
//																						+ dindex3.merchant_code
//																						+ '></td>'
//																						+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value='
//																						+ dindex3.cost_price
//																						+ '></td>'
//																						+ ' <td class="text-right">'
//																						+ dindex3.sales_volume
//																						+ '</td></tr>'
//																				tbody
//																						.append(tr);
//																			}
//																			// 其他行
//																			else {
//																				var tr = '<tr class="'
//																						+ dindex3.specification_value_id1
//																						+ '_tr">'
//																						+ ' <td rowspan="1" class='
//																						+ dindex3.specification_value_id3
//																						+ ' speid='
//																						+ dindex3.specifications_id3
//																						+ '>'
//																						+ dindex3.specification_value_name3
//																						+ '</td>'
//																						+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value='
//																						+ dindex3.detail_price
//																						+ ' maxlength="10"></td>'
//																						+ ' <td><input type="text" style="height:30px;" name="stock_num" class="js-stock-num input-mini" value='
//																						+ dindex3.stock
//																						+ ' maxlength="9"></td>'
//																						+ ' <td><input type="text" style="height:30px;" class="js-code input-small"  maxlength="30" value='
//																						+ dindex3.merchant_code
//																						+ '></td>'
//																						+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value='
//																						+ dindex3.cost_price
//																						+ '></td>'
//																						+ ' <td class="text-right">'
//																						+ dindex3.sales_volume
//																						+ '</td></tr>'
//																				tbody.append(tr);
//																			}
//																		}
//																	}
//																}
//															});
//												}
//											}
//										}
//									})
//						}
//					}
//				}
//			})
//	$("#s_store").show();
//	// 价格与总库存置灰
//	disable_store_text(true);
//	disable_price_text(true);
//}
//
///**
// * 根据规格id获取对应的规格值集合
// */
//function initspecificationsValue(specification_id, obj) {
//		$(obj).siblings(".ui-popover-inner").children("select[name='specifications_value']").empty();
//		$.ajax({
//				url : getRootPath()+ "/commodity/querySpecificationsValList.action",
//				type : "post",
//				async : false,
//				"dataType" : "json",
//				data : {
//					"specification_id" : specification_id
//				},
//				success : function(gdata) {
//					if (isNotEmpty(gdata)) {
//						var glist = gdata.data;
//						for (var i = 0; i < glist.length; i++) {
//							var gindex = glist[i];
//							var id = gindex.id;
//							var name = gindex.specification_value_name;
//							$(obj).siblings(".ui-popover-inner").children("select[name='specifications_value']")
//									.append("<option value='" + id + "'>"+ name + "</option>");
//						}
//					}
//					// 原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
//					// 具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
//					jQuery.browser = {};
//					(function() {
//						jQuery.browser.msie = false;
//						jQuery.browser.version = 0;
//						if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
//							jQuery.browser.msie = true;
//							jQuery.browser.version = RegExp.$1;
//						}
//					})();
//					// 先销毁之前的
//					$(obj).siblings(".ui-popover-inner").children(
//							"select[name='specifications_value']").chosen(
//							"destroy");
//					// 更新数据
//					$(obj).siblings(".ui-popover-inner").children(
//							"select[name='specifications_value']").trigger(
//							"liszt:updated");
//					// 重新调用chosen插件方法
//					$(obj).siblings(".ui-popover-inner").children(
//							"select[name='specifications_value']").chosen();
//				}
//			})
//}
//
// 初始化时加载上方的商品规格数据
//function loadSpeValueUp(specification_id, specification_name, num) {
//	var str = '<div class="sku-sub-group">'
//			+ '   <h3 class="sku-group-title">'
//			+ '	 <div class="select2-container js-sku-name" style="width: 100px;">'
//			+ '	   <select name="specifications_id">'
//			+ '			<option value="aa"> </option>'
//			+ '	   </select>'
//			+ '	 </div>'
//			+ '	 <input type="hidden" name="sku_name" value="14" class="js-sku-name select2-offscreen" tabindex="-1" />'
//			+ '	 <a class="js-remove-sku-group remove-sku-group">&times;</a>'
//			+ '	</h3>'
//			+ '   <div class="js-sku-atom-container sku-group-cont">'
//			+ '	 <div>'
//			+ '	 <div class="js-sku-atom-list sku-atom-list">'
//			+ '	 </div>'
//			+ '	  <a href="javascript:;" class="js-add-sku-atom add-sku" style="display:inline-block;" onclick="show_specifications_list(this)"> '
//			+ '		选择  '
//			+ '	  </a>'
//			+ '<a href="javascript:;" class="js-add-sku-atom add-sku" style="display:inline-block;" onclick="add_new_specifications(this)">添加新规格</a> <p class="help-block error-message" style="display:inline-block;color:#b94a48">注：如添加新的规格值，请点击【添加新规格值】，添加后在点击左侧【选择】按钮进行选择</p>'
//			+ '        <!--隐藏的用于规则值弹屏选择 -->'
//			+ '        <div class="ui-popover-inner" align="center">'
//			+ '            <select name="specifications_value" multiple="multiple" class="chzn-select" ></select>'
//			+ '            <span class="js-save1" style="vertical-align: top">确定</span>'
//			+ '            <span class="js-cancel1" style="vertical-align: top">取消</span>'
//			+ '        </div>' + '	</div>' + '  </div>' + '</div>'
//	initSpecificationsUpdate(specification_id, num);
//	// 追加规格
//	$(".js-sku-list-container").append(str);
//		// 追加规格值
//		$.ajax({
//				type : "post",
//				url : getRootPath() + "/commodity/querySpeValueList.action",
//				async : false,// 同步
//				data : {
//					id : commodity_id,
//					speId : specification_id,
//					num : num
//				},
//				dataType : "json",
//				success : function(data) {
//					var speValueList = data.speValueList;
//					$.each(
//						speValueList,
//						function(i, n) {
//							// 每个规格下的具体值
//							var name = n.specification_value_name;
//							// 规格值id，将该值放入隐藏域中，后面保存时再用
//							var id = n.specification_value_id;
//							// 定义添加的具体规格值
//							var appendStr = '<div class="sku-atom active" id="'
//									+ id
//									+ '_div" style="margin-bottom:0;">'
//									+ '    <span>'
//									+ name
//									+ '</span>'
//									+ '    <div class="atom-close close-modal small js-remove-sku-atom" onclick=remove_sv("'
//									+ id
//									+ '",this)>'
//									+ '     × '
//									+ '    </div>' + ' </div>'
//							$(".js-sku-list-container .js-sku-atom-list").eq(num).append(appendStr);
//						})
//				},
//				error : function() {
//
//				}
//			});
//}
//// 获取商品的规格值数量
//function inser_table_store_num(obj) {
//	var sum = $(obj).children(".js-sku-atom-container").find(
//			".js-sku-atom-list>div").length;
//	if (sum == 0) {
//		sum = 1;
//	}
//	return sum;
//}
//// 获取绘制表格的数据
//function table_detail(obj) {
//	var detail_arr = [];
//	var spe_id = $(obj).find("select[name='specifications_id']").val();
//	var spe_name = $(obj).find("select[name='specifications_id']").next().find(
//			"span").text();
//	detail_arr.push(spe_id);
//	detail_arr.push(spe_name);
//	var detail_div = $(obj).children(".js-sku-atom-container").find(
//			".js-sku-atom-list>div");
//	var s_id = $(obj).find("select[name='specifications_value']").val();
//	for (var i = 0; i < detail_div.length; i++) {
//		var num = $(detail_div[i]).attr("id").indexOf("_div");
//		var s_id = $(detail_div[i]).attr("id").substring(0, num);
//		var s_neme = $(detail_div[i]).children("span").text();
//		detail_arr.push(s_id);
//		detail_arr.push(s_neme);
//	}
//	detail_arr.push(detail_div.length);
//	return detail_arr;
//}
//// 添加已选规格
//function insert_sv(spev_id, spev_name, obj) {
//	var str = "";
//	str += "<div class='sku-atom active' id='" + spev_id
//			+ "_div' style='margin-bottom:0;'>";
//	str += "	<span data-atom-id='26237'>" + spev_name + "</span>";
//	str += "	<div class='atom-close close-modal small js-remove-sku-atom'>×</div>";
//	str += "	</div> ";
//	str += "</div>";
//	$(obj).parents(".ui-popover-inner").siblings("div.js-sku-atom-list").append(str);
//}
//// 绘制表格(一种规格)
//function draw_table_one(num1, detail_arr1) {
//	$("#s_store").show();
//	$("#s_table_tbody").html("");
//	var thead = '<tr>'
//			+ '	<th class="text-center"><em class="required">*</em>'
//			+ detail_arr1[1]
//			+ '</th>'
//			+ '	<th class="th-price"><em class="required">*</em>价格（元）</th>'
//			+ '	<th class="th-stock"><em class="required">*</em>库存</th>'
//			+ '	<th class="th-code">商家编码</th>'
//			+ '	<th class="text-cost-price"><em class="required">*</em>成本价</th>'
//			+ '	<th class="text-right"><em class="required">*</em>销量</th>'
//			+ '</tr>';
//	$("#stock-region table thead").html(thead);
//	for (var i = 0; i < num1; i++) {
//		var html = '<tr class="'
//				+ detail_arr1[2 * (i + 1)]
//				+ '_tr">'
//				+ '	<td rowspan="1" class="'
//				+ detail_arr1[2 * (i + 1)]
//				+ '" speid="'
//				+ detail_arr1[0]
//				+ '">'
//				+ detail_arr1[2 * (i + 1) + 1]
//				+ '</td>'
//				+ ' 	<td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value="" maxlength="10"></td>'
//				+ ' 	<td><input type="text" name="stock_num" style="height:30px;" class="js-stock-num input-mini" value="" maxlength="9"></td>'
//				+ ' 	<td><input type="text" name="code" style="height:30px;" class="js-code input-small" value="" maxlength="30"></td>'
//				+ ' 	<td><input type="text" name="cost_price" class="js-cost-price input-small" value=""></td>  <td class="text-right">0</td>'
//				+ '</tr>';
//		$("#s_table_tbody").append(html);
//	}
//}
//// 绘制表格(两种规格)
//function draw_table_two(num1, num2, detail_arr1, detail_arr2) {
//	$("#s_store").show();
//	$("#s_table_tbody").html("");
//	var thead = '<tr>'
//			+ '	<th class="text-center">'
//			+ detail_arr1[1]
//			+ '</th>'
//			+ '	<th class="text-center">'
//			+ detail_arr2[1]
//			+ '</th>'
//			+ '	<th class="th-price"><em class="required">*</em>价格（元）</th>'
//			+ '	<th class="th-stock"><em class="required">*</em>库存</th>'
//			+ '	<th class="th-code">商家编码</th>'
//			+ '	<th class="text-cost-price"><em class="required">*</em>成本价</th>'
//			+ '	<th class="text-right"><em class="required">*</em>销量</th>'
//			+ '</tr>';
//	$("#stock-region table thead").html(thead);
//	for (var i = 0; i < num1; i++) {
//		for (var j = 0; j < num2; j++) {
//			if (j == 0) {
//				var html = '<tr class="'
//						+ detail_arr1[2 * (i + 1)]
//						+ '_tr">'
//						+ '	<td rowspan="'
//						+ num2
//						+ '" class="'
//						+ detail_arr1[2 * (i + 1)]
//						+ '" speid="'
//						+ detail_arr1[0]
//						+ '">'
//						+ detail_arr1[2 * (i + 1) + 1]
//						+ '</td>'
//						+ ' <td class="'
//						+ detail_arr2[2 * (j + 1)]
//						+ '" rowspan="1" speid="'
//						+ detail_arr2[0]
//						+ '">'
//						+ detail_arr2[2 * (j + 1) + 1]
//						+ '</td>'
//						+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value="" maxlength="10"></td>'
//						+ ' <td><input type="text" name="stock_num" style="height:30px;" class="js-stock-num input-mini" value="" maxlength="9"></td>'
//						+ ' <td><input type="text" name="code" style="height:30px;" class="js-code input-small" value="" maxlength="30"></td>'
//						+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value=""></td>  <td class="text-right">0</td>'
//						+ '</tr>';
//			} else {
//				var html = '<tr class="'
//						+ detail_arr2[2 * (j + 1)]
//						+ '_tr">'
//						+ '	<td rowspan="1" class="'
//						+ detail_arr2[2 * (j + 1)]
//						+ '" speid="'
//						+ detail_arr2[0]
//						+ '">'
//						+ detail_arr2[2 * (j + 1) + 1]
//						+ '</td>'
//						+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value="" maxlength="10"></td>'
//						+ ' <td><input type="text" name="stock_num" style="height:30px;" class="js-stock-num input-mini" value="" maxlength="9"></td>'
//						+ ' <td><input type="text" name="code" style="height:30px;" class="js-code input-small" value="" maxlength="30"></td>'
//						+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value=""></td>  <td class="text-right">0</td>'
//						+ '</tr>';
//			}
//			$("#s_table_tbody").append(html);
//		}
//	}
//}
//// 绘制表格(三种规格)
//function draw_table_three(num1, num2, num3, detail_arr1, detail_arr2,
//		detail_arr3) {
//	$("#s_store").show();
//	$("#s_table_tbody").html("");
//	var thead = '<tr>'
//			+ '	<th class="text-center">'
//			+ detail_arr1[1]
//			+ '</th>'
//			+ '	<th class="text-center">'
//			+ detail_arr2[1]
//			+ '</th>'
//			+ '	<th class="text-center">'
//			+ detail_arr3[1]
//			+ '</th>'
//			+ '	<th class="th-price"><em class="required">*</em>价格（元）</th>'
//			+ '	<th class="th-stock"><em class="required">*</em>库存</th>'
//			+ '	<th class="th-code">商家编码</th>'
//			+ '	<th class="text-cost-price"><em class="required">*</em>成本价</th>'
//			+ '	<th class="text-right"><em class="required">*</em>销量</th>'
//			+ '</tr>';
//	$("#stock-region table thead").html(thead);
//	for (var i = 0; i < num1; i++) {
//		for (var j = 0; j < num2; j++) {
//			for (var l = 0; l < num3; l++) {
//				if (j == 0 && l == 0) {
//					var html = '<tr class="'
//							+ detail_arr1[2 * (i + 1)]
//							+ '_tr">'
//							+ '	<td rowspan="'
//							+ num2 * num3
//							+ '" class="'
//							+ detail_arr1[2 * (i + 1)]
//							+ '" speid="'
//							+ detail_arr1[0]
//							+ '">'
//							+ detail_arr1[2 * (i + 1) + 1]
//							+ '</td>'
//							+ ' <td class="'
//							+ detail_arr2[2 * (j + 1)]
//							+ '" rowspan="'
//							+ num3
//							+ '" speid="'
//							+ detail_arr2[0]
//							+ '">'
//							+ detail_arr2[2 * (j + 1) + 1]
//							+ '</td>'
//							+ ' <td class="'
//							+ detail_arr3[2 * (l + 1)]
//							+ '" rowspan="1" speid="'
//							+ detail_arr3[0]
//							+ '">'
//							+ detail_arr3[2 * (l + 1) + 1]
//							+ '</td>'
//							+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value="" maxlength="10"></td>'
//							+ ' <td><input type="text" name="stock_num" style="height:30px;" class="js-stock-num input-mini" value="" maxlength="9"></td>'
//							+ ' <td><input type="text" name="code" style="height:30px;" class="js-code input-small" value="" maxlength="30"></td>'
//							+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value=""></td>  <td class="text-right">0</td>'
//							+ '</tr>';
//				} else if (j != 0 && l == 0) {
//					var html = '<tr class="'
//							+ detail_arr2[2 * (j + 1)]
//							+ '_tr">'
//							+ '	<td rowspan="'
//							+ num3
//							+ '" class="'
//							+ detail_arr2[2 * (j + 1)]
//							+ '" speid="'
//							+ detail_arr2[0]
//							+ '">'
//							+ detail_arr2[2 * (j + 1) + 1]
//							+ '</td>'
//							+ ' <td class="'
//							+ detail_arr3[2 * (l + 1)]
//							+ '" rowspan="1" speid="'
//							+ detail_arr3[0]
//							+ '">'
//							+ detail_arr3[2 * (l + 1) + 1]
//							+ '</td>'
//							+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value="" maxlength="10"></td>'
//							+ ' <td><input type="text" name="stock_num" style="height:30px;" class="js-stock-num input-mini" value="" maxlength="9"></td>'
//							+ ' <td><input type="text" name="code" style="height:30px;" class="js-code input-small" value="" maxlength="30"></td>'
//							+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value=""></td>  <td class="text-right">0</td>'
//							+ '</tr>';
//				} else {
//					var html = '<tr class="'
//							+ detail_arr3[2 * (l + 1)]
//							+ '_tr">'
//							+ ' <td class="'
//							+ detail_arr3[2 * (l + 1)]
//							+ '" rowspan="1" speid="'
//							+ detail_arr3[0]
//							+ '">'
//							+ detail_arr3[2 * (l + 1) + 1]
//							+ '</td>'
//							+ ' <td><input type="text" style="height:30px;" name="sku_price" class="js-price input-mini" value="" maxlength="10"></td>'
//							+ ' <td><input type="text" name="stock_num" style="height:30px;" class="js-stock-num input-mini" value="" maxlength="9"></td>'
//							+ ' <td><input type="text" name="code" style="height:30px;" class="js-code input-small" value="" maxlength="30"></td>'
//							+ ' <td><input type="text" name="cost_price" class="js-cost-price input-small" value=""></td>  <td class="text-right">0</td>'
//							+ '</tr>';
//				}
//				$("#s_table_tbody").append(html);
//			}
//		}
//	}
//}
//// 筛选存在规格值的选项
//function screen_specification(sku_sub_group) {
//	// 获取 sku_sub_group 下的规格值的数量
//	var num1 = inser_table_store_num(sku_sub_group[0]);
//	var num2 = inser_table_store_num(sku_sub_group[1]);
//	var num3 = inser_table_store_num(sku_sub_group[2]);
//	// 获取绘制表格所需要的信息
//	var detail_arr1 = table_detail(sku_sub_group[0]);
//	var detail_arr2 = table_detail(sku_sub_group[1]);
//	var detail_arr3 = table_detail(sku_sub_group[2]);
//	// 判断存在规格值的选项
//	if (detail_arr1[detail_arr1.length - 1] != 0
//			&& detail_arr2[detail_arr2.length - 1] != 0
//			&& detail_arr3[detail_arr3.length - 1] != 0) {
//		draw_table_three(num1, num2, num3, detail_arr1, detail_arr2,
//				detail_arr3);
//	} else if (detail_arr1[detail_arr1.length - 1] != 0
//			&& detail_arr2[detail_arr2.length - 1] != 0
//			&& detail_arr3[detail_arr3.length - 1] == 0) {
//		draw_table_two(num1, num2, detail_arr1, detail_arr2);
//	} else if (detail_arr1[detail_arr1.length - 1] != 0
//			&& detail_arr2[detail_arr2.length - 1] == 0
//			&& detail_arr3[detail_arr3.length - 1] != 0) {
//		draw_table_two(num1, num3, detail_arr1, detail_arr3);
//	} else if (detail_arr1[detail_arr1.length - 1] == 0
//			&& detail_arr2[detail_arr2.length - 1] != 0
//			&& detail_arr3[detail_arr3.length - 1] != 0) {
//		draw_table_two(num2, num3, detail_arr2, detail_arr3);
//	} else if (detail_arr1[detail_arr1.length - 1] != 0
//			&& detail_arr2[detail_arr2.length - 1] == 0
//			&& detail_arr3[detail_arr3.length - 1] == 0) {
//		draw_table_one(num1, detail_arr1);
//	} else if (detail_arr1[detail_arr1.length - 1] == 0
//			&& detail_arr2[detail_arr2.length - 1] != 0
//			&& detail_arr3[detail_arr3.length - 1] == 0) {
//		draw_table_one(num2, detail_arr2);
//	} else if (detail_arr1[detail_arr1.length - 1] == 0
//			&& detail_arr2[detail_arr2.length - 1] == 0
//			&& detail_arr3[detail_arr3.length - 1] != 0) {
//		draw_table_one(num3, detail_arr3);
//	} else {
//		$("#s_store").hide();
//		$("#s_table_tbody").html("");
//	}
//}
///*
// * 显示规则id对应的规则值界面
// */
//function show_specifications_list(obj) {
//	var len = $(obj).parents(".sku-sub-group").index();
//	if (len == 1
//			&& $(obj).parents(".sku-sub-group").prev().children().last().find(
//					".js-sku-atom-list>div").length <= 0) {
//		alert_mess("请先选择上一级");
//	} else if (len == 2
//			&& ($(obj).parents(".sku-sub-group").prev().children().last().find(
//					".js-sku-atom-list>div").length <= 0 || $(obj).parents(
//					".sku-sub-group").prev().prev().children().last().find(
//					".js-sku-atom-list>div").length <= 0)) {
//		alert_mess("请先选择上一级");
//	} else {
//		var s_id = $(obj).parents(".sku-sub-group").find(
//				"h3 select[name='specifications_id']").val();
//		$('#sku-region .js-sku-atom-list').children().removeClass('bord');
//		if (!s_id) {
//			parent.layer.msg('请先选择规格', {
//				icon : 1,
//				time : 1000
//			}, function() {
//
//			});
//		} else {
//			$(obj).siblings(".ui-popover-inner").css("display", "block");
//			initspecificationsValue(s_id, obj);
//		}
//	}
//}
//// 添加新规格值
//function add_new_specifications(obj) {
//	var spe_id = $(obj).parents(".sku-sub-group").find("h3 select").val();
//	parent.layer.open({
//				title : "新增规格值",
//				type : 2,
//				area : [ '400px', '150px' ],
//				content : getRootPath()
//						+ '/pages/commodity/manage/add_specification.jsp?specification_id='
//						+ spe_id
//			});
//}
// 点击规格弹出框中的确定按钮
//$("#sku-region").on("click",".js-save1",function() {
//			// 获取当前元素的父元素(js-sku-list-container)的所有直接子元素
//			var sku_sub_group = $(this).parents(".js-sku-list-container").children();
//			// 获取当前元素的兄弟原(select[name='specifications_value'])的值
//			var s_id = $(this).siblings("select[name='specifications_value']").val();
//			// 获取当前元素的父元素(ui-popover-inner)的兄弟元素(js-sku-atom-list)的所有直接子元素
//			var specifications_list1 = $(this).parents(".ui-popover-inner").siblings("div.js-sku-atom-list").children();
//			// 获取当前元素的兄弟元素(chzn-container-active)的子元素(chzn-choices li)
//			var chzn_choices = $(this).siblings("div.chzn-container-active").find("ul.chzn-choices li");
//			var $this = $(this);
//			// 当前元素的父元素(ui-popover-inner)的兄弟元素(js-sku-atom-list)显示
//			$(this).parents(".ui-popover-inner").siblings("div.js-sku-atom-list").show();
//			// 当前元素的父元素(ui-popover-inner)隐藏
//			$(this).parents(".ui-popover-inner").hide();
//			// 循环判断当前选择的元素是否已经存在
//			for (var i = 0; i < chzn_choices.length - 1; i++) {
//				var s_name = $(chzn_choices[i]).children("span").text();
//				var aa = true;
//				if (specifications_list1.length > 0) {
//					for (var j = 0; j < specifications_list1.length; j++) {
//						var a_name = $(specifications_list1[j]).children("span").text();
//						if (s_name == a_name) {
//							aa = false;
//							$('.alert-error').show().delay(2000).hide(300);
//							if ($(specifications_list1[j]).children("span").text() == a_name) {
//								$(specifications_list1[j]).addClass('bord');
//							}
//							break;
//						}
//					}
//				}
//				if (aa) {
//					insert_sv(s_id[i], s_name, $this);
//				}
//			}
//			screen_specification(sku_sub_group);
//		});
//		// 弹出的规格div点击取消
//		$("#sku-region").on("click",".js-cancel1",function() {
//			$(this).parents(".ui-popover-inner").hide();
//			$('.search-choice-close').click();
//			$(this).siblings("select[name='specifications_value']").find("option").remove();
//			$(this).siblings("select[name='specifications_value']").empty();
//		})
//		// change 规格选项时触发的事件
//		$("#sku-region").on("change","select[name='specifications_id']",
//				function(e, previous) {
//					// 获取当前元素的父元素的兄弟元素中包含的select[name='specifications_id']元素
//					var selval = $(this).parents(".sku-sub-group").siblings().find("select[name='specifications_id']");
//					// 循环判断是否已经添加了相同规格的元素
//					for (var i = 0; i < selval.length; i++) {
//						if ($(selval[i]).val() == $(this).val()) {
//							var html = '<div class="js-notifications notifications">';
//							html += '<div class="alert in fade alert-error" style="opacity: 1;background-color:#ff4343;color:#fff;">';
//							html += '已经添加了相同的规格值。</div>';
//							html += '</div>';
//							$("body").append(html);
//							$(this).val("aa");
//							var spe_name = $(this).next().find("span").text("");
//							setTimeout(function() {
//								$("body>div.js-notifications").remove();
//							}, 1500);
//							$(this).parents("h3.sku-group-title").next().remove();
//							var sku_sub_group = $(this).parents(".js-sku-list-container").children();
//							screen_specification(sku_sub_group);
//							return false;
//						}
//					}
//					// 当前元素的父元素(h3.sku-group-title)的下一个元素删除
//					$(this).parents("h3.sku-group-title").next().remove();
//					var html = '<div class="js-sku-atom-container sku-group-cont">'
//							+ '	<div>'
//							+ '  	<div class="js-sku-atom-list sku-atom-list"></div>'
//							+ '  	<a href="javascript:;" class="js-add-sku-atom add-sku" style="display: inline-block;" onclick="show_specifications_list(this)">选择</a>'
//							+ '  	<a href="javascript:;" class="js-add-sku-atom add-sku" style="display: inline-block;" onclick="add_new_specifications(this)">添加新规格值</a> <p class="help-block error-message" style="display:inline-block;color:#b94a48">注：如添加新的规格值，请点击【添加新规格值】，添加后在点击左侧【选择】按钮进行选择</p>'
//							+ '   	<!--隐藏的用于规则值弹屏选择 -->'
//							+ '      <div class="ui-popover-inner" align="center">'
//							+ '      	<select name="specifications_value" multiple="multiple" class="chzn-select" ></select>'
//							+ '          <span class="js-save1" style="vertical-align: top">确定</span>'
//							+ '          <span class="js-cancel1" style="vertical-align: top">取消</span>'
//							+ '      </div>' + '  </div>' + '</div>';
//					// 当前元素的父元素(h3.sku-group-title)之后追加一个元素
//					$(this).parents("h3.sku-group-title").after(html);
//					var sku_sub_group = $(this).parents(".js-sku-list-container").children();
//					screen_specification(sku_sub_group);
//				});
//		// 点击叉号删除规格值
//		$("#sku-region").on("click",".sku-sub-group .js-sku-atom-list .sku-atom .atom-close",
//		function() {
//			var sku_sub_group = $(this).parents(".js-sku-list-container").children();
//			$(this).parent(".sku-atom").remove();
//			screen_specification(sku_sub_group);
//		});
//	// 点击删除一列规格值
//	$("#sku-region").on("click",".sku-sub-group .sku-group-title .js-remove-sku-group",
//		function() {
//			var $this = $(this);
//			$(this).parents(".sku-sub-group").remove();
//			var sku_sub_group = $("#sku-region>div.sku-group>div.js-sku-list-container").children();
//			screen_specification(sku_sub_group);
//			// 添加规格项目显示
//			$("#toAddGG").show();
//		});
///**
// * 删除数组中的规格值id
// * 
// * @param spe_v_id
// */
//function del_arr(spe_v_id) {
//	for (var i = 0; i < speArr.length; i++) {
//		if (speArr[i] == spe_v_id) {
//			speArr.splice(i, 1);
//			break;
//		}
//	}
//	if (speArr.length == 0) {
//		disable_store_text(false);
//		disable_price_text(false);
//		$("#store_count").val(0);
//	} else {
//		var s_n = 0;
//		for (var i = 0; i < speArr.length; i++) {
//			var s_id = speArr[i];
//			var b_n = $("#" + s_id + "_stock").val();
//			if (b_n == "") {
//				b_n = 0;
//			}
//			s_n += parseInt(b_n);
//		}
//		$("#store_count").val(s_n);
//	}
//}
// end 20180518 每个商品有且仅有一种规格

/**
 * 清空数组
 */
/*function del_all_arr() {
	speArr = [];
	disable_store_text(false);
	disable_price_text(false);
	$("#store_count").val(0);
}*/

// 加载规则值对应的图片
/*function addSpePho(spe_v_id) {
	addpho("up_spe_pho", 1);
	spe_id = spe_v_id;
}*/
// 改变规则值图片
/*function up_spe_pho(urlArr) {
	if (urlArr.length > 0) {
		for (var i = 0; i < urlArr.length; i++) {
			var url = urlArr[i];
			$("#" + spe_id + "_img").attr("src", url);
		}
	}
}*/
// 进行商品图片多选 弹出公用窗口
function addShopPho() {
	if (phoArr.length >= 5) {
		alert_mess('最多添加5张图片!');
	} else {
		addpho("query_pho", 2);
	}
}

/**
 * 调用共用图片选择弹出框
 * 
 * @param b_fun
 *            图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type
 *            图片弹出框里的图片是否可以多选 1 单选 2多选
 */
function addpho(b_fun, mutl_type) {
	parent.layer.open({
		title : '',
		type : 2,
		closeBtn : 1,
		resize : false,
		area : [ "860px", "530px" ],
		content : getRootPath() + '/commons/jsp/com_pho.jsp?b_fun=' + b_fun + '&mutl_type=' + mutl_type // type=1 单选; 2多选
	});
}
// 获取图片选择页面传入的图片数组，插入到商品图片
function query_pho(urlArr) {
	if (urlArr.length > 0) {
		for (var i = 0; i < urlArr.length; i++) {
			var url = urlArr[i];
			insert_pho(url);
			if (phoArr.length >= 5) {
				return false;
			}
		}
	}
}
// 插入商品图片
function insert_pho(url) {
	var str = "";
	str += "<li class='sort' id='" + url + "_li'><img ";
	str += "src='" + url + "'";
	str += "class='js-img-preview'> <a class='js-delete-picture close-modal small hide' name='"
			+ url + "'>×</a></li>";
	phoArr.push(url);
	$("#img_ul").prepend(str);
}
// 删除商品图片
function del_pho(url) {
	var iul = document.getElementById("img_ul");
	var ili = document.getElementById(url + "_li");
	iul.removeChild(ili);
	for (var i = 0; i < phoArr.length; i++) {
		if (phoArr[i] == url) {
			phoArr.splice(i, 1);
			break;
		}
	}
}
// 进行商品属性图片多选 弹出公用窗口
function addShopProPho() {
	if (proArr.length >= 8) {
		alert_mess('最多添加8张属性图片!');
	} else {
		addpho("query_pro_pho", 2);
	}
}

// 获取属性图片选择页面传入的图片数组，插入到商品属性图片
function query_pro_pho(urlArr) {
	if (urlArr.length > 0) {
		for (var i = 0; i < urlArr.length; i++) {
			var url = urlArr[i];
			insert_pro_pho(url);
			if (proArr.length >= 8) {
				return false;
			}
		}
	}
}
// 插入商品属性图片
function insert_pro_pho(url) {
	var str = "";
	str += "<li class='sort' id='" + url + "_pro'><img ";
	str += "src='" + url + "'"; 
	str += "class='js-img-preview'> <a class='js-delete-picture close-modal small hide' name='"
			+ url + "'>×</a></li>";
	proArr.push(url);
	$("#img_pro_ul").prepend(str);
}

//var mess_dell_id = 1; // 留言id
// 添加留言,
/*
 * function add_message(){ if(messArr.length<10){ //最多添加10条留言
 * insert_message(mess_dell_id); mess_dell_id+=1; } if(messArr.length>=10){
 * $("#messages-region .message-add").hide(); } } function
 * insert_message(mess_id){ var str=""; str+="<div class='message-item'
 * id='"+mess_id+"_leave_div'> "; str+=" <input type='text'
 * id='"+mess_id+"_leave' value='留言' class='input-mini message-input'
 * style='width:150px;height:30px' maxlength='16'> "; str+=" <select
 * class='input-small message-input' id='"+mess_id+"_leave_type'
 * onchange='mess_type_change(this,"+mess_id+")'> "; str+=" <option value='text'
 * selected=''>文本格式</option> "; str+=" <option value='tel'>数字格式</option> ";
 * str+=" <option value='email'>邮件格式</option> "; str+=" <option value='date'>日期</option> ";
 * str+=" <option value='time'>时间</option> "; str+=" <option
 * value='id_no'>身份证号码</option> "; str+=" <option value='image'>图片</option> ";
 * str+=" </select> "; str+=" <label class='checkbox inline message-input hide'
 * id='"+mess_id+"_leave_date'> "; str+=" <input type='checkbox' value='0'
 * id='"+mess_id+"_leave_contain_date'>含日期 "; str+=" </label> "; str+=" <label
 * class='checkbox inline message-input '> "; str+=" <input type='checkbox'
 * value='0' id='"+mess_id+"_leave_multiple'>多行 "; str+=" </label> "; str+="
 * <label class='checkbox inline message-input'> "; str+=" <input
 * type='checkbox' value='1' checked='' id='"+mess_id+"_leave_req'>必填 "; str+="
 * </label> "; str+=" <a href='javascript:;' class='js-remove-message
 * remove-message' onclick='del_mess("+mess_id+")'>删除</a> "; str+=" </div> ";
 * messArr.push(mess_id); $("#leave_message").append(str); }
 * 
 * //删除选中的留言 function del_mess(mess_id){ $("#"+mess_id+"_leave_div").remove();
 * $("#messages-region .message-add").show(); for(var i=0;i<messArr.length;i++){
 * if(messArr[i]==mess_id){ messArr.splice(i,1); break; } } }
 */

/**
 * 当留言类型发生改变时，判断是否选择的时间选项
 * 
 * @param me
 * @param mess_id
 */
/*
 * function mess_type_change(me,mess_id){ if(me.value=='time'){
 * $("#"+mess_id+"_leave_date").removeClass("hide"); }else{
 * $("#"+mess_id+"_leave_date").addClass("hide"); } }
 */

/**
 * 总库存文本框的置灰操作
 * 
 * @ift true 置灰 false 启用
 */
function disable_store_text(ift) {
	$("#store_count").attr("disabled", ift);
}

/**
 * 价格文本框的置灰操作
 * 
 * @ift true 置灰 false 启用
 */
function disable_price_text(ift) {
	$("#price").attr("disabled", ift);
}

// 商品信息编辑完毕上传到后台（保存）
function upload_info() {
	changePicArr();
	var id = commodity_id; // 主键
	// var commodity_category_name=category1; //商品品类名称
	// var commodity_type_name=$('input:radio[name="commodity_type_name"]:checked').val();//商品类型
	/*
	 * var presell_flag=0; 
	 * //是否预售 
	 * if($("#presell_flag").get(0).checked){presell_flag=1; }
	 */
	// var deliver_time=$("#deliver_time").val(); //发货时间
	var after_days = $("#after_days").val(); // 付款成功后几天发货
	if (after_days == "") {
		after_days = 0;
	}
	var display_stock_flag = 1; // 页面不显示商品库存 1 显示，0 不显示
	/*
	 * if($("#hide_stock").get(0).checked){ display_stock_flag=0; }
	 */

	var brand_id = $("#brand_id").val(); // 商品品牌
	var country_id = $("#country_id").val(); // 商品所属国家

	var store_count = $("#store_count").val(); // 商品库存
	var merchant_code = $("#merchant_code").val(); // 商家编码
	var commodity_name = $("#commodity_name").val(); // 商品名称
	var price = $("#price").val(); // 商品价格
	var original_price = $("#original_price").val(); // 商品原价
	if (original_price == "") {
		original_price = 0;
	}
	var img_path_str = ""; // 商品图片
	for (var i = 0; i < phoArr.length; i++) {
		var ph = phoArr[i];
		if (img_path_str == "") {
			img_path_str = ph;
		} else {
			img_path_str += "," + ph;
		}
	}
	var img_pro_path_str = ""; // 商品属性图片
	for (var i = 0; i < proArr.length; i++) {
		var ph = proArr[i];
		if (img_pro_path_str == "") {
			img_pro_path_str = ph;
		} else {
			img_pro_path_str += "," + ph;
		}
	}
	var postage = $("#postage").val(); // 统一邮费
	var recurrence_ratio = $("#recurrence_ratio").val(); // 返现比例
	var limit_buy = $("#limit_buy").val(); // 每人限购
	if (limit_buy == "") {
		limit_buy = 0;
	}

	// var sell_type=$('input:radio[name="sell_type"]:checked').val();
	// //开售类型1立即开售 2定时开售
	var create_time = queyNowTimeByServer(); // 创建时间
	/*
	 * var sell_time=create_time; //开售时间 var commodity_status=0; //'0:出售中 1:已售罄
	 * 2:仓库中' if(sell_type==2){ commodity_status=2;
	 * sell_time=$("#sell_time").val(); }else{ sell_time=""; }
	 */

	// 保存商品详情页左边与整个页面div
	var edit_content = $("#total").html();
	// var preview_content = $(".app-preview").html();
	var preview_content = $("#goodDetailDiv").html();
	// 原商品链接
	// var commodity_url =
	// getRootPath()+'/pages/webstore/webpage/preview/goodDetail_mobile.jsp?goodId='+id;
	// 商品链接(基础路径+商品id（在后台添加）)
	var commodity_url = commodityDetailPath;
	// 虚拟销量
	var unreal_total_sales = $("#unreal_total_sales").val();
	if (unreal_total_sales == "") {
		unreal_total_sales = 0;
	}
	//填写的物流相关信息
	var goods_barcode=$("#goods_barcode").val();
	var goods_size=$("#goods_size").val();
	var goods_gweight=$("#goods_gweight").val();
	var goods_pkg_gweight=$("#goods_pkg_gweight").val();
	var ycg_code=$("#ycg_code").val();
	var hs_code=$("#hs_code").val();

	// 标签集合
	var jsonlabels = [];
	var c_label = $("#label_id").val();
	if (c_label != null && c_label.length > 0) {
		for(var index in c_label) {
			jsonlabels.push({
				label_id: c_label[index],
				label_name: $("#label_id option[value=" + c_label[index] + "]").text()
			});
		}
	}
	var goodinfoJson = {
			"commodity_group_id": $("#group_id").val(),
			"after_days" : after_days,
			"display_stock_flag" : display_stock_flag,
			"store_count" : store_count,
			"merchant_code" : merchant_code,
			"commodity_name" : commodity_name,
			"price" : price,
			"original_price" : original_price,
			"img_path_str" : img_path_str,
			"attribute_path_str" : img_pro_path_str,
			"postage" : postage,
			"limit_buy" : limit_buy,
			"recurrence_ratio" : recurrence_ratio,
			"brand_id" : brand_id,
			"country_id" : country_id,
			"commodity_url" : commodity_url,
			"unreal_total_sales" : unreal_total_sales,
			"edit_content" : edit_content,
			"preview_content" : preview_content,
			"goods_barcode":goods_barcode,
			"goods_size":goods_size,
			"goods_gweight":goods_gweight,
			"goods_pkg_gweight":goods_pkg_gweight,
			"ycg_code":ycg_code,
			"hs_code":hs_code,
			"specification_value_name":  $("#specification_value_name").val(),
			"freight_number": $("#freight_number").val(),
			"component": $("#component").val(),
			"purpose": $("#purpose").val(),
			"quality_guarantee_period": $("#quality_guarantee_period").val(),
			"manufactor": $("#manufactor").val(),
			"supplier_code": $("#supplier_code").val(),
			"postal_tax_number": $("#postal_tax_number").val(),
			"details_video": $("#details_video").val(),
			//"details_video_img": $("#details_video_img").val(),
			jsonlabels: jsonlabels,
			is_dutyfree: $("#is_dutyfree").val(),
			"warehouse_type": 0,   //香港仓
		};
	 
	

	// 3、商品规格、规格值保存
	// 遍历商品规格，拼接成json形式字符串集合，传向后台保存
//	var speJson = "";
//	$(".js-sku-list-container .sku-sub-group").each(function(j, n) {
//		// 遍历获得div下面的下拉列表的值
//		var spe_id = $(n).find("select").val();
//		var tbody = {
//			"specification_id" : spe_id
//		};
//		var tbodystr = JSON.stringify(tbody);
//		if (j > 0) {
//			speJson += ',' + tbodystr;
//		} else {
//			speJson += tbodystr;
//		}
//	});
//	var speStr = "[" + speJson + "]";
//
//	// 遍历商品规格值，表格有几行，就保存几条数据
//	var speValueJson = "";
//	// 获得整个tr对象
//	var tr = $("#stock-region").find("tbody tr");
//	// 获得第一行第一列跨了几行
//	var row = Number($(tr[0]).children().eq(0).attr("rowspan"));
//	// 循环跨行数
//	for (var i = 0; i < tr.length; i += row) {
//		// 获得第一行第2列跨了几行
//		var row2 = Number($(tr[i]).children().eq(1).attr("rowspan"));
//		// 获得第一个规格的规格id
//		var specifications_id1 = $(tr[i]).children().eq(0).attr("speid");
//		// 获得第一个规格的规格值id
//		var specification_value_id1 = $(tr[i]).children().eq(0).attr("class");
//		if (!row2) {
//			row2 = 1;
//		}
//		for (var k = i; k < i + row; k += row2) {
//			// 定义第2个规格的规格id
//			var specifications_id2 = "";
//			// 定义第2个规格的规格值id
//			var specification_value_id2 = "";
//			if (k > i) {
//				// 获得第2个规格的规格id
//				specifications_id2 = $(tr[k]).children().eq(0).attr("speid");
//				// 获得第2个规格的规格值id
//				specification_value_id2 = $(tr[k]).children().eq(0).attr("class");
//			} else {
//				// 获得第2个规格的规格id
//				specifications_id2 = $(tr[k]).children().eq(1).attr("speid");
//				// 获得第2个规格的规格值id
//				specification_value_id2 = $(tr[k]).children().eq(1).attr("class");
//			}
//			// 循环第三列
//			for (var j = k; j < k + row2; j++) {
//				// alert(j);
//				// 定义第3个规格的规格id
//				var specifications_id3 = "";
//				// 定义第3个规格的规格值id
//				var specification_value_id3 = "";
//				if (j > k) {
//					// 获得第3个规格的规格id
//					specifications_id3 = $(tr[j]).children().eq(0).attr("speid");
//					// 获得第3个规格的规格值id
//					specification_value_id3 = $(tr[j]).children().eq(0).attr("class");
//				} else if (k > i) {
//					// 获得第3个规格的规格id
//					specifications_id3 = $(tr[j]).children().eq(1).attr("speid");
//					// 获得第3个规格的规格值id
//					specification_value_id3 = $(tr[j]).children().eq(1).attr("class");
//				} else {
//					// 获得第3个规格的规格id
//					specifications_id3 = $(tr[j]).children().eq(2).attr("speid");
//					// 获得第3个规格的规格值id
//					specification_value_id3 = $(tr[j]).children().eq(2).attr("class");
//				}
//				var tbody = {
//					"specifications_id1" : specifications_id1,
//					"specification_value_id1" : specification_value_id1,
//					"specifications_id2" : specifications_id2,
//					"specification_value_id2" : specification_value_id2,
//					"specifications_id3" : specifications_id3,
//					"specification_value_id3" : specification_value_id3
//				};
//				var tbodystr = JSON.stringify(tbody);
//				speValueJson += ',' + tbodystr;
//			}
//		}
//	}
//	speValueJson = speValueJson.substr(1, speValueJson.length);
//	var speValueStr = "[" + speValueJson + "]";
//
//	// 保存表格的后5列
//	var last5 = "";
//	$("#stock-region").find("tbody tr").each(function(j, n) {
//		// 成本价
//		var cost_price = $(n).children("td").eq(-2).find("input").val();
//		// 商家编码
//		var merchant_code = $(n).children("td").eq(-3).find("input").val();
//		// 库存
//		var stock = $(n).children("td").eq(-4).find("input").val();
//		// 价格
//		var detail_price = $(n).children("td").eq(-5).find("input").val();
//
//		var tbody = {
//			"cost_price" : cost_price,
//			"merchant_code" : merchant_code,
//			"stock" : stock,
//			"detail_price" : detail_price
//		};
//		var tbodystr = JSON.stringify(tbody);
//		if (j > 0) {
//			last5 += ',' + tbodystr;
//		} else {
//			last5 += tbodystr;
//		}
//	});
//
//	var last5Str = "[" + last5 + "]";

	$.ajax({
		url : getRootPath() + "/commodity/updateCommodityInfo.action",
		type : "post",
		async : false,
		"dataType" : "TEXT",
		data : {
			id: id==null?"":id,
			"infoJsonStr": JSON.stringify(goodinfoJson),
//			"speStr" : speStr,
//			"speValueStr" : speValueStr,
//			"last5Str" : last5Str,
		},
		success : function(gdata) {
			if (gdata == "success") {
				disable_submit(true, 'js-btn-add');
				disable_submit(true, 'js-btn-save');

				layer.msg("保存成功", {
					icon : 1,
					time : 500
				// （如果不配置，默认是3秒）
				}, function() {
					location.href = getRootPath()
							+ '/pages/commodity/manage/commodityList.jsp?store_count=' + store_count;
				});
			} else {
				disable_submit(true, 'js-btn-add');
				disable_submit(true, 'js-btn-save');
				disable_submit(true, 'js-btn-preview');
				parent.layer.alert("操作失败");
			}
		},
		error : function() {
			disable_submit(true, 'js-btn-add');
			disable_submit(true, 'js-btn-save');
			disable_submit(true, 'js-btn-preview');
			parent.layer.alert("操作失败");
		}
	})
}

// 预览
/*
 * function preview_info(flag){ changePicArr(); var id=commodity_id; //主键 //var
 * commodity_category_name=category1; //商品品类名称 var
 * commodity_type_name=$('input:radio[name="commodity_type_name"]:checked').val();
 * //商品类型 var presell_flag=0; //是否预售 if($("#presell_flag").get(0).checked){
 * presell_flag=1; } // var deliver_time=$("#deliver_time").val(); //发货时间 var
 * after_days=$("#after_days").val(); //付款成功后几天发货
 * if(after_days==""){after_days=0;} var display_stock_flag=1; //页面不显示商品库存 1
 * 显示，0 不显示 if($("#hide_stock").get(0).checked){ display_stock_flag=0; }
 * 
 * var brand_id=$("#brand_id").val(); //商品品牌 var
 * country_id=$("#country_id").val(); //商品所属国家
 * 
 * var store_count=$("#store_count").val(); //商品库存 var
 * merchant_code=$("#merchant_code").val(); //商家编码 var
 * commodity_name=$("#commodity_name").val(); //商品名称 var
 * price=$("#price").val(); //商品价格 var
 * original_price=$("#original_price").val(); //商品原价
 * if(original_price==""){original_price=0;} var img_path_str=""; //商品图片 for(var
 * i=0;i<phoArr.length;i++){ var ph=phoArr[i]; if(img_path_str==""){
 * img_path_str=ph; }else{ img_path_str+=","+ph; } } var img_pro_path_str="";
 * //商品属性图片 for(var i=0;i<proArr.length;i++){ var ph=proArr[i];
 * if(img_pro_path_str==""){ img_pro_path_str=ph; }else{
 * img_pro_path_str+=","+ph; } } 
 * var postage=$("#postage").val(); //统一邮费 var
 * recurrence_ratio=$("#recurrence_ratio").val(); //返现比例 var
 * limit_buy=$("#limit_buy").val(); //每人限购 if(limit_buy==""){limit_buy=0;} //
 * var sell_type=$('input:radio[name="sell_type"]:checked').val(); //开售类型1立即开售
 * 2定时开售 var create_time=queyNowTimeByServer(); //创建时间 // var
 * sell_time=create_time; //开售时间 //var commodity_status=0; //'0:出售中 1:已售罄 2:仓库中'
 * if(sell_type==2){ commodity_status=2; sell_time=$("#sell_time").val(); }else{
 * sell_time=""; }
 * 
 * //保存商品详情页左边与整个页面div var edit_content = $("#total").html(); //var
 * preview_content = $(".app-preview").html(); var preview_content =
 * $("#goodDetailDiv").html(); //商品链接(基础路径+商品id（在后台添加）) var commodity_url =
 * commodityDetailPath; //虚拟销量 var unreal_total_sales =
 * $("#unreal_total_sales").val();
 * if(unreal_total_sales==""){unreal_total_sales=0;} //商品基本信息json串组装 var
 * goodinfoJson; //修改时，不更新create_time if(id!=""&&id!=null){ goodinfoJson =
 * {"id":id, "commodity_category_name":commodity_category_name,
 * "commodity_type_name":commodity_type_name, "presell_flag":presell_flag,
 * "deliver_time":deliver_time, "after_days":after_days,
 * "display_stock_flag":display_stock_flag, "store_count":store_count,
 * "merchant_code":merchant_code, "commodity_name":commodity_name,
 * "price":price, "original_price":original_price, "img_path_str":img_path_str,
 * "attribute_path_str":img_pro_path_str, "postage":postage,
 * "limit_buy":limit_buy, 
 * "recurrence_ratio":recurrence_ratio,
 * //"sell_type":sell_type, //"create_time":create_time,
 * //"sell_time":sell_time, //"commodity_status":commodity_status,
 * "commodity_url":commodity_url, "unreal_total_sales":unreal_total_sales,
 * "edit_content":edit_content, "preview_content":preview_content,
 * "brand_id":brand_id, "country_id":country_id}; } //新增时，没有主键，后台生成 else{
 * goodinfoJson = { "id":"", "commodity_category_name":commodity_category_name,
 * "commodity_type_name":commodity_type_name, "presell_flag":presell_flag,
 * "deliver_time":deliver_time, "after_days":after_days,
 * "display_stock_flag":display_stock_flag, "store_count":store_count,
 * "merchant_code":merchant_code, "commodity_name":commodity_name,
 * "price":price, "original_price":original_price, "img_path_str":img_path_str,
 * "attribute_path_str":img_pro_path_str, "postage":postage,
 * "limit_buy":limit_buy, 
 *  "recurrence_ratio":recurrence_ratio,
 * //"sell_type":sell_type, "create_time":create_time, //"sell_time":sell_time,
 * //"commodity_status":commodity_status, "commodity_url":commodity_url,
 * "brand_id":brand_id, "country_id":country_id,
 * "unreal_total_sales":unreal_total_sales, "edit_content":edit_content,
 * "preview_content":preview_content }; } var jsonstr =
 * JSON.stringify(goodinfoJson); // 1 留言集合 var messArr=[];//记录留言id的数组 var
 * jsonMess;='['; for(var index in messArr){ var mess_id=messArr[index]; var
 * leave_message=$("#"+mess_id+"_leave").val(); //留言内容 var
 * format=$("#"+mess_id+"_leave_type").val(); //留言格式 var contain_time=0;
 * //含日期(格式为time时的选项) 1 包含 0 不包含 if(format=="time" &&
 * $("#"+mess_id+"_leave_contain_date").get(0).checked){ contain_time=1; } var
 * multi_line_flag=0; //多行 if($("#"+mess_id+"_leave_multiple").get(0).checked){
 * multi_line_flag=1; } var require_flag=0; //必填
 * if($("#"+mess_id+"_leave_req").get(0).checked){ require_flag=1; } var
 * tbody='{'; tbody+='"id":"'+uuid(); //主键 tbody+='","commodity_id":"'+id;
 * tbody+='","leave_message":"'+leave_message; tbody+='","format":"'+format;
 * tbody+='","contain_time":"'+contain_time;
 * tbody+='","multi_line_flag":"'+multi_line_flag;
 * tbody+='","require_flag":"'+require_flag; tbody+='"}'; if(jsonMess.length>2){
 * jsonMess+=','+tbody; }else{ jsonMess+=tbody; } } jsonMess+=']';
 * 
 * //2 分组集合 var jsongroup='['; var c_group=$("#group_id").val();
 * if(c_group!=null&&c_group.length>0){ for(var index in c_group){ var
 * group_id=c_group[index]; var tbody='{'; tbody+='"id":"'+uuid(); //主键
 * tbody+='","commodity_id":"'+id; tbody+='","group_id":"'+group_id;
 * tbody+='"}'; if(jsongroup.length>2){ jsongroup+=','+tbody; }else{
 * jsongroup+=tbody; } } } jsongroup+=']'; // 标签集合 var jsonlabels='['; var
 * c_label=$("#label_id").val(); if(c_label!=null&&c_label.length>0){ for(var
 * index in c_label){ var label_id=c_label[index]; var tbody='{';
 * tbody+='"id":"'+uuid(); //主键 tbody+='","commodity_id":"'+id;
 * tbody+='","label_id":"'+label_id; tbody+='","label_name":"'+$("#label_id
 * option[value=" + label_id + "]").text(); tbody+='"}';
 * if(jsonlabels.length>2){ jsonlabels+=','+tbody; }else{ jsonlabels+=tbody; } } }
 * jsonlabels+=']'; //3、商品规格、规格值保存 //遍历商品规格，拼接成json形式字符串集合，传向后台保存 var speJson =
 * ""; $(".js-sku-list-container .sku-sub-group").each(function (j,n) {
 * //遍历获得div下面的下拉列表的值 var spe_id = $(n).find("select").val(); var tbody = {
 * "specification_id":spe_id }; var tbodystr = JSON.stringify(tbody); if(j>0){
 * speJson += ','+tbodystr; }else{ speJson += tbodystr; } }); var speStr =
 * "["+speJson+"]";
 * 
 * 
 * //遍历商品规格值，表格有几行，就保存几条数据 var speValueJson = ""; //获得整个tr对象 var
 * tr=$("#stock-region").find("tbody tr"); //获得第一行第一列跨了几行 var row=
 * Number($(tr[0]).children().eq(0).attr("rowspan")); //循环跨行数 for(var i=0;i<tr.length;i+=row){
 * //获得第一行第2列跨了几行 var row2 = Number($(tr[i]).children().eq(1).attr("rowspan"));
 * //获得第一个规格的规格id var specifications_id1 =
 * $(tr[i]).children().eq(0).attr("speid"); //获得第一个规格的规格值id var
 * specification_value_id1 = $(tr[i]).children().eq(0).attr("class"); if(!row2){
 * row2 = 1; } for(var k=i;k<i+row;k+=row2){ //定义第2个规格的规格id var
 * specifications_id2 = ""; //定义第2个规格的规格值id var specification_value_id2 = "";
 * if(k>i){ //获得第2个规格的规格id specifications_id2 =
 * $(tr[k]).children().eq(0).attr("speid"); //获得第2个规格的规格值id
 * specification_value_id2 = $(tr[k]).children().eq(0).attr("class"); }else{
 * //获得第2个规格的规格id specifications_id2 = $(tr[k]).children().eq(1).attr("speid");
 * //获得第2个规格的规格值id specification_value_id2 =
 * $(tr[k]).children().eq(1).attr("class"); } //循环第三列 for(var j=k;j<k+row2;j++){
 * //alert(j); //定义第3个规格的规格id var specifications_id3 = ""; //定义第3个规格的规格值id var
 * specification_value_id3 = ""; if(j>k){ //获得第3个规格的规格id specifications_id3 =
 * $(tr[j]).children().eq(0).attr("speid"); //获得第3个规格的规格值id
 * specification_value_id3 = $(tr[j]).children().eq(0).attr("class"); }else
 * if(k>i){ //获得第3个规格的规格id specifications_id3 =
 * $(tr[j]).children().eq(1).attr("speid"); //获得第3个规格的规格值id
 * specification_value_id3 = $(tr[j]).children().eq(1).attr("class"); }else{
 * //获得第3个规格的规格id specifications_id3 = $(tr[j]).children().eq(2).attr("speid");
 * //获得第3个规格的规格值id specification_value_id3 =
 * $(tr[j]).children().eq(2).attr("class"); }
 * 
 * var tbody = { "specifications_id1":specifications_id1,
 * "specification_value_id1":specification_value_id1,
 * "specifications_id2":specifications_id2,
 * "specification_value_id2":specification_value_id2,
 * "specifications_id3":specifications_id3,
 * "specification_value_id3":specification_value_id3 }; var tbodystr =
 * JSON.stringify(tbody); speValueJson += ','+tbodystr; } } } speValueJson =
 * speValueJson.substr(1,speValueJson.length); var speValueStr = "["
 * +speValueJson+ "]";
 * 
 * 
 * //保存表格的后5列 var last5=""; $("#stock-region").find("tbody tr").each(function
 * (j,n) { //成本价 var cost_price =
 * $(n).children("td").eq(-2).find("input").val(); //商家编码 var merchant_code =
 * $(n).children("td").eq(-3).find("input").val(); //库存 var stock =
 * $(n).children("td").eq(-4).find("input").val(); //价格 var detail_price =
 * $(n).children("td").eq(-5).find("input").val(); alert_mess('成本价应小于价格');
 * if(cost_price>detail_price){ alert_mess('成本价应小于价格'); }
 * 
 * var tbody = { "cost_price":cost_price, "merchant_code":merchant_code,
 * "stock":stock, "detail_price":detail_price }; var tbodystr =
 * JSON.stringify(tbody); if(j>0){ last5 += ','+tbodystr; }else{ last5 +=
 * tbodystr; } }); var last5Str = "["+last5+"]";
 * 
 * 
 * $.ajax({ url : getRootPath()+"/commodity/previewCommodityInfo.action", type :
 * "post", async: false, "dataType":"TEXT",
 * data:{"infoJsonStr":jsonstr,"messJsonStr":jsonMess,"groupJsonStr":jsongroup,"speStr":speStr,
 * "flag":flag,"speValueStr":speValueStr,"last5Str":last5Str,"labelJsonStr":jsonlabels},
 * success : function (gdata) {
 * if("success"==gdata.substr(0,gdata.indexOf(","))){
 * layer.msg("保存成功，正在重定向到预览页面", { icon: 1, time: 500 //（如果不配置，默认是3秒） },
 * function(){ //location.href = //getRootPath()+
 * '/pages/webstore/webpage/preview/goodDetail_mobile.jsp?goodId='+gdata.substr(gdata.indexOf(",")+1);
 * location.href = gdata.substr(gdata.indexOf(",")+1)+"?toview=frompc"; });
 * }else{ disable_submit(true,'js-btn-add'); disable_submit(true,'js-btn-save');
 * disable_submit(true,'js-btn-preview'); parent.layer.alert("保存失败"); } },
 * error:function(){ disable_submit(true,'js-btn-add');
 * disable_submit(true,'js-btn-save'); disable_submit(true,'js-btn-preview');
 * parent.layer.alert("保存失败"); } }) }
 */

/** ************************以下为编辑信息时代码****************************** */
function initEdit() {
	commodity_id = getUrlParam("id"); // 商品id
	if (!isNotEmpty(commodity_id)) { // 如果为空(新增功能)
		// commodity_id=uuid();
	} else {
		queryEditInfo();
	}
}

// 获取商品信息
function queryEditInfo() {
	// 1 基本信息 2 留言集合 3 规则值集合
	$.ajax({
		url : getRootPath() + "/commodity/queryCommodityInfo.action",
		type : "post",
		"dataType" : "json",
		data : {
			"id" : commodity_id
		},
		success : function(gdata) {
			if (gdata) {
				opera_info(gdata.data);
				//opera_speList(gdata.speList);
				//opera_messList(gdata.messList);
				opera_groupList(gdata.groupList); //商品分组表
				opera_labelList(gdata.labelList); // 商品标签表
			}
		},
		error : function() {
		}
	})
}

// 处理商品基本信息
function opera_info(data) {
	// 商品品类名称
	// category1=data.commodity_category_name;
	/*
	 * for(var i=1;i<=8;i++){ if($("#category"+i).val()==category1){
	 * $("#category"+i).removeClass("layui-btn-primary"); }else{
	 * $("#category"+i).addClass("layui-btn-primary"); } }
	 */

	queryBrandByCountryID(data.country_id); // 初始化国家对应的品牌
	$("#form_info").setForm(data);//表单自动赋值
	editaVideoInfo(data); //对视频和视频封面回填
	// $("#category_lb").text(category1);
	// 给实际销量赋值，因为保存时不更新该字段
	$("#total_sales").val(data.total_sales);
	// 各种选择框 选中后的对应div显示
	/*
	 * if(data.presell_flag==1){ //是否预售 $("#presell_div").show(); }
	 */
	// 设置商品图片
	var phoar = data.img_path_str.split(",");
	for (var i = phoar.length - 1; i >= 0; i--) {
		var url = phoar[i];
		insert_pho(url);
	}

	// 设置商品属性图片
	if (data.attribute_path_str != null && data.attribute_path_str != undefined) {
		var proar = data.attribute_path_str.split(",");
		for (var i = proar.length - 1; i >= 0; i--) {
			var url = proar[i];
			if (url != undefined) {
				insert_pro_pho(url);
			}

		}
	}

	// 加载整个页面html内容
	$("#total").html(data.edit_content);
	var total = $(data.edit_content);

	// 给商品详情富文本框赋值
	if ($("#goodDetailDiv").html().indexOf("<h4>商品详情区</h4>") != -1
			&& $("#goodDetailDiv").html().indexOf("<p>点击进行编辑</p>") != -1) {
		// 此时富文本内容为空
		ue.addListener("ready", function() {
			ue.setContent("", false);
		});
	} else {
		ue.addListener("ready", function() {
			ue.setContent($("#goodDetailDiv").html(), false);
		});
	}
	// 遍历id以li_开头的li，目的是找到商品，给商品的价格等信息赋值，以便商品信息更新时，微页面随之变化
	/*total.find("li[id*='li_']").each(
			function(j, n) {
				// 获得隐藏域中的商品id
				var goodId = $(n).children().eq(0).val();
				// 获得这个li的id
				var id = $(n).attr("id");
				// 获得id的_后面的数字
				var num = id.substr(id.lastIndexOf('_') + 1);
				// 根据id,ajax查询其他商品信息，并赋值
				$.ajax({
					"type" : "post",
					"url" : getRootPath()
							+ "/commodity/queryCommodityInfo.action",
					async : false,// 同步
					'data' : {
						id : goodId
					},
					"dataType" : "json",
					'success' : function(data) {
						var url;
						if (data.data.img_path_str.indexOf(",") < 0) {
							url = data.data.img_path_str;
						} else {
							// 图片url,取第一个，之前的值
							url = data.data.img_path_str.substr(0,
									data.data.img_path_str.indexOf(","));
						}
						var price = data.data.price;
						var goodName = data.data.commodity_name;
						$("#" + id).find("div.photo-block img")
								.attr("src", url);
						$("#" + id).find("div.info .goods-title")
								.html(goodName);
						$("#" + id).find("div.info .goods-price").html(price);
						$("#good_" + num).find("img").attr("src", url);
					},
					'error' : function() {

					}
				});
			});*/

	// 加载各个模块的js
	/*
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/total.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/goods.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/title.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/text_nav.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/nav.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/store.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/goods_list.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/notice.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/showcase.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/image_ad.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/cube2.js");
	 * jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/search.js");
	 */
}

// 处理商品留言集合信息
function opera_messList(data) {
	if (!isNotEmpty(data) || data.length == 0) {
		return;
	}
	$.each(data, function(i, n) {
		insert_message(i);
		$("#" + i + "_leave").val(n.leave_message); // 留言内容
		$("#" + i + "_leave_type").val(n.format); // 留言格式
		if (n.contain_time == 1) { // 含日期(格式为time时的选项)
			$("#" + i + "_leave_contain_date").attr("checked", true);
		}
		if (n.multi_line_flag == 1) { // 是否多行
			$("#" + i + "_leave_multiple").attr("checked", true);
		}
		$("#" + i + "_leave_req").attr("checked", (n.require_flag == 1)); // 必填标志
	})
}

// 20180518 每个商品有且仅有一种规格
// 处理商品规格,规格值集合信息
//function opera_speList(data) {
//	if (!isNotEmpty(data) || data.length == 0) {
//		return;
//	}
//	$.each(data, function(i, n) {
//		// 规格id
//		var specification_id = n.specification_id;
//		// 规格名称
//		var specification_name = n.specification_name;
//		// 加载商品规格数据
//		loadSpeValueUp(specification_id, specification_name, i);
//	})
//	// 加载商品库存表格，即规格值明细
//	$.ajax({
//		url : getRootPath() + "/commodity/judgeHowmanySpe.action",
//		type : "post",
//		dataType : "text",
//		data : {
//			"commodity_id" : commodity_id
//		},
//		success : function(data) {
//			if (data == "one") {
//				// alert("1种规格");
//				initSpevalueTableWhenOne();
//			} else if (data == "two") {
//				// alert("2种规格");
//				initSpevalueTableWhenTwo();
//			} else if (data == "three") {
//				// alert("3种规格");
//				initSpevalueTableWhenThree();
//			}
//		},
//		error : function() {
//		}
//	})
//}
// end 20180518 每个商品有且仅有一种规格

// 商品分组信息
function opera_groupList(data){
	  if(!isNotEmpty(data) ||data.length==0){return;} 
	  var groupArr=[];
	  $.each(data,function(i,n){
         groupArr.push(n.id);
         $("#group_id" + " option[value='" + n.id + "']").attr('selected', 'selected'); 
	  }) 
	  //这样可以解决同一select不断动态加载的问题。
	  $("#group_id").trigger("liszt:updated"); 
	  //重新调用chosen插件方法
	  $("#group_id").chosen();
 }
 
// 商品标签信息（注释掉的是没用choose插件时的下拉列表多选初始化）
function opera_labelList(data) {
	if (!isNotEmpty(data) || data.length == 0) {
		return;
	}
	$.each(data, function(i, n) {
		$("#label_id" + " option[value='" + n.label_id + "']").attr('selected','selected');
	})
	// 这样可以解决同一select不断动态加载的问题。
	$("#label_id").trigger("liszt:updated");
	// 重新调用chosen插件方法
	$("#label_id").chosen();
}
// 规格值明细表格中的价格验证
$("#s_table_tbody").on("blur", "td input[name='sku_price']", function() {
	// 获取当前的input的value
	var val = $(this).val();
	// 把当前元素的下一个元素删除
	$(this).next().remove();
	// 如果val为空或者等于0
	if (val == "" || val == 0) {
		// 改变颜色并且提示错误信息
		$(this).css({
			"border-color" : "#b94a48"
		});
		$(this).val(parseFloat(0).toFixed(2));
		$(this).after('<div style="color:#b94a48">价格最小为 0.01</div>');
		// 如果val不是数字类型的，则提示要输入数字
	} else if (!Number(val)) {
		$(this).css({
			"border-color" : "#b94a48"
		});
		$(this).after('<div style="color:#b94a48">请输入一个数字</div>');
		$(this).val("");//不是数字把值清空
		// 否则删除当前元素的下一个元素，并恢复颜色，并且保留两位小数
	} else {
		$(this).next().remove();
		$(this).css({
			"border-color" : "#ccc"
		});
		$(this).val(parseFloat(val).toFixed(2));
	}
});
// 商品信息下价格的设置
$("#s_table_tbody").on("input propertychange change","td input[name='sku_price']",function() {
			// 删除price下面的错误信息
			$("#price").parents(".controls").find(".error-message").remove();
			var value = $(this).val();
			if (!Number(value) && !(value == "")) {
				$("#price").parents(".control-group").addClass("error");
				$("#price").val(Number(value));
				$("#price").parents(".controls").append("<p class='help-block error-message'>商品价格必须大于0元。</p>")
			} else {
				var td = $("#s_table_tbody input[name='sku_price']");
				// 定义一个数组
				var numArr = [];
				for (var i = 0; i < td.length; i++) {
					var num = "";
					if ($(td[i]).val() == "") {
						num = 0;
					} else {
						num = parseFloat($(td[i]).val());
					}
					// 向数组中放值
					numArr.push(num);
				}
				$("#price").parents(".control-group").removeClass("error");
				// 价格取数组中的最小值
				$("#price").val(Math.min.apply(null, numArr));
			}
		});

// 规格值明细表格中的成本价验证
$("#s_table_tbody").on("blur", "td input[name='cost_price']", function() {
	var val = $(this).val();
	$(this).next().remove();
	if (val == 0 && val != "") {
		$(this).css({
			"border-color" : "#b94a48"
		});
		$(this).val(parseFloat(0).toFixed(2));
		$(this).after('<div style="color:#b94a48">价格最小为 0.01</div>');
	} else if (!Number(val) && val != "") {
		$(this).css({
			"border-color" : "#b94a48"
		});
		$(this).val(Number(val));
		$(this).after('<div style="color:#b94a48">请输入一个数字</div>');
	} else if (val == "") {
		$(this).next().remove();
		$(this).css({
			"border-color" : "#ccc"
		});
	} else {
		$(this).next().remove();
		$(this).css({
			"border-color" : "#ccc"
		});
		$(this).val(parseFloat(val).toFixed(2));
	}
});

// 规格值明细表格中的库存验证
$("#s_table_tbody").on("blur", "td input[name='stock_num']", function() {
	var val = $(this).val();
	$(this).next().remove();
	if (val == "") {
		$(this).css({
			"border-color" : "#b94a48"
		});
		$(this).after('<div style="color:#b94a48">库存不能为空</div>');
	} else if (!Number(val)) {
		$(this).css({
			"border-color" : "#b94a48"
		});
		$(this).after('<div style="color:#b94a48">请输入一个数字</div>');
		$(this).val("");//不是数字把值清空
	} else {
		$(this).next().remove();
		$(this).css({
			"border-color" : "#ccc"
		});
	}
});
$("#s_table_tbody").on("input propertychange change","td input[name='stock_num']", function() {
			var value = $(this).val();
			if (!Number(value) && !(value == "") && value != 0) {
				$("#gross_inventory .control-label").css("color", "#b94a48");
				$("#gross_inventory .inline").css("color", "#b94a48");
				$("#gross_inventory .help-block").show();
				$("#hide_stock").css("border-color", "#b94a48");
				$("#store_count").val(Number(value));
			} else {
				var td = $("#s_table_tbody input[name='stock_num']");
				var num = 0;
				for (var i = 0; i < td.length; i++) {
					if ($(td[i]).val() == "") {
						num += 0;
					} else {
						num += parseFloat($(td[i]).val());
					}
				}
				$("#gross_inventory .control-label").attr("style", "");
				$("#gross_inventory .inline").attr("style", "");
				$("#gross_inventory .help-block").hide();
				$("#hide_stock").attr("style", "");
				$("#store_count").val(num);
			}
		});
		$("#store_count").on("blur",function() {
			if (!Number($(this).val()) && !($(this).val() == 0)) {
				$(this).siblings(".error-message").show();
				$(this).siblings(".inline").css("color", "rgb(185, 74, 72)");
				$(this).parent().siblings(".control-label").css("color",
						"rgb(185, 74, 72)");
			} else {
				$(this).siblings(".error-message").hide();
				$(this).siblings(".inline").attr("style", "");
				$(this).parent().siblings(".control-label").attr("style", "");
			}
		});
		//光标离开验证价格
		$("#price").on("blur",function() {
			$(this).parents(".controls").find(".error-message").remove();
			if ($(this).val() == 0) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append(
						"<p class='help-block error-message'>商品价格必须大于0元。</p>")
			} else if (!Number($(this).val())) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append(
						"<p class='help-block error-message'>商品价格不能为空。</p>");
				$(this).val("")
			} else {
				$(this).parents(".control-group").removeClass("error");
				$(this).val(Number(($(this).val())).toFixed(2));
			}
		});
		//光标离开验证单价商品重量
		$("#goods_gweight").on("blur",function() {
			$(this).parents(".controls").find(".error-message").remove();
			if ($(this).val() == 0) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append("<p class='help-block error-message'>单价商品重量必须大于0。</p>")
			} else if (!Number($(this).val())) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append("<p class='help-block error-message'>单价商品重量不能为空。</p>");
				$(this).val("")
			} else {
				$(this).parents(".control-group").removeClass("error");
				$(this).val(Number(($(this).val())).toFixed(2));
			}
		});
		//光标离开验证单价商品毛重
		$("#goods_pkg_gweight").on("blur",function() {
			$(this).parents(".controls").find(".error-message").remove();
			if ($(this).val() == 0) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append("<p class='help-block error-message'>单价商品毛重必须大于0。</p>")
			} else if (!Number($(this).val())) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append("<p class='help-block error-message'>单价商品毛重不能为空。</p>");
				$(this).val("")
			} else {
				$(this).parents(".control-group").removeClass("error");
				$(this).val(Number(($(this).val())).toFixed(2));
			}
		});
		// 验证原始价格
		$("#original_price").on("blur",function() {
			$(this).parents(".controls").find(".error-message").remove();
			if ($(this).val() == "") {
				$(this).parents(".control-group").removeClass("error");
			} else if (!Number($(this).val())) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append("<p class='help-block error-message'>原始价格必须为数字。</p>");
				$(this).val("");
			} else {
				$(this).parents(".control-group").removeClass("error");
				$(this).val(Number(($(this).val())).toFixed(2));
			}
		});
		$("#postage").on("blur",function() {
			$(this).parents(".controls").find(".error-message").remove();
			if (!Number($(this).val()) && !($(this).val() == 0)) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append(
						"<p class='help-block error-message'>邮费必须为数字。</p>")
			} else {
				$(this).parents(".control-group").removeClass("error");
				$(this).val(Number(($(this).val())).toFixed(2));
			}
		});
		$("#limit_buy").on("blur",function() {
			$(this).parents(".controls").find(".error-message").remove();
			if (!Number($(this).val()) && !($(this).val() == 0)) {
				$(this).parents(".control-group").addClass("error");
				$(this).parents(".controls").append(
						"<p class='help-block error-message'>限购数量必须是数字。</p>")
			} else {
				$(this).parents(".control-group").removeClass("error");
			}
		});
$(function() {
	// 设置当前要拖拽的元素，声明当前拖拽元素的状态为false
	var dragState = false;
	// 声明拖拽元素是第几个，拖拽元素的高度，拖拽元素中心位置，拖拽元素宽度
	var thisDivId = 0, thisDivHeight = 0, thisDivCenter = 0, thisDivWidth = 0;
	// 声明鼠标的偏移量(鼠标在元素中的位置)
	var range = {
		x : 0,
		y : 0
	};
	// 声明拖拽元素的四个坐标
	var thisCoord = {
		x : 0,
		y : 0,
		x1 : 0,
		y1 : 0
	};
	// 设置新添加的元素
	var newDiv = null;
	// 设置目标div
	var tarDiv = null;
	// 设置目标div的坐标
	var tarCoord = {
		x : 0,
		y : 0,
		x1 : 0,
		y1 : 0
	};
	// 声明拖拽元素右边对应的元素
	var rightDiv = "";
	// 为每一个module_div绑定mousedown事件
	$("#img_ul").on("mousedown","li",function(e) {
				// 将thisDiv清空
				thisDiv = null;
				// 获取当前元素的top值
				var top = $(this).position().top;
				// 如果当前点击的是最后一个元素，则图退出函数
				if (!($(this).hasClass("sort")))
					return false;
				// 设置thisDiv为当前点击的元素
				thisDiv = $(this);
				// 设置thisDivId为当前元素的位置
				thisDivId = $(this).index();
				// 设置thisDivHeight为当前元素的高度
				thisDivHeight = $(this).height();
				// 设置thisDivHeight为当前元素的宽度
				thisDivWidth = $(this).width();
				// 设置thisDivCenter为当前元素的中心
				thisDivCenter = thisDivHeight / 2;
				// 改变拖拽元素的拖拽状态为true
				dragState = true;
				// 设置鼠标元素相对偏移量(鼠标在元素中的位置)
				range.x = e.pageX - thisDiv.offset().left;
				range.y = e.pageY - thisDiv.offset().top;
				// 设置拖拽元素的定位状态为relative,并设置更改class
				thisDiv.attr("class", "");
				var li_left = $(this).offset().left
						- $(this).parent().offset().left;
				thisDiv.css({
					width : thisDivWidth + "px",
					height : thisDivHeight + "px",
					position : "absolute",
					"z-index" : 5,
					"left" : li_left
				});
				// 新建一个新的div并放在拖拽元素的下方
				var html = "<li class='newDiv' style='width: " + thisDivWidth
						+ "px;height:" + thisDivHeight
						+ "px;border: 1px dotted #000;'>";
				html += "</li>";
				thisDiv.after(html);
			});
	$("#img_ul").on("mousemove", function(e) {
		e.preventDefault();
		// 如果拖拽元素的拖拽状态为true则继续执行，否则退出函数
		if (!dragState)
			return false;
		// 设置拖拽元素改变之后的坐标
		thisCoord.x = e.pageX - $(this).offset().left - range.x;
		thisCoord.y = e.pageY - $(this).offset().top - range.y;
		thisCoord.y1 = thisCoord.y + thisDivHeight;
		// 改变拖拽元素的位置
		thisDiv.css({
			left : thisCoord.x,
			top : 0
		});
		// 设置newDiv为新建的div
		newDiv = $("#img_ul .newDiv");
		// 重新获取module下面的元素
		var anew = $("#img_ul>li");
		// 对新获取的元素进行循环
		anew.each(function() {
			// 获取目标元素的坐标值
			tarDiv = $(this);
			var ul_left = $(tarDiv).parent().offset().left;
			tarCoord.x = tarDiv.offset().left + 31;
			tarCoord.y = tarDiv.offset().top - 82 + $(this).width() / 2;
			if ($(this).hasClass("sort")) {
				if (thisCoord.x + thisDivWidth < 62) {
					newDiv.insertBefore($(anew[0]));
				} else if (thisCoord.x + thisDivWidth >= tarCoord.x - ul_left) {
					newDiv.insertAfter(tarDiv);
				}
			}
		});
	}).mouseup(function() {
		// 如果thisDiv为空，则退出函数，否则继续执行
		if (thisDiv == null)
			return false;
		// 将拖拽元素放在新建元素上
		thisDiv.insertBefore(".newDiv");
		// 删除新建的div
		$("#img_ul .newDiv").remove();
		// 将thisDiv的定位状态回归原样，并将class恢复
		thisDiv.attr("class", "sort");
		thisDiv.attr("style", "");
		if (!dragState)
			return false;
		// 将拖拽元素的状态改为false
		dragState = false;
	});

	// 为每一个module_div绑定mousedown事件
	$("#img_pro_ul").on("mousedown","li",function(e) {
				// 将thisDiv清空
				thisDiv = null;
				// 获取当前元素的top值
				var top = $(this).position().top;
				// 如果当前点击的是最后一个元素，则图退出函数
				if (!($(this).hasClass("sort")))
					return false;
				// 设置thisDiv为当前点击的元素
				thisDiv = $(this);
				// 设置thisDivId为当前元素的位置
				thisDivId = $(this).index();
				// 设置thisDivHeight为当前元素的高度
				thisDivHeight = $(this).height();
				// 设置thisDivHeight为当前元素的宽度
				thisDivWidth = $(this).width();
				// 设置thisDivCenter为当前元素的中心
				thisDivCenter = thisDivHeight / 2;
				// 改变拖拽元素的拖拽状态为true
				dragState = true;
				// 设置鼠标元素相对偏移量(鼠标在元素中的位置)
				range.x = e.pageX - thisDiv.offset().left;
				range.y = e.pageY - thisDiv.offset().top;
				// 设置拖拽元素的定位状态为relative,并设置更改class
				thisDiv.attr("class", "");
				var li_left = $(this).offset().left
						- $(this).parent().offset().left;
				thisDiv.css({
					width : thisDivWidth + "px",
					height : thisDivHeight + "px",
					position : "absolute",
					"z-index" : 5,
					"left" : li_left
				});
				// 新建一个新的div并放在拖拽元素的下方
				var html = "<li class='newDiv' style='width: " + thisDivWidth
						+ "px;height:" + thisDivHeight
						+ "px;border: 1px dotted #000;'>";
				html += "</li>";
				thisDiv.after(html);
			});
	$("#img_pro_ul").on("mousemove", function(e) {e.preventDefault();
		// 如果拖拽元素的拖拽状态为true则继续执行，否则退出函数
		if (!dragState)
			return false;
		// 设置拖拽元素改变之后的坐标
		thisCoord.x = e.pageX - $(this).offset().left - range.x;
		thisCoord.y = e.pageY - $(this).offset().top - range.y;
		thisCoord.y1 = thisCoord.y + thisDivHeight;
		// 改变拖拽元素的位置
		thisDiv.css({
			left : thisCoord.x,
			top : 0
		});
		// 设置newDiv为新建的div
		newDiv = $("#img_pro_ul .newDiv");
		// 重新获取module下面的元素
		var anew = $("#img_pro_ul>li");
		// 对新获取的元素进行循环
		anew.each(function() {
			// 获取目标元素的坐标值
			tarDiv = $(this);
			var ul_left = $(tarDiv).parent().offset().left;
			tarCoord.x = tarDiv.offset().left + 31;
			tarCoord.y = tarDiv.offset().top - 82 + $(this).width() / 2;
			if ($(this).hasClass("sort")) {
				if (thisCoord.x + thisDivWidth < 62) {
					newDiv.insertBefore($(anew[0]));
				} else if (thisCoord.x + thisDivWidth >= tarCoord.x - ul_left) {
					newDiv.insertAfter(tarDiv);
				}
			}
		});
	}).mouseup(function() {
		// 如果thisDiv为空，则退出函数，否则继续执行
		if (thisDiv == null)
			return false;
		// 将拖拽元素放在新建元素上
		thisDiv.insertBefore(".newDiv");
		// 删除新建的div
		$("#img_pro_ul .newDiv").remove();
		// 将thisDiv的定位状态回归原样，并将class恢复
		thisDiv.attr("class", "sort");
		thisDiv.attr("style", "");
		if (!dragState)
			return false;
		// 将拖拽元素的状态改为false
		dragState = false;
	});
});
$("#img_ul").on("mousedown", "a.js-delete-picture", function(e) {
	e.stopPropagation();
});
$("#img_ul").on("mouseup", "a.js-delete-picture", function(e) {
	e.stopPropagation();
	var url = $(this).attr("name");
	var iul = document.getElementById("img_ul");
	var ili = document.getElementById(url + "_li");
	$(this).parent("li").remove();
	for (var i = 0; i < phoArr.length; i++) {
		if (phoArr[i] == url) {
			phoArr.splice(i, 1);
			break;
		}
	}
});
$("#img_pro_ul").on("mousedown", "a.js-delete-picture", function(e) {
	e.stopPropagation();
});
$("#img_pro_ul").on("mouseup", "a.js-delete-picture", function(e) {
	e.stopPropagation();
	var url = $(this).attr("name");
	var iul = document.getElementById("img_pro_ul");
	var ili = document.getElementById(url + "_pro");
	$(this).parent("li").remove();
	for (var i = 0; i < proArr.length; i++) {
		if (proArr[i] == url) {
			proArr.splice(i, 1);
			break;
		}
	}
});
/**
 * 获取最终的商品图片或商品属性图片数组
 * 
 */
function changePicArr() {
	phoArr = []; // 商品图片数组初始化
	var anew = $("#img_ul>li>a");
	anew.each(function() {
		// 获取目标元素的url
		var url = $(this).attr("name");
		if (url && url != undefined) {
			phoArr.push(url);
		}
	});
	proArr = []; // 商品属性图片数组初始化
	anew = $("#img_pro_ul>li>a");
	anew.each(function() {
		// 获取目标元素的url
		var url = $(this).attr("name");
		if (url && url != undefined) {
			proArr.push(url);
		}
	});
}

//*********以下与商品视频和视频封面有关
//商品编辑时，视频和封面回填
function editaVideoInfo(data){
	if(data.details_video!=null &&data.details_video!=""){  //有视频
		//隐藏掉上传视频的按钮
		isShowUpVideoBtn(1);
		renderVideoUrl(data.details_video);
	}
   /*if(data.details_video_img!=null &&data.details_video_img!=""){  //有封面
	   renderVideoImgUrl(data.details_video_img);
	}*/
}


//上传商品视频和封面  
function uploadVideoInfo(upload){
	 upload.render({
		    elem: '#upload_details_video'
		    ,url : getRootPath() + '/uploadCommon/uploadInfo.action?type=video'
		    ,accept: 'video' //视频
		    ,before: function(obj){
		    	obj.preview(function(index, file, result){
		    		//隐藏掉上传视频的按钮
					isShowUpVideoBtn(1);
			    	uploading();
					//处理上传
		    		var url = URL.createObjectURL(file)
		    		renderVideoUrl(url);
				})
			}
		    ,done: function(res){
		    	$("#details_video").val(res.filePath);
		    },error: function(){
				alertErrorMsg("视频上传失败");
				deleteVideo();
		    }
		  });
	   //上传视频封面图
	  /* layui.upload.render({
	   	elem : '#upload_details_video_img',
	   	url : getRootPath() + '/uploadCommon/uploadInfo.action?type=pic',
	   	ext: 'jpg|png|gif',
	   	multiple: true,
	   	acceptMime: 'image/*',
	   	before: function(obj) {
	   		obj.preview(function(index, file, result){
	    		uploading();
		   		disable_submit(true,'upload_details_video_img');
			})
	   		
	   	},
	   	done: function(res) {
	   		renderVideoImgUrl(res.filePath);
	   		disable_submit(false,'upload_details_video_img');
	   	},
	   	error: function() {
	   		disable_submit(false,'upload_details_video_img');
	   	}
	   });*/
}

//上传按钮的隐藏  0:显示   1:隐藏
function isShowUpVideoBtn(index){
	if (index == 0){
		$('#upload_details_video').show()
	}else{
		$('#upload_details_video').hide()
	}
}
//渲染视频
function renderVideoUrl(FilePath) {
	$("#videoUrl").show();
	var str = "<div style=''id='splice'>"
		+ "<div style='position:relative'>"
		+ "<video id='video' controls='controls'style='width:200px;'><source src='"+ FilePath + "'></video>"
		+ "<a href='#' class='close-modal js-delete-goods small' style='cursor: pointer;' title='删除' onclick='deleteVideo()'> 删除</a>"
		+ "</div>"
		+ "<div>";
	$("#videoUrl").html(str);
	
}
//删除视频
function deleteVideo() {
	$("#videoUrl div").remove(); 
	$("#videoUrl").hide();
	isShowUpVideoBtn(0);
	$("#details_video").val("");
}
function alertErrorMsg(msg) {
	layer.msg(msg,{
		icon:2,
		time:2000
	})
}


//渲染图片
/*function renderVideoImgUrl(filePath) {
	$("#img_urls li").remove(); 
	var imUrlStyle = "";
	var imgUrls = "";
	imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+filePath+'\');"></a>';
	imUrlStyle += '<a class="close-modal js-delete-goods small" style="cursor: pointer;" title="删除"  onclick="deleteVideoImgUrl()">x</a></li>';
	$("#img_urls").html(imUrlStyle);
	$("#details_video_img").val(filePath);
}*/

//删除视频封面图片
function deleteVideoImgUrl(){
	$("#img_urls").html("");
	$("#details_video_img").val("");
}
//上传进度显示	
 function uploading(){
	parent.document.getElementById("upload_speed").innerHTML='上传准备中...';
	parent.document.getElementById("upload_mask").style.display="block";
    var timer = setInterval(function(){
	      $.ajax({
	  		url : getRootPath()+ '/uploadCommon/queryUploadInfo.action',
	  		type : 'POST',
	  		dataType : 'json',
	  		success : function(result){
	  			 if(result){
	  				  var speed=result.speed;               //本次获得的上传进度
	  				  var filePath=result.filePath;         //上传的文件路径
	  				  if(speed=="100" || speed=="-1"){      //100：上传完毕100%;-1://上传失败,需要重新上传    这里自己进行处理 获取文件路径
	  					 clearInterval(timer);
	  					 parent.document.getElementById("upload_speed").innerHTML=(speed=="-1")?'上传失败！请重新上传':'已上传'+parseInt(speed)+'%';
	  					 setTimeout('parent.document.getElementById("upload_mask").style.display="none"',500);
	  				  }else if(speed!="0"){
		  				 parent.document.getElementById("upload_speed").innerHTML='已上传'+parseInt(speed)+'%';
		  			 }
	  			 }
	  		}
	  	});
    }, 10);
}
//************************

