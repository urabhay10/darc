import React, { Component } from 'react'
import ReactCardFlip from 'react-card-flip'

export default class FlipCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            flipdirection: this.props.flipDirection ? this.props.flipDirection : "horizontal",
        }
    }
    componentDidMount() {
        if (this.props.interval) {
            setInterval(() => {
                this.setState({
                    isFlipped: !this.state.isFlipped,
                })
            }, 1000*this.props.interval)
        }
    }
    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection={this.state.flipdirection}>

                <div onClick={() => { this.setState({ isFlipped: false }) }} style={{ zIndex: 1 }}>
                    {this.props.front}
                </div>
                <div onClick={() => { this.setState({ isFlipped: true }) }} style={{ zIndex: 1 }}>
                    {this.props.back}
                </div>

            </ReactCardFlip>
        )
    }
}
