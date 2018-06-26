//全局变量
var nav_count = 0;
var nav = function (){
	this.left = 
		'	<div class="app-field clearfix editing module_div">'
		+'		<div class="control-group">'
		+'			<ul class="custom-nav-4 clearfix" style="margin: 0 0 0 0;">'
		+'				<li id="navli'+nav_count+'"><a href="javascript:;">'
		+'					<span class="nav-img-wap">'
		+'						<img src="">'
		+'					</span> <span class="title"></span>'
		+'				</a></li>'
		+'				<li id="navli'+(nav_count+1)+'"><a href="javascript:;">'
		+'					<span class="nav-img-wap">'
		+'						<img src="">'
		+'					</span> <span class="title"></span>'
		+'				</a></li>'
		+'				<li id="navli'+(nav_count+2)+'"><a href="javascript:;">'
		+'					<span class="nav-img-wap">'
		+'						<img src="">'
		+'					</span> <span class="title"></span>'
		+'				</a></li>'
		+'				<li id="navli'+(nav_count+3)+'"><a href="javascript:;">'
		+'					<span class="nav-img-wap">'
		+'						<img src="">'
		+'					</span> <span class="title"></span>'
		+'				</a></li>'
		+'			</ul>'
		+'			<div class="component-border"></div>'
		+'		</div>'
		+'		<div class="actions">'
		+'			<div class="actions-wrap">'
		//+'		  <span class="action edit">编辑</span>'
		//+'		  <span class="action add">加内容</span>'
		+'		 	  <span class="action delete">删除</span>'
		+'			</div>'
		+'		</div>'
		+'		<div class="sort">'
		+'			<i class="sort-handler"></i>'
		+'		</div>'
		+'	</div>'
		
	this.right = 
		'<div class="app-sidebar">'
		+'	<div class="arrow"></div>'
		+'	<div class="app-sidebar-inner js-sidebar-region">'
		+'	<div><form class="form-horizontal" novalidate="">'
		+'	<div class="js-collection-region">'
		+'	<ul class="choices ui-sortable" style="margin: 0 0 0 0;">'
		+'		<li class="choice" id="navli'+nav_count+'">'
		+'		<div class="choice-image">'
		+'		<a class="add-image js-trigger-image" href="javascript:;" onclick="addNavPho(1,this)" ><i class="icon-add"></i>  添加图片</a>'
		+'		<!-- for error msg -->'
		+'		<div class="control-group">'
		+'			<div class="controls" >'
		+'				<input type="hidden" name="image_url">'
		+'			</div>'
		+'			</div>'
		+'			</div>'
		+'		<div class="choice-content">'
		+'			<div class="control-group">'
		+'			<label class="control-label">文字：</label>'
		+'			<div class="controls" style="margin-left: 0px;">'
		+'				<input class="" type="text" name="title" value="" maxlength="5" onblur="changeLeftnav(this)">'
		+'			</div>'
		+'			</div>'
		+'			<div class="control-group">'
		+'			<label class="control-label">链接：</label>'
		+'			<div class="controls" style="margin-top: 5px;margin-left:0px" id="navControls_'+nav_count+'">'
		+'			<input type="hidden" name="link_url">'
		+'			<div class="dropdown hover">'
		+'			<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'				<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,0)" >微页面</a>'
		+'				</li>'
		+'				<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  onclick="chooseGoodsAndGroupNav(this,0)">商品</a>'
		+'				</li>'
		+'       		<li>'
        +'         			<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       		</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'	</div>'
		+'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  	<div class="popover-content">'
        +'      	<div class="form-inline">'
        +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" ' 
        +' 			 		onclick=nav_wl_queding(this,"'+nav_count+'") data-loading-text="确定"> 确定</button>'
        +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      	</div>'
        +'  	</div>'
        +'	</div>'
		+'	</li>'
		+'	<li class="choice" id="navli'+(nav_count+1)+'">'
		+'		<div class="choice-image">'
		+'		<a class="add-image js-trigger-image" href="javascript:;" onclick="addNavPho(1,this)"><i class="icon-add"></i>添加图片</a>'
		+'		<!-- for error msg --> '
		+'		<div class="control-group">'
		+'		<div class="controls">'
		+'		<input type="hidden" name="image_url">'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'		<div class="choice-content">'
		+'		<div class="control-group">'
		+'		<label class="control-label">文字：</label>'
		+'		<div class="controls" style="margin-left: 0px;">'
		+'		<input class="" type="text" name="title" value="" maxlength="5" onblur="changeLeftnav(this)">'
		+'		</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'			<label class="control-label">链接：</label>'
		+'			<div class="controls" style="margin-top: 5px;margin-left:0px" id="navControls_'+(nav_count+1)+'">'
		+'			<input type="hidden" name="link_url">'
		+'			<div class="dropdown hover">'
		+'			<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'				<ul class="dropdown-menu">'
		+'					<li>'
		+'					<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageNav(this,0)" >微页面</a>'
		+'					</li>'
		+'					<li>'
		+'					<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupNav(this,0)">商品</a>'
		+'					</li>'
		+'       			<li>'
        +'         				<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       			</li>'
		+'				</ul>'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'  	<div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  		<div class="popover-content">'
        +'      		<div class="form-inline">'
        +'          		<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
	    +'          		<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" ' 
	    +' 			 			onclick=nav_wl_queding(this,"'+(nav_count+1)+'") data-loading-text="确定"> 确定</button>'
	    +'          		<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      		</div>'
        +'  		</div>'
        +'		</div>'
		+'	</li>'
		+'	<li class="choice" id="navli'+(nav_count+2)+'">'
		+'		<div class="choice-image">'
		+'		<a class="add-image js-trigger-image" href="javascript:;" onclick="addNavPho(1,this)"><i class="icon-add"></i>添加图片</a>'
		+'		<!-- for error msg -->'
		+'		<div class="control-group">'
		+'		<div class="controls">'
		+'			<input type="hidden" name="image_url">'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'		<div class="choice-content">'
		+'		<div class="control-group">'
		+'		<label class="control-label">文字：</label>'
		+'		<div class="controls" style="margin-left: 0px;">'
		+'		<input class="" type="text" name="title" value="" maxlength="5" onblur="changeLeftnav(this)">'
		+'		</div>'
		+'		</div>'
		+'		<div class="control-group">'
		+'		<label class="control-label">链接：</label>'
		+'		<div class="controls" style="margin-top: 5px;margin-left:0px" id="navControls_'+(nav_count+2)+'">'
		+'		<input type="hidden" name="link_url">'
		+'		<div class="dropdown hover">'
		+'		<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'				<li>'
		+'				<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,0)">微页面</a>'
		+'				</li>'
		+'				<li>'
		+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  onclick="chooseGoodsAndGroupNav(this,0)">商品</a>'
		+'				</li>'
		+'       		<li>'
        +'         			<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       		</li>'
		+'			</ul>'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'		</div>'
		+'  	<div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  		<div class="popover-content">'
        +'      		<div class="form-inline">'
        +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" ' 
        +' 			 		onclick=nav_wl_queding(this,"'+(nav_count+2)+'") data-loading-text="确定"> 确定</button>'
        +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      		</div>'
        +'  		</div>'
        +'		</div>'
		+'	</li>'
		+'	<li class="choice" id="navli'+(nav_count+3)+'">'
		+'		<div class="choice-image">'
		+'		<a class="add-image js-trigger-image" href="javascript:;" onclick="addNavPho(1,this)"><i class="icon-add"></i>  添加图片</a>'
		+'		 <!-- for error msg -->'
		+'			<div class="control-group">'
		+'			<div class="controls">'
		+'			<input type="hidden" name="image_url">'
		+'			</div>'
		+'			</div>'
		+'			</div>'
		+'			<div class="choice-content">'
		+'			<div class="control-group">'
		+'			<label class="control-label">文字：</label>'
		+'			<div class="controls" style="margin-left: 0px;">'
		+'			<input class="" type="text" name="title" value="" maxlength="5" onblur="changeLeftnav(this)">'
		+'			</div>'
		+'	</div>'
		+'	<div class="control-group">'
		+'		<label class="control-label">链接：</label>'
		+'		<div class="controls" style="margin-top: 5px;margin-left:0px" id="navControls_'+(nav_count+3)+'">'
		+'			<input type="hidden" name="link_url">'
		+'			<div class="dropdown hover">'
		+'			<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'			<ul class="dropdown-menu">'
		+'			<li>'
		+'			<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,0)" >微页面</a>'
		+'			</li>'
		+'			<li>'
		+'			<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  onclick="chooseGoodsAndGroupNav(this,0)">商品</a>'
		+'			</li>'
		+'       	<li>'
        +'         		<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'       	</li>'
		+'			</ul>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'	</div>'
		+'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none;z-index:100;">'
        +'  	<div class="popover-content">'
        +'      <div class="form-inline">'
        +'          <input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          <button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" ' 
        +' 			 onclick=nav_wl_queding(this,"'+(nav_count+3)+'") data-loading-text="确定"> 确定</button>'
        +'          <button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
        +'      	</div>'
        +'  	</div>'
        +'	</div>'
		+'	</li>'
		+'</ul></div>'
		+'</form>'
		+'</div></div>'
		+' </div>'

		nav_count+=4;
}


