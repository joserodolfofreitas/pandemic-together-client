import React from 'react';
import './App.css';
import Table from './components/Table'
import { Provider } from 'react-redux';
import ClientStore from './components/ReduxStore/ClientStore';


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
export default App
