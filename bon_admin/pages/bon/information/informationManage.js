
layui.use(['form','element','layer', 'table', 'laydate'], function(){
	  var layer = layui.layer, table = layui.table, form = layui.form, laydate = layui.laydate;
	  
	  laydate.render({
		  elem: '#start_time' //指定元素
	  });
	  laydate.render({
		  elem: '#end_time' //指定元素
	  });
	  
	  table.render({
		  even: true ,//开启隔行背景
		  id:'recordReload',
		  elem: '#record_table',
		  method:'post'
		  ,url:getRootPath()+"/information/queryList.action"
		  ,cols: [[
				     /*{field:'id', width:180,align:'center', title: 'id'},*/
				     {field:'title', width:180,align:'center', title: '标题'},
				     {field:'add_time', width:160,align:'center', title: '添加时间'},
				     {field:'labels', width:180,align:'center', title: '标签'},
				     {field:'commoditys', width:180,align:'center', title: '产品'},
			         {title:'真实/虚拟浏览量',width: 135,align:'center', toolbar: '#browerBar'},
			         {title:'真实/虚拟收藏量',width: 135,align:'center', toolbar: '#collectBar'},
			         {title:'真实/虚拟点赞量',width: 135,align:'center', toolbar: '#praiseBar'},
			         {title:'真实/虚拟评论量',width: 135,align:'center', toolbar: '#evaluateBar'},
			         {title:'操作',width: 300,align:'center', toolbar: '#barDemo'}
		  ]]
	  	  , where: {
	  		 queryJson: JSON.stringify({
	  			 'status': status
	  		 })
	  	  }
		  ,page: true
		  ,limit:20
		  ,response: {
			 data: 'data'	
		  } 
	  });
	  
	  table.on('tool(listFilter)', function(obj){
		  var data = obj.data;
		  if(obj.event=="del"){
			 // 删除
			 layer.confirm('确定要删除么?', {icon: 3, title:'提示'}, function(index){
				 $.ajax({
					url:getRootPath()+'/information/deleteById.action',
					type:'post',
					dataType:'text',
					async:false,
					data:{
						"id":data.id
					},
					success:function(data){
						 if(data=="success"){
							 updataTable();//重新加载列表
							 layer.msg('删除成功', {icon: 6,time: 1000}); 
						 } else {
							 layer.msg('删除失败', {icon: 2,time: 1000}); 
						 }
						 layer.close(index);
					}
				 });
			 });
		 } else if(obj.event=="update") {
			 // 更新
			 window.location.href=getRootPath()+"/pages/bon/information/addInformation.jsp?id="+data.id+"&status="+status;
		 } else if(obj.event=="examine") {
			 // 提交审核
			 layer.confirm('确定要提交么?', {icon: 3, title:'提示'}, function(index){
				 $.ajax({
					url:getRootPath()+'/information/updateToExamine.action',
					type:'post',
					dataType:'text',
					async:false,
					data:{
						"id":data.id
					},
					success:function(data){
						 if(data=="success"){
							 updataTable();//重新加载列表
							 layer.msg('提交成功', {icon: 6,time: 1000}); 
						 } else {
							 layer.msg('提交失败', {icon: 2,time: 1000}); 
						 }
						 layer.close(index);
					}
				 });
			 });
		 } else if(obj.event=="rejectInfo") {
			 // 更新
			 layer.open({
				  title: '驳回原因'
				  ,content: data.reject_reason
			 });     
		 } else if(obj.event=="checkInfo") {
			 // 查看
			 window.location.href=getRootPath()+"/pages/bon/information/checkInformation.jsp?id="+data.id+"&returnUrl=informationManageTab.jsp?status=1";
		 } else if(obj.event=="preview") {
			 // 预览
			 window.location.href=getRootPath()+"/pages/bon/information/previewInformation.jsp?id="+data.id+"&status="+status;
		 } else if(obj.event=="unrealEvaluate") {
			 // 虚拟评论
			 window.location.href=getRootPath()+"/pages/cm/virtualevaluate/ivaeVirtualEvaluate.jsp?resource_id="+data.id
			 		+"&title="+data.title+"&belong_id="+data.emp_id+"&type=1&page=/pages/bon/information/informationManageTab.jsp?status="+status;
		 }
	  });
	  
	  
	  $('#queryRecordInfo').click(function(){
		   updataTable();
	   });
	  
	  $("#save").click(function(){
		  window.location.href=getRootPath()+"/pages/bon/information/addInformation.jsp?status="+status;;
	  });
})	

function evaluateClick(infoId, status) {
//	 layui.layer.open({
//		  title: 'info_id'
//		  ,content: infoId
//	 });   
	 // 预览
	 window.location.href=getRootPath()+"/pages/bon/information/previewInformation.jsp?id="+infoId+"&status="+status;
}

function updataTable() {
	var formObj = $('#recordForm').serializeObject();
	formObj.status=status;
	layui.table.reload('recordReload', {
		where: {
			queryJson:JSON.stringify(formObj)  
		} 
	});
}


