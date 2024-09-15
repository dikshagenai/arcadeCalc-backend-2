const express = require("express");
const router = express.Router();
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');


router.get('/', (req, res) => {
    const folderName = 'data'; // Replace with your folder name
    const folderPath = path.join(__dirname, '..', folderName);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${folderName}.zip`);

    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(res);

    archive.directory(folderPath, false);

    archive.finalize();
});

module.exports = router;
