//没有规格时的商品数组
var grouponCommodityArr = [];
//有规格时的商品数组
var grouponSpevalueArr = [];
layui.use(['form','element','layer','laydate'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	 ,laydate = layui.laydate
	  ,layer = layui.layer;
	  initEdit();
	  form.render();
})

//点击是否开启限购功能
$(".controls-limit").on("click","label input",function(e){
	//判读input是否选中，如果选中则开启限购，否则取消限购
	if($(this).prop("checked")){
		$(this).attr("checked",true);
		$(this).parent().siblings().attr("style","");
	}else{
		$(this).attr("checked",false);
		$(this).parent().siblings().attr("style","visibility: hidden;");
	}
});
//点击是否开启团长优惠
$("input.js-chief-discount-switch").on("click",function(){
	//判断input是否选中，如果选中则相对应的table框中的内容显示，否则相对应的隐藏
	if($(this).prop("checked")){
		$(this).attr("checked",true);
		$(this).parents(".control-group").siblings(".control-sku").find(".chief-discount").show();
		$(this).parents(".control-group").siblings(".control-sku").find("table tbody tr .chief-discount").show();
		$(this).parents(".control-group").siblings(".control-sku").find("table tfoot tr .js-chief-control-setting").show();
	}else{
		$(this).attr("checked",false);
		$(this).parents(".control-group").siblings(".control-sku").find(".chief-discount").hide();
		$(this).parents(".control-group").siblings(".control-sku").find("table tbody tr .chief-discount").hide();
		$(this).parents(".control-group").siblings(".control-sku").find("table tfoot tr .js-chief-control-setting").hide();
		//团长优惠价全部清空
		$("input[name='captain_groupon_price']").val("");
	}
});
//设置拼团价和团长优惠价
$(".control-sku table").on("blur","tbody input",function(){
	//获取当前input框所在的td第一个兄弟元素里的值
	var price=Number($(this).parents("td").siblings().eq(0).text());
	//将当前父元素中去除错误class
	$(this).parent().removeClass("error");
	//将当前父元素中提示的错误信息清除
	$(this).parent().children("p.error-message").remove();
	//如果当前失去焦点的是拼团价
	if($(this).attr("name")=="sku_price0"){
		//如果当前元素的val值为空或者不是数组或者当前值大于原价则提示相对应的错误信息
		if($(this).val()==""||isNaN($(this).val())){
			$(this).parent().addClass("error");
			$(this).parent().append("<p class='help-block error-message' style='margin-top:0;'>请输入正确的拼团价</p>");
		}else if(Number($(this).val())>price){
			$(this).parent().addClass("error");
			$(this).parent().append("<p class='help-block error-message' style='margin-top:0;'>拼团价不能高于原价</p>");
		}
	//否则当前失去焦点的是团长优惠价
	}else if($(this).attr("name")=="sku_header_price0"){
		//如果当前元素的val值为空或者不是数组或者当前值大于原价则提示相对应的错误信息
		if($(this).val()==""||isNaN($(this).val())){
			$(this).parent().addClass("error");
			$(this).parent().append("<p class='help-block error-message' style='margin-top:0;'>请输入正确的团长优惠价</p>");
		}else if(Number($(this).val())>Number($(this).parents("td").prev().find("input").val())){
			$(this).parent().addClass("error");
			$(this).parent().append("<p class='help-block error-message' style='margin-top:0;'>团长优惠价不能高于拼团价</p>");
		}
	}
});
//团详情示例
$("form.form-horizontal").on("mouseenter",".control-group .controls-auto-group .tuan-example",function(){
	$(this).next().show();
});
$("form.form-horizontal").on("mouseleave",".control-group .controls-auto-group .tuan-example",function(){
	$(this).next().hide();
});


//点击是否固定人数
$("#is_limit_attend_num input[name='is_limit_attend_num']").on("click",function(){
	var size=$(this).val();
	//是
	if(size=="0"){
		$("#attend_person_num").show();
		$("#min_person_num").hide();
		//清空最低人数文本框的值
		$("input[name='min_person_num']").val("");
	}else if(size=="1"){
		$("#attend_person_num").hide();
		$("#min_person_num").show();
		//清空固定人数文本框的值
		$("input[name='attend_person_num']").val("");
	}
});

/*//点击批量设置下的拼团价
$(".js-control-setting").on("click",function(){
	$(this).siblings(".js-batch-setting,.js-batch-setting").show();
});*/


//点击取消
$(".js-btn-quit").click(function(){
	//返回列表
	location.href = "grouponList.jsp";
})

