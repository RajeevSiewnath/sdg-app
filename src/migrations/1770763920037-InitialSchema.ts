import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1770763920037 implements MigrationInterface {
  name = 'InitialSchema1770763920037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "company" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "weight" integer NOT NULL, "name" varchar NOT NULL, "parentId" integer, "companyId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "alignment" ("productId" integer NOT NULL, "sdgId" integer NOT NULL, "alignment" text, PRIMARY KEY ("productId", "sdgId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sdg" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e873aa1e6bddd990dd67b12864" ON "product_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eecc2118235f8fc29338bcac5b" ON "product_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "weight" integer NOT NULL, "name" varchar NOT NULL, "parentId" integer, "companyId" integer, CONSTRAINT "FK_77e467b32f0a8b7a1e5503eecac" FOREIGN KEY ("parentId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a331e634b87a7dbba2e7fccce19" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product"("id", "weight", "name", "parentId", "companyId") SELECT "id", "weight", "name", "parentId", "companyId" FROM "product"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_product" RENAME TO "product"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_alignment" ("productId" integer NOT NULL, "sdgId" integer NOT NULL, "alignment" text, CONSTRAINT "FK_028c3fb6588782610c773a8f21f" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_032e6a9ed9bfcc3a93829616a29" FOREIGN KEY ("sdgId") REFERENCES "sdg" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("productId", "sdgId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_alignment"("productId", "sdgId", "alignment") SELECT "productId", "sdgId", "alignment" FROM "alignment"`,
    );
    await queryRunner.query(`DROP TABLE "alignment"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_alignment" RENAME TO "alignment"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_e873aa1e6bddd990dd67b12864"`);
    await queryRunner.query(`DROP INDEX "IDX_eecc2118235f8fc29338bcac5b"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_product_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "FK_e873aa1e6bddd990dd67b128646" FOREIGN KEY ("id_ancestor") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_eecc2118235f8fc29338bcac5bb" FOREIGN KEY ("id_descendant") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_closure"("id_ancestor", "id_descendant") SELECT "id_ancestor", "id_descendant" FROM "product_closure"`,
    );
    await queryRunner.query(`DROP TABLE "product_closure"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_closure" RENAME TO "product_closure"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e873aa1e6bddd990dd67b12864" ON "product_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eecc2118235f8fc29338bcac5b" ON "product_closure" ("id_descendant") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_eecc2118235f8fc29338bcac5b"`);
    await queryRunner.query(`DROP INDEX "IDX_e873aa1e6bddd990dd67b12864"`);
    await queryRunner.query(
      `ALTER TABLE "product_closure" RENAME TO "temporary_product_closure"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `INSERT INTO "product_closure"("id_ancestor", "id_descendant") SELECT "id_ancestor", "id_descendant" FROM "temporary_product_closure"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_product_closure"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_eecc2118235f8fc29338bcac5b" ON "product_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e873aa1e6bddd990dd67b12864" ON "product_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `ALTER TABLE "alignment" RENAME TO "temporary_alignment"`,
    );
    await queryRunner.query(
      `CREATE TABLE "alignment" ("productId" integer NOT NULL, "sdgId" integer NOT NULL, "alignment" text, PRIMARY KEY ("productId", "sdgId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "alignment"("productId", "sdgId", "alignment") SELECT "productId", "sdgId", "alignment" FROM "temporary_alignment"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_alignment"`);
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "weight" integer NOT NULL, "name" varchar NOT NULL, "parentId" integer, "companyId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "weight", "name", "parentId", "companyId") SELECT "id", "weight", "name", "parentId", "companyId" FROM "temporary_product"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`);
    await queryRunner.query(`DROP INDEX "IDX_eecc2118235f8fc29338bcac5b"`);
    await queryRunner.query(`DROP INDEX "IDX_e873aa1e6bddd990dd67b12864"`);
    await queryRunner.query(`DROP TABLE "product_closure"`);
    await queryRunner.query(`DROP TABLE "sdg"`);
    await queryRunner.query(`DROP TABLE "alignment"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
