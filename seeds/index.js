const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const descriptor = require('./seedHelpers')
mongoose.connect('mongodb://127.0.0.1:27017/camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const seedDB = async() => {
    await Campground.deleteMany({});
    let cities1 = cities.length;
    for (let i = 0; i < cities1; i++) {
        const price = Math.floor(Math.random() * 3000) + 1000;
        const camp = new Campground({
            author: '6412ac8e28591448afb1839d',
            location: `${cities[i].city},${cities[i].state}`,
            title: `${descriptor[i]}`,
            images: [{
                url: `${cities[i].image}`,
                filename: 'campproject/bry4p41rnp1pnmx443jb'
            }, {
                url: `${cities[i].image2}`,
                filename: 'campproject/bry4p41rnp1pnmx443jb'
            }],
            description: `${cities[i].description}`,
            price: `${price}`,
            geometry: {
                type: "Point",
                coordinates: [cities[i].longitude, cities[i].lattitude]
            },

        })
        await camp.save()
    }
}
seedDB();