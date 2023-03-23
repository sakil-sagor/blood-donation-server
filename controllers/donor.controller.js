const { createDonorService, findDonorByEmail, findDonorByPhone } = require("../services/donor.service");

exports.createDonor = async (req, res) => {
    try {
        const { email, contactNumber } = req.body;
        const userExistsByEmail = await findDonorByEmail(email);
        if (userExistsByEmail) {
            res.status(400)
            throw new Error("User Email already exists")
        }

        const userExistsByPhone = await findDonorByPhone(contactNumber);
        if (userExistsByPhone) {
            res.status(400)
            throw new Error("User Phone already exists")
        }

        const donor = await createDonorService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully signed up",
            data: donor,

        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Couldn't create donor",
            error: error.message,
        });
    }
}