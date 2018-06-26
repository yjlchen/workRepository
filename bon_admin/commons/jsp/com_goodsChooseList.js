/**
 * 微页面选择链接到某个商品的js（列表点击选取）
 */
var oTable; //记录数据datatable
$(function(){  
	  jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
		searchPage();	
	 
});  


layui.use('element', function(){ 
	var  element = layui.element(),
	layer = layui.layer;
})


//商品列表
function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	oTable  = $('#commodity_list').DataTable({
		 	"processing": true,
	        "serverSide": true,
	        "paging":   true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "info":     true,
	        //不显示每页显示多少条的下拉列表
	        "bLengthChange": false,
	        "bPaginate":false,
	        "bDestroy": true,
	        "pageLength":5, 
	        //select: 'single',
	        "aLengthMenu": [[20, 30, 40], [20,30, 40]],
	        "createdRow": function ( row, data, index ) {
	        },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [  
	            { "data" : "commodity_name"},
	            { "data" : "create_time"},
	        ],
	        "columnDefs": [
	                       {
								"targets": [0],
	                    	   	"data":"commodity_name",
	                    	   	"render": function(data, type, full,meta) { 
	                    	   		return combin(full);
	                    	   	}
	                       },
							{
							    "targets": [2],
							    "data":"id",
							    "render": function(data, type, full, meta) {
							    	var id = data;
							    	var commodity_url = full.commodity_url;
							    	var commodity_name = full.commodity_name;
							    	//截取后的title
							    	var sub = "";
							    	//设定title的长度
							    	if(commodity_name.length>5){
							    		sub = commodity_name.substring(0,5)+"...";
							    	}else{
							    		sub = commodity_name;
							    	}
							    	var operation = "";
							    	if(full.marketing_activity_type==20){
							    		operation = "已参加限时折扣活动"
							    	}else if(full.marketing_activity_type==30){ 
							    		operation = "已参加满减送活动"
							    	}else{//没参加活动
								    	//微页面的文本导航调用
								    	if(leixing == "goodsOfTextnav"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfTextnav(\""+sub+"\",\""+commodity_url+"\",\""+num+"\")'>选取</a>";
								    	}
								    	//微页面的图片导航调用
								    	else if(leixing == "goodsOfNav"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfNav(\""+sub+"\",\""+commodity_url+"\",\""+num+"\")'>选取</a>";
								    	}
								    	//微页面标题的其他链接调用
								    	else if(leixing == "goodsOfTitle"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfTitle(\""+sub+"\",\""+commodity_url+"\",\""+ind+"\")'>选取</a>";
								    	}
								    	//微页面标题的文本导航调用
								    	else if(leixing == "goodsOfTitle_Textnav"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfTitle_Textnav(\""+sub+"\",\""+commodity_url+"\",\""+num+"\")'>选取</a>";
								    	}
								    	//微页面的橱窗调用
								    	else if(leixing == "goodsOfShowcase"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfShowcase(\""+sub+"\",\""+commodity_url+"\",\""+num+"\")'>选取</a>";
								    	}
								    	//微页面的橱窗调用
								    	else if(leixing == "goodsOfShowcase"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfShowcase(\""+sub+"\",\""+commodity_url+"\",\""+num+"\")'>选取</a>";
								    	}
								    	//微页面的图片广告调用
								    	else if(leixing == "goodsOfImageAd"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfImageAd(\""+sub+"\",\""+commodity_url+"\",\""+num+"\",\""+ind+"\")'>"
								    		+"选取</a>"
								    	}
								    	//微页面魔方调用
								    	else if(leixing == "goodsOfCube"){
								    		operation = 
								    		"<a href='#' onclick='xqGoodsOfCube(\""+sub+"\",\""+commodity_url+"\",\""+num+"\")'>选取</a>";
								    	}
							    	}
								    return operation;
							      }
							  }
	                       
	                     ],
	                   /*  select: {
	                         style:    'os'   //双击选中列的方法，此处不需要
	                     }
	                     ,*/
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/commodity/querySellingGoodsPageList.action",
	                         "dataType":"json",
	                         'data' : {queryJsonStr:queryJsonStr}
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
	  //oTable.rows({ selected: true }).deselect();
      //oTable.cells({ selected: true }).deselect();
}


//组装商品图片和名称
function combin(full){
	var str='<div class="shanpin">';
	str+='    <div class="shanpinimg">';
	str+='     <img src="'+full.img_path_str.split(",")[0]+'">';
	str+='   </div>';
	str+='   <div>';
	str+='     <h5><a href="#" >'+full.commodity_name+'</a></h5>';
	str+='   </div>';
	str+=' </div>';
	return str;
}


/**
 * 编辑微页面的文本导航，选择商品及分类调用
 */
function xqGoodsOfTextnav(title,commodity_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success">'
		+'					商品  '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTextnav(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnav(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnav(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      	<a class="js-modal-links" data-type="links"  href="javascript:;">自定义外链</a>'
        +'      </li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+commodity_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("textnavControls_"+num).innerHTML = str;
		
		//获得导航标题文本框对象
		var navTitle = parentPage.document.getElementById("title"+num);
		//获得当前导航标题文本框的值
		var text = $(navTitle).val();
		//获得当前li的id
		var thisli = $(navTitle).parent().parent().parent();
		var id = "left_"+thisli.attr("id");
		//获得左边的li对象
		var leftLi = parentPage.document.getElementById(id);
		/*
		//给左边的a加上onclick事件
		$(leftLi).find("a").attr("onclick","isWeiXinOut('"+commodity_url+"')");*/
		//改变左边a的href
		$(leftLi).find("a").attr("href",commodity_url);
		/**判断，当导航标题为空时，给导航标题赋值**/
		if(text==""){
			//给当前导航标题文本框赋值（未截取长度的title）
			$(navTitle).val(title);
			//截取15位后的title
	    	var subtitle = "";
	    	//设定title的长度
	    	if(title.length>15){
	    		subtitle = title.substring(0,15)+"...";
	    	}else{
	    		subtitle = title;
	    	}
	    	//给左边的span赋上文本框的值
	    	$(leftLi).find("a span").html(subtitle);
		}
			
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 编辑微页面的图片导航，选择商品及分类调用
 */
function xqGoodsOfNav(title,commodity_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'				<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						商品          '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateNav(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'	<ul class="dropdown-menu">'
		+'	<li>'
		+'	<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,1)">微页面</a>'
		+'	</li>'
		+'	<li>'
		+'	<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupNav(this,1)">商品</a>'
		+'	</li>'
		+'  <li>'
        +'     <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
		+'	</ul>'
		+'	</div>'
		+'	</div>'
		+'<input type="hidden" name="link_url" value="'+commodity_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("navControls_"+num).innerHTML = str;
			
		//获得选择链接的div对象
		var ljDiv = parentPage.document.getElementById("navControls_"+num);
		//获得当前父级li的id
		var liid = $(ljDiv).parent().parent().parent().attr("id");
		//获得左边的li对象
		var leftLi = parentPage.document.getElementById(liid);
		/*//给左边的a加上onclick事件
		//$(leftLi).find("a").attr("onclick","isWeiXinOut('"+commodity_url+"')");*/		
		//改变左边a的href
		$(leftLi).find("a").attr("href",commodity_url);
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面标题的其他链接调用
 */
function xqGoodsOfTitle(title,commodity_url,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<input type="radio" name="wx_title_link_type" value="1" checked>其他链接 '
		+'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success">'
		+'					商品 '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine 1" data-type="feature" href="javascript:void(0);" id="xzWym">微页面</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  id="xzShp">商品</a>'
		+'			</li>'
		+' 			 <li>'
        +' 				<a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +' 			 </li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="wx_link_url" value="'+commodity_url+'">'
		
		//改变原来div中的内容
		var modality = parentPage.document.getElementById("modality");
		var div1 = $(modality).children().eq(ind).find(".control-group").eq(13).find(".controls label");
		div1.html(str);
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面标题里的文本导航调用
 */
function xqGoodsOfTitle_Textnav(title,commodity_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'		<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				商品 '
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle_textNav(this)">'
		+'	×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+commodity_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("titleControls_"+num).innerHTML = str;
		//关闭弹窗
		parent.layer.closeAll();
}





/**
 * 微页面的图片广告,选择商品及分类
 */
function xqGoodsOfImageAd(title,commodity_url,num,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success"> '
		+'					商品'
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateImageAd(this)">×</a>'
		+'		</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageImageAd(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupImageAd(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+commodity_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("imageAdControls_"+num).innerHTML = str;
	
		//获得选择链接的div对象
		var ljDiv = parentPage.document.getElementById("imageAdControls_"+num);
		//获得当前父级li的id
		var liid = $(ljDiv).parent().parent().parent().attr("id");
		//获得父页面的module对象
		var module = parentPage.document.getElementById("module");
		//左边div下的a加上链接
		$(module).children().eq(ind).find(".swiper-wrapper div[id='"+liid+"'] a").attr("href",commodity_url);
		//左边li加上onclick
		$(module).children().eq(ind).find("ul.custom-image li[id='"+liid+"']").attr("onclick","isWeiXinOut('"+commodity_url+"')"); 
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面的橱窗,选择商品及分类
 */
function xqGoodsOfShowcase(title,commodity_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success">'
		+'					商品 '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateShowcase(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:;">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+commodity_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("showcaseControls_"+num).innerHTML = str;
		
		//获得选择链接的div对象
		var ljDiv = parentPage.document.getElementById("showcaseControls_"+num);
		//获得当前父级li的id
		var liid = $(ljDiv).parent().parent().parent().attr("id");
		//获得左边的li对象
		var leftLi = parentPage.document.getElementById(liid);
		/*//给左边的a加上onclick事件
		$(leftLi).find("a").attr("onclick","isWeiXinOut('"+commodity_url+"')");*/
		//改变左边的a的href
		$(leftLi).find("a").attr("href",commodity_url);
		//关闭弹窗
		parent.layer.closeAll();
}




/**
 * 微页面魔方,选择商品及分类
 */
function xqGoodsOfCube(title,commodity_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success">'
		+'					商品 '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateCube(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageCube(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupCube(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'          <a class="js-modal-links" data-type="links" href="javascript:;">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+commodity_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("cubeControls_"+num).innerHTML = str;
		//获得左边的a对象
		var cubeImage = parentPage.document.getElementById("cubeImage_"+num);
		/*//给左边的a加上onclick事件
		//$(cubeImage).attr("onclick","isWeiXinOut('"+commodity_url+"')");*/		
		//改变左边的a的href
		$(cubeImage).attr("href",commodity_url);
		//关闭弹窗
		parent.layer.closeAll();
}


