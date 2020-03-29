import React from 'react';
import './App.scss';
import Table from './components/Table'
import { Provider } from 'react-redux';
import ClientStore from './components/ReduxStore/ClientStore';
import { hot } from 'react-hot-loader/root';


class App extends React.Component {

    render() {


        return (
            <Provider store={ClientStore}>
                <Table />
            </Provider>

        );
    }

}

//export default connect(mapStateToProps, {setRoom}) (App)
export default hot(App)
