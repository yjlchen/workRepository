//全局变量
var textnav_count = 0;
var text_nav = function(){
	this.left = 
		'	<div class="app-field clearfix editing module_div">'
		+'	<div class="control-group">'
		+'		<ul class="custom-nav clearfix" id="firstul">'
		+'			<li>'
		+'				<a class="clearfix" href="javascript:void(0);">'
		+'					<span class="custom-nav-title">点此添加一个『文本导航』</span><i class="pull-right right-arrow"></i>'
		+'				</a>'
		+'			</li>'
		+'		</ul>'
		+'		<ul class="custom-nav clearfix js-custom-nav" id="secondul"></ul>'
		+'		<div class="component-border"></div>'
		+'	</div>'
		+'	<div class="actions">'
		+'	<div class="actions-wrap">'
		//+'		  <span class="action edit">编辑</span>'
		//+'		  <span class="action add">加内容</span>'
		+'		 	  <span class="action delete">删除</span>'
		+'	</div>'
		+'	</div>'
		+'	<div class="sort">'
		+'		<i class="sort-handler"></i>'
		+'	</div>'
		+'	</div>'	
		
		
   this.right = 	
	   '	<div class="app-sidebar">'
	   +'		<div class="arrow"></div>'
	   +'		<div class="app-sidebar-inner js-sidebar-region"><div>'
	   +'		<form class="form-horizontal" novalidate="">'
	   +'		<div class="control-group js-collection-region">'
	   +'			<ul class="choices ui-sortable" style="margin:0"></ul>'
	   +'		</div>'
	   +'		<div class="control-group options" style="display: block;">'
	   +'			<a class="add-option js-add-option" id="addTextnav" href="javascript:void(0);"><i class="icon-add"></i>添加一个文本导航</a>'
	   +'		</div>'
	   +'	</form>'
	   +'	</div>'
	   +'	</div>'
	   +'	</div>'
}


	//添加一个文本导航
	$(modality).on("click","#addTextnav",function(){
	    var ind=$(this).parents("div.app-sidebar").index();
	    $(module.children()[ind]).find(".control-group #firstul").remove();
	    //左边添加
	    $(module.children()[ind]).find(".control-group #secondul")
	    .append('<li id="left_textnavli'+textnav_count+'"><a class="clearfix" href="javascript:;"><span class="custom-nav-title"></span><i class="pull-right right-arrow"></i></a></li>');
	    //右边添加
	    var str = 
	    	'	<li class="choice" id="textnavli'+textnav_count+'">'
	    	+'	<div class="control-group">'
	    	+'		<label class="control-label"><em class="required">*</em>导航名称：</label>'
	    	+'		<div class="controls" style="margin-left: 10px;">'
	    	+'			<input type="text" name="title" value="" onblur="changeLeftnav1(this)" id="title'+textnav_count+'">'
	    	+'		</div>'
	    	+'	</div>'
	    	+'	<div class="control-group">'
	    	+'		<label class="control-label"><em class="required">*</em>链接到：</label>'
	    	+'		<div class="controls" style="margin-left: 10px;" id="textnavControls_'+textnav_count+'">'
	    	+'		<div class="dropdown hover">'
	    	+'			<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
	    	+'			<ul class="dropdown-menu">'
	    	+'			<li>'
	    	+'				<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnav(this,0)">微页面</a>'
	    	+'			</li>'
	    	+'			<li>'
	    	+'				<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnav(this,0)">商品</a>'
	    	+'			</li>'
	    	+'          <li>     '
	        +'              <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
	        +'          </li>    '
	    	+'			</ul>'
	    	+'		</div>'
	    	+'		<input type="hidden" name="link_url">'
	    	+'		</div>'
	    	+'	</div>'
	    	+'	<div class="actions">'
	    	+'		<span class="action add close-modal" title="添加" onclick="add(this)">+</span> '
	    	+'		<span class="action delete close-modal" title="删除" onclick="deleteli(this)">×</span>'
	    	+'	</div>'
	    	+'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none">'
	        +'  	<div class="popover-content">'
	        +'      	<div class="form-inline">'
	        +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
	        +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
	        +'                 onclick=textnav_wl_queding(this,"'+textnav_count+'") data-loading-text="确定"> 确定</button>'
	        +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
	        +'      	</div>'
	        +'  	</div>'
	        +'	</div>'
	    	+'	</li>'	
	    $(modality.children()[ind]).find(".control-group .choices").append(str);
	    textnav_count++;
	});
	
	
