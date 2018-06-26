/**
 * 公用图片选择页面js
 * 图片弹出框大小固定
 */
var now_g_id;     //当前选中的分组id
var phoArr=[];    //记录选中的图片
var mutl_type;    //type=1 图片单选; 2 图片多选
$(function(){  
	 $("#picture").uploadPreview({ Img: "logoPic", Width: 80, Height: 80,Callback: function () { 
		 $('#inputDiv').hide();
		 $('#logoPicDiv').show();
		 $('#logoPicDiv').append('<i class="js-delete-picture delete-picture" onclick="deletePic();"></i>');
	 }});
	 $('#inputDiv').show();
	 $('#logoPicDiv').hide();
	
	 initData();
	 initTab();
	 search();
	 
	 /**
	  * 从本地选取图片上传点击确定按钮事件
	  */
	 $("#confirmButton").click(function(){
		 var formData = new FormData();
		 var file = $("#picture")[0].files[0];
		 formData.append("file",file);
		 $.ajax({
			 url:getRootPath()+'/document/savePciture.action',
			 type:'post',
			 dataType:'text',
			 async:false,
			 data: formData,
			 traditional:true,
		     processData: false,
		     contentType: false,
			 success:function(data){
				 data = JSON.parse(data);
				 if(data != null && data != ""){
					var b_fun = getUrlParam("b_fun");
					var liId = getUrlParam("liId");
					var ind = getUrlParam("ind");
					//进行判断
					phoArr.push(data.picInfo.filePath);
					if(undefined==liId&&undefined==ind){
						//2018.5.25修改后的调用父页面的方法
						var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
//						parent.document.getElementById(data_pjax).contentWindow.query_pho(phoArr);
						eval('parent.document.getElementById(data_pjax).contentWindow.'+b_fun+'(phoArr)'); 
					}
					/*
					else if(undefined!=liId){
						//微页面图片导航,橱窗调用
						eval('window.parent.'+b_fun+'(phoArr,liId)'); 
					}else if(undefined!=ind){
						//微页面图片广告,魔方调用
						eval('window.parent.'+b_fun+'(phoArr,ind)'); 
					}*/					
					parent.layer.closeAll();
				}
			 }
		 });
	 });
});
layui.use(['form','layer'], function(){ 
	  var form = layui.form()
	  ,layer = layui.layer;
	 
	  
})

//删除图片
function deletePic(){
	 $('#inputDiv').show();
	 $('#logoPicDiv').hide();
}
function initEvent(form){
	
}
//搜索数据
/**
 * @param ifdellPho ok 或者为空时 清空图片数组  
 * （点击分页中的按钮时  该参数 传值为 no    不清空图片数组，记录其它页面选择的图片）
 * 
 */
function search(ifdellPho){
	if(!isNotEmpty(ifdellPho) || ifdellPho=="ok"){
		phoArr=[];
		$("#p_num").text("");
		$("#to_sure").addClass("layui-btn-primary");
		currentPage=1;
	}
	var file_name=$("#file_name").val();
	var length=10; 
	$.ajax({
        url : getRootPath()+"/commodity/queryPhoPageList.action",
        type : "post",
        "dataType":"json",
        data:{"file_name":file_name,"group_id":now_g_id,"currentPage":currentPage,"length":length},
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
		 var url=n.file_url;
		 var name=n.real_name;
		 var selClass="";
		 if(judg_phoUrl(url)){selClass="start";}
		 var str="	<div class='identical "+selClass+"' style='position: relative;'> ";
		     str+=" 	<div>";
		     str+="   		<img src='"+url+"' style='width:100%'>";
		     str+="   		<span></span>";
		     str+="  	</div>";
		     str+="  	<span>"+showColumnValue(name,12)+"</span>";
		     str+="		<div class='attachment-selected' style='display:none'>";
             str+="			<i class='icon-ok icon-white'></i>";
             str+="			<span class='border'></span>";
             str+="		</div>";
		     str+="</div>";
		     $("#p_div").append(str);
	 })
}


