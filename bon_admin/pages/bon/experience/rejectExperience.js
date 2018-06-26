var id=getUrlParam("id");
$(function(){
	//根据ID请求，并展示到form表单里面
	$.ajax({
		url:getRootPath() + '/experience/selectExperienceById.action',
		type:'post',
		dataType:'json',
		async:false,
		data:{
			"id":id
		},
		success:function(result){
			//填充表单
			$('#addOrUpdateForm').setForm(result);
		}
	})
	
	$("#backPage").click(function(){
		parent.layer.closeAll();
	});
})
