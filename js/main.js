var backEventListener = null;

var unregister = function() {
    if ( backEventListener !== null ) {
        document.removeEventListener( 'tizenhwkey', backEventListener );
        backEventListener = null;
        window.tizen.application.getCurrentApplication().exit();
    }
}

//Initialize function
// var init = function () {
//     // register once
//     if ( backEventListener !== null ) {
//         return;
//     }
//
//     // TODO:: Do your initialization job
//     console.log("init() called");
//
//     var backEvent = function(e) {
//         if ( e.keyName == "back" ) {
//             try {
//                 if ( $.mobile.urlHistory.activeIndex <= 0 ) {
//                     // if first page, terminate app
//                     unregister();
//                 } else {
//                     $.mobile.urlHistory.activeIndex -= 1;
//                     $.mobile.urlHistory.clearForward();
//                     window.history.back();
//                 }
//             } catch( ex ) {
//                 unregister();
//             }
//         }
//     }
//
//     // add eventListener for tizenhwkey (Back Button)
//     document.addEventListener( 'tizenhwkey', backEvent );
//     backEventListener = backEvent;
// 	// document.addEventListener( 'keydown', setFocusElement );
// };
//
// $(document).bind( 'pageinit', init );
// $(document).unload( unregister );

var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

// console.log($('body'));
// setTimeout(function () {
//
// $('body').html($('<div>').text(raw ? parseInt(raw[2], 10) : false));
// }, 2000);
