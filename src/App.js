import React from 'react';
import './App.scss';
import Main from './components/Main'
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import store from './components/redux/store';
import { hot } from 'react-hot-loader/root';


class App extends React.Component {
    render() {
        return (
            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <Provider store={store}>
                    <Main />
                </Provider>
            </DndProvider>
        );
    }

}

//export default connect(mapStateToProps, {setRoom}) (App)
export default hot(App)