//点击保存
$(".app__content").on("click",".js-btn-save",function(){
	//活动名称
	var groupon_name = $("input[name='groupon_name']").val();
	//参与活动的商品id
	var commodity_id = $("input[name='commodity_id']").val();
	//活动的生效日期的开始时间
	var groupon_active_stime = $("input[name='groupon_active_stime']").val();
	//活动的生效日期的结束时间
	var groupon_active_etime = $("input[name='groupon_active_etime']").val();
	//获得是否固定团人数
	var is_limit_attend_num = $("#is_limit_attend_num input[name='is_limit_attend_num']:checked").val();
	
	//获得固定的团人数（即有人数限制）
	var attend_person_num = $("input[name='attend_person_num']").val();
	if(attend_person_num==""){//如果为空，则设为0，因为是int型
		attend_person_num = 0;
	}
	//获得团最低人数（无人数上限）
	var min_person_num = $("input[name='min_person_num']").val();
	if(min_person_num==""){//如果为空，则设为0，因为是int型
		min_person_num = 0;
	}
	
	//是否开启凑团
	var is_open_groupon;
	if($("#is_open_groupon").prop('checked')){
		is_open_groupon = 0;
	}else{
		is_open_groupon = 1;
	}
	//是否限购
	var is_limit_buy;
	//每人限购件数
	var limit_buy_num;
	if($("#is_limit_buy").prop('checked')){
		is_limit_buy = 0;
		limit_buy_num = $("input[name='limit_buy_num']").val();
	}else{
		is_limit_buy = 1;
		limit_buy_num = 0;
	}
	//是否开启模拟成团
	var is_open_simulation_team;
	if($("#is_open_simulation_team").prop('checked')){
		is_open_simulation_team = 0;
	}else{
		is_open_simulation_team = 1;
	}
	//团长是否享受优惠价
	var is_captain_discount;
	if($("#is_captain_discount").prop('checked')){
		is_captain_discount = 0;
	}else{
		is_captain_discount = 1;
	}
	//活动标签
	var activity_label = $("input[name='activity_label']").val();
	//新增时，让id变为""
	if(grouponId==null){
		grouponId ="";
	}
	
	var grouponInfoJson = {
			"id":grouponId,
    		"groupon_name":groupon_name,
    		"commodity_id":commodity_id,
    		"groupon_active_stime":groupon_active_stime,
    		"groupon_active_etime":groupon_active_etime,
    		"activity_label":activity_label,
    		"is_limit_attend_num":is_limit_attend_num,
    		"min_person_num":min_person_num,
    		"attend_person_num":attend_person_num,
    		"is_open_groupon":is_open_groupon,
    		"is_limit_buy":is_limit_buy,
    		"limit_buy_num":limit_buy_num,
    		"is_open_simulation_team":is_open_simulation_team,
    		"is_captain_discount":is_captain_discount
		};
	var jsonstr = JSON.stringify(grouponInfoJson);
	
	var goodsJsonStr;
	/** 商品没有规格时 **/
	//拼团商品集合
	//console.log(grouponCommodityArr);
	if(grouponCommodityArr.length>0){
		goodsJsonStr='[';
	    	//拼团价
	    	var groupon_price = $("input[name='groupon_price']").val();
	    	//团长优惠价
	    	var captain_groupon_price = $("input[name='captain_groupon_price']").val();
	    	if(captain_groupon_price==undefined){
	    		captain_groupon_price = "";
	    	}
	        for(var index in grouponCommodityArr){  
	        	var commodity_id = grouponCommodityArr[index];  
	        	 var tbody='{';
	    			tbody+='"id":"'+"";                      //主键
	    			tbody+='","groupon_price":"'+groupon_price;
	    			tbody+='","captain_groupon_price":"'+captain_groupon_price;
	    			tbody+='","commodity_id":"'+commodity_id;    
	    			tbody+='","groupon_id":"'+"";  
	    			tbody+='"}'; 
	    			if(goodsJsonStr.length>2){
	    				goodsJsonStr+=','+tbody;
	    			}else{
	    				goodsJsonStr+=tbody;
	    			}
	        }  
	        goodsJsonStr+=']';
	}
	//console.log(grouponSpevalueArr);
    /** 商品有规格时 **/
	if(grouponSpevalueArr.length>0){
		goodsJsonStr='[';
	    	//获取tbody的tr
	    	var trArr = $("#set_groupon_discount_table tbody tr");
	    	for(var index in grouponSpevalueArr){  
	        	var commodity_specification_id = grouponSpevalueArr[index];
	        	//拼团价
		    	var groupon_price = $(trArr[index]).find("input[name='groupon_price']").val();
		    	//团长优惠价
		    	var captain_groupon_price = $(trArr[index]).find("input[name='captain_groupon_price']").val();
		    	if(captain_groupon_price==undefined){
		    		captain_groupon_price = "";
		    	}
	        	 var tbody='{';
	    			tbody+='"id":"'+"";                      //主键
	    			tbody+='","groupon_price":"'+groupon_price;
	    			tbody+='","captain_groupon_price":"'+captain_groupon_price;
	    			tbody+='","commodity_specification_id":"'+commodity_specification_id;    
	    			tbody+='","groupon_id":"'+"";  
	    			tbody+='"}'; 
	    			if(goodsJsonStr.length>2){
	    				goodsJsonStr+=','+tbody;
	    			}else{
	    				goodsJsonStr+=tbody;
	    			}
	        }  
	    goodsJsonStr+=']';
	}
	//console.log(goodsJsonStr);
    //声明判断整整数的正则表达式
	var positive = /^[0-9]*[1-9][0-9]*$/;
	//获得添加背景图的a
	var img=$(".select-goods-box ul a.goods-thumb");
	//去除所有的错误提示信息和错误class
	$(".form-horizontal p.error-message").remove()
	$(".form-horizontal .control-group").removeClass("error");
	
	//验证是否选择了商品
	if(img.css("background-image")=="none"){
		$(".select-goods-box").addClass("error");
		$(".select-goods-box").find(".controls")
		.append("<p class='help-block error-message' style='margin-top:0;'>请选择一个要进行多人拼团的商品。</p>");
		return false;
	}
	//验证活动名称
	if(groupon_name==""){
		$("input[name=groupon_name]").parents(".control-group").addClass("error");
		$("input[name=groupon_name]").parents(".control-group").find(".controls")
		.append("<p class='help-block error-message' style='margin-top:0;'>请输入活动名称。</p>");
		return false;
	}
	//验证生效时间
	if(groupon_active_stime==""||groupon_active_etime==""){
		$("#data3").parents(".control-group").addClass("error");
		$("#data3").parents(".control-group").find(".controls")
		.append("<p class='help-block error-message' style='margin-top:0;'>请设置团购的结束时间。</p>");
		return false;
	}
	if(activity_label==""){//未上传活动标签
		parent.layer.alert('请您选择一个活动标签');
		//返回头部
		$('html').animate( {scrollTop: 0}, 500);
		return false;
	}
	//如果选固定人数
	if(is_limit_attend_num=="0"){
		//参团人数验证
		if(attend_person_num==""||isNaN(attend_person_num)){
			$("input[name='attend_person_num']").parents(".control-group").addClass("error");
			$("input[name='attend_person_num']").parents(".control-group").find(".controls")
			.append("<p class='help-block error-message' style='margin-top:0;'>参团人数必须是整数。</p>");
			return false;
		}
		/*else if(Number(attend_person_num)<2||Number(attend_person_num>100)){
			$("input[name='attend_person_num']").parents(".control-group").addClass("error");
			$("input[name='attend_person_num']").parents(".control-group").find(".controls")
			.append("<p class='help-block error-message' style='margin-top:0;'>参团人数需在2-100人范围内。</p>");
			return false;
		}*/
		//参团人数不能少于2人
		else if(Number(attend_person_num)<2){
			$("input[name='attend_person_num']").parents(".control-group").addClass("error");
			$("input[name='attend_person_num']").parents(".control-group").find(".controls")
			.append("<p class='help-block error-message' style='margin-top:0;'>参团人数不能少于2人。</p>");
			return false;
		}
	}
	//如果选最低人数
	else if(is_limit_attend_num=="1"){
		//参团人数验证
		if(min_person_num==""||isNaN(min_person_num)){
			$("input[name='min_person_num']").parents(".control-group").addClass("error");
			$("input[name='min_person_num']").parents(".control-group").find(".controls")
			.append("<p class='help-block error-message' style='margin-top:0;'>参团人数必须是整数。</p>");
			return false;
		}
		//参团人数不能少于2人
		else if(Number(min_person_num)<2){
			$("input[name='min_person_num']").parents(".control-group").addClass("error");
			$("input[name='min_person_num']").parents(".control-group").find(".controls")
			.append("<p class='help-block error-message' style='margin-top:0;'>参团人数不能少于2人。</p>");
			return false;
		}
	}
	
	
	//选中开启限购时
	if($("#is_limit_buy").prop('checked')){
		//验证限购件数
		if(limit_buy_num==""||!(positive.test(limit_buy_num))){
			$("input[name='limit_buy_num']").parents(".control-group").addClass("error");
			$("input[name='limit_buy_num']").parents(".control-group").find(".controls")
			.append("<p class='help-block error-message' style='margin-top:0;'>件数必须是正整数。</p>");
			return false;
		}
	}
	
	//商品无规格时，验证拼团价、团长优惠价
	if(grouponCommodityArr.length>0){
		//获取当前input框所在的td第一个兄弟元素里的值
		var price=Number($("input[name='groupon_price']").parents("td").siblings().eq(0).text());
		//验证拼团价
		if(groupon_price==""||isNaN(groupon_price)){
			$("input[name='groupon_price']").parent().addClass("error");
			$("input[name='groupon_price']").parent().append("<p class='help-block error-message' style='margin-top:0;'>请输入正确的拼团价</p>");
			return false;
		}else if(groupon_price>price){
			$("input[name='groupon_price']").parent().addClass("error");
			$("input[name='groupon_price']").parent().append("<p class='help-block error-message' style='margin-top:0;'>拼团价不能高于原价</p>");
			return false;
		}
		//如果选中团长优惠
    	if($("#is_captain_discount").prop('checked')){
			//验证团长优惠价
			if(captain_groupon_price==""||isNaN(captain_groupon_price)){
				$("input[name='captain_groupon_price']").parent().addClass("error");
				$("input[name='captain_groupon_price']").parent()
				.append("<p class='help-block error-message' style='margin-top:0;'>请输入正确的团长优惠价</p>");
				return false;
			}else if(Number(captain_groupon_price)>Number($("input[name='captain_groupon_price']").parents("td").prev().find("input").val())){
				$("input[name='captain_groupon_price']").parent().addClass("error");
				$("input[name='captain_groupon_price']").parent()
				.append("<p class='help-block error-message' style='margin-top:0;'>团长优惠价不能高于拼团价</p>");
				return false;
			}
    	}
    }
	
	//商品有规格时，验证拼团价、团长优惠价
	if(grouponSpevalueArr.length>0){
	    	//获取tbody的tr
	    	var trArr = $("#set_groupon_discount_table tbody tr");
	    	for(var index in grouponSpevalueArr){  
	    		//微商城原价
	    		var price=Number($(trArr[index]).find("td#originalCost").text());
	        	//拼团价
		    	var groupon_price = $(trArr[index]).find("input[name='groupon_price']").val();
		    	//团长优惠价
		    	var captain_groupon_price = $(trArr[index]).find("input[name='captain_groupon_price']").val();
		    	//验证拼团价
		    	if(groupon_price==""||isNaN(groupon_price)){
		    		$(trArr[index]).find("input[name='groupon_price']").parent().addClass("error");
		    		$(trArr[index]).find("input[name='groupon_price']").parent()
		    		.append("<p class='help-block error-message' style='margin-top:0;'>请输入正确的拼团价</p>");
		    		return false;
		    	}else if(groupon_price>price){
		    		$(trArr[index]).find("input[name='groupon_price']").parent().addClass("error");
		    		$(trArr[index]).find("input[name='groupon_price']").parent()
		    		.append("<p class='help-block error-message' style='margin-top:0;'>拼团价不能高于原价</p>");
		    		return false;
		    	}
		    	//如果选中团长优惠
		    	if($("#is_captain_discount").prop('checked')){
		    		//验证团长优惠价
		    		if(captain_groupon_price==""||isNaN(captain_groupon_price)){
		    			$(trArr[index]).find("input[name='captain_groupon_price']").parent().addClass("error");
		    			$(trArr[index]).find("input[name='captain_groupon_price']").parent()
		    			.append("<p class='help-block error-message' style='margin-top:0;'>请输入正确的团长优惠价</p>");
		    			return false;
		    		}else if(Number(captain_groupon_price)>Number($(trArr[index]).find("input[name='captain_groupon_price']").parents("td").prev().find("input").val())){
		    			$(trArr[index]).find("input[name='captain_groupon_price']").parent().addClass("error");
		    			$(trArr[index]).find("input[name='captain_groupon_price']").parent()
		    			.append("<p class='help-block error-message' style='margin-top:0;'>团长优惠价不能高于拼团价</p>");
		    			return false;
		    		}
		    	}
	        }  
	}
	
		//验证通过，ajax后台保存
	    $.ajax({
	        url : getRootPath()+"/groupon/updateGroupon.action",
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
							+ '/pages/marketing/groupon/grouponList.jsp';
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
	
});



//弹出选择参加拼团活动的商品的列表（单选）
function addGrouponGoods(obj,flag){
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
    		  ,content:getRootPath()+'/commons/jsp/com_goods.jsp?mutl_type=1&marketing=groupon'
    		});
		})
}

