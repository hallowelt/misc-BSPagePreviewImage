var system = require('system');
var fs = require('fs');
if (system.args.length < 2) {
    console.log( "Missing arguments!" );
    phantom.exit();
}

var targetUrl = system.args[1];
var cookies = JSON.parse( window.atob( system.args[2] ) );
var cookieDomain = system.args[3];
var cookiePath = system.args[4];

var page = require( 'webpage' ).create();
page.viewportSize = { width: 1920, height: 1080 };

for( var key in cookies ) {
    page.addCookie( {
        'name': key,
        'value': cookies[key],
        'domain': cookieDomain,
        'path': cookiePath
    } );
}

page.open( targetUrl, function ( status ) {
    if( status === 'fail' ) {
        console.log( 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIsSURBVDjLpVNLSJQBEP7+h6uu62vLVAJDW1KQTMrINQ1vPQzq1GOpa9EppGOHLh0kCEKL7JBEhVCHihAsESyJiE4FWShGRmauu7KYiv6Pma+DGoFrBQ7MzGFmPr5vmDFIYj1mr1WYfrHPovA9VVOqbC7e/1rS9ZlrAVDYHig5WB0oPtBI0TNrUiC5yhP9jeF4X8NPcWfopoY48XT39PjjXeF0vWkZqOjd7LJYrmGasHPCCJbHwhS9/F8M4s8baid764Xi0Ilfp5voorpJfn2wwx/r3l77TwZUvR+qajXVn8PnvocYfXYH6k2ioOaCpaIdf11ivDcayyiMVudsOYqFb60gARJYHG9DbqQFmSVNjaO3K2NpAeK90ZCqtgcrjkP9aUCXp0moetDFEeRXnYCKXhm+uTW0CkBFu4JlxzZkFlbASz4CQGQVBFeEwZm8geyiMuRVntzsL3oXV+YMkvjRsydC1U+lhwZsWXgHb+oWVAEzIwvzyVlk5igsi7DymmHlHsFQR50rjl+981Jy1Fw6Gu0ObTtnU+cgs28AKgDiy+Awpj5OACBAhZ/qh2HOo6i+NeA73jUAML4/qWux8mt6NjW1w599CS9xb0mSEqQBEDAtwqALUmBaG5FV3oYPnTHMjAwetlWksyByaukxQg2wQ9FlccaK/OXA3/uAEUDp3rNIDQ1ctSk6kHh1/jRFoaL4M4snEMeD73gQx4M4PsT1IZ5AfYH68tZY7zv/ApRMY9mnuVMvAAAAAElFTkSuQmCC' );
        phantom.exit();
    }

    var clipRect = page.evaluate( function(){
        return document.querySelector( '#content' ).getBoundingClientRect();
    } );

    page.clipRect = {
        top:    clipRect.top,
        left:   clipRect.left,
        width:  clipRect.width,
        height: clipRect.width / 3 * 4
    };

    var base64 = page.renderBase64( 'PNG' );
    //Print to stdOut
    console.log( base64 );
    phantom.exit();
} );
