var id=getUrlParam("id");

$(function(){
	initData();
	//是否通过审核点击切换
	$("#isPass").click(function(){	
		if($(this).children('input').eq(1).is(":checked")){		
			$("#reason").show();
			 //驳回原因必填
			 $("#reject_reason").attr("lay-verify","required");
			 $("#audit_status").val("3");//驳回状态
			 
		}else{
			$("#reason").hide();
			 //驳回原因隐藏并清空
			 $("#reject_reason").removeAttr("lay-verify");
			 $("#reject_reason").val("");
			 $("#audit_status").val("2");//审核通过状态
		}		
	});
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
	form.on('submit(formDemo)', function(data){
		
		disable_submit(true,'commit');
		var formInfo = $('#updateForm').serializeObject();
		//formInfo.content = formInfo.editorValue;
		//formInfo.editorValue = "";
		var addJsonStr=JSON.stringify(formInfo);
		layer.load(1, {shade: [0.3, '#393D49'], time: 3000});
		  //修改信息
			$.ajax({
				url : getRootPath()+ '/dietitian/updateAuditWord.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr,id:id},
				success : function(result){
					
					if("success"==result){
						layer.msg('审核成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/dietitionWord/auditDietitionWordList.jsp";
							});
					} else {
						layer.msg("审核失败，请重试",{
							icon:1,
							time:2000
						})
						disable_submit(false,'commit');
					}
				},
				error:function(){
					parent.layer.alert("审核失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'commit');
				}
			});
		return false; 
		
		
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





