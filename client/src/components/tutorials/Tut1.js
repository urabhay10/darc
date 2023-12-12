import React, { Component } from 'react'
import Interface from '../Interface'
import InfoBox from '../InfoBox'
import ChatBox from '../ChatBox';
import Modal from '../Modal';
import { Navigate } from 'react-router-dom';

export default class Tut1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                roomid: 123456,
                players: {
                    names: ['Me', 'Bot']
                },
                gamestate: {
                    table: {
                        host: [
                            {
                                name: null,
                                cardid: null,
                                placetype: 'king',
                                strength: null,
                                abilitytext: null,
                                restrictiontext: null,
                                placeholder: true,
                                id: 'f1'
                            },
                            {
                                name: null,
                                cardid: null,
                                placetype: 'queen',
                                strength: null,
                                abilitytext: null,
                                restrictiontext: null,
                                placeholder: true,
                                id: 'f2'
                            }
                        ],
                        guest: [],
                    },
                    hand: {
                        host: [
                            {
                                name: 'cardY',
                                cardid: '0002',
                                placetype: null,
                                strength: 5,
                                abilitytext: 'Add a queen on your side',
                                restrictiontext: 'Cannot be placed at queen',
                                placeholder: false,
                                id: 'c1',
                            }
                        ],
                        guest: [],
                    },
                    location: {
                        host: 0,
                        guest: 0,
                    }
                }
            },
            pickedcard: {},
            textcontent: '',
            chats: [
                'Hi, this is the Bot'
            ],
            isModalOpen: true,
            canplacecard: false,
            canpickcard: false,
            modals: [<Modal
                title='Welcome to tutorial of DARC'
                description='This is a learning session. Click continue'
                closeButtonText='Continue'
                closeButtonColor='orange'
                onClose={() => { this.setState({ currentmodal: 2 }) }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Cards in DARC'
                description='In DARC, cards have certain properties namely strength and ability. Card uses its strength and its abilities when it is sent to battle'
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => { this.setState({ currentmodal: 3 }) }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Sending a card into battlefield'
                description='The area on in the bottom which contains the red card for now, is your hand. You have certain number of cards in hand at a time, which are ready to be sent to battlefield.'
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        isModalOpen: false
                    })
                    setTimeout(() => {
                        this.setState({ currentmodal: 4, isModalOpen: true })
                    }, 3000)
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.5 * window.innerHeight} />,
            <Modal
                title='Picking a card'
                description='To send a card you have to choose a card to battle. To do so, just click on the card in your hand to pick it.'
                closeButtonText='Got it'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        isModalOpen: false,
                        canpickcard: true
                    })
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Placing a card'
                description='A card has a position in the battle such as king, queen and army. There are different powers of these ranks.'
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        currentmodal: 6
                    })
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Placing a card'
                description='To place a card at its rank, click on the empty pink space to fill that space with the card you have picked.'
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        isModalOpen: false,
                        canplacecard: true
                    })
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Strength of a card'
                description='You have sent your first card into the battlefield. Strength of a card is a value from 0 to 100. Each card contributes to your overall strength shown at top right of the interface. Occupying half of it means you have reached maximum that is 100 overall strength. The first person to get 100 strength wins the games OR if no one gets 100 at end of game, the player with higher strength wins.'
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        currentmodal: 8
                    })
                }}
                backgroundColor={'#97fff4'}
                width={0.5 * window.innerWidth}
                height={0.5 * window.innerHeight} />,
            <Modal
                title='Ability of a card'
                description='But cards with just plain strength value is boring. So each card has a unique ability! Abilities can range from adding resources to your table/hand or destroying enemy troops (beware! some abilities are dangerous to your cards as well).'
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        currentmodal: 9
                    })
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Ranks of a card'
                description={`Placing a card at king rank means its strength will be doubled while it is at king's rank. Queen's rank can unleash madness by activating the card's ability twice. Army rank keeps the card as it is.`}
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        isModalOpen: false,
                        blurinfo: false
                    })
                    setTimeout(() => {
                        this.setState({ currentmodal: 10, isModalOpen: true })
                    }, 3000)
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />,
            <Modal
                title='Info box'
                description={`Use the tab at right to see info about the card you pick, to see its abilities, strength and restriction and to see logs of what's happening. Happy playing!`}
                closeButtonText='Next'
                closeButtonColor='orange'
                onClose={() => {
                    this.setState({
                        redirect: true
                    })
                }}
                backgroundColor={'#97fff4'}
                width={0.4 * window.innerWidth}
                height={0.4 * window.innerHeight} />],
            currentmodal: 1,
            blurinfo: true
        }
    }
    pickcard = (card) => {
        if (this.state.canpickcard) {
            if (card === this.state.pickedcard) {
                this.setState({
                    pickedcard: {},
                })
            } else {
                if (this.state.pickedcard) {
                    this.pickcard(this.state.pickedcard)
                }
                this.setState({ pickedcard: card, isModalOpen: true, currentmodal: 5, canpickcard: false });
            }
        }
    }
    placecard = async (card) => {
        if (this.state.canplacecard) {
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
                    const hostIndex = room.gamestate.table.host.indexOf(card);
                    room.gamestate.table.host[hostIndex] = pickedcard;
                    const handIndex = room.gamestate.hand.host.indexOf(this.state.pickedcard);
                    if (handIndex !== -1) {
                        room.gamestate.hand.host.splice(handIndex, 1);
                    }
                    this.setState({
                        room: room,
                        pickedcard: {},
                        isModalOpen: true,
                        currentmodal: 7
                    });
                }
            } catch (error) {
                console.error('Error: ', error)
            }
        }
    }
    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    sendText = () => {
        this.setState({
            textcontent: ''
        })
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to='/profile'/>
         } else {
            return (<>
                <div style={
                    {
                        filter: this.state.isModalOpen ? 'blur(15px)' : 'none',
                    }
                }>
                    <div style={{
                        filter: this.state.blurinfo ? 'blur(15px)' : 'none'
                    }}>
                        <InfoBox pickedcard={{}} timer={null} log={'A tutorial game'} />
                        <ChatBox sendText={this.sendText} textcontent={this.state.textcontent} chats={this.state.chats} handleTextChange={this.handleTextChange} />
                    </div>
                    <Interface room={this.state.room} pickedcard={this.state.pickedcard} pickcard={this.pickcard} username={`Me`} opponentname={`Bot`} placecard={this.placecard} />
                </div>
                {this.state.isModalOpen && this.state.modals[this.state.currentmodal - 1]}
            </>
            )
        }
    }
}
