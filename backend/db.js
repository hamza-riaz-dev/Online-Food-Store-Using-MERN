const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://waqas923:DCZsP9uIXakRcOlh@cluster0.9rkdwad.mongodb.net/?retryWrites=true&w=majority'

const mongoDB = async () => {
    try {
        const client = await mongoose.connect(mongoURI, { useNewUrlParser: true })
        if (client) {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("foodData2");

            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.foodData2 = data;
                      
                        global.foodCategory = catData;
                       
                    }

                })
            }
            )
        }
    }

    catch (err) {
        if (err == "MongoNetworkError") {
            console.log("no connection")
        }

        console.log(err)

    }
}
module.exports = mongoDB;