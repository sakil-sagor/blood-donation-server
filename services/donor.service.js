const Donor = require("../models/Donor")




exports.getAllDonors = async (filters, queries) => {
    // serial--> select, sort, 

    const donors = await Donor
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sortBy)
    const totalDonors = await Donor.countDocuments(filters);
    const pageCount = Math.ceil(totalDonors / queries.limit)
    console.log(totalDonors, pageCount)
    return { donors, totalDonors, pageCount };
}

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

exports.updateDonor = async (email, data) => {
    console.log(email, data)
    const donor = await Donor.updateOne({ email: email }, { $set: data }, { runValidators: true });
    return donor;
}

