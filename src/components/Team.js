import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';

class Team extends Component {

    state = {
        players: []
    }
    constructor(props) {
        super(props);
    }
    componentDidMount = () => {
      console.log(this.props.match.params.id);
        axios.get(`http://localhost:8000/api/players/${this.props.match.params.id}`)
            .then(resp => {
                this.setState(() => ({
                    players: resp.data.data
                }))
            })
    }
    render = () => {
        const { players } = this.state;

        return (
            <div className="columns is-multiline">
                {
                    players.map(player => {
                        return (
                            <div className="column is-one-quarter">
                                <PlayerCard {...player} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Team;