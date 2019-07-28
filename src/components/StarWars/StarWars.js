//Modules
import React, { Component } from "react";

//Components
import Spinner from "../Spinner/Spinner"

//CSS
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import "animate.css";
import "./StarWars.css";

//Services
import API from "./services/API";
const api = new API();

export default class StarWars extends Component {
  constructor(props) {
    super(props);
    this.count = {
      total: undefined,
      current: undefined
    };
    this.state = {
      search: "",
      characters: [],
      charactersFiltered: [],
      loading: true,
      error: undefined
    };
  }

  async componentDidMount() {
    try {
      const characters = await api.getAllPagesWait(
        "https://swapi.co/api/people/?format=json"
      );
      this.setState({
        characters: characters,
        loading: false,
        error: false
      });
    } catch (err) {
      this.setState({
        error: err.message,
        loading: false
      });
    }
  }

  /** Handle Search - Filters characters array by name.
   * @param {Object} e - React SyntheticEvent object
   */
  handleSearch = e => {
    const { characters } = this.state;
    const value = e.target.value;
    const result = characters.filter(text =>
      text.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({
      search: value,
      charactersFiltered: result
    });
  };

  //** Cards Component */
  Cards = () => {
    const { search, characters, charactersFiltered, loading } = this.state;
    const filtered = search.length > 0;
    const charactersArr = filtered ? charactersFiltered : characters || [];
    return (
      <React.Fragment>
        <div className="input-group mb-3">
          <input
            className="form-control"
            onChange={this.handleSearch}
            value={this.state.search}
            aria-label="Star Wars Character Search Input"
            aria-describedby="character-search-input"
            placeholder={
              loading ? "Loading, please wait..." : "Seach Characters"
            }
            disabled={loading}
          />
        </div>
        <div className="list-group list-group-flush">
          {charactersArr.map(item => (
            <this.Card {...item} key={item.url} />
          ))}
        </div>
      </React.Fragment>
    );
  };

  //** Card Component */
  Card = props => {
    const { name, url } = props;
    return (
      <li className="list-group-item animated fadeIn">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id={url}
          />
          <label className="form-check-label" htmlFor={url}>
            {name}
          </label>
        </div>
      </li>
    );
  };

  tryAgain = async () => {
    this.setState({
      loading: true
    })
    await this.componentDidMount();
  };

  Error = () => {
    const { error, loading } = this.state;
    if (error) {
      return (
        <Modal show={true} centered>
          <Modal.Body>
            <h4>Error</h4>
            <p>{error}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.tryAgain}><Spinner display={loading} /> Try Again</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Star Wars <small className="text-muted">Characters</small>
        </h1>
        <this.Error />
        <this.Cards />
      </div>
    );
  }
}
