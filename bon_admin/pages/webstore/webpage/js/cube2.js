var cube_count = 0;
/**
 * 魔方js
 */
var cube2 = function (){
	this.left = 
		'	<div class="app-field clearfix editing module_div">' 
		+'		<div class="control-group custom-cube2-table">' 
		+'			<table>' 
		+'				<tbody>' 
		+'					<tr>' 
		+'					<td class="empty" data-x="0" data-y="0"></td>' 
		+'					<td class="empty" data-x="1" data-y="0"></td>' 
		+'					<td class="empty" data-x="2" data-y="0"></td>' 
		+'					<td class="empty" data-x="3" data-y="0"></td></tr>' 
		+'					<tr><td class="empty" data-x="0" data-y="1"></td>' 
		+'					<td class="empty" data-x="1" data-y="1"></td>' 
		+'					<td class="empty" data-x="2" data-y="1"></td>' 
		+'					<td class="empty" data-x="3" data-y="1"></td></tr>' 
		+'					<tr><td class="empty" data-x="0" data-y="2"></td>' 
		+'					<td class="empty" data-x="1" data-y="2"></td>' 
		+'					<td class="empty" data-x="2" data-y="2"></td>' 
		+'					<td class="empty" data-x="3" data-y="2"></td></tr>' 
		+'					<tr><td class="empty" data-x="0" data-y="3"></td>' 
		+'					<td class="empty" data-x="1" data-y="3"></td>' 
		+'					<td class="empty" data-x="2" data-y="3"></td>' 
		+'					<td class="empty" data-x="3" data-y="3"></td></tr>' 
		+'				</tbody>' 
		+'			</table>' 
		+'		</div>' 
		+'		<div class="actions">' 
		+'			<div class="actions-wrap">' 
		//+'				<span class="action edit">编辑</span>' 
		//+'				<span class="action add">加内容</span>' 
		+'				<span class="action delete">删除</span>' 
		+'			</div>' 
		+'		</div>' 
		+'		<div class="sort">' 
		+'			<i class="sort-handler"></i>' 
		+'		</div> ' 
		+'	</div>';
		
	this.right = 	
		'	<div class="app-sidebar">'
		+'		<div class="arrow"></div>'
		+'		<div class="app-sidebar-inner js-sidebar-region">'
		+'		<div>'
		+'		<form class="form-horizontal custom-cube2-table cube2-edit" novalidate="">'
		+'		<div class="control-group layout-map">'
		+'			<label class="control-label">布局：</label>'
		+'			<div class="controls" style="margin:0;" name="layout_map">'
		+'				<table class="mofang">'
		+'					<tbody>'
		+'						<tr>'
		+'						<td class="empty" data-x="0" data-y="0"></td>'
		+'						<td class="empty" data-x="1" data-y="0"></td>'
		+'						<td class="empty" data-x="2" data-y="0"></td>'
		+'						<td class="empty" data-x="3" data-y="0"></td>'
		+'						</tr>'
		+'						<tr>'
		+'						<td class="empty" data-x="0" data-y="1"></td>'
		+'						<td class="empty" data-x="1" data-y="1"></td>'
		+'						<td class="empty" data-x="2" data-y="1"></td>'
		+'						<td class="empty" data-x="3" data-y="1"></td>'
		+'						</tr>'
		+'						<tr>'
		+'						<td class="empty" data-x="0" data-y="2"></td>'
		+'						<td class="empty" data-x="1" data-y="2"></td>'
		+'						<td class="empty" data-x="2" data-y="2"></td>'
		+'						<td class="empty" data-x="3" data-y="2"></td>'
		+'						</tr>'
		+'						<tr>'
		+'						<td class="empty" data-x="0" data-y="3"></td>'
		+'						<td class="empty" data-x="1" data-y="3"></td>'
		+'						<td class="empty" data-x="2" data-y="3"></td>'
		+'						<td class="empty" data-x="3" data-y="3"></td>'
		+'						</tr>'
		+'					</tbody>'
		+'				</table>'
		+'				<p class="help-desc">点击 + 号添加内容</p>'
		+'			</div>'
		+'		</div>'
		+'		</form>'
		+'<div class="control-group js-item-region" style="display:none">'
		+'    <ul class="choices" style="margin:0;"></ul>'
		+'</div>'
		+'</div>'
		+'</div>'
		+'<div class="modal hide fade in" aria-hidden="false" style="display: none; top: 284.5px;"><div class="modal-header">'
		+'    <a class="close" data-dismiss="modal">×</a>'
		+'    <ul class="module-nav modal-tab">'
		+'        <li class="active hide">'
		+'            <h4>选择布局</h4>'
		+'        </li>'
		+'    </ul>'
		+'	</div>'
		+'    <div class="modal-body clearfix layout-table" style="width:260px;margin:0 auto;">'
		+'        <ul class="layout-cols layout-cols-1" style="margin:0;">'
		+'            <li data-cols="1" data-rows="1" class="selected"></li>'
		+'            <li data-cols="1" data-rows="2" class="selected"></li>'
		+'            <li data-cols="1" data-rows="3" class="selected"></li>'
		+'            <li data-cols="1" data-rows="4" class="selected"></li>'
		+'        </ul>'
		+'        <ul class="layout-cols layout-cols-2" style="margin:0;">'
		+'            <li data-cols="2" data-rows="1" class="selected"></li>'
		+'            <li data-cols="2" data-rows="2" class="selected"></li>'
		+'            <li data-cols="2" data-rows="3" class="selected"></li>'
		+'            <li data-cols="2" data-rows="4" class="selected"></li>'
		+'        </ul>'
		+'        <ul class="layout-cols layout-cols-3" style="margin:0;">'
		+'            <li data-cols="3" data-rows="1" class="selected"></li>'
		+'            <li data-cols="3" data-rows="2" class="selected"></li>'
		+'            <li data-cols="3" data-rows="3" class="selected"></li>'
		+'            <li data-cols="3" data-rows="4" class="selected"></li>'
		+'        </ul>'
		+'        <ul class="layout-cols layout-cols-4" style="margin:0;">'
		+'            <li data-cols="4" data-rows="1"></li>'
		+'            <li data-cols="4" data-rows="2"></li>'
		+'            <li data-cols="4" data-rows="3"></li>'
		+'            <li data-cols="4" data-rows="4"></li>'
		+'        </ul>'
		+'    </div>'
		+'</div>'
		+'	</div>';
		
}
//点击弹出
function text(){
	//设置公共变量
    var zx,zy,$this,data_index=0,jishu=0;
    //修改时，在之前最大的jishu上+1，保证不会重复
    var td=$("td.not-empty");
    if(td.length==0){
    	jishu=0;
    }else{
		var td_i=[];
		for(var x=0;x<td.length;x++){
			var id=$(td[x]).attr("jishu");
			td_i.push(id);
		}
		var max=0;
		for(var y=0;y<td_i.length;y++){
			if(max>=td_i[y]){
				max=max;
			}else{
				max=td_i[y];
			}
		}
		jishu+=Number(max)+1;
    }
    //点击加号弹出窗口，并进行能选择的li列表显示
    $(modality).on("click",".mofang td",function(){
    	//声明当前操作的是 modality 第几个元素
    	var ind=$(this).parents("div.app-sidebar").index();
    	//声明当前操作的是哪个元素
    	var this_index=$(this).index();
    	//判断当前元素是否是第一次点击
    	if($(this).attr("data-x")){
    		//声明两个变量 tx，ty
	    	var tx,ty;
	    	//设置当前操作元素为公共元素
	    	$this=$(this);
	    	//获取当前操作元素的data-x与data-y的值
	        zx=$(this).attr("data-x");
	        zy=$(this).attr("data-y");
	        //弹出窗口显示
	        $(modality.children()[ind]).find(".modal").css("display","block");
	        //弹出窗口里面的所有li全部隐藏
	        $(modality.children()[ind]).find(".modal .modal-body>ul>li").css("display","none");
	        //获取弹出窗口的所有li
	        var modal_li=$(modality.children()[ind]).find(".modal .modal-body>ul>li");
	        //所有li恢复到去除Class类（selscted）
	        modal_li.removeClass("selected");
	        //获取魔方下面的tr
	        var tr=$(modality.children()[ind]).find(".mofang tr");
	        //进入循环从当前元素所在行开始循环
	        for(var a=zy;a<tr.length;a++){
	        	//获取当前行下所有的td
	        	var td=$(tr[a]).children();
	        	//进入循环从当前元素开始循环
	        	for(b=zx;b<tr.length;b++){
	        		//获取当前循环元素的data-x与data-y的值
	        		tx=$(td[b]).attr("data-x");
	        		ty=$(td[b]).attr("data-y");
	        		//如果此时的td的data-x的值为空或undefined则与其index值相同的兄弟的data-x的值变为空并且推出循环
	                if(tx===undefined||tx==""){
	                	var index=$(td[b]).index();
	                	var tr_td=$(td[b]).parent("tr").siblings();
	                	for(var c=0;c<tr_td.length;c++){
	                		$($(tr_td[c]).children()[index]).attr("data-x","");
	                	}
	                	break;
	                	//否则就让与这个td相对应的modal的li显示
	                }else if(ty>=zy&&tx>=zx){
	                	tx=parseInt(tx)+1;
	                	ty=parseInt(ty)+1;
	                	$(modality.children()[ind])
	                	.find(".modal li[data-cols='"+tx+"'][data-rows='"+ty+"']").css("display","block");
	                }
	        	}
	        	//将之前改变的data的值回复原值
	        	//如果循环完成
	        	if(parseInt(a)==parseInt((tr.length-1))){
	        		//获取魔方下面的所有tr
	        		var ttr=$(modality.children()[ind]).find(".mofang tr");
	        		//进入循环
	        		for(var d=0;d<ttr.length;d++){
	        			//获取tr下面的所有td
	        			var ttd=$(ttr[d]).children();
	        			//再次进入循环
	        			for(var e=0;e<ttd.length;e++){
	        				//如果当前td的属性（data-index）不为空或者（style="displauy: none"）则不改变td的值
		        			if($(ttd[e]).attr("data-index")||$(ttd[e]).attr("style")=="display: none;"){
		        			}else{
		        				//否则获取当期td的index值
		        				index=$(ttd[e]).index();
		        				//并给他的（data-x）赋值
		        				$(ttd[e]).attr("data-x",index);
		        			}
	        			}
	        		}
	        	}
	        }
	    //否则不是第一次点击
    	}else{
    		//将mofang下的td带有Clas类的（current）的td的Class类删除
    		$(modality.children()[ind]).find(".mofang td.current").removeClass("current");
    		//给点击元素添加Class类（current）
    		$(this).addClass("current");
    		//获取当前元素的jishu的值
    		var js=$(this).attr("jishu");
    		//添加图片div下的所有li隐藏
    		$(modality.children()[ind]).find("div.js-item-region>.choices>li").hide();
    		//添加图片div下的属性（jishu=js）的li显示
    		$(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"]").show();
    		$(modality.children()[ind]).find("div.js-item-region").show();
    		$(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"] p.help-desc")
    		.html("建议尺寸："+$(this).attr("colspan")*160+'x'+$(this).attr("rowspan")*160+" 像素");
    		$(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"] .control-group a.btn")
    		.html($(this).attr("rowspan")+"行 "+$(this).attr("colspan")+"列"+"<span class='caret'></span>");
    		var tr=$(modality.children()[ind]).find(".mofang tr");
    		$(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"] div.btn-group ul.dropdown-menu").empty();
    		var tx,ty,hang=1;
    		for(var f=$(this).parent().index();f<tr.length;f++){
    			var td=$(tr[f]).children();
    			var lie=1;
    			for(var g=$(this).index();g<td.length;g++){
    				tx=$(td[g]).attr("data-x");
	        		ty=$(td[g]).attr("data-y");
	        		var col=parseInt($(this).attr("colspan"));
	        		var row=parseInt($(this).attr("rowspan"));
	        		if($(td[g]).parent().index()>($(this).parent().index()+row-1)||$(td[g]).index()>($(this).index()+col-1)){
	    				if($(td[g]).attr("data-index")||tx==undefined||tx==""){
	    					var index=$(td[g]).index();
		                	var tr_td=$(td[g]).parent("tr").siblings();
		                	for(var c=0;c<tr_td.length;c++){
		                		$($(tr_td[c]).children()[index]).attr("data-x","");
		                	}
		                	break;
	    				}else{
	    					var html='<li><a class="js-image-layout" href="javascript:;" data-width="'+lie
		                	+'" data-height="'+hang
		                	+'">'+hang+'行 '+lie+'列</a></li>';
	    					$(modality.children()[ind])
	    					.find("div.js-item-region .choices>li[jishu="+js+"] div.btn-group ul.dropdown-menu").append(html);
	    				}
	    			}else{
	    				var html='<li><a class="js-image-layout" href="javascript:;" data-width="'+lie
	                	+'" data-height="'+hang
	                	+'">'+hang+'行 '+lie+'列</a></li>';
	    				$(modality.children()[ind])
	    				.find("div.js-item-region .choices>li[jishu="+js+"] div.btn-group ul.dropdown-menu").append(html);
	    			}
    				lie++;
    			}
    			hang++;
    			//将之前改变的data的值回复原值
	        	if(parseInt(f)==parseInt((tr.length-1))){
	        		var ttr=$(modality.children()[ind]).find(".mofang tr");
	        		for(var d=0;d<ttr.length;d++){
	        			var ttd=$(ttr[d]).children();
	        			for(var e=0;e<ttd.length;e++){
		        			if($(ttd[e]).attr("data-index")||$(ttd[e]).attr("style")=="display: none;"){
		        			}else{
		        				var index=$(ttd[e]).index();
		        				$(ttd[e]).attr("data-x",index);
		        			}
	        			}
	        		}
	        	}
    		}
    	}
    });
    //选中弹出框中的方格
    $(modality).on("mouseenter",".modal-body li",function(){
    	var ind=$(this).parents("div.app-sidebar").index();
        var modal_li=$(modality.children()[ind]).find(".modal .modal-body>ul>li");
        modal_li.removeClass("selected");
        var x=$(this).attr("data-cols");
        var y=$(this).attr("data-rows");
        for(var i=0;i<modal_li.length;i++) {
            var li_x=$(modal_li[i]).attr("data-cols");
            var li_y=$(modal_li[i]).attr("data-rows");
            if(zy<li_y&&li_y<=y&&zx<li_x&&li_x<=x){
                $(modal_li[i]).addClass("selected");
            }
        }
    });
    //将弹出框选中的方格反馈到布局页面中
    $(modality).on("click",".modal-body li",function(){
    	var ind=$(this).parents("div.app-sidebar").index();
    	$(modality.children()[ind]).find(".modal").css("display","block");
    	$(modality.children()[ind]).find("div.js-item-region .choices>li").hide();
        $(modality.children()[ind]).find(".modal .modal-body>ul>li").css("display","none");
        var modal_li=$(modality.children()[ind]).find(".modal .modal-body>ul>li");
        modal_li.removeClass("selected");
        var li='<li class="choice" jishu="'+jishu+'" style="">        '
        +'    <div class="control-group">            '
        +'        <label class="control-label" style="position:absolute;text-align: right;><em class=" required""="">*选择图片：</label>'
        +'        <div class="controls" name="image_url">        '
        +'            <a class="control-action js-trigger-image" href="javascript: void(0);" onclick=addCubePho("query_cubepho",1,this)>选择图片</a>'
        +'            <p class="help-desc">建议尺寸：320x320 像素</p>     '
        +'        </div>     '
        +'    </div>   '
        +'    <div class="control-group">   '
        +'        <label class="control-label" style="text-align: right;">链接到：</label>      '
        +'        <div class="controls" style="margin:0;"  id="cubeControls_'+jishu+'">    '
        +'            <div class="dropdown hover">     '
        +'                <a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
        +'                <ul class="dropdown-menu" style="display: none;">         '
        +'                    <li>                      '
        +'                        <a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageCube(this,0)">微页面</a>'
        +'                    </li>             '
        +'                    <li>             '
        +'                        <a class="js-modal-goods" data-type="goods" href="javascript:void(0);" onclick="chooseGoodsAndGroupCube(this,0)">商品</a> '
        +'                    </li>             '
        /*
        +'                    <li>                  '
        +'                        <a class="js-modal-activity" data-type="activity" href="javascript:void(0);">营销活动</a>           '
        +'                    </li>          '
        +'                    <li>              '
        +'                        <a class="js-modal-survey" data-type="survey" href="javascript:void(0);">投票调查</a>              '
        +'                    </li>          '
        +'                    <li>                            '
        +'                        <a class="js-modal-history" data-type="history" href="javascript:void(0);">历史消息</a>           '
        +'                    </li>        '
        +'                    <li>    '
        +'                        <a class="js-modal-homepage" data-type="homepage" href="javascript:void(0);">店铺主页</a>     '
        +'                    </li>       '
        +'                    <li>    '
        +'                        <a class="js-modal-usercenter" data-type="usercenter" href="javascript:void(0);">会员主页</a>  '
        +'                    </li>     '*/
        +'                    <li>     '
        +'                        <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
        +'                    </li>    '
        +'                </ul>          '
        +'            </div>       '
        +'        </div>     '
        +'    </div>   '
        +'    <div class="control-group">        '
        +'        <label class="control-label" style="text-align: right;position:absolute">图片占：</label>'
        +'        <div class="controls" style="margin:0">        '
        +'        <div class="btn-group">            '
        +'        <a class="btn dropdown-toggle" data-toggle="dropdown" href="javascript:;" style="margin-left: 96px;">2行 2列<span class="caret"></span></a>'
        +'        <ul class="dropdown-menu" style="position:static;min-width:100px;float:right;margin-top:32px; margin-left:-81px; display: none;">'
        +'        </ul>'
        +'        </div>'
        +'        </div>   '
        +'    </div>      '
        +'    <div class="actions">'
        +'        <span class="action delete close-modal" title="删除">×</span>'
        +'    </div>  '
        +'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none">'
        +'  	<div class="popover-content">'
        +'      	<div class="form-inline">'
        +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
        +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
        +'				  onclick=mf_wl_queding(this,"'+jishu+'") data-loading-text="确定"> 确定</button>'
        +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'  
        +'      	</div>'
        +'  	</div>'
        +'	</div>'
        +'</li>';
        $(modality.children()[ind]).find(".choices").append(li);
        var tr=$(modality.children()[ind]).find(".mofang tr");
        var hang=1;
        $(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+jishu+"] div.btn-group ul.dropdown-menu").empty();
        for(var a=zy;a<tr.length;a++){
        	var td=$(tr[a]).children();
        	var lie=1;
        	for(b=zx;b<tr.length;b++){
        		tx=$(td[b]).attr("data-x");
        		ty=$(td[b]).attr("data-y");
        		//如果此时的td的data-x的值为空或undefined则与其index值相同的兄弟的data-x的值变为空
                if(tx===undefined||tx==""){
                	var index=$(td[b]).index();
                	var tr_td=$(td[b]).parent("tr").siblings();
                	for(var c=0;c<tr_td.length;c++){
                		$($(tr_td[c]).children()[index]).attr("data-x","");
                	}
                	break;
                	//否则就让与这个td相对应的modal的li显示
                }else if(ty>=zy&&tx>=zx){
                	tx=parseInt(tx)+1;
                	ty=parseInt(ty)+1;
                	var html='<li><a class="js-image-layout" href="javascript:;" data-width="'+lie
                	+'" data-height="'+hang
                	+'">'+hang+'行 '+lie+'列</a></li>';
                	$(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+jishu+"] div.btn-group ul.dropdown-menu").append(html);
                }
                lie++;
        	}
        	hang++;
        	//将之前改变的data的值回复原值
        	if(parseInt(a)==parseInt((tr.length-1))){
        		var ttr=$(modality.children()[ind]).find(".mofang tr");
        		for(var d=0;d<ttr.length;d++){
        			var ttd=$(ttr[d]).children();
        			for(var e=0;e<ttd.length;e++){
	        			if($(ttd[e]).attr("data-index")||$(ttd[e]).attr("style")=="display: none;"){
	        			}else{
	        				index=$(ttd[e]).index();
	        				$(ttd[e]).attr("data-x",index);
	        			}
        			}
        		}
        	}
        }
    	var li_x=$(this).attr("data-cols");
        var li_y=$(this).attr("data-rows");
        $(this).parents("div.modal").css("display","none");
        $(modality.children()[ind]).find(".mofang td.current").removeClass("current");
        var x=li_x-zx,y=li_y-zy;
        var html=
        '<td class="not-empty cols-'+x+' rows-'+y+' index-'+data_index+' current" jishu="'+jishu+'" colspan="'+x+'" rowspan="'+y+'" data-index="'+data_index+'">'
        +'    <img src="">'
        +'    <span>'+x*160+'x'+y*160+'</span></td>';
        $($this).before(html);
        var td=$(this).parents(".app-sidebar").find(".mofang td");
        for(var i=0;i<td.length;i++){
        	var tx=$(td[i]).attr("data-x");
        	var ty=$(td[i]).attr("data-y");
        	if(zx<=tx&&tx<li_x&&zy<=ty&&ty<li_y){
        		$(td[i]).hide();
        		$(td[i]).attr("data-x","");
        	}
        }
        $($this).remove();
        $(modality.children()[ind]).find("div.js-item-region").show();
        $(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+jishu+"] p.help-desc").html("建议尺寸："+x*160+'x'+y*160+" 像素");
        $(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+jishu+"] .control-group a.btn")
        .html(y+"行 "+x+"列"+"<span class='caret'></span>");
        data_index++;
        if(data_index>15){
        	data_index=0;
        }
        //每次点击魔方时，计数+1（新增时）
        jishu++;
    });
    //图片占行数列表
    $(modality).on("click","div.js-item-region .control-group a.btn",function(e){
    	var ind=$(this).parents("div.app-sidebar").index();
    	$(this).next("ul.dropdown-menu").toggle();
    	e.stopImmediatePropagation();
    	//改变窗口的大小
        var chi=$(modality).children();
    	for(var i=0;i<chi.length;i++){
    		var sty=$(chi[i]).css("display");
    		if(sty=="block"){
    			var top=parseInt($(chi[i]).css("top"));
    			var height=$(chi[i]).height();
    		}
    	}
    	var mCheight=$("#module_class").height();
        var rheight=$("#module").height();
        var zheight=rheight+mCheight;
        height=height+top;
        if(height>800||zheight>800){
            if(height>zheight){
            	$("#total").css("height",height+125+"px");
            	$("#root").css("height",height+35+"px");
            }else{
            	$("#total").css("height",zheight+125+"px");
            	$("#root").css("height",zheight+35+"px");
            }
        }
    });
    
    //关闭弹出框
    $(modality).on("click",".modal .close",function(){
        $(this).parents(".modal").css("display","none");
    });
    //布局下方的添加图片的关闭
    $(modality).on("click",".js-item-region .actions .delete",function(){
    	data_index--;
    	var ind=$(this).parents("div.app-sidebar").index();
        $(this).parents(".js-item-region").css("display","none");
        //获取mofang下Class为（current）的属性
        var x=parseInt($(modality.children()[ind]).find(".mofang td.current").index());
        var y=parseInt($(modality.children()[ind]).find(".mofang td.current").parent().index());
        var col=parseInt($(modality.children()[ind]).find(".mofang td.current").attr("colspan"));
        var row=parseInt($(modality.children()[ind]).find(".mofang td.current").attr("rowspan"));
        var js=parseInt($(modality.children()[ind]).find(".mofang td.current").attr("jishu"));
        var html='<td class="empty" data-x="'+x+'" data-y="'+y+'"></td>';
        //将删除的内容恢复成以前的
        $(modality.children()[ind]).find(".mofang td.current").before(html);
        $(modality.children()[ind]).find(".mofang td.current").remove();
        var tr=$(modality.children()[ind]).find(".mofang tr");
        var trl=$(module.children()[ind]).find(".control-group table tr");
        //循环恢复td的data-x与data-y的值
        for(var i=y;i<(y+row);i++){
        	var td=$(tr[i]).children();
        	var tdl=$(trl[i]).children();
        	for(var j=x;j<(x+col);j++){
        		var tx=$(td[j]).index();
        		var ty=$(td[j]).parent().index();
        		if(x<=tx&&tx<(x+col)&&y<=ty&&ty<(y+row)){
        			$(td[j]).attr("data-x",tx);
        			$(td[j]).attr("data-y",ty);
        			$(td[j]).show();
        			$(tdl[j]).show();
        		}
        	}
        }
        //获取左边table下的所有td，并且将以前改变的恢复原样
        var trleft=$(module.children()[ind]).find(".control-group table td");
        for(var i=0;i<trleft.length;i++){
        	var tx=$(trleft[i]).index();
        	var ty=$(trleft[i]).parent().index();
        	if(x==tx&&y==ty){
        		$(trleft[i]).before(html);
        		$(trleft[i]).remove();
        	}
        }
        $(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"]").remove();
        
    });
    //图片的占行与列
    $(modality).on("click",".js-item-region .controls .btn-group .dropdown-menu .js-image-layout",function(){
    	var ind=$(this).parents("div.app-sidebar").index();
    	//获取mofang下Class为（current）的属性
        var x=parseInt($(modality.children()[ind]).find(".mofang td.current").index());
        var y=parseInt($(modality.children()[ind]).find(".mofang td.current").parent().index());
        var col=parseInt($(modality.children()[ind]).find(".mofang td.current").attr("colspan"));
        var row=parseInt($(modality.children()[ind]).find(".mofang td.current").attr("rowspan"));
        var js=$(modality.children()[ind]).find(".mofang td.current").attr("jishu");
        //获取mofang下Class为（current）下面图片的src属性
        var src=$(modality.children()[ind]).find(".mofang td.current img").attr("src");
        //获取当前的行列li里面的数据
        var dw=parseInt($(this).attr("data-width"));
        var dh=parseInt($(this).attr("data-height"));
        //声明选择的行列返回td
        //判读之前是否有图片显示
        if(src){
	        var html=
	        '<td class="not-empty cols-'+dw+' rows-'+dh+' index-'+data_index+' current" jishu="'+js+'" colspan="'+dw+'" rowspan="'+dh+'" data-index="'+data_index+'">'
	        +'    <img src="'+src+'">';
        }else{
        	var html=
        	'<td class="not-empty cols-'+dw+' rows-'+dh+' index-'+data_index+' current" jishu="'+js+'" colspan="'+dw+'" rowspan="'+dh+'" data-index="'+data_index+'">'
	        +'    <img src="'+src+'">'
	        +'    <span>'+dw*160+'x'+dh*160+'</span></td>';
        }
        //更改选择图片里面的尺寸与行列数据
        $(modality.children()[ind]).find(".mofang td.current").before(html);
        $($(modality.children()[ind]).find(".mofang td.current")[1]).remove();
        $(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"] p.help-desc").html("建议尺寸："+dw*160+'x'+dh*160+" 像素");
        $(modality.children()[ind]).find("div.js-item-region .choices>li[jishu="+js+"] .control-group a.btn")
        .html(dh+"行 "+dw+"列"+"<span class='caret'></span>");
        var tr=$(modality.children()[ind]).find(".mofang tr");
        //循环确定恢复td的data-x与data-y的值，并让恢复数据的td显示
        for(var i=y;i<(y+row);i++){
        	var td=$(tr[i]).children();
        	for(var j=x;j<(x+col);j++){
        		var tx=$(td[j]).index();
        		var ty=$(td[j]).parent().index();
        		if(x<=tx&&tx<(x+col)&&y<=ty&&ty<(y+row)){
        			$(td[j]).attr("data-x",tx);
        			$(td[j]).attr("data-y",ty);
        			$(td[j]).show();
        		}
        	}
        }
        //获取mofang下所有td并且改变对应不显示的td的（data-x）属性
        var td=$(modality.children()[ind]).find(".mofang td");
        for(var j=0;j<td.length;j++){
        	var tx=$(td[j]).attr("data-x");
        	var ty=$(td[j]).attr("data-y");
        	if(x<=tx&&tx<(x+dw)&&y<=ty&&ty<(y+dh)){
        		$(td[j]).hide();
        		$(td[j]).attr("data-x","");
        	}
        }
        //让mofang下的Class为（current）的显示
        $(modality.children()[ind]).find(".mofang td.current").show();
        data_index++;
        if(data_index>15){
        	data_index=0;
        }
    });
    
    
    
    //点击任意位置改变行列的ul隐藏
    $("body").on("click",function(e){
    	//$("div.popover-inner").hide();
    	$("div.js-item-region .control-group .controls ul.dropdown-menu").hide();
    });
    //链接到  显示
    $(modality).on("mouseenter","div.js-item-region .control-group div.dropdown",function(){
    	$(this).children(".dropdown-menu").show();
    });
    //链接到  隐藏
    $(modality).on("mouseleave","div.js-item-region .control-group div.dropdown",function(){
    	$(this).children(".dropdown-menu").hide();
    });
};
	text();