//显示选中的商品
function get_good_groupon(idArr){
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
	            	 var commodity_url = data.data.commodity_url;
	            	 //商品价格
	            	 var price = data.data.price;
	            	 //库存
	            	 var store_count = data.data.store_count;
	            	 //商品图片
	            	 var commodity_image;
	        		 if(data.data.img_path_str.indexOf(",")<0){
	        			 commodity_image = data.data.img_path_str;
	        		 }else{
	        			//图片url,取第一个，之前的值
	        			 commodity_image = data.data.img_path_str.substr(0,data.data.img_path_str.indexOf(","));
	        		 }
	        		 //第一个li显示
	        		 $(".module-goods-list li").eq(0).css("display","block");
	        		 //给商品图片加上链接
	        		 $(".module-goods-list li").eq(0).find(".goods-thumb").attr("href",commodity_url+"?toview=frompc");
	        		 //添加上商品图片
	        		 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+commodity_image+")");
	        		 //给商品id隐藏域赋值
	        		 $("input[name='commodity_id']").val(id);
	        		 //第2个li隐藏
	        		 $(".module-goods-list li").eq(1).css("display","none");
	        		 //最下方优惠设置显示
	        		 $("#set_groupon_discount").css("display","block");
	        		 //优惠设置表格的div显示
	        		 $("#set_groupon_discount_table").css("display","block");
	        		 //该商品没有规格时
	        		 if(!isNotEmpty(data.speList) || data.speList.length==0){
		        		 //加载表格的数据
		        		 var tr = 
		        			 '<tr>																				 '
		        			 +'	<td>'+price+'</td>                                                               '
		        			 +'	<td>                                                                             '
		        			 +'		<div class="control-group">                                                  '
		        			 +'			<input name="groupon_price" class="js-groupon-price"  type="text" />     '
		        			 +'		</div>                                                                       '
		        			 +'	</td>                                                                            '
		        			 +'	<td>                                                                             '
		        			 +'		<div class="control-group chief-discount">                                   '
		        			 +'			<input name="captain_groupon_price" class="js-groupon-price" type="text" />'
		        			 +'		</div>                                                                       '
		        			 +'	</td>                                                                            '
		        			 +'	<td>'+store_count+'</td>                                                         '
		        			 +'</tr>                                                                             '
		        		 $("#set_groupon_discount_table tbody").append(tr);
		        		 //将前三个td设置为display:none
		        		 $("#set_groupon_discount_table thead tr td").eq(0).css("display","none");
		        		 $("#set_groupon_discount_table thead tr td").eq(1).css("display","none");
		        		 $("#set_groupon_discount_table thead tr td").eq(2).css("display","none");
		        		 grouponCommodityArr.push(id);
	        		 }
	        		 //有规格时
	        		 else{
	        			 $.each(data.speList,function(i,n){
	        					//规格id
	        					var specification_id = n.specification_id;
	        					//规格名称
	        					var specification_name = n.specification_name;
	        					//加载商品规格数据（即表头数据）
	        					loadGrouponCommoditySpe(specification_id,i);
	        				})
	        			 /** 追加tbody **/
	        			//判断有几种规格
        				$.ajax({
        				        url : getRootPath()+"/commodity/judgeHowmanySpe.action",
        				        type : "post",
        				        dataType:"text",
        				        data:{"commodity_id":id},
        				        success : function (data) {
        				        	if(data=="one"){
        				        		initSpevalueTableWhenOne("",id,"","add");
        				        	}else if(data=="two"){
        				        		initSpevalueTableWhenTwo("",id,"","add");
        				        	}else if(data=="three"){
        				        		initSpevalueTableWhenThree("",id,"","add");
        				        	}
        				        },
        				        error:function(){
        						}
        				    })
	        		 }
	            },
	            'error':function(){
	            	
	            }
		    });
			
		}
	}
}


