 /**
 * 我的消息js 孙荆阁
 */
var start=0;//分页起始值
var length = 10;//分页数据
var noDataFlag = 0;//判断是否再次请求分页
var countSysMsg = 0;//系统消息个数
var countCommentMe = 0;//评论我的个数
var countNotify = 0;//通知个数

$(function(){
	//查询数据统计
	queryCount();
	//查询系统消息
	initSysMsg();
	
	//切换选项卡请求
	$(".viewport").on("click",".menu>div",function(){
        var id=$(this).data("id");
        $(".moduleList ."+id).siblings().hide()
        $(".moduleList ."+id).show()
        $(this).addClass("active").siblings().removeClass("active");
        //切换后清空其他tab的内容
        start = 0;
        length = 10;
        noDataFlag = 0;
        $('#commentMy').empty();
        $('#comment').empty();
        $('#inform').empty();
        //根据id进行切换选项卡
        if (id=='inform'){
        	initInform();
        }
        if (id=='comment'){
        	initComment();
        }
        if (id=='commentMy'){
        	initCommentMy();
        }
        if (id=='system'){
        	initSysMsg();
        }
	})
	
	//点击查看更多的分页
	$('.more').click(function(){
		if (noDataFlag == 0){
			start = start + length;
			initInform();
		}
	});
	$('.moreComment').click(function(){
		if (noDataFlag == 0){
			start = start + length;
			initComment();
		}
	});
	$('.morecommentMy').click(function(){
		if (noDataFlag == 0){
			start = start + length;
			initCommentMy();
		}
	});
	$('.moreMess').click(function(){
		if (noDataFlag == 0){
			start = start + length;
			initSysMsg();
		}
	});
});


//请求结束后，判断有没有未读的个数，调用更新
function updateCount(type){
	debugger
	//系统通知
	if (type == 1){
		if (countSysMsg != 0){
			//执行更新
			updateCountAjax(1);
		}
	}
	//@评论我
	if (type == 2){
		if (countCommentMe != 0){
			//执行更新
			updateCountAjax(2);
		}
	}
	//通知
	if (type == 3){
		if (countNotify != 0){
			//执行更新
			updateCountAjax(3);
		}
	}
}

//调用更新未读消息的接口
function updateCountAjax(upFlag){
	$.ajax({
		url : getRootPath()+ '/mynews/updateMynewsUnread.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {upFlag:upFlag},
		success : function(result){
			if (result == 'success'){
				if (upFlag == 1){
					countSysMsg = 0;
					$('#system_count').html('');
					$('#system_count').removeClass('num');
				}
				if (upFlag == 2){
					countCommentMe = 0;
					$('#commentMy_count').html('');
					$('#commentMy_count').removeClass('num');
				}
				if (upFlag == 3){
					countNotify = 0;
					$('#inform_count').html('');
					$('#inform_count').removeClass('num');
				}
			}
			if (result == 'fail'){
				parent.layer.alert("查询失败");
			}
		},
		error:function(){
			parent.layer.alert("查询失败");
		}
	});
}

//初始化@我的评论
function initCommentMy(){
	$.ajax({
		url : getRootPath()+ '/mynews/queryMynewsCommentMe.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {start:start,length:length},
		success : function(result){
			var res = JSON.parse(result);
			if (res.data.length<10){
				$('.morecommentMy').html("暂无跟多数据");
				noDataFlag = 1;
			}
			$("#commentMy").empty();
			for(var i=0;i<res.data.length;i++){
				var str = initHtmlCommentMy(res.data[i]);
				$("#commentMy").append(str)
			}
			updateCount(2);
		},
		error:function(){
			parent.layer.alert("查询失败");
			
		}
	});
}
//初始化系统消息
function initSysMsg(){
		$.ajax({
			url : getRootPath()+ '/mynews/queryMynewsSysMsg.action',
			type : 'POST',
			dataType : 'TEXT',
			data : {start:start,length:length},
			success : function(result){
				var res = JSON.parse(result);
				if (res.data.length<10){
					$('.moreMess').html("暂无跟多数据");
					noDataFlag = 1;
				}
				$("#sysMsg").empty();
				for(var i=0;i<res.data.length;i++){
					var str = initHtmlSysMsg(res.data[i],res.customer);
					$("#sysMsg").append(str)
				}
				
				updateCount(1);
			},
			error:function(){
				parent.layer.alert("查询失败");
				
			}
		});
}

