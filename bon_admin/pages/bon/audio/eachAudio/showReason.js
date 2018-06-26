var id=getUrlParam("id");

$(function(){
	$.ajax({
		url : getRootPath()+ '/eachAudio/queryRejectReason.action',
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
})
