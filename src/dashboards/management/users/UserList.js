import React, { Component, Spinner } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen'
import UserService from '../../../services/UserService.js';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {users: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    UserService.getUsers(0, 15)
      .then(data => this.setState({users: data.content, isLoading: false}));
  }


  render() {
    const {users, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const userList = users.map(user => {

      return <tr key={user.id}>
        <td style={{whiteSpace: 'nowrap'}}>{user.firstName}</td>
        <td style={{whiteSpace: 'nowrap'}}>{user.lastName}</td>
        <td style={{whiteSpace: 'nowrap'}}>{user.userName}</td>
        <td style={{whiteSpace: 'nowrap'}}>{user.roles.length}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/management/users/" + user.id + "/edit"}>Edit User</Button>
            <Button size="sm" color="danger" tag={Link} to={"/management/users/" + user.id + "/roles"}>Edit Roles</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        

        <Container fluid>
        <div className="float-right">
          <Button color="success" tag={Link} to="/management/users/new">Create User</Button>
        </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">First Name</th>
              <th width="10%">Last Name</th>
              <th width="10%">Email</th>
              <th width="10%">Roles</th>
            </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
        </Container>

        
      </div>
    );
  }
}

export default UserList;
