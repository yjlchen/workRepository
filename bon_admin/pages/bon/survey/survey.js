
$(function(){
	initData();
	

})

layui.use(['form','element','layer','laydate', 'upload'], function(){
	var layer = layui.layer;
	var form=layui.form;
	
	
});
// 查询数据
function initData() {
	
	 layui.use('layer',function(){
		 var layer = layui.layer;
	 });
	 }
//初始化表单数据
function initData(){
	layui.use('layer',function(){
		var layer = layui.layer;
		$.ajax({
			url:getRootPath() + '/survey/querySurveyCount.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				
			},
			success:function(result){
				//console.log("ddd"+result.result);
				if("success"==result.result){
					$("#fans").html(result.fans); //粉丝数
					$("#attention").html(result.attention); //关注数
					$("#video").html(result.video); //视频数量
					$("#audio").html(result.audio); //音频数量
					$("#infomation").html(result.infomation); //资讯数量
					$("#summarize").html(result.summarize); //心得数量
					$("#dietition").html(result.dietition); //说说数量
					
				} else {
					layer.msg("查询失败，请重试",{
						icon:1,
						time:2000
					})
					disable_submit(false,'commit');
				}
				
			},error:function(){
				parent.layer.alert("查询失败，请关闭浏览器重试或联系管理员！");
				disable_submit(false,'commit');
			}
		});
	});
}




