var link = function (){
	this.left = 
		'<div class="app-field clearfix editing module_div">'
		+'		<div class="control-group">'
		+'		<ul class="custom-link clearfix" id="appendLinkul"></ul>'
		+'		<div class="component-border"></div>'
		+'	</div>'
		+'	<div class="actions">'
		+'	<div class="actions-wrap">'
		//+'		  <span class="action edit">编辑</span>'
		//+'		  <span class="action add">加内容</span>'
		+'		  <span class="action delete">删除</span>'
		+'	</div>'
		+'	</div>'
		+'	<div class="sort">'
		+'		<i class="sort-handler"></i>'
		+'	</div>'
		+'</div>'
	

	this.right =
		'	<div class="app-sidebar">'
		+'	<div class="arrow"></div>'
		+'	<div class="app-sidebar-inner js-sidebar-region"><div>'
		+'	<form class="form-horizontal" novalidate="">'
		+'		<div class="control-group js-collection-region">'
		+'		<ul class="choices ui-sortable">'
		+'		<li class="choice">'
		+'		<div class="control-group">'
		+'		<label class="control-label"><em class="required">*</em>内容来源：</label>'
		+'		<div class="controls" style="margin-left: 10px;">'
		+'		<div class="dropdown hover">'
		+'		<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
		+'				<ul class="dropdown-menu">'
		+'					<li>'
		+'					<a class="js-modal-category 0" data-type="category" href="javascript:void(0);" id="uuuu">微页面分类</a>'
		+'					</li>'
		+'					<li>'
		+'					<a class="js-modal-tag" data-type="tag" href="javascript:void(0);" id="commodityLabel">商品标签</a>'
		+'					</li>'
		+'					<li>'
		+'					<a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
		+'					</li>'
		+'				</ul>'
		+'			</div>'
		+'			<input type="hidden" name="source_url">'
		+'			</div>'
		+'			</div>'
		+'			<div class="actions">'
		+'				<span class="action delete close-modal" title="删除" onclick="deleteLink(this)">×</span>'
		+'			</div>'
		+'			</li>'
		+'			</ul>'
		+'			</div>'
		+'		</form>'
		+'		</div>'
		+'	 </div>'
		+'</div>'

}


		
		//弹出选择微页面分类的列表
		$(modality).on("click","#uuuu",function(){
		    var ind = $(this).parents("div.app-sidebar").index();
			layui.use(['form','element'], function(){ 
			  var form = layui.form(),
				  element = layui.element(),
				  layer = layui.layer;
			      form.render();
				  parent.layer.open({
					  title:"微页面分类",
					  type: 2,
					  id:100,
					  area: ['800px', '500px'],
					  content: getRootPath()+'/commons/jsp/com_onlyPageinfoTypeChooseList.jsp?ind='+ind+'&leixing=link'
				  });
			})
		});
		
		
		
		//弹出选择商品分组的列表
		$(modality).on("click","#commodityLabel",function(){
		    var ind = $(this).parents("div.app-sidebar").index();
			layui.use(['form','element'], function(){ 
			  var form = layui.form(),
				  element = layui.element(),
				  layer = layui.layer;
			      form.render();
				  parent.layer.open({
					  title:"商品分组",
					  type: 2,
					  id:100,
					  area: ['800px', '500px'],
					  content: getRootPath()+'/commons/jsp/com_goodsGroup.jsp?ind='+ind+'&leixing=link'
				  });
			})
		});
		
		
		
		
		//点击叉号删除
		function deleteLink(obj){
			var ind = $(obj).parents("div.app-sidebar").index();
			//右边删除
			$(modality.children()[ind]).remove();
			//左边删除
			$(module.children()[ind]).remove();
		}
		
		
		
		//关联链接——显示条数——下拉列表条数改变时，左边ul的li的个数相应改变
		function linkChange(obj,ind,title){
			var selectedVal = $(obj).val();
			//获得左侧原先的ul
			var leftUl = $(module.children()[ind]).find(".control-group #appendLinkul");
			//先把原先ul的li清空
			leftUl.find("li").remove();
			//再追加上相应个数的li
			for(var j=0;j<selectedVal;j++){
				var appendli = 
					'<li>'
					+'	<a href="javascript:;" class="custom-link-link">'
					+'		<h3 class="title">'
					+'			第'+(j+1)+'条 '+title+' 的『关联链接』  '
					+'		</h3>'
					+'		<i class="pull-right right-arrow"></i>'
					+'	</a>'
					+'</li>'
					leftUl.append(appendli);
			}
		}
		
		
		
		