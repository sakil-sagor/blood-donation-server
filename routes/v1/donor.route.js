const express = require('express');
const donorContro = require('../../controllers/donor.controller');
const searchCount = require('../../middleware/searchCount');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();


router.route("/")
    .get(donorContro.getDonors)

router.route('/registration')
    .post(donorContro.createDonor)

router.route('/me/admin/:email')
    .get(donorContro.getAdmin)

router.route("/me", verifyToken)
    .get(donorContro.getDonor)
    .patch(donorContro.updateDonor)


module.exports = router;