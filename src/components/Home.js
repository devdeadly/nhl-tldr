import React, { Component } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';
import { mergeSort } from '../utils';

const FILTERS = {
  LEAGUE: 'league',
  WESTERN: 'western',
  EASTERN: 'eastern',
  CENTRAL: 'central',
  PACIFIC: 'pacific',
  METROPOLITAN: 'metropolitan',
  ATLANTIC: 'atlantic',
  INVALID: 'invalid filter requested'
};

const RANK_TYPES = {
  LEAUGE: 'leagueRank',
  CONFERENCE: 'conferenceRank',
  DIVISION: 'divisionRank'
};
class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: [],
      filteredTeams: [],
      rankBy: 'leagueRank'
    };
  }

  componentDidMount() {
    axios.get(`/api/teams`).then(({ data }) => {
      console.log('data', data);
      const allTeams = mergeSort(data, this.state.rankBy);
      this.setState(() => ({
        allTeams,
        filteredTeams: allTeams // unfilter teams by default
      }));
    });
  }

  handleFilterClick = e => {
    const filter = e.target.value;
    switch (filter) {
      case FILTERS.LEAGUE:
        this.setState({ rankBy: RANK_TYPES.LEAUGE }, () => {
          this.setState({
            filteredTeams: mergeSort(this.state.allTeams, this.state.rankBy)
          });
        });
        break;
      case FILTERS.WESTERN:
        this.setState({ rankBy: RANK_TYPES.CONFERENCE }, () => {
          this.setState({
            filteredTeams: mergeSort(
              this.state.allTeams.filter(
                t => t.conferenceName.toLowerCase() === FILTERS.WESTERN
              ),
              this.state.rankBy
            )
          });
        });
        break;
      case FILTERS.EASTERN:
        this.setState({ rankBy: RANK_TYPES.CONFERENCE }, () => {
          this.setState({
            filteredTeams: mergeSort(
              this.state.allTeams.filter(
                t => t.conferenceName.toLowerCase() === FILTERS.EASTERN
              ),
              this.state.rankBy
            )
          });
        });
        break;
      case FILTERS.CENTRAL:
        this.setState({ rankBy: RANK_TYPES.DIVISION }, () => {
          this.setState({
            filteredTeams: mergeSort(
              this.state.allTeams.filter(
                t => t.divisionName.toLowerCase() === FILTERS.CENTRAL
              ),
              this.state.rankBy
            )
          });
        });
        break;
      case FILTERS.PACIFIC:
        this.setState({ rankBy: RANK_TYPES.DIVISION }, () => {
          this.setState({
            filteredTeams: mergeSort(
              this.state.allTeams.filter(
                t => t.divisionName.toLowerCase() === FILTERS.PACIFIC
              ),
              this.state.rankBy
            )
          });
        });
        break;
      case FILTERS.METROPOLITAN:
        this.setState({ rankBy: RANK_TYPES.DIVISION }, () => {
          this.setState({
            filteredTeams: mergeSort(
              this.state.allTeams.filter(
                t => t.divisionName.toLowerCase() === FILTERS.METROPOLITAN
              ),
              this.state.rankBy
            )
          });
        });
        break;
      case FILTERS.ATLANTIC:
        this.setState({ rankBy: RANK_TYPES.DIVISION }, () => {
          this.setState({
            filteredTeams: mergeSort(
              this.state.allTeams.filter(
                t => t.divisionName.toLowerCase() === FILTERS.ATLANTIC
              ),
              this.state.rankBy
            )
          });
        });
        break;
      default:
        throw new Error(FILTERS.INVALID);
    }
  };

  render() {
    const { filteredTeams } = this.state;
    if (!filteredTeams.length) return <div className="loader" />;
    return (
      <section>
        <div className="flex justify-center">
          <div
            id="filter-buttons"
            className="buttons are-small has-addons"
            onClick={this.handleFilterClick}
          >
            <button className="button" value={FILTERS.LEAGUE}>
              league
            </button>
            <button className="button" value={FILTERS.WESTERN}>
              western
            </button>
            <button className="button" value={FILTERS.EASTERN}>
              eastern
            </button>
            <button className="button" value={FILTERS.CENTRAL}>
              central
            </button>
            <button className="button" value={FILTERS.PACIFIC}>
              pacific
            </button>
            <button className="button" value={FILTERS.METROPOLITAN}>
              metropolitan
            </button>
            <button className="button" value={FILTERS.ATLANTIC}>
              atlantic
            </button>
          </div>
        </div>

        <div className="columns is-multiline">
          {filteredTeams.map((t, i) => {
            return (
              <div
                key={i}
                className="column is-half-tablet is-one-third-widescreen"
              >
                <TeamCard
                  id={t.id}
                  name={t.name}
                  rank={t[this.state.rankBy]}
                  gp={t.gamesPlayed}
                  w={t.wins}
                  l={t.losses}
                  ot={t.ot}
                  p={t.points}
                  rw={t.regulationWins}
                  row={t.row}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default HomeComponent;
