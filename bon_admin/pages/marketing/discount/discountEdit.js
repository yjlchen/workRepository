/**
 * 限时折扣编辑js
 */
var joinGoods = [];//记录已经选择参加的商品
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	var text = '{"goodsGroup":"","goodsType":"","conditions_name":"","activity_id":"'+id+'"}';
	searchPage(text);
	goodsGroup();
});

//获取商品分组
function goodsGroup(){
	layui.use('form',function(){
		var form = layui.form();
		var html = "<option value='all'>全部</option>";
		$.ajax({
			url:getRootPath()+'/commodity/queryCommodityGroupList.action',
			type:'post',
			dataType:'json',
			success:function(data){
				$.each(data.commodityGroupList,function(index,item){
					html += '<option value='+item.id+'>'+item.commodity_group_name+'</option>';
				});
				$("#goodsSelect").html(html);
				form.render();
			}
		})
	});
}

//查询商品
var cust;
function searchPage(jsonStr){
	 cust = $('#goods_list').dataTable({
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
        	$(row).children('td').eq(2).attr('style', 'text-align: center;');
        	if(index % 2 == 1){
        		$(row).css("background","#F4F4F4");
        	}
        },
        "searching": false,
        "sDom":'<"info-toolbar">rtilp',
        "columns" : [   
            { "data" : "","sDefaultContent" : ""},
            { "data" : "store_count"}
        ],
        "columnDefs": [
						{
						    "targets": [0],
						    "data":"",
						    "render": function(data, type, full) {
						    	return showGoodsDetail(full);
						      }
						 },
						{
						    "targets": [2],
						    "data":"",
						    "render": function(data, type, full) {
						    	var str="";
						    	if(full.marketing_activity_type==null){ //没参与其他活动
						    		str = 
							    	"<a id='button"+full.id+"' style='cursor: pointer;'"
							    	+"class='layui-btn layui-btn-normal layui-btn-small'"
							    	+"onclick='joinIntegral(\""+full.id+"\",\""+full.store_count+"\",\""+full.img_path_str+"\",\""+full.commodity_name+"\",\""+full.price+"\")'>"
							    	+"参加</a>";
						    	}else if(full.marketing_activity_type==10){ //已参加拼团活动
						    		str = "已参加拼团活动";
						    	}else if(full.marketing_activity_type==20){ //已参加其他限时折扣活动
						    		str = "已参加其他限时折扣活动";
						    	}else if(full.marketing_activity_type==30){  //已参加满减送活动
						    		str = "已参加满减送活动";
						    	}
						    	return str;
						      }
						  }
                     ],
                     "ajax": {
                    	 "type":"post",
                         "url": getRootPath()+"/discount/queryAllGoodsList.action",
                         "dataType":"json",
                         'data' : {
                        	 "queryJsonStr":jsonStr
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
	                         return getCallBack();
	                     }
	    });
}


//选择商品列表每一列的数据
function showGoodsDetail(full){
	var str= 
	"<div class='shanpin layui-form'>";
	if(full.marketing_activity_type==null){ //没参与其他活动
		str+="<input id=box"+full.id+" type='checkbox' name='goodsName' lay-skin='primary' lay-filter='childChoose' value="+full.id+">";
	}else{ //参与了其他优惠活动
		str+="<input id=box"+full.id+" type='checkbox' disabled='disabled' name='goodsName' lay-skin='primary' lay-filter='childChoose' value="+full.id+">";	
	}
	str+="<img src="+full.img_path_str+" alt="+full.commodity_name+">"
    +"<div><a style='cursor: pointer;'>"+full.commodity_name+"</a><br>"
	+"<span style='font-weight:bold;color:red;'>￥"+full.price+"</span></div></div>";
	return str;
}



/**
 * 加载完数据之后的回调函数
 */
function getCallBack(){
	layui.use(['form','layer','element'],function(){
		var form = layui.form();
		var layer = layui.layer;
		var element = layui.element();
		var table = $('#goods_list').DataTable();
		var currPage = table.page()+1;
		$('#currPage').text(currPage);
		$("#batchJoinCheckbox").prop("checked",false);//全选按钮取消选中
		$.each(joinGoods,function(index,item){
			var currPageArr = getAllSelect();
			currPageArr=currPageArr.split(","); 
			currPageArr = currPageArr.filter(function (n) {
			    return n !== 'on'
			});
			$.each(currPageArr,function(id,it){
				if(item==it){
					$('#button'+item).css("background","red").text("取消参加");
				}
			}) 
		}); 
		form.render();
	});
}


