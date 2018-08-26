import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class PlayerCard extends Component {

  state = {
    imageUrl: '',
    fullName: `${this.props.player.firstName} ${this.props.player.lastName}`,
    // ready: false
  }

  constructor(props) {
    super(props);
    // setTimeout(() => {
    //   this.setState(() => ({
    //     ready: true
    //   }))
    // }, 2000)

  }
  componentDidMount() {
    console.log(this.state.fullName);
    // axios.get(`http://localhost:8000/api/image/${this.state.fullName}`)
    //   .then(resp => {
    //     this.setState(() => ({
    //       imageUrl: resp.data.imageUrl
    //     }))
    //   })
  }
  render() {
    const { jerseyNumber, player: { imageUrl } } = this.props;
    const { fullName } = this.state;
    // if (!this.state.ready) {
    //   return ''
    // }
    return (
      <Link to="/">
        <div className="card has-text-centered">
          <div className="card-image">
            <figure className="image is-square">
              <img src={`http://files.eliteprospects.com/layout/players/${imageUrl}`} />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <h2 className="is-size-2">{jerseyNumber}</h2>
              <h4 className="is-size-4">{fullName}</h4>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

{/* <img src={this.state.imageUrl} alt={this.props.name} />
<h5>{this.props.player.name}</h5> */}