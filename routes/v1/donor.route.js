const express = require('express');
const donorContro = require('../../controllers/donor.controller');
const router = express.Router();


router.route("/")
    .get(donorContro.getDonors)

router.route('/registration')
    .post(donorContro.createDonor)

router.route("/me")
    .get(donorContro.getDonor)
    .patch(donorContro.updateDonor)


module.exports = router;