/**
 * 调用共用图片选择弹出框
 * @param b_fun     图片选择后的回调父页面的方法名称(回调方法中的参数是图片数组记录图片的url)
 * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
 */
function addCubePho(b_fun,mutl_type,obj){
	var ind=$(obj).parents("div.app-sidebar").index();
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,area:["875px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?mutl_type='+mutl_type+'&ind='+ind+'&b_fun='+b_fun
		});
}



//获取图片选择页面传入的图片数组，插入到图片
function query_cubepho(urlArr,ind){
	if( urlArr.length>0){
		for(var i=0;i<urlArr.length;i++){
			var url=urlArr[i];
			insert_cubepho(url,ind);
			cube_count++;
		}
	}
}


//插入图片
function insert_cubepho(url,ind){
	//获取mofang下Class为（current）的属性
	var x=parseInt($(modality.children()[ind]).find(".mofang td.current").index());
    var y=parseInt($(modality.children()[ind]).find(".mofang td.current").parent().index());
    var col=$(modality.children()[ind]).find(".mofang td.current").attr('colspan');
    var row=$(modality.children()[ind]).find(".mofang td.current").attr("rowspan");
    var js=$(modality.children()[ind]).find(".mofang td.current").attr("jishu");
    var dindex=$(modality.children()[ind]).find(".mofang td.current").attr("data-index");
    //对应的左边与右边table下的td改变样式
    var td=$(module.children()[ind]).find(".control-group table td");
    var tdm=$(modality.children()[ind]).find(".mofang td");
    $(modality.children()[ind]).find("li[jishu='"+js+"'] .controls>img").remove();
    $(modality.children()[ind]).find("li[jishu='"+js+"'] .controls>a.xiugai").remove();
    var img='<img width="50" height="50" src='+url+'>';
    	img+=
    		'<a class="control-action js-trigger-image xiugai" style="margin-left:15px" onclick=addCubePho("query_cubepho",1,this) href="javascript:;">修改</a>';
    $(modality.children()[ind]).find("li[jishu='"+js+"'] .controls>a").hide();
    $(modality.children()[ind]).find("li[jishu='"+js+"'] .controls>a").after(img);
    for(var i=0;i<td.length;i++){
    	var tx=$(td[i]).index();
    	var ty=$(td[i]).parent().index();
    	if(x==tx&&y==ty){
    		//左边的图
    		var html=
    			'<td class="not-empty cols-'+col+' rows-'+row+' " jishu="'+js+'" colspan="'+col+'" rowspan="'+row+'" data-index="'+dindex+'">'
    			+'<a href="javascript: void(0);" id="cubeImage_'+js+'"><img src='+url+'></a>'
    			+'</td>';
    		$(td[i]).before(html);
    		$(td[i]).remove();
    		//右边的图
    		var html2 = 
    			'<td class="not-empty cols-'+col+' rows-'+row+' current" jishu="'+js+'" colspan="'+col+'" rowspan="'+row+'" data-index="'+dindex+'">'
				+'<img src='+url+'>'
				+'</td>';
    		$(tdm[i]).before(html2);
    		$(tdm[i]).remove();
    	}
    }
    
    for(var j=0;j<tdm.length;j++){
    	var jss=$(tdm[j]).attr("jishu");
    	if(jss){
    	}else{
    		var sty=$(tdm[j]).attr("style");
    		if(sty){
    			$(td[j]).attr("style",sty);
    		}
    	}
    }

}


