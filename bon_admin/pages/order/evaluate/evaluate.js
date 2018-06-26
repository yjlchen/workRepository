var phoArr=[]; //用于记录回复选择的图片
var state=0;
layui.use(['form','element','layer'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	 ,laydate = layui.laydate
	  ,layer = layui.layer;
	  fun_element(element);
})
$(function(){
	searchPage();
})

/**
 * 删除评论
 * @param t  对象本身
 */
function deleteEvaluate(t){
	parent.layer.confirm('您确定要删除么？', {icon: 3, title:'提示'}, function(index){
		var id=t.parents('tr').attr('data-id');
		var thisTr=t.parents('tr');
		$.ajax({
			 type: 'post',
			 url: getRootPath()+"/order/deleteEvaluate.action",
			 async:false,
			 data: {id:id},
			 dataType: 'text',
			 success: function(data){
				 if("success"==data){
					 thisTr.remove();
					 parent.layer.msg('删除成功', {
						  icon: 1,
						  time: 1000 //（如果不配置，默认是3秒）
					});
				 }else{
					 parent.layer.msg('系统错误，请刷新后重试', {
						  icon: 2,
						  time: 1500 //（如果不配置，默认是3秒）
					});
				 }
			 }
		})
	})
}


/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	element.on('tab(evaluateTab)', function(data){
		state = data.index ; // index:0 所有;  1 好评; 2中评; 3差评;
		searchPage();	
	});
}


function searchPage(pageinfo){
	if(!isNotEmpty(pageinfo)){
		currentPage=1;
	}
	var length=20;
    $.ajax( {
    	"type":"post",
        "url": getRootPath()+"/order/queryEvaluate.action",
        async: false,//同步
        "dataType":"json",
        'data' : {"evaluate_rank":state,"currentPage":currentPage,"length":length},
        'success' : function (data) {
        	initTable(data.datas);
        	up_page(data);
        },
        'error':function(){
        	errorfun();
        }
    });
    //点击列表中的回复
    $('.js-toggle-reply-dialog').click(function(){
		var html1='<tr><td colspan="5"><div class="reply-dialog">'+
	                '<textarea maxlength="1024" rows="4" class="reply_comment" placeholder="回复内容" name="reply_comment"></textarea>'+
					'<div class="actions"><button class="ui-btn ui-btn-primary js-reply">回复</button></div>'+
	                /*'<div class="images js-reply-images" id="img_div">'+
					'<div class="image"><span class="add-image js-add-image" onclick="addEvaluatePho()">+</span></div></div>'+*/
	                '</div></td></tr>';
        if(!$(this).attr('data')){
        	$(this).parents('.widget-list-item').append(html1);
			$(this).attr('data','true');
			$(this).parents('.widget-list-item').siblings().find('.js-toggle-reply-dialog').removeAttr('data');
			$(this).parents('.widget-list-item').siblings().find('.reply-dialog').parents('tr').remove();
			//点击回复按钮
			$('.js-reply').click(function(){
				var reply_comment = $('.reply_comment').val();
				reply_comment=toTrim(reply_comment);
				if(isNotEmpty(reply_comment)){
					var response_img_url_str="";
					/*
					for(i=0;i<$(this).parent().next().find('.image').length-1;i++){
						response_img_url_str+=$(this).parent().next().find('.image').eq(i).find('img').attr('src');
						if(i<$(this).parent().next().find('.image').length-2){
							response_img_url_str+=",";
						}
					}*/
					var id=$(this).parents('tr').prev('tr').attr('data-id');
					//console.log(reply_comment+"  "+response_img_url_str+"  "+id);
					var str="";
					$.ajax({
						type: 'post',
						url: getRootPath()+"/order/responseEvaluate.action",
						async:false,
						data: {id:id,response_img_url_str:response_img_url_str,response_content:reply_comment},
						dataType: 'text',
						success: function(data){
							str+='<div class="seller-comment"><p><strong>回复：</strong></p><p class="comment-text">'+reply_comment+'</p><p></p>';
							/*
							var strs= new Array(); //定义一数组 
							strs=response_img_url_str.split(","); //字符分割 
							for (i=0;i<strs.length ;i++ ){
								if(i==0){
									str+='<div class="images js-seller-images">';                       
								}
								str+='<div class="image js-preview" data-index="'+i+'">'+
								'<span class="ui-centered-image">'+
								'<img src="'+strs[i]+'">'+
								'</span>'+
								'</div>';
								if(i==strs.length-1){
									str+='</div>';
								}
							}*/
							str+='</div>';
						},
						error:function(){
							alert("出错了！！请刷新页面重试");
						}
					});
					$(this).parents('tr').prev('tr').find('td').eq(0).append(str);
					$(this).parents('tr').prev('tr').find('td:last').children().remove();
					$(this).parents('tr').prev('tr').find('td:last').append('<span class="c-gray">已回复</span> '+
														'<a href="javascript:;" class="delete" onclick="deleteEvaluate($(this))">删除</a>')
					$(this).parents('tr').remove();
				}else{
					parent.layer.msg('回复内容不能为空', {
						  icon: 2,
						  time: 1500 //（如果不配置，默认是3秒）
					});
				}
			})
        }else{
			$(this).parents('.widget-list-item').find('tr').eq(1).remove();
			$(this).removeAttr('data');
		}		
	})
	
	$(".delete").click(function(){
		deleteEvaluate($(this))
	})
}

