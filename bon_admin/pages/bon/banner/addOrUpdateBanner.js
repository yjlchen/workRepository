var id=getUrlParam("id");
var layer;
var form;
$(function(){
	layui.use(['form','element','layer','laydate'], function(){
		var layer = layui.layer;
		var form=layui.form();
		//查询所有的链接类型里面的所支持的类型的数据
		$.ajax({
			url : getRootPath()+ '/homeBanner/queryBannerLink.action',
			type:'get',
			dataType:'json',
			success:function(data){
				paddingHtml(data);
				form.render('select');
				if(isNotEmpty(id)){
					initData();
				}
			}			
		});
	})	
	//新增banner页面点击返回按钮
	$('#backButton').click(function(){
		window.location.href=getRootPath()+"/pages/bon/banner/banner.jsp";
	});
	//是否主推
	$("#select_featured").click(function(){		
		if($(this).children('input').eq(1).is(":checked")){			
			$("#mysort").hide();
		}else{
			$("#number_sort").val('1');
			$("#mysort").show();
		}
    });
})

layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	
	//选择链接类型
	form.on('select(typeFilter)',function(data){
		var value = data.value;
		showDetail(value);
	});
	
	//提交
	$("#confirmBtn").click(function(){
		//禁用提交
		disable_submit(true,'confirmBtn');
		
		var title = toTrim($("#bannertitle").val());
		if(!isNotEmpty(title)){
			parent.layer.msg('请输入banner标题', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var banner_img_url = $('#banner_img_url').val();
		if(!isNotEmpty(banner_img_url)){
			parent.layer.msg('请选择banner图片', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		
		//主推
		var is_featured=$('input[name="is_featured"]:checked').val();
		var sort=$("#number_sort").val();
		if (is_featured == 1){
			if(sort=="" || sort==null){
				disable_submit(false,'confirmBtn');
				parent.layer.msg("请填写排序");
				return false;
			}
		}else{
			sort = 0;
		}
		
		var link_type = $("#link_type").val();
		if(!isNotEmpty(link_type)){
			parent.layer.msg('请选择链接类型', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		
		var banner_img_href;
		if(link_type == "1"){
			banner_img_href = $('#banner_img_href').val();
			if(!isNotEmpty(banner_img_href)){
				parent.layer.msg('请选择商品详情链接', {icon: 2,time: 2000});
				disable_submit(false,'confirmBtn');
				return false;
			}else{
				//判断商品参加活动的类型
				var val = banner_img_href.split(",");
				if (val[1] == "0"){
					banner_img_href = '/pages/mall/commodity/commonDetail/detail?id='+val[0];
				}else if (val[1] == "20"){
					banner_img_href = '/pages/mall/commodity/discountDetail/detail?id='+val[0];
				}else if (val[1] == "30"){
					banner_img_href = '/pages/mall/commodity/fullReduceDetail/detail?id='+val[0];
				}
			}
		}else if(link_type == "2"){
			banner_img_href = $('#banner_img_href_infor').val();
			if(!isNotEmpty(banner_img_href)){
				parent.layer.msg('请选择资讯详情链接', {icon: 2,time: 2000});
				disable_submit(false,'confirmBtn');
				return false;
			}else{
				//资讯的跳转链接
				banner_img_href = "/pages/home/information/informationDetail/information?id="+banner_img_href;
			}
		}else if(link_type == "3"){
			banner_img_href = $('#banner_img_href_audio').val();
			if(!isNotEmpty(banner_img_href)){
				parent.layer.msg('请选择音频总集链接', {icon: 2,time: 2000});
				disable_submit(false,'confirmBtn');
				return false;
			}else{
				//音频的跳转
				banner_img_href = "/pages/home/audio/audioAll?id="+banner_img_href
			}
		}else if(link_type == "4"){
			banner_img_href = $('#banner_img_href_video').val();
			if(!isNotEmpty(banner_img_href)){
				parent.layer.msg('请选择视频详情链接', {icon: 2,time: 2000});
				disable_submit(false,'confirmBtn');
				return false;
			}else{
				//视频的跳转
				banner_img_href = "/pages/home/video/videoDetails?id="+banner_img_href
			}
		}
		
		var json = {
			link_type : link_type,//跳转类型
			banner_img_url : banner_img_url,//banner图片
			sort:sort,//排序
			is_featured:is_featured,//是否主推
			title : title,//标题
			banner_img_href:banner_img_href,//要跳转的路径
		}
		
		var jsonStr = JSON.stringify(json);
		
		if(id != null && id != ""){
			$.ajax({
				url:getRootPath() + '/homeBanner/updateBannerInfo.action',
				type:'post',
				dataType:'text',
				data:{
					"jsonStr":jsonStr,
					"bannerId":id,
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/banner/banner.jsp";
					}
				}
			});
		}else{
			$.ajax({
				url:getRootPath() + '/homeBanner/saveBanner.action',
				type:'post',
				dataType:'text',
				data:{
					"jsonStr":jsonStr,
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/bon/banner/banner.jsp";
					}
				}
			});
		}
	})
	
})


//编辑
function initData(){
	layui.use('form',function(){
		var form = layui.form();
		$.ajax({
			url:getRootPath() + '/homeBanner/queryBannerInfoById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				//获取banner_img_href
				if (result.link_type == 1){
					//满减
					if (result.banner_img_href.indexOf('fullReduceDetail')>-1){
						result.banner_img_href=result.banner_img_href.split("?id=")[1] +",30";
					}
					if (result.banner_img_href.indexOf('discountDetail')>-1){
						result.banner_img_href=result.banner_img_href.split("?id=")[1] +",20";
					}
					if (result.banner_img_href.indexOf('commonDetail')>-1){
						result.banner_img_href=result.banner_img_href.split("?id=")[1] +",0";
					}
				}else if (result.link_type == 2){
					result.banner_img_href_infor=result.banner_img_href.split("?id=")[1];
				}else if (result.link_type == 3){
					result.banner_img_href_audio=result.banner_img_href.split("?id=")[1];
				}else if (result.link_type == 4){
					result.banner_img_href_video=result.banner_img_href.split("?id=")[1];
				}
				$('#bannerForm1').setForm(result);
				$('input[name="is_featured"][value='+result.is_featured+']').attr("checked",true); 
				$("#banner_img_url").val(result.banner_img_url);
				//第一个li显示
				$(".module-goods-list li").eq(0).css("display","block");
				//添加上商品图片
				$(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+result.banner_img_url+")");
				//第2个li隐藏
				$(".module-goods-list li").eq(1).css("display","none");
				$("#number_sort").val(result.sort);
				$('#detail'+result.link_type).show();
				form.render();
			}
		});
	});
}

//判断显示详情组件的方法
function showDetail(index){
	for (var i=1;i<5;i++){
		if (i == index){
			$('#detail'+i).show();
		}else{
			$('#detail'+i).hide();
		}
	}
}
//填充下拉框
function paddingHtml(data){
	//商品
	var detailHtml="<option value=''>请选择商品详情链接</option>";
	$.each(data.commodity,function(index,item){
		//视频活动的类型
		detailHtml += '<option value="'+item.id+'">'+item.commodity_name+'</option>';
	});
	$('#banner_img_href').html(detailHtml);
	//视频
	var detailHtml="<option value=''>请选择视频详情链接</option>";
	$.each(data.video,function(index,item){
		detailHtml += '<option value="'+item.id+'">'+item.title+'</option>';
	});
	$('#banner_img_href_video').html(detailHtml);
	//资讯
	var detailHtml="<option value=''>请选择资讯详情链接</option>";
	$.each(data.information,function(index,item){
		detailHtml += '<option value="'+item.id+'">'+item.title+'</option>';
	});
	$('#banner_img_href_infor').html(detailHtml);
	//音频合集
	var detailHtml="<option value=''>请选择音频总集链接</option>";
	$.each(data.audio,function(index,item){
		detailHtml += '<option value="'+item.id+'">'+item.title+'</option>';
	});
	$('#banner_img_href_audio').html(detailHtml);
}

function addGrouponGoods(){
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
		  //弹出商品选择框
		  parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun=show_activity_label&mutl_type=1'   //type=1 单选; 2多选
		});
	})
}
//展示选择的标签图片
function show_activity_label(url){
	$("#banner_img_url").val(url);
	//第一个li显示
	 $(".module-goods-list li").eq(0).css("display","block");
	 //添加上商品图片
	 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+url+")");
	//第2个li隐藏
	 $(".module-goods-list li").eq(1).css("display","none");
}
//删除选择的商品（新增时）
function delGrouponCommodity(){
	 $("#banner_img_url").val("");
	 //第一个li隐藏
	 $(".module-goods-list li").eq(0).css("display","none");
	 //第二个li显示
	 $(".module-goods-list li").eq(1).css("display","block");
}