//初始化我的评论
function initComment(){
		$.ajax({
			url : getRootPath()+ '/mynews/queryMynewsMyComment.action',
			type : 'POST',
			dataType : 'TEXT',
			data : {start:start,length:length},
			success : function(result){
				var res = JSON.parse(result);
				if (res.data.length<10){
					$('.moreComment').html("暂无跟多数据");
					noDataFlag = 1;
				}
				$("#comment").empty();
				for(var i=0;i<res.data.length;i++){
					var str = initHtmlComment(res.data[i]);
					$("#comment").append(str)
				}
			},
			error:function(){
				parent.layer.alert("查询失败");
				
			}
		});
}

//初始化通知
function initInform(){
	$.ajax({
		url : getRootPath()+ '/mynews/queryMynewsNotify.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {start:start,length:length},
		success : function(result){
			var res = JSON.parse(result);
			if (res.data.length<10){
				$('.more').html("暂无跟多数据");
				noDataFlag = 1;
			}
			$("#inform").empty();
			for(var i=0;i<res.data.length;i++){
				var str = initHtmlNotify(res.data[i]);
				$("#inform").append(str)
			}
			updateCount(3);
		},
		error:function(){
			parent.layer.alert("查询失败");
		}
	});
}
//统计三个选项卡的未读消息
function queryCount(){
	$.ajax({
		url : getRootPath()+ '/mynews/queryMynewsCountUnread.action',
		type : 'POST',
		dataType : 'TEXT',
		async:false,
		success : function(result){
			var res = JSON.parse(result);
			countSysMsg = res.unreadSysMsg.sysMsgCount;
			countCommentMe = res.unreadSysMsg.commentMeCount;
			countNotify = res.unreadSysMsg.notifyCount;
			if (countNotify != 0){
				$('#inform_count').html(countNotify);
				$('#inform_count').addClass('num');
			}
			if (countSysMsg != 0){
				$('#system_count').html(countSysMsg);
				$('#system_count').addClass('num');
			}
			if (countCommentMe != 0){
				$('#commentMy_count').html(countCommentMe);
				$('#commentMy_count').addClass('num');
			}
		},
		error:function(){
			parent.layer.alert("查询失败");
		}
	});
}

function initHtmlNotify(notify){
	
	//获取头像
	var action_name_img = notify.action_name_img;
	//时间
	var action_time = notify.action_time !=''? notify.action_time.substring(0,10) : '';
	//微信名
	var action_name = notify.action_name;
	//状态
	var action_status = notify.action_type +"了这个" + notify.action_style
	//来源
	var action_origin = "我的" + notify.action_style;
	var htmlStr = "";
	//判断关注
	if (notify.action_type=='关注'){
		htmlStr	=	'<div class="left img"><img src="'+action_name_img+'"/></div>'
	    +		'<div class="left contents">'
	    +		'<div class="title">'+action_name+' <span class="time right">'+action_time+'</span></div>'
	    +		'<div class="content">关注了我</div>'
	    +       '<div class="restMes"><span></span></div>'
	    +	'</div>'
	}else{
		htmlStr	=	'<div class="left img"><img src="'+action_name_img+'"/></div>'
	    +		'<div class="left contents">'
	    +		'<div class="title">'+action_name+' <span class="time right">'+action_time+'</span></div>'
	    +		'<div class="content">'+action_status+'</div>'
	    +		'<div class="restMes"><span>'+action_origin+': </span>'+notify.action_content+'</div>'
	    +	'</div>'
	}
	
   return htmlStr;
}