//左侧导航名称变化时，右侧也变化   blur事件
function changeLeftnav(obj){
	//获得当前文本框的值
	var text = $(obj).val();
	//获得当前li的id
	var thisli = $(obj).parent().parent().parent().parent();
	var id = thisli.attr("id");
	//给左边的span赋上文本框的值
	$("#"+id).find("a span:eq(1)").html(text);
}


//弹出选择微页面及分类的列表
function chooseWebpageNav(obj,flag){
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
			  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?num='+num+'&leixing=pageinfoOfNav'
		  });

	})
}


//弹出选择商品及分类的列表
function chooseGoodsAndGroupNav(obj,flag){
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
			  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?num='+num+'&leixing=goodsOfNav'
		  });
	})
}



/**
 * 调用共用图片选择弹出框
 * @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
 */
function addNavPho(mutl_type,obj){
	//获得其父li的id
	var id  = $(obj).parent().parent().attr("id");
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?mutl_type='+mutl_type+'&liId='+id+'&b_fun=query_navpho'
		});
}



//获取图片选择页面传入的图片数组，插入到图片
function query_navpho(urlArr,liId){
	if( urlArr.length>0){
		for(var i=0;i<urlArr.length;i++){
			var url=urlArr[i];
			insert_navpho(url,liId);
		}
	}
}

