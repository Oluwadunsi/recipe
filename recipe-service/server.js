require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;      // the frontend(vite) is running on port 5173 
const cors = require('cors');
const axios= require('axios');

const BASE_URL = "https://recipeapi.io/api/v1/recipes";

app.use(cors());
app.use(express.json());

app.get('/api/recipes/search', async (req, res) => {
    try{
        const{searchText} = req.query;

        if (!searchText || !searchText.trim()) {
            return res.status(400).json({ error: "Search text is empty!" });
        }

        const response = await axios.get(BASE_URL, {
            headers: {
                "Authorization": `Bearer ${process.env.RECIPEAPI_API_KEY}`
            },
            params: {
                search: searchText.trim()
            }
        });
        res.json(response.data);
    }
    catch (err) {
        const status = err.response?.status || 500;
        const errorMessage = err.response?.data?.error?.message || "Internal server error";
        res.status(status).json({error: errorMessage});
    }
});


app.listen(PORT, () => {
    console.log(`Recipe app listening on port ${PORT}`)
})