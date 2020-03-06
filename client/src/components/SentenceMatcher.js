import React, { Component } from 'react';
import {apiRoot} from "../Config";
import SimilarSentenceItem from "./SimilarSentenceItem";

class SentenceMatcher extends Component {
    state = {
        sentences: [],
        error: false,
        error_message: ""
    }
    componentDidMount() {
        fetch(apiRoot + 'sentences/' + this.props.match.params.id + '/similar')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    sentences: data
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
                    <h3>Similar sentences</h3>
                    <ul style={{
                        listStyle: "none",
                        padding: 0
                    }}>{
                        this.state.sentences.map((sentence) => (
                            <SimilarSentenceItem key={sentence.id}
                                             sentence={sentence}/>
                        ))
                    }</ul>
                </div>
            )
        }
    }
}

export default SentenceMatcher;
