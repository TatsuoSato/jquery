$(function(){
    $('.nav-info')
    .on('click',function(){
        $('.wrapper-headerinfo').slideToggle('slow');
    });
});
$(function(){
    $(window)
    .on('resize', function(){
        var $nav = $('.nav-global');
        var listFloat = $nav.find('li').css('float');
        if(listFloat == 'none'){
            $nav.css('display', 'none');
        } else {
            $nav.css('display', 'block');
        }
    });

})
$(function(){
    $('.menubtn > a')
    .on('click' ,function(){
        $('.nav-global').slideToggle(400);
    });
});
$(function(){
    $('.tab-menu')
    .on('click','li > a', function(event){
        event.preventDefault();
        var $this = $(this);

        //ボタンをアピアランスを変更する
        $this.parent().siblings()
        .removeClass('selected')
        .end()
        .addClass('selected');

        //コンテンツを切り換える
        var tabId = $this.data('tabid');
        $this.closest('.tab').find('.tab-contents').children()
        .each(function(){
            var $content = $(this);
            if($content.data('contentid') == tabId){
                $content.removeClass('hidden');
            } else {
                $content.addClass('hidden');
            }
        });
    })
});
