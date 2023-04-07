const { createDonorService, findDonorByEmail, findDonorByPhone, getAllDonors, updateDonor, findAdminByEmail, deleteDonorById } = require("../services/donor.service");
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
        console.log(req.query.field)
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;

        }
        console.log(req.query.field)
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
        console.log(donor)
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
        console.log(token)

        const { password: pwd, ...other } = donor.toObject();

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
        const { email, contactNumber, password, confirmPassword } = req.body;
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
        // password matching 
        if (password !== confirmPassword) {
            return res.status(403).json({
                status: "fail",
                error: "Passwords don't match!"
            });

        }
        // jwt token 

        // console.log(token)

        // const { password: pwd, ...other } = donor.toObject();

        const donor = await createDonorService(req.body);
        const token = generateToken(donor);
        console.log(donor)
        res.status(200).json({
            status: "success",
            message: "Successfully signed up",
            data: { donor, token }

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
        console.log(id)
        const data = await deleteDonorById(id)
        res.status(200).json({
            status: "success",
            data: data,

        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't delete the donor",
        });
    }
}


exports.getDonor = async (req, res) => {
    try {
        console.log(req.params)
        const { contactNumber } = req.params;
        const donor = await findDonorByPhone(contactNumber)
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
exports.getAdmin = async (req, res) => {

    try {
        const { email } = req.params;
        const donor = await findAdminByEmail(email);
        if (donor.role === "admin") {
            res.status(200).json({
                status: "success",
                data: donor
            })
        } else {
            res.status(400).json({
                status: "fail",
                error: "Couldn't get  admin",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the admin",
        });
    }
}
exports.updateDonor = async (req, res) => {
    try {
        console.log(req.body)
        const userExistsByPhone = await findDonorByPhone(req.body.contactNumber);
        if (userExistsByPhone) {
            res.status(400)
            throw new Error("User Phone already exists")
        }

        const { email } = req.params;
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
