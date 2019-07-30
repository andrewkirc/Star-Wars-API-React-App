/*
   Create a searchable star wars character list using React and SW API
    
    Acceptance Criteria:
        - A user should be able to see the list of ALL the SW characters generated from the star wars API.
        - A user should be able to filter the list by name using an input box
        - Bonus: A user should be able to mark items from the list as their favorite 
        - > Favorites should always be at the top and they should be a different background and text color

    API Reference: 
      https://swapi.co/
      https://swapi.co/api/people/?format=js{

    Goals:
        - Pair program on feature work
        - Learn how you approach tools and technology
        - Interview experience matches the role
    
    React cheat sheet:
        - JSX transforms HTML-like syntax to JavaScript: 
            eg: <div /> === React.createElement('div')
            eg: <TodoListItem text="foo" /> === React.createElement('TodoListItem', { text: 'foo' })
        - Props:
            Properties are immutable data that is external to a component (eg: 'text' in 'TodoListItem')
        - State:
            State is mutable data that is internal to a component (eg: 'constructor' in 'TodoList')
            this.setState({ ... }) will set state on an internal component.
        - Components will automatically re-render on property/state changes.
        - Component lifecycle methods:
            componentWillMount
            componentDidMount
            componentWillReceiveProps
            render
            shouldComponentUpdate
*/

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
        filtered: []
      },
      loading: true,
      error: undefined
    };
  }

  async componentDidMount() {
    //Get Star Wars Characters
    try {
      const characters = await api.getAllPages(
        "https://swapi.co/api/people/?format=json", 10
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
    const { characters } = this.state;
    let all = characters.all;

    //Add to favorites
    all.filter((value, index, arr) => {
      if (e.target.checked && value.name === e.target.value) {
        //Move favorite items to top of array, and add favorite boolean.
        all.splice(index, 1);
        all.unshift({ ...value, favorite: true });
      } else if (!e.target.checked && value.name === e.target.value) {
        //Otherwise, set favorite boolean to false.
        all[index].favorite = false;
      }
      return null;
    });

    this.setState({
      characters: {
        ...this.state.characters
      }
    });
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
   * @param {Boolean} props.favorite - Display Favorite Badge
   */
  Card = props => {
    const { name, url, favorite } = props;
    const _favorite = favorite || false;
    return (
      <li className="list-group-item animated fadeIn">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={this.handleFavorite}
            value={name}
            checked={_favorite}
          />
          <label className="form-check-label" htmlFor={url}>
            {name} {_favorite ? <span className="badge badge-success">Favorite</span> : null}
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
