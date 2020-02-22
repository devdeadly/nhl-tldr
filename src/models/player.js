export class Player {
  constructor(playerDto) {
    this.id = playerDto.id;
    this.fullName = playerDto.fullName;
    this.primaryNumber = playerDto.primaryNumber;
    this.birthDate = playerDto.birthDate;
    this.currentAge = playerDto.currentAge;
    this.birthCity = playerDto.birthCity;
    this.birthStateProvince = playerDto.birthStateProvince;
    this.birthCountry = playerDto.birthCountry;
    this.nationality = playerDto.nationality;
    this.height = playerDto.height;
    this.weight = playerDto.weight;
    this.isActive = playerDto.active;
    this.isAlternateCaptain = playerDto.alternateCaptain;
    this.isCaptain = playerDto.captain;
    this.isRookie = playerDto.rookie;
    this.shootsCatches = playerDto.shootsCatches;
    this.teamId = playerDto.currentTeam.id;
    this.teamName = playerDto.currentTeam.name;
    this.position = playerDto.primaryPosition.name;
    this.flagUrl = playerDto.flagUrl;
    this.stats = playerDto.stats;
    this.photoUrl = this.getPlayerPhotoUrl(this.id);
  }

  getPlayerPhotoUrl(id) {
    return `https://nhl.bamcontent.com/images/headshots/current/168x168/${id}@2x.jpg`;
  }
};