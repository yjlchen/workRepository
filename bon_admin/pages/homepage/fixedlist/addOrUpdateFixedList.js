var id=getUrlParam("id");
var oldname;
var form;
var joinGoods = [];//记录已经选择参加的商品
$(function(){
	initEvent();
	layui.use(['form','layer','element'],function(){
		form = layui.form();
		var layer = layui.layer;
		var element = layui.element();
	});
	if(isNotEmpty(id)){
		initData();
	}
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();
	goodsGroup();
})
var layer;
var form;
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	form.on('radio(module)', function(data){
		if(data.value=="g"){
			$("#name").val("");
			$("#name").attr("readonly",false)
			$("#isShow").show();
		}else if(data.value=="y"){
			$("#name").val("营养保健");
			$("#name").attr("readonly",true)
			$("#isShow").hide();
		}else if(data.value=="j"){
			$("#name").val("积分商城");
			$("#name").attr("readonly",true)
			$("#isShow").hide();
		}
	});
})

function initEvent(){
	$("#commit").click(function(){
		subForm();
	});
	$("#imgc").click(function(){
		addpho("setImgUrl",1);
	})
//	$("#reset").click(function(){
//		$("#imgc").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
//		$("#pic").hide();
//	})
	$("#back").click(function(){
		window.location.href=getRootPath()+"/pages/homepage/fixedlist/fixedlist.jsp";
	});
	$("#pic").click(function(){
		$("#imgc").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic").hide();
	})
}

function initData(){ 
	$.ajax({
	    url : getRootPath()+"/fixedList/queryFixedById.action?id="+id,
	    type : "post",
	    async: false,//同步
	    "dataType":"json",
	    success : function (data) {
	    	$("#name").val(data.name);
	    	oldname=data.name;
	    	if(data.name=="营养保健"){
	    		$('input:radio[name=module]')[0].checked = false;
	    		$('input:radio[name=module]')[1].checked = true;
	    		$("#name").val("营养保健");
				$("#name").attr("readonly",true)
				$('input:radio[name=module]').attr("disabled",true);
				$("#isShow").hide();
	    	}else if(data.name=="积分商城"){
	    		$('input:radio[name=module]')[0].checked = false;
	    		$('input:radio[name=module]')[2].checked = true;
	    		$("#name").val("积分商城");
				$("#name").attr("readonly",true)
				$('input:radio[name=module]').attr("disabled",true);
				$("#isShow").hide();
	    	}
			if(isNotEmpty(data.img_url)){
				$("#imgc").attr("src",data.img_url);
				$("#pic").show();
			}
	    }
	});
}

function subForm(){
	disable_submit(true,'commit');
	var name = $("#name").val();
	var repeat=false;
	if(!isNotEmpty(id)||name!=oldname){
		$.ajax({
			url : getRootPath()+"/fixedList/queryFixedByName.action?name="+name,
			type : "post",
			async: false,//同步
			"dataType":"text",
			success : function (data) {
				if(data!="none"){
					parent.layer.msg('该模块名已存在', {
						icon: 2,
						time: 1000 //（如果不配置，默认是3秒）
					});
					disable_submit(false,'commit');
					repeat=true;
				}
			}
		});
	}
	if(repeat){
		return false;
	}
	if(!isNotEmpty(name)){
		parent.layer.msg('请填写固定模块名', {icon: 2,time: 2000});
		disable_submit(false,'commit');
		return false;
	}
	var imgurl=$("#imgc").attr("src");
	if(imgurl.indexOf("/commons/images/addpicture.jpg") >= 0){
		parent.layer.msg('请选择图片', {icon:2,time: 2000});
		disable_submit(false,'commit');
		return ;
	}
	 var radio= $('input[name="module"]:checked').val()
    if('g'==radio){
		if(joinGoods.length<1){
			parent.layer.msg('请选择商品组', {icon:2,time: 2000});
			disable_submit(false,'commit');
			return ;
		}
    }
	var json="{";
	json+='"name":"'+name;
	json+='","img_url":"'+imgurl;
	//修改
	if(isNotEmpty(id)){
		json+='","id":"'+id;
	}
	json+='"}';
	$.ajax({
		url : getRootPath()+ '/fixedList/saveOrupdateFixedList.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {jsonStr:json,commodity_ids:JSON.stringify(joinGoods)},
		async:false,
		success : function(result){
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						window.location.href=getRootPath()+"/pages/homepage/fixedlist/fixedlist.jsp";
					});
			}else{
				parent.layer.msg('操作失败，请重试', {
					  icon: 2,
					  time: 1000 //（如果不配置，默认是3秒）
					});
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 2,
				  time: 1000 //（如果不配置，默认是3秒）
				});
			disable_submit(false,'commit');
		}
	});
}

