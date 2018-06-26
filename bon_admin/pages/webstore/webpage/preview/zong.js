
//加入购物车方法
function tocart(){
	/*$(".am-share").addClass("am-modal-active");	
	$('.js-confirm-it').text('加入购物车');
	$('.big-btn-3-1').hide();
	$('.big-btn-1-1').show();
	choose();
	*/
	$('.motify-inner').text('预览不支持进行购买，实际效果请在手机上进行。');
    $('.motify').show().delay(2000).hide(300);
    //toshare();
}	
//立即购买方法
function tobuy(){
	/*$(".am-share").addClass("am-modal-active");	
	$('.js-confirm-it').text('下一步');
	$('.big-btn-3-1').hide();
	$('.big-btn-1-1').show();
	choose();
	toshare();*/
	$('.motify-inner').text('预览不支持进行购买，实际效果请在手机上进行。');
    $('.motify').show().delay(2000).hide(300);
}

//点击选择规格组合，弹出选择规格框（包含加入购物车，立即购买2个按钮）
function tospec(){
	$(".am-share").addClass("am-modal-active");	
	$('.big-btn-3-1').show();
	$('.big-btn-1-1').hide();
	choose();
}


//关闭弹框
function toshare(){
	if($(".sharebg").length>0){
		$(".sharebg").addClass("sharebg-active");
	}else{
		$("body").append('<div class="sharebg"></div>');
		$(".sharebg").addClass("sharebg-active");
	}
}


//点击客服按钮方法
function kefu(){
	$("#fRhInrDoeN").show(300);
	if($(".sharebg1").length>0){
		$(".sharebg1").addClass("sharebg1-active");
	}else{
		$("body").append('<div class="sharebg1"></div>');
		$(".sharebg1").addClass("sharebg1-active");
	}
	$(".sharebg1").click(function(){	
		setTimeout(function(){
			$(".sharebg1-active").removeClass("sharebg1-active");	
			$(".sharebg1").remove();
			$("#fRhInrDoeN").hide(300);
		},300);
	});
}

//选择规格以后的方法，变红，上面显示已选某某
function choose(){
	$(".model-list li").click(function(){
		var index = $(".model-list li").index(this);
		$(this).addClass("active").siblings().removeClass("active");
		$('.js-sku-label').text('已选');
		var a=$('.block-list li.active').text();
		$('.js-sku-value').text(a);
		//获取ul数组
		var ul = $(".model-list");
		//存储规格值的数组，有3个元素
		var speValueArr = [];
		//商品只有1种规格时
		if(ul.length==1){
			for(i=0;i<ul.length;i++){
				//获得选中变红的li对象
				var chooseLi = $(ul[i]).find("li.active");
				//获得其后的隐藏域的值（规格值id）
				var speValueId = chooseLi.next().val();
				speValueArr.push(speValueId);
			}
			//加上2个空值，保证数组长度是3
			speValueArr.push("");
			speValueArr.push("");
		}
		//商品有2种规格时
		else if(ul.length==2){
			for(i=0;i<ul.length;i++){
				//获得选中变红的li对象
				var chooseLi = $(ul[i]).find("li.active");
				//获得其后的隐藏域的值（规格值id）
				var speValueId = chooseLi.next().val();
				speValueArr.push(speValueId);
			}
			//加上1个空值，保证数组长度是3
			speValueArr.push("");
		}
		//商品有3种规格时
		else if(ul.length==3){
			for(i=0;i<ul.length;i++){
				//获得选中变红的li对象
				var chooseLi = $(ul[i]).find("li.active");
				//获得其后的隐藏域的值（规格值id）
				var speValueId = chooseLi.next().val();
				speValueArr.push(speValueId);
			}
		}
		
		//定义未选择规格的提示语
		var str = "";
		for(i=0;i<ul.length;i++){
			//有未选中的规格，就追加到提示语上
			if(!$(ul[i]).children('li').hasClass('active')){
				var b=$(ul[i]).parents("dd");
				var tishi = b.prev().children().text();
				var tishi = tishi.replace(/:/g,'、');
				str = str + tishi;
			}
		}
		//规格全部选完才去查询价格
		if(str == ""){
			//ajax请求后台获得价格
			$.ajax({
		        url : getRootPath()+"/commodity/queryCommodityPriceBySpe.action",
		        type : "post",
		        //用传统的方式来序列化数据
		        traditional : true,
		        dataType :"json",
		        data:{id:goodId,speValueArr:speValueArr},
		        success : function (data) {
		        	//获得价格
		        	var price = data.price;
		        	//未选择规格，价格赋值为商品基本信息的价格
    				$(".goods-header .current-price i").html(price);
    				//弹出的div中，价格赋值为商品基本信息的价格
    				$("#clVmQGLkPc .current-price i").html(price);
		        },
		        error:function(){
				}
		    })
		}
	});
}


