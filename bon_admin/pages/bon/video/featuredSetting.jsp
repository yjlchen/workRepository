<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>主推设置</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
</head>
<script type="text/javascript">
$(function(){
	initForm();
});
var id=getUrlParam("id");

layui.use(['form','layer'],function(){
	var form = layui.form;
	form.on('submit(sure)', function(data){
		disable_submit(true,'sure');//禁用按钮
		//获得状态值
		var status = $("#featured_type").val();
			$.ajax({
				url : getRootPath()+ '/video/featuredSetting.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {id:id,status:status},
				success : function(result){
					if("success"==result){
						layer.msg('设置成功', {
							  icon: 1,
							  time: 1000 //（如果不配置，默认是3秒）
							}, function(){
								 parent.layer.closeAll();
							});
					}else{
						layer.msg("设置失败，请重试",{
							icon:5,
							time:2000
						})
						disable_submit(false,'sure');
					}
				},
				error:function(e){
					parent.layer.alert("设置失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'sure');
				}
			});
		return false;
	});
})
//初始化选择
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/video/queryById.action',
			type:'post',
			dataType:'json',
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#featured').setForm(result);
					form.render();
				}
			}
		});
	});
}
</script>
<body>
<div style="padding-top: 10px;">
	<form class="layui-form" method="post" id="featured">
	  <div class="layui-form-item" style="margin: 25px">
	    <select id="featured_type" name="featured_type" >
		       <option value="0">非主推</option>
		       <option value="1">标签主推</option>
		       <option value="2">全部主推</option>
		</select>
	  </div>
	  <div class="layui-input-block" style="margin-left: 220px">
	      <button lay-submit lay-filter="sure" class="layui-btn" style="margin-top: 100px" id="sure">确定</button>
	  </div>
	</form>
</div>
</body>
</html>