var id=getUrlParam("id");

layui.use(['form','layer'],function(){
	var form = layui.form();
	var layer = layui.layer;
	//获取所有国家
	$.ajax({
		url:getRootPath() + '/goodsBrand/getCountryList.action',
		type:'post',
		dataType:'json',
		success:function(data){
			var html = "";
			$.each(data.countryList, function(index,item){
				html += '<option data-country_sign_url="'+item.country_sign_url+'" value="'+item.id+'">'+item.country_name+'</option>';
			});
			$('#country_id').html(html);
			if(id != null && id != '') {
				editBrand(id);
			} else {
				$('#icon').attr("src",data.countryList[0].country_sign_url);
			}
			form.render('select');
		}
	});
	
	//选择国家
	form.on('select(countryFilter)', function(data){
		$('#icon').attr("src", $(data.elem[data.elem.selectedIndex]).data("country_sign_url"));
	});
	
	//验证
	form.verify({
		brand_name: function(value, item){ //value：表单的值、item：表单的DOM对象
		    if(value.length <= 0){
		    	return "请输入品牌名称";
		    }
		},
		brand_content: function(value, item){ //value：表单的值、item：表单的DOM对象
		    if(value.length <= 0){
		    	return "请输入品牌介绍";
		    }
		}
	});
	
	//提交
	form.on('submit(confirmFilter)',function(data){
		var formInfo = $('#brandForm1').serializeObject();
		if(formInfo.brand_icon_url==""){//未上传活动标签
			parent.layer.alert('请您选择一个品牌图标');
			return false;
		}
		if(formInfo.brand_back_img==""){//未上传活动标签
			parent.layer.alert('请您选择一个背景图片');
			return false;
		}
		
		formInfo.country_sign_url = $('#country_id option:selected').data("country_sign_url");
		formInfo.brand_country = $('#country_id option:selected').text();
		
		var url = '/goodsBrand/saveGoodsBrandInfo.action';
		if(id != "" && id != undefined){
			url = '/goodsBrand/updateGoodsBrandInfo.action';
		}
		$.ajax({
			url:getRootPath() + url,
			type:'post',
			dataType:'text',
			data:{
				queryJsonStr: JSON.stringify(formInfo),
				brandId: id
			},
			success:function(data){
				if(data=="success"){
					location.href = getRootPath()+"/pages/marketing/goodsbrand/goodsbrandList.jsp"
				}
			}
		});
		return false;
	});
	
	$('#back').click(function(){
		location.href = getRootPath()+"/pages/marketing/goodsbrand/goodsbrandList.jsp"
	});
	form.render();
});

//编辑
function editBrand(id){
	layui.use('form',function(){
		 var form = layui.form();
		 var layer = layui.layer;
		 $.ajax({
				url:getRootPath() + '/goodsBrand/queryBrandInfoById.action',
				type:'post',
				dataType:'json',
				data:{
					id: id
				},
				success:function(data){
					 $('#brandForm1').setForm(data);
					 $("#brand_icon_url").val(data.brand_icon_url);
//					 $("#brand_back_img").val(data.brand_back_img);
					 $('#icon').attr("src",data.country_sign_url);
		     		 //第一个li显示
		     		 $("#betu li").eq(0).css("display","block");
		     		 //添加上商品图片
		     		 $("#betu li").eq(0).find(".goods-thumb").css("background-image","url("+data.brand_back_img+")");
		     		 //第2个li隐藏
		     		 $("#betu li").eq(1).css("display","none");
		     		 //第一个li显示
		     		 $("#pptb li").eq(0).css("display","block");
		     		 //添加上商品图片
		     		 $("#pptb li").eq(0).find(".goods-thumb").css("background-image","url("+data.brand_icon_url+")");
		     		 //第2个li隐藏
		     		 $("#pptb li").eq(1).css("display","none");

		     		 
//		     		var html = "";
//		     		$.each(countryList,function(index,item){
//      					if(item.country_name==data.brand_country){
//      						html += '<option selected="selected" value="'+item.id+'|'+item.country_name+'|'+item.country_sign_url+'">'+item.country_name+'</option>';
// 	    				}else{
// 	    					html += '<option value="'+item.id+'|'+item.country_name+'|'+item.country_sign_url+'">'+item.country_name+'</option>';
// 	    				}
//      				});
//      				$('#country_id').html(html);
//      				$('input[name="brand_show"][value='+data.brand_show+']').attr("checked",true); 
		     		 form.render();
//		     		form.render('select');
				}
			});
	});
}

//删除选择的商品（新增时）
function delGrouponCommodity(){
	 $("#brand_icon_url").val("");
	 //第一个li隐藏
	 $("#pptb li").eq(0).css("display","none");
	 //第二个li显示
	 $("#pptb li").eq(1).css("display","block");
}
//删除选择的商品（新增时）,背景图片
function delGrouponCommodity1(){
	 $("#brand_back_img").val("");
	 //第一个li隐藏
	 $("#betu li").eq(0).css("display","none");
	 //第二个li显示
	 $("#betu li").eq(1).css("display","block");
}

//弹出选择参加拼团活动的商品的列表（单选）
function addGrouponGoods(obj,flag){
	addpho('get_good_groupon',1);
}
function addGrouponGoods1(obj,flag){
	addpho('get_good_groupon1',1);
}

/**
* 调用共用图片选择弹出框
* @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
* @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
*/
function addpho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}

//显示选中的商品
function get_good_groupon(urlArr){
	console.log(urlArr);
	if( urlArr.length>0){
		 $("#brand_icon_url").val(urlArr[0]);
		//第一个li显示
		 $("#pptb li").eq(0).css("display","block");
		 //添加上商品图片
		 $("#pptb li").eq(0).find(".goods-thumb").css("background-image","url("+urlArr[0]+")");
		//第2个li隐藏
		 $("#pptb li").eq(1).css("display","none");
	}
}
function get_good_groupon1(urlArr){
	if( urlArr.length>0){
		 $("#brand_back_img").val(urlArr[0]);
		//第一个li显示
		 $("#betu li").eq(0).css("display","block");
		 //添加上商品图片
		 $("#betu  li").eq(0).find(".goods-thumb").css("background-image","url("+urlArr[0]+")");
		//第2个li隐藏
		 $("#betu  li").eq(1).css("display","none");
	}
}


