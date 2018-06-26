//全局变量
var coupon_count = 0;
//优惠券li变量，用来判断每次插入优惠券时循环几次
var coupon_li_for_count = 0;
var coupon=function (){
	this.left = 
		 	'<div class="app-field clearfix editing module_div">'
			+'	<div class="control-group">'
			+'	<ul class="custom-coupon clearfix" style="margin:auto" name="left_coupon_ul1">'
			+'	<li>'
			+'		<a href="javascript:;">                '
			+'			<div class="custom-coupon-price">  '
			+'			<span>￥</span>100</div>'
			+'			<div class="custom-coupon-desc">'
			+'				满500元可用'
			+'			</div>'
			+'		</a>'
			+'	</li>'
			+'	<li>'
			+'		<a href="javascript:;">                '
			+'			<div class="custom-coupon-price">  '
			+'			<span>￥</span>100</div>'
			+'			<div class="custom-coupon-desc">'
			+'				满500元可用 '
			+'			</div>'
			+'		</a>'
			+'	</li> '
			+'	<li>'
			+'		<a href="javascript:;">'
			+'			<div class="custom-coupon-price">'
			+'			<span>￥</span>100</div>'
			+'			<div class="custom-coupon-desc">'
			+'				满500元可用   '
			+'			</div>'
			+'		</a>'
			+'	</li>'
			+'	</ul>'
			+'	<ul class="custom-coupon clearfix" style="margin:auto;display:none" name="left_coupon_ul2">'
			+'	</ul>'
			+'</div> '
			+'<div class="actions">'
			+'	<div class="actions-wrap">'
			//+'		<span class="action edit">编辑</span> '
			//+'		<span class="action add">加内容</span> '
			+'		<span class="action delete">删除</span>'
			+'	</div>                                     '
			+'</div>                                       '
			+'<div class="sort">                           '
			+'	<i class="sort-handler"></i>               '
			+'</div>                                       '
			+'</div>                                       '
			
		this.right = 
			'<div class="app-sidebar" >'																
			+'	<div class="arrow"></div>'	
			+'	<div class="app-sidebar-inner js-sidebar-region"><div>'	
			+'	<form class="form-horizontal edit-custom-coupon" onsubmit="return false">'	
			+'	<div class="control-group">'	
			+'		<label class="control-label">优惠券：</label>'	
			+'		<div class="controls couponRight" style="margin-left:0">'	
			+'		<ul class="coupon-list" style="margin-bottom:0px;width: 310px;margin-left: 0;">'	
			+'		</ul>'	
			+'		<a href="javascript:;" class="control-action js-add-coupon" style="margin-top:0;">'	
			+'			添加优惠券  '	
			+'		</a>'	
			+'		<input type="hidden" name="coupon">'	
			+'		</div>'	
			+'	</div>'	
			+'</form>'	
			+'</div>'	
			+'</div>'	
			+'</div>'	
}

	//点击添加优惠券，弹出选择优惠券的弹窗列表
	$(modality).on("click",".couponRight>a",function(){
		//每次点击时，清空coupon_li_for_count全局变量
		coupon_li_for_count = 0;
		//重新定义它的长度
		coupon_li_for_count = $(this).prev().children().length;
		//获得索引
		var ind=$(this).parents("div.app-sidebar").index();
		parent.layer.open({
  		  title: ''
  		  ,type:2
  		  ,closeBtn: 1
  		  ,area:["800px","530px"]
  		  ,content:getRootPath()+'/commons/jsp/com_couponChooseList.jsp?ind='+ind+'&mutl_type=2'+'&coupon_li_for_count='+coupon_li_for_count
  		});
	});

	//获取优惠券选择页面传入的数组
	function query_coupons(idArr,ind,coupon_li_for_count){
		//默认的3个图片隐藏
    	$(module.children()[ind]).find("ul[name='left_coupon_ul1']").css("display","none");
    	//定义循环长度
    	var idArr_length = idArr.length;
    	//alert("当前控件的个数："+coupon_li_for_count);
    	//最开始，或者是把加了的都删了时
    	if(coupon_li_for_count<1){
        	if(idArr_length>3){
        		idArr_length=3;
        	}
    	}
    	//只剩1个时
    	else if(coupon_li_for_count==1){
    		if(idArr_length>2){
        		idArr_length=2;
        	}
    	}
    	//剩2个时
    	else if(coupon_li_for_count==2){
    		if(idArr_length>1){
        		idArr_length=1;
        	}
    	}
    	//已经加了3个时，此时不再进行添加
    	else if(coupon_li_for_count==3){
        	idArr_length=0;
    	}
    		for(var i=0;i<idArr_length;i++){
    			$.ajax({
    	        	"type":"post",
    	            "url": getRootPath()+"/coupon/queryCoupon.action",
    	            async: false,//同步
    	            'data' : {id:idArr[i]},
    	            "dataType":"json",
    	            'success' : function (data) {
    	            	var id = data.coupon.id;
    	    			var name = data.coupon.name;
    	    			//获得优惠券链接
    	    			var couponUrl = data.coupon.coupon_url;
    	    			var useCondition = "";
    	    			//判断是否有使用条件
    	    			if(data.coupon.threshold==2){
    	    				useCondition = "满"+data.coupon.threshold_money+"元可用";
    	    			}else{
    	    				useCondition = "无限制";
    	    			}
    	    			//定义价值
    	    			var str = "";
    	    			/*根据优惠形式字段，进行不同的显示 */
    	    			//指定金额
    	    			if(data.coupon.offer_type==1){
    	    				//如果有结束金额
    	    				if(data.coupon.offer_data_end!=""&&data.coupon.offer_data_end!=null){
    	    					str = data.coupon.offer_data_start+"元~"+data.coupon.offer_data_end+"元";
    	    				}else{
    	    					str = data.coupon.offer_data_start+"";
    	    				}
    	    			}
    	    			//折扣
    	    			else if(data.coupon.offer_type==2){
    	    				str = data.coupon.offer_discount+"折";
    	    			}
    	    			insert_coupons(id,name,useCondition,ind,str,couponUrl);
    	            },
    	            'error':function(){
    	            	
    	            }
    		    });
    			
    		}
	}

	
	//左右两侧增加元素
	function insert_coupons(id,name,useCondition,ind,str,couponUrl){
		//alert(str.indexOf("折"));
		//定义右边的ul下增加的li
		var rightLi = 
			'  <li id="couponRightLi_'+coupon_count+'" style="margin-left: 0;">'
            +'    <div class="coupon-list-content">'
            +'        <div class="coupon-list-summary">'
            +'            <span class="label label-success">优惠券</span>'
            +'            <span>'+name+'</span>'
            +'            <span class="c-gray">'
            +'                    '+useCondition+' '
            +'            </span>'
            +'        </div>'
            +'    </div> '
            +'    <div class="coupon-list-opts" style="top:20px;">'
            +'        <a href="javascript:;" class="js-remove-coupon" onclick=remove_coupon("'+coupon_count+'","'+ind+'")>删除</a>'
            +'    </div> '
            +'</li>'
        //定义左边的ul下增加的li
        var leftLi = 
        	' <li id="couponLeftLi_'+coupon_count+'">'
            +'   <a href="'+couponUrl+'">'
            +'     <div class="custom-coupon-price"> ';
            if(str.indexOf("折")!=-1){
            	leftLi += ''+str+'';
            }else{
            	leftLi += '<span>￥</span>'+str+'  ';
            }
            leftLi+='      </div>';
            leftLi+='      <div class="custom-coupon-desc">';
            if(useCondition=="无限制"){
            	leftLi+='无门槛使用';
            }else{
            	leftLi+=' '+useCondition+' ';
            }
            leftLi+=' </div>'
            +'     </a>'
            +' </li>';
        //左边加上真正的优惠券，隐藏默认    
        $(module.children()[ind]).find("ul[name='left_coupon_ul1']").css("display","none");
        $(module.children()[ind]).find("ul[name='left_coupon_ul2']").append(leftLi);
		//右边加上优惠券列表
		var right_ul = $(modality.children()[ind]).find(".couponRight ul.coupon-list");
		right_ul.append(rightLi);
        $(module.children()[ind]).find("ul[name='left_coupon_ul2']").css("display","block");
        //选择3个优惠券时，"添加优惠券"隐藏
        if(right_ul.children().length==3){
        	$(modality.children()[ind]).find(".couponRight>a.js-add-coupon").css("display","none");
        }
        coupon_li_for_count++;
        coupon_count++;
	}
	
	
	//删除优惠券
	function remove_coupon(coupon_count,ind){
		//删除左边的li
		$("#couponLeftLi_"+coupon_count).remove();
		//删除右边的li
		$("#couponRightLi_"+coupon_count).remove();
		//当这组控件小于3个优惠券时，“添加优惠券”显示
		if($(modality.children()[ind]).find(".couponRight ul").children().length<3){
			$(modality.children()[ind]).find(".couponRight>a.js-add-coupon").css("display","block");
		}
	}
	
	