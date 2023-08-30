const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "index.html")));

app.get("/GUI", async(req, res) => {
res.sendFile(path.join(__dirname, "index.html"));

});


const { MongoClient } = require("mongodb");

const mongoDbHostName = process.env.MONGODB_HOST_NAME || "localhost";
// const mongoDbConnectionString = `mongodb://${mongoDbHostName}:27017`
const url = `mongodb://${mongoDbHostName}:27017`;

// const url = "mongodb://localhost:27017"; // Change this to your MongoDB server URL
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the server
client.connect().then(() => {
  console.log("Connected to MongoDB!");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

// Load fish names from the local JSON database
var fishNamesJSON = fs.readFileSync("./database/Fishnames_Extracted_Preprocessed.JSON", "utf-8");
var tempFishNamesArray = JSON.parse(fishNamesJSON).fishnames;
var fishNames = [...new Set(JSON.parse(fishNamesJSON).fishnames)];

app.post("/random_fish_name", async (req, res) => {
  const clientIP = req.ip;
  // console.log('clientIP: ', clientIP);

  var usedFishNames = [];
  // Check if a saved state exists in MongoDB and load it
  const db = client.db("fishNamesDatabase"); // Replace 'your_database_name' with your actual MongoDB database name
  const collection = db.collection("used_fish_names" + "_" + clientIP );

  const usedFishNamesCollection = await collection.findOne({ _id: "fish_names" });
  if (usedFishNamesCollection) {
    usedFishNames = usedFishNamesCollection.fishNames;
  }

  fishNames = fishNames.map(str => str.toUpperCase());
  usedFishNames = usedFishNames.map(str => str.toUpperCase());

  // // Remove common strings from fishNames
  fishNames = fishNames.filter(item => !usedFishNames.includes(item));

  if (fishNames.length > 0) {
    const randomIndex = Math.floor(Math.random() * fishNames.length);
    // const randomName = fishNames.splice(randomIndex, 1)[0]; // Might not be needed
    const randomName = fishNames[randomIndex];
    usedFishNames.push(randomName);

    console.log('fishNames Length: ', fishNames.length)
    console.log('usedFishNames Length: ', usedFishNames.length)

    var saveStatus = await saveState(clientIP, usedFishNames);
    if(saveStatus) // Save the state after adding a fish name
    {
      // res.json({ fish_name: randomName })
      res.json({ fish_name: randomName, num_available: fishNames.length - 1,
         availableFishNames: fishNames, usedFishNames: usedFishNames, num_used: usedFishNames.length });

    }
    else{
      res.json({ message: "Error saving usedFishNames to MongoDB." });
    }
    
  } else {
    res.json({ message: "No more fish names available." });
  }

});



async function saveState(clientIP, usedFishNames) {
  const db = client.db("fishNamesDatabase"); // Replace 'your_database_name' with your actual MongoDB database name
  const collection = db.collection("used_fish_names" + "_" + clientIP );

  var saveStatus = false;
  // Save the used fish names state to the MongoDB collection
  await collection.updateOne({ _id: "fish_names" }, { $set: { fishNames: usedFishNames } }, { upsert: true })
    .then(() => {
      console.log("Saved usedFishNames to MongoDB");
      saveStatus = true;
      })
    .catch(err => {
      console.error("Error saving usedFishNames to MongoDB:", err);
    });

  return saveStatus;
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