//弹出微页面及分类列表
function chooseWebpageCube(obj,flag){
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
	if(document.getElementById("cubeImage_"+num)==null){
		parent.layer.alert("请先选择图片！");
	}else{
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
				  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?num='+num+'&leixing=pageinfoOfCube'
			  });
	
		})
	}
}


//弹出选择商品及分类的列表
function chooseGoodsAndGroupCube(obj,flag){
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
	if(document.getElementById("cubeImage_"+num)==null){
		parent.layer.alert("请先选择图片！");
	}else{
		layui.use(['form','element'], function(){ 
			  var form = layui.form(),
				  element = layui.element(),
				  layer = layui.layer;
			      form.render();
				  parent.layer.open({
					  title:"",
					  type: 2,
					  area: ['800px', '530px'],
					  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?num='+num+'&leixing=goodsOfCube'
				  });
			})
	}
	
}



//修改时点击叉号删除
function deleteUpdateCube(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//右边追加上原有的内容
	var str = 
		'<div class="dropdown hover">'
    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:void(0);">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'	<ul class="dropdown-menu">'
    	+'	<li> '
    	+'	<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" onclick="chooseWebpageCube(this,0)">微页面</a>'
    	+'	</li>'
    	+'	<li>'
    	+'	<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  onclick="chooseGoodsAndGroupCube(this,0)">商品</a>'
    	+'	</li>'
    	+'  <li>'
        +'  <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
    	+'	</ul>'
    	+'	</div>'
    	+'	<input type="hidden" name="link_url">'
    
    controls.html(str);
	
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	//去掉左边a的href
	$("#cubeImage_"+num).attr("href","javascript:void(0)");
}


