import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("URI:", process.env.MONGO_URI);

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (e) {
        console.log("DB Connection error:", e);
        process.exit(1);
    }
};

export const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: Number,
});

export const Movie = mongoose.model("Movie", movieSchema);

// const movie = new Movie({
//     title: 'Naruto Shipuden',
//     genre: 'Anime',
//     rating: 9.5
// })
// movie.save();
// console.log(movie);

// Movie.insertOne(
//     {
//         title: 'doraemon',
//         class: 'children',
//         genre: 'sci-fi',
//         rating: 8,
//         episodes: 100
//     }
// )
//     .then((result) => console.log("Data inserted", result))
//     .catch((e) => console.log(e));

// Movie.find() .then((result)=>console.log(result)).catch((e)=>console.log('databse error'))