function addpho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}
function setImgUrl(imgUrl){
	if( imgUrl.length>0){
		var url=imgUrl[0];
		$("#imgc").attr("src",url);
		$("#pic").show();
	}
}

//查询商品
function searchPage(){
	var commodity_name = $('#commodity_name').val();
	 var goods_group=$("#goodsSelect").val();
	 console.log("goods_group"+goods_group);
	$('#goods_list').dataTable({
	 	"processing": true,
        "serverSide": true,
        "paging":   true,
        "stateSave":false,
        "autoWidth":false,
        "ordering": false,
        "info":     true,
        "bLengthChange":   true,
        "bPaginate":true,
        "bDestroy": true,
        "pageLength": 20,
        "aLengthMenu": [[20, 30, 40], [20, 30, 40]],
        "createdRow": function ( row, data, index ) {
        	$(row).children('td').eq(1).attr('style', 'text-align: center;');
        	if(index % 2 == 1){
        		$(row).css("background","#F4F4F4");
        	}
        },
        "searching": false,
        "sDom":'<"info-toolbar">rtilp',
        "columns" : [   
            { "data" : ""}
        ],
        "columnDefs": [
			{
			    "targets": [0],
			    "data":"",
			    "render": function(data, type, full) {
			    	var img=full.img_path_str.split(",")[0];
			    	var str= "<div class='shanpin layui-form'>";
		    		if(full.attend==null){ //不在商品组中
		    			str+="<input id=box"+full.id+" type='checkbox' name='goodsName' lay-skin='primary' lay-filter='childChoose' value="+full.id+">";
		    		}else{ //在商品组中
		    			str+="<input id=box"+full.id+" type='checkbox' disabled='disabled' name='goodsName' lay-skin='primary' lay-filter='childChoose' value="+full.id+">";	
		    		}
		    		str+="<img src="+img+" alt="+full.commodity_name+">"
		    	    +"<div><a style='cursor: pointer;'>"+full.commodity_name+"</a><br>"
		    		+"<span style='font-weight:bold;color:red;'>￥"+full.price+"</span></div></div>";
		    		return str;
			      }
			 },
			{
			    "targets": [1],
			    "data":"",
			    "render": function(data, type, full) {
			    	var str="";
			    		str = 
				    	"<a id='button"+full.id+"' style='cursor: pointer;'"
				    	+"class='layui-btn layui-btn-normal layui-btn-small'"
				    	+"onclick='joinIntegral(\""+full.id+"\",\""+full.img_path_str.split(",")[0]+"\",\""+full.commodity_name+"\",\""+full.price+"\")'>"
				    	+"参加</a>";
			    	
			    	return str;
			      }
			  }
         ],
         "ajax": {
        	 "type":"post",
             "url": getRootPath()+"/fixedList/queryFixedCommodityById.action",
             "dataType":"json",
             'data' : {
            	 "commodity_name":commodity_name,
            	 "goods_group":goods_group,
            	 "id":id
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
             
             },
             "fnInfoCallback": function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
                 return getCallBack(sPre);
             }
	    });
}

/**
 * 加载完数据之后的回调函数
 */
function getCallBack(sPre){	
	layui.use(['form','layer','element'],function(){
	$("#batchJoinCheckbox").prop("checked",false);//全选按钮取消选中
	var currPageArr = getAllSelect();
	currPageArr=currPageArr.split(",");
	$.each(joinGoods,function(index,item){
		$.each(currPageArr,function(id,it){
			if(item==it){
			
				$('#button'+item).css("background","red").text("取消参加");
			}
		}) 
	});
	form.render('checkbox'); 	
	}
	);
}

//获取商品分组
function goodsGroup(){
	var html = "<option value='all'>全部</option>";
	layui.use(['form','layer','element'],function(){
	$.ajax({
		url:getRootPath()+'/commodity/queryCommodityGroupList.action',
		type:'post',
		dataType:'json',
		async:false,
		data:{},
		success:function(data){
           console.log("=========="+data);
			
			$.each(data.commodityGroupList,function(index,item){
				html += '<option value='+item.id+'>'+item.commodity_group_name+'</option>';
			});
			$("#goodsSelect").html(html);
			form.render('select'); 
			
		}
	})
	})
}

