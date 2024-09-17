const fs = require("fs");
const express = require("express");
const router = express.Router();

// FUNCTIONS----------------------------------------------------------------

// Separate module for fetching notifications (notifications route)

class Notification {


    async fetchNotifications() {
        try {
            const notifications = JSON.parse(fs.readFileSync("./data/Notifications/Notifications.json", "utf8"));
            return notifications;
        } catch (error) {
            throw new Error('Failed to fetch notifications');
        }
    };


    async addNotifications(notifications) {
        try {
            console.log('inside try of function')
            // let notifications = req.body.data;
            // let imageUrl = notifications.imageUrl;
            // let content = notifications.content;
            // let redirectTo = notifications.redirectTo;
            // let key = notifications.key;
            // let time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Convert to IST
            notifications["time"] = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });



            console.log('successfully take out values imageUrl loda lhsan')


            var notificationsJSON = await JSON.parse(fs.readFileSync("./data/Notifications/Notifications.json", "utf8"));
            console.log(typeof notificationsJSON)

            notificationsJSON.unshift(notifications)

            // var finalOutput = JSON.stringify(Object.assign(data, users));

            fs.writeFileSync("./data/notifications/Notifications.json", JSON.stringify(notificationsJSON), 'utf-8', (err) => {
                console.log(err);
                return { status: 402, message: err.message, error: err, success: false };
            });
            console.log('write loda lhsan')

            return { status: 200, message: "Notifications added successfully" };

        } catch (error) {
            console.log('function bkl ne kiya erroe throw')

            throw new Error({ status: 500, message: "Unable to add notifications.", error: error.message })
        }
    }


    async overwriteNotifications(notifications) {
        try {
            // let notifications = req.body.data;
            fs.writeFileSync("./data/notifications/Notifications.json", JSON.stringify(notifications, null, 4));
            return { status: 200, message: "Notifications overwrite successfully!" }
        } catch (error) {
            return { status: 500, message: "Unable to delete notifications file.", error: error.message }
        }
    }




}


// ^ ROUTES ---------------
router.get("/getNotifications", async (req, res) => {
    try {
        // var notifications = require("../data/Notifications/Notifications.json")
        const notifications = await new Notification().fetchNotifications()
        res.status(200).json({ Notifications: notifications })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



module.exports = { Notification, router }
