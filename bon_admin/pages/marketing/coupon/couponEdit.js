//定义优惠券商品数组
var couponCommodityArr = [];

$(function(){  
	  initMembercardData();
	  initMemberLabelData();
});

layui.use(['form','element','layer','laydate'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	 ,laydate = layui.laydate
	  ,layer = layui.layer;
	  initEdit();
	  form.render(); //更新全部
})


//点击取消
$(".js-btn-quit").click(function(){
	//返回列表
	location.href = "couponList.jsp";
})


//优惠券名称
$("#coupon_right input[name='name']").on("blur",function(){
	var ex=/^[ ]*$/;
	var txt=$(this).val();
	$(this).next().remove();
	if(txt==""){
		$(this).parents(".control-group").addClass("error");
		var html='<p class="help-block error-message">优惠券名称必须在 1-10 个字内</p>';
		$(this).parent().append(html);
	}else if(ex.test(txt)){
		$(this).parents(".control-group").addClass("error");
		var html='<p class="help-block error-message">优惠券名称必须在 1-10 个字内</p>';
		$(this).parent().append(html);
	}else{
		$(this).parents(".control-group").removeClass("error");
	}
	$("#coupon_left .ump-coupon-detail-wrap .promote-card-name").text(txt);
});
//发放的优惠券总数
$("#coupon_right input[name='release_num']").on("blur",function(){
	var ex=/^[1-9]\d*$/;
	var num=Number($(this).val());
	$(this).next().remove();
	if(ex.test(num)){
		$(this).parents(".control-group").removeClass("error");
	}else{
		$(this).parents(".control-group").addClass("error");
		var html='<p class="help-block error-message">发放总量必须是一个整数</p>';
		$(this).parent().append(html);
	}
});
//指定金额第一个input框
$("#coupon_right input[name='offer_data_start']").on("blur",function(){
	var ex=/^(?=.*[1-9])\d+(\.\d{1,2})?$/;
	var val_num=Number($(this).val());
	$(this).parents(".controls").children("p").remove();
	if(!ex.test(val_num)||val_num==0){
		$(this).parents(".control-group").addClass("error");
		var html='<p class="help-block error-message">优惠券面值必须大于等于 0.01 元</p>';
		$(this).parents(".controls").append(html);
		if($("#coupon_right input[name='offer_data_end']").length>0){
			var valto_num=Number($("#coupon_right input[name='offer_data_end']").val());
			if(!ex.test(valto_num)||valto_num==0){
				var num="0.00";
			}else{
				var num="0.00 ~ "+valto_num;
			}
		}else{
			var num="0.00";
		}
	}else if(val_num!=""){
		$(this).parents(".control-group").removeClass("error");
		if($("#coupon_right input[name='offer_data_end']").length>0){
			var valto_num=Number($("#coupon_right input[name='offer_data_end']").val());
			if(!ex.test(valto_num)||valto_num==0){
				var num=val_num;
			}else{
				var num=val_num+" ~ "+valto_num;
			}
		}else{
			var num=val_num;
		}
	}
	$("#coupon_left .ump-coupon-detail-wrap .assign i").text(num);
});
//指定金额第二个input框
$("#coupon_right").on("blur","input[name='offer_data_end']",function(){
	var ex=/^[1-9]\d*$/;
	var val_num=$("#coupon_right input[name='offer_data_start']").val();
	var valto_num=Number($(this).val());
	if(!ex.test(valto_num)||valto_num==0){
		$(this).parents(".control-group").addClass("error");
		var html='<p class="help-block error-message">优惠券面值必须大于等于 1 元</p>';
		$(this).parents(".controls").append(html);
		if(!ex.test(val_num)||val_num==0){
			val_num=0.00;
		}
		var num=val_num;
	}else if(valto_num!=""){
		$(this).parents(".control-group").removeClass("error");
		if(!ex.test(val_num)||val_num==0){
			val_num="0.00";
		}
		var num=val_num+" ~ "+valto_num
	}
	$("#coupon_left .ump-coupon-detail-wrap .assign i").text(num);
});

//指定金额的随机选项
$("#coupon_right input[name='is_random']").on("click",function(){
	var check=$(this).prop("checked");
	if(check){
		var html='<span class="js-random" style="margin-right:5px;">至';
			html+='<input type="number" name="offer_data_end" class="input-small" style="margin:0 5px;" value="">';
			html+='元</span>';
		$(this).parent().before(html);
	}else{
		$(this).parent().prev().remove()
	}
});

