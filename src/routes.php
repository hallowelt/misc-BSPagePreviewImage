<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

return function (App $app) {
    $container = $app->getContainer();

    $app->get('/', function (Request $request, Response $response, array $args) use ($container) {
        $params = $request->getQueryParams();

        $url = $params['url'];

        if (empty($url)) {
            return $response->withStatus(500)
                ->withHeader('Content-Type', 'text/html')
                ->write('URL param should be provided');
        }

        $cookies = $params['cookies'];

        unset( $params['cookies'] );
        unset( $params['url'] );

        if(count($params) > 0 ) {
            $url = $url . '&' . http_build_query( $params );
        }

        $phantomJsConfig = $container->settings->get('phantomjs');

        $phantomCmd = [
            $phantomJsConfig['local_path'],
            '--ignore-ssl-errors',
            'true',
            realpath($phantomJsConfig['render_js_path']),
            $url,
            $cookies
        ];

        $process = new Process($phantomCmd);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $image = base64_decode($process->getOutput());
        $response->write($image);

        return $response->withHeader('Content-Type', 'image/png');
    });
};
