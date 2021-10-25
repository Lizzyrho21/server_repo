import React from 'react';

import axios from 'axios';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Form from './components/AddItem.js';
import Items from './components/Items.js';

const API_SERVER = process.env.REACT_APP_API;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }
  // ${API_SERVER}

  addItem = async (item) => {
    await axios.post(`http://localhost:3001/items`, item);
    this.getItems();
  }

  getItems = async () => {
    const response = await axios.get(`http://localhost:3001/items`);
    const items = response.data;
    console.log(response.data);
    this.setState({ items });
  }


  // handleDelete = async (item) => {
  //   // Whatever you want to do with that item
  //    await axios.delete(`http://localhost:3001/items/:id`, { params: { _id: item } }).then(response => {
  //     console.log(response);
  //   });
  // }

  deleteItem = async (item) => {
    const response = await axios.get(`http://localhost:3001/items`, {params: {_id: item}});
    // this.getItems();
    const items = response.data;
    console.log(items);
      
  }


//   useEffect(() => {
//     // DELETE request using axios with async/await
//     async function deletePost() {
//         await axios.delete('https://reqres.in/api/posts/1');
//         setStatus('Delete successful');
//     }

//     deletePost();
// }, []);




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
            <Col><h1>Our Items</h1></Col>
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
