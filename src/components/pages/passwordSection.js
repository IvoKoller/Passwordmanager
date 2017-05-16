import zxcvbn from 'zxcvbn';
import {generatePassword} from '../../crypto';
import {clipboard} from 'electron';
// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { editing, showSingleEntry, showDeleteDialog, capslock } from '../../actions/stateActions';
import { updateActiveEntry } from '../../actions/databaseActions';
// React components
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';
import FontIcon from 'material-ui/FontIcon';
import CapsLock from 'material-ui/svg-icons/hardware/keyboard-capslock';

import { red500, deepOrange500, orange500, green500, lightGreen500 } from 'material-ui/styles/colors';

@connect((store) => {
    return {
        theme: store.state.theme,
        editing: store.state.editing,
        activeEntry: store.database.activeEntry,
        capslock: store.state.capslock,
    };
})

/**
* This component handles the password section of the entry. It evaluates and gives
* feedback to the password entered. The visibility of the password can be turned
* on or off.
* If the application is in editing mode, the user can change the password.
* If the user enters a password, it is checked wheter or not capslock is activated and
* how strong the entered password is. Additionaly, the user has the option to paste a
* password from the clipboard and enter it automatically using a paste button. The
* application also offers to generate a random password. If the user wants to,
* he/she can define the exact number of letters, symbols etc. the generator should
* output (some websites are picky..). If the editing mode is deactivated,
* the user can copy the password to the clipboard.
*/