//删除选择的商品（新增时）
function delGrouponCommodity(){
	 //第一个li隐藏
	 $(".module-goods-list li").eq(0).css("display","none");
	 //清空隐藏域的值
	 $("input[name='commodity_id']").val("");
	 //第二个li显示
	 $(".module-goods-list li").eq(1).css("display","block");
	 //优惠设置隐藏
	 $("#set_groupon_discount").css("display","none");
	 //优惠设置表格的div隐藏
	 $("#set_groupon_discount_table").css("display","none");
	 //表格的tr清空
	 $("#set_groupon_discount_table tbody").empty();
	 //清空全局数组
	 grouponCommodityArr.splice(0,grouponCommodityArr.length);
	 grouponSpevalueArr.splice(0,grouponSpevalueArr.length);
}



//编辑时，初始化数据
function initEdit(){
	if(grouponId!=null){
		queryGrouponEditInfo();
	}  
}


//初始化加载页面内容（修改）
function queryGrouponEditInfo(){
	 $.ajax({
	        url : getRootPath()+"/groupon/queryGroupon.action",
	        type : "post",
	        dataType :"json",
	        data : {id:grouponId},
	        success : function (gdata) {
	        	if(gdata){
	        		opera_groupon_info(gdata.groupon,gdata.gooodsList);
	        	}
	        },
	        error:function(){
			}
	    })
}

//获取拼团基本信息
function opera_groupon_info(data,gooodsList){
	//活动名称
	$("input[name='groupon_name']").val(data.groupon_name);
	//活动的生效日期的开始时间
	$("input[name='groupon_active_stime']").val(data.groupon_active_stime);
	//活动的生效日期的结束时间
	$("input[name='groupon_active_etime']").val(data.groupon_active_etime);
	
	//是否固定人数选中
	$("input[name='is_limit_attend_num'][value='"+data.is_limit_attend_num+"']").attr("checked",true);
	//如果选了固定人数
	if(data.is_limit_attend_num=="0"){
		$("#attend_person_num").show();
		$("#min_person_num").hide();
		//固定人数回显
		$("input[name='attend_person_num']").val(data.attend_person_num);
	}
	//如果选了最低人数
	else if(data.is_limit_attend_num=="1"){
		$("#attend_person_num").hide();
		$("#min_person_num").show();
		//最低人数回显
		$("input[name='min_person_num']").val(data.min_person_num);
	}
	
	//商品限购是否选中
	if(data.is_limit_buy==0){
		$("#is_limit_buy").attr("checked",true);
		//限购数量显示
		$("#is_limit_buy").parent().siblings().attr("style","");
	}else{
		$("#is_limit_buy").attr("checked",false);
		//限购数量隐藏
		$("#is_limit_buy").parent().siblings().attr("style","visibility: hidden;");
	}
	//每人限购件数
	if(data.limit_buy_num==0){
		$("input[name='limit_buy_num']").val("");
	}else{
		$("input[name='limit_buy_num']").val(data.limit_buy_num);
	}
	
	//是否开启凑团
	if(data.is_open_groupon==0){
		$("#is_open_groupon").attr("checked",true);
	}else{
		$("#is_open_groupon").attr("checked",false);
	}
	//是否开启模拟成团
	if(data.is_open_simulation_team==0){
		$("#is_open_simulation_team").attr("checked",true);
	}else{
		$("#is_open_simulation_team").attr("checked",false);
	}
	//团长是否享受优惠价
	if(data.is_captain_discount==0){
		$("#is_captain_discount").attr("checked",true);
		//thead下的团长优惠价div显示
		$("thead .chief-discount").show();
	}else{
		$("#is_captain_discount").attr("checked",false);
		//thead下的团长优惠价div隐藏
		$("thead .chief-discount").hide();
	}
	
	 //商品图片
	 var commodity_image;
	 if(data.img_path_str.indexOf(",")<0){
		 commodity_image = data.img_path_str;
	 }else{
		//图片url,取第一个，之前的值
		 commodity_image = data.img_path_str.substr(0,data.img_path_str.indexOf(","));
	 }
	 //给商品图片加上链接
	 $(".module-goods-list li").eq(0).find(".goods-thumb").attr("href",data.commodity_url);
	 //添加上商品图片
	 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+commodity_image+")");
	 //隐藏域商品id
	 $("input[name='commodity_id']").val(data.commodity_id);
	 //活动标签隐藏域赋值
	 $("input[name='activity_label']").val(data.activity_label);
	 /**活动标签图片展示**/
	 //第一个li显示
	 $(".module-goods-list").eq(1).find("li").eq(0).css("display","block");
	 //添加上标签图片
	 $(".module-goods-list").eq(1).find("li").eq(0).find(".goods-thumb").css("background-image","url("+data.activity_label+")");
	 //第2个li隐藏
	 $(".module-goods-list").eq(1).find("li").eq(1).css("display","none");
	 //最下方优惠设置显示
	 $("#set_groupon_discount").css("display","block");
	 //优惠设置表格的div显示
	 $("#set_groupon_discount_table").css("display","block");
	 //加载商品表格的数据
	 opera_goodsList_groupon(gooodsList,data);
}



