const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/authMiddleware');
const { uploadAndGenerateDoc, getMyDocs } = require('../controllers/docsControllers');

const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadAndGenerateDoc);
router.get('/mydocs', auth, getMyDocs);

module.exports = router;
