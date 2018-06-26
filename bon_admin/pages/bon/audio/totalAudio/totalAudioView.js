var id=getUrlParam("id");
var flag = getUrlParam("flag");
var labels = [];  // 标签列表

$(function(){
	initData();
	//点击返回
	$("#goBack").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioCheckList.jsp?flag="+flag;
	})
})


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
						 $("#is_pay").html('<span class="show_info">是</span>')
					}else{
						$("#is_pay").html('<span class="show_info">否</span>')
					}
					if(result.status==3){//同意驳回样式
						 $("#reject_reason").show();
						 $("#check_result").html('<span class="show_info">驳回</span>')
					}else{
						$("#check_result").html('<span class="show_info">通过</span>')
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





