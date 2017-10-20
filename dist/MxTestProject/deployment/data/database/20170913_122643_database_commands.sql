CREATE TABLE "mendixsystem$unique_constraint" (
	"name" VARCHAR_IGNORECASE(255) NOT NULL,
	"table_id" VARCHAR_IGNORECASE(36) NOT NULL,
	"column_id" VARCHAR_IGNORECASE(36) NOT NULL,
	PRIMARY KEY("name","column_id"));
UPDATE "mendixsystem$version"
 SET "preanalysismigrationversionnumber" = '3.0.0';
