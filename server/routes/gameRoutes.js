const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const Room = require('../models/Room'); // Import the Room model
const jwtMiddleware = require('../middleware/jwtMiddleware');
const User = require('../models/User')
//temporary storage for executing the abilities of a room
const executeIds = {
    host: new Map(),
    guest: new Map(),
}
//cards and their functions
const cardX_ = {
    ability: require('../cardFunctions/abilities/0001'),
    canplace: require('../cardFunctions/canplace/0001')
}
const cardY_ = {
    ability: require('../cardFunctions/abilities/0002'),
    canplace: require('../cardFunctions/canplace/0002')
}

//card constructors for generating rooms
function cardX(id) {
    return ({
        name: 'cardX',
        cardid: '0001',
        placetype: null,
        strength: 5,
        abilitytext: 'Add a queen on your side',
        restrictiontext: 'Cannot be placed at queen',
        placeholder: false,
        id: id,
    })
}

function cardY(id) {
    return ({
        name: 'cardY',
        cardid: '0002',
        placetype: null,
        strength: 10,
        abilitytext: 'Destroy a random card',
        restrictiontext: 'None',
        placeholder: false,
        id: id,
    })
}

//placeholder constructors
function placeholder(placetype, id) {
    return ({
        name: null,
        cardid: null,
        placetype: placetype,
        strength: null,
        abilitytext: null,
        restrictiontext: null,
        placeholder: true,
        id: id
    })
}

function generateHand(idChar, number = 4) {
    let hand = [];
    for (let i = 1; i <= number; i++) {
        if (Math.random() >= 0.5) {
            hand.push(cardX(idChar + i));
        } else {
            hand.push(cardY(idChar + i));

        }
    }
    return hand;
}

function generateRandomRoomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 6;
    let roomCode = '';

    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomCode += characters[randomIndex];
    }

    return roomCode;
}

function updateStrength(gamestate) {
    console.log(gamestate);
    // if (gamestate && gamestate.location && gamestate.location.host && gamestate.location.host.strength && gamestate.table && gamestate.table.host) {
        gamestate.location.host.strength = 0;
        gamestate.location.guest.strength = 0;
        for (let i = 0; i < gamestate.table.host.length; i++) {
            const element = gamestate.table.host[i];
            if (element.placeholder === false) {
                gamestate.location.host.strength += element.strength;
                if (element.placetype === 'king') {
                    gamestate.location.host.strength += element.strength;
                }
            }
        }
        for (let i = 0; i < gamestate.table.guest.length; i++) {
            const element = gamestate.table.guest[i];
            if (element.placeholder === false) {
                gamestate.location.guest.strength += element.strength;
                if (element.placetype === 'king') {
                    gamestate.location.guest.strength += element.strength;
                }
            }
        }
    // }
    return gamestate;

}

router.get('/updatetest', async (req, res) => {
    const room_db = await Room.findOne({ roomid: "C08AGD" });
    room_db.gamestate = await updateStrength(room_db.gamestate);
    await room_db.save();
    res.json({ room: room_db })
})

//returns true or false depending on whose table has this card with the given id
function belongsToHost(gamestate, id) {
    for (let i = 0; i < gamestate.table.host.length; i++) {
        const element = gamestate.table.host[i];
        if (id === element.id) {
            return true;
        }
    }
    for (let i = 0; i < gamestate.table.guest.length; i++) {
        const element = gamestate.table.guest[i];
        if (id === element.id) {
            return false;
        }
    }
    return null;
}

//returns a object with ability and canplace of the id given by finding it in gamestate
function returnCard(gamestate, id) {
    console.log(gamestate.table)
    for (let i = 0; i < gamestate?.table?.host?.length; i++) {
        const element = gamestate?.table?.host[i];
        if (id === element.id) {
            if (element.cardid === '0001') {
                return cardX_;
            } else if (element.cardid === '0002') {
                return cardY_;
            }
        }
    }
    for (let i = 0; i < gamestate?.table?.guest?.length; i++) {
        const element = gamestate?.table?.guest[i];
        if (id === element.id) {
            if (element.cardid === '0001') {
                return cardX_;
            } else if (element.cardid === '0002') {
                return cardY_;
            }
        }
    }
    for (let i = 0; i < gamestate?.hand?.host?.length; i++) {
        const element = gamestate?.hand?.host[i];
        if (id === element.id) {
            if (element.cardid === '0001') {
                return cardX_;
            } else if (element.cardid === '0002') {
                return cardY_;
            }
        }
    }
    for (let i = 0; i < gamestate?.hand?.guest?.length; i++) {
        const element = gamestate?.hand?.guest[i];
        if (id === element.id) {
            if (element.cardid === '0001') {
                return cardX_;
            } else if (element.cardid === '0002') {
                return cardY_;
            }
        }
    }
    return null;
}