//点击+号增加
function add(obj){
	var ind=$(obj).parents("div.app-sidebar").index();
	 //左边添加
    $(module.children()[ind]).find(".control-group #secondul")
    .append('<li id="left_textnavli'+textnav_count+'"><a class="clearfix" href="javascript:;"><span class="custom-nav-title"></span><i class="pull-right right-arrow"></i></a></li>');
    //右边添加
    var str = 
    	'	<li class="choice" id="textnavli'+textnav_count+'">'
    	+'	<div class="control-group">'
    	+'		<label class="control-label"><em class="required">*</em>导航名称：</label>'
    	+'		<div class="controls" style="margin-left: 10px;">'
    	+'			<input type="text" name="title" value="" onblur="changeLeftnav1(this)" id="title'+textnav_count+'">'
    	+'		</div>'
    	+'	</div>'
    	+'	<div class="control-group">'
    	+'		<label class="control-label"><em class="required">*</em>链接到：</label>'
    	+'		<div class="controls" style="margin-left: 10px;" id="textnavControls_'+textnav_count+'">'
    	+'		<div class="dropdown hover">'
    	+'		<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'		<ul class="dropdown-menu">'
    	+'		<li>'
    	+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnav(this,0)">微页面</a>'
    	+'		</li>'
    	+'		<li>'
    	+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnav(this,0)">商品</a>'
    	+'		</li>'
    	+'      <li>'
        +'        <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
    	+'			</ul>'
    	+'		</div>'
    	+'			<input type="hidden" name="link_url">'
    	+'		</div>'
    	+'	</div>'
    	+'	<div class="actions">'
    	+'		<span class="action add close-modal" title="添加" onclick="add(this)">+</span> '
    	+'      <span class="action delete close-modal" title="删除" onclick="deleteli(this)">×</span>'
    	+'	</div>'
    	+'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none">'
        +'  	<div class="popover-content">'
        +'      	<div class="form-inline">'
        +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
        +'                 onclick=textnav_wl_queding(this,"'+textnav_count+'") data-loading-text="确定"> 确定</button>'
        +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      	</div>'
        +'  	</div>'
        +'	</div>'
    	+'	</li>'	
    $(modality.children()[ind]).find(".control-group .choices").append(str);
    textnav_count++;
}

//点击叉号删除
function deleteli(obj){
	var ind = $(obj).parents("div.app-sidebar").index();
	var thisli = $(obj).parent().parent();
	//获得当前li的id
	var id = thisli.attr("id");
	//删除左边的li
	$(module.children()[ind]).find(".control-group #secondul #"+id+"").remove();
	//删除右边的li
	$(modality.children()[ind]).find(".control-group .choices #"+id+"").remove();
}

//右侧导航名称变化时，左侧也变化   blur事件
function changeLeftnav1(obj){
	//获得当前文本框的值
	var text = $(obj).val();
	//获得当前li的id
	var thisli = $(obj).parent().parent().parent();
	var id = "left_"+thisli.attr("id");
	//给左边的span赋上文本框的值
	$("ul.js-custom-nav").find("#"+id).find("a span").html(text);
}


//弹出选择微页面及分类的列表
function chooseWebpageTextnav(obj,flag){
	var controls = "";
	//获得变化的div
	if(flag=="0"){
		controls = $(obj).parent().parent().parent().parent();
	}else if(flag=="1"){
		controls = $(obj).parent().parent().parent().parent().parent();
	}
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  id:100,
			  area: ['800px', '500px'],
			  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?num='+num+'&leixing=pageinfoOfTextnav'
		  });

	})
}



//弹出选择商品及分类的列表
function chooseGoodsAndGroupTextnav(obj,flag){
	var controls = "";
	//获得变化的div
	if(flag=="0"){
		controls = $(obj).parent().parent().parent().parent();
	}else if(flag=="1"){
		controls = $(obj).parent().parent().parent().parent().parent();
	}
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  area: ['800px', '530px'],
			  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?num='+num+'&leixing=goodsOfTextnav'
		  });

	})
}



//修改时点击叉号删除
function deleteUpdateTextnav(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//追加上原有的内容
	var str = 
		'<div class="dropdown hover">'
    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'	<ul class="dropdown-menu">'
    	+'	<li>'
    	+'	<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageTextnav(this,0)">微页面</a>'
    	+'	</li>'
    	+'	<li>'
    	+'	<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  onclick="chooseGoodsAndGroupTextnav(this,0)">商品</a>'
    	+'	</li>'
    	+'  <li>'
        +'   <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
    	+'	</ul>'
    	+'</div>'
    	+'<input type="hidden" name="link_url">'
    
    controls.html(str);
}


//点击确定
function textnav_wl_queding(obj,jishu){
	//获得文本框中的值
	var lianjie = $(obj).prev().val();
	if(""!=lianjie){
		var str = 
			'	<div class="control-action clearfix">'
			+'	<div class="pull-left js-link-to link-to">'
			+'		<a href="'+lianjie+'" target="_blank" class="new-window link-to-title" >'
			+'			<span class="label label-success">'
			+'				  外链'
			+'				<em class="link-to-title-text">'+lianjie+'</em>'
			+'			</span>'
			+'		</a>'
			+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTextnav(this)">×</a>'
			+'	</div>'
			+'	<div class="dropdown hover pull-right">'
			+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
			+'		<ul class="dropdown-menu">'
			+'		<li>'
			+'		<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageTextnav(this,1)">微页面</a>'
			+'		</li>'
			+'		<li>'
			+'		<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupTextnav(this,1)">商品</a>'
			+'		</li>'
			+'      <li>'
	        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
	        +'      </li>'
			+'		</ul>'
			+'	</div>'
			+'	</div>'
			+'	<input type="hidden" name="link_url" value="'+lianjie+'">'
		
			//改变原来div中的内容
			$("#textnavControls_"+jishu).html(str);
			//获得导航标题文本框对象
			var thisli = $("#title"+jishu).parent().parent().parent();
			//获得当前li的id
			var id = "left_"+thisli.attr("id");
			//改变左边的li下的a的href
			$("ul.js-custom-nav").find("#"+id).find("a").attr("href",lianjie);
			
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}


//链接到  显示
$(modality).on("mouseenter","div.js-collection-region .control-group div.dropdown",function(){
	$(this).children(".dropdown-menu").show();
});
//链接到  隐藏
$(modality).on("mouseleave","div.js-collection-region .control-group div.dropdown",function(){
	$(this).children(".dropdown-menu").hide();
});

