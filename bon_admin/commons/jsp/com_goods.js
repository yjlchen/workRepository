/**
 * 只选择商品的弹窗js，微页面goods.js调用
 */
var now_g_id;     //当前选中的分组id
var phoArr = [];    //商品图片url
var priceArr = [];  //商品价格
var nameArr = [];   //商品名称

var idArr = []; //商品id数组

var mutl_type;    //type=1 图片单选; 2 图片多选
$(function(){  
	 initTab();
	 initLabel();//初始化标签列表
});
layui.use(['form','layer'], function(){ 
	  var form = layui.form()
	  ,layer = layui.layer;
	 
	  
})

/**
 * 初始数据
 */
function initLabel(){
	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/customerlabel/queryLabels.action',
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(result){
			$("#label_id").append("<option value= ''>请选择标签</option>");
			 if(result){
				 var data=result.data;
				 for(var i=0;i<data.length;i++){
  	            	 var gindex=data[i];
  	            	 var id=gindex.id;
  	            	 var name=gindex.name;
  	            	 $("#label_id").append("<option value='"+id+"'>"+name+"</option>"); 
  	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#label_id").chosen();
	        	$(".chzn-search>input").css("width","141px");
	        	$(".chzn-drop").css("width","150px");
			 }
		}
	});
}

//搜索数据
/**
 * @param ifdellPho ok 或者为空时 清空图片数组  
 * （点击分页中的按钮时  该参数 传值为 no    不清空图片数组，记录其它页面选择的图片）
 */
function search(isSearch){
	if(isSearch=="search"){
		currentPage = 1;
	}
	var file_name = $("#file_name").val();//商品名称
	var label_id = $("#label_id").val();//标签id
	//获得营销参数
	var marketing = getUrlParam("marketing");
	var length=10;
	//ajax请求url
	var url;
	if(marketing=="groupon"){//拼团
		url = getRootPath()+"/groupon/querySellingCommodityPageList.action";
	}else if(marketing=="coupon"){//优惠券
		url = getRootPath()+"/coupon/queryCouponCommodityPageList.action";
	}
	else{
		url = getRootPath()+"/commodity/querySellingCommodityPageList.action";
	}
	$.ajax({
        url : url,
        type : "post",
        dataType:"json",
        data:{"commodity_name":file_name,"label_id":label_id,"currentPage":currentPage,"length":length},
        success : function (gdata) {
        	if(gdata!=null){
        		 var glist=gdata.data;
        		 up_pho(glist);
                 up_page(gdata);
        	}
        }
    })
}



//更新图片集合
function up_pho(glist){
	 $("#p_div").html("");
	 $.each(glist,function(i,n){
		 //商品id
		 var id = n.id;
		 var url;
		 if(n.img_path_str.indexOf(",")<0){
			 url = n.img_path_str;
		 }else{
			//图片url,取第一个，之前的值
			 url = n.img_path_str.substr(0,n.img_path_str.indexOf(","));
		 }
		 //商品名称
		 var name = n.commodity_name;
		 var price = n.price;
		 var selClass="";
		 if(judg_phoUrl(url)){selClass="start";}
		 var str=" 	<div class='identical "+selClass+"' style='position:relative'> ";
		     str+="		<div>";
		     str+="	  		<img style='max-width:100%' src='"+url+"'>"
		     str+="   		<span>￥"+price+"</span>";
		     str+="  	</div>";
		     str+="  	<span>"+showColumnValue(name,12)+"</span>";
		     str+="		<input type='hidden' name='commodity_name' value='"+name+"'>";
		     str+="		<input type='hidden' name='price' value="+price+">";
		     str+="		<input type='hidden' name='id' value="+id+">";
		     str+="		<div class='attachment-selected' style='display:none'>";
             str+="			<i class='icon-ok icon-white'></i>";
             str+="			<span class='border'></span>";
             str+="		</div>";
		     str+="</div>";
		     $("#p_div").append(str);
	 })
}