//插入图片
function insert_navpho(url,liId){
	var str = 
		'    <img src="'+url+'" width="118" height="118" class="thumb-image">'
		+'    <a class="modify-image js-trigger-image" href="javascript: void(0);" style="color:#fff" onclick="addNavPho(1,this)">重新上传</a>'
		+'	  <div class="control-group">'
		+'		<div class="controls">'
		+'			<input type="hidden" name="image_url" value="'+url+'">'
		+'		</div>'
		+'	  </div>'

	//右边替换为图片
	$(".js-collection-region #"+liId+" .choice-image").html(str);
	//左边加上图片
	$(".control-group").find("#"+liId).find("a span:eq(0) img").attr("src",url);
}



//修改时点击叉号删除
function deleteUpdateNav(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//追加上原有的内容
	var str = 
		'	<div class="dropdown hover">'
    	+'		<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'		<ul class="dropdown-menu">'
    	+'		<li>'
    	+'			<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,0)">微页面</a>'
    	+'		</li>'
    	+'		<li>'
    	+'			<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupNav(this,0)">商品</a> '
    	+'		</li>'
    	+'      <li>'
        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'      </li>'
    	+'		</ul>'
    	+'	</div>'
    	+'	<input type="hidden" name="link_url">'
    
    controls.html(str);
}


//外链点击确定
function nav_wl_queding(obj,jishu){
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
			+'		<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateNav(this)">×</a>'
			+'	</div>'
			+'	<div class="dropdown hover pull-right">'
			+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
			+'		<ul class="dropdown-menu">'
			+'		<li>'
			+'		<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageNav(this,1)">微页面</a>'
			+'		</li>'
			+'		<li>'
			+'		<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupNav(this,1)">商品</a>'
			+'		</li>'
			+'      <li>'
	        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
	        +'      </li>'
			+'		</ul>'
			+'	</div>'
			+'	</div>'
			+'	<input type="hidden" name="link_url" value="'+lianjie+'">'
		
			//改变原来div中的内容
			$("#navControls_"+jishu).html(str);
			//获得当前父级li的id
			var liid = $("#navControls_"+jishu).parent().parent().parent().attr("id");
			//改变左边的li对象下的a的href
			$("#"+liid).find("a").attr("href",lianjie);
			
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}
