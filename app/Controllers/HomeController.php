<?php

namespace App\Controllers;

class HomeController extends Controller
{
    public function index($request, $response, $args)
    {
        return $this->c->view->render($response, 'home.twig');
    }

    public function results($request, $response, $args)
    {
        $hash = bin2hex((random_bytes(32)));
        $this->c->encoder->encode($_FILES['image']['tmp_name'], $hash);

        return $hash;
    }
}
