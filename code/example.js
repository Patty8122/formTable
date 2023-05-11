
// selectedRows : main page selected rows.  Used to pass to final page - but not used to calculate output
class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [], // data from api call - used to display main page 
      selectedRows: [], // rows selected on main page
      pageFinal: false, // true if on final page
      outputData: [] // data returned from output api call - used to display output
    };

    this.useRows = this.useRows.bind(this); // makes selected rows editable
    this.returnHome = this.returnHome.bind(this); // returns to main page
    this.getSelectedRows = this.getSelectedRows.bind(this); // gets selected rows from main page
    // this.calculate = this.calculate.bind(this);
    this.updateData = this.updateData.bind(this); // updates selected rows on final page
    // this.generateOutput = this.generateOutput.bind(this); // generates output

  }

  componentDidMount() {
    fetch('data_pull.php')
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
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
      pageFinal: false,
      // 
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

  // update selected rows on final page
  updateData(new_data) {
    this.setState({
      selectedRows: new_data
    });
  }


  // generateOutput() {
  //   // api call to generate output

  //   fetch('smalloutput.php', {
  //     method: 'POST',
  //     // headers: {
  //     //   'Content-Type': 'application/x-www-form-urlencoded'
  //     // },
  //     body: JSON.stringify(this.state.selectedRows)
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log("outputData post request: ", responseJson)
  //       this.setState({ outputData: responseJson });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }




  render() {
    if (this.state.pageFinal) {
      console.log("rendering final page", this.state.data);
      console.log("selectedRows: ", this.state.selectedRows)
      return (
        <React.Fragment>
          <h1>Final</h1>
          <FinalList updateData={this.updateData} selectedRows={this.state.selectedRows} />
          <button className="return-main" onClick={this.returnHome}>Return to Main</button>
          <br />
          {/* <button onClick={this.generateOutput}>SmallOutput</button>
        {console.log("outputData: ", this.state.outputData)} */}
          {/* {this.state.outputData.length>0 && 
          <table>
            <thead>
              <tr>
                <th>Pair Number</th>
                <th>A</th>
                <th>B</th>
                <th>A+B</th>
                </tr>
                </thead>
                <tbody>
                  {this.state.outputData.map((data) =>
                    <tr key={data.pair_number}>
                      <td>{data.pair_number}</td>
                      <td>{data.a}</td>
                      <td>{data.b}</td>
                      <td>{data.aplusb}</td>
                    </tr>
                  )}               
                </tbody>
              </table>
        }
 */}
        </React.Fragment>


      )
    }

    else {
      console.log("rendering main page", this.state.data);
      return (
        <React.Fragment>
          <h1>Example</h1>
          <DataList data={this.state.data} getSelectedRows={this.getSelectedRows} useRows={this.useRows} />
        </React.Fragment>
      );
    }


  }

}


class FinalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: this.props.selectedRows,
      outputData: []
    };

    console.log("selectedRows: ", this.state.selectedRows, "props: ", this.props.selectedRows)

    this.onCalculate = this.onCalculate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateOutput = this.generateOutput.bind(this);

  }

  componentDidUpdate() {
    if (this.props.selectedRows !== this.state.selectedRows) {
      this.setState({ selectedRows: this.props.selectedRows });
    }

  }

  onCalculate() {
    console.log("176 selectedRows: ", this.state.selectedRows, "props: ", this.props.selectedRows)

    // this.props.updateData(this.state.selectedRows);
    let post_data = new FormData();


    // put data in body but as a promise
    post_data.append('data', JSON.stringify(this.state.selectedRows));
    console.log("selectedRows: ", this.state.selectedRows);
    let data = fetch('data_push.php', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      body: JSON.stringify(JSON.stringify(this.state.selectedRows))
    })
      .then((response) => {
        console.log("response: ", response)
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

  generateOutput() {
    // api call to generate output
    console.log("selectedRows: ", this.state.selectedRows);
    fetch('smalloutput.php', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      body: JSON.stringify(this.state.selectedRows)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("outputData post request: ", responseJson)
        this.setState({ outputData: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }



  handleChange(event) {
    // // prevent default
    // // event.preventDefault();

    // // console.log("this.state.data: ",this.state.data)

    // // update state
    // let temp = this.state.selectedRows;
    // console.log("temp 280: ", temp)
    // // console.log("event.target.name", event.target.name, "event.target.value:", event.target.value)
    // temp[event.target.name] = event.target.value;
    // this.setState({
    //   selectedRows: temp
    // });
    // console.log("this.state.data: ",this.state.selectedRows)
    console.log("this.state.selectedRows: ", this.state.selectedRows)
    let temp = this.state.selectedRows;
    console.log("temp: ", temp)
    // console.log("event.target.name", event.target.name, "event.target.value:", event.target.value)
    temp[0][event.target.name] = event.target.value;
    console.log("temp updated: ", temp)

    this.setState({
      selectedRows: temp
    });

    console.log("this.state.selectedRows: ", this.state.selectedRows)

  }

  render() {

    return (
      <div>
        {
          this.state.selectedRows.map((row, index) =>{
            return (
              <React.Fragment>
                <label className="form_inside_table" key={row.pair_number}>
                  A:
                  <input name="a" type="text" defaultValue={row.a} onChange={(event) => {
                    console.log("this.state.selectedRows: ", this.state.selectedRows)
                    let temp = this.state.selectedRows;
                    console.log("temp: ", temp)
                    // console.log("event.target.name", event.target.name, "event.target.value:", event.target.value)
                    console.log("index: ", index)
                    temp[index][event.target.name] = event.target.value;
                    console.log("temp updated: ", temp)

                    this.setState({
                      selectedRows: temp
                    });

                    console.log("this.state.selectedRows: ", this.state.selectedRows)

                  }} />
                </label>
                <label className="form_inside_table">
                  B:
                  <input name="b" type="text" defaultValue={row.b} onChange={(event) => {
                    console.log("this.state.selectedRows: ", this.state.selectedRows)
                    let temp = this.state.selectedRows;
                    console.log("temp: ", temp)
                    // console.log("event.target.name", event.target.name, "event.target.value:", event.target.value)
                    temp[index][event.target.name] = event.target.value;
                    console.log("temp updated: ", temp)

                    this.setState({
                      selectedRows: temp
                    });

                    console.log("this.state.selectedRows: ", this.state.selectedRows)
                  }} />
                </label>



              </React.Fragment>
            )
          })
        }
        <h1> Playground output </h1>
      {this.state.outputData.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Pair Number</th>
              <th>A</th>
              <th>B</th>
              <th>A+B</th>
            </tr>
          </thead>
          <tbody>
            {this.state.outputData.map((data) =>
              <tr key={data.pair_number}>
                <td>{data.pair_number}</td>
                <td>{data.a}</td>
                <td>{data.b}</td>
                <td>{data.aplusb}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
        <br />
        <button onClick={() => {
          this.onCalculate();
        }}>Calculate</button>

        <br />
        <button onClick={() => {
          this.generateOutput();
        }}>Generate Output</button>
      </div>
    );
  }
}

class FinalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // send a copy of the data to the state
      data: this.props.data
      // data: 
      // data: this.props.data
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



// DataList component

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
