import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {apiRoot} from "../Config";

class CreateText extends Component {
    state = {
        redirect: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        fetch(apiRoot + 'texts/', {
            method: 'POST',
            body: data
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
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Title" required
                       style={{minWidth: "400px", marginBottom: "5px"}}/><br/>
                <textarea name="text" required style={{
                    minHeight: "200px",
                    minWidth: "400px"
                }}/><br/>
                <input type="submit"/>
            </form>
        )
    }
}

export default CreateText;