//初始化时加载商品列表
function opera_goodsList_groupon(gooodsList,groupon){
	//根据商品id，判断商品有几种规格
	$.ajax({
    	"type":"post",
        "url": getRootPath()+"/commodity/queryCommodityInfo.action",
        async: false,//同步
        'data' : {id:groupon.commodity_id},
        "dataType":"json",
        'success' : function (data) {
        	//没有规格时
        	if(!isNotEmpty(data.speList) || data.speList.length==0){
        		$.each(gooodsList,function(i,n){
    				 var tr = 
    					 '<tr>'
        				 +'	<td>'+n.price+'</td>';
    				 if(groupon.groupon_flag=="未开始"){
    					 tr+= 
    					  '<td>'
        				 +'		<div class="control-group">'
        				 +'	      <input name="groupon_price" class="js-groupon-price"  type="text" value="'+n.groupon_price+'"/>'
        				 +'		</div>'
        				 +'	</td>'
        				 +' <td>';
        				 //有团长优惠价
        				 if(groupon.is_captain_discount==0){
        				  tr+=
        				  '		<div class="control-group chief-discount">'
        				  +'		  <input name="captain_groupon_price" class="js-groupon-price" type="text" value="'+n.captain_groupon_price+'"/>'
    					  +'	</div>';
        				  }
        				 tr += '</td>';
    		   			}
    				 else{
		   				 tr+= 
    					  '<td>'
        				 +'		<div class="control-group">'
        				 +'	      <input name="groupon_price" class="js-groupon-price" disabled type="text" value="'+n.groupon_price+'"/>'
        				 +'		</div>'
        				 +'	</td>'
        				 +' <td>';
		   				 //有团长优惠价
        				 if(groupon.is_captain_discount==0){
        				  tr+=
        				  '	  <div class="control-group chief-discount">'
        				  +'		  <input name="captain_groupon_price" class="js-groupon-price" disabled type="text" value="'+n.captain_groupon_price+'"/>'
    					  +'	  </div>';
        				  }
        				 tr += '</td>';
    		   			}
        				 tr+=
        				 '	<td>'+n.store_count+'</td>'
        				 +'</tr>';
        				 $("#set_groupon_discount_table tbody").append(tr);
        				 grouponCommodityArr.push(n.commodity_id);
        		})
        	}
        	//有规格时
        	else{
   			 $.each(data.speList,function(i,n){
   					//规格id
   					var specification_id = n.specification_id;
   					//规格名称
   					var specification_name = n.specification_name;
   					//加载商品规格数据（即表头数据）
   					loadGrouponCommoditySpe(specification_id,i);
   				})
   			 /** 追加tbody **/
   			//判断有几种规格
			$.ajax({
			        url : getRootPath()+"/commodity/judgeHowmanySpe.action",
			        type : "post",
			        dataType:"text",
			        data:{"commodity_id":groupon.commodity_id},
			        success : function (data) {
			        	if(data=="one"){
			        		initSpevalueTableWhenOne(groupon.id,groupon.commodity_id,groupon.groupon_flag,"update");
			        	}else if(data=="two"){
			        		initSpevalueTableWhenTwo(groupon.id,groupon.commodity_id,groupon.groupon_flag,"update");
			        	}else if(data=="three"){
			        		initSpevalueTableWhenThree(groupon.id,groupon.commodity_id,groupon.groupon_flag,"update");
			        	}
			        },
			        error:function(){
					}
			    })
   		   }
        }
	});
}



//商品有规格时，加载表头
function loadGrouponCommoditySpe(specification_id,num){
	$.ajax({
        url : getRootPath()+"/commodity/querySpecificationsList.action",
        type : "post",
        dataType:"json",
        success : function (gdata) {
        	if(gdata!=null){
        		 var glist=gdata.data;
  	             for(var i=0;i<glist.length;i++){
  	            	 var gindex=glist[i];
  	            	 var id=gindex.id;
  	            	 var name=gindex.name;
  	            	 if(id==specification_id){
  	            		//相应的td显示
  	            		$("#set_groupon_discount_table thead tr td").eq(num).css("display","");
  	            		//赋予其文本
  	            		$("#set_groupon_discount_table thead tr td").eq(num).text(name);
  	            	 }
  	             }
        	}
        }
    })
}



/**
 * 加载下方表格（商品1种规格时）
 */
function initSpevalueTableWhenOne(groupon_id,commodity_id,groupon_flag,edit_flag){
		//获得tbody对象,用于之后追加tr
		var tbody = $("#set_groupon_discount_table tbody");
		 $.ajax({
	        url : getRootPath()+"/groupon/querySpevalue1List.action",
			type : "post",
	        data : {commodity_id:commodity_id,groupon_id:groupon_id},
	        dataType:"json",
	        async:false,
	        success : function (data11) {
	        	var spevalue1List = data11.data;
	        	 for(var l=0;l<spevalue1List.length;l++){
	             	 var index1 = spevalue1List[l];
	         		 var tr = 
	    				'<tr>' 																											
	    				+' <td rowspan="1" >'+index1.specification_value_name1+'</td>'
	    				+' <td id="originalCost">'+index1.detail_price+'</td>'
	    				+'	<td>'
	        			+'		<div class="control-group">';
	         		//如果是新增时
                	if(edit_flag=="add"){
                		tr += '<input name="groupon_price" class="js-groupon-price" type="text" >';
                	}else{
	         		 	 if(index1.groupon_price!=null){
	         		 		 if(groupon_flag=="未开始"){
	         		 			tr += '<input name="groupon_price" class="js-groupon-price" type="text" value='+index1.groupon_price+'>';
	         		 		 }else{
	         		 			tr += '<input name="groupon_price" class="js-groupon-price" type="text" disabled value='+index1.groupon_price+'>';
	         		 		 }
	         		 	 }else{
	         		 		 tr += '<input name="groupon_price" class="js-groupon-price" type="text" >';
	         		 	 }
                	}
	        			 tr+='</div> '
	        			 +'	</td>'
	        			 +'	<td>';
	        			 //选中了团长优惠价
	        			 if($("#is_captain_discount").prop('checked')){
	        				 tr+=	'<div class="control-group chief-discount">';
	        			 }else{
	        				 tr+=	'<div class="control-group chief-discount" style="display:none;">';
	        			 }
	        			//如果是新增时
	                 	if(edit_flag=="add"){
	                 		tr += '<input name="captain_groupon_price" class="js-groupon-price" type="text">';
	                 	}else{
	        			 if(index1.captain_groupon_price!=null){
	        				 if(groupon_flag=="未开始"){
	        					 tr += '<input name="captain_groupon_price" class="js-groupon-price" type="text" value='+index1.captain_groupon_price+'>';
	        				 }else{
	        					 tr += '<input name="captain_groupon_price" class="js-groupon-price" type="text" disabled value='+index1.captain_groupon_price+'>';
	        				 }
	        			 }else{
	        				 tr += '<input name="captain_groupon_price" class="js-groupon-price" type="text">';
	        			 }
	                 	}
	        			 tr+='	</div>'
	        			 +'	</td> '
	        			 +'	<td>'+index1.stock+'</td>'
	        			 +'</tr>';
	    				tbody.append(tr);
	         		 	grouponSpevalueArr.push(index1.id);
	        	 } 		
	        }
		 })
}