//优惠形式的选择
$("#coupon_right input[name='offer_type']").on("click",function(){
	var size=$(this).val();
	$(this).parent().next().show();
	if(size=="1"){
		$("#coupon_right input[name='offer_type'][value='2']").parent().next().hide();
		$("#coupon_left .ump-coupon-detail-wrap .discount").hide();
		$("#coupon_left .ump-coupon-detail-wrap .assign").show();
		//清空折扣文本框的值
		$("input[name='offer_discount']").val("");
	}else if(size=="2"){
		$("#coupon_right input[name='offer_type'][value='1']").parent().next().hide();
		$("#coupon_right input[name='offer_type'][value='1']").parents(".control-group").removeClass("error");
		$("#coupon_left .ump-coupon-detail-wrap .discount").show();
		$("#coupon_left .ump-coupon-detail-wrap .assign").hide();
		//清空指定金额面值文本框的值
		$("input[name='offer_data_start']").val("");
	}
});
//选择折扣
$("#coupon_right input[name='offer_discount']").on("blur",function(){
	var num=parseFloat($(this).val());
	$(this).parents(".controls").children(".error-message").remove();
	if(num>9.9||num<1.0){
		var html='<p class="help-block error-message">请设置1.0~9.9折之间的折扣额度</p>';
		$(this).parents(".control-group").addClass("error");
		$(this).parents(".controls").append(html);
		$("#coupon_left .ump-coupon-detail-wrap .discount").text("0折");
	}else{
		$("#coupon_left .ump-coupon-detail-wrap .discount").text(num+"折");
	}
});
//使用门槛选择
$("#coupon_right input[name='threshold']").on("click",function(){
	var size=$(this).val();
	if(size=="1"){
		$(this).parents(".controls").children("p").show();
		$("#coupon_right input[name='threshold'][value='2']").parents(".controls").children("p").hide();
		$("#coupon_left .ump-coupon-detail-wrap .promote-limit").html("无限制");
		//清空满多少元可用文本框的值，并让它disabled
		$("input[name='threshold_money']").val("");
		$("input[name='threshold_money']").attr("disabled",true);
	}else if(size=="2"){
		$("input[name='threshold_money']").attr("disabled",false);
		$(this).parents(".controls").children("p").show();
		$("#coupon_right input[name='threshold'][value='1']").parents(".controls").children("p").hide();
		var num=$(this).next().val();
		if(num==""){
			num="xx";
		}
		$("#coupon_left .ump-coupon-detail-wrap .promote-limit").html("订单满 "+num+" 元 (不含运费)");
	}
});
//满多少元离开事件
$("#coupon_right input[name='threshold_money']").on("blur",function(){
	$(this).next().remove();
	var num=Number($(this).val());
	var ex=/^[1-9]\d*$/;
	if(ex.test(num)){
		$(this).parents(".control-group").removeClass("error");
	}else{
		$(this).parents(".control-group").addClass("error");
		var html='<p class="help-block error-message">满减必须是一个正整数</p>';
		$(this).parent().append(html);
		num=0;
	}
	$("#coupon_left .ump-coupon-detail-wrap .promote-limit").html("订单满 "+num+" 元 (不含运费)");
});
//有效期的选择
$("#coupon_right input[name='valid_type']").on("click",function(){
	var size=$(this).val();
	$(this).parents(".controls").find(".fixed-term>input").remove();
	$(this).parents(".controls").find(".fixed-term>i").remove();
	if(size=="1"){
		$(this).parent().next().show();
		$(this).parents(".controls").find(".fixed-term>label").after('<i>N</i>');
		var date1_txt=$("#date1").val();
		var date2_txt=$("#date2").val();
		if(date1_txt==""){
			if(date2_txt==""){
				var txt= "有效日期： 20xx : 00 : 00 - 20xx : 00 : 00"; 
			}else{
				var txt= "有效日期： 20xx : 00 : 00 - "+date2_txt;
			}
		}else{
			if(date2_txt==""){
				var txt= "有效日期： "+date1_txt+" - 20xx : 00 : 00";  
			}else{
				var txt= "有效日期： "+date1_txt+" - "+date2_txt;
			}
		}
		$("#coupon_left .ump-coupon-detail-wrap .validity").html(txt);
	}else if(size=="2"){
		$(this).parents(".controls").find("div:eq(0)>div").hide();
		$(this).parents(".controls").find(".fixed-term>label").after('<i>N</i>');
		$(this).parent().next().remove();
		$(this).parent().after('<input type="number" min="1" max="365" name="active_now_days" value="" class="input-small">');
		$("#coupon_left .ump-coupon-detail-wrap .validity").html("有效日期：领到券当日开始x天内有效");
	}else if(size=="3"){
		$(this).parents(".controls").find("div:eq(0)>div").hide();
		$(this).parents(".controls").find(".fixed-term>label").after('<i>N</i>');
		$(this).parent().next().remove();
		$(this).parent().after('<input type="number" min="1" max="365" name="active_next_days" value="" class="input-small">');
		$("#coupon_left .ump-coupon-detail-wrap .validity").html("有效日期：领到券次日开始x天内有效");
	}
});
//固定的有效日期
$("#coupon_right").on("change","#date1",function(){
	var date1_txt=$(this).val();
	var date2_txt=$("#date2").val();
	if(date2_txt==""){
		var txt= "有效日期： "+date1_txt+" - 20xx : 00 : 00"; 
	}else{
		var txt= "有效日期： "+date1_txt+" - "+date2_txt;
	}
	$("#coupon_left .ump-coupon-detail-wrap .validity").html(txt);
});
$("#coupon_right").on("change","#date2",function(){
	var date1_txt=$("#date1").val();
	var date2_txt=$(this).val();
	if(date1_txt==""){
		var txt= "有效日期：20xx : 00 : 00  - "+date2_txt; 
	}else{
		var txt= "有效日期： "+date1_txt+" - "+date2_txt;
	}
	$("#coupon_left .ump-coupon-detail-wrap .validity").html(txt);
});


