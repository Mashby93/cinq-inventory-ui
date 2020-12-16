import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import ChecklistService from '../../../services/ChecklistService';

class CheckListListings extends Component {

  constructor(props) {
    super(props);
    this.state = {checklists: [], isLoading: true};
  }

  componentDidMount() {
    ChecklistService.getAllBulk()
      .then(data => {
        this.setState({checklists: data});
      })
    this.setState({isLoading: false});
  }

  render() {
    const {checklists, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = checklists.map(checklist => {
      return <tr key={checklist.id}>
        <td style={{whiteSpace: 'nowrap'}}>{checklist.id}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/management/checklists/" + checklist.id + "/details"}>View/Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/management/checklists/new">Create Checklist</Button>
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

      </div>
    );
  }
}

export default CheckListListings;
