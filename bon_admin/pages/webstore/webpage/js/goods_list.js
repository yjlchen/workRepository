//插入图片for循环中的累加变量    用于判断1大2小的排列样式
var oneBigTwoSmall_count_goodlist = 0;
var img_sum=0;
var goods_list=function(){
	 //定义预览模块DOM内容
	this.left = 
		'<div class="app-fields js-fields-region module_div">'
		+'    <div class="app-fields ui-sortable">'
		+'        <div class="app-field clearfix editing">'
		+'            <div class="control-group">'
		+'                <div class="js-goods-style-region">'
		+'                    <div>'
		+'                        <ul class="sc-goods-list clearfix size-2 card pic" name="leftName">'
		+'                            <li class="goods-card big-pic card">'
		+'                                <a href="javascript: void(0);" class="link js-goods clearfix">'
		+'                                    <div class="photo-block">'
		+'                                        <img class="goods-photo js-goods-lazy" src='+getRootPath()+'/pages/commodity/image/good1.jpg>'
		+'                                    </div>'
		+'                                    <div class="info clearfix info-no-title info-price">'
		+'                                        <p class="goods-title">此处显示商品名称</p>'
		+'    									  <p class="goods-sub-title c-black hide">此处显示商品描述</p>'	
		+'                                        <p class="goods-price"><em style="font-size:16px;color:#f00">￥379.00</em></p>'
		+'                                    </div>'
		+'                                    <div class="goods-buy btn1 "></div>'
		+'                                </a>'
		+'                            </li>'
		+'                            <li class="goods-card small-pic card">'
		+'                                <a href="javascript: void(0);" class="link js-goods clearfix">'
		+'                                    <div class="photo-block">'
		+'                                        <img class="goods-photo js-goods-lazy" src='+getRootPath()+'/pages/commodity/image/good2.jpg>'
		+'                                    </div>'
		+'                                    <div class="info clearfix info-no-title">'
		+'                                        <p class="goods-title">此处显示商品名称</p>'
		+'    									  <p class="goods-sub-title c-black hide">此处显示商品描述</p>'	
		+'                                        <p class="goods-price"><em style="font-size:16px;color:#f00">￥5.50</em></p>'
		+'                                    </div>'
		+'                                    <div class="goods-buy btn1"></div>'
		+'                                </a>'
		+'                            </li>'
		+'                            <li class="goods-card small-pic card">'
		+'                                <a href="javascript: void(0);" class="link js-goods clearfix">'
		+'                                    <div class="photo-block">'
		+'                                        <img class="goods-photo js-goods-lazy" src='+getRootPath()+'/pages/commodity/image/good3.jpg>'
		+'                                    </div>'
		+'                                    <div class="info clearfix info-no-title">'
		+'                                        <p class="goods-title">此处显示商品名称</p>'
		+'    									  <p class="goods-sub-title c-black hide">此处显示商品描述</p>'			
		+'                                        <p class="goods-price"><em style="font-size:16px;color:#f00">￥60.00</em></p>'
		+'                                    </div>'
		+'                                    <div class="goods-buy btn1"></div>'
		+'                                </a>'
		+'                            </li>'
		+'                        </ul>'
				//新加入的ul
		+'		<ul class="sc-goods-list clearfix card size-2 pic" style="display:none;">'		
		+'		</ul>'
		+'                    </div>'
		+'                </div>'
		+'            </div>'
		+'            <div class="actions">'
		+'                <div class="actions-wrap">'
		//+'                    <span class="action edit">编辑</span>'
		//+'                    <span class="action add">加内容</span>'
		+'                    <span class="action delete">删除</span>'
		+'                </div>'
		+'            </div>'
		+'            <div class="sort">'
		+'                <i class="sort-handler"></i>'
		+'            </div>'
		+'        </div>'
		+'    </div>'
		+'</div>';
	
	this.right=
		'<div class="app-sidebar" style="margin-top: 64px;">'
		+'    <div class="arrow"></div>'
		+'    <div class="app-sidebar-inner js-sidebar-region">'
		+'        <div>'
		+'            <form class="form-horizontal" novalidate="">'
		+'                <div class="control-group control-group-one">'
		+'                    <label class="control-label">商品来源：</label>'
		+'                    <div class="controls" style="margin-left: 10px;width: 295px;">'
								//右边的增加图片的ul，与goods中一样，但此处隐藏
		+'                      <ul class="module-goods-list clearfix ui-sortable" name="goods" style="display:none">'
        +'								<li>'
        +'									<a href="javascript:void(0);" class="js-add-goods add-goods">'
        +'										<i class="icon-add" style="margin-top:18px"></i>'
        +'									</a>'
        +'								</li>'
		+'					    </ul>'
		+'                        <a href="javascript:void(0);" class="js-add-goods control-action commodityList" >从商品分组中选择</a>'
		+'                        <p class="help-desc">选择商品来源后，左侧实时预览暂不支持显示其包含的商品数据</p>'
		+'                    </div>'
		+'                </div>'
		+'                <div class="control-group">'
		+'                    <label class="control-label">显示个数：</label>'
		+'                    <div class="controls" style="margin-left: 10px;">'
		+'                        <label class="radio inline">'
		+'                            <input type="radio" name="goods_number_type" value="6" checked="">6'
		+'                        </label>'
		+'                        <label class="radio inline">'
		+'                            <input type="radio" name="goods_number_type" value="12">12'
		+'                        </label>'
		+'                        <label class="radio inline">'
		+'                            <input type="radio" name="goods_number_type" value="18">18'
		+'                        </label>'
		+'                    </div>'
		+'                </div>'
		+'            </form>'
		+'            <div class="js-goods-style-region" style="margin-top: 10px;">'
		+'                <div>'
		+'                    <form class="form-horizontal" novalidate="">'
		+'                        <div class="control-group">'
		+'                            <label class="control-label">列表样式：</label>'
		+'                            <div class="controls" style="margin-left: 10px;width: 300px;">'
		+'                                <label class="radio inline">'
		+'                                    <input type="radio" name="size" value="0"" onclick="bag(this)">大图'
		+'                                </label>'
		+'                                <label class="radio inline">'
		+'                                    <input type="radio" name="size" value="1" onclick="small(this)">小图'
		+'                                </label>'
		+'                                <label class="radio inline">'
		+'                                    <input type="radio" name="size" value="2" checked="" onclick="oneBigTwoSmall(this)">一大两小'
		+'                                </label>'
		+'                                <label class="radio inline">'
		+'                                    <input type="radio" name="size" value="3" onclick="xiangxi(this)">详细列表'
		+'                                </label>'
		+'                            </div>'
		+'                        </div>'
		+'                        <div class="control-group">'
		+'                            <div class="controls">'
		+'                                <div class="controls-card">'
		+'                                    <div class="controls-card-tab" style="width:350px;">'
		+'                                        <label class="radio inline">'
		+'                                            <input type="radio" name="size_type" value="0" checked="">'
		+'                                            卡片样式'
		+'                                        </label>'
		+'                                        <label class="radio inline">'
		+'                                            <input type="radio" name="size_type" value="2">'
		+'                                            极简样式'
		+'                                        </label>'
		+'										  <label class="radio inline" style="display:none">'
		+'											  <input type="radio" name="size_type" value="3">'
		+'											  促销'
		+'										   </label>'
		+'                                    </div>'
		+'                                    <div class="controls-card-item">'
		+'                                        <div>'
		+'                                            <label class="checkbox inline">'
		+'                                                <input type="checkbox" name="buy_btn" value="1" checked="">显示购买按钮'
		+'                                            </label>'
		+'                                        </div>'
		+'                                        <div style="margin: 10px 0 0 20px;">'
		+'                                            <label class="radio inline">'
		+'                                                <input type="radio" name="buy_btn_type" value="1" checked="">'
		+'                                                样式1'
		+'                                            </label>'
		+'                                            <label class="radio inline">'
		+'                                                <input type="radio" name="buy_btn_type" value="2">'
		+'                                                样式2'
		+'                                            </label>'
		+'                                            <label class="radio inline">'
		+'                                                <input type="radio" name="buy_btn_type" value="3">'
		+'                                                样式3'
		+'                                            </label>'
		+'                                            <label class="radio inline">'
		+'                                                <input type="radio" name="buy_btn_type" value="4">'
		+'                                                样式4'
		+'                                            </label>'
		+'                                        </div>'
		+'                                    </div>'
		+'                                    <div class="controls-card-item">'
		+'                                        <label class="checkbox inline">'
		+'                                            <input type="checkbox" name="title" value="1">显示商品名'
		+'                                        </label>'
		+'                                    </div>'
		/*+'                                    <div class="controls-card-item">'
		+'                                        <label class="checkbox inline">'
		+'                                            <input type="checkbox" name="show_sub_title" value="1">显示商品简介'
		+'                                        </label>'
		+'                                    </div>'*/
		+'                                    <div class="controls-card-item">'
		+'                                        <label class="checkbox inline">'
		+'                                            <input type="checkbox" name="price" value="1" checked="">显示价格'
		+'                                        </label>'
		+'                                    </div>'
		+'                                </div>'
		+'                            </div>'
		+'                        </div>'
		+'                    </form>'
		+'                </div>'
		+'            </div>'
		+'        </div>'
		+'    </div>'
		+'</div>';
};

	//显示个数
	$(modality).on("click","input[name='goods_number_type']",function(){
		$(this).attr("checked",true);
		$(this).parent().siblings().children("input").attr("checked",false);
	});
	
	
	//显示购买按钮
	$(modality).on("click","input[name='buy_btn']",function(){
		$(this).parents(".controls-card-item").children().eq(1).toggle();
	});
	
	//显示商品简介
	$(modality).on("click","input[name='show_sub_title']",function(){
		var ind=$(this).parents("div.app-sidebar").index();
		if($(this).prop("checked")){
			$(module.children()[ind]).find("p.goods-sub-title").removeClass("hide");
			$(this).attr("checked",true);
		}else{
			$(module.children()[ind]).find("p.goods-sub-title").addClass("hide");
			$(this).attr("checked",false);
		}
	});
	
	
	/**
     * 调用共用商品选择弹出框
     * @param mutl_type 图片弹出框里的图片是否可以多选  1 单选  2多选
     */
    $(modality).on("click","a.commodityList",function(){
    	var ind=$(this).parents("div.app-sidebar").index();
    	//初始化每一个商品列表控件的商品数量，用于一大两小的添加
    	var ul_li = $(this).prev().children();
    	oneBigTwoSmall_count_goodlist = ul_li.length-1;
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
    	//全局变量，取最大值+1
    	img_sum=Number(max)+1;
    	//获得列表样式的值
    	var size = $(modality.children()[ind]).find("input[name='size']:checked").val();
    	//获得显示个数的值
    	var goods_number_type = $(modality.children()[ind]).find("input[name='goods_number_type']:checked").val();
    	parent.layer.open({
    		  title: ''
    		  ,type:2
    		  //,maxmin:true
    		  ,closeBtn: 1
    		  ,area:["800px","530px"]
    		  ,content:getRootPath()+'/commons/jsp/com_goodsGroup.jsp?ind='+ind+'&size='+size+'&leixing=commodityList'+'&goods_number_type='
    		 	+goods_number_type
    		});
    });
    
    
    
    //获取图片选择页面传入的图片数组，插入到图片
    function query_goods1(idArr,size,ind){
    	//清空之前分组的商品
    	$(module.children()[ind]).find("ul[name='leftName']").next("ul").empty();
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
    	    				if(oneBigTwoSmall_count_goodlist%3==0){
    	    					insert_bigpic1(url,price,goodName,ind,idArr[i],original_price);
    	    				}
    	    				//其他情况调用公共插入图片方法
    	    				else{
    	    					insert_goods1(url,price,goodName,size,ind,idArr[i],original_price);
    	    				}
    	    			}
    	    			//其他情况调用公共插入图片方法
    	    			else{
    	    				insert_goods1(url,price,goodName,size,ind,idArr[i],original_price);
    	    			}
    	    			oneBigTwoSmall_count_goodlist++;
    	            },
    	            'error':function(){
    	            	
    	            }
    		    });
    			
    		}
    	}
    }
    
    
    //插入图片
    function insert_goods1(url,price,goodName,size,ind,goodId,original_price){
    	var str = 
    		'<li class="sort" id="good_'+img_sum+'">'
    		+'	<input type="hidden" value='+goodId+'>'				
    		+'	<a href="javascript: void(0);" target="_blank">'
    		+'	<img src="'+url+'" alt="商品图" width="50" height="50"></a>'
    		+'	<a class="close-modal js-delete-goods small hide"  title="删除" onclick="deleteGood(this)">×</a>'
    		+'</li>'
		//右边的ul加上li的商品图片
    	$(modality.children()[ind]).find("ul[name='goods']").prepend(str);
    	
    	//获取购买按钮单选框，选中的按钮的值
    	var num = $(modality.children()[ind]).find("input[name='buy_btn_type']:checked").val();
    	
    	//leftstr有4种情况
    	var leftstr;
    	//大图
        if(size=="0"){
    		leftstr = 
    			'<li class="goods-card card big-pic" id="li_'+img_sum+'">'
    			+'	<input type="hidden" value='+goodId+'>'	
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
    			+'		<div class="photo-block">'
        		+'			<img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'		</div>'
        		+'		<div class="info clearfix info-price">'
        		+'			<p class="goods-title">'+goodName+'</p>'
        		+'			<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>'
        		+'			<p class="goods-price-taobao" style="padding-yop:4px;">'+original_price+'</p>'
        		+'			<div class="goods-buy btn'+num+'"></div>'
        		+'		</div>'
        		+'	</a>'
        		+'</li>'	
    	}
        //小图
        else if(size=="1"){
        	leftstr = 
    			'<li class="goods-card card small-pic" id="li_'+img_sum+'">'
    			+'	<input type="hidden" value='+goodId+'>'	
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
    			+'		<div class="photo-block">'
        		+'			<img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'		</div>'
        		+'		<div class="info clearfix info-price">'
        		+'			<p class="goods-title">'+goodName+'</p>'
        		+'			<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>'
        		+'			<p class="goods-price-taobao">'+original_price+'</p>'
        		+'			<div class="goods-buy btn'+num+'"></div>'
        		+'		</div>'
        		+'	</a>'
        		+'</li>'
        }
        //1大2小，只插入小图，大图在另一个方法中插入
        else if(size=="2"){
        	leftstr = 
    			'<li class="goods-card card small-pic" id="li_'+img_sum+'">'
    			+'	<input type="hidden" value='+goodId+'>'	
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
    			+'	<div class="photo-block">'
        		+'		<img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'	</div>'
        		+'	<div class="info clearfix info-price">'
        		+'		<p class="goods-title">'+goodName+'</p>'
        		+'		<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>'
        		+'		<p class="goods-price-taobao">'+original_price+'</p>'
        		+'		<div class="goods-buy btn'+num+'"></div>'
        		+'	</div>'
        		+'	</a>'
        		+'</li>'
        }
        //详细列表
        else if(size=="3"){
        	leftstr = 
        		'<li class="goods-card card" id="li_'+img_sum+'">'
        		+'	<input type="hidden" value='+goodId+'>'	
    			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
        		+'			   <div class="photo-block">'
        		+'				   <img class="goods-photo js-goods-lazy" src="'+url+'">'
        		+'			   </div>'
        		+'			   <div class="info clearfix info-price">'
        		+'					<p class="goods-title">'+goodName+'</p>'
        		+'					<p class="goods-price" style="position:absolute;bottom:0;left:140px;><em style="font-size:16px;color:#f00">￥'+price+'</em></p>'
        		+'					<p class="goods-price-taobao" style="position:absolute;bottom:25px;left:150px;">'+original_price+'</p>'
        		+'					<div class="goods-buy btn'+num+'"></div>'
        		+'			   </div>'
        		+'	</a>'
        		+'</li>'
        }
    		
        //左边ul追加上真正的商品图片
        $(module.children()[ind]).find("ul[name='leftName']").css("display","none");
        $(module.children()[ind]).find("ul[name='leftName']").next("ul").append(leftstr);
        $(module.children()[ind]).find("ul[name='leftName']").next("ul").show();
        $(modality.children()[ind]).find("input[name='title']").attr("checked",true);
        img_sum++;
    }
  
    
    
    //插入1大2小的大图
    function insert_bigpic1(url,price,goodName,ind,goodId,original_price){
    	var str = 
    		'<li class="sort" id="good_'+img_sum+'">'
    		+'	<a href="javascript: void(0);" target="_blank">'
    		+'	<img src="'+url+'" alt="商品图" width="50" height="50"></a>'
    		+'	<a class="close-modal js-delete-goods small hide"  title="删除" onclick="deleteGood(this)">×</a>'
    		+'</li>'
		//右边的ul加上li的商品图片
    	$(modality.children()[ind]).find("ul[name='goods']").prepend(str);
    	//获取购买按钮单选框，选中的按钮的值
    	var num = $(modality.children()[ind]).find("input[name='buy_btn_type']:checked").val();
    	
    	//左边ul追加上真正的商品图片,这里只是加入大图
    	var leftstr = 
			'<li class="goods-card card big-pic" id="li_'+img_sum+'">'
			+'	<input type="hidden" value='+goodId+'>'	
			//a改为onclick事件，因为需要走微信授权
			+'	<a class="link js-goods clearfix" href="javascript:void(0);" onclick="isWeiXinOut(\''+commodityDetailPath+goodId+'\')">'
			+'			   <div class="photo-block">'
    		+'				   <img class="goods-photo js-goods-lazy" src="'+url+'">'
    		+'			   </div>'
    		+'			   <div class="info clearfix info-price">'
    		+'					<p class="goods-title">'+goodName+'</p>'
    		+'					<p class="goods-price"><em style="font-size:16px;color:#f00">￥'+price+'</em></p>'
    		+'					<p class="goods-price-taobao" style="padding-top:4px;">'+original_price+'</p>'
    		+'					<div class="goods-buy btn'+num+'"></div>'
    		+'			   </div>'
    		+'	</a>'
    		+'</li>'
    	
    		$(module.children()[ind]).find("ul[name='leftName']").css("display","none");
            $(module.children()[ind]).find("ul[name='leftName']").next("ul").append(leftstr);
            $(module.children()[ind]).find("ul[name='leftName']").next("ul").show();
            $(modality.children()[ind]).find("input[name='title']").attr("checked",true);
            img_sum++;
    }
