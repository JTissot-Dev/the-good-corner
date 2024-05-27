import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFirstMigration1709302934154 implements MigrationInterface {
    name = 'CreateFirstMigration1709302934154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "description" varchar(250) NOT NULL, "owner" varchar(100) NOT NULL, "price" integer NOT NULL, "picture" varchar(100) NOT NULL, "location" varchar(50) NOT NULL, "createdAt" timestamp NOT NULL, "category_id" integer)`);
        await queryRunner.query(`CREATE TABLE "tag_ads_ad" ("tagId" integer NOT NULL, "adId" integer NOT NULL, PRIMARY KEY ("tagId", "adId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9af5c0789da7135949e01590d0" ON "tag_ads_ad" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e21c616c1e011ddc661cab145" ON "tag_ads_ad" ("adId") `);
        await queryRunner.query(`CREATE TABLE "temporary_ad" ("id" integer PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "description" varchar(250) NOT NULL, "owner" varchar(100) NOT NULL, "price" integer NOT NULL, "picture" varchar(100) NOT NULL, "location" varchar(50) NOT NULL, "createdAt" timestamp NOT NULL, "category_id" integer, CONSTRAINT "FK_0a7dda8d426e57781b0c45b759a" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id") SELECT "id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id" FROM "ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
        await queryRunner.query(`DROP INDEX "IDX_9af5c0789da7135949e01590d0"`);
        await queryRunner.query(`DROP INDEX "IDX_2e21c616c1e011ddc661cab145"`);
        await queryRunner.query(`CREATE TABLE "temporary_tag_ads_ad" ("tagId" integer NOT NULL, "adId" integer NOT NULL, CONSTRAINT "FK_9af5c0789da7135949e01590d0e" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2e21c616c1e011ddc661cab145f" FOREIGN KEY ("adId") REFERENCES "ad" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("tagId", "adId"))`);
        await queryRunner.query(`INSERT INTO "temporary_tag_ads_ad"("tagId", "adId") SELECT "tagId", "adId" FROM "tag_ads_ad"`);
        await queryRunner.query(`DROP TABLE "tag_ads_ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_tag_ads_ad" RENAME TO "tag_ads_ad"`);
        await queryRunner.query(`CREATE INDEX "IDX_9af5c0789da7135949e01590d0" ON "tag_ads_ad" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2e21c616c1e011ddc661cab145" ON "tag_ads_ad" ("adId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_2e21c616c1e011ddc661cab145"`);
        await queryRunner.query(`DROP INDEX "IDX_9af5c0789da7135949e01590d0"`);
        await queryRunner.query(`ALTER TABLE "tag_ads_ad" RENAME TO "temporary_tag_ads_ad"`);
        await queryRunner.query(`CREATE TABLE "tag_ads_ad" ("tagId" integer NOT NULL, "adId" integer NOT NULL, PRIMARY KEY ("tagId", "adId"))`);
        await queryRunner.query(`INSERT INTO "tag_ads_ad"("tagId", "adId") SELECT "tagId", "adId" FROM "temporary_tag_ads_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_tag_ads_ad"`);
        await queryRunner.query(`CREATE INDEX "IDX_2e21c616c1e011ddc661cab145" ON "tag_ads_ad" ("adId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9af5c0789da7135949e01590d0" ON "tag_ads_ad" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
        await queryRunner.query(`CREATE TABLE "ad" ("id" integer PRIMARY KEY NOT NULL, "title" varchar(100) NOT NULL, "description" varchar(250) NOT NULL, "owner" varchar(100) NOT NULL, "price" integer NOT NULL, "picture" varchar(100) NOT NULL, "location" varchar(50) NOT NULL, "createdAt" timestamp NOT NULL, "category_id" integer)`);
        await queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id") SELECT "id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id" FROM "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_ad"`);
        await queryRunner.query(`DROP INDEX "IDX_2e21c616c1e011ddc661cab145"`);
        await queryRunner.query(`DROP INDEX "IDX_9af5c0789da7135949e01590d0"`);
        await queryRunner.query(`DROP TABLE "tag_ads_ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
