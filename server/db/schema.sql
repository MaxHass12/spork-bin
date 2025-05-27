CREATE TABLE IF NOT EXISTS bins (
    id SERIAL PRIMARY KEY,
    "random_id" CHAR(7) UNIQUE NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_random_id ON bins("random_id");

CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    "bin_id" INTEGER NOT NULL,
    "method" VARCHAR(6),
    "headers" JSONB,
    "path" VARCHAR(50),
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    FOREIGN KEY ("bin_id") REFERENCES bins("id") ON DELETE CASCADE
);