router.post('/create-room', jwtMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const username = user.username;
        const code = generateRandomRoomCode();
        //generate a empty room 
        const newroom = new Room({
            roomid: code,
            players: {
                names: [username, null]
            },
            gamestate: {
                hand: {
                    host: [],
                    guest: [],
                },
                table: {
                    host: [],
                    guest: [],
                },
                location: {
                    host: {
                        strength: 0
                    },
                    guest: {
                        strength: 0
                    }
                }
            }
        });

        await newroom.save();
        res.json({ Room: newroom });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/join-room', jwtMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const username = user.username;
        const code = req.body.roomid;

        // Find the room by its roomid
        const room = await Room.findOne({ roomid: code });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Add the user's username to the players.names array
        room.players.names[1] = username;
        room.gamestate.hand.host = generateHand('c', 4)
        room.gamestate.hand.guest = generateHand('y', 4)
        room.gamestate.table.host = [placeholder('king', 'f1'), placeholder('queen', 'f2'), placeholder('army', 'f3'), placeholder('army', 'f4')]
        room.gamestate.table.guest = [placeholder('king', 'o1'), placeholder('queen', 'o2'), placeholder('army', 'o3'), placeholder('army', 'o4')]
        // Save the updated room
        await room.save();

        res.json({ Room: room });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/canplace', (req, res) => {
    let { room, id, placeat } = req.body;
    //canplace null passing of card to be changed later now theres no card requiring it
    res.json({ canplace: returnCard(room.gamestate, id)?.canplace(room.gamestate, null, placeat) });
})

router.post('/place', async (req, res) => {
    let { room, id } = req.body;
    //room from req.body already has a updated form that is the card is removes from hand array and placed into table
    const room_db = await Room.findOne({ roomid: room.roomid });
    if (belongsToHost(room.gamestate, id)) {
        room_db.gamestate.hand.host = room.gamestate.hand.host;
        room_db.gamestate.table.host = room.gamestate.table.host;
        executeIds.host.set(room.roomid, id)
    } else {
        room_db.gamestate.hand.guest = room.gamestate.hand.guest;
        room_db.gamestate.table.guest = room.gamestate.table.guest;
        executeIds.guest.set(room.roomid, id)
    }
    await room_db.save();
    //send a message that task is done
    res.json({ acknowledged: true });
});

router.post('/end-turn', async (req, res) => {
    const { room } = req.body;
    const id1 = await executeIds.host.get(room.roomid);
    const id2 = await executeIds.guest.get(room.roomid);
    const room_db = await Room.findOne({ roomid: room.roomid });
    const temproom = room_db;
    console.log('this is the temproom', temproom.gamestate.table.host)
    //if any one of the players has already executed the abilities, it should not apply ability again
    if (id1 !== undefined && id2 !== undefined) {
        room_db.gamestate = await returnCard(room_db.gamestate, id1)?.ability(room_db.gamestate, id1);
        room_db.gamestate = await returnCard(room_db.gamestate, id2)?.ability(room_db.gamestate, id2);
        room_db.gamestate = await updateStrength(room_db.gamestate);
        executeIds.host.delete(room.roomid)
        executeIds.guest.delete(room.roomid)
        await room_db.save();
    }
    res.json({ room: room_db, temproom: temproom })
})

router.post('/end-game', async (req, res) => {
    const { room } = req.body;
    const room_db = await Room.findOne({ roomid: room.roomid });
    let winnername;
    if (room_db.gamestate.location.host.strength > room_db.gamestate.location.guest.strength) {
        winnername = room_db.players.names[0]
    } else if (room_db.gamestate.location.host.strength < room_db.gamestate.location.guest.strength) {
        winnername = room_db.players.names[1]
    } else {
        winnername = 'no one'
    }
    res.json({ winnername: winnername })
})

module.exports = router;