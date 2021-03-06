$(function(){
	//モーダルウィンドウを開く
	function showModal(event) {
		event.preventDefault();

		var $shade = $('<div></div>');
		$shade.attr('id', 'shade')
		.on('click', hideModal);

		var $modalWin = $('#modalwin');
		var $window = $(window);
		var posX = ($window.width() - $modalWin.outerWidth()) /2;
		var posY = ($window.height() - $modalWin.outerHeight()) /2;

		$modalWin
		.before($shade)
		.css({left: posX, top: posY})
		.removeClass('hide')
		.addClass('show')
		.on('click', 'button, .modal-close', function(){
				hideModal();
		});
	};
	//モーダルウィンドウを閉じる
	function hideModal() {
			$('#shade').remove();
			$('#modalwin')
			.removeClass('show')
			.addClass('hide')
	};

	$('.show-modal').on('click', showModal);
});

$(function(){

    function mediaDetect(query){
        if(window.matchMedia){
            return window.matchMedia(query).matches
        } else {
          return false;
        }
    }
    $(window).on('scroll', function(){
      var scrollValue = $(this).scrollTop();
      //console.log(scrollValue);
      $('.fixedmenu')
      .trigger('customScroll', {posY: scrollValue});
    });

    $('.fixedmenu')
    .each(function(){
        var $this = $(this);
        $this.data('initial', $this.offset().top);
    })
    .on('customScroll', function(event, object){
      //console.log('customScroll %s', object.posY);
      var $this = $(this);

      if($this.hasClass('noresponsive') && mediaDetect('(max-width:600px)')){
          //なにもしない
      } else {
      var offsetTop = 0;
      if ($this.data('offsettop')){
          offsetTop = $this.data('offsettop');
      }

      if($this.data('initial') - offsetTop <= object.posY) {
        //要素を固定
        if(!$this.hasClass('fixed')) {
          var $substitute = $('<div></div>');
          $substitute
          .css({
              'margin': '0',
              'padding': '0',
              'font-size': '0',
              'height': '0'
          })
          .addClass('substitute')
          .height($this.outerHeight(true))
          .width($this.outerWidth(true));
          $this
          .after($substitute)
          .addClass('fixed')
          .css({top: offsetTop});
        }
      } else {
        //要素の固定を解除
        $this.next('.substitute').remove();
        $this.removeClass('fixed');
      }
    }
    });
});
$(function(){
    $('a.scroll-link').on('click', function(event){
      event.preventDefault();

      var $this = $(this);
      var linkTo = $this.attr('href');
      var $target;
      var offset = 0;
      var pos = 0;
      if(linkTo != '#top'){
      var $target = $(linkTo);
      var offset = $target.data('offsettop');
      var pos = $target.offset().top - offset;
      }
      $('html,body').animate({scrollTop: pos},400);
    });
});
$(function(){
    $(window).on('scroll',function(){
        $('a.scroll-track').each(function(){
            var $window = $(window);
            var $this = $(this);
            var linkTo = $this.attr('href');
            var $target = $(linkTo);
            var offset = $target.data('offsettop') || 0;
            var tolerance = 1;
            var topLimit = $target.offset().top - offset - tolerance;
            var bottomLimit = $target.offset().top + $target.outerHeight() - offset + tolerance;

            if(topLimit <= $window.scrollTop() && $window.scrollTop() <= bottomLimit){
                $this.addClass('selected');
            }else{
                $this.removeClass('selected')
            }
        });
    });
});