//领到券当日开始 N 天内有效
$("#coupon_right").on("blur","input[name='active_now_days']",function(){
	var num=$(this).val();
	var ex=/^[1-9]\d*$/;
	$(this).parents(".controls").children("p").remove();
	if(ex.test(num)&&Number(num)<=365&&Number(num)>=1){
		$(this).parents(".control-group").removeClass("error");
		$("#coupon_left .ump-coupon-detail-wrap .validity").html("有效日期：领到券当日开始"+num+"天内有效");
	}else if(num==""){
		$(this).parents(".control-group").addClass("error");
		$(this).parents(".controls").append('<p class="help-block error-message">生效时间不能为空</p>');
	}else{
		$(this).parents(".control-group").addClass("error");
		$(this).parents(".controls").append('<p class="help-block error-message">生效天数必须在1到365之间</p>');
	}
});

//领到券次日开始 N 天内有效
$("#coupon_right").on("blur","input[name='active_next_days']",function(){
	var num=$(this).val();
	var ex=/^[1-9]\d*$/;
	$(this).parents(".controls").children("p").remove();
	if(ex.test(num)&&Number(num)<=365&&Number(num)>=1){
		$(this).parents(".control-group").removeClass("error");
		$("#coupon_left .ump-coupon-detail-wrap .validity").html("有效日期：领到券次日开始"+num+"天内有效");
	}else if(num==""){
		$(this).parents(".control-group").addClass("error");
		$(this).parents(".controls").append('<p class="help-block error-message">生效时间不能为空</p>');
	}else{
		$(this).parents(".control-group").addClass("error");
		$(this).parents(".controls").append('<p class="help-block error-message">生效天数必须在1到365之间</p>');
	}
});
//将	textarea中获取的值进行转换
var getFormatCode=function(strValue){  
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');  
} 
//使用说明
$("#coupon_right").on("blur","textarea[name='instructions']",function(){
	var txt=$(this).val();
	var shiftTxt=getFormatCode(txt);
	console.log(1);
	if(txt==""){
		$("#coupon_left .ump-coupon-detail-wrap .promote-desc span.js-desc-detail").text("暂无使用说明……");
	}else{
		$("#coupon_left .ump-coupon-detail-wrap .promote-desc span.js-desc-detail").html(shiftTxt);
	}
});

//可使用商品选择
$("#coupon_right input[name='is_all_use_flag']").on("click",function(){
	var txt=$(this).val();
	//适用全部商品
	if(txt=="1"){
		$(this).parents(".controls").next().hide();
	}else{
		//添加商品显示
		$(this).parents(".controls").next().show();
	}
});


