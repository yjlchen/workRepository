
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
		  ,url:getRootPath()+"/information/queryExamineList.action"
		  ,cols: [[
				     /*{field:'id', width:180,align:'center', title: 'id'},*/
				     {field:'title', width:180,align:'center', title: '标题'},
				     {field:'add_time', width:180,align:'center', title: '添加时间'},
				     {field:'labels', width:180,align:'center', title: '标签'},
				     {field:'commoditys', width:180,align:'center', title: '产品'},
				     {title:'真实/虚拟浏览量',width: 135,align:'center', toolbar: '#browerBar'},
			         {title:'真实/虚拟收藏量',width: 135,align:'center', toolbar: '#collectBar'},
			         {title:'真实/虚拟点赞量',width: 135,align:'center', toolbar: '#praiseBar'},
			         {title:'真实/虚拟评论量',width: 135,align:'center', toolbar: '#evaluateBar'},
			         {title:'操作',width: 200,align:'center', toolbar: '#barDemo'}
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
		  if(obj.event=="examine"){
			  window.location.href=getRootPath()+"/pages/bon/information/examineInformation.jsp?id="+data.id;
		  } else if(obj.event=="rejectInfo") {
			 // 更新
			 layer.open({
				  title: '驳回原因'
				  ,content: data.reject_reason
			 });     
		 } else if(obj.event=="checkInfo") {
			 window.location.href=getRootPath()+"/pages/bon/information/checkInformation.jsp?id="+data.id+"&returnUrl=informationExamineTab.jsp?status="+status;  
		 } else if(obj.event=="featured") {
			 layer.open({
				 title:"主推设置",
				  text:"ff",
				  type: 2,
				  area: ['500px', '300px'],
				  content: getRootPath()+"/pages/bon/information/featuredSetting.jsp?id="+data.id
			});
		 }
	  });
	  
	  
	  $('#queryRecordInfo').click(function(){
		   updataTable();
	   });
})	

function updataTable() {
	var formObj = $('#recordForm').serializeObject();
	formObj.status=status;
	layui.table.reload('recordReload', {
		where: {
			queryJson:JSON.stringify(formObj)  
		} 
	});
}