function initHtmlComment(comment){
	
	//获取头像
	var action_name_img = comment.head_img_url;
	//微信名
	var action_name = comment.wx_name;
	//时间
	var action_time = comment.evaluate_time !=''? comment.evaluate_time.substring(0,10) : '';
	
	//第二种情况别人评论
	//来源
	var action_origin = "评论" + comment.type +":" + comment.title;
	var htmlStr = '';
	if (comment.answer_member_id != null && comment.answer_member_id.lenght>0){
		htmlStr = '<div class="left img"><img src="'+action_name_img+'"/></div>'
	      		+ '<div class="left contents">'
	      		+   	'<div class="title">'+action_name+'<span class="time right">'+action_time+'</span></div>'
	      		+   	'<div class="content" >'+comment.evaluate_content+' //<span class="people">@ '+comment.answer_member_name+' ：</span>'+comment.answer_experience_evaluate_content+'}</div>'
	      		+   	'<div class="restMes"><span>评论'+comment.type+': </span>'+comment.title+'</div>'
	      		+ '</div>'
	}else{
		htmlStr = '<div class="left img"><img src="'+action_name_img+'"/></div>'
		+'<div class="left contents">'
		+   '<div class="title">'+action_name+'<span class="time right">'+action_time+'</span></div>'
		+  '<div class="content">'+comment.evaluate_content+'</div>'
		+   '<div class="restMes"><span>评论'+comment.type+': </span>'+comment.title+'</div>'
		+ '</div>'
	}
      
	return htmlStr;
}

function initHtmlCommentMy(comment){
	
	
	var htmlStr	= '';
	
	if (comment.action_answer_name != null && comment.action_answer_name != ''){
		
		htmlStr	 ='<div class="left img"><img src="'+comment.action_name_head+'"/></div>'
		   + '<div class="left contents">'
		   +     '<div class="title">'+comment.action_name+' <span class="time right">'+comment.action_time.substring(0,10)+'</span></div>'
		   +     '<div class="content">'
		   +        '<span>@</span>'
		   +        '<span class="people">我：</span>'+comment.action_content
		   +     '</div>'
		   +     '<div class="restMes">'
		   +         '我的评论<span>:'+comment.action_answer_content+'</span>'
		   +     '</div>'
		   +'</div>'
	}else{
		htmlStr	 ='<div class="left img"><img src="'+comment.action_name_head+'"/></div>'
		   + '<div class="left contents">'
		   +     '<div class="title">'+comment.action_name+' <span class="time right">'+comment.action_time.substring(0,10)+'</span></div>'
		   +     '<div class="content">'
		   +        '<span>评论</span>'
		   +        '<span class="people">我：</span>'+comment.action_content
		   +     '</div>'
		   +     '<div class="restMes">'
		   +         '我的'+comment.action_type+'<span>:'+comment.action_title+'</span>'
		   +     '</div>'
		   +'</div>'
	}
	
	
	return htmlStr;
}

function initHtmlSysMsg(sysMsg){
	
	var str = '';
	if (sysMsg.action_id != null && sysMsg.action_id != ''){
		str	=	'<div class="title">'+sysMsg.notify_office+'<span class="time right">'+sysMsg.add_time.substring(0,10)+'</span></div>'
		+	'<div class="content">'+sysMsg.content+'</div>'
		+	'<div class="restMes"></div>'
	}else{
		str	='<div class="title">'+sysMsg.notify_office+'<span class="time right">'+sysMsg.add_time.substring(0,10)+'</span></div>'
		+	'<div class="content">'+sysMsg.content+'</div>'
		+	'<div class="restMes"><span>我的'+sysMsg.msg_type+': </span>'+sysMsg.title+'</div>'
	}
	
	return str;
}


