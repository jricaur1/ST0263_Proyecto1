const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the Sensor Schema
const SensorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Sensor =mongoose.model('sensors', SensorSchema);