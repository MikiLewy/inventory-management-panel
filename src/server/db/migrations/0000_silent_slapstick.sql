
-- Create enums first (only if they don't exist)
DO $$ BEGIN
    CREATE TYPE "public"."type" AS ENUM('SNEAKERS', 'CLOTHING', 'COLLECTIBLES', 'ACCESSORIES', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    CREATE TYPE "public"."status" AS ENUM('IN_STOCK', 'IN_DELIVERY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    CREATE TYPE "public"."size_unit" AS ENUM('EU', 'US', 'UK', 'CM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint

-- Create tables (only if they don't exist)
CREATE TABLE IF NOT EXISTS "categories" (
	"id" integer PRIMARY KEY NOT NULL,
	"translations" jsonb,
	"type" "type" DEFAULT 'SNEAKERS',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warehouses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "warehouses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"address" text,
	"post_code" text,
	"city" text,
	"country" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"sku" text NOT NULL,
	"purchase_price" real NOT NULL,
	"purchase_date" timestamp,
	"status" "status" DEFAULT 'IN_STOCK',
	"brand" text,
	"category_id" integer,
	"purchase_place" text,
	"size" text NOT NULL,
	"size_unit" "size_unit" DEFAULT 'EU',
	"image_url" text DEFAULT 'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL,
	"warehouse_id" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sales_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"sku" text NOT NULL,
	"purchase_price" real NOT NULL,
	"purchase_date" timestamp,
	"profit" real NOT NULL,
	"sold_price" real NOT NULL,
	"sold_date" timestamp,
	"sold_place" text,
	"brand" text,
	"category_id" integer,
	"purchase_place" text,
	"size" text NOT NULL,
	"size_unit" "size_unit" DEFAULT 'EU',
	"image_url" text DEFAULT 'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_suggestions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "product_suggestions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"sku" text NOT NULL,
	"brand" text,
	"category" "type" DEFAULT 'OTHER',
	"image" text DEFAULT 'https://uwjszqyssojnwfikscsx.supabase.co/storage/v1/object/public/products//placeholder.png',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint

-- Add missing columns first
DO $$ BEGIN
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "warehouse_id" integer DEFAULT 1;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;
--> statement-breakpoint


-- Add foreign key constraints (only if they don't exist)
DO $$ BEGIN
    ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    ALTER TABLE "products" ADD CONSTRAINT "products_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
    ALTER TABLE "sales" ADD CONSTRAINT "sales_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
