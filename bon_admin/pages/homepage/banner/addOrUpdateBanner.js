var id=getUrlParam("id");
var layer;
var form;
var joinGoods = [];
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	layui.use(['form','element','layer','laydate'], function(){
		var layer = layui.layer;
		var form=layui.form();
		//查询所有的链接类型里面的所支持的类型的数据
		$.ajax({
			url:getRootPath() + '/banner/queryLinkList.action',
			type:'post',
			dataType:'json',
			success:function(data){
				var detailHtml="<option value=''>请选择商品详情页链接</option>";
				$.each(data,function(index,item){
					detailHtml += '<option value="'+item.id+'">'+item.commodity_name+'</option>';
				});
				$('#banner_img_href').html(detailHtml);
				form.render('select');
				if(isNotEmpty(id)){
					initData();
				}
			}			
		});
	})	
	//新增banner页面点击返回按钮
	$('#backButton').click(function(){
		window.location.href=getRootPath()+"/pages/homepage/banner/banner.jsp";
	});
	queryCommodityPage();
	initEvent();
	goodsGroup();//加载商品分组下拉列表
	
	$("#select_featured").click(function(){		
		if($(this).children('input').eq(1).is(":checked")){			
			$("#banner_sort").hide();
		}else{
			$("#number_sort").val('1');//设置默认
			$("#banner_sort").show();
		}		
    });
})

layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
	
	//选择链接类型
	form.on('select(typeFilter)',function(data){
		var value = data.value;
		if(value == "1"){
			$('#goodsDetailPage').show();
			$("#commodityList").hide();
		}else if(value == "2"){
			$('#goodsDetailPage').hide();
			$("#commodityList").show();
		}
	});
	
	//提交
	$("#confirmBtn").click(function(){
		disable_submit(true,'confirmBtn');
		var title = $("#bannertitle").val();
		if(!isNotEmpty(title)){
			parent.layer.msg('请输入banner标题', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var banner_img_url = $('#banner_img_url').val();
		if(!isNotEmpty(banner_img_url)){
			parent.layer.msg('请选择banner图片', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var is_featured=$('input[name="is_featured"]:checked').val();
		var sort=$("#number_sort").val();
		if (is_featured == 1){
			if(sort=="" || sort==null){
				disable_submit(false,'confirmBtn');
				parent.layer.msg("请填写排序");
				return false;
			}
		}else{
			sort = 0;
		}
		
		var link_type = $("#link_type").val();
		if(!isNotEmpty(link_type)){
			parent.layer.msg('请选择链接类型', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var start_time = $("#start_time").val();
		if(!isNotEmpty(start_time)){
			parent.layer.msg('请输入开始时间', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var end_time = $("#end_time").val();
		if(!isNotEmpty(end_time)){
			parent.layer.msg('请输入结束时间', {icon: 2,time: 2000});
			disable_submit(false,'confirmBtn');
			return false;
		}
		var banner_img_href;
		if(link_type == "1"){
			banner_img_href = $('#banner_img_href').val();
			if(!isNotEmpty(banner_img_href)){
				parent.layer.msg('请选择商品详情页链接', {icon: 2,time: 2000});
				disable_submit(false,'confirmBtn');
				return false;
			}
		}else if(link_type == "2"){
			if(joinGoods.length<1){
				parent.layer.msg('请选择商品组', {icon:2,time: 2000});
				disable_submit(false,'confirmBtn');
				return ;
			}
		}
		var jsonStr = '{"link_type":"'+link_type+'","banner_img_url":"'+banner_img_url+'","sort":"'+sort+'","start_time":"'+start_time+'","end_time":"'+end_time
        + '","is_featured":"'+is_featured+'","title":"'+title+'","banner_img_href":"'+banner_img_href+'"}';
		if(id != null && id != ""){
			$.ajax({
				url:getRootPath() + '/banner/updateBannerInfo.action',
				type:'post',
				dataType:'text',
				data:{
					"jsonStr":jsonStr,
					"bannerId":id,
					"commodity_ids":JSON.stringify(joinGoods)
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/homepage/banner/banner.jsp";
					}
				}
			});
		}else{
			$.ajax({
				url:getRootPath() + '/banner/saveBanner.action',
				type:'post',
				dataType:'text',
				data:{
					"jsonStr":jsonStr,
					"commodity_ids":JSON.stringify(joinGoods)
				},
				success:function(data){
					if(data=="success"){
						window.location.href=getRootPath()+"/pages/homepage/banner/banner.jsp";
					}
				}
			});
		}
	})
	
})

function initEvent(){
	$("#chongzhi").click(function(){
		$('#bannerForm1')[0].reset();
		delGrouponCommodity();
		$("#goods_list2 tbody").empty();
		$("#goods_list tbody tr td .layui-btn").css('background','').text('参加');
	})
	
	loadCommodityList();
	
}


//编辑
function initData(){
	layui.use('form',function(){
		var form = layui.form();
		$.ajax({
			url:getRootPath() + '/banner/queryBannerInfoById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				$('#bannerForm1').setForm(result);
				$('input[name="is_featured"][value='+result.is_featured+']').attr("checked",true); 
				$("#banner_img_url").val(result.banner_img_url);
				//第一个li显示
				$(".module-goods-list li").eq(0).css("display","block");
				//添加上商品图片
				$(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+result.banner_img_url+")");
				//第2个li隐藏
				$(".module-goods-list li").eq(1).css("display","none");
				var link_type = result.link_type;
				if(link_type == "1"){//商品详情页
					$('#goodsDetailPage').show();
					var goodsId = result.banner_img_href;
					//$('input[name="banner_img_href"][value="'+result.banner_img_href+'"]').attr("checked",true);
					$.each($("#goodsDetailPage dl dd"),function(index,item){
						if(goodsId==$(item).attr("lay-value")){
							$(item).addClass("layui-this");
						}
					})
					form.render('select');
				}else if(link_type == "2"){//商品列表
					$('#goodsDetailPage').hide();
					$("#commodityList").show();
				}
				form.render();
			}
		});
	});
}



//弹出选择参加拼团活动的商品的列表（单选）
function addGrouponGoods(obj,flag){
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
		  //弹出商品选择框
		  parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun=show_activity_label&mutl_type=1'   //type=1 单选; 2多选
		});
		})
}