//加入购物车的保存方法,后台不需要进行购物车存储
//应为          预览不支持进行购买，实际效果请在手机上进行。
function addCartList(goodId){
	//定义规格值字符串
	var speStr = "";
	$(".model-list li.active").each(function (j,n) {  
		//获得选中的每一个规格值
		var speVal = $(n).next().val();
		if(j==0){
			speStr = speStr+speVal;
		}else{
			speStr = speStr+","+speVal;
		}
	})
	
	 //获得购买数量的值
	 var amount = $(".txt").val();
	 //购物车json
	 var cartinfoJson = {"id":uuid(),
	    		"customer_id":"201707031026541380000001",
	    		"commodity_id":goodId,
	    		"specification_value_id":speStr,
	    		"amount":amount};
	    
	 var jsonstr = JSON.stringify(cartinfoJson);
	    
	 $.ajax({
	        url : getRootPath()+"/commodity/updateCartList.action",
	        type : "post",
	        async: false,
	        data:{"cartJsonStr":jsonstr},
	        dataType:"TEXT",
	        success : function (result) {
	        	if("success" == result){
	        		$('.motify-inner').text('已成功添加到购物车');
					$('.motify').show().delay(2000).hide(300);
					//关闭加入购物车的弹窗
					$(".js-cancel").click();
	        	}else{
	        		$('.motify-inner').text('添加失败');
					$('.motify').show().delay(2000).hide(300);
	        	}
	        },
	        error:function(){
	        	$('.motify-inner').text('添加失败');
				$('.motify').show().delay(2000).hide(300);
			}
	    })
}


