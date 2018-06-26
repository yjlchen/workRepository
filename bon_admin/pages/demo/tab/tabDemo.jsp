<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<title>商城后台</title>
<link rel="stylesheet" href="${basePath}/tools/layui1.0.9/css/layui.css">
<link rel="stylesheet" href="${basePath}/tools/static/css/cover.css">
<script src="${basePath}/tools/layui1.0.9/layui.js" charset="utf-8"></script>
<script src="${basePath}/commons/js/jquery-1.11.3.min.js"
	charset="utf-8"></script>
<script src="${basePath}/commons/js/commons.js" charset="utf-8"></script>

</head>
<body>
	<div class="inner-page-top layui-clear">
		店铺概况
		<button class="layui-btn demo" onclick="test1()">测试一</button>
		<button class="layui-btn demo" id="btn2">全局模态框</button>
		<button class="layui-btn demo" id="btn3">测试三</button>
		
		<button class="layui-btn demo" id="btn4">提交成功</button>
	</div>

	<div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
		<ul class="layui-tab-title">
			<li class="layui-this">用户管理</li>
			<li>商品管理</li>
		</ul>
		<div id="iframepage"></div>
	</div>

</body>
<script>
	//界面初始化第一個tab
	$("#iframepage").load("tabdefault.jsp", {
		'operFlag' : 'add'
	});
	//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
	layui.use([ 'element', "layer" ], function() {

		var element = layui.element();

		element.on('tab(docDemoTabBrief)', function(data) {
			var index = data.index;
			if (index == 0) {
				$("#iframepage").load("tabdefault.jsp", {
					'operFlag' : 'add'
				});
			}
			if (index == 1) {
				$("#iframepage").load("form1.jsp");
			}
		});
		
		//可以在放在{}外
		$('#btn2').on('click', function(){
			/* parent.layer.alert('见到你真的很高兴', {
				icon : 6
			}); */
			
			
			
			parent.layer.alert('有了回调', function(index){
				layer.msg('同上1222222222222222222', {
					  icon: 1,
					  time: 5000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
					  
					});
				layer.msg('d同上2', {
					  icon: 1,
					  time: 5000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
					  
					});
				//parent.layer.close(index);
				});  
			
			
		  });
		
		$('#btn3').on('click', function(){
			layer.alert('见到你真的很高兴', {
				icon : 6
			});
		  });
		
		$('#btn4').on('click', function(){
			/* parent.layer.alert('提交成功！', {
				icon : 6
			}); */
			
			parent.layer.msg('提交/删除成功！', {
				  icon: 1,
				  time: 1000 //2秒关闭（如果不配置，默认是3秒）
				}, function(){
				  //执行刷新列表方法
				  sayHello();
				});
			//可刷新列表
			
		  });

	});
	
	//
	function test1() {
		layer.alert('见到你真的很高兴', {
			icon : 6
		}); 
		
		
	}
	
	 
	
	function sayHello(){
		layer.msg('同上', {
			  icon: 1,
			  time: 5000 //2秒关闭（如果不配置，默认是3秒）
			}, function(){
			  
			});
	}
	 
	
</script>
</html>