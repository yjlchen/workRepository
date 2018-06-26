var commodity_id = getUrlParam("id");; // 商品id
var phoArr = []; // 用于记录商品图片
var proArr = []; // 用于记录商品属性图片
var messArr = [];// 记录留言id的数组
var spe_id; // 记录选择要进行图片上传的规则值id
var element ;
$(function() {
	initgroup(); //商品所属分组
	initlabel(); // 商品标签下拉框
	initBrandAndCountry(); // 商品品牌和所属国家下拉框
});

//layui.use([ 'form', 'element', 'layer', 'laydate' ], function() {
//	var form = layui.form()
//	element = layui.element(), laydate = layui.laydate, layer = layui.layer;
//	initEvent();
//	initEdit();
//	form.render(); // 更新全部
//})
layui.use([ 'form', 'element', 'layer', 'laydate','upload' ], function() {
	var form = layui.form;
	element = layui.element;
	var laydate = layui.laydate;
	var layer = layui.layer ;
	var upload = layui.upload;
	initEvent();
	initEdit();
	uploadVideoInfo(upload);  //上传商品视频和封面
	form.render(); // 更新全部
	
})
/**
 * 事件初始
 */
function initEvent() {
	// 跳转回商品管理列表页
	$("#to_commodity").click(function() {
		var data_pjax = $("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		parent.document.getElementById(data_pjax).src = getRootPath()+ "/pages/commodity/manage_hongkong/commodityList.jsp"
	});
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
	//var details_video_img=$("#details_video_img").val();  //视频封面
	var details_video=$("#details_video").val();  //视频地址
	if(iswareHouseManager == 1) {
		// 仓库管理人员
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
		} else if ( details_video!="" && details_video_img =="") {
			alert_mess('请选择商品视频封面');
		} */
		else { 
			if (tabTag != null) {
				tag = true;
			} else {
				element.tabChange('commodityTab', 1);
			}
		}
		return tag;
	} else {
		// 其他
		// 验证商品标签必须选择
		var commodity_label = $("#label_id").val();
		if (!commodity_label || commodity_label == null || commodity_label == "" || commodity_label.length == 0) {
		    alert_mess('请选择商品标签');
		}
		/*else if ( details_video=="" && details_video_img !="") {
			alert_mess('请选择商品视频');
		} else if ( details_video!="" && details_video_img =="") {
			alert_mess('请选择商品视频封面');
		} */
		else { 
			if (tabTag != null) {
				tag = true;
			} else {
				element.tabChange('commodityTab', 1);
			}
		}
		return tag;
	}
	
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
	str += "src='" + url + "' class='js-img-preview'>";
	if(iswareHouseManager == 1) {
		str += " <a class='js-delete-picture close-modal small hide' name='"
			+ url + "'>×</a></li>";
	}
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
	str += "src='" + url + "' class='js-img-preview'>"; 
	if(iswareHouseManager == 1) {
		str += " <a class='js-delete-picture close-modal small hide' name='"
			+ url + "'>×</a></li>";
	}
	proArr.push(url);
	$("#img_pro_ul").prepend(str);
}

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
	//var details_video_img=$("#details_video_img").val();  //视频封面
	var details_video=$("#details_video").val();          //视频地址
	/*if ( details_video=="" && details_video_img !="") {
		alert_mess('请选择商品视频');
		return;
	} else if ( details_video!="" && details_video_img =="") {
		alert_mess('请选择商品视频封面');
		return;
	}*/
	changePicArr();
	var goodinfoJson = {};
	if(iswareHouseManager == 1) {alert(111);
		var after_days = $("#after_days").val(); // 付款成功后几天发货
		if (after_days == "") {
			after_days = 0;
		}
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
		var limit_buy = $("#limit_buy").val(); // 每人限购
		if (limit_buy == "") {
			limit_buy = 0;
		}
		var unreal_total_sales = $("#unreal_total_sales").val();
		if (unreal_total_sales == "") {
			unreal_total_sales = 0;
		}
		var preview_content = $("#goodDetailDiv").html();
		if(preview_content == '<p><br></p>') {
			preview_content = '<h4>商品详情区</h4><p>点击进行编辑</p>';
		}
		// 仓库管理人员
		goodinfoJson = {
				"commodity_group_id": $("#group_id").val(),
				"after_days" : after_days,
				"store_count" : $("#store_count").val(),
				"merchant_code" : $("#merchant_code").val(),
				"commodity_name" : $("#commodity_name").val(),
				"price" : $("#price").val(),
				"original_price" : original_price,
				"img_path_str" : img_path_str,
				"attribute_path_str" : img_pro_path_str,
				"postage" : $("#postage").val(),
				"limit_buy" : limit_buy,
				"recurrence_ratio" : $("#recurrence_ratio").val(),
				"brand_id" : $("#brand_id").val(),
				"country_id" : $("#country_id").val(),
				"commodity_url" : commodityDetailPath,
				"unreal_total_sales" : unreal_total_sales,
				"goods_barcode":$("#goods_barcode").val(),
				"goods_size":$("#goods_size").val(),
				"goods_gweight":$("#goods_gweight").val(),
				"goods_pkg_gweight":$("#goods_pkg_gweight").val(),
				"ycg_code":$("#ycg_code").val(),
				"hs_code":$("#hs_code").val(),
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
				display_stock_flag: 1,
				edit_content:  $("#total").html(),
				preview_content: preview_content
			}
	} else {
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
		goodinfoJson = {
			is_dutyfree: $("#is_dutyfree").val(),
			jsonlabels: jsonlabels,
			edit_content:  $("#total").html(),
			preview_content: $("#goodDetailDiv").html(),
			"details_video": $("#details_video").val(),
			//"details_video_img": $("#details_video_img").val()
		}
	}
	console.info(goodinfoJson);
	$.ajax({
		url : getRootPath() + "/commodity/updateHongKongCommodityInfo.action",
		type : "post",
		async : false,
		"dataType" : "TEXT",
		data : {
			id: commodity_id==null?"":commodity_id,
			infoJsonStr: JSON.stringify(goodinfoJson)
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
							+ '/pages/commodity/manage_hongkong/commodityList.jsp?store_count=' + $("#store_count").val();
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

/** ************************以下为编辑信息时代码****************************** */
function initEdit() {
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
//				if(gdata.data.preview_content == undefined || gdata.data.preview_content == null
//						|| gdata.data.preview_content == '') {
//					gdata.data.preview_content = "<h4>商品详情区</h4><p>点击进行编辑</p>";
//				}
				opera_groupList(gdata.groupList); //商品分组表
				opera_labelList(gdata.labelList); // 商品标签表
				opera_info(gdata.data);
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
	var goodDetailDiv = $("#goodDetailDiv").html()
//	ue.addListener("ready", function() {
//		ue.setContent(goodDetailDiv, false);
//	});
	if (goodDetailDiv == undefined || goodDetailDiv == null ||
			(goodDetailDiv.indexOf("<h4>商品详情区</h4>") != -1 && goodDetailDiv.indexOf("<p>点击进行编辑</p>") != -1)) {
		ue.addListener("ready", function() {
			ue.setContent("", false);
		});
	} else {
		ue.addListener("ready", function() {
			ue.setContent(goodDetailDiv, false);
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
/* if(data.details_video_img!=null &&data.details_video_img!=""){  //有封面
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
	   /*layui.upload.render({
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
/*function deleteVideoImgUrl(){
	$("#img_urls").html("");
	$("#details_video_img").val("");
}*/
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