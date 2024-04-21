const { createDonorService, findDonorByEmail, findDonorByPhone, getAllDonors, updateDonor, findAdminByPhone, deleteDonorById } = require("../services/donor.service");
const { generateToken } = require("../utils/token");


exports.getDonors = async (req, res) => {
    try {

        let filters = { ...req.query }
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
exports.login = async (req, res) => {
    try {
        const { contactNumber, password } = req.body;
        if (!contactNumber || !password) {
            return res.status(401).json({
                status: "fail",
                error: "please provide your credentials"
            });
        }
        const donor = await findDonorByPhone(contactNumber);
        if (!donor) {
            return res.status(401).json({
                status: "fail",
                error: "No user found, please create an account"
            });
        }
        // password matching 
        if (donor.password !== password) {
            return res.status(403).json({
                status: "fail",
                error: "Invalid email or password"
            });
        }
        // jwt token 
        const token = generateToken(donor)
        const other = {
            details: "SDF9074LJD0943MAMALDM35R65GI840943MAOE354FAS98Q7G0943J09745ADLAG0943MAPOG-0485",
            security: "KOPSDFO1290943MALDM35R65GI840943MAOE354FAS98Q7G0943MA0XC735M643L34KGM7345MNH7",
            contactNumber: donor.contactNumber
        }
        res.status(200).json({
            status: "success",
            message: "Successfully loged in",
            data: { other, token }
        })
    } catch (error) {
        res.status(500).json({
            status: "fail to login",
            error,
        })
    }
}


exports.createDonor = async (req, res) => {
    try {
        const { contactNumber } = req.body;

        const userExistsByPhone = await findDonorByPhone(contactNumber);
        if (userExistsByPhone) {
            res.status(400)
            throw new Error("User Phone already exists")
        }

        const donor = await createDonorService(req.body);
        const other = {
            details: "ASDF9074LJD0943MAMALDM35R65GI840943MAOE354FAS98Q7G0943J09745ADLAG0943MAPOG-0485",
            security: "AKOPSDFO1290943MALDM35R65GI840943MAOE354FAS98Q7G0943MA0XC735M643L34KGM7345MNH7",
            contactNumber: donor.contactNumber
        }
        const token = generateToken(donor);
        res.status(200).json({
            status: "success",
            message: "Successfully signed up",
            data: { other, token }

        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "Couldn't create donor",
            error: error.message,
        });
    }
}

exports.deleteDonor = async (req, res) => {
    try {

        const { id } = req.params;
        const data = await deleteDonorById(id)
        res.status(200).json({
            status: "success",
            data: data,

        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't delete the donor",
        });
    }
}


exports.getDonor = async (req, res) => {
    try {

        const { contactNumber } = req.params;
        const donor = await findDonorByPhone(contactNumber)
        const { password: pwd, ...other } = donor.toObject();
        res.status(200).json({
            status: "success",
            data: other
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the donor",
        });
    }
}
exports.getAdmin = async (req, res) => {

    try {
        const { contactNumber } = req.params;
        const donor = await findAdminByPhone(contactNumber);
        const { password: pwd, ...other } = donor.toObject();
        if (other.role === "admin") {
            res.status(200).json({
                status: "success",
                data: other
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the admin",
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

        const { contactNumber } = req.params;
        const result = await updateDonor(contactNumber, req.body)
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
