import React, { Component } from 'react';
import Spinner from '../spinner';

export default (View) => class extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((data) => {
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;
    if (!data) {
      return <Spinner />;
    }
    return <View {...this.props} data={data} />;
  }
};
