const mongoose =  require("mongoose");

const db = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB is Connected "))
}

module.exports = db