//弹出选择商品的列表
function addCouponGoods(obj,flag){
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  //弹出商品选择框
		  parent.layer.open({
    		  title: ''
    		  ,type:2
    		  ,closeBtn: 1
    		  ,area:["700px","530px"]
    		  ,content:getRootPath()+'/commons/jsp/com_goods.jsp?mutl_type=2&marketing=coupon'
    		});
		})
}



//获取图片选择页面传入的图片数组，插入到图片
function get_goods_coupon(idArr){
	//table显示
	$("#coupon_commodity_table").css("display","block");
	if(idArr.length>0){
		for(var i=0;i<idArr.length;i++){
			$.ajax({
	        	"type":"post",
	            "url": getRootPath()+"/commodity/queryCommodityInfo.action",
	            async: false,//同步
	            'data' : {id:idArr[i]},
	            "dataType":"json",
	            'success' : function (data) {
	            	 var id = data.data.id;
	            	 var commodity_name = data.data.commodity_name;
	            	 var commodity_url = data.data.commodity_url;
	            	 var tr = 
	            		 	'<tr id="'+id+'">'
	            			+'<td>'
	            			+'	<a class="single-goods" target="_blank" href="'+commodity_url+'">'+commodity_name+'</a>'
	            			+'</td>'
	            			+'<td>'
	            			+'	<a href="javascript:void(0)" class="js-delete-goods" onclick=delCouponCommodity("'+id+'")>删除</a>'
	            			+'</td>'
	            			+'</tr>'
	            	 if($.inArray(id,couponCommodityArr)!=-1){
	            		 alert("已经添加这个商品了");
	            	 }else{
	            		 $("#coupon_commodity_table").find("tbody").append(tr);
	            		 couponCommodityArr.push(id);
	            	 }
	            },
	            'error':function(){
	            	
	            }
		    });
			
		}
	}
}

//删除添加的一个商品
function delCouponCommodity(id){
	//表格删掉这一行
	$("#"+id).remove();
	//数组删掉这个数据（字符位置，删除几个）
	couponCommodityArr.splice($.inArray(id,couponCommodityArr), 1);
	//数组清空时，表格隐藏
	if(couponCommodityArr.length<=0){
		$("#coupon_commodity_table").css("display","none");
	}
}



