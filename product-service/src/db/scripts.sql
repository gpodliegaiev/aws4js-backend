--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--create table if not exists products (
--	id uuid not null default uuid_generate_v4() primary key,
--	title text not null,
--	description text,
--	price int
--);

--create table if not exists stocks (
--	id uuid not null default uuid_generate_v4() primary key,
--	product_id uuid references products on delete cascade,
--	"count" int
--);

--alter table stocks alter column product_id set not null;


-- WITH p as (insert into products (description, price, title) values ('Short Product Description1', 2.4, 'ProductOne') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 4 FROM p; 
-- WITH p as (insert into products (description, price, title) values ('Short Product Description3', 10, 'ProductNew') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 6 FROM p; 
-- WITH p as (insert into products (description, price, title) values ('Short Product Description2', 23, 'ProductTop') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 7 FROM p; 
-- WITH p as (insert into products (description, price, title) values ('Short Product Description7', 15, 'ProductTitle') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 12 FROM p; 
-- WITH p as (insert into products (description, price, title) values ('Short Product Description2', 23, 'Product') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 7 FROM p; 
-- WITH p as (insert into products (description, price, title) values ('Short Product Description4', 15, 'ProductTest') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 8 FROM p; 
-- WITH p as (insert into products (description, price, title) values ('Short Product Descriptio1', 23, 'Product2') RETURNING id)
--    insert into stocks (product_id, "count") SELECT id, 8 FROM p;
    
--select p.*, s."count" from products p left join stocks s on s.product_id = p.id;
   
   
   
   
   
   