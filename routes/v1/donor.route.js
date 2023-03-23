const express = require('express');
const donorContro = require('../../controllers/donor.controller');
const router = express.Router();


router.route('/registration')
    .post(donorContro.createDonor)


module.exports = router;