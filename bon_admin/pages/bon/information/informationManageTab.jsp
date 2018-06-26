<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<style>
	ul.layui-tab-title {
    margin-bottom: 0;
}
</style>	
<title>资讯管理选项卡切换</title>
</head>
<body>

	<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0;">
		<ul class="layui-tab-title" style="margin-bottom:9px;border-bottom:none;">
			<li class="layui-this">已保存</li>
		    <li>审核中</li>
		    <li>已发布</li>
		    <li>驳回</li>
		</ul>
		<div id="iframepage"></div>
	</div>

</body>
<script>
	var tab = getUrlParam("status");
	if(tab == null || tab == '') {
		tab = 0;
	}
	$("#iframepage").load("informationManage.jsp?status="+tab
		,{'operFlag' : 'add'}
	);
	$("ul li").removeClass("layui-this");
	$("ul li:eq("+tab+")").addClass("layui-this");

	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use([ 'element', "layer","form" ], function() {
		var element = layui.element;
		element.on('tab(docDemoTabBrief)', function(data) {
			var index = data.index;
			$("#iframepage").load("informationManage.jsp?status="+index, {
				'operFlag' : 'add'
			});
		});
	});
</script>
</html>