/**
 * 加载下方表格（商品2种规格时）
 */
function initSpevalueTableWhenTwo(groupon_id,commodity_id,groupon_flag,edit_flag){
	//获得tbody对象,用于之后追加tr
	var tbody = $("#set_groupon_discount_table tbody");
    //首先获得 根据商品id查询有多少个不同的  第一种规格值id 的list
	$.ajax({
        url : getRootPath()+"/commodity/queryDistinctSpevalue1List.action",
		type : "post",
        data : {commodity_id:commodity_id},
        dataType:"json",
        async:false,
        success : function (gdata) {
        	 var glist=gdata.data;
             for(var i=0;i<glist.length;i++){
            	 var dindex1=glist[i];
            	 var specification_value_id1 = dindex1.specification_value_id1;
            	//第1种规格值名称，追加tr时用到
            	 var specification_value_name1 = dindex1.specification_value_name1;
            	 $.ajax({
  	       	        url : getRootPath()+"/groupon/querySpevalue2List.action",
  	       			type : "post",
  	       	        data : {groupon_id:groupon_id,commodity_id:commodity_id,specification_value_id1:specification_value_id1},
  	       	        dataType:"json",
  	       	        async:false,
  	       	        success : function (data22) {   
  	       	        	 var spevalue2List = data22.data;
  	       	        	 //商品有2种规格时，根据商品id、第1种规格值id,查询有多少个第2种规格值id，即该集合的长度
  	       	        	 var spevalue2ListLength = spevalue2List.length;
  	       	        	 for(var m=0;m<spevalue2List.length;m++){
  	                     	 var index2 = spevalue2List[m];
  	                     	//每次循环的第1行
  	                     	if(m==0){
  	                     	 var tr = 
  	                     			'<tr>'
  	                     			+' <td rowspan='+spevalue2ListLength+' style="vertical-align: middle;">'+specification_value_name1+'</td>'
  	                     			+' <td rowspan="1">'+index2.specification_value_name2+'</td>'
  	                     			+' <td id="originalCost">'+index2.detail_price+'</td>'
	  	                     		 +'	<td>'
		  	  	        			 +'		<div class="control-group">';
  	                     	 	//如果是新增时
  	                     	 	if(edit_flag=="add"){
  	                     	 		tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
  	                     	 	}else{
  	                     	 		if(index2.groupon_price!=null){
	  	                     	 		if(groupon_flag=="未开始"){
	  	                     	 			tr+='<input name="groupon_price" class="js-groupon-price" type="text" value='+index2.groupon_price+'>';
	  	                     	 		}else{
	  	                     	 			tr+='<input name="groupon_price" class="js-groupon-price" type="text" disabled value='+index2.groupon_price+'>';
	  	                     	 		}
  	                     	 		}else{
  	                     	 			tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
  	                     	 		}
  	                     	 	}
		  	  	        			 tr+='</div>'
		  	  	        			 +'	</td>'
		  	  	        			 +'	<td>';
		  	  	        			 //选中了团长优惠价
		  		        			if($("#is_captain_discount").prop('checked')){
		  		        				tr+=	'<div class="control-group chief-discount">';
		  		        			}else{
		  		        				tr+=	'<div class="control-group chief-discount" style="display:none;">';
		  		        			}
		  		        		//如果是新增时
	  	                     	if(edit_flag=="add"){
	  	                     		tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
	  	                     	}else{
		  	  	        			if(index2.captain_groupon_price!=null){
			  	  	        			if(groupon_flag=="未开始"){
			  	  	        				tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" value='+index2.captain_groupon_price+'>';
			  	  	        			}else{
			  	  	        				tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" disabled value='+index2.captain_groupon_price+'>';
			  	  	        			}
		  	  	        			}else{
		  	  	        				tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
		  	  	        			}
	  	                     	}
		  	  	        			 tr+='</div>'
		  	  	        			 +'	</td>'
		  	  	        			 +'	<td>'+index2.stock+'</td>'
		  	  	        			 +'</tr>';
  	                     			tbody.append(tr); 
  	                     	}
  	                     	//其他行
  	                     	else{
  	                     	 var tr = 
  	                     			'<tr>' 																											
  	                     			+' <td rowspan="1" >'+index2.specification_value_name2+'</td>'
  	                     			+' <td id="originalCost">'+index2.detail_price+'</td>'
	  	                     		+'	<td>'
		  	  	        			+'		<div class="control-group">';
  	                     	 	//如果是新增时
	  	                     	if(edit_flag=="add"){
	  	                     		tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
	  	                     	}else{
		  	                     	if(index2.groupon_price!=null){
		  	                     		if(groupon_flag=="未开始"){
		  	                     			tr+='<input name="groupon_price" class="js-groupon-price" type="text" value='+index2.groupon_price+'>';
		  	                     		}else{
		  	                     			tr+='<input name="groupon_price" class="js-groupon-price" type="text" disabled value='+index2.groupon_price+'>';
		  	                     		}
		                     	 	}else{
		                     	 		tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
		                     	 	}
	  	                     	}
		  	  	        			tr +='</div>'
		  	  	        			 +'	</td>'
		  	  	        			 +'	<td>';
		  	  	        			 //选中了团长优惠价
		  		        			 if($("#is_captain_discount").prop('checked')){
		  		        				 tr+=	'<div class="control-group chief-discount">';
		  		        			 }else{
		  		        				 tr+=	'<div class="control-group chief-discount" style="display:none;">';
		  		        			 }
		  		        		//如果是新增时
			  	                if(edit_flag=="add"){
			  	                	tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
			  	                }else{
			  	  	        		if(index2.captain_groupon_price!=null){
				  	  	        		if(groupon_flag=="未开始"){
			  	  	        				tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" value='+index2.captain_groupon_price+'>';
				  	  	        		}else{
				  	  	        			tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" disabled value='+index2.captain_groupon_price+'>';
				  	  	        		}
		  	  	        			}else{
		  	  	        				tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
		  	  	        			}
			  	                }
			  	  	        		tr+='</div>'
		  	  	        			 +'	</td>'
		  	  	        			 +'	<td>'+index2.stock+'</td>'
		  	  	        			 +'</tr>';
  	                     			tbody.append(tr); 
  	                     		}
  	                     	//规格值数组
  	                     	grouponSpevalueArr.push(index2.id);
  	       	        	 } 		
  	       	        }
       		 })
           }
        }
	});    	 
}


