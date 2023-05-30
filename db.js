const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://OFS:123@cluster0.7bf1txp.mongodb.net/onlinefoodstore?retryWrites=true&w=majority';
const mongoDb = async () => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err);
        else {
            console.log("Connected");
            const fetchedData = mongoose.connection.db.collection("Catalog");
            fetchedData.find({}).toArray(async function (err, data) {
                const prodCategories = await mongoose.connection.db.collection("Categories");
                prodCategories.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.catalog = data;
                        global.prodCategories = catData;
                    }
                });
                // if (err) console.log(err);
                // else {
                //     global.catalog = data;
                // }
            });
        }
    });
}

module.exports = mongoDb;