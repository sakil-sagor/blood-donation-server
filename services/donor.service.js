const Donor = require("../models/Donor")


exports.createDonorService = async (donorInfo) => {

    const donor = await Donor.create(donorInfo);
    return donor;
}


exports.findDonorByEmail = async (email) => {
    const donor = await Donor.findOne({ email });
    return donor;
}
exports.findDonorByPhone = async (contactNumber) => {
    const donor = await Donor.findOne({ contactNumber });
    return donor;
}

