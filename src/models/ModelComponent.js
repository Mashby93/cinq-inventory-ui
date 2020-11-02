import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ModelComponent extends Component {

  model = {
    modelNumber: '',
    color: '',
    description: '',
    metaData: {
      checkList: {
        items: []
      }
    }
  };

}

export default ModelComponent
