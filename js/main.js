$( document ).ready(function() {
    preloadCursors();
    $('audio#eel').trigger('load');
    var spotCounter = 1;
    if (Modernizr.touchevents){
    	var eelWidth=35;
    	var eelHeight=30;
    } else {
        var eelWidth=127;
        var eelHeight=127;
    }

    var theface = $('#face');
    makeUnselectable(theface);

    $('#face-container').mousedown(function(event){
    	$(this).addClass('punching');
    	$(this).append($('#original-spot').clone().removeAttr('id').attr('id','spot-'+spotCounter).css('left', event.pageX - eelWidth).css('top', event.pageY - eelHeight));
    	$('audio#eel').trigger('play');
        spotCounter++;
    });
    $('#face-container').mouseup(function(){
    	$(this).removeClass('punching');
        if (ga){
            //if google analytics is loaded, trigger event for punch
            ga('send', 'event', 'face', 'punch', 'eel', 1);
        }
    });

    function preloadCursors(){
         // counter
         var i = 0;

         // create object
         imageObj = new Image();

         // set image list
         images = new Array();
         images[0]='img/cursor_eel_rotated.png';

         // start preloading
         for(i=0; i<=(images.length-1); i++)
         {
              imageObj.src=images[i];
         }
    }

    function makeUnselectable($target) {
    $target
        .addClass( 'unselectable' ) // All these attributes are inheritable
        .attr( 'unselectable', 'on' ) // For IE9 - This property is not inherited, needs to be placed onto everything
        .attr( 'draggable', 'false' ) // For moz and webkit, although Firefox 16 ignores this when -moz-user-select: none; is set, it's like these properties are mutually exclusive, seems to be a bug.
        .on( 'dragstart', function() { return false; } );  // Needed since Firefox 16 seems to ingore the 'draggable' attribute we just applied above when '-moz-user-select: none' is applied to the CSS

    $target // Apply non-inheritable properties to the child elements
        .find( '*' )
        .attr( 'draggable', 'false' )
        .attr( 'unselectable', 'on' );
    };
});
