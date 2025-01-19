CREATE TABLE IF NOT EXISTS bins (
    id SERIAL PRIMARY KEY,
    "uuid" CHAR(7) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uuid ON bins("uuid");

CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    "bin_id" INTEGER NOT NULL,
    "method" VARCHAR(6),
    "headers" JSONB,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL, 
    FOREIGN KEY ("bin_id") REFERENCES bins("id") ON DELETE CASCADE
);