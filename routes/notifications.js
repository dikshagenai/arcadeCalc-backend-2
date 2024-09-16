const fs = require("fs");

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
            // let notifications = req.body.data;

            let imageUrl = notifications.imageUrl;
            let content = notifications.content;
            let redirectTo = notifications.redirectTo;
            let key = notifications.key;
            let time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Convert to IST

            var notificationsJSON = await JSON.parse(fs.readFileSync("./data/Notifications/Notifications.json", "utf8"));

            notificationsJSON.unshift({ imageUrl, content, redirectTo, key, time });
            fs.writeFileSync("./data/notifications/Notifications.json", JSON.stringify(notificationsJSON, null, 4));
            return { status: 200, message: "Notifications added successfully" };

        } catch (error) {
            throw new Error({ status: 500, message: "Unable to add notifications.", error: error.message })
        }
    }


    async overwriteNotifications(notifications)  {
        try {
            // let notifications = req.body.data;
            fs.writeFileSync("./data/notifications/Notifications.json", JSON.stringify(notifications, null, 4));
            return { status: 200, message: "Notifications overwrite successfully!" }
        } catch (error) {
            return { status: 500, message: "Unable to delete notifications file.", error: error.message }
        }
    }




}




module.exports = Notification
