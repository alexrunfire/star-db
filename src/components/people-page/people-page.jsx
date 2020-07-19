import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import RowBase from '../row-base';
import ErrorBoundry from '../error-boundry';

export default class PeoplePage extends Component {
  swapiService = new SwapiService()

  state = {
    selectedPerson: null,
  }

  onPersonSelected = (id) => {
    this.setState({ selectedPerson: id });
  }

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`}
      />
    );
    const personDetails = (
      <ItemDetails
        itemId={this.state.selectedPerson}
        getData={this.swapiService.getPerson}
        getImageUrl={this.swapiService.getPersonImage}
      >
        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth Year" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );
    return (
      <ErrorBoundry>
        <RowBase leftElem={itemList} rightElem={personDetails} />
      </ErrorBoundry>
    );
  }
}
