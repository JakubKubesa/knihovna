<?php

namespace App\Entity;

use App\Repository\KnihaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: KnihaRepository::class)]
class Kniha
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nazev = null;

    #[ORM\Column]
    private ?int $rok_publikace = null;

    #[ORM\Column]
    private ?int $ID_A = null;

    #[ORM\Column]
    private ?int $pocet_stran = null;

    #[ORM\Column(length: 2)]
    private ?string $format = null;

    #[ORM\Column]
    private ?int $cena = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNazev(): ?string
    {
        return $this->nazev;
    }

    public function setNazev(string $nazev): static
    {
        $this->nazev = $nazev;

        return $this;
    }

    public function getRokPublikace(): ?int
    {
        return $this->rok_publikace;
    }

    public function setRokPublikace(int $rok_publikace): static
    {
        $this->rok_publikace = $rok_publikace;

        return $this;
    }

    public function getIDA(): ?int
    {
        return $this->ID_A;
    }

    public function setIDA(int $ID_A): static
    {
        $this->ID_A = $ID_A;

        return $this;
    }

    public function getPocetStran(): ?int
    {
        return $this->pocet_stran;
    }

    public function setPocetStran(int $pocet_stran): static
    {
        $this->pocet_stran = $pocet_stran;

        return $this;
    }

    public function getFormat(): ?string
    {
        return $this->format;
    }

    public function setFormat(string $format): static
    {
        $this->format = $format;

        return $this;
    }

    public function getCena(): ?int
    {
        return $this->cena;
    }

    public function setCena(int $cena): static
    {
        $this->cena = $cena;

        return $this;
    }
}