//展示选择的标签图片
function show_activity_label(url){
	$("#banner_img_url").val(url);
	//第一个li显示
	 $(".module-goods-list li").eq(0).css("display","block");
	 //添加上商品图片
	 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+url+")");
	//第2个li隐藏
	 $(".module-goods-list li").eq(1).css("display","none");
}
//显示选中的商品
function get_good_groupon(idArr){
	if(idArr.length>0){
		for(var i=0;i<idArr.length;i++){
			$.ajax({
	        	"type":"post",
	            "url": getRootPath()+"/commodity/queryCommodityInfo.action",
	            async: false,//同步
	            'data' : {id:idArr[i]},
	            "dataType":"json",
	            'success' : function (data) {
	            	 //商品图片
	            	 var commodity_image;
	        		 if(data.data.img_path_str.indexOf(",")<0){
	        			 commodity_image = data.data.img_path_str;
	        		 }else{
	        			//图片url,取第一个，之前的值
	        			 commodity_image = data.data.img_path_str.substr(0,data.data.img_path_str.indexOf(","));
	        		 }
	        		 $("#banner_img_url").val(commodity_image);
	        		//第一个li显示
	        		 $(".module-goods-list li").eq(0).css("display","block");
	        		 //添加上商品图片
	        		 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+commodity_image+")");
	        		//第2个li隐藏
	        		 $(".module-goods-list li").eq(1).css("display","none");
	            },
	            'error':function(){
	            	
	            }
		    });
			
		}
	}
}

//删除选择的商品（新增时）
function delGrouponCommodity(){
	 $("#banner_img_url").val("");
	 //第一个li隐藏
	 $(".module-goods-list li").eq(0).css("display","none");
	 //第二个li显示
	 $(".module-goods-list li").eq(1).css("display","block");
}



