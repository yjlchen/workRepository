<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="common.jsp"></jsp:include>

<title>微页面列表、分类列表  切换的选项卡  弹窗</title>
</head>
<%
	String num = request.getParameter("num");
	//接受leixing参数，微页面编辑的弹出微页面，区别于店铺导航
	String leixing = request.getParameter("leixing");
	String ind = request.getParameter("ind");
%>
<body>

	<div class="layui-tab layui-tab-brief" lay-filter="pageinfoChooseTab">
		<ul class="layui-tab-title">
			<li class="layui-this">微页面</li>
		    <!-- <li>页面分类</li> -->
		</ul>
		<div id="iframepage"></div>
	</div>

</body>
<script>
	var num = '<%=num%>';
	var leixing = '<%=leixing%>';
	var ind = '<%=ind%>';
	//界面初始化第一個tab
	$("#iframepage").load("com_pageinfoChooseList.jsp", {
		'operFlag' : 'add',
		'num' : num ,
		'ind' : ind,
		'leixing' : leixing
	});
	
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use([ 'element', "layer","form" ], function() {
		var element = layui.element();
		element.on('tab(pageinfoChooseTab)', function(data) {
			var index = data.index;
			if (index == 0) {
				$("#iframepage").load("com_pageinfoChooseList.jsp", {
					'operFlag' : 'add',
					'num' : num,
					'ind' : ind,
					'leixing' : leixing
				});
			}
			else if (index == 1) {
				$("#iframepage").load("com_pageinfoTypeChooseList.jsp", {
					'operFlag' : 'add',
					'num' : num,
					'ind' : ind,
					'leixing' : leixing
				});
			}
		});
		
	});
	
</script>
</html>