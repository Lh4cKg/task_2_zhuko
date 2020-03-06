import React, { Component } from 'react';
import TextItem from "./TextItem";
import { apiRoot } from '../Config';
import {Link} from "react-router-dom";

class Texts extends Component {
    state = {
        texts: [],
        next: false,
        previous: false,
        count: 0,
        error: false,
        error_message: ""
    }

    componentDidMount() {
        fetch(apiRoot + 'texts/')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    texts: data.results,
                    count: data.count,
                    next: data.next != null,
                    previous: data.previous != null,
                })
            })
            .catch(err => {
                this.setState({
                    error: true,
                    error_message: err.toString()
                })
            })
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <p>{this.state.error_message}</p>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/text">Create a new text</Link>
                    <hr/>
                    {this.state.texts.map((text) => (
                        <TextItem key={text.id} text={text}/>
                    ))}
                </div>
            )
        }
    }
}

export default Texts;
