//商品分组列表js
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();	
});


layui.use('element', function(){ 
		var  element = layui.element(),
		layer = layui.layer;
})

//加载商品分组列表
function searchPage(){
	//查询商品分组
	 var queryCond = $('#queryform').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 group = $('#group_list').DataTable({
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
	            { "data" : "commodity_group_name"},
	            { "data" : "create_time"},
	        ],
	        "columnDefs": [
							{
							    "targets": [2],
							    "data":"commodity_group_id",
							    "render": function(data, type, full) {
							    	var id = data;
							    	//商品分组暂时没有链接
							    	var commodity_group_url = full.commodity_group_url;
							    	var commodity_group_name = full.commodity_group_name;
							    	//截取后的title
							    	var sub = "";
							    	//设定title的长度
							    	if(commodity_group_name.length>5){
							    		sub = commodity_group_name.substring(0,5)+"...";
							    	}else{
							    		sub = commodity_group_name;
							    	}
							    	var operation = "";
							    	//编辑微页面的文本导航，选择商品及分类调用
							    	if(leixing == "goodsOfTextnav"){
							    		operation = "<a href='#' onclick='xqGoodsOfTextnav(\""+sub+"\",\""+commodity_group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面的图片导航调用
							    	else if(leixing == "goodsOfNav"){
							    		operation = "<a href='#' onclick='xqGoodsOfNav(\""+sub+"\",\""+commodity_group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面标题的其他链接调用
							    	else if(leixing == "goodsOfTitle"){
							    		operation = "<a href='#' onclick='xqGoodsOfTitle(\""+sub+"\",\""+commodity_group_url+"\",\""+ind+"\")'>选取</a>";
							    	}
							    	//微页面标题的文本导航调用
							    	else if(leixing == "goodsOfTitle_Textnav"){
							    		operation = "<a href='#' onclick='xqGoodsOfTitle_Textnav(\""+sub+"\",\""+commodity_group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面的橱窗调用
							    	else if(leixing == "goodsOfShowcase"){
							    		operation = "<a href='#' onclick='xqGoodsOfShowcase(\""+sub+"\",\""+commodity_group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面的图片广告调用
							    	else if(leixing == "goodsOfImageAd"){
							    		operation = "<a href='#' onclick='xqGoodsOfImageAd(\""+sub+"\",\""+commodity_group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//微页面魔方调用
							    	else if(leixing == "goodsOfCube"){
							    		operation = "<a href='#' onclick='xqGoodsOfCube(\""+sub+"\",\""+commodity_group_url+"\",\""+num+"\")'>选取</a>";
							    	}
							    	//商品列表调用
							    	else if(leixing == "commodityList"){
							    		operation = "<a href='#' onclick=xqGoodGroup('"+sub+"','"+ind+"','"+size+"','"+id+"','"+goods_number_type+"')>选取</a>";
							    	}
								    return operation;
							      }
							  },
							  {
								    "targets": [3],
								    "data":"commodity_group_url",
								    "visible": false 
							  }	
	                     ],
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/group/queryGroupPageList.action",
	                         "dataType":"json",
	                       // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
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
 * 编辑微页面的文本导航，选择商品及分类调用
 */
function xqGoodsOfTextnav(title,commodity_group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'		<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'			商品标签          '
		+'			<em class="link-to-title-text">'+title+'</em>'
		+'			</span> '
		+'		</a> '
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTextnav(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnav(this,1)">微页面及分类</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnav(this,1)">商品及分类</a>'
		+'			</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+commodity_group_url+'">'

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
 * 编辑微页面的图片导航，选择商品及分类调用
 */
function xqGoodsOfNav(title,commodity_group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success"> '
		+'					商品标签  '
		+'					<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a>'
		+'			<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateNav(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageNav(this,1)">微页面及分类</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupNav(this,1)">商品及分类</a>'
		+'			</li>'
		+'			</ul> '
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+commodity_group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("navControls_"+num).innerHTML = str;
			
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 编辑微页面的标题，选择商品及分类调用
 */
function xqGoodsOfTitle(title,commodity_group_url,ind){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'<input type="radio" name="wx_title_link_type" value="1" checked>其他链接 '
		+'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'		<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				商品标签     '
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li> '
		+'				<a class="js-modal-magazine 1" data-type="feature" href="javascript:void(0);" id="xzWym">微页面及分类</a> '
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  id="xzShp">商品及分类</a> '
		+'			</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="wx_link_url" value="'+commodity_group_url+'">'
		
		//改变原来div中的内容
		var modality = parentPage.document.getElementById("modality");
		var div1 = $(modality).children().eq(ind).find(".control-group").eq(13).find(".controls label");
		div1.html(str);
		
		//关闭弹窗
		parent.layer.closeAll();
		
}




/**
 * 微页面标题里的文本导航,选择商品及分类
 */
function xqGoodsOfTitle_Textnav(title,commodity_group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'		<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				商品标签           '
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle_textNav(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,1)">微页面及分类</a>'
		+'		</li>'
		+'		<li>'
		+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,1)">商品及分类</a>'
		+'		</li> '
		+'		</ul> '
		+'		</div>'
		+'		</div> '
		+'	<input type="hidden" name="link_url" value="'+commodity_group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("titleControls_"+num).innerHTML = str;
		
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面的图片广告,选择商品及分类
 */
function xqGoodsOfImageAd(title,commodity_group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix"> '
		+'		<div class="pull-left js-link-to link-to">'
		+'		<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'			商品标签           '
		+'			<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateImageAd(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a> '
		+'		<ul class="dropdown-menu">'
		+'		<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageImageAd(this,1)">微页面及分类</a>'
		+'		</li>'
		+'		<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupImageAd(this,1)">商品及分类</a>'
		+'		</li>'
		+'		</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+commodity_group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("imageAdControls_"+num).innerHTML = str;
		
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面的橱窗,选择商品及分类
 */
function xqGoodsOfShowcase(title,commodity_group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'			<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'				<span class="label label-success"> '
		+'				商品标签           '
		+'				<em class="link-to-title-text">'+title+'</em>'
		+'				</span>'
		+'			</a> '
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateShowcase(this)">×</a>'
		+'		</div>'
		+'	<div class="dropdown hover pull-right">'
		+'		<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'		<ul class="dropdown-menu">'
		+'		<li> '
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageShowcase(this,1)">微页面及分类</a>'
		+'		</li> '
		+'		<li>  '
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupShowcase(this,1)">商品及分类</a>'
		+'		</li>'
		+'		</ul>'
		+'		</div>'
		+'		</div>'
		+'		<input type="hidden" name="link_url" value="'+commodity_group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("showcaseControls_"+num).innerHTML = str;
		
		//关闭弹窗
		parent.layer.closeAll();
}



/**
 * 微页面魔方,选择商品及分类
 */
function xqGoodsOfCube(title,commodity_group_url,num){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	
	var str = 
		'	<div class="control-action clearfix">'
		+'		<div class="pull-left js-link-to link-to">'
		+'		<a href="'+commodity_group_url+'" target="_blank" class="new-window link-to-title">'
		+'			<span class="label label-success">'
		+'				商品标签         '
		+'			<em class="link-to-title-text">'+title+'</em>'
		+'			</span>'
		+'		</a>'
		+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateCube(this)">×</a>'
		+'		</div>'
		+'		<div class="dropdown hover pull-right">'
		+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:" onclick="chooseWebpageCube(this,1)">微页面及分类</a>'
		+'			</li>'
		+'			<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:" onclick="chooseGoodsAndGroupCube(this,1)">商品及分类</a>'
		+'			</li>'
		+'			</ul>'
		+'</div>'
		+'</div>'
		+'<input type="hidden" name="link_url" value="'+commodity_group_url+'">'

		//改变原来div中的内容
		parentPage.document.getElementById("cubeControls_"+num).innerHTML = str;
		//给左边的图片加上超链接地址
		parentPage.document.getElementById("cubeImage_"+num).href = commodity_group_url;
		//关闭弹窗
		parent.layer.closeAll();
}


/**
 * 微页面商品列表选择商品分组
 */
function xqGoodGroup(title,ind,size,id,goods_number_type){
	//获取父页面
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	var str = 
		'  <div class="control-action clearfix">'
		+'    <div class="pull-left link-to">'
		+'      <a href="javascript:;" class="link-to-title">'
		+'        <span class="label label-success">'
		+'        商品标签'
		+'        <em class="link-to-title-text">'+title+'</em>'
		+'        </span>'
		+'      </a>'
		+'     </div>'
		+'     <a href="javascript:;" class="pull-right js-add-goods commodityList">修改</a>'
		+'  </div>'
		+'  <p class="help-desc">选择商品来源后，左侧实时预览暂不支持显示其包含的商品数据</p>';
	
	//改变原来div中的内容
	var modality = parentPage.document.getElementById("modality");
	var div1 = $(modality).children().eq(ind).find(".control-group-one .controls");
	div1.html(str);
	
	var idArr = []; //商品id数组
	//ajax获得该商品分组下的商品，并追加到ul中
	$.ajax({
        url : getRootPath()+"/commodity/queryCommodityByGroup.action",
        type : "post",
        dataType:"json",
        data:{"commodity_group_id":id,"size":goods_number_type},
        success : function (data) {
        	if(data!=null){
        		 var commodityList = data.commodityList;
        		 for(var i=0;i<commodityList.length;i++){
        			 //拼装商品id数组
        			 idArr.push(commodityList[i].commodity_id)
        		 }
        	}
        	//调用父页面的获得商品图片的方法
    		parentPage.query_goods1(idArr,size,ind);
    		parent.layer.closeAll();
        }
    })
}
