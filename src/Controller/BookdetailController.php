<?php
// src/Controller/BookdetailController.php

namespace App\Controller;

use App\Entity\Kniha;
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
}
