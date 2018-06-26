var orderStatus=getUrlParam("orderStatus");
$(function(){
	layui.use(['form', 'element','laydate'], function(){
		  var form = layui.form()
		  ,layer = layui.layer
		  ,laydate = layui.laydate
		  ,element = layui.element();
		  if(orderStatus==2){
			  element.tabChange('ordertab',2);
			  $("#allOrder").load("orderTable.jsp");
		  }
		  //表单提交
		  form.on('submit(formdm)', function(data){
			  element.tabChange('ordertab',data.field.order_state);
			  $("#allOrder").load("orderTable.jsp");
			  return false;
		  });
		  //切换tab
		  element.on('tab(ordertab)', function(data) {
					//$("#orderstate option:eq("+index+")" ).attr("selected","selected");
				$("#orderstate").val($(this).attr("lay-id"));
				form.render(); //更新全部
				$("#allOrder").load("orderTable.jsp");
		  });
	});
	//页面初始化加载
	$("#allOrder").load("orderTable.jsp", {
		'operFlag' : 'add'
	});
 
});
