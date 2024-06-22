<?php
namespace App\Controller;

use App\Repository\KnihaRepository;
use App\Repository\AutorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Kniha;

class BookController extends AbstractController
{
    /**
     * @Route("/api/knihy", name="api_knihy", methods={"GET"})
     */
    public function getKnihy(KnihaRepository $knihaRepository): JsonResponse
    {
        $knihy = $knihaRepository->findAll();
        $data = [];

        foreach ($knihy as $kniha) {
            $data[] = [
                'id' => $kniha->getId(),
                'nazev' => $kniha->getNazev()
            ];
        }

        return new JsonResponse($data);
    }

    /**
     * @Route("/addBook", name="app_addBook")
     */
    public function index(): Response
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'BookController',
        ]);
    }

    /**
     * @Route("/api/books", name="api_add_book", methods={"POST"})
     */
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
