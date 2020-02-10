const express = require('express');
const router = express.Router();
const passport = require('passport');
const Sensor = require('../../model/Sensor');
/*
* @route POST api/sensors/data
* @desc Register sensors' data
* @access Private
*/
router.post('/data', (req, res) => {
    let { name, temperature, humidity  } = req.body
    if(!temperature){
        return res.status(400).json({
            msg: "No temperature data."
        })
    }
   if(!humidity){
       return res.status(400).json({
           msg: "No humidity data."
       })
   }
    //Check for unique Name
    Sensor.findOne({name: name}).then(name => {
        if(name){
            return res.status(400).json({
                msg: "You cannot name sensors the same way."
            })
        }
    });

    //Data is valid and now we can register the sensor
    let newSensor = new Sensor({
        name,
        temperature,
        humidity
    });
    //Hash the password
    newSensor.save().then(sensor => {
        return res.status(201).json({
            success: true,
            msg: "Sensor is now registered."
        })
    })
});

/*
* @route GET api/sensors/data
* @desc Return the Sensors' data
* @access Private
*/
router.get('/display', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        sensor: req.sensor,
    });
});
module.exports = router;