//点击保存
$("#saveCoupon").on("click",function(){
	//优惠券名称
	var name = $("#coupon_right input[name='name']").val();
	//发行总量
	var release_num = $("#coupon_right input[name='release_num']").val();
	//优惠形式
	var offer_type = $("#coupon_right input[name='offer_type']:checked").val();
	//指定金额的面值，也是随机优惠的开始金额
	var offer_data_start = $("#coupon_right input[name='offer_data_start']").val();
	if(offer_data_start==""){
		offer_data_start = null;
	}
	//随机优惠的结束金额
	var offer_data_end = $("#coupon_right input[name='offer_data_end']").val();
	if(offer_data_end==undefined){
		offer_data_end = null;
	}
	//折扣的值
	var offer_discount = $("#coupon_right input[name='offer_discount']").val();
	if(offer_discount==""){
		offer_discount = null;
	}
	//使用门槛
	var threshold = $("#coupon_right input[name='threshold']:checked").val();
	//满多少元可用
	var threshold_money = $("#coupon_right input[name='threshold_money']").val();
	if(threshold_money==""){
		threshold_money = null;
	}
	//会员等级
	var member_card_id = $("#coupon_right select[name='member_card_id']").val();
	//每人限领取
	var limit_num = $("#coupon_right select[name='limit_num']").val();
	//有效期类型
	var valid_type = $("#coupon_right input[name='valid_type']:checked").val();
	//固定日期生效时间
	var active_stime = $("#coupon_right input[name='active_stime']").val();
	//固定日期过期时间
	var active_etime = $("#coupon_right input[name='active_etime']").val();
	//当日开始几天内有效
	var active_now_days = $("#coupon_right input[name='active_now_days']").val();
	if(active_now_days==undefined){
		active_now_days = null;
	}
	//次日开始几天内有效
	var active_next_days = $("#coupon_right input[name='active_next_days']").val();
	if(active_next_days==undefined){
		active_next_days = null;
	}
	//是否到期提醒
	var to_remind;
	if($("#coupon_right input[name='to_remind']").prop('checked')){
		to_remind = 1;
	}else{
		to_remind = 0;
	}
	//是否允许分享领取链接
	var to_share_link;
	if($("#coupon_right input[name='to_share_link']").prop('checked')){
		to_share_link = 1;
	}else{
		to_share_link = 0;
	}
	//是否应用于全部商品
	var is_all_use_flag = $("#coupon_right input[name='is_all_use_flag']:checked").val();
	//如果选择应用于全部商品，则将优惠券商品表数组清空；选择部分商品不做处理
	if(is_all_use_flag==1){
		couponCommodityArr.splice(0,couponCommodityArr.length);
	}
	
	//是否仅原价购买商品时可用
	var use_detail_price;
	
	if($("#coupon_right input[name='use_detail_price']").prop('checked')){
		use_detail_price = 1;
	}else{
		use_detail_price = 0;
	}
	//使用说明
	var instructions = $("#coupon_right textarea[name='instructions']").val();
	//左侧的预览内容
	var preview_content = $("#coupon_left").html();
	//客户标签集合，多个用逗号分隔
	var syn_label = $("#coupon_right select[name='coupon_fans_tag']").val();
	if(syn_label==null){
		syn_label = "";
	}else{
		//目的是去掉中括号，及双引号
		syn_label = syn_label+"";
	}
	//新增时，让id变为""
	if(couponId==null){
		couponId ="";
	}
	//获得优惠券领取页链接(基础路径+优惠券id（在后台添加）)
	var coupon_url = getCouponPath;
	var couponInfoJson = {
			"id":couponId,
    		"name":name,
    		"release_num":release_num,
    		"offer_type":offer_type,
    		"offer_data_start":offer_data_start,
    		"offer_data_end":offer_data_end,
    		"offer_discount":offer_discount,
    		"threshold":threshold,
    		"threshold_money":threshold_money,
    		"member_card_id":member_card_id,
    		"limit_num":limit_num,
    		"valid_type":valid_type,
    		"active_stime":active_stime,
    		"active_etime":active_etime,
    		"active_now_days":active_now_days,
    		"active_next_days":active_next_days,
    		"to_remind":to_remind,
    		"to_share_link":to_share_link,
    		"is_all_use_flag":is_all_use_flag,
    		"use_detail_price":use_detail_price,
    		"instructions":instructions,
    		"syn_label":syn_label,
    		"preview_content":preview_content,
    		"coupon_url":coupon_url,
    		//以下列暂时未用到
    		"syn_card":0,
    		"card_color":"",
    		"card_title":"",
    		"card_subtitle":"",
    		"to_active":1,
    		"promotion_link":""
		};
	
	var jsonstr = JSON.stringify(couponInfoJson);
	
	//优惠券商品集合
    var goodsJsonStr='[';
	    if(couponCommodityArr.length>0){
	        for(var index in couponCommodityArr){  
	        	var commodity_id = couponCommodityArr[index];  
	        	 var tbody='{';
	    			tbody+='"id":"'+"";                      //主键
	    			tbody+='","commodity_id":"'+commodity_id;    
	    			tbody+='","coupon_id":"'+"";  
	    			tbody+='"}'; 
	    			if(goodsJsonStr.length>2){
	    				goodsJsonStr+=','+tbody;
	    			}else{
	    				goodsJsonStr+=tbody;
	    			}
	        }  
	    }
    goodsJsonStr+=']';
    if(coupon_validate()){
	    $.ajax({
	        url : getRootPath()+"/coupon/updateCoupon.action",
	        type : "post",
	        async: false,
	        "dataType":"TEXT",
	        data:{"infoJsonStr":jsonstr,"goodsJsonStr":goodsJsonStr},
	        success : function (gdata) {
	        	if(gdata=="success"){
	        		layer.msg("保存成功，正在重定向到预览页面", {
						  icon: 1,
						  time: 500 //（如果不配置，默认是3秒）
						}, function(){
							location.href = getRootPath()
							+ '/pages/marketing/coupon/couponList.jsp';
						});
	        	}else{
	        		disable_submit(true,'js-btn-add');
					disable_submit(true,'js-btn-save');
					disable_submit(true,'js-btn-preview');
	        		parent.layer.alert("保存失败");
	        	}
	        },
	        error:function(){
	        	disable_submit(true,'js-btn-add');
				disable_submit(true,'js-btn-save');
				disable_submit(true,'js-btn-preview');
	        	parent.layer.alert("保存失败");
			}
	    })
	}
});




//编辑时，初始化数据
function initEdit(){
	if(couponId!=null){
		queryCouponEditInfo();
	}  
}


