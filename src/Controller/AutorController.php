<?php
namespace App\Controller;

use App\Repository\AutorRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

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
}
