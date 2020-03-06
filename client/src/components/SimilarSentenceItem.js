import React, { Component } from 'react';

class SimilarSentenceItem extends Component {

    render() {
        return (
            <li>
                <div style={{
                    width: "100%",
                    display: "block"
                }}>
                    <p style={{
                        display: "inline-block",
                        padding: "10px",
                        backgroundColor: `rgb(0,${255 * this.props.sentence.similarity},0)`,
                        color: `rgb(${255 * (1 - this.props.sentence.similarity)},${255 * (1 - this.props.sentence.similarity)},${255 * (1 - this.props.sentence.similarity)})`,
                    }}>{this.props.sentence.similarity}</p>
                    <p style={{display: "inline-block", paddingLeft: "10px"}}>{this.props.sentence.body}</p>
                </div>
            </li>
        );
    }
}

export default SimilarSentenceItem;
