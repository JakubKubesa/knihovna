<?php
// src/Controller/BookdetailController.php

namespace App\Controller;

use App\Entity\Kniha;
use App\Entity\Autor;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Psr\Log\LoggerInterface;

class BookdetailController extends AbstractController
{
    /**
     * @Route("/api/kniha/{id}", name="get_kniha", methods={"GET"})
     */
    public function getKniha($id, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        try {
            $kniha = $em->getRepository(Kniha::class)->find($id);
            if (!$kniha) {
                return new JsonResponse(['error' => 'Kniha not found'], 404);
            }

            $data = [
                'id' => $kniha->getId(),
                'nazev' => $kniha->getNazev(),
                'rok_publikace' => $kniha->getRokPublikace(),
                'ID_A' => $kniha->getIDA(),
                'pocet_stran' => $kniha->getPocetStran(),
                'format' => $kniha->getFormat(),
                'cena' => $kniha->getCena()
            ];

            return new JsonResponse($data, 200);
        } catch (\Exception $e) {
            $logger->error('Error fetching book: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * @Route("/api/kniha/{id}", name="update_kniha", methods={"PUT"})
     */
    public function updateKniha($id, Request $request, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        try {
            $kniha = $em->getRepository(Kniha::class)->find($id);
            if (!$kniha) {
                return new JsonResponse(['error' => 'Kniha not found'], 404);
            }

            $data = json_decode($request->getContent(), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return new JsonResponse(['error' => 'Invalid JSON'], 400);
            }

            $kniha->setNazev($data['nazev'] ?? $kniha->getNazev());
            $kniha->setRokPublikace($data['rok_publikace'] ?? $kniha->getRokPublikace());
            $kniha->setIDA($data['ID_A'] ?? $kniha->getIDA());
            $kniha->setPocetStran($data['pocet_stran'] ?? $kniha->getPocetStran());
            $kniha->setFormat($data['format'] ?? $kniha->getFormat());
            $kniha->setCena($data['cena'] ?? $kniha->getCena());

            $em->persist($kniha);
            $em->flush();

            return new JsonResponse(['message' => 'Kniha updated'], 200);
        } catch (\Exception $e) {
            $logger->error('Error updating book: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * @Route("/api/kniha/{id}", name="delete_kniha", methods={"DELETE"})
     */
    public function deleteKniha($id, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
    {
        try {
            $kniha = $em->getRepository(Kniha::class)->find($id);
            if (!$kniha) {
                return new JsonResponse(['error' => 'Kniha not found'], 404);
            }

            $em->remove($kniha);
            $em->flush();

            return new JsonResponse(['message' => 'Kniha deleted'], 200);
        } catch (\Exception $e) {
            $logger->error('Error deleting book: ' . $e->getMessage());
            return new JsonResponse(['error' => 'Internal Server Error'], 500);
        }
    }



    /**
 * @Route("/api/knihaDetail/{id}", name="get_kniha_detail", methods={"GET"})
 */
public function getBookDetail($id, EntityManagerInterface $em, LoggerInterface $logger): JsonResponse
{
    try {
        // Najdeme knihu podle ID
        $kniha = $em->getRepository(Kniha::class)->find($id);
        if (!$kniha) {
            // Pokud kniha s daným ID neexistuje, vrátíme 404 Not Found
            return new JsonResponse(['error' => 'Kniha not found'], 404);
        }

        // Najdeme autora podle ID_A v knize
        $autorId = $kniha->getIDA();
        $logger->info('Searching for author with ID: ' . $autorId);
        $autor = $em->getRepository(Autor::class)->find($autorId);
        if (!$autor) {
            // Pokud autor není nalezen, vrátíme 404 Not Found
            return new JsonResponse(['error' => 'Autor not found'], 404);
        }

        // Sestavíme data autora
        $autorData = [
            'id' => $autor->getId(),
            'jmeno' => $autor->getJmeno(),
            'prijmeni' => $autor->getPrijmeni(),
            'datum_narozeni' => $autor->getDatumNarozeni()->format('Y-m-d'),
        ];

        // Sestavíme data knihy a autora do odpovědi
        $data = [
            'id' => $kniha->getId(),
            'nazev' => $kniha->getNazev(),
            'rok_publikace' => $kniha->getRokPublikace(),
            'id_a' => $autorId,
            'pocet_stran' => $kniha->getPocetStran(),
            'format' => $kniha->getFormat(),
            'cena' => $kniha->getCena(),
            'author' => $autorData
        ];

        // Vrátíme JSON odpověď
        return new JsonResponse($data, 200);

    } catch (\Exception $e) {
        // Pokud došlo k výjimce, zalogujeme ji a vrátíme 500 Internal Server Error
        $logger->error('Error fetching book detail: ' . $e->getMessage());
        return new JsonResponse(['error' => 'Internal Server Error'], 500);
    }
}




    
    


}
