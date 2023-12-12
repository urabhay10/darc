import React, { Component } from 'react';
import Card from './Card';

export default class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { id: 1, focus: true, width: 6, height: 6, fontSize: 3 },
        { id: 2, focus: false, width: 3, height: 3, fontSize: 1.5 },
        { id: 3, focus: false, width: 3, height: 3, fontSize: 1.5 },
        { id: 4, focus: false, width: 3, height: 3, fontSize: 1.5 },
      ],
      focusedCardIndex: 0,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const { cards, focusedCardIndex } = this.state;

    if (event.key === 'ArrowLeft') {
      this.setState({
        cards: cards.map((card, index) => ({
          ...card,
          focus:  focusedCardIndex > 0 ? index === focusedCardIndex - 1 : index === 0,
        })),
        focusedCardIndex: focusedCardIndex > 0 ? focusedCardIndex - 1 : 0,
      });
    } else if (event.key === 'ArrowRight') {
      this.setState({
        cards: cards.map((card, index) => ({
          ...card,
          focus: focusedCardIndex < cards.length - 1 ? index === focusedCardIndex + 1 : index === focusedCardIndex,
        })),
        focusedCardIndex:
          focusedCardIndex < cards.length - 1 ? focusedCardIndex + 1 : focusedCardIndex,
      });
    }
  };

  render() {
    const { cards } = this.state;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',background: 'linear-gradient(120deg, #2980b9, #6dd5fa)',   }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              style={{
                margin: '5px',  
                transition: 'transform 0.2s ease',
              }}
            >
              <Card
                color='lightblue'
                textColor='black'
                text={`The world of DARC`}
                width={card.focus?6:3}
                height={card.focus?6:3}
                fontSize={card.focus ? 3 : 1.5}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
