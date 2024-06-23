<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240619084902 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE autor (id INT AUTO_INCREMENT NOT NULL, jmeno VARCHAR(50) NOT NULL, prijmeni VARCHAR(50) NOT NULL, datum_narozeni DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE kniha (id INT AUTO_INCREMENT NOT NULL, nazev VARCHAR(50) NOT NULL, rok_publikace INT NOT NULL, id_a INT NOT NULL, pocet_stran INT NOT NULL, format VARCHAR(2) NOT NULL, cena INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE autor');
        $this->addSql('DROP TABLE kniha');
    }
}