export default class PasswordSection extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            showPassword: false,
            passwordEval: zxcvbn(this.props.activeEntry.password),
            //default values for password generator
            lowercaseLetters: 4,
            uppercaseLetters: 4,
            digits: 4,
            special: 2,
        }
        this.changePassword = this.changePassword.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.showOptional = this.showOptional.bind(this);
        this.capslock = this.capslock.bind(this);
        this.copyPassword = this.copyPassword.bind(this);
        this.pastePassword = this.pastePassword.bind(this);
        this.genPassword = this.genPassword.bind(this);
        this.handleFirstSlider = this.handleFirstSlider.bind(this);
        this.handleSecondSlider = this.handleSecondSlider.bind(this);
        this.handleThirdSlider = this.handleThirdSlider.bind(this);
        this.handleFourthSlider = this.handleFourthSlider.bind(this);
    }

    componentWillMount(){
        //set capslock callback
        document.addEventListener( 'keydown', this.capslock);
    }

    //capslock callback
    capslock(event){
        this.props.dispatch(capslock(event.getModifierState('CapsLock')));
    }

    //callback if password is changed
    changePassword(event, password){
        this.setState({ passwordEval: zxcvbn(password)});
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                password: password,
            }));
        }
    }

    //callback for copy-password button
    copyPassword(){
        function wait(ms) { return new Promise(r => setTimeout(r,ms)); }

        async function copy(password){
            clipboard.writeText(password); //copy password to clipboard
            await wait(10000); //start asynchrounous function, 10 second timeout
            clipboard.writeText(''); //clear clipboard
        }

        copy(this.props.activeEntry.password);
    }

    //callback for paste-password button
    pastePassword(){
        this.changePassword({}, clipboard.readText());
    }

    //callback for generate-password button
    genPassword(){
        //generate password using the parameters set by user (if unchanged, default values)
        this.changePassword({}, generatePassword(
            this.state.lowercaseLetters,
            this.state.uppercaseLetters,
            this.state.digits,
            this.state.special,
        ));
    }

    //callback for password-visibility toggle
    showPassword(event, showPassword){ this.setState({showPassword}); }

    //callback for optional settings toggle
    showOptional(){ this.setState({optional: !this.state.optional })}

    //handlers for sliders
    handleFirstSlider(event, value){ this.setState({lowercaseLetters: value}); }
    handleSecondSlider(event, value){ this.setState({uppercaseLetters: value}); }
    handleThirdSlider(event, value){ this.setState({digits: value}); }
    handleFourthSlider(event, value){ this.setState({special: value}); }

    render(){
        const faces = ['sentiment_very_dissatisfied', 'sentiment_dissatisfied',
            'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_satisfied'];
        const colors = [red500, deepOrange500, orange500, green500, lightGreen500];
        const strength = ['very weak', 'weak', 'not bad', 'good', 'very good'];

        return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1, marginRight: 7,}}>
                    <TextField
                        value={this.props.activeEntry.password}
                        onChange={this.changePassword}
                        floatingLabelText='Password'
                        underlineShow={this.props.editing}
                        type={this.state.showPassword ? 'text' : 'password' }
                        fullWidth={true}
                    />
                    {this.props.capslock && <CapsLock color={this.props.theme.palette.primary1Color} style={{marginLeft: -30, alignSelf: 'center'}} />}
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-right'}}>
                    <Checkbox
                        style={{width: 30, alignSelf: 'center'}}
                        onCheck={this.showPassword}
                        checkedIcon={<FontIcon className='material-icons'>visibility</FontIcon>}
                        uncheckedIcon={<FontIcon className='material-icons'>visibility_off</FontIcon>}
                    />
                    {this.props.editing ?
                    <IconButton onTouchTap={this.pastePassword} style={{alignSelf: 'center'}} >{<FontIcon className="material-icons">content_paste</FontIcon>}</IconButton>
                    : <IconButton onTouchTap={this.copyPassword} style={{alignSelf: 'center'}} >{<FontIcon className="material-icons">content_copy</FontIcon>}</IconButton>}
                    {this.props.editing &&
                        <IconButton tooltip="Generate Password" onTouchTap={this.genPassword} style={{alignSelf: 'center'}} >
                            {<FontIcon className="material-icons">refresh</FontIcon>}
                        </IconButton>
                    }
                    {this.props.editing &&
                        <Checkbox
                            style={{alignSelf: 'center', marginLeft: 10}}
                            onCheck={this.showOptional}
                            checkedIcon={<FontIcon className="material-icons">keyboard_arrow_up</FontIcon>}
                            uncheckedIcon={<FontIcon className="material-icons">keyboard_arrow_down</FontIcon>}
                        />
                    }
                </div>
            </div>
            {/* sliders */}
            {this.state.optional &&
                <div style={{display: 'flex', margin: '0 -7px', marginTop: 15}}>
                    <div style={{flex: 1, margin: '0 7px'}}>
                        <div>
                            <span style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>Digits: {this.state.digits}</span>
                            <Slider min={0} max={10} step={1} defaultValue={4} style={{height: 30}}
                                value={this.state.digits} onChange={this.handleThirdSlider} />
                        </div>
                        <div>
                            <span style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>Special letters: {this.state.special}</span>
                            <Slider min={0} max={10} step={1} defaultValue={4} style={{height: 30}}
                                value={this.state.special} onChange={this.handleFourthSlider} />
                        </div>
                    </div>
                    <div style={{flex: 1, margin: '0 7px'}}>
                        <div>
                            <span style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>Lowercase letters: {this.state.lowercaseLetters}</span>
                            <Slider min={0} max={10} step={1} defaultValue={4}  style={{height: 30}}
                                value={this.state.lowercaseLetters} onChange={this.handleFirstSlider} />
                        </div>
                        <div>
                            <span style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>Uppercase letters: {this.state.uppercaseLetters}</span>
                            <Slider min={0} max={10} step={1} defaultValue={4} style={{height: 30}}
                                value={this.state.uppercaseLetters} onChange={this.handleSecondSlider}/>
                        </div>
                    </div>
                </div>
            }
            {/* feedback */}
            <div style={{display: 'flex', margin: '0 -7px'  }}>
                <div style={{flex: 1, margin: '0 7px'}}>
                    <div>
                        <p style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>
                            Feedback:
                        </p>
                        <p> {this.state.passwordEval.feedback.warning || 'none'} </p>
                    </div>
                    <div>
                        <p style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>
                            Suggestions:
                        </p>
                        <p> {this.state.passwordEval.feedback.suggestions == '' ? 'none'
                                : this.state.passwordEval.feedback.suggestions } </p>
                    </div>
                </div>
                <div style={{flex: 1, margin: '0 7px'}}>
                    <div>
                        <p style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>
                            Crack Time:
                        </p>
                        <p> {this.state.passwordEval.crack_times_display.offline_slow_hashing_1e4_per_second} </p>
                    </div>
                    <div>
                        <p style={{fontSize: 13, color: this.props.theme.palette.disabledColor}}>
                            Strength:
                        </p>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{color: colors[this.state.passwordEval.score]}}> {strength[this.state.passwordEval.score]}</span>
                            <FontIcon style={{marginLeft: 10}} color={colors[this.state.passwordEval.score]} className='material-icons'>{faces[this.state.passwordEval.score]}</FontIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
