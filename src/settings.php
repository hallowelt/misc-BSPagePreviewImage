<?php
return [
    'settings' => [
        'displayErrorDetails' => false, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        'phantomjs' => [
            'local_path' => '/usr/local/bin/phantomjs',
            'render_js_path' => '../src/js/render.js'
        ]
    ],
];