//var arrayB = new Array();//用于存放已选商品的id
layui.use(['form','layer','element'],function(){
	var form = layui.form();
	var layer = layui.layer;
	var element = layui.element();
	
	
	//批量参加按钮监听
	form.on('checkbox(batchChoose)',function(data){
		console.log("=======data:"+data)
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]').not(':disabled');  
        child.each(function(index, item){  
          item.checked = data.elem.checked;  
        });      
        form.render('checkbox');  
	})
	
	//第1个表格里的每一个checkbox点击
	form.on('checkbox(childChoose)',function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]').not(':disabled');
		var flag = "";
        child.each(function(index, item){  
        	if(item.checked==true){
        		flag = "t";
        	}else{
        		flag = "f";
        		return false;
        	}
        }); 
        if(flag=="f"){
        	$("#batchJoinCheckbox").prop("checked",false);
        }else{
        	$("#batchJoinCheckbox").prop("checked",true);
        }
        form.render('checkbox');  
	})
	
	//第二个表格里的每一个checkbox点击
	form.on('checkbox(childChoose2)',function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]').not(':disabled');
		var flag = "";
        child.each(function(index, item){  
        	if(item.checked==true){
        		flag = "t";
        	}else{
        		flag = "f";
        		return false;
        	}
        }); 
        if(flag=="f"){
        	$("#batchCancelCheckbox").prop("checked",false);
        }else{
        	$("#batchCancelCheckbox").prop("checked",true);
        }
        form.render('checkbox');  
	})
	
	
	var key = new Array();
	//id有值说明是修改方法
	if(isNotEmpty(id)){
		$.ajax({
			url:getRootPath()+'/fixedList/isChooseCommodity.action',
			type:'post',
			dataType:'json',
			data:{
				"id":id
			},
			success:function(data){
				if(data!=null){
					$.each(data,function(index,item){
						text = 
							'<tr id=tr'+item.commodity_id+'><td><div class="shanpin layui-form">'
							+'<input id=box2'+item.commodity_id+' type="checkbox" name="goodsName" lay-skin="primary" lay-filter="childChoose2" value='+item.commodity_id+'>'
							+ '<img src='+item.img_path_str.split(",")[0]+' alt='+item.commodity_name+'><div><a style="cursor: pointer;">'+item.commodity_name+'</a><br>'
							+ '<span style="font-weight:bold;color:red;">￥'+item.price+'</span></div></div></td>'
							+ '<td style="text-align:center;">'
							+'<a style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+item.commodity_id+'\')">取消参加</a></td></tr>';
							$("#goods_list2 tbody").append(text);
							joinGoods.push(item.commodity_id);
					});
				}
				form.render();
			}
		});
	}
	
	//点击批量参加时
	$('#batchJoin').click(function(){
		var batchArr = getManySelect();
		if(batchArr == undefined || batchArr == "" || batchArr == null){
			parent.layer.alert('请您先选择商品再进行批量参加操作');
		}else{
			batchArr=batchArr.split(","); 
			batchArr = batchArr.filter(function (n) {
			    return n !== 'on'
			});
			//数组去重方法
			//遍历当前选中的数组  
			for(var i = 0; i <batchArr.length; i++){  
				//如果当前数组的第i已经保存进了全局数组，那么跳过， 否则把当前项push到全局数组里面  
				if (joinGoods.indexOf(batchArr[i]) == -1) {
					joinGoods.push(batchArr[i]);
						$('#button'+batchArr[i]).css('background','red').text('取消参加');
						commonMethod(batchArr[i]);
					}
				}
			//console.log("当前全局数组"+joinGoods)
			}
		});
	//点击搜索按钮所触发的事件
	$('#queryIntegralList').click(function(){
		searchPage();
	});
    $("#batchJoin").prop("checked",false);//全选按钮取消选中
	form.render();
})

//根据商品id查询商品信息
function commonMethod(item){
	layui.use(['form','element'],function(){
		var form = layui.form();
		var element = layui.element();
		$.ajax({
			url:getRootPath()+'/discount/queryGoodsInfoById.action',
			type:'post',
			dataType:'text',
			async:false,
			data:{
				"goodsId":item
			},
			success:function(data){
				data = JSON.parse(data);
				text = 
					'<tr id=tr'+data.id+'><td><div class="shanpin layui-form">'
					+'<input id=box2'+data.id+' type="checkbox" name="goodsName" lay-skin="primary" lay-filter="childChoose2" value='+data.id+'>'
					+ '<img src='+data.img_path_str.split(",")[0]+' alt='+data.commodity_name+'><div><a style="cursor: pointer;">'+data.commodity_name+'</a><br>'
					+ '<span style="font-weight:bold;color:red;">￥'+data.price+'</span></div></div></td>'
					+ '<td style="text-align:center;">'
					+'<a style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+data.id+'\')">取消参加</a></td></tr>';
				$("#goods_list2 tbody").append(text);
				//arrayB.push(data.id);
			}
		});
		form.render();
	});
}