function initTable(data){
	var str="";
	$.each(data,function(index,value){
		str+='<tbody class="widget-list-item">'
		str+='	<tr data-id="'+value.id+'">';
		str+='		<td>';
		if(value.evaluate_rank==1){
			str+='<strong>［好评］</strong>';
		}else if(value.evaluate_rank==2){
			str+='<strong>［中评］</strong>';
		}else if(value.evaluate_rank==3){
			str+='<strong>［差评］</strong>';
		}
		str+=value.evaluate_content;
		if(isNotEmpty(value.evaluate_img_url_str)){
			str+='<div class="images js-custom-images">';
			var strs= new Array(); //定义一数组 
			strs = value.evaluate_img_url_str.split(","); //字符分割 
			for (i=0;i<strs.length ;i++ ){ 
				str+='	<div class="image js-preview" data-index="'+i+'">';
				str+='		<span class="ui-centered-image">';
				str+='    		<img src="'+strs[i]+'">';
				str+=' 		</span>';
				str+='	</div>';
			} 
			str+='</div>';
		}
		if(isNotEmpty(value.response_content)){
			str+='<div class="seller-comment"><p><strong>回复：</strong></p>';
			str+='	<p class="comment-text">'+value.response_content+'</p>';
			/*去掉回复上传图片
			if(isNotEmpty(value.response_img_url_str)){
				str+='	<div class="images js-seller-images">';
				var evaluate_img= new Array(); //定义一数组 
				evaluate_img = value.response_img_url_str.split(","); //字符分割 
				for (i=0;i<evaluate_img.length ;i++ ){ 
					str+='		<div class="image js-preview" data-index="1">';
					str+='			<span class="ui-centered-image">';
					str+='           	<img src="'+evaluate_img[i]+'">';
					str+='        </span>';
					str+='		</div>';
				}
				str+='	</div>';
			}*/
			str+='</div>';
		}
		str+='		</td>';
		str+='		<td>';
		str+='			<a href="'+value.commodity_url+'" class="new-window" target="_blank">'+value.commodity_name+'</a>';
		str+='		</td>';
		str+='		<td>';
		str+='			<a href="'+getRootPath()+'/pages/order/orderdetail/orderDetail.jsp?order_num='+value.order_num;
		str+='				target="_blank" class="new-window">'+value.order_num+'</a>';
		str+='		</td>';
		str+='		<td>';
		if(isNotEmpty(value.wx_name)){
			str+='<a href="" class="new-window" target="_blank">'+value.wx_name+'</a>';
		}
		if(isNotEmpty(+value.phone)){
			str+=+value.phone;
		}
		str+='		</td>';
		str+='		<td class="c-gray">'+value.evaluate_time+'</td>';
		str+='		<td class="text-right">';
		if(isNotEmpty(value.response_content)){
			str+='<span class="c-gray">已回复</span>';
		}else{
			str+='			<a href="javascript:;" class="js-toggle-reply-dialog">回复</a>';
		}
		str+='			<a href="javascript:;" class="delete">删除</a>'
		str+='		</td>';
		str+='	</tr>';
		str+='</tbody>'
	})
	$("tbody").remove();
	$("#evaluateTable").append(str);
}