//自定义外链的设置
$(modality).on("click","a[data-type='links']",function(e){
	e.stopPropagation();
	$("div.popover-inner").hide();
	$(this).parents("ul.dropdown-menu").hide();
	//获取自身的上偏移量
	var obj_top=$(this).parents("ul.dropdown-menu").prev().offset().top;
	//获取自身的高度
	var obj_height=$(this).parents("ul.dropdown-menu").prev().height();
	//获取父元素ul的上偏移量
	if($(this).parents(".choice").length!=0){
		var ul_top=$(this).parents(".choice").offset().top;
		//计算要显示的top值
		var top=obj_top-ul_top+obj_height+10;
		$(this).parents(".choice").find("div.popover-inner").show();
		$(this).parents(".choice").find("div.popover-inner").css("top",top);
	}else{
		var ul_top=$(this).parents(".app-sidebar").offset().top;
		//计算要显示的top值
		var top=obj_top-ul_top+obj_height+10;
		$(this).parents("form.form-horizontal").find("div.popover-inner").show();
		$(this).parents("form.form-horizontal").find("div.popover-inner").css("top",top);
	}
});



//外链点击确定
function mf_wl_queding(obj,jishu){
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
	        +'      <a class="js-modal-links" data-type="links" onclick="customChain(this)" href="javascript:void(0);">自定义外链</a>'
	        +'      </li>'
			+'		</ul>'
			+'	</div>'
			+'	</div>'
			+'	<input type="hidden" name="link_url" value="'+lianjie+'"> '
			
			//判断是否选择了图片
			if(document.getElementById("cubeImage_"+jishu)==null){
				parent.layer.alert("请先选择图片！");
			}else{
				//改变原来div中的内容
				$("#cubeControls_"+jishu).html(str);
				//给左边的图片加上超链接地址
				document.getElementById("cubeImage_"+jishu).href = lianjie;
			}
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}



//自定义外链点击取消
function mf_wl_quxiao(obj){
	$(obj).parents(".popover-inner").hide();
}






