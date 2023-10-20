const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const Room = require('../models/Room'); // Import the Room model
const jwtMiddleware = require('../middleware/jwtMiddleware');
const User = require('../models/User')

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

router.post('/create-room', jwtMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const username = user.username;
        const code = generateRandomRoomCode();

        const newroom = new Room({
            roomid: code,
            players: {
                names: [username,null]
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
    console.log('joining room')
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
        room.players.names[1]=username;

        // Save the updated room
        await room.save();

        res.json({ Room: room });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;