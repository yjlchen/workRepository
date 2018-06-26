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
			<li class="layui-this">待审核</li>
		    <li>审核通过</li>
		    <li>审核驳回</li>
		</ul>
		<div id="iframepage"></div>
	</div>

</body>
<script>
	var indexToStatus = [1, 2, 3];
	var statusToIndex = [0, 0, 1, 2];
	var status = getUrlParam("status");
	if(status == null || status == '' || status == 'null') {
		status = 1;
	}
	$("#iframepage").load("informationExamine.jsp?status="+status
		,{'operFlag' : 'add'}
	);
	$("ul li").removeClass("layui-this");
	$("ul li:eq("+statusToIndex[status]+")").addClass("layui-this");

	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use([ 'element', "layer","form" ], function() {
		var element = layui.element;
		element.on('tab(docDemoTabBrief)', function(data) {
			var index = data.index;
			$("#iframepage").load("informationExamine.jsp?status="+indexToStatus[index], {
				'operFlag' : 'add'
			});
		});
	});
</script>
</html>