import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import RowBase from '../row-base';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from '../item-details';

import './planet-page.css';

export default class PlanetPage extends Component {
  swapiService = new SwapiService()

  state = {
    selectedPlanet: null,
  }

  onPlanetSelected = (id) => {
    this.setState({ selectedPlanet: id });
  }

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPlanetSelected}
        getData={this.swapiService.getAllPlanets}
        renderItem={({ name, population, diameter }) => `${name} (${population}, ${diameter})`}
      />
    );
    const planetDetails = (
      <ItemDetails
        itemId={this.state.selectedPlanet}
        getData={this.swapiService.getPlanet}
        getImageUrl={this.swapiService.getPlanetImage}
      >
        <Record field="diameter" label="Diameter" />
        <Record field="population" label="Population" />
        <Record field="rotationPeriod" label="Rotation Period" />
      </ItemDetails>
    );
    return (
      <ErrorBoundry>
        <RowBase leftElem={itemList} rightElem={planetDetails} />
      </ErrorBoundry>
    );
  }
}
