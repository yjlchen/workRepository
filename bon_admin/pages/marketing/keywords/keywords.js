$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	var date_ = new Date();  
	var year = date_.getFullYear();  
	var month = date_.getMonth() + 1;  
	if(month < 10){
		month = "0" + month;
	}
	var day = new Date(year,month,0);      
	var lastdate =  day.getDate();  
	var startTime = year + "-" + month + "-01";
	var endTime = year + "-" + month + "-" + lastdate;
	$('#start_time').val(startTime);
	$('#end_time').val(endTime);
	searchPage();// 进入页面查询所有数据
	searchUserPage();
	$('#queryBannerInfo').click(function(){
		searchPage();
	});	
	// 查询 用户搜索关键词
	$('#searchKeyWord').click(function(){
		searchUserPage();
	});
	initBrandAndCountry();
	initBrandAndCountry1();
	
});

layui.use(['form','layer','laydate'],function(){
	var form = layui.form();
	var layer = layui.layer;
	var laydate = layui.laydate;
	
	form.verify({
	    keywords: function(value, item){ // value：表单的值、item：表单的DOM对象
	    	value = toTrim(value);
	    	if(value.length <= 0){
	    		return '请填写关键词';
	    	}
	    },
	    sort: function(value, item){
	    	value = toTrim(value);
			if(value.length > 0){
				if(!(/^(-|\+)?\d+$/.test(value))){
					return "序号只能为数字";
				}
			}else{
				return "请填写序号";
			}
	    }
	});   
	
	form.on('submit(addFilter)',function(data){
		console.log(data);
		 var keywords = data.field.keywords;
		 var sort = data.field.sort;
		 var brand_id = data.field.brand_id;
		 $.ajax({
			 url:getRootPath() + '/keyWords/saveKeywordsInfo.action',
			 type:'post',
			 dataType:'text',
			 data:{
				"brand_id":brand_id,
				"keywords":keywords,
				"sort":sort
			 },
			 success:function(data){
				 if(data == "success"){
					 layer.msg('添加成功', {icon: 6});
					 location.reload();
				 }else if(data == "isExist"){
					 layer.msg('该关键词或者序号已经存在', {icon: 5});
				 }else{
					 layer.msg('添加失败', {icon: 5});
				 }
			 }
		 });
		 return false;
	});
	
	
	form.on('select(encrypt)',function(data){
		console.log(data);
		queryBrandByCountryID(data.value);
		queryBrandByCountryID1(data.value);
		
	});
});
//根据国家id获取品牌
function queryBrandByCountryID(country_id){
	layui.use('form',function(data){
		var form = layui.form();
		if(country_id==null || country_id==undefined){return false;}
		 $.ajax({
		        url : getRootPath()+"/keyWords/queryBrandByCountyID.action",
		        type : "post",
		        "dataType":"json",
		        async: false,//同步
		        data:{"country_id":country_id},
		        success : function (gdata) {
		        	if(gdata!=null){
		        		var blist=gdata.brand;
		        		 $("#brand_id").html("");
		        		 $("#brand_id").append("<option value=''>请选择</option>");
		  	             for(var i=0;i<blist.length;i++){
		  	            	 var gindex=blist[i];
		  	            	 var id=gindex.id;
		  	            	 var name=gindex.brand_name;
		  	            	 $("#brand_id").append("<option value='"+id+"'>"+name+"</option>"); 
		  	             }
		        	}
		        }
		    })
		    form.render('select');
	});
	
} 
//根据国家id获取品牌1
function queryBrandByCountryID1(country_id1){
	layui.use('form',function(data){
		var form = layui.form();
		if(country_id1==null || country_id1==undefined){return false;}
		 $.ajax({
		        url : getRootPath()+"/keyWords/queryBrandByCountyID.action",
		        type : "post",
		        "dataType":"json",
		        async: false,//同步
		        data:{"country_id":country_id1},
		        success : function (gdata) {
		        	if(gdata!=null){
		        		var blist=gdata.brand;
		        		 $("#brand_id1").html("");
		        		 $("#brand_id1").append("<option value=''>请选择</option>");
		  	             for(var i=0;i<blist.length;i++){
		  	            	 var gindex=blist[i];
		  	            	 var id=gindex.id;
		  	            	 var name=gindex.brand_name;
		  	            	 $("#brand_id1").append("<option value='"+id+"'>"+name+"</option>"); 
		  	             }
		        	}
		        }
		    })
		    form.render('select');
	});
	
} 
//查询所有国家
function initBrandAndCountry(){
	layui.use('form',function(){
		var form = layui.form();
		$.ajax({
	        url : getRootPath()+"/keyWords/queryCountryAndBrandList.action",
	        type : "post",
	        "dataType":"json",
	        success : function (gdata) {
	        	if(gdata!=null){
	        		if(gdata.country!=null && gdata.country!=undefined){
		        		 var clist=gdata.country;         //国家列表
		        		 $("#country_id").append("<option value=''>请选择</option>"); 
		  	             for(var i=0;i<clist.length;i++){
		  	            	 var gindex=clist[i];
		  	            	 var id=gindex.id;
		  	            	 var name=gindex.country_name;
		  	            	 $("#country_id").append("<option value='"+id+"'>"+name+"</option>"); 
		  	             }
	        		}
	        	}
	        	form.render('select');//渲染
	        }
	    })
	});
	
}
//查询国家1
function initBrandAndCountry1(){
	layui.use('form',function(){
		var form = layui.form();
		$.ajax({
	        url : getRootPath()+"/keyWords/queryCountryAndBrandList.action",
	        type : "post",
	        "dataType":"json",
	        success : function (gdata) {
	        	if(gdata!=null){
	        		if(gdata.country!=null && gdata.country!=undefined){
		        		 var clist=gdata.country;         //国家列表
		        		 $("#country_id1").append("<option value=''>请选择</option>"); 
		  	             for(var i=0;i<clist.length;i++){
		  	            	 var gindex=clist[i];
		  	            	 var id=gindex.id;
		  	            	 var name=gindex.country_name;
		  	            	 $("#country_id1").append("<option value='"+id+"'>"+name+"</option>"); 
		  	             }
	        		}
	        	}
	        	form.render('select');//渲染
	        }
	    })
	});
	
}

