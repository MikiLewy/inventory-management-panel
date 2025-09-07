ALTER TABLE "products" DROP CONSTRAINT "products_warehouse_id_warehouses_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE no action ON UPDATE cascade;