//var arrayB = new Array();//用于存放已选商品的id
layui.use(['form','layer','element'],function(){
	var form = layui.form();
	var layer = layui.layer;
	var element = layui.element();
	
	//全选按钮监听
	form.on('checkbox(batchChoose)',function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]').not(':disabled');    
        child.each(function(index, item){  
          item.checked = data.elem.checked;  
        });  
        form.render('checkbox');  
	})
	
	
	//第一个表格里的每一个checkbox点击
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
	
	var type = getUrlParam("type");//type=2编辑
	//定义商品id数组
	var key = new Array();
	//判断是修改还是添加,type=2代表修改
	if(type=='2'){
		$.ajax({
			url:getRootPath()+'/discount/queryDiscount.action',
			type:'post',
			dataType:'json',
			data:{
				"id":id
			},
			success:function(data){
				//表单赋值
				$("#discountForm").setForm(data.discount);
				//如果限购数量为0，将值设置为空
				if($("input[name='limit_buy_num']").val()==0){
					$("input[name='limit_buy_num']").val("");
				}
				/**活动标签图片展示**/
				 //第一个li显示
				 $(".module-goods-list li").eq(0).css("display","block");
				 //添加上标签图片
				 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+data.discount.activity_label+")");
				 //第2个li隐藏
				 $(".module-goods-list li").eq(1).css("display","none");
				//商品id数组中放入值
				$("#goods_list tbody tr td div").find('input').each(function() {  
			           key.push($(this).val());  
			    });  
				if(data.gooodsList != null && data.gooodsList!=undefined){
					$.each(data.gooodsList,function(index,item){
						text = 
							'<tr id=tr'+item.commodity_id+'><td><div class="shanpin layui-form">'
							+'<input id=box2'+item.commodity_id+' type="checkbox" name="goodsName" lay-skin="primary" lay-filter="childChoose2" value='+item.commodity_id+'>'
							+ '<img src='+item.img_path_str+' alt='+item.commodity_name+'><div><a style="cursor: pointer;">'+item.commodity_name+'</a><br>'
							+ '<span style="font-weight:bold;color:red;">￥'+item.price+'</span></div></div></td>'
							+ '<td style="text-align:center;">折扣：<input type="number" min="1.0" max="9.9" step="0.1" name="commodity_discount" value='+item.commodity_discount+'></td>'
							+ '<td style="text-align:center;">'
							+'<a style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+item.commodity_id+'\')">取消参加</a></td></tr>';
						$("#goods_list2 tbody").append(text);
						//arrayB.push(item.commodity_id);
						joinGoods.push(item.commodity_id);
						$.each(key,function(inx,itm){
							//本次活动上次编辑时选择参加的商品，显示取消参加
							if(item.commodity_id==itm){
								$('#button'+itm).css('background','red').text('取消参加');
							}
						});
					});
				}
				form.render('checkbox'); //一定要渲染，不然初始化时checkbox不显示
				//console.log("初始化"+joinGoods);
			}
		});
	}
	
	//点击取消
	$("#cancel").click(function(){
		location.href = "discountList.jsp";
	});
	//隐藏标题未填写提示
	$("input[name='discount_name']").focus(function(){
		$(this).siblings().hide();
	})
	//时间改变，隐藏错误提示
	$("input[name='discount_active_stime']").change(function(){
		$("span#check_discount_active_time").hide();
	})
	//时间改变，隐藏错误提示
	$("input[name='discount_active_etime']").change(function(){
		$("span#check_discount_active_time").hide();
	})
	//隐藏限购错误提示
	$("input[name='limit_buy_num']").focus(function(){
		$("span#check_limit_buy_num").hide();
	})
	//点击限购选项，隐藏限购错误提示
	$("input[name='is_limit_buy']").click(function(){
		$("span#check_limit_buy_num").hide();
	})
	
	
	//点击确定按钮，非layui方式提交
	$('#terst').click(function(){
		var flag = 0;
		//活动名称
		var discount_name = $("input[name='discount_name']").val();
		//生效开始时间
		var discount_active_stime = $("input[name='discount_active_stime']").val();
		//生效结束时间
		var discount_active_etime = $("input[name='discount_active_etime']").val();
		//限购设置
		var is_limit_buy = $("input[name='is_limit_buy']:checked").val();
		//限购件数
		var limit_buy_num = $("input[name='limit_buy_num']").val();
		//活动标签
		var activity_label = $("input[name='activity_label']").val();
		//正则表达式，只能输入1-9的正整数或1位小数
		var p1 = /^[1-9]{1}\.([0-9]{1})$/;
		var p2 = /^[1-9]{1}$/;
		if(is_limit_buy==0){//限购时，限购数量必填
			if(limit_buy_num==""){
				$("span#check_limit_buy_num").show();
				//返回头部
				$('html').animate( {scrollTop: 0}, 500);
				flag = 1;
				return false;
			}
		}
		if(discount_name==""){
			$("span#check_discount_name").show();
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}
		if(activity_label==""){//未上传活动标签
			parent.layer.alert('请您选择一个活动标签');
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}
		if(discount_active_stime==""||discount_active_etime==""){//有一个时间为空就提示
			$("span#check_discount_active_time").show();
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}
		//没选择活动商品
		if(joinGoods.length==0){
			layer.msg('您还未选择参加活动的商品，请至少选择一个活动商品。', {
				  icon: 5,
				  time: 3000 //2秒关闭（如果不配置，默认是3秒）
				});
			flag = 1;
			return false;
		}else{
			var trArr = $("#goods_list2 tbody tr");
			var flag = 0;
	    	for(var index in joinGoods){
	        	//折扣
		    	var commodity_discount = $(trArr[index]).find("input[name='commodity_discount']").val();
		    	if(commodity_discount==""){
		    		flag = 1;
		    		break;
		    	}else if(!p1.test(commodity_discount)&&!p2.test(commodity_discount)){//折扣值设置不正确
		    		flag = 2;
		    		break;
		    	}
	        }  
	    	if(flag == 1){
	    		layer.msg('存在没有设置折扣的商品，请检查！', {
	  			  icon: 5,
	  			  time: 3000 
	  			});
	    		flag = 1;
	    		return false;
	    	}
	    	if(flag == 2){
	    		layer.msg('存在折扣值设置不正确的商品，请检查！', {
	  			  icon: 5,
	  			  time: 3000 
	  			});
	    		flag = 1;
	    		return false;
	    	}
		}
		if(flag==0){//验证通过
			//不限购的时候，限购数量设置为0
			if(is_limit_buy==1){
				limit_buy_num = 0;
			}
			//新增时，让id变为""
			if(id==null){
				id ="";
			}
			var discountForm = {
					"id":id,
		    		"discount_name":discount_name,
		    		"discount_active_stime":discount_active_stime,
		    		"discount_active_etime":discount_active_etime,
		    		"is_limit_buy":is_limit_buy,
		    		"limit_buy_num":limit_buy_num,
		    		"activity_label":activity_label
				};
	    	var addJsonStr=JSON.stringify(discountForm);//将表单中的数据转成json
	    	if(joinGoods.length>0){
	    		goodsJsonStr='[';
	    	    	//获取tbody的tr
	    	    	var trArr = $("#goods_list2 tbody tr");
	    	    	for(var index in joinGoods){
	    	    		//商品id
	    	        	var commodity_id = joinGoods[index];
	    	        	//折扣
	    		    	var commodity_discount = $(trArr[index]).find("input[name='commodity_discount']").val();
	    	        	var tbody='{';
	    	    			tbody+='"id":"'+"";                      //主键
	    	    			tbody+='","commodity_discount":"'+commodity_discount;
	    	    			tbody+='","commodity_id":"'+commodity_id;
	    	    			tbody+='","discount_id":"'+"";  
	    	    			tbody+='"}'; 
	    	    			if(goodsJsonStr.length>2){
	    	    				goodsJsonStr+=','+tbody;
	    	    			}else{
	    	    				goodsJsonStr+=tbody;
	    	    			}
	    	        }  
	    	    goodsJsonStr+=']';
	    	}
	    	
			$.ajax({
	    		url:getRootPath()+'/discount/editDiscount.action',
	    		type:'post',
	    		dataType:'text',
	    		async:false,
	    		//traditional:true,
	    		data:{
	    			"infoJsonStr":addJsonStr,
	    			"goodsJsonStr":goodsJsonStr
	    		},
	    		success:function(result){
	    			if(result=="success"){
	     				parent.layer.msg('保存成功', {
	 					  icon: 1,
	 					  time: 1000 //1秒关闭（如果不配置，默认是3秒）
	 					}, function(){
	 						location.href = getRootPath()+"/pages/marketing/discount/discountList.jsp";
	 					});
	     			}else{
	     				parent.layer.alert("保存失败");
	     			}
	    		}
	    	});
		}
	})
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
			for(var i = 0; i < batchArr.length; i++){  
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
		var group = $('#goodsSelect').val();
		var goodsType = $('#goodsType').val();
		var conditions_name = $('#conditions_name').val();
		//活动id
		var activity_id = $("input[name='id']").val();
		if(group=="all"){
			group = "";
		}
		var text = '{"goodsGroup":"'+group+'","goodsType":"'+goodsType+'","conditions_name":"'+conditions_name+'","activity_id":"'+activity_id+'"}';
		searchPage(text);
	});
	form.render();
});


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
					+ '<img src='+data.img_path_str+' alt='+data.commodity_name+'><div><a style="cursor: pointer;">'+data.commodity_name+'</a><br>'
					+ '<span style="font-weight:bold;color:red;">￥'+data.price+'</span></div></div></td>'
					+ '<td style="text-align:center;">折扣：<input type="number" min="1.0" max="9.9" step="0.1" name="commodity_discount"></td>'
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
			/*for(var i=0;i<arrayB.length;i++){
				if(arrayB[i]==item){
					arrayB.splice(i,1);
				}
			}*/
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
function joinIntegral(id,stock,img_path_str,commodity_name,detail_price){
	layui.use(['form','element'],function(){
		var form = layui.form();
		var element = layui.element();
		var text = $('#button'+id).text();
		if(text=="参加"){
			html = 
				'<tr id=tr'+id+'><td><div class="shanpin layui-form">'
				+'<input id=box2'+id+' type="checkbox" name="goodsName" lay-skin="primary" lay-filter="childChoose2" value='+id+'>'
				+ '<img src='+img_path_str+' alt='+commodity_name+'><div><a style="cursor: pointer;">'+commodity_name+'</a><br>'
				+ '<span style="font-weight:bold;color:red;">￥'+detail_price+'</span></div></div></td>'
				+ '<td style="text-align:center;">折扣：<input type="number" min="1.0" max="9.9" step="0.1" name="commodity_discount"></td>'
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
			for(var i=0;i<joinGoods.length;i++){
				if(joinGoods[i]==id){
					joinGoods.splice(i,1);
				}
			}
			/*for(var i=0;i<arrayB.length;i++){
				if(arrayB[i]==id){
					arrayB.splice(i,1);
				}
			}*/
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
	/*for(var i=0;i<arrayB.length;i++){
		if(arrayB[i]==id){
			arrayB.splice(i,1);
		}
	}*/
}



/**
 * 调用共用图片选择弹出框（选择一张图片作为活动标签，单选）
 */
function add_activity_label(){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun=show_activity_label&mutl_type=1'   //type=1 单选; 2多选
		});
}


//展示选择的标签图片
function show_activity_label(url){
	 //第一个li显示
	 $(".module-goods-list li").eq(0).css("display","block");
	 //添加上标签图片
	 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+url+")");
	 //给标签图片隐藏域赋值
	 $("input[name='activity_label']").val(url);
	 //第2个li隐藏
	 $(".module-goods-list li").eq(1).css("display","none");
}

