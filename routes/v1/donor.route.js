const express = require('express');
const donorContro = require('../../controllers/donor.controller');
const searchCount = require('../../middleware/searchCount');
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();


router.route("/")
    .get(donorContro.getDonors)

router.route('/registration')
    .post(donorContro.createDonor)
router.route('/login')
    .post(donorContro.login)

router.route('/me/admin/:email')
    .get(donorContro.getAdmin)

router.route("/me/autoUpdate/:email")
    .patch(donorContro.updateDonor)


router.route("/me/:contactNumber")
    .get(donorContro.getDonor)
    .patch(donorContro.updateDonor)


router.route("/:id")
    .delete(donorContro.deleteDonor)


module.exports = router;