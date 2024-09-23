const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const axios = require('axios');
const { SERVER, DATABASE } = require('./buildTime.js');

app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    res.status(200).send("Database is live for ArcadeCalc");
});

// MORE ROUTES
app.use("/api/download", require("./routes/downloadData.js"))
app.use("/api/upload", require("./routes/uploadData.js")) //! Not working...


// users
app.use("/api/users", require("./routes/users.js").router);
app.use("/api/notifications", require("./routes/notifications.js").router)


// admin panel
app.use("/admin", require("./routes/admin.js"));


// * Reload the website every 5 minutes. Replace with your Render URL.



const interval = 300000; // Interval in milliseconds (5 minutes)

// Reloader Function
function reloadWebsite() {
    axios.get(DATABASE)
    fs.writeFileSync('./data/something.txt', Math.random().toString(), 'utf8');
}

setInterval(reloadWebsite, interval);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
