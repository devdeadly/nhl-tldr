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
      rankBy: '',
      filter: ''
    };
  }

  componentDidMount = () => {
    axios.get(`/api/teams`).then(({ data }) => {
      this.setState({
        allTeams: data,
        filter: localStorage.getItem('nhl-tldr:filter') || 'league'
      });
      this.processFilter(this.state.filter);
    });
  };

  componentDidUpdate = () => {
    const select = document.getElementById('filter-select');
    if (select) select.value = this.state.filter;
  };
  filterByLeague = () => {
    this.setState({ rankBy: RANK_TYPES.LEAUGE }, () => {
      this.setState({
        filteredTeams: mergeSort(this.state.allTeams, this.state.rankBy)
      });
    });
  };

  filterByConference = filter => {
    this.setState({ rankBy: RANK_TYPES.CONFERENCE }, () => {
      this.setState({
        filteredTeams: mergeSort(
          this.state.allTeams.filter(
            t => t.conferenceName.toLowerCase() === filter
          ),
          this.state.rankBy
        )
      });
    });
  };

  filterByDivision = filter => {
    this.setState({ rankBy: RANK_TYPES.DIVISION }, () => {
      this.setState({
        filteredTeams: mergeSort(
          this.state.allTeams.filter(
            t => t.divisionName.toLowerCase() === filter
          ),
          this.state.rankBy
        )
      });
    });
  };

  handleFilterChange = e => {
    const filter = e.target.value;
    this.processFilter(filter);
    this.setState({ filter });
  };

  processFilter = filter => {
    localStorage.setItem('nhl-tldr:filter', filter);

    switch (filter) {
      case FILTERS.LEAGUE:
        this.filterByLeague();
        break;
      case FILTERS.WESTERN:
        this.filterByConference(FILTERS.WESTERN);
        break;
      case FILTERS.EASTERN:
        this.filterByConference(FILTERS.EASTERN);
        break;
      case FILTERS.CENTRAL:
        this.filterByDivision(FILTERS.CENTRAL);
        break;
      case FILTERS.PACIFIC:
        this.filterByDivision(FILTERS.PACIFIC);
        break;
      case FILTERS.METROPOLITAN:
        this.filterByDivision(FILTERS.METROPOLITAN);
        break;
      case FILTERS.ATLANTIC:
        this.filterByDivision(FILTERS.ATLANTIC);
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
          <div className="select is-small is-rounded">
            <select id="filter-select" onChange={this.handleFilterChange}>
              <option value={FILTERS.LEAGUE}>{FILTERS.LEAGUE}</option>
              <option value={FILTERS.WESTERN}>{FILTERS.WESTERN}</option>
              <option value={FILTERS.EASTERN}>{FILTERS.EASTERN}</option>
              <option value={FILTERS.CENTRAL}>{FILTERS.CENTRAL}</option>
              <option value={FILTERS.PACIFIC}>{FILTERS.PACIFIC}</option>
              <option value={FILTERS.METROPOLITAN}>
                {FILTERS.METROPOLITAN}
              </option>
              <option value={FILTERS.ATLANTIC}>{FILTERS.ATLANTIC}</option>
            </select>
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
