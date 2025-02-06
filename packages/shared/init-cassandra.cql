CREATE KEYSPACE IF NOT EXISTS ecommerce_keyspace
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE IF NOT EXISTS ecommerce_keyspace.orders (
    id UUID PRIMARY KEY,
    buyer_id TEXT,
    seller_id TEXT,
    product_id TEXT,
    quantity INT,
    price DECIMAL,
    status TEXT,
    created_at TIMESTAMP
);

INSERT INTO ecommerce_keyspace.orders (id, buyer_id, seller_id, product_id, quantity, price, status, created_at)
VALUES (uuid(), 'user-4564325123', 'user-789436123', 'product-123123', 2, 100.00, 'created', toTimestamp(now()));
