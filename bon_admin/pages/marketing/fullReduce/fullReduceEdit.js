var joinGoods = [];
/**
 * 满减送编辑js
 */
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	var text = '{"goodsGroup":"","goodsType":"","conditions_name":"","activity_id":"'+id+'"}';
	searchPage(text);
	goodsGroup();
	//initWeiPageList();
	
	//点击确定按钮，非layui方式提交
	$('#saveFullReduce').click(function(){
		var flag = 0;
		//活动名称
		var full_reduce_name = $("input[name='full_reduce_name']").val();
		//生效开始时间
		var full_reduce_active_stime = $("input[name='full_reduce_active_stime']").val();
		//生效结束时间
		var full_reduce_active_etime = $("input[name='full_reduce_active_etime']").val();
		//活动标签
		var activity_label = $("input[name='activity_label']").val();
		//优惠门槛的值
		var full_reduce_money = $("input[name='full_reduce_money']").val();
		//优惠方式
		var cash_or_discount = $("input[name='cash_or_discount']:checked").val();
		//减多少现金
		var minus_cash = $("input[name='minus_cash']").val();
		//打多少折
		var discount_value = $("input[name='discount_value']").val();
		//是否免邮
		var is_free_postage;
		if($("input[name='is_free_postage']").prop("checked")==true){
			is_free_postage = 0;
		}else{
			is_free_postage = 1;
		}
		//是否主推
		var is_featured = $("input[name='is_featured']:checked").val();
		//满减送排序
		var sort = $("input[name='sort']").val();
		//背景图
		var background_image_url = $("input[name='background_image_url']").val();
		//验证折扣的正则，只能输入1-9的正整数或1位小数
		var p1 = /^[1-9]{1}\.([0-9]{1})$/;
		var p2 = /^[1-9]{1}$/;
		//验证优惠门槛的正则表达式
		var reg=/^[0-9]+(.[0-9]{2})?$/;//数字，且小数点后两位的正则
		
		if(full_reduce_name==""){//活动名称未填写
			$("span#check_full_reduce_name").show();
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}
		if(full_reduce_active_stime==""||full_reduce_active_etime==""){//有一个时间为空就提示
			$("span#check_full_reduce_active_time").show();
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
		if(background_image_url==""){//未上传背景图
			parent.layer.alert('请您选择一个活动背景图');
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}
	/*	if($("#gongneng_label").val()==null){//没选择功能标签
			parent.layer.alert('请至少选择一个功能标签');
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}*/
		//没选择活动商品
		if(joinGoods.length==0){
			layer.msg('您还未选择参加活动的商品，请至少选择一个活动商品。', {
				  icon: 5,
				  time: 2000 //2秒关闭（如果不配置，默认是3秒）
				});
			flag = 1;
			return false;
		}
		//优惠门槛设置错误
		if(reg.test(full_reduce_money)===false || full_reduce_money==""){
			$("input[name='full_reduce_money']").siblings("p.help-block.error-message").text("满减金额必须是数字,满减金额支持保留两位小数").show();
			//返回头部
			$('html').animate( {scrollTop: 0}, 500);
			flag = 1;
			return false;
		}
		
		//如果选择了减现金
		if(cash_or_discount==0){
			//减现金没填或填的不正确
			if(minus_cash=="" || reg.test(minus_cash)===false){
				$("input[name='minus_cash']").parent().siblings("p.help-block.error-message").show();
				$("input[name='minus_cash']").parent().siblings("p.help-block.error-message").text("优惠金额必须是数字,优惠金额支持保留两位小数");
				//返回头部
				$('html').animate( {scrollTop: 0}, 500);
				flag = 1;
				return false;
			}else if(Number(minus_cash)-Number(full_reduce_money)>0){//不能超过优惠门槛
				$("input[name='minus_cash']").parent().siblings("p.help-block.error-message").show();
				$("input[name='minus_cash']").parent().siblings("p.help-block.error-message").text("优惠金额不能超过满减金额");
				//返回头部
				$('html').animate( {scrollTop: 0}, 500);
				flag = 1;
				return false;
			}
		}
		//如果选择了打折
		if(cash_or_discount==1){
			//打折的值没填正确
			if((!p1.test(discount_value)&&!p2.test(discount_value)) || discount_value==""){
				$("input[name='discount_value']").parent().siblings("p.help-block.error-message").show();
				$("input[name='discount_value']").parent().siblings("p.help-block.error-message").text("折扣必须在1~9.9折之间，最多1位小数");
				//返回头部
				$('html').animate( {scrollTop: 0}, 500);
				flag = 1;
				return false;
			}
		}
		
		//主推如果选择了是
		if(is_featured==1){
			if(sort==""){
				parent.layer.alert('请填写排序');
				//返回头部
				$('html').animate( {scrollTop: 0}, 500);
				flag = 1;
				return false;
			}
		}
		
		if(flag==0){//验证通过
			//新增时，让id变为""
			if(id==null){
				id ="";
			}
			//如果减多少现金为空
			if(minus_cash==""){
				minus_cash = null;
			}
			//如果打多少折为空
			if(discount_value==""){
				discount_value = null;
			}
			if(sort==""){//排序为空
				sort = 0;
			}
			var discountForm = {
					"id":id,
		    		"full_reduce_name":full_reduce_name,
		    		"is_featured":is_featured,
		    		"full_reduce_active_stime":full_reduce_active_stime,
		    		"full_reduce_active_etime":full_reduce_active_etime,
		    		"activity_label":activity_label,
		    		"background_image_url":background_image_url,
		    		"full_reduce_money":full_reduce_money,
		    		"cash_or_discount":cash_or_discount,
		    		"minus_cash":minus_cash,
		    		"discount_value":discount_value,
		    		"is_free_postage":is_free_postage,
		    		"sort":sort
				};
	    	var addJsonStr=JSON.stringify(discountForm);//将表单中的数据转成json
	    	//功能标签集合
	        var jsonlabels='[';
	    	    var c_label=$("#gongneng_label").val();
	    	    if(c_label!=null&&c_label.length>0){
	    	        for(var index in c_label){  
	    	        	var label_id=c_label[index];  
	    	        	 var tbody='{';
	    	    			tbody+='"id":"'+"";                      //主键
	    	    			tbody+='","full_reduce_id":"'+id;    
	    	    			tbody+='","label_id":"'+label_id;  
	    	    			tbody+='"}'; 
	    	    			if(jsonlabels.length>2){
	    	    				jsonlabels+=','+tbody;
	    	    			}else{
	    	    				jsonlabels+=tbody;
	    	    			}
	    	        }  
	    	    }
	    	 jsonlabels+=']';
	    	//参加活动的商品集合
	    	if(joinGoods.length>0){
	    		goodsJsonStr='[';
	    	    	//获取tbody的tr
	    	    	var trArr = $("#goods_list2 tbody tr");
	    	    	for(var index in joinGoods){
	    	    		//商品id
	    	        	var commodity_id = joinGoods[index];
	    	        	var tbody='{';
	    	    			tbody+='"id":"'+"";                      //主键
	    	    			tbody+='","commodity_id":"'+commodity_id;
	    	    			tbody+='","full_reduce_id":"'+"";  
	    	    			tbody+='"}'; 
	    	    			if(goodsJsonStr.length>2){
	    	    				goodsJsonStr+=','+tbody;
	    	    			}else{
	    	    				goodsJsonStr+=tbody;
	    	    			}
	    	        }  
	    	    goodsJsonStr+=']';
	    	}
	    	//保存
			$.ajax({
	    		url:getRootPath()+'/fullReduce/editFullReduce.action',
	    		type:'post',
	    		dataType:'text',
	    		async:false,
	    		//traditional:true,
	    		data:{
	    			"infoJsonStr":addJsonStr,
	    			"goodsJsonStr":goodsJsonStr,
	    			"labelJsonStr":jsonlabels
	    		},
	    		success:function(result){
	    			if(result=="success"){
	     				parent.layer.msg('保存成功', {
	 					  icon: 1,
	 					  time: 1000 //1秒关闭（如果不配置，默认是3秒）
	 					}, function(){
	 						location.href = getRootPath()+"/pages/marketing/fullReduce/fullReduceList.jsp";
	 					});
	     			}else{
	     				parent.layer.alert("保存失败");
	     			}
	    		}
	    	});
		}
	})
	
	//优惠门槛失去焦点时验证
	$("input[name='full_reduce_money']").blur(function(){
		var inputval=$(this).val();
		var reg=/^[0-9]+(.[0-9]{2})?$/;//数字，且小数点后两位的正则
		if(inputval==""){  //为空
			$(this).siblings("p.help-block.error-message").text("满减金额不能为空").show();
		}else if(reg.test(inputval)===false){  //数字且只能精确到小数点后两位
			$(this).siblings("p.help-block.error-message").text("满减金额必须是数字,满减金额支持保留两位小数").show();
		}else{
			$(this).siblings("p.help-block.error-message").hide();
		}
	})

	/**优惠方式选择**/
	//点击减现金单选框
	$("input[name='cash_or_discount'][value='0']").click(function(){
		$("input[name='cash_or_discount'][value='1']").siblings("span.replace-status").addClass("hide");//隐藏填写折扣的span
		$("input[name='cash_or_discount'][value='1']").siblings("span.origin-status").show()//显示打折默认的span
		$("input[name='discount_value']").val("");//清空折扣文本框的值
		$("p.help-block.error-message").hide()//隐藏错误信息提示
		$(this).siblings("span.origin-status").attr("style","display:none");//隐藏减现金默认的span
		$(this).siblings("span.replace-status.hide").removeClass("hide");//显示填写减现金的span
	})

	//点击打折单选框
	$("input[name='cash_or_discount'][value='1']").click(function(){
		 $("input[name='cash_or_discount'][value='0']").siblings("span.replace-status").addClass("hide");//隐藏填写减现金的span
		 $("input[name='cash_or_discount'][value='0']").siblings("span.origin-status").show()//显示减现金默认的span
		 $("input[name='minus_cash']").val("");//清空减现金文本框的值
		 $("p.help-block.error-message").hide()//隐藏错误信息提示
		 $(this).siblings("span.origin-status").attr("style","display:none");//隐藏打折默认的span
		 $(this).siblings("span.replace-status.hide").removeClass("hide");//显示填写折扣的span
	})

	//点击无
	$("input[name='cash_or_discount'][value='2']").click(function(){
		 $("input[name='cash_or_discount'][value='0']").siblings("span.replace-status").addClass("hide");//隐藏填写减现金的span
		 $("input[name='cash_or_discount'][value='0']").siblings("span.origin-status").show()//显示减现金默认的span
		 $("input[name='minus_cash']").val("");//清空减现金文本框的值
		 $("input[name='cash_or_discount'][value='1']").siblings("span.replace-status").addClass("hide");//隐藏填写折扣的span
		 $("input[name='cash_or_discount'][value='1']").siblings("span.origin-status").show()//显示打折默认的span
		 $("input[name='discount_value']").val("");//清空折扣文本框的值
		 $("p.help-block.error-message").hide()//隐藏错误信息提示
	})

	//点击是否主推单选框的是
	$("input[name='is_featured'][value='1']").click(function(){
		 $("#full_reduce_sort").show();//显示排序
	})
	//点击是否主推单选框的否
	$("input[name='is_featured'][value='0']").click(function(){
		 $("input[name='sort']").val("");//清空排序文本框的值
		 $("#full_reduce_sort").hide();//隐藏排序
	})
	
	//减现金金额校验
	$("input[name='minus_cash']").blur(function(){
		var inputval=$(this).val();
		var reg=/^[0-9]+(.[0-9]{2})?$/;//数字，且小数点后两位的正则
		if(inputval==""){//为空
			$(this).parent().siblings("p.help-block.error-message").text("优惠金额不能为空").show();
		}else if(reg.test(inputval)===false){//数字且只能精确到小数点后两位
			$(this).parent().siblings("p.help-block.error-message").text("优惠金额必须是数字,优惠金额支持保留两位小数").show();
		}else{
			$(this).parent().siblings("p.help-block.error-message").hide();
		}
	})

	//打折折扣校验
	$("input[name='discount_value']").blur(function(){
		var inputval=$(this).val();
		//验证折扣的正则，只能输入1-9的正整数或1位小数
		var p1 = /^[1-9]{1}\.([0-9]{1})$/;
		var p2 = /^[1-9]{1}$/;
		if(inputval==""){
			$(this).parent().siblings("p.help-block.error-message").text("折扣不能为空").show();
		}else if(!p1.test(inputval)&&!p2.test(inputval)){
			$(this).parent().siblings("p.help-block.error-message").text("折扣必须在0.1~9.9折之间，最多1位小数").show();
		}else{
			$(this).parent().siblings("p.help-block.error-message").hide();
		}
	})


		//点击取消
		$("#cancel").click(function(){
			location.href = "fullReduceList.jsp";
		});
		//隐藏标题未填写提示
		$("input[name='full_reduce_name']").focus(function(){
			$(this).siblings().hide();
		})
		//时间改变，隐藏错误提示
		$("input[name='full_reduce_active_stime']").change(function(){
			$("span#check_full_reduce_active_time").hide();
		})
		//时间改变，隐藏错误提示
		$("input[name='full_reduce_active_etime']").change(function(){
			$("span#check_full_reduce_active_time").hide();
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
			//group = "";//去掉商品分组查询
			var text = '{"goodsGroup":"'+group+'","goodsType":"'+goodsType+'","conditions_name":"'+conditions_name+'","activity_id":"'+activity_id+'"}';
			searchPage(text);
		});
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
	})
}


