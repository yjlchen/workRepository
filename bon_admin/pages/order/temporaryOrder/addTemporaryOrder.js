layui.use(['form','layer'], function(){
	var layer = layui.layer;
})		
//定义一个数组，用来存储各种规格的商品价格
var priceArr = [];

$(function(){ 
		//加载商品选择下拉列表数据
		$.ajax({
		    url : getRootPath()+"/commodity/queryCommodityList.action",
		    type : "post",
		    async: false,//同步
		    dataType:"json",
		    success : function (gdata) {
		    	if(gdata!=null){
	        		 var glist=gdata.data;
	  	             for(var i=0;i<glist.length;i++){
	  	            	 var gindex=glist[i];
	  	            	 var id=gindex.id;
	  	            	 var commodity_name=gindex.commodity_name;
	  	            	 $("#choose_commodity").append("<option value='"+id+"'>"+commodity_name+"</option>"); 
	  	             }
	        	}
		    	//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//先销毁之前的
	        	$("#choose_commodity").chosen("destroy");
	        	//更新数据
	        	$("#choose_commodity").trigger("liszt:updated");
	        	//重新调用chosen插件方法
	        	$("#choose_commodity").chosen();
		    }
		});
		
		//商品下拉列表改变事件
		$("#choose_commodity").change(function(){
			var id = $(this).val();
			//给商品id隐藏域赋值
			$("#commodity_id").val(id);
			loadGoodInfo(id);
		});
		
		
		//购买数量变化事件
		$("#buyNumber").change(function(){
			var num = $(this).val();
			var unitprice = $("#unitprice").val();
			//计算总价
			if(unitprice!=""&&unitprice.indexOf("-")<0){
				$("#totalprice").val(Number(num)*Number(unitprice));
			}
		});
		
		//点击保存
		$('.js-btn-save').click(function(){
			var ul = $("div.sku-sel-list");
			var str = getHintStr(ul);
			//获得商品id
			var commodity_id = $("#commodity_id").val();
			//根据提示语进行判断，如果不为空，则提示哪些规格没有选择
			if(str != ""){
			    alert_mess('请选择 '+ str);
			}
			//如果为空，则规格已选择全，执行立即购买
			else{
				saveTemporaryOrder(commodity_id);
			}
		})
		
		//点击返回
		$(".js-btn-quit").click(function(){
			location.href=getRootPath()+'/pages/order/temporaryOrder/allOrder.jsp';
		});
	})


//根据下拉列表所选商品，加载商品信息
function loadGoodInfo(goodId){
	//清空上次所选商品库存的值
	$("#stock").val("");
	$.ajax({
    	"type":"post",
        "url": getRootPath()+"/commodity/queryCommodityInfo.action",
        data:{id:goodId},
        "dataType":"json",
        'success' : function (data) {
        	//console.log(data);
        	//商品原价
        	var price = data.data.price;
        	//商品名称
			var goodName = data.data.commodity_name;
			//给商品名称隐藏域赋值
			$("#commodity_name").val(goodName);
        	//获得规格集合
			var speList = data.speList;
			 //商品图片
	       	 var url;
	       	 if(data.data.img_path_str.indexOf(",")<0){
	   			 url = data.data.img_path_str;
	   		 }else{
	   			//图片url,取第一个，之前的值
	   			 url = data.data.img_path_str.substr(0,data.data.img_path_str.indexOf(","));
	   		 }
	       	$("#commodity_url").val(url);
	         //库存
			var store_count = data.data.store_count;
			 
			 /**商品价格的判断显示**/
 			//获得规格值集合
 			var speValueList = data.speValueList;
 			//获得规格值集合长度
 			var listLength = speValueList.length;
 			if(listLength>0){
 				//显示选择规格的div
 				$("#chooseSpe").show();
 				//只有一种规格的价格
 				if(listLength == 1){
 					$.each(speValueList,function(j,n){
         				//获得这种规格价格
         				var price = n.detail_price;
         				//为商品单价赋值
         				$("#unitprice").val(price);
         				//为商品总价赋值（开始时等于单价，因为购买数量是1）
         				$("#totalprice").val(price);
         			})
 				}
 				//多种规格组合时
 				else{
 					$.each(speValueList,function(j,n){
         				//获得每种规格组合对应的价格
         				var price = n.detail_price;
         				//将每次获得的价格放入定义的数组中
         				priceArr.push(Number(price).toFixed(2));
         			})
         			//获得数组中的最大价格
         			var max = Math.max.apply(null, priceArr);
         			max = Number(max).toFixed(2);
 					//获得数组中的最小价格
 					var min = Math.min.apply(null, priceArr);
 					min = Number(min).toFixed(2);
 					//为商品单价赋值
 					$("#unitprice").val(min+"-"+max);
 					//为商品总价赋值（开始时等于单价，因为购买数量是1）
     				$("#totalprice").val(min+"-"+max);
 				}
 			}else{
 				//隐藏选择规格div
 				$("#chooseSpe").hide();
 				//为商品单价赋值
 				$("#unitprice").val(price);
 				//为商品总价赋值（开始时等于单价，因为购买数量是1）
 				$("#totalprice").val(price);
 				//给库存赋值
 				$("#stock").val(store_count);
 				//给商品数量文本框加上最大值属性
 				$("#buyNumber").attr("max",store_count);
 			}
 			
 			//清空上一次加载的div
			$("#chooseSpe").empty();	
 			//加载规格项
			$.each(speList,function(i,n){
				//规格名称
				var name = n.specification_name;
				//规格id
				var speId = n.specification_id;
				var str = 
					'<div class="select-goods-box clear">'
					+'<label class="control-label" style="margin-top: 5px;">'
					+'	<em class="required">*</em>'
					+'	'+name+''
					+'：</label>'
					//规格名隐藏域
					+'<input type="hidden" value="'+name+':">'
					+'<div class="controls sku-sel-list sep_li_0">'			
					+'</div>'
					+'</div>'
				//添加规格div
				$("#chooseSpe").append(str);
				showSpeValue(i,goodId,speId);
			})
        }
	});
}


