<?php
namespace App\Controller;

use App\Repository\KnihaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class KnihaController extends AbstractController
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
}
