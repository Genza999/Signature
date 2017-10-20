CREATE TABLE "mendixsystem$properties" (
	"key" VARCHAR_IGNORECASE(200) NOT NULL,
	"value" VARCHAR_IGNORECASE(200) NOT NULL,
	PRIMARY KEY("key"));
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1.1', 
"lastsyncdate" = '20170913 12:26:44';
DROP INDEX "idx_system$state_sessionid_objectid_removed";
ALTER TABLE "system$state" RENAME TO "e08d6ec7514e484c8697092625d148cb";
ALTER TABLE "system$statistics" RENAME TO "f035f73f03f64ee4afa7698a8b1bec98";
DROP INDEX "idx_system$clustermanager_system$xasinstance_system$statistics";
ALTER TABLE "system$clustermanager" RENAME TO "bf32a6b243f94b28ae102ddea043b44f";
ALTER TABLE "system$filedocument" ADD "size" BIGINT NULL;
UPDATE "system$filedocument"
 SET "size" = -1;
CREATE INDEX "idx_system$filedocument_size" ON "system$filedocument" ("size","id");
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('14018140-78df-4e36-9869-d0b53129d2c9', 
'170ce49d-f29c-4fac-99a6-b55e8a3aeb39', 
'Size', 
'size', 
4, 
0, 
'-1', 
false);
INSERT INTO "mendixsystem$index" ("id", 
"table_id", 
"index_name")
 VALUES ('59de2f9e-3e30-4dd7-a5de-58594a63ea2b', 
'170ce49d-f29c-4fac-99a6-b55e8a3aeb39', 
'idx_system$filedocument_size');
INSERT INTO "mendixsystem$index_column" ("index_id", 
"column_id", 
"sort_order", 
"ordinal")
 VALUES ('59de2f9e-3e30-4dd7-a5de-58594a63ea2b', 
'14018140-78df-4e36-9869-d0b53129d2c9', 
false, 
0);
ALTER TABLE "system$session" ADD "readonlyhashkey" VARCHAR_IGNORECASE(36) NULL;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('f1949c9c-7b28-11e6-8b77-86f30ca893d3', 
'37f9fd49-5318-4c63-9a51-f761779b202f', 
'ReadOnlyHashKey', 
'readonlyhashkey', 
30, 
36, 
'', 
false);
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = 'e91fb9bf-5362-4b23-bfa1-e4ec4127887c';
DELETE FROM "mendixsystem$entityidentifier" 
 WHERE "id" = 'e91fb9bf-5362-4b23-bfa1-e4ec4127887c';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = 'e91fb9bf-5362-4b23-bfa1-e4ec4127887c');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = 'e91fb9bf-5362-4b23-bfa1-e4ec4127887c';
DELETE FROM "mendixsystem$index" 
 WHERE "table_id" = 'e91fb9bf-5362-4b23-bfa1-e4ec4127887c';
DELETE FROM "mendixsystem$index_column" 
 WHERE "index_id" IN ('31f2e3e5-7f5a-42c4-b66e-f9c44a79a539');
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = 'efabe590-d3e2-4b24-9c39-836a367d217f';
DELETE FROM "mendixsystem$entityidentifier" 
 WHERE "id" = 'efabe590-d3e2-4b24-9c39-836a367d217f';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = 'efabe590-d3e2-4b24-9c39-836a367d217f');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = 'efabe590-d3e2-4b24-9c39-836a367d217f';
DELETE FROM "mendixsystem$association" 
 WHERE "id" = 'd9eb2a5f-b448-4a73-b179-4141ab51e622';
CREATE TABLE "system$userreportinfo" (
	"id" BIGINT NOT NULL,
	"hash" VARCHAR_IGNORECASE(64) NULL,
	"usertype" VARCHAR_IGNORECASE(8) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('1c90a770-98ef-45df-9267-b87973cc6581', 
'System.UserReportInfo', 
'system$userreportinfo');
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('e959c75a-c655-45d8-8b7d-a4335dcbf581', 
'1c90a770-98ef-45df-9267-b87973cc6581', 
'Hash', 
'hash', 
30, 
64, 
'', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('d6f4a7fc-3c2d-4793-bfc0-8dde42937863', 
'1c90a770-98ef-45df-9267-b87973cc6581', 
'UserType', 
'usertype', 
40, 
8, 
'Internal', 
false);
CREATE TABLE "system$userreportinfo_user" (
	"system$userreportinfoid" BIGINT NOT NULL,
	"system$userid" BIGINT NOT NULL,
	PRIMARY KEY("system$userreportinfoid","system$userid"));
CREATE INDEX "idx_system$userreportinfo_user_system$user_system$userreportinfo" ON "system$userreportinfo_user" ("system$userid","system$userreportinfoid");
INSERT INTO "mendixsystem$association" ("id", 
"association_name", 
"table_name", 
"parent_entity_id", 
"child_entity_id", 
"parent_column_name", 
"child_column_name", 
"index_name")
 VALUES ('d88b344c-b1e5-4759-b60e-0348e63ac445', 
'System.UserReportInfo_User', 
'system$userreportinfo_user', 
'1c90a770-98ef-45df-9267-b87973cc6581', 
'282e2e60-88a5-469d-84a5-ba8d9151644f', 
'system$userreportinfoid', 
'system$userid', 
'idx_system$userreportinfo_user_system$user_system$userreportinfo');
DROP TABLE "e08d6ec7514e484c8697092625d148cb";
DROP TABLE "f035f73f03f64ee4afa7698a8b1bec98";
DROP TABLE "bf32a6b243f94b28ae102ddea043b44f";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20170913 12:26:44';
