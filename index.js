import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import Router, { Link } from 'https://unpkg.com/preact-router?module';

// Main skeleton
const App = () => {
  return html`
  <nav>
    <span>Super-fancy navigation bar: </span>
    <${Link} activeClassName="active" href="/">Home</Link>
    <span> || </span>
    <${Link} activeClassName="active" href="/clock">Clock</Link>
  </nav>
  <${Router}>
    <${Home} path="/" title="Home page" />
    <${Clock} path="/clock" />
  </${Router}>
  `
}

// Function components
const Home = ({title}) => {
  return html`
  <${Header} title="Look mum, no bunlders!" />
  <${Footer} text="This is a Preact app - and it does not need a bundler to work on the browser :o" />
  `
}
const Header = ({ title }) => html`<h1>${title}</h1>`
const Footer = ({ text }) => html`<p>${text}</p>`

// Class components
class Clock extends Component {
  state = { time: Date.now() };

  // Called whenever our component is created
  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  // Called just before our component will be destroyed
  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render() {
    let time = new Date(this.state.time).toLocaleTimeString();
    return html`
      <div class="clock-wrapper">
        <${Header} title="I am a simple clock" />
        <h2>${time}</h2>
      </div>
    `;
  }
}

// Render Preact app to DOM
render(html`<${App} />`, document.body);