var id=getUrlParam("id");  // 退货id

layui.use(['form','element','layer','laydate', 'upload'], function(){
	
	 // 返回上一层
	$('#backPage').click(function(){
		location.href = getRootPath()+"/pages/bon/warehouse/receiveGoods.jsp"
	})
	
	// 保存
	layui.form.on('submit(formDemoSend)', function(data){
		save();
	});
});

function save(){
	disable_submit(true,'commitSend');
	$.ajax({
		url : getRootPath()+ '/receiveGoods/recieve.action',
		type : 'POST',
		dataType : 'TEXT',
		data: {
			"id": id,
			"desc":$('#description').val()
		},
		success : function(result){
			if("success"==result){
				layer.msg('提交成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						location.href = getRootPath()+"/pages/bon/warehouse/receiveGoods.jsp"
					});
			} else {
				layer.msg("提交失败，请重试",{
					icon:5,
					time:2000
				})
				disable_submit(false,'commitSend');
			}
		},
		error:function(){
			parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
			disable_submit(false,'commitSend');
		}
	});
	return false; 
}
