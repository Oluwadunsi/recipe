require('dotenv').config();
const express= require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
const PORT = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

app.post('/api/recipes/favourite', async (req, res) => {
    const { 
        recipe_id,
        name,
        description,
        cuisine,
        meal_type,
        difficulty,
        prep_time,
        cook_time,
        servings,
        calories_per_serving,
        protein,
        dietary_tags,
        instructions,
        ingredients
    } = req.body;

    if(recipe_id == undefined || !name) {
        return res.status(400).json({error: "Recipe ID or name are required to save to database."});
    }

    try{
        const values = [
                recipe_id,
                name,
                description || null,
                cuisine || null,
                meal_type || null,
                difficulty || 'Easy',
                prep_time ? parseInt(prep_time, 10) : 0,
                cook_time ? parseInt(cook_time, 10) : 0,
                servings ? parseInt(servings, 10) : 1,
                calories_per_serving ? parseInt(calories_per_serving, 10) : 0,
                protein ?  parseInt(protein, 10) : 0,
                dietary_tags || [],   
                instructions  || [],                  // Automatically handled as a text array by 'pg' driver
                JSON.stringify(ingredients || [])     // Serialized into string for JSONB/JSON column conversion
        ];

        const query=`INSERT INTO favourites (
                recipe_id,
                name,
                description,
                cuisine,
                meal_type,
                difficulty,
                prep_time,
                cook_time,
                servings,
                calories_per_serving,
                protein,
                dietary_tags,
                instructions,
                ingredients
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *;
        `;

        const result = await pool.query(query, values);

        return res.status(201).json({message: "Recipe successfully added to favourite", recipe: result.rows[0] });
        
    } catch (err){
        console.error("Database error: ", err);
        return res.status(500).json({error: "Failed to save recipe to database" });
    }
});

app.get('/api/recipes/favourite', async (req,res) => {
    try {
        const query = 'SELECT * FROM favourites ORDER BY id DESC';
        const result = await pool.query(query);

        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Database encountered error while fetching favourites: ", err);
        return res.status(500).json({error: "Failed to retrieve favourite recipes from database." });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


