const express = require('express');
const donorContro = require('../../controllers/donor.controller');
const searchCount = require('../../middleware/searchCount');
const verifyToken = require('../../middleware/verifyToken');
const verifyAdmin = require('../../middleware/verifyAdmin');
const verifyAdminRole = require('../../middleware/verifyAdminRole');
const router = express.Router();


router.route("/")
    .get(donorContro.getDonors)

router.route('/registration')
    .post(donorContro.createDonor)
router.route('/login')
    .post(donorContro.login)

router.route('/me/admin/:contactNumber')
    .get(verifyAdmin, donorContro.getAdmin)

router.route("/me/autoUpdate/:contactNumber")
    .patch(donorContro.updateDonor)


router.route("/me/:contactNumber")
    .get(verifyToken, donorContro.getDonor)
    .patch(verifyToken, donorContro.updateDonor)


router.route("/:id")
    .delete(verifyAdminRole, donorContro.deleteDonor)


module.exports = router;