//展示规格值
function showSpeValue(num,commodity_id,speId){
	$.ajax({
        url : getRootPath()+"/commodity/querySpeValueList.action",
        type : "post",
        dataType :"json",
        data:{id:commodity_id,speId:speId,num:num},
        success : function (data) {
        	var speValueList = data.speValueList;
        	$.each(speValueList,function(i,n){
        		//每个规格下的具体值
				var name = n.specification_value_name;
        		//规格值id，将该值放入隐藏域中，选择完规格计算商品价格时使用
        		var specification_value_id = n.specification_value_id;
				$("div.sku-sel-list").eq(num)
	        	.append('<button class="option-box" onclick=chooseSpe(this,"'+commodity_id+'")>'+name+'</button>')
	        	.append('<input type="hidden" value='+specification_value_id+'>');
			})
        },
        error:function(){
		}
    })
}



//获得未选择规格的提示语
function getHintStr(ul){
	//定义提示语
	var str = "";
	for(i=0;i<ul.length;i++){
		if(!$(ul[i]).children('button').hasClass('active')){
			var tishi = $(ul[i]).prev().val();
			tishi = tishi.replace(/:/g,'、');
			//有未选择的规格，则追加提示语
			str = str + tishi;
		}
	}
	//去掉最后一个空格
	str = str.substr(0,str.length-1);
	return str;
}

//提示方法
function alert_mess(mess){
	parent.layer.alert(mess, {
		icon : 5
	});
}