function initData(){
	$.ajax({
        url : getRootPath()+"/commodity/queryPhoList.action",
        type : "post",
        async: false,
        "dataType":"json",
        success : function (gdata) {
        	if(gdata!=null){
        		 var glist=gdata.data;
  	             for(var i=0;i<glist.length;i++){       //第一条是未分组数据
  	            	 var gindex=glist[i];
  	            	 var id=gindex.group_id;            //id
  	            	 var name=gindex.file_group_name;   //分组名称
  	            	 var ct=gindex.ct;                  //分组数量
  	            	 var s_class=""                     //默认第一个选项卡class
  	            	 if(name==null || name==""){name=""}
  	            	 if(id==null || id==""){id="";name="未分组"}
  	            	 if(i==0){ s_class="class='start'";now_g_id=id}
  	            	 var ali="<li "+s_class+">"+name+"<span>"+ct+"</span><input type='hidden' value='"+id+"' id='g_id_"+i+"' /></li>";
  	            	 $("#left_group").append(ali); 
  	             }
        	}
        }
    })
	
}
//初始化左边选项卡、右边图片选择的样式
function initTab(){
	mutl_type=getUrlParam("mutl_type");       //type=1 图片单选; 2 图片多选
	if(mutl_type==null ||mutl_type==""){mutl_type=1;}
	var d=$(".right>div");
    $(".left>ul").on("click","li",function () {
        var ind=$(this).index();
        $(this).addClass("start");
        $(this).siblings().removeClass("start");
        now_g_id=$("#g_id_"+ind).val();  //点击的分组id
        search();
           //每个选项卡对应自己的div  注释掉后都对应一个div
//	        for(var i=0;i<d.length;i++){   
//	            $(d[i]).removeClass("start");
//	        }
//	        $(d[ind]).addClass("start");
         
    });
    $(".right>div").on("click","div.identical",function(){
    	//图片单选或多选
    	if(mutl_type==1){
		  $(this).siblings().find(".attachment-selected").removeClass("start");
    	}
      
        var back = $(this).find("img").attr('src');
        if($(this).find(".attachment-selected").hasClass("start")){
        	  $(this).find(".attachment-selected").removeClass("start");
        	  oper_phoArr("del",back);
        }else{
        	 $(this).find(".attachment-selected").addClass("start");
        	 oper_phoArr("add",back);
        }
    })
}
/**
 * 操作存储图片的数组
 * @param  del_add del 清除数组中的某项值  add  增加值
 * @param  backurl  对应的图片url
 */
function oper_phoArr(del_add,backurl){
	if(del_add=="del"){
		for(var i=0;i<phoArr.length;i++){
			if(phoArr[i]==backurl){
				phoArr.splice(i,1);
				break;
			}
		}
	}else{
		 if(mutl_type==1){ //单选
			 phoArr=[];
   	    }
		phoArr.push(backurl);
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
function to_return(){
	if(phoArr.length>0){
		var b_fun = getUrlParam("b_fun");
		var liId = getUrlParam("liId");
		var ind = getUrlParam("ind");
		var liInd = getUrlParam("liInd");
		var div_ind = getUrlParam("div_ind");
		//进行判断
		var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		if(undefined==liId&&undefined==ind){
			//一般调用
			//eval('window.parent.'+b_fun+'(phoArr)');
			eval('window.parent.document.getElementById(data_pjax).contentWindow.'+b_fun+'(phoArr)');
		}else if(undefined!=liId){
			//微页面图片导航，选择图片调用以下方法
			//eval('window.parent.query_navpho(phoArr,liId)');
			//微页面橱窗，选择图片调用以下方法
			//eval('window.parent.query_showcasepho(phoArr,liId)');
			//微页面图片导航,橱窗调用
			//eval('window.parent.'+b_fun+'(phoArr,liId)');
			eval('window.parent.document.getElementById(data_pjax).contentWindow.'+b_fun+'(phoArr,liId)');
		}else if(undefined!=ind&&undefined==liInd){
			//微页面图片广告,魔方调用
			//eval('window.parent.query_adpho(phoArr,ind)'); 
			//eval('window.parent.'+b_fun+'(phoArr,ind)');
			eval('window.parent.document.getElementById(data_pjax).contentWindow.'+b_fun+'(phoArr,ind)');
		}else if(undefined!=liInd){
			//微页面图片广告重新上传调用
			//eval('window.parent.'+b_fun+'(phoArr,ind,liInd,div_ind)');
			eval('window.parent.document.getElementById(data_pjax).contentWindow.'+b_fun+'(phoArr,ind,liInd,div_ind)');
		}
		parent.layer.closeAll();
		
	}else{
		layer.alert("请选择图片!");
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
	 
	 //window.location.href = "paperTs.htm?currentPage="+currentPage;
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
//	p_totalPage  共多少页   p_dataCount  共多少条数据
//	<c:forEach begin="${start }" end="${end }" step="1" varStatus="page">
//	<c:choose>
//		<c:when test="${page.index == currentPage }">
//			<li class="ng-scope"><a href="javascript:;" onclick="selectPage('${page.index}')" class="ng-binding" style="background-color:blue">${page.index}</a></li>
//		</c:when>
//		<c:otherwise>
//			<li class="ng-scope"><a href="javascript:;" onclick="selectPage('${page.index}')" class="ng-binding">${page.index}</a></li>
//		</c:otherwise>
//	</c:choose>
//</c:forEach>
	currentPage=gdata.currentPage;  
	totalPage=gdata.totalPage;
	var dataCount=gdata.dataCount;
	var start=parseInt(gdata.start);
	var end=parseInt(gdata.end);
//	alert(start+"___"+end+"_"+totalPage+"_"+currentPage);
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
	
	str+="<li class='ng-scope' ><a href='javascript:;' class='ng-binding'> 第"+currentPage+"页 | 共"+totalPage+"页 | "+dataCount+"条记录</a></li>";
	
	str+="</ul>";
	$("#page_index").html(str);
	initPage();
}
