//Modules
import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

//CSS
import "bootstrap/dist/css/bootstrap.css";
import "animate.css";

//Components
import Spinner from "../Spinner/Spinner"

//Services
import API from "./services/API";
const api = new API();

export default class StarWars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      characters: {
        all: [],
        filtered: [],
        favorite: []
      },
      loading: true,
      error: undefined
    };
  }

  async componentDidMount() {
    //Get Star Wars Characters
    try {
      const characters = await api.getAllPagesWait(
        "https://swapi.co/api/people/?format=json"
      );
      this.setState({
        characters: {
          ...this.state.characters,
          all: characters
        },
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
    const result = characters.all.filter(text =>
      text.name.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({
      search: value,
      characters: {
        ...this.state.characters,
        filtered: result
      },
    });
  };

  handleFavorite = e => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log(checked, value)
  }

  /** Cards Component */
  Cards = () => {
    const { search, characters, loading } = this.state;
    const filtered = search.length > 0;
    const charactersArr = filtered ? characters.filtered : characters.all;
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

  /** Card Component
   * @param {Object} props
   * @param {String} props.name - Character Name
   * @param {String} props.url - Character URL
   */
  Card = props => {
    const { name, url } = props;
    return (
      <li className="list-group-item animated fadeIn">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={this.handleFavorite}
            value={url}
          />
          <label className="form-check-label" htmlFor={url}>
            {name}
          </label>
        </div>
      </li>
    );
  };

  /** Handle Try Again Click */
  handleTryAgain = async () => {
    this.setState({
      loading: true
    });
    await this.componentDidMount();
  };

  /** Error Modal Component */
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
            <Button onClick={this.handleTryAgain}><Spinner display={loading} /> Try Again</Button>
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