function queryCommodityPage(){
	var commodity_name = $('#commodity_name').val();
	var commodity_group_id = $('#goodsSelect').val();
	if(commodity_group_id=="all"){
		commodity_group_id = '';
	}
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
        "pageLength": 10,
        "aLengthMenu": [[10, 20, 30], [10, 20, 30]],
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
		    		str+="<input id=box"+full.id+" type='checkbox' name='goodsName' lay-skin='primary' lay-filter='childChoose' value="+full.id+">";
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
			    	/*if(full.attend==null){*/
			    		str = 
				    	"<a id='button"+full.id+"' style='cursor: pointer;'"
				    	+"class='layui-btn layui-btn-normal layui-btn-small'"
				    	+"onclick='joinIntegral(\""+full.id+"\",\""+full.img_path_str+"\",\""+full.commodity_name+"\",\""+full.price+"\")'>"
				    	+"参加</a>";
			    	/*}else{
			    		str = 
				    	"<a id='button"+full.id+"' style='cursor: pointer;background:red'"
				    	+"class='layui-btn layui-btn-normal layui-btn-small'"
				    	+"onclick='joinIntegral(\""+full.id+"\",\""+full.img_path_str+"\",\""+full.commodity_name+"\",\""+full.price+"\")'>"
				    	+"取消参加</a>";
			    	}*/
			    	return str;
			      }
			  }
         ],
         "ajax": {
        	 "type":"post",
             "url": getRootPath()+"/banner/queryBannerCommodityById.action",
             "dataType":"json",
             'data' : {
            	 "commodity_name":commodity_name,
            	 "commodity_group_id":commodity_group_id,
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
	layui.use(['form'],function(){
		var form = layui.form();
		$.each(joinGoods,function(index,item){
			var currPageArr = getAllSelect();
			currPageArr=currPageArr.split(",");
			$.each(currPageArr,function(id,it){
				if(item==it){
					$('#button'+item).css("background","red").text("取消参加");
				}
			}) 
		});
		form.render('checkbox');
	})
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

function loadCommodityList(){
	layui.use(['form','layer','element'],function(){
		var form = layui.form();
		var layer = layui.layer;
		var element = layui.element();
		
		//批量参加按钮监听
		form.on('checkbox(batchChoose)',function(data){
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
				url:getRootPath()+'/banner/isChooseCommodity.action',
				type:'post',
				dataType:'json',
				async:false,
				data:{
					"id":id
				},
				success:function(data){
					if(data!=null){
						$.each(data,function(index,item){
							text = 
								'<tr id=tr'+item.commodity_id+'><td><div class="shanpin layui-form">'
								+'<input id=box2'+item.commodity_id+' type="checkbox" name="goodsName" lay-skin="primary" lay-filter="childChoose2" value='+item.commodity_id+'>'
								+ '<img src='+item.img_path_str+' alt='+item.commodity_name+'><div><a style="cursor: pointer;">'+item.commodity_name+'</a><br>'
								+ '<span style="font-weight:bold;color:red;">￥'+item.price+'</span></div></div></td>'
								+ '<td style="text-align:center;">'
								+'<a style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+item.commodity_id+'\')">取消参加</a></td></tr>';
							$("#goods_list2 tbody").append(text);
							joinGoods.push(item.commodity_id);
						});
					}
				}
			});
		}
		
		//点击批量参加时
		$('#batchJoin').click(function(){
		
			var batchArr = getManySelect();
			console.log("batchArr"+batchArr);
			if(batchArr == undefined || batchArr == "" || batchArr == null){
				parent.layer.alert('请您先选择商品再进行批量参加操作');
			}else{
				batchArr=batchArr.split(","); 
			/*	batchArr = batchArr.filter(function (n) {
					return n !== 'on'
				});
				*/
				//console.log("batchArr2"+batchArr);
				//console.log("当前数组"+joinGoods);
				for(var i = 0; i < batchArr.length; i++){  
					if (joinGoods.indexOf(batchArr[i]) == -1) {
						joinGoods.push(batchArr[i]);
						$('#button'+batchArr[i]).css('background','red').text('取消参加');
						commonMethod(batchArr[i]);
					}
				};
				//console.log("当前全局数组"+joinGoods);
			}
		});
		//点击搜索按钮所触发的事件
		$('#queryIntegralList').click(function(){
			queryCommodityPage();
		});
		
		form.render();
	})
}

//获取商品分组
function goodsGroup(){
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
		}
	})
}

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
					+ '<td style="text-align:center;">'
					+'<a style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+data.id+'\')">取消参加</a></td></tr>';
				$("#goods_list2 tbody").append(text);

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
    console.log("suozhong"+spCodesTemp)
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
		parent.layer.alert('请您先选择商品再进行取消操作');
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
				+ '<img src='+img_path_str+' alt='+commodity_name+'><div><a style="cursor: pointer;">'+commodity_name+'</a><br>'
				+ '<span style="font-weight:bold;color:red;">￥'+detail_price+'</span></div></div></td>'
				+'<td style="text-align:center;">'
				+'<a id="button" style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+id+'\')">'
				+'取消参加</a></td></tr>';
				
			$("#goods_list2 tbody").append(html); 
			$('#button'+id).css('background','red').text('取消参加');
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

