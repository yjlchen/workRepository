var id=getUrlParam("id");
var status = getUrlParam("status");

$(function(){
	initData();
	if(status=="3"){
		$("#reason").show();//如果是驳回则展示驳回原因，显示驳回的审核结果removeAttr("style")
		$("#isPass").children('label').eq(1).show();
	}if(status=="2"){//如果是审核通过显示审核通过
		$("#isPass").children('label').eq(0).show();
	}

})

layui.use(['form','element','layer','laydate', 'upload'], function(){
	var layer = layui.layer;
	var form=layui.form;
	var upload = layui.upload;
	var element = layui.element;
	$("#putWord").click(function(){
		$("#status").val("1");//提交按钮
		$("#commit").click();
	});
	form.verify({  
		name: function(value){  
			value=toTrim(value);
			if(value.length==0){
				return '不能为空';
			} 
        }
	});
	
});

// 初始化数据
function initData() {
	if(id != null && id != "") {
		initForm();   // 初始化表单数据
	}
	
}
//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/dietitian/queryWordById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					if(result.status==0){//是草稿的再次编辑，那么显示保存按钮
						$("#commit").attr("class","layui-btn");
					}
					$('#updateForm').setForm(result);
					
					// 渲染视频
					if(result.audio_url != null && result.audio_url != '') {
						renderAudioUrl(result.audio_url);
					}
					form.render();
				}
				
			}
		});
	});
}



//渲染音频
function renderAudioUrl(audioFilePath) {
	$("#uploadAudioUrl").hide();
	$("#audioUrl").show();
	var str = "<div style='height:250px;'id='splice'>"
		+ "<div>"
		+ "<audio controls='controls'><source src='"+ audioFilePath + "'></audio>"
		+ "</div>"
		+ "<div>";
	$("#audioUrl").html(str);
	$("#audio_url").val(audioFilePath);
}





