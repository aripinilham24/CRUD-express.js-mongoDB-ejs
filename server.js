import express from "express";
import { connectDB, Movie } from "./db.js";
import methodOverride from 'method-override'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("views", "./views");
app.set("view engine", "ejs");

try {
    await connectDB();
    console.log("Database connected successfully");
} catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
}

app.get("/", async (req, res) => {
    try {
        const data = await Movie.find({});
        if (data.length === 0) {
            return res.status(404).send("No movies found in the database");
        }
        res.render("index", { movies: data, message:req.query.message || null });
    } catch (e) {
        res.send("failed to fetch data:", e);
    }
});
app.get("/detail/:id", async (req, res) => {
    try {
        const data = await Movie.findById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send("No movies found in the database");
        }
        res.render("detail", { movies: data, message:req.query.message || null });
    } catch (e) {
        res.send("failed to fetch data:", e);
    }
});

app.get("/movie/search", async (req, res) => {
    try {
        const data = await Movie.find({
            title: { $regex: req.query.search, $options: "i" },
        });
        if (data.length === 0) {
            return res.status(404).send("No movies found with the given title");
        }
        res.render("index", { movies: data, message:req.query.message || null });
    } catch (e) {
        res.send("failed to fetch data:", e);
    }
});

app.delete('/movie/delete/:id', async (req, res)=>{
    try {
        await Movie.deleteOne({_id: req.params.id});
        res.redirect('/?message=Movie deleted successfully');
    } catch (e) {
        res.send('Failed to delete movie:', e); 
        res.redirect('/?message=Failed to delete movie');
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        await Movie.updateOne({_id: req.params.id}, req.body);
        res.redirect('/?message=Movie updated successfully');
    } catch (e) {
        res.send('Failed to update movie:', e); 
        res.redirect('/?message=Failed to update movie');
    }
})

app.post("/movie/add", async (req, res) => {
    const data = req.body;
    try {
        await Movie.insertOne(data);
        res.redirect('/?message=Movie added successfully');
    } catch (e) {
        res.redirect('/?message=Failed to add movie');
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
