import React, { Component } from 'react'

export default class Draw extends Component {
    render() {
        return (
            <div style={{
                height: '96px',
                width: '144px',
                textAlign: 'center',
                lineHeight: '96px',
                backgroundColor: '#ff3131',
                display: 'flex'
            }}>
                <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt='...' style={{
                    height: '60px',
                    position: 'relative',
                    top: '21px',
                }} />
                <div style={{
                    position: 'relative',
                    marginLeft: '10px',
                    fontWeight: 800
                }}>
                    Settings
                </div>

            </div>
        )
    }
}
