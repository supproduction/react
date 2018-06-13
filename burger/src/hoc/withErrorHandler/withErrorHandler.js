import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        let test = {...error};
        console.log(test);
        // console.log(Object.keys(error));
        // console.log(error.map(i => {
        //   console.log(i);
        //   return i
        // }));
        this.setState({error: 'Error'})
      });
    }

    errorConfirmedHandler = () => {
      console.log(1214);
      this.setState({error: null})
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
                 clicked={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;