//删除选择的标签图片
function delete_activity_label(){
	 //第一个li隐藏
	 $(".module-goods-list li").eq(0).css("display","none");
	 //清空隐藏域的值
	 $("input[name='activity_label']").val("");
	 //第二个li显示
	 $(".module-goods-list li").eq(1).css("display","block");
}


//鼠标悬停加载图片
var targettext=$('a.watch-example');
targettext.hover(function(){
	$(this).parent().children(".image-hover").show();
},function(){
	$(this).parent().children(".image-hover").hide();
})

//点击出现周期选择框
$("input.checked-status").click(function(){
	if($(this).prop("checked")==true){
		$("ul.period-block.hide").removeClass("hide");
	}else{
		$("ul.period-block").addClass("hide");
	}
})
//周期选择唯一
var defaultselect=$("input.js-select-period:checked");//找到默认的选项
if($("input.js-select-period:checked").prop("checked")==true){
	var other=$("input.js-select-period:checked").parent().parent().siblings()[0];
	$(other).children("div.controls-time").children("input[type='text']")
	.attr("disabled","true").css({"background-color":'#EEE',"cursor":"not-allowed"});
}
$("input.js-select-period").click(function(){
	if($(this).prop("checked")==true){
	var others=$(this).parent().parent().siblings()[0];
		$(others).children("div.controls-time").children("input[type='text']")
		.attr("disabled","true").css({"background-color":'#EEE',"cursor":"not-allowed"});
		$(others).children("span.week-selector.js-period-item").children().children("input[type='checkbox']")
		.attr("disabled","true").css({"background-color":'#EEE',"cursor":"not-allowed"});
		$(this).parent().siblings("div.controls-time").children("input[type='text']")
		.removeAttr("disabled").css({"background-color":"white","cursor":"pointer"});
	}
})//点击时唯一
$("input[value='weekly']").click(function(){
	if($(this).prop("checked")==true){
		$(this).parent().siblings("span.week-selector.js-period-item").children().children("input[type='checkbox']").removeAttr("disabled");
	}
});//解封
	