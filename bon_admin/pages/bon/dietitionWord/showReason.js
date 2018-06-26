var id=getUrlParam("id");

$(function(){
	$.ajax({
		url : getRootPath()+ '/dietitian/queryWordById.action',
		type : 'POST',
		dataType : 'json',
		data : {id:id},
		success : function(result){
			if(result!=null){
				$("#reject_reason").val(result.reject_reason);
			}
		}
	});
	 $("#toBack").click(function(){
		 parent.layer.closeAll();
	 });
	layui.use('form', function(){
		var form = layui.form();
		form.verify({});
	
	});
	
})
