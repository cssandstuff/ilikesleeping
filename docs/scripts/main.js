$(document).ready(function(){
  var currentIndex = 0;
  var activeIndex = 0;

  var $imageCollection = $('.homeshow img');
  var rightIndex = activeIndex;
  var leftIndex = activeIndex;

  $("body").keyup(function(e) {
    if(e.which == 37) { // left
      
      $('#left').addClass('pulseOnce');
      $('#left').one('webkitAnimationEnd oanimationend msAnimationEnd animaionend', function(e) {
        $('#left').removeClass('pulseOnce');
      });
     if(leftIndex > 0 && leftIndex!==null){
       //We're not at the end yet
       rightIndex = leftIndex - 1;
       
       $('.cloned.in img').addClass('out');
       $('.cloned.in img').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
				 $('.cloned.in img').attr('src', $imageCollection[leftIndex].src);
         $('.cloned.in img').removeClass('out');
			 });
       
       leftIndex = leftIndex - 1;
     }else{

       //we're at the end
       leftIndex = $imageCollection.length - 1;
       $('.cloned.in img').addClass('out');
       $('.cloned.in img').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
				 $('.cloned.in img').attr('src', $imageCollection[leftIndex].src);
         $('.cloned.in img').removeClass('out');
			 });

       rightIndex = $imageCollection.length - 1;
     }
    }
    else if(e.which == 39) { // right
      $('#right').addClass('pulseOnce');
      $('#right').one('webkitAnimationEnd oanimationend msAnimationEnd animaionend', function(e) {
        $('#right').removeClass('pulseOnce');
      });
      if(rightIndex != ($imageCollection.length - 1)){
       leftIndex = rightIndex + 1;

       $('.cloned.in img').addClass('out');
       $('.cloned.in img').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
				$('.cloned.in img').attr('src',$imageCollection[rightIndex].src);
        $('.cloned.in img').removeClass('out');
       });
       rightIndex = rightIndex + 1;
     }else{
       //we're at the end
       $('.cloned.in img').addClass('out');
       $('.cloned.in img').one('webkitTransitionEnd otransitionend msTransitionEnd transitionend', function(e) {
				$('.cloned.in img').attr('src',$imageCollection[rightIndex].src);
        $('.cloned.in img').removeClass('out');
			 });
       
       rightIndex = 0;
       leftIndex = $imageCollection.length;
     }
    }
  });
  
   

   $('.homeshow li img').click(function(){
     // remove any existing modals
    $("body").find('.cloned, .modalbg').remove();
    
    //create the modal
    $("body").append("<div class=\"modalbg\"></div>");
    
    // Wait 30ms else bad things happen?
    setTimeout(function(){
      // Bring Modal in
      $("body").find('.modalbg').addClass("in");
      
      // Attach click event to close modal
      $(".modalbg").click(function(){
        $(this).removeClass("in");
        $("body").find('.cloned').addClass("out");
        $('.logo').removeClass('in'); 
        rightIndex = 0;
        leftIndex = 0;
      });
      
      // Set stuff to make the modal close if page is scrolled quickly
      // https://stackoverflow.com/questions/21660348/how-to-detect-scroll-speed-with-jquery
      var lastOffset = $(window).scrollTop();
      var lastDate = new Date().getTime();

        $(window).scroll(function(e) {
            var delayInMs = e.timeStamp - lastDate;
            var offset = $(window).scrollTop() - lastOffset;
            var speedInpxPerMs = offset / delayInMs;

            lastDate = e.timeStamp;
            lastOffset = $(window).scrollTop();

            if (speedInpxPerMs > 1.9){
               // downscroll code
              $(".modalbg").removeClass("in");
              $("body").find('.cloned').addClass("out");
              $('.logo').removeClass('in'); 
             }

            if (speedInpxPerMs < -1.9){
              //upscroll code
              $(".modalbg").removeClass("in");
              $("body").find('.cloned').addClass("out"); 
              $('.logo').removeClass('in'); 
            }
        });
    },30);
    
    
    var $clone = $(this).clone();
    var $this = $(this);
    var scrollTop = $(window).scrollTop();
    var currentImage = $clone[0].src;
    $imageCollection = $this.parent().parent().parent().find('img');
    currentIndex = $this.parent().parent().index();
    $clone.addClass('clonedimage');

    $("body").append($clone);
    $('.clonedimage').wrap('<div class="cloned"></div>');
    $('.cloned').prepend('<div id="left"></div><div id="right"></div>');
    $('#left').on('click', function(){
      var e = $.Event("keyup");
      e.which = 37; // # Some key code value
      $("body").trigger(e);
      $.Event("keyup", {keyCode: 37});
    });

    $('#right').on('click', function(){
      var e = $.Event("keyup");
      e.which = 39; // # Some key code value
      $("body").trigger(e);
    });

    setTimeout(function(){  
      $("body").find('.cloned').addClass("in");
      $('.logo').addClass('in');
    },30);
    
  });

  $(window).resize(function(){
    if ($('.cloned').length!=0){
      var imageWidth = $('.cloned')[0].width/2;
      $('.cloned').css("margin-left", "-"+imageWidth+"px");
    }
  });
});