//获取所有的选中的checkbox
function getManySelect(){
    var spCodesTemp = "";
    $('input:checkbox[name=goodsName]:checked').each(function(i){
        if(0==i){
           spCodesTemp = $(this).val();
        }else{
           spCodesTemp += (","+$(this).val());
        }
  	});
    return spCodesTemp;
}

//获取当前页所有的checkbox(无论是否选中)
function getAllSelect(){
    var spCodesTemp = "";
    $('input:checkbox[name=goodsName]').each(function(i){
        if(0==i){
           spCodesTemp = $(this).val();
        }else{
           spCodesTemp += (","+$(this).val());
        }
  	});
  
    return spCodesTemp;
}

//点击批量取消时
function batchCancel(){
	var batchArr = "";
    $('input:checkbox[lay-filter="childChoose2"]:checked').each(function(i){
        if(0==i){
        	batchArr = $(this).val();
        }else{
        	batchArr += (","+$(this).val());
        }
  	});
	if(batchArr == undefined || batchArr == "" || batchArr == null){
		parent.layer.alert('请您先选择商品再进行批量取消操作');
	}else{
		batchArr=batchArr.split(","); 
		batchArr = batchArr.filter(function (n) {
		    return n !== 'on'
		});
		$.each(batchArr,function(index,item){
			$('#button'+item).css('background','').text('参加');
			$('#tr'+item).remove();
			//从数组中移除元素(根据index移除，首先获取元素的下标)
		
			for(var i=0;i<joinGoods.length;i++){
				if(joinGoods[i]==item){
					joinGoods.splice(i,1);
				}
			}
		});
		//批量取消多选框取消选中
		$("#batchCancelCheckbox").prop("checked",false);
		//去掉选中的样式
		$("#batchCancelCheckbox").next().removeClass("layui-form-checked");
	}
}

//记录已选商品
var yxGoods = new Array();
var html="";
//取消参加与参加按钮事件
function joinIntegral(id,img_path_str,commodity_name,detail_price){
	layui.use(['form','element'],function(){
		var form = layui.form();
		var element = layui.element();
		var text = $('#button'+id).text();
		if(text=="参加"){
			html = 
				'<tr id=tr'+id+'><td><div class="shanpin layui-form">'
				+'<input id=box2'+id+' type="checkbox" name="goodsName" lay-skin="primary" lay-filter="childChoose2" value='+id+'>'
				+ '<img src='+img_path_str.split(",")[0]+' alt='+commodity_name+'><div><a style="cursor: pointer;">'+commodity_name+'</a><br>'
				+ '<span style="font-weight:bold;color:red;">￥'+detail_price+'</span></div></div></td>'
				+'<td style="text-align:center;">'
				+'<a id="button" style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+id+'\')">'
				+'取消参加</a></td></tr>';
				
			$("#goods_list2 tbody").append(html); 
			$('#button'+id).css('background','red').text('取消参加');
			//arrayB.push(id);
			joinGoods.push(id);
		}else{
			$('#tr'+id).remove();
			$('#button'+id).css('background','').text('参加');
			//从数组中移除元素(根据index移除，首先获取元素的下标)
			/*for(var i=0;i<arrayB.length;i++){
				if(arrayB[i]==id){
					arrayB.splice(i,1);
				}
			}*/
			for(var i=0;i<joinGoods.length;i++){
				if(joinGoods[i]==id){
					joinGoods.splice(i,1);
				}
			}
		}
		form.render();
	});
	
}

//已选商品中的取消参加
function cancelJoin(id){
	$('#button'+id).css('background','').text('参加');
	$('#tr'+id).remove();
	//从数组中移除元素(根据index移除，首先获取元素的下标)
	for(var i=0;i<joinGoods.length;i++){
		if(joinGoods[i]==id){
			joinGoods.splice(i,1);
		}
	}
}

//获取已选商品的个数
function changeGoodsAmount(){
	var length = $('#goods_list2 tbody tr').length;
	$('#amount').text(length);
}