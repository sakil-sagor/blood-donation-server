const { createDonorService, findDonorByEmail, findDonorByPhone, getAllDonors, updateDonor } = require("../services/donor.service");


exports.getDonors = async (req, res) => {
    try {

        let filters = { ...req.query }
        console.log(filters, "ager quesries")
        const excludeFields = ["limit", "sort", "page", "fields"]
        excludeFields.forEach(field => delete filters[field])



        const queries = {};
        // separate sort and make fit for data query 
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy;
        }

        // load specific property and value ( fields)
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;

        }
        // pagination 
        if (req.query.page) {
            const { page = 1, limit = 3 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            console.log(queries.skip)
            queries.limit = limit;
        }

        const donors = await getAllDonors(filters, queries)
        res.status(200).json({
            status: "success",
            message: "Successfully signed up",
            count: donors.length,
            donors,

        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Couldn't find donor",
            error: error.message,
        });
    }
}


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

exports.getDonor = async (req, res) => {
    try {
        const { email } = req.query;
        const donor = await findDonorByEmail(email)
        res.status(200).json({
            status: "success",
            data: donor
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the donor",
        });
    }
}
exports.updateDonor = async (req, res) => {
    try {
        const userExistsByPhone = await findDonorByPhone(req.body.contactNumber);
        if (userExistsByPhone) {
            res.status(400)
            throw new Error("User Phone already exists")
        }

        const { email } = req.query;
        console.log(email)
        const result = await updateDonor(email, req.body)
        res.status(200).json({
            status: "success",
            message: "Data inserted successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Product update fail",
            error: error.message
        })
    }
}
