import React, { Component } from 'react';
import SentenceItem from "./SentenceItem";
import { apiRoot } from '../Config';

class Text extends Component {
    state = {
        title: null,
        id: null,
        sentences: [],
        error: false,
        error_message: ""
    }
    componentDidMount() {
        fetch(apiRoot + 'texts/' + this.props.match.params.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    id: data.id,
                    title: data.name,
                    sentences: data.sentences
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
                    <p>
                        <button onClick={() => this.props.history.goBack()}>Back</button>
                    </p>
                    <h3>{this.state.title}</h3>
                    <ul>{
                        this.state.sentences.map((sentence) => (
                            <SentenceItem key={sentence.id}
                                          sentence={sentence}/>
                        ))
                    }</ul>
                </div>
            )
        }
    }
}

export default Text;