//初始化会员卡下拉列表
function initMembercardData(){
	$.ajax({
        url : getRootPath()+"/membercard/queryMemberCardList.action",
        type : "post",
        async: false,
        "dataType":"json",
        success : function (gdata) {
        	if(gdata!=null){
        		 var glist=gdata.cardList;
  	             for(var i=0;i<glist.length;i++){
  	            	 var gindex=glist[i];
  	            	 var id=gindex.id;
  	            	 var member_name=gindex.member_name;
  	            	 $("#coupon_right select[name='member_card_id']").append("<option value='"+id+"'>"+member_name+"</option>"); 
  	             }
        	}
        }
    })
}



/**
 * 初始化客户标签列表
 */
function initMemberLabelData(){
		$.ajax({
	        url : getRootPath()+"/memberLabelInfo/queryLabelList.action",
	        type : "post",
	        async: false,
	        "dataType":"json",
	        success : function (gdata) {
	        	if(gdata!=null){
	        		 var glist=gdata.labelList;
	  	             for(var i=0;i<glist.length;i++){
	  	            	 var gindex=glist[i];
	  	            	 var id=gindex.id;
	  	            	 var label_name=gindex.label_name;
	  	            	$("#coupon_right select[name='coupon_fans_tag']").append("<option value='"+id+"'>"+label_name+"</option>"); 
	  	             }
	        	}
	        	
	        	//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#coupon_right select[name='coupon_fans_tag']").chosen();
	        }
	    })
}


//获取优惠券基本信息
function queryCouponEditInfo(){
	 $.ajax({
	        url : getRootPath()+"/coupon/queryCoupon.action",
	        type : "post",
	        dataType :"json",
	        data : {id:couponId},
	        success : function (gdata) {
	        	if(gdata){
	        		//加载优惠券基本信息
	        		opera_coupon_info(gdata.coupon,gdata.gooodsList);
	        		//加载客户标签信息
	        		opera_memberLabelList(gdata.coupon.syn_label);
	        	}
	        },
	        error:function(){
			}
	    })
}

