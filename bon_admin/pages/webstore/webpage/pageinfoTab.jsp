<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<style>
	ul.layui-tab-title {
    margin-bottom: 0;
}
</style>	
<title>微页面选项卡切换</title>
</head>
<body>

	<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin-top:0;">
		<ul class="layui-tab-title" style="margin-bottom:9px;border-bottom:none;">
			<li class="layui-this">微页面</li>
		    <li>页面分类</li>
		    <li>微页面草稿</li>
		</ul>
		<div id="iframepage"></div>
	</div>

</body>
<script>
	var tab = getUrlParam("checkTab");
	//alert(tab);
	if(tab==""||tab==null){
		//界面初始化第一個tab，上架列表
		$("#iframepage").load("pageinfoList.jsp", {
			'operFlag' : 'add'
		});
	}else{
		//上架后跳至上架列表
		if(tab=="formal"){
			$("#iframepage").load("pageinfoList.jsp"
			, {'operFlag' : 'add'}
			);
			$("ul li").removeClass("layui-this");
			$("ul li:eq(0)").addClass("layui-this");
		}
		//保存成草稿跳至草稿列表
		else if(tab=="draft"){
			$("#iframepage").load("pageinfoDraftList.jsp", {
				'operFlag' : 'add'
			});
			$("ul li").removeClass("layui-this");
			$("ul li:eq(2)").addClass("layui-this");
		}
	}
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use([ 'element', "layer","form" ], function() {
		var element = layui.element();
		element.on('tab(docDemoTabBrief)', function(data) {
			var index = data.index;
			if (index == 0) {
				$("#iframepage").load("pageinfoList.jsp", {
					'operFlag' : 'add'
				});
			}
			else if (index == 1) {
				$("#iframepage").load("pageinfoTypeList.jsp", {
					'operFlag' : 'add'
				});
			}
			else if (index == 2) {
				$("#iframepage").load("pageinfoDraftList.jsp", {
					'operFlag' : 'add'
				});
			} 
			
		});
		
	});
	
</script>
</html>