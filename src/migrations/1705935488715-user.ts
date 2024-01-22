import { MigrationInterface, QueryRunner } from "typeorm";

export class User1705935488715 implements MigrationInterface {
    name = 'User1705935488715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`adresse\` (\`id\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(100) NOT NULL, \`postal\` int NOT NULL, \`adress\` varchar(200) NOT NULL, \`type\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(100) NOT NULL, \`lastname\` varchar(100) NOT NULL, \`year\` int NOT NULL, \`username\` varchar(50) NOT NULL, \`email\` varchar(255) NOT NULL, \`roles\` json NOT NULL, \`password\` text NOT NULL, \`locked\` tinyint NOT NULL, \`oldEmail\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`adresse\` ADD CONSTRAINT \`FK_f4328825f3adf9ee8343e917816\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`adresse\` DROP FOREIGN KEY \`FK_f4328825f3adf9ee8343e917816\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`adresse\``);
    }

}
