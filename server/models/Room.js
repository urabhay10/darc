const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomid: String,
    players: {
        names: [String]
        //sockets to be in server object
    },
    gamestate: {
        hand: {
            host: [{ 
                name: String,
                cardid:String,
                placetype: String,
                strength: Number,
                abilitytext: String,
                restrictiontext: String,
                placeholder: Boolean,
                id: String
            }],
            guest: [{ 
                name: String,
                cardid:String,
                placetype: String,
                strength: Number,
                abilitytext: String,
                restrictiontext: String,
                placeholder: Boolean,
                id: String
            }]
        },
        table: {
            host: [{ 
                name: String,
                cardid:String,
                placetype: String,
                strength: Number,
                abilitytext: String,
                restrictiontext: String,
                placeholder: Boolean,
                id: String
            }],
            guest: [{ 
                name: String,
                cardid:String,
                placetype: String,
                strength: Number,
                abilitytext: String,
                restrictiontext: String,
                placeholder: Boolean,
                id: String
             }]
        },
        location:{
            host: {
                strength: Number
            },
            guest: {
                strength: Number
            }
        }
    }
});

module.exports = mongoose.model('Room', roomSchema);