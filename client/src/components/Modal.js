import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.closeModalOnEnter = this.closeModalOnEnter.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeModalOnEnter);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalOnEnter);
  }

  closeModalOnEnter(event) {
    if (event.key === 'Enter' && this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    const {
      title,
      height,
      width,
      description,
      closeButtonText,
      backgroundColor,
      closeButtonColor
    } = this.props;

    const modalStyle = {
      height: height + 'px' || '300px',
      width: width + 'px' || '400px',
      backgroundColor: backgroundColor || '#fff',
      border: '2px solid #333',
      borderRadius: '5px',
      padding: '20px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    const closeBtnStyle = {
      cursor: 'pointer',
      float: 'right',
      backgroundColor: closeButtonColor || 'white',
      minWidth: '30px',
      textAlign: 'center',
      position: 'absolute',
      bottom: '10px',
      right: '10px'
    };

    return (
      <div style={modalStyle}>
        <h2 style={{
            fontSize: '40px',
            fontWeight: '600'
        }}>{title}</h2>
        <p style={{
            fontSize: '26px'
        }}>{description}</p>
        <span
          className='matchmake'
          style={closeBtnStyle}
          onClick={this.props.onClose} // Assuming you have an onClose function passed as a prop
          onKeyDown={this.closeModalOnEnter}
          tabIndex={0} // Ensure the element can receive focus
        >
          {closeButtonText|| 'Close'}
        </span>
      </div>
    );
  }
}
