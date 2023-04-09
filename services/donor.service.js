const Donor = require("../models/Donor")




exports.getAllDonors = async (filters, queries) => {
    // serial--> select, sort, 
    const donors = await Donor
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const totalDonors = await Donor.countDocuments(filters);
    const pageCount = Math.ceil(totalDonors / queries.limit)
    return { donors, totalDonors, pageCount };
}

exports.createDonorService = async (donorInfo) => {
    const donor = await Donor.create(donorInfo);
    return donor;
}

exports.deleteDonorById = async (id) => {
    const data = await Donor.deleteOne({ _id: id });
    return data;
}

// exports.findDonorByEmail = async (email) => {
//     const donor = await Donor.findOne({ email });
//     return donor;
// }
exports.findAdminByPhone = async (contactNumber) => {
    const donor = await Donor.findOne({ contactNumber });
    return donor;

}
exports.findDonorByPhone = async (contactNumber) => {
    const donor = await Donor.findOne({ contactNumber });
    return donor;
}

exports.updateDonor = async (contactNumber, data) => {
    const donor = await Donor.updateOne({ contactNumber: contactNumber }, { $set: data }, { runValidators: true });
    return donor;
}

