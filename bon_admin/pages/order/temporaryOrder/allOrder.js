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
				var index = data.index;
					//$("#orderstate option:eq("+index+")" ).attr("selected","selected");
				$("#orderstate").val(index);
				form.render(); //更新全部
				$("#allOrder").load("orderTable.jsp");
		  });
		  	//点击新建
			$('#addTemporaryOrder').click(function(){
				//新增时判断是否建立了客服粉丝关系
				$.ajax({
				    url : getRootPath()+"/order/addTemporaryOrderJudge.action",
				    type : "post",
				    dataType:"text",
				    success : function (result) {
				    	if(result == "notConnection"){
				    		alert_mess('未建立客服与粉丝之间的联系，不能新增临时订单，请联系工程师！');
				    	}else{
				    		window.location.href=getRootPath()+'/pages/order/temporaryOrder/addTemporaryOrder.jsp';
				    	}
				    }
				});
			});
	});
	
	
	//页面初始化加载
	$("#allOrder").load("orderTable.jsp", {
		'operFlag' : 'add'
	});
 
});



//提示方法
function alert_mess(mess){
	parent.layer.alert(mess, {
		icon : 5
	});
}