/*function opera_labelList(list){
	*//**功能标签select回显**//*
	 $.each(list,function(i,n){
		 $("#gongneng_label option[value='"+n.label_id+"']").attr("selected", "selected");
	 })
	 console.log("初始化dwdwdwdw");
	 //这样可以解决同一select不断动态加载的问题。
	 $("#gongneng_label").trigger("liszt:updated");
	 //重新调用chosen插件方法
	 $("#gongneng_label").chosen();
}*/

/**
 * 初始化微页面下拉列表（背景图选择的链接）
 */
/*
function initWeiPageList(){
		$.ajax({
	        url : getRootPath()+"/webstore/pageinfo/queryWeiPageList.action",
	        type : "post",
	        dataType:"json",
	        success : function (glist) {
	        	if(glist!=null){
	  	             for(var i=0;i<glist.length;i++){
	  	            	 var gindex=glist[i];
	  	            	 var micro_url = gindex.micro_url;
	  	            	 var micro_name = gindex.micro_name;
	  	            	 $("select[name='background_image_weipage_url']").append("<option value='"+micro_url+"'>"+micro_name+"</option>"); 
	  	             }
	        	}
	        	//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("select[name='background_image_weipage_url']").chosen();
	        }
	    })
}*/



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
					    	}else if(full.marketing_activity_type==20){ //已参加限时折扣活动
					    		str = "已参加限时折扣活动";
					    	}else if(full.marketing_activity_type==30){  //已参加其他满减送活动
					    		str = "已参加其他满减送活动";
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
                     "fnInfoCallback": function (oSettings, iStart, iEnd, iMax, iTotal) {
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
		$("#batchJoinCheckbox").prop("checked",false);
		var form = layui.form();
		var layer = layui.layer;
		var element = layui.element();
		var table = $('#goods_list').DataTable();
		var currPage = table.page()+1;
		$('#currPage').text(currPage);
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
	var type = getUrlParam("type");//type=2编辑
	var key = new Array();//定义商品id数组
	//判断是修改还是添加,type=2代表修改
	if(type=='2'){
		$.ajax({
			url:getRootPath()+'/fullReduce/queryFullReduce.action',
			type:'post',
			dataType:'json',
			data:{
				"id":id
			},
			success:function(data){
				var fullReduce = data.fullReduce;
				//活动名称
				$("input[name='full_reduce_name']").val(fullReduce.full_reduce_name);
				/**是否主推选中**/
				$("input[name='is_featured'][value='"+fullReduce.is_featured+"']").attr("checked",true);
				if(fullReduce.is_featured==1){//是主推
					 $("input[name='sort']").val(fullReduce.sort);
					 $("#full_reduce_sort").show();
				}else{//不是
					$("#full_reduce_sort").hide();
				}
				//生效开始时间
				$("input[name='full_reduce_active_stime']").val(fullReduce.full_reduce_active_stime);
				//生效结束时间
				$("input[name='full_reduce_active_etime']").val(fullReduce.full_reduce_active_etime);
				//优惠门槛
				$("input[name='full_reduce_money']").val(fullReduce.full_reduce_money);
				/**优惠方式选中并进行判断显示**/
				$("input[name='cash_or_discount'][value='"+fullReduce.cash_or_discount+"']").attr("checked",true);
				if(fullReduce.cash_or_discount==0){//减现金
					$("input[name='cash_or_discount'][value='0']").siblings("span.origin-status").attr("style","display:none");//隐藏减现金默认的span
					$("input[name='cash_or_discount'][value='0']").siblings("span.replace-status.hide").removeClass("hide");//显示填写减现金的span
				}
				if(fullReduce.cash_or_discount==1){//打折
					$("input[name='cash_or_discount'][value='1']").siblings("span.origin-status").attr("style","display:none");//隐藏打折默认的span
					$("input[name='cash_or_discount'][value='1']").siblings("span.replace-status.hide").removeClass("hide");//显示填写折扣的span
				}
				//减多少现金
				$("input[name='minus_cash']").val(fullReduce.minus_cash);
				//打多少折
				$("input[name='discount_value']").val(fullReduce.discount_value);
				if(fullReduce.is_free_postage==0){//免邮
					$("input[name='is_free_postage']").attr("checked",true);
				}else if(fullReduce.is_free_postage==1){//不免邮
					$("input[name='is_free_postage']").attr("checked",false);
				}
				
				/**活动标签图片展示**/
				//活动标签隐藏域赋值
				$("input[name='activity_label']").val(fullReduce.activity_label);
				 //第一个li显示
				 $(".module-goods-list li").eq(0).css("display","block");
				 //添加上标签图片
				 $(".module-goods-list li").eq(0).find(".goods-thumb").css("background-image","url("+fullReduce.activity_label+")");
				 //第2个li隐藏
				 $(".module-goods-list li").eq(1).css("display","none");
				
				 /**活动背景图展示**/
				 //活动背景图隐藏域赋值
				 $("input[name='background_image_url']").val(fullReduce.background_image_url);
				 //第一个li显示
				 $(".module-goods-list").eq(1).find("li").eq(0).css("display","block");
				 //添加上标签图片
				 $(".module-goods-list").eq(1).find("li").eq(0).find(".goods-thumb").css("background-image","url("+fullReduce.background_image_url+")");
				 //第2个li隐藏
				 $(".module-goods-list").eq(1).find("li").eq(1).css("display","none");
				//商品id数组
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
							+ '<td style="text-align:center;">'+item.store_count+'</td>'
							+ '<td style="text-align:center;">'
							+'<a style="cursor:pointer;background:red;" class="layui-btn layui-btn-normal layui-btn-small" onclick="cancelJoin(\''+item.commodity_id+'\')">取消参加</a></td></tr>';
							$("#goods_list2 tbody").append(text);
							joinGoods.push(item.commodity_id);
							$.each(key,function(inx,itm){
								//本次活动上次编辑时选择参加的商品，显示取消参加
								if(item.commodity_id==itm){
									$('#button'+itm).css('background','red').text('取消参加');
								}
							});
					});
				}
				//初始化功能标签
				//opera_labelList(data.labelList);
				form.render('checkbox'); //一定要渲染，不然初始化时checkbox不显示
				//console.log("初始化"+joinGoods);
			}
		});
	}
	form.render();
});



