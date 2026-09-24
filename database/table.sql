CREATE TABLE IF NOT EXISTS favourites (
    id  integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    recipe_id integer NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine VARCHAR(100),
    meal_type VARCHAR(100),
    difficulty VARCHAR(100),
    prep_time INT,
    cook_time INT,
    servings INT,
    calories_per_serving INT,
    protein INT,
    dietary_tags VARCHAR(100)[],
    instructions TEXT[],
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);