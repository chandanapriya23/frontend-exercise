import React, { Component } from 'react';
import './App.css';

// const h = [ {
//   id: 'name',
//   title: 'Name',
//   value: 'name'
// }, {
//   id: 'id',
//   title: 'Id',
//   value: 'id'
// }, {
//   id: 'capacity',
//   title: 'Capacity',
//   value: 'capacity'
// }, {
//   id: 'census',
//   title: 'Census',
//   value: 'census'
// }, { 
//   id: 'highAlarm',
//   title: 'highAlarm',
//   value: 'highAlarm'
// }, {
//   id: 'lowAlarm',
//   title: 'lowAlarm',
//   value: 'lowAlarm'
// }];

class App extends Component {
  // constructor(props) {
  // super(props);
  // this.state = { todos: [] };
  // this.onSort = this.onSort.bind(this)
  // }
  
  state = {
    todos: []
  }

  componentDidMount() {
    fetch('https://private-66479-hospiqtest.apiary-mock.com/units')
    .then(res => res.json())
    .then((data) => {
      this.setState({ todos: data })
    })
    .catch(console.log)
  }

  // onSort(sortKey){
  //   const data = this.state.todos;
  //   data.sort((a,b) => (typeof a[sortKey] === "string") ? a[sortKey].localeCompare(b[sortKey])  : a[sortKey] - (b[sortKey]))
  //   this.setState({todos: data})
  // }

  onSort(sortKey){
  	this.setState({
            switchSort:!this.state.switchSort
        })
    const data = this.state.todos;
    data.sort(this.compareByDesc(sortKey));
    this.setState({todos: data})
  }

   compareByDesc(key){
    if(this.state.switchSort){
        return function(a,b){
            if (a[key] < b[key]) return -1; 
            if (a[key] > b[key]) return 1; 
            return 0;
        };
    }else{
        return function(a,b){
            if (a[key] > b[key]) return -1; 
            if (a[key] < b[key]) return 1; 
            return 0;
        };
    }
   }

  // // render function for static table header
  // renderTableHeader() {
  //   return <tr>{h.map((header, index) => {
  //     const { id, title, value } = header;
  //      return <th key={id} onClick={e => this.onSort(value)}>{title.toUpperCase()  }</th>
  //     //  <i class = "fa fa-sort"></i>
  //   })}</tr>
  // }

  // render function for dynamic table header
  renderTableHeader() {
    const header = this.state.todos.length ? Object.keys(this.state.todos[0]) : null;
    return <tr>{header && header.map((key, index) => {
       return <th key={index} onClick={e => this.onSort(key)}>{key.toUpperCase()  }</th>
    })}</tr>
  }

  renderTableData() {
    return this.state.todos.map((patient, index) => {
      const { name, id, capacity, census, highAlarm, lowAlarm } = patient //destructuring
      return (
        <tr key={id}>
           <td>{name}</td>
           <td>{id}</td>
           <td>{capacity}</td>
           <td>{census}</td>
           <td>{highAlarm}</td>
           <td>{lowAlarm}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12">
          <h1 id ='title'>Hospital IQ Units</h1>
          <table id='todos'>
          <thead>{this.renderTableHeader()}</thead>
          <tbody>
           {this.state.todos.length ? (
             this.renderTableData()
             ) : (
              <tr><td colSpan="6">No rows available</td></tr>
             )
            }
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;

