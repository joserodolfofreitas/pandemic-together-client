import React from 'react';
import './App.scss';
import Table from './components/Table'
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import store from './components/redux/store';
import { hot } from 'react-hot-loader/root';


class App extends React.Component {
    render() {
        return (
            <DndProvider backend={Backend}>
                <Provider store={store}>
                    <Table />
                </Provider>
            </DndProvider>
        );
    }

}

//export default connect(mapStateToProps, {setRoom}) (App)
export default hot(App)
