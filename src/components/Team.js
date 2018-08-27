import React, { Component } from 'react';
import axios from 'axios';
import PlayerCard from './PlayerCard';

class Team extends Component {

    state = {
        players: []
    }
    constructor(props) {
        super(props);
        console.log(props);
    }
    componentDidMount = () => {
      console.log(this.props.match.params.id);
        axios.get(`http://localhost:8000/api/players/${this.props.match.params.id}`)
            .then(({data}) => {
              console.log(data.roster);
                this.setState(() => ({
                    players: data.roster
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
                            <div className="column is-2">
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