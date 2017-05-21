//Zxcvbn
import zxcvbn from 'zxcvbn';
// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { evaluate } from '../../actions/databaseActions';
// React components
import CircularProgress from 'material-ui/CircularProgress';
import Database from './database';

@connect((store) => {
    return {
        theme: store.state.theme,
        securityScore: store.database.securityScore,
    };
})

/**
* Dashboard page of the application
* The user is presented with a circular-progress-bar, which represents the current
* state of the securityScore.
* If there are entries that have issues (weak passwords), they are listed using
* the List component.
*/

export default class Dashboard extends React.Component {
    //before the Dashboard is rendered, the database is re-evaluated
    componentWillMount(){
        this.props.dispatch(evaluate());
    }

    render(){
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1, width: '100%', height: 200, position: 'relative'}}>
                        <CircularProgress
                            mode="determinate"
                            value={this.props.securityScore.score}
                            min={0}
                            max={1}
                            size={200}
                            thickness={5}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        />
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 20,
                                fontStyle: 'italic',
                                color: this.props.theme.palette.disabledColor,
                            }}
                            >
                                <p>
                                    {'Score: ' +(this.props.securityScore.score * 100).toFixed().toString() + '%'}
                                </p>
                            </div>
                        </div>
                        <div style={{flex: 1}}>
                            <h1>Welcome!</h1>
                            To the left you see your current security score. It
                            tells you how safe your current passwords are. In order
                            to improve your security score, check the list of
                            issues below.
                            <h4>Having trouble creating a new password?</h4>
                            Let us do the thinking for you by generating a new
                            password - thanks to your passwordmanager you won't have
                            to remember your old one!
                        </div>
                </div>
                {this.props.securityScore.count > 0 &&
                    <div style={{borderTop: 'solid 1px gray', marginTop: 20, paddingTop: 20}}>
                        <Database onlyShowBadLogins={true} />
                    </div>
                }
            </div>

        );
    }
}
