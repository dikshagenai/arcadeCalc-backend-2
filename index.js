const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const axios = require('axios');

app.use(express.json());
app.use(cors());


// notifications will be stored here
// session storage ko use karke store karna h ki ye banda site pe visit kiya h
// contact ko bhi yehi store karna h
// notifications modify bhi yehi hogi
// 
// main - before deploying new data ek endpoint hoga - '/getAllData' download all data


// NOTIFICATIONS

// set new notifications
// delete notifications
// edit pure json


// CONTACT



app.get('/', async (req, res) => {
    res.status(200).send("Database is live for ArcadeCalc");
});

// MORE ROUTES
app.use("/api/download", require("./routes/downloadData.js"))
app.use("/api/upload", require("./routes/uploadData.js")) //! Not working...


// users
app.use("/api/users", require("./routes/users.js"));
app.use("/api/notifications", require("./routes/notifications.js"))


// admin panel
app.use("/admin", require("./routes/admin.js"));


// * Reload the website every 5 minutes. Replace with your Render URL.
const url = `https://arcadecalc-backend-2.onrender.com`; // Replace with your Render URL
const interval = 300000; // Interval in milliseconds (5 minutes)

// Reloader Function
function reloadWebsite() {
    axios.get(url)
}

setInterval(reloadWebsite, interval);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