/**
 * 加载下方表格（商品3种规格时）
 */
function initSpevalueTableWhenThree(groupon_id,commodity_id,groupon_flag,edit_flag){
	//获得tbody对象,用于之后追加tr
    var tbody = $("#set_groupon_discount_table tbody");
	//首先获得 根据商品id查询有多少个不同的  第一种规格值id 的list
	$.ajax({
        url : getRootPath()+"/commodity/queryDistinctSpevalue1List.action",
		type : "post",
        data : {commodity_id:commodity_id},
        dataType:"json",
        async:false,
        success : function (gdata) {
        	 var glist=gdata.data;
        	 if(glist.length>0){
             for(var i=0;i<glist.length;i++){
            	 var dindex1=glist[i];
            	 var specification_value_id1 = dindex1.specification_value_id1;
            	 //第1种规格值名称，追加tr时用到
            	 var specification_value_name1 = dindex1.specification_value_name1;
            	//然后  根据商品id、第1种规格值id,查询有多少个不同的  第2种规格值id 
            	$.ajax({
            	   url : getRootPath()+"/commodity/queryDistinctSpevalue2List.action",
                   type : "post",
                   data : {commodity_id:commodity_id,specification_value_id1:specification_value_id1},
                   dataType:"json",
                   async:false,
                   success : function (data) {
                	   var distinctSpevalue2List = data.data;
  	                	 if(distinctSpevalue2List.length>0){
  	                	   //获得有多少个不同的第2种规格值id，即该集合的长度
  	                	   var distinctSpevalue2Listlength = distinctSpevalue2List.length;
  	                	   for(var j=0;j<distinctSpevalue2List.length;j++){
  	                		   var dindex2 = distinctSpevalue2List[j];
  	                		   var specification_value_id2 = dindex2.specification_value_id2;
  	                		   //第2种规格值名称，追加tr时用到
  	                		   var specification_value_name2 = dindex2.specification_value_name2
  	                		   //再根据商品id、第1种规格值id、第2种规格值id,查询有多少个 第3种规格值id
  	                		   $.ajax({
    	      	            	   url : getRootPath()+"/groupon/queryDistinctSpevalue3List.action",
    	      	                   type : "post",
    	      	                   data : {
    	      	                	   	   groupon_id:groupon_id,
    	      	                	   	   commodity_id:commodity_id,
    	      	                	   	   specification_value_id1:specification_value_id1,
    	      	                	   	   specification_value_id2:specification_value_id2
    	      	                   		   },
    	      	                   dataType:"json",
    	      	                   async:false,
    	      	                   success : function (data2) {
	    	      	                	 var distinctSpevalue3List = data2.data;
	    	      	                	   //此时说明该商品有3种规格
	    	      	                	   if(distinctSpevalue3List.length>0){
	    	      	                	     //获得第2列跨几行，即该集合的长度
	    	      	                	     var kua2 = distinctSpevalue3List.length;
	    	      	                	     //获得第1列跨几行，kua2与之前获得的length相乘
	    	      	                	     var kua1 = kua2*distinctSpevalue2Listlength;
		    	      	                	 for(var k=0;k<distinctSpevalue3List.length;k++){
		    	      	                		var dindex3 = distinctSpevalue3List[k];
		    	      	                		 //每次循环的第一行
		    	      	                		 if(k==0 && j==0){
		    	      	                			 var tr = 
		    	      	                				'<tr>' 																											
		    	      	                				+' <td rowspan='+kua1+' style="vertical-align: middle;">'+specification_value_name1+'</td>'
		    	      	                				+' <td rowspan='+kua2+' style="vertical-align: middle;">'+specification_value_name2+'</td>'
		    	      	                				+' <td rowspan="1" >'+dindex3.specification_value_name3+'</td>'
		    	      	                				+' <td id="originalCost">'+dindex3.detail_price+'</td>'
		    	      	                				+' <td>'
		    				  	  	        			+'		<div class="control-group">';
		    	      	                			 //如果是新增时
		    	      	                			 if(edit_flag=="add"){
		    	      	                				tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
		    	      	                			 }else{
		    				  	  	        			if(dindex3.groupon_price!=null){
			    				  	  	        			if(groupon_flag=="未开始"){
			    				  	  	        				tr+='<input name="groupon_price" class="js-groupon-price" type="text" value='+dindex3.groupon_price+'>';
			    				  	  	        			}else{
			    				  	  	        				tr+='<input name="groupon_price" class="js-groupon-price" type="text" disabled value='+dindex3.groupon_price+'>';
			    				  	  	        			}
		    				  	  	        			}else{
		    				  	  	        				tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
		    				  	  	        			}
		    	      	                			 }
		    				  	  	        			 tr+='	</div>'
		    				  	  	        			 +'	</td>'
		    				  	  	        			 +'	<td>';
		    				  	  	        			 //选中了团长优惠价
		    				  		        			 if($("#is_captain_discount").prop('checked')){
		    				  		        				 tr+=	'<div class="control-group chief-discount">';
		    				  		        			 }else{
		    				  		        				 tr+=	'<div class="control-group chief-discount" style="display:none;">';
		    				  		        			 }
	    				  		        			//如果是新增时
		    	      	                			if(edit_flag=="add"){
		    	      	                				tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
		    	      	                			}else{
		    				  	  	        			 if(dindex3.captain_groupon_price!=null){
		    				  	  	        				if(groupon_flag=="未开始"){
		    				  	  	        					tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" value='+dindex3.captain_groupon_price+'>';
		    				  	  	        				}else{
		    				  	  	        					tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" disabled value='+dindex3.captain_groupon_price+'>';
		    				  	  	        				}
		    				  	  	        			 }else{
		    				  	  	        				 tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
		    				  	  	        			 }
		    	      	                			}
		    				  	  	        			 tr+='	</div>'
		    				  	  	        			 +'	</td>'
		    				  	  	        			 +'	<td>'+dindex3.stock+'</td>'
		    				  	  	        			 +'</tr>';
		    	      	                				tbody.append(tr);
		    	      	                		 }
		    	      	                		 //包含第2个td的行
		    	      	                		 else if(k==0 && j!=0){
		    	      	                			 var tr = 
		    	      	                				'<tr >' 																											
		    	      	                				+' <td rowspan='+kua2+' style="vertical-align: middle;">'+specification_value_name2+'</td>'
		    	      	                				+' <td rowspan="1">'+dindex3.specification_value_name3+'</td>'
		    	      	                				+' <td id="originalCost">'+dindex3.detail_price+'</td>'
		    	      	                				+'	<td>'
		    				  	  	        			+'		<div class="control-group">';
		    	      	                			//如果是新增时
			    	      	                		if(edit_flag=="add"){
			    	      	                			tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
			    	      	                		}else{
			    	      	                			if(dindex3.groupon_price!=null){
			    	      	                				if(groupon_flag=="未开始"){
			    	      	                					tr+='<input name="groupon_price" class="js-groupon-price" type="text" value='+dindex3.groupon_price+'>';
			    	      	                				}else{
			    	      	                					tr+='<input name="groupon_price" class="js-groupon-price" type="text" disabled value='+dindex3.groupon_price+'>';
			    	      	                				}
		    				  	  	        			}else{
		    				  	  	        				tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
		    				  	  	        			}
			    	      	                		}
			    	      	                			tr+='	</div>'
			    				  	  	        		+'	</td>'
			    				  	  	        		+'	<td>';
				    	      	                		//选中了团长优惠价
				    	      	 	        			 if($("#is_captain_discount").prop('checked')){
				    	      	 	        				 tr+=	'<div class="control-group chief-discount">';
				    	      	 	        			 }else{
				    	      	 	        				 tr+=	'<div class="control-group chief-discount" style="display:none;">';
				    	      	 	        			 }
				    	      	 	        		//如果是新增时
					    	      	                if(edit_flag=="add"){
					    	      	                	tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
					    	      	                }else{
			    	      	                			 if(dindex3.captain_groupon_price!=null){
			    	      	                				if(groupon_flag=="未开始"){
			    	      	                					tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" value='+dindex3.captain_groupon_price+'>';
			    	      	                				}else{
			    	      	                					tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" disabled value='+dindex3.captain_groupon_price+'>';
			    	      	                				}
		    				  	  	        			 }else{
		    				  	  	        				 tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
		    				  	  	        			 }
					    	      	                }
		    				  	  	        			 tr+='	</div>'
		    				  	  	        			 +'	</td>'
		    				  	  	        			 +'	<td>'+dindex3.stock+'</td>'
		    				  	  	        			 +'</tr>';
		    	      	                				tbody.append(tr);
		    	      	                		 }
		    	      	                		 //其他行
		    	      	                		 else{
		    	      	                			var tr = 
		    	      	                				'<tr>' 																											
		    	      	                				+' <td rowspan="1">'+dindex3.specification_value_name3+'</td>'
		    	      	                				+' <td id="originalCost">'+dindex3.detail_price+'</td>'
		    	      	                				+'	<td>'
		    				  	  	        			+'		<div class="control-group">';
		    	      	                			//如果是新增时
					    	      	                if(edit_flag=="add"){
					    	      	                	tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
					    	      	                }else{
			    	      	                			if(dindex3.groupon_price!=null){
			    	      	                				if(groupon_flag=="未开始"){
			    	      	                					tr+='<input name="groupon_price" class="js-groupon-price" type="text" value='+dindex3.groupon_price+'>';
			    	      	                				}else{
			    	      	                					tr+='<input name="groupon_price" class="js-groupon-price" type="text" disabled value='+dindex3.groupon_price+'>';
			    	      	                				}
		    				  	  	        			}else{
		    				  	  	        				tr+='<input name="groupon_price" class="js-groupon-price" type="text" >';
		    				  	  	        			}
					    	      	                }
			    	      	                			tr+='	</div>'
			    				  	  	        		+'	</td>'
			    				  	  	        		+'	<td>';
				    	      	                		//选中了团长优惠价
				    	      	 	        			 if($("#is_captain_discount").prop('checked')){
				    	      	 	        				 tr+=	'<div class="control-group chief-discount">';
				    	      	 	        			 }else{
				    	      	 	        				 tr+=	'<div class="control-group chief-discount" style="display:none;">';
				    	      	 	        			 }
				    	      	 	        		//如果是新增时
							    	      	        if(edit_flag=="add"){
							    	      	        	tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
							    	      	        }else{
			    	      	                			 if(dindex3.captain_groupon_price!=null){
			    	      	                				if(groupon_flag=="未开始"){
			    	      	                					tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" value='+dindex3.captain_groupon_price+'>';
			    	      	                				}else{
			    	      	                					tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" disabled value='+dindex3.captain_groupon_price+'>';
			    	      	                				}
		    				  	  	        			 }else{
		    				  	  	        				 tr+='<input name="captain_groupon_price" class="js-groupon-price" type="text" >';
		    				  	  	        			 }
							    	      	        }
		    				  	  	        			 tr+='	</div>'
		    				  	  	        			 +'	</td>'
		    				  	  	        			 +'	<td>'+dindex3.stock+'</td>'
		    				  	  	        			 +'</tr>';                                                                           
		    	      	                				tbody.append(tr);
		    	      	                		 }
		    	      	                		//规格值数组
		    	 	  	                     	grouponSpevalueArr.push(dindex3.id);
		    	      	                	 }
    	      	                   		}
    	      	                   }
    	                	   });
  	                	   }
                	   }
                   }	   
            	})
             }
          }
        }
    })
}

/**
 * 调用共用图片选择弹出框（选择一张图片作为活动标签，单选）
 */
function add_activity_label(){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun=show_activity_label&mutl_type=1'   //type=1 单选; 2多选
		});
}


//展示选择的标签图片
function show_activity_label(url){
	 //第一个li显示
	 $(".module-goods-list").eq(1).find("li").eq(0).css("display","block");
	 //添加上标签图片
	 $(".module-goods-list").eq(1).find("li").eq(0).find(".goods-thumb").css("background-image","url("+url+")");
	 //给标签图片隐藏域赋值
	 $("input[name='activity_label']").val(url);
	 //第2个li隐藏
	 $(".module-goods-list").eq(1).find("li").eq(1).css("display","none");
}

//删除选择的标签图片
function delete_activity_label(){
	 //第一个li隐藏
	 $(".module-goods-list").eq(1).find("li").eq(0).css("display","none");
	 //清空隐藏域的值
	 $("input[name='activity_label']").val("");
	 //第二个li显示
	 $(".module-goods-list").eq(1).find("li").eq(1).css("display","block");
}
