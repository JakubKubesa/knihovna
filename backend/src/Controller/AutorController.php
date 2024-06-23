<?php
namespace App\Controller;

use App\Repository\AutorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Autor;

class AutorController extends AbstractController
{
    /**
     * @Route("/api/autors", name="api_autors", methods={"GET"})
     */
    public function getAutors(AutorRepository $autorRepository): JsonResponse
    {
        $autors = $autorRepository->findAll();
        $data = [];

        foreach ($autors as $autor) {
            $data[] = [
                'id' => $autor->getId(),
                'prijmeni' => $autor->getPrijmeni()
            ];
        }

        return new JsonResponse($data);
    }

    /**
     * @Route("/addAutor", name="app_addAutor")
     */
    public function index(): Response
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'AutorController',
        ]);
    }

    /**
     * @Route("/api/autors", name="api_add_autor", methods={"POST"})
     */
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
