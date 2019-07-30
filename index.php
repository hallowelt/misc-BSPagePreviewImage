<?php

include_once 'config.php';

if( isset( $_GET['url'] ) && isset( $_GET['cookies'] ) ) {
    $cookies = $_GET['cookies'];
    $url = $_GET['url'];

    unset($_GET['cookies']);
    unset($_GET['url']);

    $url = $url . '?' . http_build_query( $_GET );

    $cmd = getPhantomJSCmd($config, $url, $cookies );

    $output = shell_exec( $cmd );
    header("Content-type: image/png");
    echo base64_decode( $output );
} else {
    http_response_code( '405' );
    echo "<h1 align=\"center\">HTTP 405 Method not allowed</h1>";
}


function getPhantomJSCmd($config, $url, $cookies) {
    $phantomCmd = $config[PHANTOMJS_LOCAL_PATH] . " --ignore-ssl-errors true " . $config[RENDER_JS_PATH];
    return $phantomCmd . " " . $url . " " . $cookies;
}