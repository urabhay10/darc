import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Interface from './Interface'
import ChatBox from './ChatBox'
import GameBG from './assets/DARC.png'
import io from 'socket.io-client'
import { Navigate } from 'react-router-dom'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedcard: {},
            room: {},
            chats: [],
            textcontent: '',
            username: null,
            opponentname: null,
            timer: null,
            log: `Place to let you know what's going on`,
            redirect: false
        };
    }
    establishSocketConnection() {
        this.socket = io('http://localhost:8000', {
            auth: { username: this.state.username },
        });
        this.socket.on('connect', () => {
            console.log('Connected to the server');
        });
        this.socket.on('joined', (room) => {
            this.setState({
                room: room,
                opponentname: room.players.names[1]
            })
        })
        this.socket.on('receive', (message) => {
            console.log('receiving');
            this.setState((prevState) => ({
                chats: [...prevState.chats, message],
            }));
        });
        this.socket.on('turn1', () => {
            console.log("starting turn 1");
            this.startTimer(30);
        })
        this.socket.on('turn2', () => {
            console.log("starting turn 2");
            this.startTimer(30);
        })
        this.socket.on('turn3', () => {
            console.log("starting turn 3");
            this.startTimer(30);
        })
        this.socket.on('turn4', () => {
            console.log("starting turn 4");
            this.startTimer(30);
        })
        this.socket.on('turn5', () => {
            console.log("starting turn 5");
            this.startTimer(30);
        })
        this.socket.on('turn6', () => {
            console.log("starting turn 6");
            this.startTimer(30);
        })
        this.socket.on('end-turn1', async () => {
            console.log('ending turn 1');
            const response = await fetch('http://localhost:8000/game/end-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room: this.state.room
                }),
            })
            const data = await response.json();
            if (!data.room || !data.temproom) {
                throw new Error('Failed to fetch room data')
            }
            console.log('This is states of room returned:', data.temproom, data.room)
            this.setState({
                room: data.temproom,
                log: `Cards placed this turn`
            })
            setTimeout(() => {
                this.setState({
                    room: data.room,
                    log: `Turn 1 ended`
                })
                const { opponentname } = this.state
                this.socket.emit('start-turn2', { opponentname });
            }, 2000)
            console.log(data.room)
        })
        this.socket.on('end-turn2', async () => {
            console.log('ending turn 2');
            const response = await fetch('http://localhost:8000/game/end-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room: this.state.room
                }),
            })
            const data = await response.json();
            if (!data.room || !data.temproom) {
                throw new Error('Failed to fetch room data')
            }
            console.log('This is states of room returned:', data.temproom, data.room)
            this.setState({
                room: data.temproom,
                log: `Cards placed this turn`
            })
            setTimeout(() => {
                this.setState({
                    room: data.room,
                    log: `Turn 2 ended`
                })
                const { opponentname } = this.state
                this.socket.emit('start-turn3', { opponentname });
            }, 2000)
            console.log(data.room)
        })
        this.socket.on('end-turn3', async () => {
            console.log('ending turn 3');
            const response = await fetch('http://localhost:8000/game/end-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room: this.state.room
                }),
            })
            const data = await response.json();
            if (!data.room || !data.temproom) {
                throw new Error('Failed to fetch room data')
            }
            console.log('This is states of room returned:', data.temproom, data.room)
            this.setState({
                room: data.temproom,
                log: `Cards placed this turn`
            })
            setTimeout(() => {
                this.setState({
                    room: data.room,
                    log: `Turn 3 ended`
                })
                const { opponentname } = this.state
                this.socket.emit('start-turn4', { opponentname });
            }, 2000)
            console.log(data.room)
        })
        this.socket.on('end-turn4', async () => {
            console.log('ending turn 4');
            const response = await fetch('http://localhost:8000/game/end-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room: this.state.room
                }),
            })
            const data = await response.json();
            if (!data.room || !data.temproom) {
                throw new Error('Failed to fetch room data')
            }
            console.log('This is states of room returned:', data.temproom, data.room)
            this.setState({
                room: data.temproom,
                log: `Cards placed this turn`
            })
            setTimeout(() => {
                this.setState({
                    room: data.room,
                    log: `Turn 4 ended`
                })
            }, 2000)
            console.log(data.room)
        })
        this.socket.on('end-game', async () => {
            console.log('ending game');
            const response = await fetch('http://localhost:8000/game/end-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    room: this.state.room
                }),
            })
            const data = await response.json();
            if (!data.winnername) {
                throw new Error('Failed to fetch winnername')
            }
            this.setState({
                log: data.winnername !== 'no one' ? `The winner is ${data.winnername}` : `Its a tie`
            })
            setTimeout(() => {
                this.setState({
                    redirect: true,
                })
            }, 5000);
        })
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8000/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            const userData = await response.json();
            if (!userData.username) {
                throw new Error('Failed to fetch user data');
            }
            this.setState({
                username: userData.username,
            });
            setTimeout(() => {
                this.establishSocketConnection();
            }, 0)
        } catch (error) {

        }
        //joining or creating of room
        if (localStorage.getItem('roomid')) {
            try {
                console.log('trying to join..')
                const response = await fetch('http://localhost:8000/game/join-room', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ roomid: localStorage.getItem('roomid') })
                });
                const roomData = await response.json();
                console.log('got data...', roomData.Room)
                if (!roomData.Room) {
                    throw new Error('Failed to fetch user data');
                }
                this.setState({
                    room: roomData.Room,
                    opponentname: roomData.Room.players.names[0]
                });
                setTimeout(() => {
                    const { opponentname, room, username } = this.state;
                    this.socket.emit('joined', { opponentname, room, username })
                }, 200)
            } catch (error) {

            }
        } else {
            //creating room
            try {
                const response = await fetch('http://localhost:8000/game/create-room', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (!data.Room) {
                    throw new Error('Failed to fetch user data');
                }
                this.setState({
                    room: data.Room,
                });
                console.log('confirmed..', this.state.room)
            } catch (error) {
                console.log(error)
            }
        }
    }
    sendText = () => {
        if (this.state.textcontent !== '') {
            const message = this.state.textcontent;
            const { opponentname } = this.state;
            this.socket.emit('send', { message, opponentname });
            this.setState({ textcontent: '' })
        }
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.sendText()
        }
    }
    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    pickcard = (card) => {
        if (card === this.state.pickedcard) {
            this.setState({
                pickedcard: {},
            })
        } else {
            if (this.state.pickedcard) {
                this.pickcard(this.state.pickedcard)
            }
            this.setState({ pickedcard: card });
        }
    }
    placecard = async (card) => {
        if (this.state.timer > 0 && this.state.timer < 31) {
            try {
                const response = await fetch('http://localhost:8000/game/canplace', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        room: this.state.room,
                        id: this.state.pickedcard.id,
                        placeat: card,
                    }),
                })
                console.log(response)
                const data = await response.json();
                if (data.canplace) {
                    const room = { ...this.state.room };
                    const pickedcard = { ...this.state.pickedcard };
                    pickedcard.placetype = card.placetype;
                    if (this.state.username === room.players.names[0]) {
                        const hostIndex = room.gamestate.table.host.indexOf(card);
                        room.gamestate.table.host[hostIndex] = pickedcard;
                        const handIndex = room.gamestate.hand.host.indexOf(this.state.pickedcard);
                        if (handIndex !== -1) {
                            room.gamestate.hand.host.splice(handIndex, 1);
                        }
                    } else {
                        const guestIndex = room.gamestate.table.guest.indexOf(card);
                        room.gamestate.table.guest[guestIndex] = pickedcard;
                        const handIndex = room.gamestate.hand.guest.indexOf(this.state.pickedcard);
                        if (handIndex !== -1) {
                            room.gamestate.hand.guest.splice(handIndex, 1);
                        }
                    }
                    this.setState({
                        room: room,
                    });
                    const response2 = await fetch('http://localhost:8000/game/place', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            room: this.state.room,
                            id: this.state.pickedcard.id,
                        }),
                    })
                    console.log('after placing cards this is the state', this.state.room)
                    const data = await response2.json();
                    if (data.acknowledged) {
                        this.setState({
                            timer: null,
                            log: `Waiting for opponent to place card`,
                            pickedcard: {}
                        })
                    }
                }
            } catch (error) {
                console.error('Error: ', error)
            }
        }
    }
    startTimer = (seconds) => {
        this.setState({
            timer: seconds
        })
        let i = 0
        setInterval(() => {
            i++;
            if (seconds >= i && this.state.timer === (seconds - i + 1)) {
                this.setState({
                    timer: seconds - i,
                })
            }
        }, 1000);
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to='/profile' />;
        } else {
            return (
                <>
                    <img src={GameBG} alt='' style={{ position: 'fixed', width: '100vw', top: '0', height: '100vh' }} />
                    <div
                        style={{
                            position: 'absolute',
                            width: '100vw',
                            height: '100vh',
                        }}
                        onKeyDown={this.handleKeyDown}
                    >
                        <InfoBox pickedcard={this.state.pickedcard} timer={this.state.timer} log={this.state.log} />
                        <Interface room={this.state.room} placecard={this.placecard} pickedcard={this.state.pickedcard} pickcard={this.pickcard} username={this.state.username} opponentname={this.state.opponentname} />
                        <ChatBox sendText={this.sendText} textcontent={this.state.textcontent} chats={this.state.chats} handleTextChange={this.handleTextChange} />
                    </div>
                </>
            )
        }
    }
}
