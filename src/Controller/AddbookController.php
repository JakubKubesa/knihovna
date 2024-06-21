<?php
// src/Controller/AddbookController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request; // Přidání správného importu pro Request
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Kniha;

class AddbookController extends AbstractController
{
    #[Route('/addBook', name: 'app_addBook')]
    public function index(): Response
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'AddbookController',
        ]);
    }

    #[Route('/api/books', name: 'api_add_book', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $book = new Kniha();
        $book->setNazev($data['nazev']);
        $book->setRokPublikace($data['rok_publikace']);
        $book->setIDA($data['id_a']);
        $book->setPocetStran($data['pocet_stran']);
        $book->setFormat($data['format']);
        $book->setCena($data['cena']);

        $entityManager->persist($book);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Book created!'], JsonResponse::HTTP_CREATED);
    }
}
