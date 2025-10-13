const mongoose = require("mongoose");
const Task = require("./models/Task");
require("dotenv").config();

// Sample tasks to seed
const tasks = [
  { title: "Drink water" },
  { title: "Meditate 10 minutes" },
  { title: "Read 20 pages" },
  { title: "Exercise 30 minutes" },
  { title: "Learn a new skill" }
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("MongoDB connected");

    // Remove existing tasks
    await Task.deleteMany({});
    console.log("Existing tasks cleared");

    // Insert seed tasks
    await Task.insertMany(tasks);
    console.log("Tasks seeded successfully");

    // Close the connection
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