//初始化优惠券基本信息
function opera_coupon_info(data,gooodsList){
	//给字段赋值
	$("#coupon_right input[name='name']").val(data.name);
	$("#coupon_right input[name='release_num']").val(data.release_num);
	//优惠形式选中
	$("#coupon_right input[name='offer_type'][value='"+data.offer_type+"']").attr("checked",true);
	//如果选择指定金额
	if(data.offer_type==1){
		//如果选择了随机，开始金额~结束金额
		if(data.offer_data_end!=null){
			//显示开始金额
			$("#coupon_right input[name='offer_data_start']").val(data.offer_data_start);
			//拼接上结束金额
			var html='<span class="js-random" style="margin-right:5px;">至';
			html+='<input type="number" name="offer_data_end" class="input-small" disabled style="margin:0 5px;" value="'+data.offer_data_end+'">';
			html+='元</span>';
			$("#coupon_right input[name='is_random']").parent().before(html);
			//随机多选框选中
			$("#coupon_right input[name='is_random']").attr("checked",true);
		}
		//如果没选择随机，即指定价格
		else{
			//显示开始金额（指定价格）
			$("#coupon_right input[name='offer_data_start']").val(data.offer_data_start);
			//随机多选框不选中
			$("#coupon_right input[name='is_random']").attr("checked",false);
		}
	}
	//如果选择折扣
	else if(data.offer_type==2){
		//让显示折扣的文本框显示出来
		$("#coupon_right input[name='offer_type'][value='"+data.offer_type+"']").parent().next().css("display","block");
		//回填折扣的值
		$("#coupon_right input[name='offer_discount']").val(data.offer_discount);
		//隐藏指定金额面值的文本框
		$("#coupon_right input[name='offer_type'][value='1']").parent().next().css("display","none");
	}
	
	//使用门槛选中
	$("#coupon_right input[name='threshold'][value='"+data.threshold+"']").attr("checked",true);
	//如果选择不限制
	if(data.threshold==1){
		//不限制下方的提示语显示
		$("#coupon_right input[name='threshold'][value='"+data.threshold+"']").parent().next().css("display","block");
		//满多少元下方提示语隐藏
		$("#coupon_right input[name='threshold'][value='2']").parent().next().css("display","none");
	}
	//如果选择满多少元可用
	else if(data.threshold==2){
		//回填满多少元
		$("#coupon_right input[name='threshold_money']").val(data.threshold_money);
		//满多少元下方提示语显示
		$("#coupon_right input[name='threshold'][value='"+data.threshold+"']").parent().next().css("display","block");
		//不限制下方提示语隐藏
		$("#coupon_right input[name='threshold'][value='1']").parent().next().css("display","none");
	}
	
	//回显会员等级
	$("#coupon_right select[name='member_card_id']").val(data.member_card_id);
	//回显每人限领
	$("#coupon_right select[name='limit_num']").val(data.limit_num);
	//有效期选中
	$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").attr("checked",true);
	//如果选择固定日期
	if(data.valid_type==1){
		//生效时间、过期时间显示，并回填数据
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parent().next().css("display","block");
		$("#coupon_right input[name='active_stime']").val(data.active_stime);
		$("#coupon_right input[name='active_etime']").val(data.active_etime);
	}
	//如果选择领到券当日开始 N 天内有效
	else if(data.valid_type==2){
		//生效时间、过期时间隐藏
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parents(".controls").find("div:eq(0)>div").hide();
		//把<i>删了
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parent().next().remove();
		//加上input，并回填数据
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parent()
		.after('<input type="number" min="1" max="365" name="active_now_days" value="'+data.active_now_days+'" disabled class="input-small">');
	}
	//如果选择领到券次日开始 N 天内有效
	else if(data.valid_type==3){
		//生效时间、过期时间隐藏
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parents(".controls").find("div:eq(0)>div").hide();
		//把<i>删了
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parent().next().remove();
		//加上input，并回填数据
		$("#coupon_right input[name='valid_type'][value='"+data.valid_type+"']").parent()
		.after('<input type="number" min="1" max="365" name="active_next_days" value="'+data.active_next_days+'" disabled class="input-small">');
	}
	
	//是否到期提醒
	if(data.to_remind==1){
		$("#coupon_right input[name='to_remind']").attr("checked",true);
	}else{
		$("#coupon_right input[name='to_remind']").attr("checked",false);
	}
	//是否允许分享领取链接
	if(data.to_share_link==1){
		$("#coupon_right input[name='to_share_link']").attr("checked",true);
	}else{
		$("#coupon_right input[name='to_share_link']").attr("checked",false);
	}
	//是否应用于全部商品选中
	$("#coupon_right input[name='is_all_use_flag'][value='"+data.is_all_use_flag+"']").attr("checked",true);
	//如果选择了全部商品
	if(data.is_all_use_flag==1){
		//添加商品的div隐藏
		$("#coupon_right input[name='is_all_use_flag'][value='"+data.is_all_use_flag+"']").parents(".controls").next().hide();
	}
	//如果选择了指定商品
	else if(data.is_all_use_flag==0){
		//添加商品的div显示
		$("#coupon_right input[name='is_all_use_flag'][value='"+data.is_all_use_flag+"']").parents(".controls").next().show();
		//它下面的表格也显示
		$("#coupon_right input[name='is_all_use_flag'][value='"+data.is_all_use_flag+"']")
		.parents(".controls").next().find("table").show();
		//加载表格的数据
		opera_goodsList(gooodsList);
	}
	
	//是否仅原价购买商品时可用选中
	if(data.use_detail_price==1){
		$("#coupon_right input[name='use_detail_price']").attr("checked",true);
	}else{
		$("#coupon_right input[name='use_detail_price']").attr("checked",false);
	}
	//使用说明
	$("#coupon_right textarea[name='instructions']").val(data.instructions);
	//左边的html
	$("#coupon_left").html(data.preview_content);
}

//初始化时加载客户标签列表
function opera_memberLabelList(data){
	if(!isNotEmpty(data) || data.length==0){return;}
	//逗号分隔标签
	var labelList = data.split(",");
	for(var l=0;l<labelList.length;l++){
		$("#coupon_fans_tag" + " option[value='" + labelList[l] + "']").attr('selected', 'selected');
	}
	//这样可以解决同一select不断动态加载的问题。
	$("#coupon_fans_tag").trigger("liszt:updated");
	//重新调用chosen插件方法
	$("#coupon_fans_tag").chosen();
}

