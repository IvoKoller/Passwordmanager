// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { setTheme } from '../../actions/stateActions';
// React components
import lightTheme from '../../themes/lightTheme';
import darkTheme from '../../themes/darkTheme';
import Toggle from 'material-ui/Toggle';

@connect((store) => {
    return {
        darkTheme: store.state.darkTheme,
    };
})

/**
* This component that handles the settings page.
* At this point in time, only the theme can be changed, this may change in the
* future. As there are no 'important' changes to be made, the settings are not
* persistent. Also this may change in the future.
*/

export default class Settings extends React.Component {

    constructor(props){
        super(props);
        this.setTheme = this.setTheme.bind(this);
    }

    //callback for dark-theme-toggle
    setTheme(event, bool){
        if(bool) this.props.dispatch(setTheme(darkTheme, bool));
        else this.props.dispatch(setTheme(lightTheme, bool));
    }

    render(){
        return (
                <div>
                    <Toggle
                        label="Dark Theme"
                        toggled={this.props.darkTheme}
                        onToggle={this.setTheme}
                    />
                </div>
        );
    }
}
