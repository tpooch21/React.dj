import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true
    };

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {

  }

  start() {
    debugger;
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.frequency.value = 220;
    osc.start();
  }

  stop() {
    osc.stop();
    osc.disconnect();
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <button onClick={this.start}>Play</button>
        <button onClick={this.stop}>Stop</button>
      </div>
    );
  }

};

export default App;