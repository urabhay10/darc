import React, { Component } from 'react'
import drawicon from './assets/drawicon.png'

export default class Draw extends Component {
    render() {
        return (
            <div style={{
                height: '96px',
                width: '144px',
                textAlign: 'center',
                lineHeight: '96px',
                backgroundColor: '#fff7ad',
                display: 'flex'
            }}>
                <img src={drawicon} alt='...' style={{
                    height: '60px',
                    position: 'relative',
                    top: '21px',
                }} />
                <div style={{
                    position: 'relative',
                    fontWeight: 800
                }}>
                    Offer Draw?
                </div>

            </div>
        )
    }
}
