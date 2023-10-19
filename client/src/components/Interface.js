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
    render() {
        return (
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
                <OpponentTable/>
                <Location/>
                <YourTable/>
                <div>
                <GameSettings/>
                <Draw/>
                </div>
                <You username='abhay'/>
                <Hand/>
                <Opponent username='dev'/>
            </div>
        )
    }
}
