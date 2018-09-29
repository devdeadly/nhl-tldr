export class Team {
  constructor(teamDto){
    this.teamName = teamDto.name;
    this.players = teamDto.roster.roster;
  }
};