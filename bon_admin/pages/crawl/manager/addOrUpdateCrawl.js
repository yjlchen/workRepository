var id=getUrlParam("id");
var layer;
var form;	
$(function(){//初始时加载
	$("#return").click(function(){
		window.location.href=getRootPath()+"/pages/crawl/manager/index.jsp";
	})
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	if(id!=null&&id!=""){
		$.ajax({
			url:getRootPath() + '/mission/queryMissionByID.action',//查询
			type:'post',
			dataType:'text',
			data:{
				"id":id	
			},
			success:function(data){
				data = JSON.parse(data);
				layui.use(['form','element','layer','laydate'], function(){
					layer = layui.layer;
					form=layui.form();
					$('#misssionForm1').setForm(data);
					$("#number_sort").val(data.number);
					$("#score_sort").val(data.score);
					$("#everyday_valid_times_sort").val(data.everyday_valid_times);
					form.render();
				})

			}
		});
	}
	$("#select_featured").click(function(){		
	var number_sort=$("#number_sort").val();
		var score_sort=$("#score_sort").val();
		var everyday_valid_times_sort=$("#everyday_valid_times_sort").val();		
    });
})
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	
	//提交
	$("#confirmBtn").click(function(){
		disable_submit(true,'confirmBtn');
		var key = $("#key").val();
		if(!isNotEmpty(key)){
			parent.layer.msg('公众号名称或者微信号', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
	}
		
	var queryJsonStr = '{"key":"'+key+'"}';	
	$.ajax({
		url:getRootPath() + '/crawl/queryAccount.action',
		type:'post',
		dataType:'text',
		data:{
			"queryJsonStr":queryJsonStr,
		},
		success:function(data){
			if(jQuery.parseJSON(data).msg=="success"){
				//parent.layer.alert("关注成功!");
				window.location.href=getRootPath()+"/pages/crawl/manager/index.jsp";
			} else if (jQuery.parseJSON(data).msg=="exists") {
				disable_submit(false,'confirmBtn');
				parent.layer.alert("该平台已被关注,不可再次操作!");
			} else {
				disable_submit(false,'confirmBtn');
				parent.layer.alert("输入不合法,请确保公众号唯一!");
			}
			
		}
	});

	
})
})
