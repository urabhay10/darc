import React, { Component } from 'react'
import Card from './Card';

class YourTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canPlaceCards: [],
    };
  }

  componentDidMount() {
    this.checkCanPlaceCards();
  }

  checkCanPlaceCards() {
    const { yourTable, pickedcard } = this.props;
    const requests = yourTable.map((card) =>
      fetch('http://localhost:8000/game/canplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room: this.props.room,
          id: pickedcard.id, // Replace with the actual property name from pickedcard
          placeat: card, // Replace with the property name that identifies the card's position
        }),
      })
        .then((response) => response.json())
        .then((data) => data.canplace)
    );
    Promise.all(requests)
      .then((canPlaceResults) => {
        this.setState({
          canPlaceCards: canPlaceResults,
        });
      })
      .catch((error) => {
        console.error('Error checking if cards can be placed:', error);
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.pickedcard !== prevProps.pickedcard) {
      this.checkCanPlaceCards();
    }
  }
  render() {
    return (
      <div style={{
        height: '192px',
        width: '512px',
        backgroundColor: '#c1ff72',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        {this.props.yourTable.map((card, index) => (
          <div
            className={`card ${this.state.canPlaceCards[index] && card.placeholder===true ? 'highlighted' : ''}`}
            key={index}
            onClick={()=>{card.placeholder===true?this.props.placecard(card):console.log('cannot place a card on another card')}}
          >
            <Card placeholder={card.placeholder} text={card.name?card.name:card.placetype} cardid={card.cardid}/>
          </div>
        ))}
      </div>
    );
  }
}

export default YourTable;