//进行图片多选 弹出公用窗口
function addEvaluatePho(){
	if(phoArr.length>=6){
		alert_mess('最多添加6张图片!');
	}else{
		addevaluatepho("queryPho",2);
	}
	
}
/**
 * 调用共用图片选择弹出框
 * @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
 */
function addevaluatepho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}
//获取图片选择页面传入的图片数组，插入到商品图片
function queryPho(urlArr){
	if(urlArr.length>0){
		for(var i=0;i<urlArr.length;i++){
			var url=urlArr[i];
			insert_pho(url);
		}
	}
}
//插入图片
function insert_pho(url){
	var str="";
	str='<div class="image js-preview" data-index="0" id="'+url+'"_li>'+
	'<a href="javascript:;" class="js-delete-image close-modal" title="删除" onclick=del_pho("'+url+'")>×</a>'+
	'<span class="ui-centered-image">'+
	'<img src="'+url+'">'+
	'</span></div>';
	phoArr.push(url);
	$("#img_div").prepend(str);
}
//删除图片
function del_pho(url){
	var idiv=document.getElementById("img_div");
	var ili=document.getElementById(url+"_li");
	idiv.removeChild(ili);  
	for(var i=0;i<phoArr.length;i++){
		if(phoArr[i]==url){
			phoArr.splice(i,1);
			break;
		}
	}
}

function alert_mess(mess){
	parent.layer.alert(mess, {
		icon : 5
	});
}

/*************以下与分页有关***************/
var start ;
var end ;
var currentPage=1;
var totalPage=1 ;
function selectPage(page){
	 if(page == 'first'){
		 currentPage = 1;
		 
	 }else if(page == 'pre'){
		 if(currentPage > 1){
			 currentPage -= 1;
		 }else{
			 currentPage = 1;
			
		 }
	 }else if(page == 'next'){
		 if(currentPage < totalPage){
			 currentPage += 1;
		 }else{
			 currentPage = totalPage;
			
		 }
	 }else if(page == 'end'){
		 currentPage = totalPage;
		
	 }else{
		 currentPage = page;
	 }
	 
	 searchPage("no");
}
function initPage(){
	if(currentPage == 1){
		 $("#li_first").addClass('disabled');
		 $("#li_pre").addClass('disabled');
		 $("#li_first > a").removeAttr('onclick');
		 $("#li_pre > a").removeAttr('onclick');
	 }
	if(currentPage == totalPage){
		 $("#li_next").addClass('disabled');
		 $("#li_end").addClass('disabled');
		 $("#li_next > a").removeAttr('onclick');
		 $("#li_end > a").removeAttr('onclick');
	 }
}
//更新分页
function up_page(gdata){
	currentPage=gdata.currentPage;  
	totalPage=gdata.totalPage;
	var dataCount=gdata.dataCount;
	var start=parseInt(gdata.start);
	var end=parseInt(gdata.end);
	var str="";
	str+="<ul class='pagination ng-isolate-scope ng-valid'>";
	
	str+="<li class='ng-scope' id='li_first'><a href='javascript:;' onclick=selectPage('first') class='ng-binding'>|&lt;</a></li>";
	
	str+="<li	class='ng-scope' id='li_pre'><a href='javascript:;' onclick=selectPage('pre') class='ng-binding'>&lt;&lt;</a></li>";
	for(var i=start;i<=end;i++){
		var lstyle="";
		if(i==currentPage){
			lstyle="style='background-color:LightSkyBlue'";
		}
		str+="<li class='ng-scope'><a href='javascript:;' onclick=selectPage('"+i+"') class='ng-binding' "+lstyle+">"+i+"</a></li>";
	}
    str+="<li class='ng-scope' id='li_next'><a href='javascript:;' onclick=selectPage('next') class='ng-binding'>&gt;&gt;</a></li>";
	
	str+="<li class='ng-scope' id='li_end' onclick=selectPage('end')><a href='javascript:;'  class='ng-binding'>&gt;|</a></li>";
	
	str+="<li class='ng-scope' ><a href='javascript:;' style='height:34px' class='ng-binding'> 第"+currentPage+"页 | 共"+totalPage+"页 | "+dataCount+"条记录</a></li>";
	
	str+="</ul>";
	$("#page_index").html(str);
	initPage();
}