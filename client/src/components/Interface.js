import React, { Component } from 'react'
import Draw from './Draw'
import OpponentTable from './OpponentTable'
import YourTable from './YourTable'
import Location from './Location'
import GameSettings from './GameSettings'
import Hand from './Hand'
import You from './You'
import Opponent from './Opponent'

export default class Interface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copytext: 'Click to copy',
        };
    }
    render() {
        if (!this.props?.room?.players?.names[1]) {
            return (
                <>
                    <div style={{
                        height: '466px',
                        width: '658px',
                        margin: 'auto',
                        border: '1px solid white',
                        backgroundColor: 'blue',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        position: 'absolute',
                        top: '100px',
                        left: '440px',
                    }}>
                        <OpponentTable opponentTable={[]} />
                        <Location yourstrength={0} opponentstrength={0} />
                        <YourTable yourTable={[]}/>
                        <div>
                            <GameSettings />
                            <Draw />
                        </div>
                        <You username={this.props.username} />
                        <Hand hand={[]} pickcard={this.props.pickcard} />
                        <Opponent username={this.props.opponentname} />
                    </div>
                    <div style={{
                        top: '83vh',
                        position: 'fixed',
                        fontSize: '24px',
                        color: 'white',
                        textAlign: 'center',
                        left: "47%",
                        width: '100px'
                    }} onClick={() => { navigator.clipboard.writeText(this.props.room.roomid); this.setState({ copytext: 'Copied' }) }}>
                        {this.props.room.roomid}
                        <div style={{
                            fontSize: '16px'
                        }}>{this.state.copytext}</div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div style={{
                        height: '466px',
                        width: '658px',
                        margin: 'auto',
                        border: '1px solid white',
                        backgroundColor: 'blue',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        position: 'absolute',
                        top: '100px',
                        left: '440px',
                    }}>
                        <OpponentTable opponentTable={this.props.room.players.names[0] === this.props.username ? this.props.room.gamestate.table.guest : this.props.room.gamestate.table.host} />
                        <Location yourstrength={this.props.room.players.names[0] === this.props.username ? this.props.room.gamestate.location.host.strength : this.props.room.gamestate.location.guest.strength} opponentstrength={this.props.room.players.names[0] === this.props.username ? this.props.room.gamestate.location.guest.strength : this.props.room.gamestate.location.host.strength} />
                        <YourTable  placecard={this.props.placecard} room={this.props.room} yourTable={this.props.room.players.names[0] !== this.props.username ? this.props.room.gamestate.table.guest : this.props.room.gamestate.table.host} pickedcard={this.props.pickedcard} />
                        <div>
                            <GameSettings />
                            <Draw />
                        </div>
                        <You username={this.props.username} />
                        <Hand hand={this.props.room.players.names[0] === this.props.username ? this.props.room.gamestate.hand.host : this.props.room.gamestate.hand.guest} pickcard={this.props.pickcard} pickedcard={this.props.pickedcard}/>
                        <Opponent username={this.props.opponentname} />
                    </div>
                </>
            )
        }
    }
}
