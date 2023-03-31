const Count = require("../models/Count");

// let searchCountTotal = 0;

const searchCount = async (req, res, next) => {
    try {
        // searchCountTotal++;
        const findId = "64267206254b07e0cb1f77ba"
        Count.findOneAndUpdate({ findId },
            { $inc: { searchCountTotal: 1 } },
            { new: true });
        console.log(searchCountTotal)
        next();
    } catch (error) {
        res.status(403).json({
            status: "fail",
            error: "Invalid token"
        });
    }

}
module.exports = searchCount;