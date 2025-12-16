-- Convert all client names and addresses to UPPERCASE
UPDATE "orders" 
SET 
  "name" = UPPER("name")
WHERE "name" IS NOT NULL;

UPDATE "orders" 
SET 
  "address" = UPPER("address")
WHERE "address" IS NOT NULL;