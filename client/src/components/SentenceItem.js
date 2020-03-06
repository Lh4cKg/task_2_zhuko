import React, { Component } from 'react';
import {Link} from "react-router-dom";

class SentenceItem extends Component {
    render() {
        return (
            <li>
                <Link to={`/sentence/${this.props.sentence.id}/similars`}>{this.props.sentence.body}</Link>
            </li>
        )
    }
}

export default SentenceItem;
