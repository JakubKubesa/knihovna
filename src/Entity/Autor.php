<?php

namespace App\Entity;

use App\Repository\AutorRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AutorRepository::class)]
class Autor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $Jmeno = null;

    #[ORM\Column(length: 50)]
    private ?string $Prijmeni = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $datum_narozeni = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJmeno(): ?string
    {
        return $this->Jmeno;
    }

    public function setJmeno(string $Jmeno): static
    {
        $this->Jmeno = $Jmeno;

        return $this;
    }

    public function getPrijmeni(): ?string
    {
        return $this->Prijmeni;
    }

    public function setPrijmeni(string $Prijmeni): static
    {
        $this->Prijmeni = $Prijmeni;

        return $this;
    }

    public function getDatumNarozeni(): ?\DateTimeInterface
    {
        return $this->datum_narozeni;
    }

    public function setDatumNarozeni(\DateTimeInterface $datum_narozeni): static
    {
        $this->datum_narozeni = $datum_narozeni;

        return $this;
    }
}
