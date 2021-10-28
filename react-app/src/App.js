import React from "react";

import axios from "axios";

import { Navbar, Container, Row, Col } from "react-bootstrap";
import Form from "./components/AddItem.js";
import Items from "./components/Items.js";

//const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      _id: "",
    };
  }
  // ${API_SERVER}

  // const data = response.data.map(el => el._id);// found the id
  // const items = await ItemModel.find({ _id: id });
  // const result = await axios.get(`http://localhost:3001/items${data}`);
  // console.log(response);

  // this.getItems();

  // console.log(data);
  // const id = req.params.id;
  // const items = response.data.find({_id: id})

  // const items = response.data;
  //console.log(items);

  //   Data.getOneItem = async (req, res) => {
  //     const id = req.params.id;
  //    const items = await ItemModel.find({ _id: id });
  //    try{
  //    res.status(200).json(items[0]);} catch(error){
  //      console.error(error);
  //    }

  //  }

  addItem = async (item) => {
    await axios.post(`http://localhost:3001/items`, item); //posts an item
    // this.setState({_id:add.data._id});
    // console.log(this.state._id);
    this.getItems(); //refreshes all the items to show on screen
  };

  // deleteItem = async (req,res) => {

  //   const data = await axios.get(`http://localhost:3001/items/`, {params:req.params._id});

  // console.log(data);
  // }
  // getOneItem = async (req) => {
  //  const result = await axios.get(`http://localhost:3001/items/:id`);
  //  try {
  //    console.log(result.data);
  //  } catch (error) {
  //    console.error(error);
  //  }
  //   // const id = this.state.items._id;
  //   //   this.state.items.filter((el, idx) => {

  //   //   });
  //    }

  deleteItem = async (id) => {
    //console.log(`Deleted Item ${id}`);
    await axios.delete(`http://localhost:3001/items/${id}`);
    //Force item refresh
    this.getItems();
  };

  getItems = async () => {
    const response = await axios.get(`http://localhost:3001/items`);
    const items = response.data;
    console.log(response.data);
    this.setState({ items });
  };

  //  const id = parseInt(req.params.id);
  //  item = this.state.items.filter(item => item._id !== id);
  //  this.setState({item});

  //  console.log(this.state.items);

  //  const items = await ItemModel.find({ _id: id });
  //  const id = req.params.id;
  //  const response = this.state.items.filter(item => item_id === id);)}
  //  console.log(response);

  handleDelete = async (item) => {
    // Whatever you want to do with that item
    this.getOneItem();
    //   const results = await axios.get(`http://localhost:3001/delete/:id`);
    // //await axios.delete(`http://localhost:3001/items/:id`, { params: { _id: item } }).then(response => {
    //    console.log(results.data);
  };

  async componentDidMount() {
    await this.getItems();
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">301 Final!</Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row>
            <Col>
              <h1>Our Items</h1>
            </Col>
          </Row>
          <Row>
            <Col md="auto">
              <Form handleAddItem={this.addItem} />
            </Col>
            <Col>
              <Items itemsList={this.state.items} delete={this.deleteItem} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default App;
