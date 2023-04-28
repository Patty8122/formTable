class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedRows: [],
      pageFinal: false
    };

    this.useRows = this.useRows.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.getSelectedRows = this.getSelectedRows.bind(this);
    this.useRows = this.useRows.bind(this);
    this.calculate = this.calculate.bind(this);
    this.updateData = this.updateData.bind(this);

  }

  // loadDataFromServer() {
  //   fetch('/api/data')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({ data: responseJson });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  componentDidMount() {
    // fetch('/api/data')
    fetch('data_pull.php')
      .then((response) => {
        console.log("response: ", response)
        return response.json()      
      })
      .then((responseJson) => {
        console.log("responseJson: ", responseJson)
        this.setState({ data: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  // useRows makes these rows editable
  useRows() {
    // display only selected rows
    this.setState({
      pageFinal: true
    });
  }

  returnHome() {
    // display all rows
    this.setState({
      pageFinal: false
    });
  }

  getSelectedRows(selectedData) {
    // return array of selected rows
    let selectedRows = [];
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i]) {
        selectedRows.push(this.state.data[i]);
      }
    }

    this.setState({
      selectedRows: selectedRows
    });
  }

  calculate() {
    // api call to save data to database
    // fetch('/api/savedata', {

    let post_data = new FormData();
    

      // put data in body but as a promise
      post_data.append('data', JSON.stringify(this.state.selectedRows));
      console.log("selectedRows: ", this.state.selectedRows); 
      let data = fetch('data_push.php', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // },
        body: JSON.stringify(this.state.selectedRows)
      })
      .then((response) => 
      {
          // console.log("response: ", response)
          return response.text();
        })
        .then((responseJson) => {
          console.log(responseJson);
        }
        )
        .catch((error) => {
          console.error(error);
        }
        );
  }
    
    updateData(new_data) {
    this.setState({
      selectedRows: new_data
    });
  }
  


  render() {
    if (this.state.pageFinal) {
      console.log("rendering final page", this.state.data);
      return (
        <React.Fragment>
          <h1>Final</h1>
          <FinalList updateData={this.updateData} selectedRows={this.state.selectedRows} calculate={this.calculate}/>
          <button className="return-main" onClick={this.returnHome}>Return to Main</button>
        </React.Fragment>
      )
    }

    else {
      console.log("rendering main page", this.state.data);
      return (
        <React.Fragment>
          <h1>Example</h1>
          <DataList  data={this.state.data} getSelectedRows={this.getSelectedRows} useRows={this.useRows} />
        </React.Fragment>
      );
    }


  }

}


class FinalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: this.props.selectedRows
    };

    this.onCalculate = this.onCalculate.bind(this);

  }

  componentDidUpdate() {
    if (this.props.selectedRows !== this.state.selectedRows) {
      this.setState({ selectedRows: this.props.selectedRows });
    }

  }

  onCalculate() {
    this.props.updateData(this.state.selectedRows);
    this.props.calculate();
  }

  render() {
    const data = this.state.selectedRows.map((data) =>
      <FinalData key={data.pair_number} data={data} />
    );
    return (
      <div>
        <tr>
          {/* <p className="form_inside_table">Pair Number, A, B</p> */}
          {data}
        </tr>
        <button onClick={this.onCalculate}>Calculate</button>
      </div>
    );
  }
}

class FinalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    this.handleChange = this.handleChange.bind(this);
    let temp = props.data;
    this.temp = temp;


  }

  componentDidUpdate() {
    if (this.props.data !== this.state.data) {
      this.setState({ data: this.props.data });
    }

  }

  handleChange(event) {
    // prevent default
    event.preventDefault();

    // console.log("this.state.data: ",this.state.data)

    // update state
    let temp = this.state.data;
    // console.log("event.target.name", event.target.name, "event.target.value:", event.target.value)
    temp[event.target.name] = event.target.value;
    this.setState({
      data: temp
    });
    // console.log("this.state.data: ",this.state.data)
  }

  render() {

    // by default all rows are editable
    // input field for each column

    return (
      <div>
        <p className="form_inside_table">Pair Number: {this.props.data.pair_number}</p>
        <form>
          {/* <label>
            Pair Number:
            <input type="text" defaultValue={this.props.data.pair_number} onChange={this.handleChange} />
          </label> */}
          <label className="form_inside_table">
            A:
            <input name="a" type="text" defaultValue={this.props.data.a} onChange={this.handleChange} />
          </label>
          <label className="form_inside_table">
            B:
            <input name="b" type="text" defaultValue={this.props.data.b} onChange={this.handleChange} />
          </label>

        </form>
      </div>

    );

  }
}





class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // false for number of rows in data
      selectedData: Array(this.props.data.length).fill(false)
    };

    this.handleClick = this.handleClick.bind(this);
    this.clickUseRows = this.clickUseRows.bind(this);
    // this.addSelectedData = this.addSelectedData.bind(this);
    // this.removeSelectedData = this.removeSelectedData.bind(this);
  }

  addSelectedData(data_row) {
    // update selectedData row to true for data_row.pair_number in the array
    // select data_row.pair_number in the array
    let temp = this.state.selectedData;
    temp[data_row.pair_number - 1] = true;
    this.setState({
      selectedData: temp
    });

  }

  removeSelectedData(data_row) {
    // iterate through selectedData and remove data_row.pair_number
    let temp = this.state.selectedData;
    temp[data_row.pair_number - 1] = false;
    this.setState({
      selectedData: temp
    });
  }

  handleClick(data_row) {
    if (this.state.selectedData[data_row.pair_number - 1]) {
      this.removeSelectedData(data_row);
    }
    else {
      this.addSelectedData(data_row);
    }

  }

  clickUseRows() {
    this.props.getSelectedRows(this.state.selectedData);
    console.log("clicked use rows")
    this.props.useRows();
    console.log("clicked use rows after")
  }


  render() {
    const data = this.props.data.map((data) =>
      <Data key={data.pair_number} data={data} handleClick={this.handleClick} addSelectedData={this.addSelectedData} removeSelectedData={this.removeSelectedData} selected={this.state.selectedData[data.pair_number - 1]} />
    );
    return (
      <div>
        {data}
        <button onClick={this.clickUseRows}>Use Rows</button>
      </div>
    );
  }
}

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  componentDidUpdate() {
    if (this.props.selected !== this.state.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  render() {
    return (
      <tr onClick={() => this.props.handleClick(this.props.data)} className={`data_row${this.state.selected ? " selected" : ""}`}>
        <td>{this.props.data.pair_number}</td>
        <td>{this.props.data.a}</td>
        <td>{this.props.data.b}</td>
        <td>{this.props.data.aplusb}</td>
      </tr>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
