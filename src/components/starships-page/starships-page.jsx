import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import RowBase from '../row-base';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from '../item-details';

import './starships-page.css';

export default class StarshipsPage extends Component {
  swapiService = new SwapiService()

  state = {
    selectedStarship: null,
  }

  onStarshipSelected = (id) => {
    this.setState({ selectedStarship: id });
  }

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onStarshipSelected}
        getData={this.swapiService.getAllStarships}
        renderItem={({ name, model, manufacturer }) => `${name} (${model}, ${manufacturer})`}
      />
    );
    const starshipsDetails = (
      <ItemDetails
        itemId={this.state.selectedStarship}
        getData={this.swapiService.getStarship}
        getImageUrl={this.swapiService.getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );
    return (
      <ErrorBoundry>
        <RowBase leftElem={itemList} rightElem={starshipsDetails} />
      </ErrorBoundry>
    );
  }
}
