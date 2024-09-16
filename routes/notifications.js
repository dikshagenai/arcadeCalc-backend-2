const express = require("express");
const router = express.Router();
const fs = require("fs");

// To get all the notifications. COMPLETED!
router.get("/getNotifications", async (req, res) => {
    try {
        // var notifications = require("../data/Notifications/Notifications.json")
        var notifications = JSON.parse(fs.readFileSync("./data/Notifications/Notifications.json", "utf8"));
        res.status(200).json({ Notifications: notifications })
    } catch (error) {
        res.status(404).json(error.message)
    }

})


// for setting new notifications - DONE!
router.post("/addNotification", async (req, res) => {
    try {
        let notifications = req.body.data;

        let imageUrl = notifications.imageUrl;
        let content = notifications.content;
        let redirectTo = notifications.redirectTo;
        let key = notifications.key;

        var notificationsJSON = await JSON.parse(fs.readFileSync("./data/Notifications/Notifications.json", "utf8"));
        // res.status(200).send(notificationsJSON)
        // return;
        notificationsJSON.push({ imageUrl, content, redirectTo, key });
        fs.writeFileSync("./data/notifications/Notifications.json", JSON.stringify(notificationsJSON, null, 4));
        res.status(200).send("Notifications added successfully!")

    } catch (error) {
        res.status(500).send(`Unable to add notifications due to the following error.\n${error.message}`)
    }

})


// DONE
router.post("/deleteNotification", async (req, res) => {
    // this just overwrites the default json
    try {
        let notifications = req.body.data;
        fs.writeFileSync("./data/notifications/Notifications.json", JSON.stringify(notifications, null, 4));
        res.status(200).send("Notifications overwrite successfully!")

    } catch (error) {
        res.status(500).send(`Failed to modify the notifications file, the following error occurred.\n${error.message}`)
    }
})






module.exports = router;