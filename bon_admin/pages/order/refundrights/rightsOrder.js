$(function(){
	layui.use(['form', 'element','laydate'], function(){
		  var form = layui.form()
		  ,layer = layui.layer
		  ,laydate = layui.laydate
		  ,element = layui.element();
		  //表单提交
		  form.on('submit(formdm)', function(data){
			  var index=data.field.commodity_refunds;
			  if(index==6){
				  element.tabChange('rightstab',2);
			  }else if(index==7){
				  element.tabChange('rightstab',3);
			  }else if(index==0){
				  element.tabChange('rightstab',index);
			  }else{
				  element.tabChange('rightstab',1);
			  }
			  
			  $("#rightsOrder").load("rightsOrderTable.jsp");
			  return false;
		  });
		  //切换tab
		  element.on('tab(rightstab)', function(data) {
				var index = data.index;
				if(index==2){
					$("#commodityrefunds").val(6);
				}else if(index==3){
					$("#commodityrefunds").val(7);
				}else{
					$("#commodityrefunds").val(index);
				}
				form.render(); //更新全部
				
				$("#rightsOrder").load("rightsOrderTable.jsp");
				
		  });
	});
	//页面初始化加载
	$("#rightsOrder").load("rightsOrderTable.jsp", {
		'operFlag' : 'add'
	});
 
});
