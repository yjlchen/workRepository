/**
 * 微页面分类列表页js
 */
$(function(){  
	   jQuery_dataTable_extend_FirstAndEnd();    // 设置dataTabla首页和尾页
	   searchPage();	                         //初始数据
});  


layui.use('element', function(){ 
		var  element = layui.element(),
		layer = layui.layer;
})


//加载微页面分类列表
function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	
	pageinfoType = $('#pageinfotype_list').DataTable({
		 	"processing": true,
	        "serverSide": true,
	        "paging":   true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "info":     true,
	        "bLengthChange":   true,
	        "bPaginate":true,
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
	            { "data" : "group_name"},
	            { "data" : "create_time"}
	            
	        ],
	        "columnDefs": [
							{
							    "targets": [2],
							    "data":"id",
							    "render": function(data, type, full) {
							    	var id = data;
							    	//微页面分类没有链接
							    	var group_url = full.group_url;
							    	var title = full.group_name;
							    	//截取后的title
							    	var sub = "";
							    	//设定title的长度
							    	if(title.length>5){
							    		sub = title.substring(0,5)+"...";
							    	}else{
							    		sub = title;
							    	}
							    	var operation = "";
							    	//编辑微页面的文本导航，选择微页面及分类调用
							    	if(leixing == "pageinfoOfTextnav"){
							    		operation = 
							    		"<a href='#' onclick='xqWymOfTextnav(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//编辑微页面的图片导航，选择微页面及分类调用
							    	else if(leixing == "pageinfoOfNav"){
							    		operation = 
							    		"<a href='#' onclick='xqWymOfNav(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面关联链接调用
							    	else if(leixing == "link"){
							    		operation = 
							    		"<a href='#' onclick='xqWymType(\""+sub+"\",\""+group_url+"\",\""+ind+"\")'>选取</a>";
							    	}
							    	//微页面标题调用
							    	else if(leixing == "pageinfoOfTitle"){
							    		operation = 
							    		"<a href='#' onclick='xqWymOfTitle(\""+sub+"\",\""+group_url+"\",\""+ind+"\")'>选取</a>";
							    	}
							    	//微页面标题里的文本导航调用
							    	else if(leixing == "pageinfoOfTitle_Textnav"){
							    	operation = 
							    	"<a href='#' onclick='xqWymOfTitle_Textnav(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面橱窗调用
							    	else if(leixing == "pageinfoOfShowcase"){
							    		operation = 
							    		"<a href='#' onclick='xqWymOfShowcase(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面图片广告调用
							    	else if(leixing == "pageinfoOfImageAd"){
							    		operation = 
							    		"<a href='#' onclick='xqWymOfImageAd(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面魔方调用
							    	else if(leixing == "pageinfoOfCube"){
							    		operation = 
							    		"<a href='#' onclick='xqWymOfCube(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//店铺导航调用
							    	else{
							    		operation = 
							    		"<a href='#' onclick='xuanqu(\""+id+"\",\""+sub+"\",\""+group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	return operation;  
							    }
							  },
							{
							    "targets": [3],
							    "data":"group_url",
							    "visible": false 
							  }
	                     ],
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/webstore/pageinfo/queryPageInfoTypeList.action",
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
function xuanqu(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	//设置链接后的文本
	parentPage.document.getElementById("yijiLj"+num).innerHTML = "[微页面]"+title;
	//设置右侧的链接地址
	parentPage.document.getElementById("yijiLj"+num).href = group_url;
	//给navigation_url隐藏域赋值
	parentPage.document.getElementById("yijiInput"+num).value = group_url;
	//给navigation_url_title隐藏域赋值
	parentPage.document.getElementById("yijiUrlTitle"+num).value = title;
	parent.layer.closeAll();
}


/**
 * 编辑微页面下的文本导航，选择微页面分类调用
 */
function xqWymOfTextnav(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类          '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTextnav(this)">×</a>'
		+'		</div> '
		+'	<div class="dropdown hover pull-right"> '
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnav(this,1)">微页面及分类</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;"  onclick="chooseGoodsAndGroupTextnav(this,1)">商品及分类</a>'
		+'		</li>'
		+'		</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+group_url+'"> '

		//改变原来div中的内容
		parentPage.document.getElementById("textnavControls_"+num).innerHTML = str;
		
		/**判断，当导航标题为空时，给导航标题赋值**/
		//获得导航标题文本框对象
		 var navTitle = parentPage.document.getElementById("title"+num);
		//获得当前导航标题文本框的值
		var text = $(navTitle).val();
		if(text==""){
			$(navTitle).val(title);
			//获得当前li的id
			var thisli = $(navTitle).parent().parent().parent();
			var id = thisli.attr("id");
			//获得左边的li对象
			var leftLi = parentPage.document.getElementById(id);
			//给左边的span赋上文本框的值
			$(leftLi).find("a span").html(title);
		}
			
		//关闭弹窗
		parent.layer.closeAll();

}



/**
 * 编辑微页面的图片导航，选择微页面及分类调用
 */
function xqWymOfNav(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类           '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a> '
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateNav(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageNav(this,1)">微页面及分类</a>'
		+'		</li>'
		+'		<li> '
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;"  onclick="chooseGoodsAndGroupNav(this,1)">商品及分类</a>'
		+'		</li>'
		+'		</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("navControls_"+num).innerHTML = str;
			
		//关闭弹窗
		parent.layer.closeAll();

}



/**
 * 选取微页面分类（微页面关联链接调用）
 */
function xqWymType(title,group_url,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">                                                    '
		+'		<div class="pull-left js-link-to link-to">                                           '
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">    '
		+'					<span class="label label-success">                                       '
		+'						微页面分类           '
		+'						<em class="link-to-title-text">'+title+'</em> '
		+'					</span>'
		+'				</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine 1" data-type="feature" href="javascript:void(0);" id="uuuu">微页面分类</a> '
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  >商品标签</a>'
		+'			</li>'
		+'			</ul>'
		+'		</div> '
		+'		</div> '
		+'		<input type="hidden" name="link_url" value="'+group_url+'"> '
		
		//改变原来div中的内容
		var modality = parentPage.document.getElementById("modality");
		var div1 = $(modality).children().eq(ind).find(".controls").eq(0);
		div1.html(str);
		
		//再追加一个带select的div
		var str1 = 
			'	<div class="control-group" id="shownum">'
			+'		<label class="control-label">显示条数：</label>     '
			+'		<div class="controls" style="margin-left: 10px;"> '
			+'			<select name="number" onchange="linkChange(this,'+ind+',\''+title+'\')"> '
			+'				<option value="1">1条</option>              '
			+'				<option value="2">2条</option>              '
			+'				<option value="3" selected="">3条</option>  '
			+'				<option value="4">4条</option>              '
			+'				<option value="5">5条</option>              '
			+'			</select>                                      '
			+'		</div>                                             '
			+'	</div>                                                 '
		
		//找到这个div的父li,先删除之前选择的分类
		div1.parent().parent().find("#shownum").remove();
		//再加上新选择的分类
		div1.parent().parent().append(str1);
		
		var leftThree = 
			'	<li>													 '
			+'		<a href="javascript:;" class="custom-link-link">     '
			+'		<h3 class="title">                                   '
			+'				第1条 '+title+' 的『关联链接』  '
			+'		</h3>                                                '
			+'		<i class="pull-right right-arrow"></i>               '
			+'		</a>                                                 '
			+'	</li>                                                    '
			+'	<li >                                                    '
			+'		<a href="javascript:;" class="custom-link-link">     '
			+'		<h3 class="title">                                   '
			+'				第2条 '+title+' 的『关联链接』  '
			+'		</h3>                                                '
			+'		<i class="pull-right right-arrow"></i>               '
			+'		</a>                                                 '
			+'		</li>                                                '
			+'	<li >                                                    '
			+'		<a href="javascript:;" class="custom-link-link">     '
			+'		<h3 class="title">                                   '
			+'				第3条 '+title+' 的『关联链接』  '
			+'		</h3>                                                '
			+'		<i class="pull-right right-arrow"></i>               '
			+'		</a>                                                 '
			+'	</li>                                                    '
		
		//获得左边的ul
		var module = parentPage.document.getElementById("module");
		var leftUl = $(module).children().eq(ind).find(".control-group #appendLinkul");
		//先清除之前选择的
		$(leftUl).find("li").remove();
		//再追加上新选择的3个li（下拉列表默认选中3）
		$(leftUl).append(leftThree);
		//关闭弹窗
		parent.layer.closeAll();
		
}



/**
 * 编辑微页面的标题，选择微页面及分类调用
 */
function xqWymOfTitle(title,group_url,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<input type="radio" name="wx_title_link_type" value="1" checked>其他链接 '
		+'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类          '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a> '
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle(this)">×</a>'
		+'		</div> '
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li> '
		+'				<a class="js-modal-magazine 1" data-type="feature" href="javascript:void(0);" id="xzWym">微页面及分类</a>'
		+'			</li> '
		+'			<li> '
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  id="xzShp">商品及分类</a>'
		+'			</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="wx_link_url" value="'+group_url+'"> '
		
		//改变原来div中的内容
		var modality = parentPage.document.getElementById("modality");
		var div1 = $(modality).children().eq(ind).find(".control-group").eq(13).find(".controls label");
		div1.html(str);
		
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面标题里的文本导航
 */
function xqWymOfTitle_Textnav(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类           '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle_textNav(this)">'
		+'	×</a>'
		+'	</div>'
		+'	<div class="dropdown hover pull-right"> '
		+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'	<ul class="dropdown-menu">'
		+'	<li>'
		+'	<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,1)">微页面及分类</a>'
		+'	</li>'
		+'	<li>'
		+'	<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,1)">商品及分类</a>'
		+'	</li>'
		+'	</ul>'
		+'	</div>'
		+'	</div>'
		+'	<input type="hidden" name="link_url" value="'+group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("titleControls_"+num).innerHTML = str;
		
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面的图片广告
 */
function xqWymOfImageAd(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类           '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateImageAd(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageImageAd(this,1)">微页面及分类</a>'
		+'		</li>'
		+'		<li>'
		+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupImageAd(this,1)">商品及分类</a>'
		+'		</li>'
		+'		</ul>'
		+'		</div> '
		+'		</div> '
		+'		<input type="hidden" name="link_url" value="'+group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("imageAdControls_"+num).innerHTML = str;
			
		//关闭弹窗
		parent.layer.closeAll();
}


/**
 * 微页面的橱窗
 */
function xqWymOfShowcase(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类           '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateShowcase(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu"> '
		+'			<li> '
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,1)">微页面及分类</a>'
		+'			</li>'
		+'			<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,1)">商品及分类</a>'
		+'			</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("showcaseControls_"+num).innerHTML = str;
			
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面的魔方
 */
function xqWymOfCube(id,title,group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'				<a href="'+group_url+'" target="_blank" class="new-window link-to-title">'
		+'					<span class="label label-success">'
		+'						微页面分类           '
		+'						<em class="link-to-title-text">'+title+'</em>'
		+'					</span>'
		+'				</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateCube(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageCube(this,1)">微页面及分类</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupCube(this,1)">商品及分类</a>'
		+'			</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("cubeControls_"+num).innerHTML = str;
		//给左边的图片加上超链接地址
		parentPage.document.getElementById("cubeImage_"+num).href = group_url;
		//关闭弹窗
		parent.layer.closeAll();
}

