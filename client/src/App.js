import React, {Component} from 'react';
import {
    Route,
    BrowserRouter,
    Switch,
    Redirect
} from "react-router-dom";
import NotFoundPage from "./pages/404";
import MainPage from "./pages";
import Text from "./components/Text";
import SentenceMatcher from "./components/SentenceMatcher";
import CreateText from "./components/CreateText";
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/404" component={NotFoundPage}/>
                    <Route exact path="/text/:id" component={Text}/>
                    <Route exact path="/sentence/:id/similars" component={SentenceMatcher}/>
                    <Route exact path="/text" component={CreateText}/>
                    <Redirect to="/404"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
