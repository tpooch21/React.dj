import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true
    };

  }

  render() {
    return <h1>Hello World</h1>
  }

};

export default App;