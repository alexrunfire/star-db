export default class SwapiService {
  _apiBase = 'https://swapi.dev/api/';

  getResourses = async (url) => {
    const requestUrl = `${this._apiBase}${url}`;
    const res = await fetch(requestUrl);
    if (!res.ok) {
      throw new Error(`Could not fetch ${requestUrl}, recieved ${res.status}`);
    }
    const body = await res.json();
    return body;
  };

  getAllPeople = async () => {
    const res = await this.getResourses('people');
    return res.results.map(this._transformPerson);
  }

  getPerson = async (id) => {
    const person = await this.getResourses(`people/${id}`);
    return this._transformPerson(person);
  }

  getAllPlanets = async () => {
    const res = await this.getResourses('planets');
    return res.results.map(this._transformPlanet);
  }

  getPlanet = async (id) => {
    const planet = await this.getResourses(`planets/${id}`);
    return this._transformPlanet(planet);
  }

  getAllStarships = async () => {
    const res = await this.getResourses('starships');
    return res.results.map(this._transformStarship);
  }

  getStarship = async (id) => {
    const starship = await this.getResourses(`starships/${id}`);
    return this._transformStarship(starship);
  }

  getImageBase = (type, id) => `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`

  getPersonImage = (id) => this.getImageBase('characters', id)

  getStarshipImage = (id) => this.getImageBase('starships', id)

  getPlanetImage = (id) => this.getImageBase('planets', id)

  _extractId = (component) => {
    const regExp = /\/([0-9]*)\/$/;
    return component.url.match(regExp)[1];
  }

  _transformPlanet = (planet) => ({
    id: this._extractId(planet),
    name: planet.name,
    population: planet.population,
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter,
  })

  _transformStarship = (starship) => ({
    id: this._extractId(starship),
    name: starship.name,
    model: starship.model,
    manufacturer: starship.manufacturer,
    costInCredits: starship.cost_in_credits,
    length: starship.length,
    crew: starship.crew,
    passengers: starship.passengers,
    cargoCapacity: starship.cargo_capacity,
  })

  _transformPerson = (person) => ({
    id: this._extractId(person),
    name: person.name,
    gender: person.gender,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
  })
}
