import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Interface from './Interface'
import ChatBox from './ChatBox'
import GameBG from './assets/DARC.png'
import io from 'socket.io-client'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickedcard: {},
            room: {},
            chats: [],
            textcontent: '',
            username: null,
            opponentname: null
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
                console.log(this.state.opponentname)
                setTimeout(() => {
                    const { opponentname } = this.state;
                    const { room } = this.state;
                    this.socket.emit('joined', { opponentname, room })
                }, 1000)
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
    async componentWillUnmount() {

    }
    sendText = () => {
        if (this.state.textcontent !== '') {
            const message = this.state.textcontent;
            const {opponentname}=this.state;
            this.socket.emit('send', { message,opponentname });
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
    };
    pickcard = (card) => {
        this.setState({ pickedcard: card });
        console.log('yes he picked', card)
    }
    render() {
        return (
            <>
                <img src={GameBG} alt='' style={{ position: 'fixed', width: '100vw', top: '-20px' }} />
                <div
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                    }}
                    onKeyDown={this.handleKeyDown}
                >
                    <InfoBox pickedcard={this.state.pickedcard} />
                    <Interface room={this.state.room} pickedcard={this.state.pickedcard} pickcard={this.pickcard} username={this.state.username} opponentname={this.state.opponentname} />
                    <ChatBox sendText={this.sendText} textcontent={this.state.textcontent} chats={this.state.chats} handleTextChange={this.handleTextChange} />
                </div>
            </>
        )
    }
}
