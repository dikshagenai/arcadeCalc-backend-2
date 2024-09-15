const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

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
app.use("/api/notifications", require("./routes/notifications.js"))
app.use("/api/download", require("./routes/downloadData.js"))
app.use("/api/upload", require("./routes/uploadData.js")) //! Not working...


// users
app.use("/api/users", require("./routes/users.js"));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