//初始化时加载商品列表
function opera_goodsList(data){
	if(!isNotEmpty(data) || data.length==0){return;}
	$.each(data,function(i,n){
		 var id = n.commodity_id;
	   	 var commodity_name = n.commodity_name;
	   	 var commodity_url = n.commodity_url;
	   	 var tr = 
   		 	'<tr id="'+id+'">'
   			+'<td>'
   			+'	<a class="single-goods" target="_blank" href="'+commodity_url+'">'+commodity_name+'</a>'
   			+'</td>'
   			+'<td>'
   			+'<span class="c-gray ui-tooltip" style="cursor: not-allowed;" data-tooltip-title="优惠券生效后，不允许删除商品" data-tooltip-placement="top">删除</span>'
   			+'</td>'
   			+'</tr>'
	   		$("#coupon_commodity_table").find("tbody").append(tr);
	   		couponCommodityArr.push(id);
	})
}




//验证必填项（6个判断）
function coupon_validate(){
	//1 验证优惠券名称
	if($("#coupon_right input[name='name']").val()==""){
		alert_mess('请填写优惠券名称');
		$("#coupon_right input[name='name']").focus();
    	return false;
	}
	//2 验证发行总量
	if($("#coupon_right input[name='release_num']").val()==""){
		alert_mess('请填写发行总量');
		$("#coupon_right input[name='release_num']").focus();
		return false;
	}
	//3 验证优惠形式
	//获得优惠形式
	var offer_type = $("#coupon_right input[name='offer_type']:checked").val();
	//指定金额的面值，也是随机优惠的开始金额
	var offer_data_start = $("#coupon_right input[name='offer_data_start']").val();
	//随机优惠的结束金额
	var offer_data_end = $("#coupon_right input[name='offer_data_end']").val();
	//如果选择了指定金额
	if(offer_type=="1"){
		//如果选择了随机
		if($("#coupon_right input[name='is_random']").prop('checked')){
			if(offer_data_start==""){
				alert_mess('请填写优惠面值的最低金额');
				$("#coupon_right input[name='offer_data_start']").focus();
				return false;
			}
			if(offer_data_end==""){
				alert_mess('请填写优惠面值的最高金额');
				$("#coupon_right input[name='offer_data_end']").focus();
				return false;
			}
		}else{
			//大于等于0.01正则
			var ex=/^(?=.*[1-9])\d+(\.\d{1,2})?$/;
			if(offer_data_start==""){
				alert_mess('请填写优惠面值的金额');
				$("#coupon_right input[name='offer_data_start']").focus();
				return false;
			}
			else if(!ex.test(offer_data_start)){
				alert_mess('优惠券面值必须大于等于 0.01 元');
				$("#coupon_right input[name='offer_data_start']").focus();
				return false;
			}
		}
	}
	//如果选择了折扣
	else if(offer_type=="2"){
		if($("#coupon_right input[name='offer_discount']").val()==""){
			alert_mess('请填写折扣');
			$("#coupon_right input[name='offer_discount']").focus();
			return false;
		}
	}
	//4 验证使用门槛
	//使用门槛
	var threshold = $("#coupon_right input[name='threshold']:checked").val();
	//有门槛时
	if(threshold=="2"){
		if($("#coupon_right input[name='threshold_money']").val()==""){
			alert_mess('请填写使用门槛');
			$("#coupon_right input[name='threshold_money']").focus();
			return false;
		}
	}
	//5 验证有效期
	//有效期类型
	var valid_type = $("#coupon_right input[name='valid_type']:checked").val();
	//选择固定日期
	if(valid_type=="1"){
		if($("#coupon_right input[name='active_stime']").val()==""){
			alert_mess('请填写生效时间');
			return false;
		}
		if($("#coupon_right input[name='active_etime']").val()==""){
			alert_mess('请填写过期时间');
			return false;
		}
	}
	//选择领到券当日开始N天内有效
	else if(valid_type=="2"){
		if($("#coupon_right input[name='active_now_days']").val()==""){
			alert_mess('请填写有效期');
			$("#coupon_right input[name='active_now_days']").focus();
			return false;
		}
	}
	//选择领到券次日开始N天内有效
	else if(valid_type=="3"){
		if($("#coupon_right input[name='active_next_days']").val()==""){
			alert_mess('请填写有效期');
			$("#coupon_right input[name='active_next_days']").focus();
			return false;
		}
	}
	//6 验证可使用商品
	//是否应用于全部商品
	var is_all_use_flag = $("#coupon_right input[name='is_all_use_flag']:checked").val();
	//选择指定商品时
	if(is_all_use_flag=="0"){
		if(couponCommodityArr.length<=0){
			alert_mess('请选择指定商品');
			return false;
		}
	}
	//验证通过返回true
	return true;
}


//错误提示的方法
function alert_mess(mess){
	parent.layer.alert(mess, {
		icon : 5
	});
}