$(function(){
	//点击弹框右上角的叉号，关闭弹窗
	$(".js-cancel").click(function(){
		$(".am-share").removeClass("am-modal-active");	
		setTimeout(function(){
			$(".sharebg-active").removeClass("sharebg-active");	
			$(".sharebg").remove();	
		},300);
	});
	
	//数量加减
	var shuliang=$('.js-value').text();
	$('.js-stock').text(shuliang);
	$(".txt").blur(function(){
		var vall1 = $('.txt').val();
	    if(vall1 <= 1) {
			$('.minus').attr("disabled","true");
			$('.minus').addClass("disabled");
			$('.plus').attr("disabled",false);
			$('.plus').removeClass("disabled");
			vall1 = 1;
		}else if(vall1 >= shuliang){
			$(".plus").attr("disabled","true");
			$(".plus").addClass("disabled");
			$('.minus').attr("disabled",false);
			$('.minus').removeClass("disabled");
			vall1 = shuliang;
		}else{
			$('.minus').attr("disabled",false);
			$('.minus').removeClass("disabled");
			$('.plus').attr("disabled",false);
			$('.plus').removeClass("disabled");
		}
		$('.txt').val(vall1);
	});
	$(".plus").each(function() {
		$(this).click(function() {
			var vall = $('.txt').val();
			vall++;
			if(vall >= shuliang) {
				$(this).attr("disabled","true");
				$(this).addClass("disabled");
				vall = shuliang;
			}else{
				$(this).attr("disabled",false);
				$(this).removeClass("disabled");
			}
			$('.txt').val(vall);
			$(".minus").removeClass("disabled");
		})
	})
	$(".minus").each(function() {
		$(this).click(function() {
			var vall = $('.txt').val();
			vall--;
			if(vall <= 1) {
				$(this).attr("disabled","true");
				$(this).addClass("disabled");
				vall = 1;
			}else{
				$(this).attr("disabled",false);
				$(this).removeClass("disabled");
			}
			$('.txt').val(vall);
		})
	})
	
	/*$('.js-add-cart').click(function(){
		$('.motify-inner').html('预览不支持进行购买，<br>实际效果请在手机上进行。');
		$('.motify').show().delay(2000).hide(300);
	})*/
	/*$('.js-buy-it').click(function(){
		$('.motify-inner').html('预览不支持进行购买，<br>实际效果请在手机上进行。');
		$('.motify').show().delay(2000).hide(300);
	})*/
	//点击 加入购物车弹框里的加入购物车按钮事件
	$('.js-confirm-it').click(function(){
		var ul= $(this).parents(".adv-opts").find("dl.sku-list-container").find('.model-list');
		//定义未选择规格的提示语
		var str = "";
		for(i=0;i<ul.length;i++){
			//有未选中的规格，就追加到提示语上
			if(!$(ul[i]).children('li').hasClass('active')){
				var b=$(ul[i]).parents("dd");
				var tishi = b.prev().children().text();
				str = str + tishi;
			}
		}
		str = str.replace(/:/g,'、');
		str = str.substr(0,str.length-1);
		if(str != ""){
			$('.motify-inner').text('请选择 '+ str);
		    $('.motify').show().delay(2000).hide(300);
		}
		else{
			if($(this).text()=="下一步"){
				kefu();
			}else if($(this).text()=="加入购物车"){
				addCartList(goodId);
			}
		}
	})
	
	
	
	
	//点击 选择规格组合的弹窗里的加入购物车按钮事件
	$('.cart').click(function(){
		var ul= $(this).parents(".adv-opts").find("dl.sku-list-container").find('.model-list');
		//定义提示语
		var str = "";
		for(i=0;i<ul.length;i++){
			if(!$(ul[i]).children('li').hasClass('active')){
				var b=$(ul[i]).parents("dd");
				var tishi = b.prev().children().text();
				tishi = tishi.replace(/:/g,'、');
				//有未选择的规格，则追加提示语
				str = str + tishi;
			}
		}
		//去掉最后一位
		str = str.substr(0,str.length-1);
		//根据提示语进行判断，如果不为空，则提示哪些规格没有选择
		if(str != ""){
			$('.big-btn-3-1').show();
			$('.big-btn-1-1').hide();
			$('.motify-inner').text('请选择 '+ str);
		    $('.motify').show().delay(2000).hide(300);
		}
		//如果为空，则规格已选择全，执行加入购物车
		else{
			//addCartList(goodId);
			$('.motify-inner').text('预览不支持进行购买，实际效果请在手机上进行。');
		    $('.motify').show().delay(2000).hide(300);
		} 
		
	})

	
	
	//点击 选择规格组合的弹窗里的  立即购买按钮事件
	$('.confirm').click(function(){
		var ul= $(this).parents(".adv-opts").find("dl.sku-list-container").find('.model-list');
		//定义提示语
		var str = "";
		for(i=0;i<ul.length;i++){
			if(!$(ul[i]).children('li').hasClass('active')){
				var b=$(ul[i]).parents("dd");
				var tishi = b.prev().children().text();
				tishi = tishi.replace(/:/g,'、');
				//有未选择的规格，则追加提示语
				str = str + tishi;
			}
		}
		//去掉最后一位
		str = str.substr(0,str.length-1);
		//根据提示语进行判断，如果不为空，则提示哪些规格没有选择
		if(str != ""){
			$('.motify-inner').text('请选择 '+ str);
		    $('.motify').show().delay(2000).hide(300);
		}
		//如果为空，则规格已选择全，执行立即购买
		else{
			$('.motify-inner').text('预览不支持进行购买，实际效果请在手机上进行。');
		    $('.motify').show().delay(2000).hide(300);
			/*if(buy_num>store_count){
				$('.motify-inner').text('库存不足');
				$('.motify').show().delay(2000).hide(300);
			}
			else{
				toBuyNow(goodId);
			}*/
		}
	})
})