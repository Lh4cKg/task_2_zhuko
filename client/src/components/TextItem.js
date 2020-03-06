import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {apiRoot} from "../Config";

class TextItem extends Component {
    state = {
        redirect: false
    }
    deleteText = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-text-id');
        fetch(`${apiRoot}texts/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    this.setState({redirect: true});
                }
            });
    }
    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <Link to={`/text/${this.props.text.id}`}>{this.props.text.name}</Link>
                <button data-text-id={this.props.text.id} onClick={this.deleteText} style={{marginLeft: "10px", backgroundColor: "red"}}>Delete</button>
            </div>
        );
    }
}

export default TextItem;
