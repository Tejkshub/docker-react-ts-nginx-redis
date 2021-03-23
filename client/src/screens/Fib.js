import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchIndexes();
    this.fetchValues();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    console.log(values.data);
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    console.log(seenIndexes.data);
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values/create', {
      index: this.state.index,
    });

    this.setState({ index: '' });
  };

  render() {
    const renderSeenIndexes = this.state.seenIndexes
      .map(({ values }) => values)
      .join(', ');

    const renderValues = () => {
      const entries = [];

      for (let key in this.state.values) {
        entries.push(
          <div key={key}>
            For index {key} I calculated{' '}
            {this.state.values[key]}
          </div>
        );
      }

      return entries;
    };

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) =>
              this.setState({ index: event.target.value })
            }
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {renderSeenIndexes}

        <h3>Calculated Values:</h3>
        {renderValues()}
      </div>
    );
  }
}

export default Fib;