//根据商品id查询商品信息
function commonMethod(item){
	console.log(item)
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
					+ '<td style="text-align:center;">'+data.store_count+'</td>'
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
				+ '<td style="text-align:center;">'+stock+'</td>'
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

/**
 * 调用共用图片选择弹出框（选择一张图片作为背景图，单选）
 */
function add_background_image(){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun=show_background_image&mutl_type=1'   //type=1 单选; 2多选
		});
}

//展示选择的背景图
function show_background_image(url){
	 //第一个li显示
	 $(".module-goods-list").eq(1).find("li").eq(0).css("display","block");
	 //添加上图片
	 $(".module-goods-list").eq(1).find("li").eq(0).find(".goods-thumb").css("background-image","url("+url+")");
	 //给背景图隐藏域赋值
	 $("input[name='background_image_url']").val(url);
	 //第2个li隐藏
	 $(".module-goods-list").eq(1).find("li").eq(1).css("display","none");
}

//删除选择的背景图
function delete_background_image(){
	 //第一个li隐藏
	 $(".module-goods-list").eq(1).find("li").eq(0).css("display","none");
	 //清空隐藏域的值
	 $("input[name='background_image_url']").val("");
	 //第二个li显示
	 $(".module-goods-list").eq(1).find("li").eq(1).css("display","block");
}



