// React
import React from 'react';
import { connect } from 'react-redux';

/**
*  Component handling the about me page.
*/

@connect((store) => {
    return {
        theme: store.state.theme,
    };
})

export default class About extends React.Component {

    render() {
        return (
            <div>
                <div style={{fontSize: 20, letterSpacing: 4, textAlign: 'center'}}>
                    <i className="fa fa-code"></i><span style={{letterSpacing: 1}}> with </span>
                    <i className="fa fa-heart"></i><span style={{letterSpacing: 1}}> by </span>
                    <a className="js-external-link" style={{color: this.props.theme.palette.textColor}} href="https://github.com/IvoKoller">
                        <i className="fa fa-hand-pointer-o"></i>
                        <i className="fa fa-hand-peace-o"></i>
                        <i className="fa fa-hand-rock-o"></i>
                    </a>
                </div>
            </div>
            );
        }
    }
