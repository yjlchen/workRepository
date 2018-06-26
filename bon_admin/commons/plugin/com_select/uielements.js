$(function(){  
	 initdiv('-select');
});

function initdiv(dtag){
	/*复选标签框*/
	//获取生成的列表ul
	var dropList = $('.controls'+dtag+' .chosen-container .chosen-drop .chosen-results');
	//往里添加li
	$('.controls'+dtag+' .chosen-select option').each(function (index) {
	  dropList.append('<li class="active-result" style="" data-option-array-index="'+0+'">'+this.text+'</li>')
	});
	
	// $('.chosen-container').focusin(function () {
	//   $(this).toggleClass('chosen-with-drop chosen-container-active');
	// });
	var dropListLi = $('.controls'+dtag+' .chosen-container .chosen-drop .chosen-results li');
	dropListLi.click(function () {
		
	  $(this).removeClass('active-result');
	  $(this).addClass('result-selected');
	  $('.controls'+dtag+' .chosen-container').toggleClass('chosen-with-drop chosen-container-active');
	  $(this).parent().parent().prev().children('.search-field')
	    .before('<li class="search-choice"><span>'+this.textContent+'</span><a class="search-choice-close" data-option-array-index="'+'"></a></li>');
	  $('.search-choice-close').click(function () {
	    $(this).parent().remove();
	  });
	}).mouseover(function () {
	  $(this).toggleClass('highlighted');
	}).mouseout(function () {
	  $(this).toggleClass('highlighted');
	});


	$('.chosen-container').focusin(function () {
	  $(this).toggleClass('chosen-with-drop chosen-container-active');
	});

	$('.search-choice-close').click(function () {
	  console.log(1);
	});
}
































