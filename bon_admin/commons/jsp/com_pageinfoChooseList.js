/**
 * 微页面列表页（上架）js
 */
$(function(){  
	   initPageGroup();
	   jQuery_dataTable_extend_FirstAndEnd();    // 设置dataTabla首页和尾页
	   searchPage();	                         //初始数据
});  


layui.use('element', function(){ 
	var  element = layui.element(),
	layer = layui.layer;
})



//加载微页面列表（上架）
function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	
	pageinfo = 
		$('#pageinfo_list').DataTable({
		 	"processing": true,
	        "serverSide": true,
	        "paging":   true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "info":     true,
	        //不显示每页显示多少条的下拉列表，下面2项都设置为false
	        "bLengthChange":false,
	        "bPaginate":false,
	        "bDestroy": true,
	        "pageLength": 5,
	        "aLengthMenu": [[3, 5, 10], [3, 5, 10]],
	        "createdRow": function ( row, data, index ) {
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [   
	            { "data" : "micro_name"},
	            { "data" : "create_time"}
	            
	        ],
	        "columnDefs": [
				{
				    "targets": [2],
				    "data":"id",
				    "render": function(data, type, full) {
				    	var id = data;
				    	var micro_url = full.micro_url;
				    	var title = full.micro_name;
				    	//截取后的title
				    	var sub = "";
				    	//设定title的长度
				    	if(title.length>5){
				    		sub = title.substring(0,5)+"...";
				    	}else{
				    		sub = title;
				    	}
				    	var operation = "";
				    	//编辑微页面的文本导航，选择微页面调用
				    	if(leixing == "pageinfoOfTextnav"){
				    	operation = 
				    	"<a href='#' onclick='xqWymOfTextnav(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\",\""+title+"\")'>选取</a>";
				    	}
				    	//编辑微页面的图片导航，选择微页面调用
				    	else if(leixing == "pageinfoOfNav"){
				    		operation = 
				    		"<a href='#' onclick='xqWymOfNav(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\")'>选取</a>";
				    	}
				    	//微页面标题的其他链接调用
				    	else if(leixing == "pageinfoOfTitle"){
				    		operation = 
				    		"<a href='#' onclick='xqWymOfTitle(\""+sub+"\",\""+micro_url+"\",\""+ind+"\")'>选取</a>";
				    	}
				    	//微页面标题里的文本导航调用
				    	else if(leixing == "pageinfoOfTitle_Textnav"){
				    		operation = 
				    		"<a href='#' onclick='xqWymOfTitle_Textnav(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\")'>选取</a>";
				    	}
				    	//微页面橱窗调用
				    	else if(leixing == "pageinfoOfShowcase"){
				    		operation = 
				    		"<a href='#' onclick='xqWymOfShowcase(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\")'>选取</a>";
				    	}
				    	//微页面图片广告调用
				    	else if(leixing == "pageinfoOfImageAd"){
				    		operation = 
				    		"<a href='#' onclick='xqWymOfImageAd(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\",\""+ind+"\")'>选取</a>";
				    	}
				    	//微页面魔方调用
				    	else if(leixing == "pageinfoOfCube"){
				    		operation = 
				    		"<a href='#' onclick='xqWymOfCube(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\")'>选取</a>";
				    	}
				    	
				    	//店铺导航调用
				    	else{
				    		operation = 
				    		"<a href='#' onclick='xuanqu(\""+id+"\",\""+sub+"\",\""+micro_url+"\",\""+num+"\")'>选取</a>";
				    	}
					    return operation;  
				    }
				  },
					{
					    "targets": [3],
					    "data":"micro_url",
					    "visible": false 
					  }
                   ],
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/webstore/pageinfo/queryPageInfoList.action",
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
		}



/**
 * 选取微页面（店铺导航）
 */
function xuanqu(id,title,micro_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	//设置链接后的文本
	parentPage.document.getElementById("yijiLj"+num).innerHTML = "[微页面]"+title;
	//设置右侧的链接地址
	parentPage.document.getElementById("yijiLj"+num).href = micro_url;
	
	//给navigation_url隐藏域赋值
	parentPage.document.getElementById("yijiInput"+num).value = micro_url;
	//给navigation_url_title隐藏域赋值
	parentPage.document.getElementById("yijiUrlTitle"+num).value = title;
	//关闭弹窗
	parent.layer.closeAll();
}


/**
 * 编辑微页面下的文本导航
 */
function xqWymOfTextnav(id,sub,micro_url,num,title){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'		<a href="'+micro_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				微页面 '
		+'				<em class="link-to-title-text">'+sub+'</em>'
		+'			</span>'
		+'		</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTextnav(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'	<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnav(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnav(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
		+'	</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+micro_url+'">'

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
		//改变左边的a的href
		$(leftLi).find("a").attr("href",micro_url);
		
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
 * 编辑微页面的图片导航
 */
function xqWymOfNav(id,title,micro_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'		<a href="'+micro_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				微页面'
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateNav(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  onclick="chooseGoodsAndGroupNav(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'     		 <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'<input type="hidden" name="link_url" value="'+micro_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("navControls_"+num).innerHTML = str;
	
		//获得选择链接的div对象
		var ljDiv = parentPage.document.getElementById("navControls_"+num);
		//获得当前父级li的id
		var liid = $(ljDiv).parent().parent().parent().attr("id");
		//获得左边的li对象
		var leftLi = parentPage.document.getElementById(liid);
		//改变左边的a的href
		$(leftLi).find("a").attr("href",micro_url);
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面的标题的其他链接调用
 */
function xqWymOfTitle(title,group_url,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<input type="radio" name="wx_title_link_type" value="1" checked>其他链接 '
		+'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success">'
		+'					微页面 '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle(this)">×</a>'
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
		+'		<input type="hidden" name="wx_link_url" value="'+group_url+'">'
		
		//改变原来div中的内容
		var modality = parentPage.document.getElementById("modality");
		var div1 = $(modality).children().eq(ind).find(".control-group").eq(13).find(".controls label");
		console.log(div1);
		div1.html(str);
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面标题里的文本导航调用
 */
function xqWymOfTitle_Textnav(id,title,micro_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'		<a href="'+micro_url+'" target="_blank" class="new-window link-to-title">'
		+'		   <span class="label label-success">'
		+'				微页面 '
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'		   </span>'
		+'		</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle_textNav(this)">'
		+'	×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'	<ul class="dropdown-menu">'
		+'	<li>'
		+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,1)">微页面</a>'
		+'	</li>'
		+'	<li>'
		+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,1)">商品</a>'
		+'	</li>'
		+'  <li>'
        +' 		<a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +' 	</li>'
		+'	</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+micro_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("titleControls_"+num).innerHTML = str;
			
		//关闭弹窗
		parent.layer.closeAll();
}




/**
 * 微页面的图片广告
 */
function xqWymOfImageAd(id,title,micro_url,num,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'		<a href="'+micro_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				微页面'
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateImageAd(this)">×</a>'
		+'	</div>'
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
		+'	<input type="hidden" name="link_url" value="'+micro_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("imageAdControls_"+num).innerHTML = str;
			
		//获得选择链接的div对象
		var ljDiv = parentPage.document.getElementById("imageAdControls_"+num);
		//获得当前父级li的id
		var liid = $(ljDiv).parent().parent().parent().attr("id");
		//获得父页面的module对象
		var module = parentPage.document.getElementById("module");
		//左边div下的a加上链接
		$(module).children().eq(ind).find(".swiper-wrapper div[id='"+liid+"'] a").attr("href",micro_url);
		//左边li加上onclick
		$(module).children().eq(ind).find("ul.custom-image li[id='"+liid+"']").attr("onclick","isWeiXinOut('"+micro_url+"')"); 
		//关闭弹窗
		parent.layer.closeAll();
}




/**
 * 微页面的橱窗
 */
function xqWymOfShowcase(id,title,micro_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+micro_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success">'
		+'						微页面  '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateShowcase(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      	<a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+micro_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("showcaseControls_"+num).innerHTML = str;
	
		//获得选择链接的div对象
		var ljDiv = parentPage.document.getElementById("showcaseControls_"+num);
		//获得当前父级li的id
		var liid = $(ljDiv).parent().parent().parent().attr("id");
		//获得左边的li对象
		var leftLi = parentPage.document.getElementById(liid);
		//改变左边的a的href
		$(leftLi).find("a").attr("href",micro_url);
		//关闭弹窗
		parent.layer.closeAll();
}


/**
 * 微页面的魔方调用
 */
function xqWymOfCube(id,title,micro_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'	<div class="pull-left js-link-to link-to">'
		+'		<a href="'+micro_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				  微页面 '
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateCube(this)">×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right">'
		+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'		<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageCube(this,1)">微页面</a>'
		+'		</li>'
		+'		<li>'
		+'		<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupCube(this,1)">商品</a>'
		+'		</li>'
		+'      <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
		+'		</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+micro_url+'"> '

		//改变原来div中的内容
		parentPage.document.getElementById("cubeControls_"+num).innerHTML = str;
		//给左边的图片加上超链接地址
		parentPage.document.getElementById("cubeImage_"+num).href = micro_url;
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 初始化微页面分类下拉框内容
 */
function initPageGroup(){
		$.ajax({
	        url : getRootPath()+"/webstore/pageinfo/queryPageGroupList.action",
	        type : "post",
	        async: false,
	        "dataType":"json",
	        success : function (gdata) {
	        	if(gdata!=null){
	        		 var glist=gdata.data;
	        		 $("#group_id").append("<option value=''>全部分类</option>"); 
	  	             for(var i=0;i<glist.length;i++){
	  	            	 var gindex=glist[i];
	  	            	 var id=gindex.id;
	  	            	 var group_name=gindex.group_name;
	  	            	 $("#group_id").append("<option value='"+id+"'>"+group_name+"</option>"); 
	  	             }
	        	}
	        }
	    })
}