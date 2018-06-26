<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增规格值</title>
</head>
<body>
<%
	String specification_id = request.getParameter("specification_id");
%>
<form class="layui-form" method="post" id="editForm">
  <input type="hidden" name="specification_id" value="<%=specification_id%>"/>
  <div class="layui-form-item" style="margin-top: 10px;">
    <label class="layui-form-label" style="width: 100px"><font color="red">*&nbsp;</font>规格值:</label>
    <div class="layui-input-block" style="width: 250px">
      <input type="text" name="specification_value_name"  lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div class="layui-form-item" style="margin-top: 10px;margin-bottom: unset;">
    <div class="layui-input-block" >
      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="save" id="save" style="margin-left: 62px;">保存</button>
    </div>
  </div>
</form>
<script type="text/javascript">
layui.use(['form','layer'], function(){
	var form = layui.form();
	//保存
	form.on('submit(save)', function(data){
		var addJsonStr = JSON.stringify(data.field);
		disable_submit(true,'save');
		$.ajax({
			url : getRootPath()+ '/commodity/addCommoditySpecificationsVal.action',
			type : 'POST',
			data : {signupForm:addJsonStr},
			dataType : 'TEXT',
			success : function(result){
				if("success"==result){
					layer.msg("操作成功", {
						  icon: 1,
						  time: 500 //（如果不配置，默认是3秒）
						}, function(){
							parent.layer.closeAll();
							
						});
				}
				else{
					disable_submit(false,'save');
					parent.layer.alert("操作失败");
				}
			},
			error:function(){
				disable_submit(false,'save');
				parent.layer.alert("操作失败");
			}
		});
		return false; 
		});
})
</script>
</body>
</html>