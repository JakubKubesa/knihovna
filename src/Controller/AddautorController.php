<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AddautorController extends AbstractController
{
    #[Route('/addAutor', name: 'app_addAutor')]
    public function index(): Response
    {
        return $this->render('Addautor/index.html.twig', [
            'controller_name' => 'AddautorController',
        ]);
    }
}
