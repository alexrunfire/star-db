import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';

export const Record = ({ item, field, label }) => (
  <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
);
export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: {},
    image: null,
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(itemId),
        });
      });
  }

  render() {
    const {
      item,
      image,
    } = this.state;
    const { itemId, children } = this.props;
    const startMessage = !itemId ? <StartMessage /> : null;
    const loading = !(itemId === item.id);
    const spinner = itemId && loading ? <Spinner /> : null;
    const itemView = itemId && !loading
      ? <ItemView item={item} image={image}>{children}</ItemView> : null;
    return (
      <div className="item-details card">
        {startMessage}
        {spinner}
        {itemView}
      </div>
    );
  }
}

const StartMessage = () => (
  <span className="select-item">
    Select a person from the list on the left side
  </span>
);

const ItemView = ({ item, image, children }) => (
  <>
    <img
      className="item-image"
      src={image}
      alt=""
    />

    <div className="card-body">
      <h4>{item.name}</h4>
      <ul className="list-group list-group-flush">
        {
            React.Children.map(children, (child) => React.cloneElement(child, { item }))
          }
      </ul>
    </div>
  </>
);
