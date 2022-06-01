import { Component, render, html } from 'https://unpkg.com/htm/preact/standalone.module.js';
// preact-router doesn't work with UNPKG: https://github.com/preactjs/preact/issues/2564
import Router, { Link } from 'https://cdn.skypack.dev/preact-router@latest';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

// if you need some hooks, e.g. useState
// import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module'

// Main skeleton
const App = () => {
  return html`
  <div class="flex flex-col place-items-center">
    <div class="basis-0">
      <nav>
        <span>Super-fancy navigation bar: </span>
        <${Link} activeClassName="active" href="/">Home</Link>
        <span> || </span>
        <${Link} activeClassName="active" href="/clock">Clock</Link>
      </nav>
    </div>
    <div class="p-5 border-dashed border-2 rounded">
      <${Router}>
        <${Home} path="/" title="Home page" />
        <${Clock} path="/clock" />
      </${Router}>
    </div>
    <div>
      <button
        type="button"
        class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        TailwindCSS button
      </button>
    </div>
  </div>
  `
}

// Function components
const Home = ({ title }) => {
  confetti();
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
    confetti();
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