const express = require("express");
const router = express.Router();
const multer = require('multer');
const unzipper = require('unzipper');
const fs = require('fs');
const path = require('path');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    console.log('Request received');
    console.log('File received:', req.file); // Log file details

    if (req.file && req.file.originalname === 'data.zip') {
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, '..', 'data');

        try {
            // Remove existing data folder if it exists
            if (fs.existsSync(targetPath)) {
                fs.rmSync(targetPath, { recursive: true, force: true });
            }

            // Create a new data folder
            fs.mkdirSync(targetPath);

            // Extract the uploaded ZIP file
            fs.createReadStream(tempPath)
                .pipe(unzipper.Extract({ path: targetPath }))
                .on('close', () => {
                    // Remove the temporary uploaded file
                    fs.unlinkSync(tempPath);
                    res.status(200).send('File uploaded and extracted successfully.');
                })
                .on('error', (err) => {
                    console.error('Error extracting the file:', err);
                    res.status(500).send('Error extracting the file.');
                });
        } catch (err) {
            console.error('Error handling the file:', err);
            res.status(500).send('Error handling the file.');
        }
    } else {
        res.status(400).send('Please upload a file named data.zip.');
    }
});

module.exports = router;
