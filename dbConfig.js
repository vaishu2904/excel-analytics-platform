const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pittampally29:IsD9QsdDOgi4F3hD@cluster0.y488jfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected", () => {
     console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log(`MongoDb connection error: ${err}`)
})

module.exports = mongoose;