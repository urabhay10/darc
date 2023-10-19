import React, { Component } from 'react'
import InfoBox from './InfoBox'
import Interface from './Interface'
import ChatBox from './ChatBox'
import GameBG from './assets/DARC.png'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <>
                <img src={GameBG} alt='' style={{ position: 'fixed', width: '100vw', top: '-20px' }} />
                <div style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                }}>
                    <InfoBox />
                    <Interface />
                    <ChatBox />
                </div>
            </>
        )
    }
}
