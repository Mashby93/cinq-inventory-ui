import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import CategoryService from '../../../services/CategoryService';

class ListCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {categories: [], isLoading: true};
  }

  componentDidMount() {
    CategoryService.getAllBulk()
      .then(data => {
        this.setState({categories: data});
      })
    this.setState({isLoading: false});
  }

  render() {
    const {categories, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = categories.map(category => {
      return <tr key={category.id}>
        <td style={{whiteSpace: 'nowrap'}}>{category.name}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/categories/" + category.id}>View/Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/management/types/new">Create category</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Name</th>
            </tr>
            </thead>
            <tbody>
            {reportList}
            </tbody>
          </Table>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default ListCategories;