//选择规格方法
function chooseSpe(obj,goodId){
		$(obj).addClass("active").siblings().removeClass("active");
		//获取ul数组
		var ul = $(".sep_li_0");
		//存储规格值的数组，有3个元素
		var speValueArr = [];
		//商品只有1种规格时
		if(ul.length==1){
			for(i=0;i<ul.length;i++){
				//获得选中变红的li对象
				var chooseLi = $(ul[i]).find("button.active");
				//获得其后的隐藏域的值（规格值id）
				var speValueId = chooseLi.next().val();
				speValueArr.push(speValueId);
			}
			//加上2个空值，保证数组长度是3
			speValueArr.push("");
			speValueArr.push("");
			//选中的规格隐藏域赋值
			$('.js-sku-value').val(chooseLi.text());
		}
		//商品有2种规格时
		else if(ul.length==2){
			var showSpe = ""
			for(i=0;i<ul.length;i++){
				//获得选中变红的li对象
				var chooseLi = $(ul[i]).find("button.active");
				//获得其后的隐藏域的值（规格值id）
				var speValueId = chooseLi.next().val();
				speValueArr.push(speValueId);
				//规格名称显示拼接
				showSpe += chooseLi.text()+" ";
			}
			//加上1个空值，保证数组长度是3
			speValueArr.push("");
			//选中的规格隐藏域赋值
			$('.js-sku-value').val(showSpe);
		}
		//商品有3种规格时
		else if(ul.length==3){
			var showSpe = ""
			for(i=0;i<ul.length;i++){
				//获得选中变红的li对象
				var chooseLi = $(ul[i]).find("button.active");
				//获得其后的隐藏域的值（规格值id）
				var speValueId = chooseLi.next().val();
				speValueArr.push(speValueId);
				//规格名称显示拼接
				showSpe += chooseLi.text()+" ";
			}
			//选中的规格隐藏域赋值
			$('.js-sku-value').val(showSpe);
		}
		//未选择提示语
		var str = getHintStr(ul);
		//alert(str);
		//规格全部选完才去查询价格
		if(str == ""){
			//ajax请求后台获得价格、库存
			$.ajax({
		        url : getRootPath()+"/commodity/queryCommodityInfoBySpe.action",
		        type : "post",
		        //用传统的方式来序列化数据
		        traditional : true,
		        dataType :"json",
		        data:{id:goodId,speValueArr:speValueArr},
		        success : function (data) {
		        	//获得购买数量
		        	var buyNumber = $("#buyNumber").val();
		        	//获得价格
		        	var price = data.detail_price;
		        	//获得库存
		        	var stock = data.stock;
		        	//为商品单价赋值
		        	$("#unitprice").val(price);
		        	//为商品总价赋值
		        	var totalprice = Number(price)*Number(buyNumber);
		        	if(isNaN(totalprice)){  
		        		$("#totalprice").val("");
		        	}else{
		        		$("#totalprice").val(totalprice);
		        	}
    				//为商品库存赋值
    				$("#stock").val(stock);
    				//给商品数量文本框加上最大值属性
     				$("#buyNumber").attr("max",stock);
		        },
		        error:function(){
				}
		    })
		}
}


//点击保存
function saveTemporaryOrder(goodId){
	//定义规格值字符串
	var speStr = "";
	/** 公用变量进行赋值 **/
	//获得库存
	var store_count = $("#stock").val();
	//获得商品名称
	var commodity_name = $("#commodity_name").val();
	//获得规格name
	var spe_name = $('.js-sku-value').val();
	//当商品没有规格时
	if (spe_name.indexOf(" ") >=0) {
		 spe_name = spe_name.replace(/\s/g, ""); // 这句话可以强制删除所有空格
	}
	//定义json串
	var orderJsonStr;
		$(".sep_li_0 button.active").each(function (j,n) {  
			//获得选中的每一个规格值
			var speVal = $(n).next().val();
			if(j==0){
				speStr = speStr+speVal;
			}else{
				speStr = speStr+","+speVal;
			}
		})
	    //获得购买数量的值
		var amount = $("#buyNumber").val();
		//获得商品单价
		var unitprice = $("#unitprice").val();
		//获得商品总价
		var totalprice = $("#totalprice").val();
		//获得商品图片url
		var commodity_url = $("#commodity_url").val();
	
	    //key值要与订单页的对应好
		orderJsonStr = {
			    "commodity_id":goodId,
	    		"specification_value_id":speStr,
	    		"amount":amount,
	    		"unit_price":unitprice,
	    		"totalprice":totalprice,
	    		"store_count":store_count,
	    		"commodity_name":commodity_name,
	    		"img_path_str":commodity_url,
	    		"specifications_name":spe_name
		 };
	
	
	 var jsonstr = JSON.stringify(orderJsonStr);
		$.ajax({
			url : getRootPath()+"/order/addTemporaryOrder.action",
			type : 'POST',
			data : {orderJsonStr:jsonstr},
			dataType : 'TEXT',
			success : function(result){
				if("success"==result){
					layer.msg("保存成功", {
						  icon: 1,
						  time: 500 //（如果不配置，默认是3秒）
						}, function(){
							location.href=getRootPath()+'/pages/order/temporaryOrder/allOrder.jsp';
						});
				}
				else if("haveNoStock"==result){
					disable_submit(false,'save');
					parent.layer.alert("库存不足");
				}
				else{
					disable_submit(false,'save');
					parent.layer.alert("保存失败");
				}
			},
			error:function(){
				disable_submit(false,'save');
				parent.layer.alert("保存失败");
			}
		});
}