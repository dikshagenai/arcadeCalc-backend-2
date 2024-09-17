const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// ^ FUNCTIONS IMPORT
const Notification = require('./notifications').Notification
const fetchUsers = require('./users').fetchUsers;


// ^ Load admin credentials from JSON file
const adminCredentialsPath = path.join(__dirname, '..', 'admin', 'credentials.json');
let adminCredentials = {};
try {
    adminCredentials = JSON.parse(fs.readFileSync(adminCredentialsPath, 'utf8'));
} catch (error) {
    console.error('Error loading admin credentials:', error);
}



// ^ Middleware for authentication
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }


    const token = authHeader;
    try {
        const decoded = jwt.verify(token, 'ArcadeCalcSecret'); // Replace with your actual secret key
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden', success: false });
    }
};


// ^ ENDPOINTS

// * Endpoint 1: Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required', success: false });
    }

    try {
        if (adminCredentials.username === username && adminCredentials.password === password) {
            const token = jwt.sign({ username }, 'ArcadeCalcSecret', { expiresIn: '1h' }); // Set token expiration time as needed
            res.status(200).json({ message: 'Successful login', success: true, token });
        } else {
            res.status(401).json({ message: 'Invalid username or password', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during login', success: false });
    }
});


// * EndPoint 1-2: Check user login;
router.post('/checkLogin', authMiddleware, async (req, res) => {
    res.status(200).json({ message: 'User is logged in', success: true });
})




// * Endpoint 2: Change password
router.post('/changePassword', authMiddleware, async (req, res) => {
    const { newPassword, oldPassword } = req.body;

    if (!newPassword || !oldPassword) {
        return res.status(400).json({ message: 'New and old passwords are required', success: false });
    }

    if (newPassword === oldPassword) {
        return res.status(400).json({ message: 'Both passwords are same!', success: false });
    }

    try {
        if (adminCredentials.password === oldPassword) {
            adminCredentials.password = newPassword;
            fs.writeFileSync(adminCredentialsPath, JSON.stringify(adminCredentials, null, 4));
            res.status(200).json({ message: 'Password changed successfully', success: true });
        } else {
            res.status(401).json({ message: 'Incorrect old password', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', success: false });
    }
});




// * Endpoint 3: Fetch All Notifications
router.post('/fetchNotifications', authMiddleware, async (req, res) => {
    try {
        const notifications = await new Notification().fetchNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
})


// * Endpoint 4: Add Notification
router.post('/addNotification', authMiddleware, async (req, res) => {
    try {
        const { data } = req.body;
        const output = await new Notification().addNotifications(data);
        res.status(output.status).json(output)
    } catch (error) {
        res.status(500).json(error)
    }
})


// * Endpoint 5: Overwrite Notification
router.post('/overwriteNotification', authMiddleware, async (req, res) => {
    try {
        const { data } = req.body;
        const output = await new Notification().overwriteNotifications(data);
        res.status(output.status).json(output)
    } catch (error) {
        res.status(500).json(error)
    }
})


// * Endpoint 6: 
router.post('/fetchUsers', authMiddleware, async (req, res) => {
    try {
        const result = await fetchUsers();

        if (result.status === 200) {
            res.status(200).json(result.data);
            return;
        }
        else if (result.status === 500) {
            res.status(500).json({ debug: "Error in fetching users file", error: result.error });
            return;
        }
    } catch (error) {
        res.status(500).json(error)
    }
})








module.exports = router;