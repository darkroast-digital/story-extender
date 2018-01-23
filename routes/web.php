<?php

use App\Controllers\HomeController;

$app->get('/', HomeController::class . ':index');
$app->post('/results', HomeController::class . ':results')->setName('results');
