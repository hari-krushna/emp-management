import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import LoginForm from './components/LoginForm'

class App extends Component {
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyBPXKJ3SkOpzx3S85qoOO4J2a4JoOexM58",
            authDomain: "manager-bbc56.firebaseapp.com",
            databaseURL: "https://manager-bbc56.firebaseio.com",
            projectId: "manager-bbc56",
            storageBucket: "",
            messagingSenderId: "820911494541"
        };
        firebase.initializeApp(config);
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;