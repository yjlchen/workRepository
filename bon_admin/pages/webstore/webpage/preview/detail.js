//商品详情与评价切换的js
$(function(){
	$('.price-intro>h4').click(function(){
        if($('.price-intro').hasClass("js-unfold")){
        	$('.price-intro').removeClass("js-unfold");
        }else{
        	$('.price-intro').addClass("js-unfold");
        }
	})
	$('.js-tabber button').each(function(i,e){
		$(this).removeClass('active').siblings().addClass("active");
	})
	$('.goods').click(function(){
		$(this).addClass('active');
		$('.assess').removeClass("active");
		$('.js-goods-detail').show();
		$('.js-trade-review-list').hide();
	})
	$('.assess').click(function(){
		$(this).addClass('active');
		$('.goods').removeClass("active");
		$('.js-trade-review-list').removeClass("hide");
		$('.js-trade-review-list').show();
		$('.js-goods-detail').hide();
	})

	$('.js-review-tabber span button').click(function () {
		var i = $(this).parent().index();
		$(this).addClass('active').parent().siblings().find('button').removeClass("active");
		$('.js-review-part').eq(i).removeClass("hide").siblings().addClass('hide');		
//		$('.js-review-avatar').eq(i).removeClass("hide").siblings().addClass('hide');
	});
	
    
})