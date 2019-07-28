/*
   
   Create a searchable star wars character list using React and SW API
    
    Acceptance Criteria:
        - A user should be able to see the list of ALL the SW characters generated from the star wars API.
        - A user should be able to filter the list by name using an input box
        - Bonus: A user should be able to mark items from the list as their favorite 
        - > Favorites should always be at the top and they should be a diffrent background and text color

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
import React from "react";
import ReactDOM from "react-dom";

//Components
import StarWars from "./components/StarWars/StarWars";

ReactDOM.render(<StarWars />, document.getElementById("root"));
