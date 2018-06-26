var id=getUrlParam("id");
var flag = getUrlParam("flag");
var labels = [];  // 标签列表

$(function(){
	initData();
	//同意驳回切换
	$("#check_result").click(function(){		
		if($(this).children('input').eq(0).is(":checked")){//点击同意			
			 $("#reject_reason").hide();
			 $("input[name='reject_reason']").val("");
		}else{
			 $("#reject_reason").show();
		}		
    });
	
	//点击返回
	$("#goBack").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioCheckList.jsp?flag="+flag;
	})
})

layui.use(['form','element','layer','laydate', 'upload', 'table'], function(){
	var layer = layui.layer;
	//审核
	$("#check").click(function(){
			var check_result = $("input[name='check_result']:checked").val();//审核结果
			var reject_reason = $("textarea[name='reject_reason']").val();//驳回原因
			if(check_result==0 && reject_reason==""){
				parent.layer.msg('请填写驳回原因', {
					  icon: 5,
					  time: 2000 //（如果不配置，默认是3秒）
					})
				return false;
			}
			disable_submit(true,'check');//禁用按钮
			$.ajax({
				url : getRootPath()+ '/totalAudio/checkById.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {check_result:check_result,reject_reason:reject_reason,id:id,emp_id:$("#emp_id").val()},
				success : function(result){
					if("success"==result){
						layer.msg('审核成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioCheckList.jsp";
							});
					} else {
						layer.msg("审核失败，请重试",{
							icon:5,
							time:2000
						})
						disable_submit(false,'check');
					}
				},
				error:function(){
					parent.layer.alert("审核失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'check');
				}
			});
	});
});

// 初始化数据
function initData() {
	initLabel();  // 初始化标签列表
	initForm();   // 初始化表单数据
}

//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/totalAudio/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#addOrUpdateForm').setForm(result);
					//li显示
					$(".module-goods-list").find("li").css("display","block");
					//添加上图片
					$(".module-goods-list").find("li").find(".goods-thumb").css("background-image","url("+result.audio_img_url+")");
					//给背景图隐藏域赋值
					$("input[name='audio_img_url']").val(result.audio_img_url);
					if(result.is_pay==1){//收费样式
						$("#original_bon_point").show();
						 $("#now_bon_point").show();
						 $("#is_pay").html('<span>是</span>')
					}else{
						$("#is_pay").html('<span>否</span>')
					}
					// 标签
					if(result.labelIds != null && result.labelIds != '') {
						renderLabel(labels, result.labelIds.split(","));
					}
					form.render();
				}
			}
		});
	});
}


function isInList(d, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i] == d) {
			return true;
		}
	}
	return false;
}

// 初始化下拉标签列表
function initLabel() {
	$.ajax({
		url : getRootPath()+ "/commodity/queryCommodityLabelList.action",
		type : 'POST',
		dataType : 'json',
		async: false,
		success: function(result){
			 if(result){
				 labels = result.data;
			 }
		}
	});
}

// 渲染标签列表
function renderLabel(labels, chosen_lebel_ids) {
	var html = "";
	if(chosen_lebel_ids != null && chosen_lebel_ids.length > 0) {
		for(var i = 0; i < labels.length; i ++) {
			if(isInList(labels[i].id, chosen_lebel_ids)) {
				html +='<span class="label_item">'+labels[i].name+'</span>'; 
			} 
		}
	} 
	$("#label_id").append(html);
}



