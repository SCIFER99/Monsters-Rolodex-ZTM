import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import './App.css';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {

  constructor() {
    super();

    // Construct the search field in its initial state. 
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // CRUD: Create (or componentDidMount()) and pull the data we want. 
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => 
       this.setState(() => {
          return {monsters: users};
        }
      )
    );
  }

  // Object to accept lower case letter searches. 
  onSearchChange = (event) => {           
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
        return { searchField };
    });
  }

  // Render function to create a search amongst data.
  render() {
    
    const {monsters, searchField} = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    
    // Create the search box with search placeholder
    // and filter the search by name.
    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
         <SearchBox 
              className='monsters-search-box'
              onChangeHandler={onSearchChange}
              placeholder='search monsters'/>
         <CardList monsters={filteredMonsters}/>      
      </div>
    );
  }
}

// Launch the App
export default App;
