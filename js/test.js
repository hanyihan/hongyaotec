$(function(){

	var playvid = $('.playvideo');
	var cover = $('.cover');
	var vide = $('.vide');

	var vid_item = $('.vid-item')

	$('.reco_item').on('click',function(){
		var index = $(this).index();
		showcover(index);
		playvideo(index);
	});

	cover.on("click",function() {
		pauseplay();
		hidecover();
	})

	var hidecover = function(){
		cover.css("display","none");
		playvid.css("display","none");
	}

	var showcover = function(index){
		cover.css("display","block");
		playvid.css("display","block");
		vide[index].play();
	}


	var playvideo = function(index) {
		var item =vid_item.eq(index);
		item.addClass("current").siblings().removeClass("current");
	}

	var pauseplay = function(){
		for(var i = 0; i <vide.length; i++) {
			if(vide[i].played) {
				vide[i].pause();
			}
		}
		return;
	};
});