// 查询方法
function searchPage(){
	// 查询学生信息。先得到name的值
	 var queryCond = $('#likeForm').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 console.log(queryJsonStr);
	 var cust = $('#keyword_list').dataTable({
		 "processing": true,
	       "serverSide": true,
	       "paging":   false,
	       "stateSave":false,
	       "autoWidth":false,
	        "ordering": true,
	        "info":    false,
	        "bLengthChange":true,
	        "bPaginate":true,
	        "bDestroy": true,
	        "pageLength": 5,
	        "aLengthMenu": [[5, 10, 15], [5, 10, 15]],
	        "createdRow": function ( row, data, index ) {
	        	$(row).children('td').attr('style', 'text-align: center;');
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [   
	            { "data" : "country_name"},
	            { "data" : "brand_name"},     
	            { "data" : "keywords"},
	            { "data" : "sort"}
	        ],
	        "columnDefs": [
							{
							    "targets": [4],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return  "<a style='cursor: pointer;' onclick='delKeyWords(\""+data+"\");'>删除</a>";
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/keyWords/queryKeyWordsPageList.action",
	                         "type":"post",
	                         "dataType":"json",
	                         // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
	                         'data' : {
	                        	 "queryJsonStr":queryJsonStr
	                         }
	                     },
	                     "language": {
	                    	 "lengthMenu": "每页显示 _MENU_ 条记录",
	                         "zeroRecords": "暂无数据",
	                         "info": " _PAGE_ / _PAGES_",
	                         "infoEmpty": "没有数据",
	                         "infoFiltered": "(filtered from _MAX_ total records)",
	                         "emptyTable":     "没有数据",
	                         "info":           "当前显示第 _START_ 到第 _END_ 条,共 _TOTAL_ 条记录",
	                         "infoEmpty":      "显示第 0 到第 0 条（总 0 条）",
	                         "infoFiltered":   "(来自 _MAX_ 条的过滤数据)",
	                         "infoPostFix":    "",
	                         "thousands":      ",",
	                         "loadingRecords": "载入中...",
	                         "processing":     "处理中...",
	                         "search":         "搜索：",
	                         "zeroRecords":    "无相关数据",
	                         "paginate": {
	                             "first":      "首页",
	                             "last":       "尾页",
	                             "next":       "下一页",
	                             "previous":   "上一页"
	                         }, 
	                         "aria": {
	                             "sortAscending":  ": 升序排列",
	                             "sortDescending": ": 降序排列"
	                         }
	                     }
	    });
}

function editKeyWords(id){
	 var sort = $('#sort'+id).val();
	 sort = toTrim(sort);
	 if(sort.length > 0){
		if(!(/^(-|\+)?\d+$/.test(sort))){
			layer.msg('序号只能为数字', {icon: 5}); 
		}else{
			$.ajax({
				 url:getRootPath() + '/keyWords/updateKeywordsById.action',
				 type:'post',
				 dataType:'text',
				 data:{
					"id":id,
					"sort":sort
				 },
				 success:function(data){
					 if(data == "success"){
						 layer.msg('编辑成功', {icon: 6});
						 location.reload();
					 }else if(data == "isExist"){
						 layer.msg('该序号已经存在，请重新编辑', {icon: 5});
					 }else{
						 layer.msg('编辑失败', {icon: 5});
					 }
				 }
			 });
		}
	 }else{
		return "请填写序号";
	 }
}


// 删除品牌
function delKeyWords(id){
	layer.confirm('确定要删除这条关键词吗？',{
		  btn: ['确定', '取消'] // 可以无限个按钮
		}, function(index, layero){
			// 按钮【按钮一】的回调
			$.ajax({
				url:getRootPath()+'/keyWords/deleteKeyWords.action',
				type:'post',
				dataType:'text',
				async:false,
				data:{
					"id":id
				},
				success:function(result){
					if(result == "success"){
						 layer.msg('删除成功', {icon: 6});
						 location.reload();
					}else{
						 layer.msg('删除失败', {icon: 5});
					}
				}
			});
		}, function(index){
			layer.closeAll('dialog');
	});
}


// ##################################下面为用户搜索关键词相关方法###############################
// 查询方法
function searchUserPage(){
	// 查询学生信息。先得到name的值
	 var queryCond = $('#userKeyWordForm').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 var cust = $('#userkeyword_list').dataTable({
		 	"processing": true,
	        "serverSide": true,
	        "pagination":false,
	        "paging":   true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "info":     true,
	        "bLengthChange":   true,
	        "bPaginate":true,
	        "bDestroy": true,
	        "pageLength": 10,
	        "aLengthMenu": [[10, 20, 30], [10, 20, 30]],
	        "createdRow": function ( row, data, index ) {
	        	$(row).children('td').attr('style', 'text-align: center;');
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [   
	            { "data" : "keywords"},
	            { "data" : "times"}
	        ],
	        "columnDefs": [
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/keyWords/queryUserKeyWordsPageList.action",
	                         "type":"post",
	                         "dataType":"json",
	                         // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
	                         'data' : {
	                        	 "queryJsonStr":queryJsonStr
	                         }
	                     },
	                     "language": {
	                    	 "lengthMenu": "每页显示 _MENU_ 条记录",
	                         "zeroRecords": "暂无数据",
	                         "info": " _PAGE_ / _PAGES_",
	                         "infoEmpty": "没有数据",
	                         "infoFiltered": "(filtered from _MAX_ total records)",
	                         "emptyTable":     "没有数据",
	                         "info":           "当前显示第 _START_ 到第 _END_ 条,共 _TOTAL_ 条记录",
	                         "infoEmpty":      "显示第 0 到第 0 条（总 0 条）",
	                         "infoFiltered":   "(来自 _MAX_ 条的过滤数据)",
	                         "infoPostFix":    "",
	                         "thousands":      ",",
	                         "loadingRecords": "载入中...",
	                         "processing":     "处理中...",
	                         "search":         "搜索：",
	                         "zeroRecords":    "无相关数据",
	                         "paginate": {
	                             "first":      "首页",
	                             "last":       "尾页",
	                             "next":       "下一页",
	                             "previous":   "上一页"
	                         }, 
	                         "aria": {
	                             "sortAscending":  ": 升序排列",
	                             "sortDescending": ": 降序排列"
	                         }
	                     }
	    });
}

