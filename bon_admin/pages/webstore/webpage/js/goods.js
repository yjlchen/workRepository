//全局变量
var img_sum = 0;
//插入图片for循环中的累加变量    用于判断1大2小的排列样式
var oneBigTwoSmall_count = 0;
var str;
var goods = function (){
  //定义预览模块DOM内容
	this.left = 
	'   <div class="app-field clearfix editing module_div" >'
	+'	  <div class="control-group">'
	+'		<ul class="sc-goods-list clearfix card size-3 list"  name="leftName"> '
	+'		  <li class="goods-card card">' 
	+'			<a href="javascript: void(0);" class="link js-goods clearfix">'
	+'			  <div class="photo-block">'
	+'				<img class="goods-photo js-goods-lazy" src= '+getRootPath()+'/pages/commodity/image/good1.jpg />'
	+'			  </div>'
	+'			  <div class="info clearfix info-no-title info-price">'
	+'				<p class="goods-title">此处显示商品名称</p>'
	+'				<p class="goods-price" style="position:absolute;bottom:0;left:140px;"><em style="font-size:16px;color:#f00">￥9999.00</em></p>'
	+'				<p class="goods-price-taobao"></p>'
	+'			  </div> '
	+'			  <div class="goods-buy btn1" style="bottom:12px"></div>'
	+'			</a>'
	+'		  </li>  '
	+'		  <li class="goods-card card">'
	+'			<a href="javascript: void(0);" class="link js-goods clearfix">'
	+'			  <div class="photo-block">'
	+'				<img class="goods-photo js-goods-lazy" src='+getRootPath()+'/pages/commodity/image/good2.jpg />'
	+'			  </div>'
	+'			  <div class="info clearfix info-no-title">'
	+'				<p class="goods-title">此处显示商品名称</p>'
	+'				<p class="goods-price" style="position:absolute;bottom:0;left:140px;"><em style="font-size:16px;color:#f00">￥9999.00</em></p>'
	+'				<p class="goods-price-taobao"></p>'
	+'			  </div>'
	+'			  <div class="goods-buy btn1" style="bottom:12px"></div>'
	+'			</a> '
	+'		  </li> '
	+'		  <li class="goods-card card">'
	+'			<a href="javascript: void(0);" class="link js-goods clearfix">'
	+'			  <div class="photo-block">'
	+'				<img class="goods-photo js-goods-lazy" src='+getRootPath()+'/pages/commodity/image/good3.jpg />'
	+'			  </div>'
	+'			  <div class="info clearfix info-no-title">'
	+'				<p class="goods-title">此处显示商品名称</p>'
	+'				<p class="goods-price" style="position:absolute;bottom:0;left:140px;"><em style="font-size:16px;color:#f00">￥9999.00</em></p>'
	+'				<p class="goods-price-taobao"></p>'
	+'			  </div>'
	+'			  <div class="goods-buy btn1" style="bottom:12px"></div>'
	+'			</a>'
	+'		  </li>'
	+'		</ul>'
	+'		<ul class="sc-goods-list clearfix size-3 list card" style="display:none;">'		
	+'		</ul>'	
	+'		<div class="component-border"></div>'
	+'	  </div>'
	+'	  <div class="actions">'
	+'		<div class="actions-wrap">'
	//+'			<span class="action edit">编辑</span>'
	//+'			<span class="action add">加内容</span>'	
	+'			<span class="action delete">删除</span>'
	+'		</div>'
	+'	  </div> '
	+'	  <div class="sort">'
	+'		<i class="sort-handler"></i>'
	+'	  </div>'
	+'	</div>  ';
  

	this.right = 
		  '<div class="app-sidebar" name="goods_img_slide" style="margin-top: 0px;">'
          +'<div class="arrow"></div> '
          +'<div class="app-sidebar-inner js-sidebar-region" >'
		  +'			<div>'
		  +'				<form class="form-horizontal" novalidate="">'
		  +'					<div class="control-group">'
		  +'						<label class="control-label">选择商品：</label>'
		  +'						<div class="controls" style="margin: 0">'
		  +'							<ul class="module-goods-list clearfix ui-sortable" name="goods">'
		  +'								<li>'
		  +'									<a href="javascript:void(0);" class="js-add-goods add-goods">'
		  +'										<i class="icon-add" style="margin-top:18px"></i>'
		  +'									</a>'
		  +'								</li>'
		  +'							</ul>'
		  +'						</div>'
		  +'					</div> '
		  +'				</form> '
		  +'				<div class="js-goods-style-region" style="margin-top: 10px;"><div><form class="form-horizontal" novalidate="">'
		  +'					<div class="control-group">'
		  +'						<label class="control-label">列表样式：</label>'
		  +'						<div class="controls" style="margin-left: 10px;">'
		  +'							<label class="radio inline">'
		  +'								<input type="radio" name="size" value="0"  onclick="bag(this)">大图 '
		  +'							</label> '
		  +'							<label class="radio inline">'
		  +'								<input type="radio" name="size" value="1"  onclick="small(this)">小图 '
		  +'							</label> '
		  +'							<label class="radio inline">'
		  +'								<input type="radio" name="size" value="2" onclick="oneBigTwoSmall(this)">一大两小'
		  +'							</label> '
		  +'							<label class="radio inline">'
		  +'								<input type="radio" name="size" value="3" checked="" onclick="xiangxi(this)">详细列表'
		  +'							</label>'
		  +'						</div> '
		  +'					</div> '
		  +'					<div class="control-group">'
		  +'						<div class="controls">'
		  +'							<div class="controls-card">'
		  +'								<div class="controls-card-tab" style="width:350px;">'
		  +'									<label class="radio inline">'
		  +'										<input type="radio" name="size_type" value="0" checked="">'
		  +'										卡片样式 '
		  +'									</label>'
		  +'									<label class="radio inline">'
		  +'										<input type="radio" name="size_type" value="2">'
		  +'										极简样式   '
		  +'									</label>'
		  +'								</div> '
		  +'								<div class="controls-card-item">'
		  +'									<div> '
		  +'										<label class="checkbox inline">'
		  +'												<input type="checkbox" name="buy_btn" value="1" checked="">显示购买按钮 '
		  +'										</label>'
		  +'									</div>'
		  +'									<div style="margin: 10px 0 0 20px;">'
		  +'										<label class="radio inline"> '
		  +'											<input type="radio" name="buy_btn_type" value="1" checked=""> '
		  +'											样式1'
		  +'										</label>'
		  +'										<label class="radio inline">'
		  +'											<input type="radio" name="buy_btn_type" value="2">'
		  +'											样式2 '
		  +'										</label>'
		  +'										<label class="radio inline">'
		  +'											<input type="radio" name="buy_btn_type" value="3">'
		  +'											样式3'
		  +'										</label>'
		  +'										<label class="radio inline">'
		  +'											<input type="radio" name="buy_btn_type" value="4">'
		  +'											样式4'
		  +'										</label>'
		  +'									</div>'
		  +'								</div>'
		  +'									<div class="controls-card-item">'
		  +'										<label class="checkbox inline">'
		  +'												<input type="checkbox" name="title" value="0">显示商品名 '
		  +'										</label>'
		  +'									</div>'
		  +'									<div class="controls-card-item">'
		  +'										<label class="checkbox inline">'
		  +'												<input type="checkbox" name="price" value="1" checked="">显示价格 '
		  +'										</label> '
		  +'									</div> '
		  +'							</div>'
		  +'						</div> '
		  +'					</div>'
		  +'				</form>'
		  +'				</div> '
		  +'				</div>'
		  +'			</div>'
		  +'		</div>'
		 
}


	  
	    //页面标题修改
	    $(modality).on("blur","input[name='micro_name']",function(){
	        var txt = $(this).val();
	        $('#page-title').html(txt);
	        $(this).attr("value",txt);
	    });
	  
	    //颜色修改
	    $(modality).on("change","input[name='back_color']",function(){
	        var txt = $(this).val();
	        $(this).attr("value",txt);
	    });
	    
	    //颜色重置
	    $(modality).on("click","button[type='button']",function(){
	        $("input[name='back_color']").attr("value","#f9f9f9");
	    });
	  
	    
	  /*为加号添加点击弹出框事件*/
	 /* $(modality).on("click","i.icon-add",function(){
		  var ind=$(this).parents("div.app-sidebar").index();
		  $(modality.children()[ind]).find("div.modal").css("display","block");
	  });
	  $(modality).on("click","a.close",function(){
		  var ind=$(this).parents("div.app-sidebar").index();
		  $(modality.children()[ind]).find("div.modal").css("display","none");
	  });*/


    /*为‘列表样式’单选按钮绑定事件*/
	//大图  
	function bag(obj){
	        var ind=$(obj).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group ul").removeClass('size-3 list').addClass('size-2 pic');
	        $(module.children()[ind]).find(".control-group ul li").removeClass('small-pic').addClass('big-pic'); 
	        $(obj).attr("checked",true);
	        $(modality.children()[ind]).find("input[name='size']:nth(1)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(2)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(3)").attr("checked",false);
	        buy_bottom_qt(ind);
	        //显示隐藏促销按钮
	        $(modality.children()[ind]).find("div.controls-card-tab").children("label:eq(2)").hide();
	      //促销
        	$(module.children()[ind]).find(".control-group ul li a .clearfix").show();
    		$(module.children()[ind]).find(".control-group ul li a .acuxiao").remove();
    		$(module.children()[ind]).find(".control-group ul li a .btn5").remove();
    		//回填数据
    		if(str==1){
    			$(modality.children()[ind]).find("input[name='size_type'][value=0]").prop("checked",true);
    			$(obj).parents("div.control-group").next().find(".controls-card>div").show();
    		}else if(str==2){
    			$(modality.children()[ind]).find("input[name='size_type'][value=2]").prop("checked",true);
    			$(modality.children()[ind]).find("input[name='price']").parents(".controls-card-item").show();
		        $(modality.children()[ind]).find("input[name='title']").parents(".controls-card-item").show();
    		}
    		$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").show();
	};
    
    //小图
    function small(obj){
	        var ind=$(obj).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group ul").removeClass('size-3 list').addClass('size-2 pic');
	        $(module.children()[ind]).find(".control-group ul li").removeClass('big-pic').addClass('small-pic');
	        $(obj).attr("checked",true);
	        $(modality.children()[ind]).find("input[name='size']:nth(0)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(2)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(3)").attr("checked",false);
	        buy_bottom_qt(ind);
	      //显示隐藏促销按钮
	        $(modality.children()[ind]).find("div.controls-card-tab").children("label:eq(2)").show();
	        //保存状态
	        var a=$(modality.children()[ind]).find("input[name='size_type']");
	        for(var i=0;i<a.length;i++){
	        	var b=$(a[i]).prop("checked");
	        	if(i==0&&b==true){
	        		str=1;
	        	}
	        	else if(i==1&&b==true){
	        		str=2;
	        	}
	        }
	        var inp=$(modality.children()[ind]).find("input[name='size_type']");
    		for(var i=0;i<inp.length;i++){
    			if($(inp[i]).attr("checked")){
    				var val=$(inp[i]).val();
    			}
    		}
    		if(val==2){
    			$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").hide();
    		}else{
    			$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").show();
    		}
	};
    
    //1大2小
    function oneBigTwoSmall(obj){
	        var ind=$(obj).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group ul").removeClass('size-3 list').addClass('size-2 pic');
	        var length = $(module.children()[ind]).find(".control-group ul").children().length;
	        //默认的3个图 
	        if(length<4){
		        $(module.children()[ind]).find(".control-group ul li").removeClass('big-pic').addClass('small-pic');
		        $(module.children()[ind]).find(".control-group ul li:first").removeClass('small-pic').addClass('big-pic');
	        }else{
	        	//length的数字对3求余数
	        	var liList = $(module.children()[ind]).find(".control-group ul li");
	        	for(var i=0;i<liList.length;i++){
	        		if(i%3==0){
	        			$(liList[i]).removeClass('small-pic').addClass('big-pic');
	        			
	        		}else{
	        			$(liList[i]).removeClass('big-pic').addClass('small-pic');
	        		}
	        	}
	        }
	        $(obj).attr("checked",true);
	        $(modality.children()[ind]).find("input[name='size']:nth(0)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(1)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(3)").attr("checked",false);
	      buy_bottom_qt(ind);
	      //显示隐藏促销按钮
	        $(modality.children()[ind]).find("div.controls-card-tab").children("label:eq(2)").hide();
	      //样式类型显示
	        $(this).parents("div.control-group").next().find("controls-card>div").show();
	      //促销
        	$(module.children()[ind]).find(".control-group ul li a .clearfix").show();
    		$(module.children()[ind]).find(".control-group ul li a .acuxiao").remove();
    		$(module.children()[ind]).find(".control-group ul li a .btn5").remove();
    		//回填数据
    		if(str==1){
    			$(modality.children()[ind]).find("input[name='size_type'][value=0]").prop("checked",true);
    			$(obj).parents("div.control-group").next().find(".controls-card>div").show();
    		}else if(str==2){
    			$(modality.children()[ind]).find("input[name='size_type'][value=2]").prop("checked",true);
    			$(modality.children()[ind]).find("input[name='price']").parents(".controls-card-item").show();
		        $(modality.children()[ind]).find("input[name='title']").parents(".controls-card-item").show();
    		}
    		$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").show();
	}
    
    
    //详细列表
    function xiangxi(obj){
	        var ind=$(obj).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group ul").removeClass('size-2 pic').addClass('size-3 list');
	        $(module.children()[ind]).find(".control-group ul li").removeClass('small-pic big-pic card').addClass('card');
	        $(obj).attr("checked",true);
	        $(modality.children()[ind]).find("input[name='size']:nth(0)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(1)").attr("checked",false);
	        $(modality.children()[ind]).find("input[name='size']:nth(2)").attr("checked",false);
	      buy_bottom_xx(ind);
	      //显示隐藏促销按钮
	        $(modality.children()[ind]).find("div.controls-card-tab").children("label:eq(2)").hide();
	        //样式类型显示
	        $(this).parents("div.control-group").next().find("controls-card>div").show();
	        //促销
	        $(module.children()[ind]).find(".control-group ul li a .clearfix").show();
    		$(module.children()[ind]).find(".control-group ul li a .acuxiao").remove();
    		$(module.children()[ind]).find(".control-group ul li a .btn5").remove();
    		//回填数据
    		if(str==1){
    			$(modality.children()[ind]).find("input[name='size_type'][value=0]").prop("checked",true);
    			$(obj).parents("div.control-group").next().find(".controls-card>div").show();
    		}else if(str==2){
    			$(modality.children()[ind]).find("input[name='size_type'][value=2]").prop("checked",true);
    			$(modality.children()[ind]).find("input[name='price']").parents(".controls-card-item").show();
		        $(modality.children()[ind]).find("input[name='title']").parents(".controls-card-item").show();
    		}
    		$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").show();
	};
    
    
    //为‘卡片样式’单选按钮绑定事件
    $(modality).on("click",".controls-card .radio input[name='size_type']",function(){
    		var value=$(this).val();
	        var ind=$(this).parents("div.app-sidebar").index();
	        //卡片样式
	        if(value==0){
	        	$(module.children()[ind]).find(".control-group ul").removeClass('normal').addClass('card');
	        	$(module.children()[ind]).find(".control-group ul li").removeClass('normal').addClass('card');
	        	$(module.children()[ind]).find(".control-group ul li a .goods-buy").remove();
	        	$(module.children()[ind]).find(".control-group ul li a").append('<div class="goods-buy btn1"></div>');
	        	$(this).parents("div.controls-card-tab").next().css("display","block");
	        	$("input[name='buy_btn_type'][value='1']").prop("checked",true);
	        	$(this).attr("checked",true);
	        	$(modality.children()[ind]).find("input[name='size_type'][value=2]").attr("checked",false);
	        	$(modality.children()[ind]).find("input[name='size_type'][value=3]").attr("checked",false);
	        	/*$(module.children()[ind]).find("p.goods-sub-title").addClass("hide");
	        	$(modality.children()[ind]).find("input[name='show_sub_title']").attr("checked",false);
	        	$(modality.children()[ind]).find("input[name='show_sub_title']").parents(".controls-card-item").css("display","block");*/
	        	$(this).parents(".controls-card-tab").show();
	        	$(this).parents(".controls-card-tab").siblings().show();
	        	$(module.children()[ind]).find(".control-group ul li a .info").show();
	        	//促销
	        	$(module.children()[ind]).find(".control-group ul li a .clearfix").show();
	    		$(module.children()[ind]).find(".control-group ul li a .acuxiao").remove();
	    		$(module.children()[ind]).find(".control-group ul li a .btn5").remove();
	    		$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").show();
	    		if($(modality.children()[ind]).find("input[name='size']:checked").val()=="3"){
	    			buy_bottom_xx(ind);
	    		}else{
	    			buy_bottom_qt(ind);
	    		}
	        }
	        //极简样式
	        else if(value==2){
	        	$(module.children()[ind]).find(".control-group ul").removeClass('card').addClass('normal');
		        $(module.children()[ind]).find(".control-group ul li").removeClass('card').addClass('normal');
		        $(module.children()[ind]).find(".control-group ul li a .goods-buy").remove();
		        $(this).parents("div.controls-card-tab").next().css("display","none");
		        $(this).attr("checked",true);
		        $(modality.children()[ind]).find("input[name='size_type'][value=0]").attr("checked",false);
		        $(module.children()[ind]).find("p.goods-sub-title").addClass("hide");
		        $(modality.children()[ind]).find("input[name='show_sub_title']").attr("checked",true);
		        $(modality.children()[ind]).find("input[name='show_sub_title']").parents(".controls-card-item").css("display","none");
		        $(modality.children()[ind]).find("input[name='price']").parents(".controls-card-item").show();
		        $(modality.children()[ind]).find("input[name='title']").parents(".controls-card-item").show();
		        $(module.children()[ind]).find(".control-group ul li a .info").show();
		        //促销
		        $(module.children()[ind]).find(".control-group ul li a .clearfix").show();
	    		$(module.children()[ind]).find(".control-group ul li a .acuxiao").remove();
	    		$(module.children()[ind]).find(".control-group ul li a .btn5").remove();
	    		var inp=$(modality.children()[ind]).find("input[name='size']");
	    		for(var i=0;i<inp.length;i++){
	    			if($(inp[i]).attr("checked")){
	    				var val=$(inp[i]).val();
	    			}
	    		}
	    		if(val==1){
	    			$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").hide();
	    		}
	        }
	        //促销
	        else if(value==3){
	        	$(module.children()[ind]).find(".control-group ul li a .info").hide();
	        	var html='<div class="info clearfix info-no-title acuxiao">'
	        				+'<p class="goods-price cuxiao"><em style="font-size:16px;color:#f00">￥379.00</em></p>'
	        				+' <p class="goods-price-taobao" style="display:inline-block">原价：380.00</p>'
	        			 +'</div>'
	        		   +' <div class="goods-buy btn5" style="background: #f00;color: #fff;width: 38px;'
	        		   +'height: 40px;text-align: center;bottom:5px;right:8px;padding:3px;">我要抢购</div>';
	        	$(this).attr("ckecked",true);
	    		$(this).siblings().attr("checked",false);
	    		$(this).parents(".controls-card-tab").siblings().hide();
	    		$(module.children()[ind]).find(".control-group ul").removeClass('normal').addClass('card');
	        	$(module.children()[ind]).find(".control-group ul li").removeClass('normal').addClass('card');
	    		$(module.children()[ind]).find(".control-group ul li a .clearfix").css("display","none");
	    		$(module.children()[ind]).find(".control-group ul li a .acuxiao").remove();
	    		$(module.children()[ind]).find(".control-group ul li a .btn5").remove();
	    		$(module.children()[ind]).find(".control-group ul li a").append(html);
	    		$(modality.children()[ind]).find("input[name='title']").parents("div.controls-card-item").show();
	        }
	});
    
    
    
    
    //为‘显示购买按钮’复选按钮绑定事件
    $(modality).on("click","input[name='buy_btn']",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        $(module.children()[ind]).find(".control-group ul li a .goods-buy").toggleClass('layui-hide');
	        //让多选框选中
	        if($(this).is(':checked')==true){
	        	$(this).attr("checked",true);
	        }else if($(this).is(':checked')==false){
	        	$(this).attr("checked",false);
	        }
	});
    
    
    //为‘购买样式’按钮绑定事件
    $(modality).on("click","input[name='buy_btn_type']",function(){
	        var ind=$(this).parents("div.app-sidebar").index();
	        var value=$(this).val();
	        if(value==1){
	        	$(module.children()[ind]).find(".control-group ul li a .goods-buy").removeClass('btn1 btn2 btn3 btn4').addClass('btn1');
	        	$(this).attr("checked",true);
	        }else if(value==2){
	        	$(module.children()[ind]).find(".control-group ul li a .goods-buy").removeClass('btn1 btn2 btn3 btn4').addClass('btn2');
	        	$(this).attr("checked",true);
	        }else if(value==3){
	        	$(module.children()[ind]).find(".control-group ul li a .goods-buy").removeClass('btn1 btn2 btn3 btn4').addClass('btn3');
	        	$(this).attr("checked",true);
	        }else if(value==4){
	        	$(module.children()[ind]).find(".control-group ul li a .goods-buy").removeClass('btn1 btn2 btn3 btn4').addClass('btn4');
	        	$(this).attr("checked",true);
	        }
	});
    
    
     //为‘显示价格’复选按钮绑定事件
    $(modality).on("click","input[name='price']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        $(module.children()[ind]).find(".control-group ul li a .info .goods-price").toggleClass('layui-hide');
        //让多选框选中
        if($(this).is(':checked')==true){
        	$(this).attr("checked",true);
        }else if($(this).is(':checked')==false){
        	$(this).attr("checked",false);
        }
    });
    
    
    //为'显示商品名'复选按钮绑定事件
    $(modality).on("click","input[name='title']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        $(module.children()[ind]).find(".control-group ul li a .info").toggleClass('info-no-title');
        //让多选框选中
        if($(this).is(':checked')==true){
        	$(this).attr("checked",true);
        }else if($(this).is(':checked')==false){
        	$(this).attr("checked",false);
        }
        
    });
    
    
    /**
     * 调用共用商品选择弹出框
     * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
     */
    $(modality).on("click","a.add-goods",function(){
    	var ind=$(this).parents("div.app-sidebar").index();
	    var ul_li=$(this).parents("ul[name='goods']").children();
	    oneBigTwoSmall_count=ul_li.length-1;
    	//获取id为li_？的所有li创建数组，获取其中的最大值并赋值给i
    	var li=$("li[id*='li_']");
    	var li_i=[];
    	for(var x=0;x<li.length;x++){
    		var id=$(li[x]).attr("id");
    		li_i.push(id.slice(3));
    	}
    	var max=0;
    	for(var y=0;y<li_i.length;y++){
    		if(max>=li_i[y]){
    			max=max;
    		}else{
    			max=li_i[y];
    		}
    	}
    	//全局变量+1
    	img_sum=Number(max)+1;
    	var size = $(modality.children()[ind]).find("input[name='size']:checked").val();
    	parent.layer.open({
    		  title: ''
    		  ,type:2
    		  ,closeBtn: 1
    		  ,area:["700px","530px"]
    		  ,content:getRootPath()+'/commons/jsp/com_goods.jsp?ind='+ind+'&mutl_type=2'+'&size='+size 
    		});
    });
    
    
    
    //获取图片选择页面传入的图片数组，插入到图片
    function query_goods(idArr,size,ind){
    	//默认的3个图片隐藏
    	$(module.children()[ind]).find("ul[name='leftName']").css("display","none");
    	if(idArr.length>0){
    		for(var i=0;i<idArr.length;i++){
    			$.ajax({
    	        	"type":"post",
    	            "url": getRootPath()+"/commodity/queryCommodityInfo.action",
    	            async: false,//同步
    	            'data' : {id:idArr[i]},
    	            "dataType":"json",
    	            'success' : function (data) {
    	            	 var url;
    	            	 if(data.data.img_path_str.indexOf(",")<0){
    	        			 url = data.data.img_path_str;
    	        		 }else{
    	        			//图片url,取第一个，之前的值
    	        			 url = data.data.img_path_str.substr(0,data.data.img_path_str.indexOf(","));
    	        		 }
    	    			var price = data.data.price;
    	    			var goodName = data.data.commodity_name;
    	    			//获得原始价格
    	    			var original_price = data.data.original_price;
    	    			//1大2小，插入大图
    	    			if(size=="2"){
    	    				//如果能被3整除，插入大图
    	    				if(oneBigTwoSmall_count%3==0){
    	    					insert_bigpic(url,price,goodName,ind,idArr[i],original_price);
    	    				}
    	    				//其他情况调用公共插入图片方法
    	    				else{
    	    					insert_goods(url,price,goodName,size,ind,idArr[i],original_price);
    	    				}
    	    			}
    	    			//其他情况调用公共插入图片方法
    	    			else{
    	    				insert_goods(url,price,goodName,size,ind,idArr[i],original_price);
    	    			}
    	    			oneBigTwoSmall_count++;
    	            },
    	            'error':function(){
    	            	
    	            }
    		    });
    			
    		}
    	}
    }
    
    
    //插入图片
    function insert_goods(url,price,goodName,size,ind,goodId,original_price){
    	var str = 
    		'<li class="sort" id="good_'+img_sum+'">'
    		+'<input type="hidden" value='+goodId+'>'				
    		+'<a href="javascript: void(0);" target="_blank">'
    		+'<img src="'+url+'" alt="商品图" width="50" height="50"></a>'
    		+'<a class="close-modal js-delete-goods small hide"  title="删除" onclick="deleteGood(this)">×</a>'
    		+'</li>'
		//右边的ul加上li的商品图片
    	$(modality.children()[ind]).find("ul[name='goods']").children().eq(-1).before(str);
    	
    	//获取购买按钮单选框，选中的按钮的值
    	var num = $(modality.children()[ind]).find("input[name='buy_btn_type']:checked").val();
    	
    	//leftstr有4种情况
    	var leftstr;
    	//大图
        if(size=="0"){
    		leftstr = 
    			'<li class="goods-card card big-pic" id="li_'+img_sum+'">'
    			+'	<input type="hidden" value='+goodId+'>'	
     //+'<a class="link js-goods clearfix" href='+getRootPath()+'/pages/webstore/webpage/preview/goodDetail_mobile.jsp?goodId='+goodId+' >'
    			//a改为onclick事件，因为需要走微信授权
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
    			+'		<div class="photo-block">'
        		+'			<img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'		</div>'
        		+'		<div class="info clearfix info-price">'
        		+'			<p class="goods-title">'+goodName+'</p>'
        		+'			<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>';
    		if(original_price!=0){
    			leftstr+=
        			'		<p class="goods-price-taobao">'+original_price+'</p>';
    		}
        	leftstr+='			<div class="goods-buy btn'+num+'"></div>'
        		+'		</div>'
        		+'	</a>'
        		+'</li>';	
    	}
        //小图
        else if(size=="1"){
        	leftstr = 
    			'<li class="goods-card card small-pic" id="li_'+img_sum+'">'
    			+'	<input type="hidden" value='+goodId+'>'	
    			//a改为onclick事件，因为需要走微信授权
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
    			+'		<div class="photo-block">'
        		+'			<img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'		</div>'
        		+'		<div class="info clearfix info-price">'
        		+'			<p class="goods-title">'+goodName+'</p>'
        		+'			<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>';
        		if(original_price!=0){
        			leftstr+=
            			'		<p class="goods-price-taobao">'+original_price+'</p>';
        		}
        		leftstr+='			<div class="goods-buy btn'+num+'"></div>'
        		+'		</div>'
        		+'	</a>'
        		+'</li>';
        }
        //1大2小，只插入小图，大图在另一个方法中插入
        else if(size=="2"){
        	leftstr = 
    			'<li class="goods-card card small-pic" id="li_'+img_sum+'">'
    			+'	<input type="hidden" value='+goodId+'>'	
    			//a改为onclick事件，因为需要走微信授权
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
    			+'	<div class="photo-block">'
        		+'		<img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'	</div>'
        		+'	<div class="info clearfixe info-price">'
        		+'		<p class="goods-title">'+goodName+'</p>'
        		+'		<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>';
        		if(original_price!=0){
        			leftstr+=
            			'	<p class="goods-price-taobao">'+original_price+'</p>';
        		}
        		leftstr+='	<div class="goods-buy btn'+num+'"></div>'
        		+'	</div>'
        		+'	</a>'
        		+'</li>';
        }
        //详细列表
        else if(size=="3"){
        	leftstr = 
        		'<li class="goods-card card" id="li_'+img_sum+'">'
        		+'	<input type="hidden" value='+goodId+'>'	
        		//a改为onclick事件，因为需要走微信授权
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
        		+'			   <div class="photo-block">'
        		+'				   <img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'			   </div>'
        		+'			   <div class="info clearfix info-price">'
        		+'					<p class="goods-title">'+goodName+'</p>'
        		+'					<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>';
        		if(original_price!=0){
        			leftstr+=
    							'<p class="goods-price-taobao" style="position"absolute;bottom:25px;left:150px;">'+original_price+'</p>';
        		}
        		leftstr+='		<div class="goods-buy btn'+num+'"></div>'
        		+'	</div>'
        		+'	</a>'
        		+'</li>';
        }
    		
        //左边ul追加上真正的商品图片
        $(module.children()[ind]).find("ul[name='leftName']").css("display","none");
        $(module.children()[ind]).find("ul[name='leftName']").next("ul").append(leftstr);
        $(module.children()[ind]).find("ul[name='leftName']").next("ul").show();
        if(size==3){
        	buy_bottom_xx(ind);
        }else{
        	buy_bottom_qt(ind);
        }
        img_sum++;
        $(modality.children()[ind]).find("input[name='title']").attr("checked",true);
    }
  
    
    
    //插入1大2小的大图
    function insert_bigpic(url,price,goodName,ind,goodId,original_price){
    	var str = 
    		'			<li class="sort" id="good_'+img_sum+'">'
    		+'				<a href="javascript: void(0);" target="_blank">'
    		+'				<img src="'+url+'" alt="商品图" width="50" height="50"></a>'
    		+'				<a class="close-modal js-delete-goods small hide"  title="删除" onclick="deleteGood(this)">×</a>'
    		+'	        </li>'
		//右边的ul加上li的商品图片
    	$(modality.children()[ind]).find("ul[name='goods']>li:eq(-1)").before(str);
    	//获取购买按钮单选框，选中的按钮的值
    	var num = $(modality.children()[ind]).find("input[name='buy_btn_type']:checked").val();
    	
    	//左边ul追加上真正的商品图片,这里只是加入大图
    	var leftstr = 
			'<li class="goods-card card big-pic" id="li_'+img_sum+'">'
			+'	<input type="hidden" value='+goodId+'>'	
			//a改为onclick事件，因为需要走微信授权
			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
			+'		<div class="photo-block">'
    		+'			<img class="goods-photo js-goods-lazy" src="'+url+'">'
    		+'		</div>'
    		+'		<div class="info clearfix info-no-title info-price">'
    		+'			<p class="goods-title">'+goodName+'</p>'
    		+'			<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>';
    					if(original_price!=0){
    						leftstr+='<p class="goods-price-taobao" style="padding:5px;">'+original_price+'</p>';
    					}
    		leftstr+='	<div class="goods-buy btn'+num+'"></div>'
    		+'		</div>'
    		+'	</a>'
    		+'</li>';
    	
    		$(module.children()[ind]).find("ul[name='leftName']").css("display","none");
            $(module.children()[ind]).find("ul[name='leftName']").next("ul").append(leftstr);
            $(module.children()[ind]).find("ul[name='leftName']").next("ul").show();
            $(modality.children()[ind]).find("input[name='title']").attr("checked",true);
    		
            img_sum++;
    }
    //删除商品
    function deleteGood(obj,e){
    	var ind = $(obj).parents("div.app-sidebar").index();
    	//获得它的父级ul
    	var parentUl = $(obj).parent().parent();
    	//获得右边的li
    	var leftLi = $(obj).parent();
    	//获得右边的li的id
    	var leftLiId = leftLi.attr("id");
    	//获得右边的li的id的_后面的数字
    	var num  = leftLiId.substr(leftLiId.lastIndexOf('_')+1);
    	//右边的li删除
    	leftLi.remove();
    	//左边的li删除
    	$("[id=li_"+num+"]").remove();
    	
    	//获得选中的列表样式的值
    	var sizeobj = $(modality.children()[ind]).find("input[name='size']:checked");
    	var size = $(modality.children()[ind]).find("input[name='size']:checked").val();
    	if(size=="2"){
    		//调用一下1大2小的点击事件
    		oneBigTwoSmall(sizeobj);
    	}
    	
    	//商品图片全部删掉时，左边默认的商品图片显示
    	var liLen = parentUl.children().length;
    	if(liLen<2){
    		$(module.children()[ind]).find("ul[name='leftName']").css("display","block");
            $(module.children()[ind]).find("ul[name='leftName']").next("ul").css("display","none");
            if(size==3){
            	buy_bottom_xx(ind);
            }else{
            	buy_bottom_qt(ind);
            }
    	}
    	oneBigTwoSmall_count--;
    }
    function buy_bottom_xx(ind){
    	var mod_li=$(module.children()[ind]).find(".control-group ul li");
        for(var i=0;i<mod_li.length;i++){
        	$(mod_li[i]).find(".goods-price").css({"position":"absolute","bottom":0,"left":"140px"});
        	$(mod_li[i]).find(".goods-price-taobao").css({"position":"absolute","bottom":"25px","left":"150px"});
        	var p_height=$(mod_li[i]).find(".goods-price").height();
        	var p_top=$(mod_li[i]).find(".goods-price").offset().top;
        	var div_height=$(mod_li[i]).find(".info").height();
        	var div_top=$(mod_li[i]).find(".info").offset().top;
        	var bottom=div_height+div_top-p_height-p_top+4;
        	$(mod_li[i]).find(".goods-buy").css("bottom",bottom-5);
        }
    }
    function buy_bottom_qt(ind){
    	//获取左边所有li的
        var mod_li=$(module.children()[ind]).find(".control-group ul li");
        for(var i=0;i<mod_li.length;i++){
        	$(mod_li[i]).find(".goods-price").attr("style","");
        	$(mod_li[i]).find(".goods-price-taobao").attr("style","padding-top:4px");
        	var p_height=$(mod_li[i]).find(".goods-price").height();
        	var p_top=$(mod_li[i]).find(".goods-price").offset().top;
        	var div_height=$(mod_li[i]).find(".info").height();
        	var div_top=$(mod_li[i]).find(".info").offset().top;
        	var bottom=div_height+div_top-p_height-p_top+4;
        	$(mod_li[i]).find(".goods-buy").css("bottom",bottom-5);
        }
    }
    $(function(){
    	//设置当前要拖拽的元素，声明当前拖拽元素的状态为false
        var goods_dragState=false,good_thisDiv=null;
        var divIndex= 0;
        //声明拖拽元素是第几个，拖拽元素的高度，拖拽元素中心位置，拖拽元素宽度
        var good_good_thisDivId= 0,good_good_thisDivHeight= 0,good_good_thisDivCenter=0,good_good_thisDivWidth= 0;
        //声明鼠标的偏移量(鼠标在元素中的位置)
        var good_range={x:0,y:0};
        //声明拖拽元素的四个坐标
        var thisCoord={x:0,y:0,x1:0,y1:0};
        //设置新添加的元素
        var good_newDiv=null;
        //设置目标div
        var good_tarDiv=null;
        //设置目标div的坐标
        var good_tarCoord={x:0,y:0,x1:0,y1:0};
        //声明拖拽元素右边对应的元素
        var good_rightDiv="";
      	//为每一个module_div绑定mousedown事件
        $("#modality").on("mousedown","ul[name='goods']>li.sort",function(e){
        	//将good_thisDiv清空
        	good_thisDiv=null;
        	//获取当前元素的top值
            var top=$(this).position().top;
            //如果当前点击的是最后一个元素，则图退出函数
        	if(!($(this).hasClass("sort"))) return false;
        	//设置good_thisDiv为当前点击的元素
            good_thisDiv=$(this);
            //设置good_thisDivId为当前元素的位置
            good_good_thisDivId=$(this).index();
            divIndex=$(this).parents("div.app-sidebar").index();
            //设置good_good_thisDivHeight为当前元素的高度
            good_good_thisDivHeight=$(this).height();
          	//设置good_good_thisDivHeight为当前元素的宽度
            good_good_thisDivWidth=$(this).width();
            //设置good_good_thisDivCenter为当前元素的中心
            good_good_thisDivCenter=good_good_thisDivHeight/2;
            //改变拖拽元素的拖拽状态为true
            goods_dragState=true;
            //设置鼠标元素相对偏移量(鼠标在元素中的位置)
            good_range.x=e.pageX-good_thisDiv.offset().left;
            good_range.y=e.pageY-good_thisDiv.offset().top;
            //设置拖拽元素的定位状态为relative,并设置更改class
            good_thisDiv.attr("class","");
            var li_left=e.pageX-$(this).parents("div.app-sidebar").offset().left-good_range.x;
            var li_top=e.pageY-$(this).parents("div.app-sidebar").offset().top-good_range.y;
            good_thisDiv.css({width:good_good_thisDivWidth+"px",height:good_good_thisDivHeight+"px",position:"absolute","z-index":5,"left":li_left,"top":li_top});
            //新建一个新的div并放在拖拽元素的下方
            var html="<li class='good_newDiv' style='width: "+good_good_thisDivWidth+"px;height:"+good_good_thisDivHeight+"px;border: 1px dotted #000;'>";
            html+="</li>";
            good_thisDiv.after(html);
        });
        $("#modality").on("mousemove","div[name='goods_img_slide']",function(e){
        	e.preventDefault();
            //如果拖拽元素的拖拽状态为true则继续执行，否则退出函数
            if (!goods_dragState) return false;
            //设置拖拽元素改变之后的坐标
            thisCoord.x= e.pageX-$(this).offset().left-good_range.x;
            thisCoord.y= e.pageY-$(this).offset().top-good_range.y;
            thisCoord.y1=thisCoord.y+good_good_thisDivHeight;
            //改变拖拽元素的位置
            good_thisDiv.css({left:thisCoord.x,top:thisCoord.y});
            //设置newDiv为新建的div
            good_newDiv=$("#modality ul[name='goods'] .good_newDiv");
            //重新获取module下面的元素
            var anew=$("#modality ul[name='goods']>li");
            //对新获取的元素进行循环
            anew.each(function(){
                //获取目标元素的坐标值
                good_tarDiv=$(this);
                var ul_left=$(good_tarDiv).parent().offset().left;
                var ul_top=$(good_tarDiv).parent().offset().top;
                good_tarCoord.x = good_tarDiv.offset().left+31;
                good_tarCoord.y = good_tarDiv.offset().top+$(this).width();
                if($(this).hasClass("sort")){
                	if(thisCoord.x+good_good_thisDivWidth<62&&thisCoord.y+good_good_thisDivHeight<=$(anew[0]).offset().top+130-ul_top){
                		good_newDiv.insertBefore($(anew[0]));
                	}else if(thisCoord.x+good_good_thisDivWidth>=good_tarCoord.x-ul_left&&thisCoord.y+good_good_thisDivHeight>=good_tarCoord.y-ul_top){
    	                good_newDiv.insertAfter(good_tarDiv);
    	            }
                }
            });
        })
         $("#modality").on("mouseup","div[name='goods_img_slide']",function(e){
            //如果good_thisDiv为空，则退出函数，否则继续执行
            if(good_thisDiv==null) return false;
            //将拖拽元素放在新建元素上
            good_thisDiv.insertBefore("#modality ul[name='goods'] .good_newDiv");
           //删除新建的div
           $("#modality ul[name='goods'] .good_newDiv").remove();
            //将good_thisDiv的定位状态回归原样，并将class恢复
            good_thisDiv.attr("class","sort");
            good_thisDiv.attr("style","");
            if(!goods_dragState) return false;
            //将拖拽元素的状态改为false
            goods_dragState=false;
            var sizeobj = $(modality.children()[divIndex]).find("input[name='size']:checked");
            var goods_ul=$("#modality ul[name='goods'] .sort");
            var left_ul=$(module.children()[divIndex]).find("ul[name='leftName']").next().children();
            for(var i=0;i<goods_ul.length;i++){
            	var img_url=$(goods_ul[i]).find("img").attr("src");
            	//获得右边的li的id
            	var img_id = $(goods_ul[i]).attr("id");
            	var img_num = img_id.substr(img_id.lastIndexOf('_')+1);
            	$(left_ul[i]).find("img.goods-photo").attr("src",img_url);
            	$(left_ul[i]).attr("id","li_"+img_num);
            }
        });
        
    });
    $("#modality").on("mousedown","ul[name='goods'] a.js-delete-goods",function(e){
    	e.stopPropagation(); 
    });
    $("#img_ul").on("mouseup","ul[name='goods'] a.js-delete-goods",function(e){
    	e.stopPropagation(); 
    	var ind = $(this).parents("div.app-sidebar").index();
    	//获得它的父级ul
    	var parentUl = $(this).parent().parent();
    	//获得右边的li
    	var leftLi = $(this).parent();
    	//获得右边的li的id
    	var leftLiId = leftLi.attr("id");
    	//获得右边的li的id的_后面的数字
    	var num  = leftLiId.substr(leftLiId.lastIndexOf('_')+1);
    	//右边的li删除
    	leftLi.remove();
    	//左边的li删除
    	$("[id=li_"+num+"]").remove();
    	//获得选中的列表样式的值
    	var sizeobj = $(modality.children()[ind]).find("input[name='size']:checked");
    	var size = $(modality.children()[ind]).find("input[name='size']:checked").val();
    	if(size=="2"){
    		//调用一下1大2小的点击事件
    		oneBigTwoSmall(sizeobj);
    	}
    	//商品图片全部删掉时，左边默认的商品图片显示
    	var liLen = parentUl.children().length;
    	if(liLen<2){
    		$(module.children()[ind]).find("ul[name='leftName']").css("display","block");
            $(module.children()[ind]).find("ul[name='leftName']").next("ul").css("display","none");
            if(size==3){
            	buy_bottom_xx(ind);
            }else{
            	buy_bottom_qt(ind);
            }
    	}
    	oneBigTwoSmall_count--;
    });


    