<?php
// src/Controller/AddautorController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request; // Přidání správného importu pro Request
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Autor;

class AddautorController extends AbstractController
{
    #[Route('/addAutor', name: 'app_addAutor')]
    public function index(): Response
    {
        return $this->render('Addautor/index.html.twig', [
            'controller_name' => 'AddautorController',
        ]);
    }

    #[Route('/api/autors', name: 'api_add_autor', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $autor = new Autor();
        $autor->setJmeno($data['jmeno']);
        $autor->setPrijmeni($data['prijmeni']);
        $autor->setDatumNarozeni(new \DateTime($data['datum_narozeni']));

        $entityManager->persist($autor);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Autor created!'], JsonResponse::HTTP_CREATED);
    }
}