//初始化左边选项卡、右边图片选择的样式
function initTab(){
	mutl_type=getUrlParam("mutl_type");       //type=1 图片单选; 2 图片多选
	if(mutl_type==null ||mutl_type==""){mutl_type=1;}
	var d=$(".right>div");
	search();
    $(".right>div").on("click","div.identical",function(){
    	  //图片单选或多选
    	  if(mutl_type==1){
    		  $(this).siblings().find(".attachment-selected").removeClass("start");
    	  }
    	//图片url
        var back = $(this).find("img").attr("src");
        //价格
        var price = $(this).find("input[name='price']").val();
        //商品名称
        var goodName = $(this).find("input[name='commodity_name']").val();
        //商品id
        var goodId = $(this).find("input[name='id']").val();
        if($(this).find(".attachment-selected").hasClass("start")){
        	  $(this).find(".attachment-selected").removeClass("start");
        	  oper_phoArr("del",back,goodId,goodName);
        }else{
        	 $(this).find(".attachment-selected").addClass("start");
        	 oper_phoArr("add",back,goodId,goodName);
        }
    })
}



/**
 * 操作存储图片的数组
 * @param  del_add del 清除数组中的某项值  add  增加值
 * @param  backurl  对应的图片url
 */
function oper_phoArr(del_add,backurl,goodId,goodName){
	if(del_add=="del"){
		for(var i=0;i<phoArr.length;i++){
			if(phoArr[i]==backurl){
				phoArr.splice(i,1);
				break;
			}
		}
		for(var i=0;i<idArr.length;i++){
			if(idArr[i]==goodId){
				idArr.splice(i,1);
				break;
			}
		}
		for(var i=0;i<nameArr.length;i++){
			if(nameArr[i]==goodName){
				nameArr.splice(i,1);
				break;
			}
		}
	}else{
		 if(mutl_type==1){ //单选
			 phoArr=[];
			 idArr=[];
			 nameArr=[];
   	    }
		phoArr.push(backurl);
		idArr.push(goodId);
		nameArr.push(goodName);
	}
	if(phoArr.length==0){
		$("#p_num").text("");
		$("#to_sure").addClass("layui-btn-primary").attr("disabled",true);
	}else{
		$("#p_num").text("已选择"+phoArr.length+"张图片");
		 $("#to_sure").removeClass("layui-btn-primary").attr("disabled",false);
	}
}




//判断图片数组中是否存在此图片
function judg_phoUrl(backurl){
		for(var i=0;i<phoArr.length;i++){
			if(phoArr[i]==backurl){
				return true;
			}
		}
		return false;
}


//点击确定按钮
function to_return(obj){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	if(phoArr.length>0){
		$(obj).attr("disabled", true);
		//获得营销参数
		var marketing = getUrlParam("marketing");
		//获取父页面
		var parentPage = parent.document.getElementById(data_pjax).contentWindow;
		//优惠券选择商品
		if(marketing=="coupon"){
			parentPage.get_goods_coupon(idArr);
			parent.layer.closeAll();
		}
		//拼团选择商品
		else if(marketing=="groupon"){
			parentPage.get_good_groupon(idArr);
			parent.layer.closeAll();
		}
		//虚拟评论选择商品
		else if(marketing=="virtualEvaluate"){
			parentPage.setImg(idArr,phoArr,nameArr);
			parent.layer.closeAll();
		}
		//信息流选择商品
		else if(marketing=="informationFlow"){
			parentPage.renderCommSpe(idArr,phoArr);
			parent.layer.closeAll();
		}
		else{
			//获得索引值
			var ind = getUrlParam("ind");
			//获得选中的列表样式的值
			var size = getUrlParam("size");
			//调用父页面的获得商品图片的方法
			//eval('window.parent.query_goods(idArr,size,ind)'); 
			parentPage.query_goods(idArr,size,ind)
			parent.layer.closeAll();
		}
		
	}else{
		layer.alert("请选择商品!");
	}
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
	 
	 search("no");
}



function initPage(){
	if(currentPage == 1){
		 $("#li_first").addClass('disabled');
		 $("#li_pre").addClass('disabled');
		 $("#li_first > a").removeAttr('onclick');
		 $("#li_pre > a").removeAttr('onclick');
	 }else if(currentPage == totalPage){
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
