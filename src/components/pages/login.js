import { setMasterPassword, verifyPassword } from '../../crypto';
// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { login } from '../../actions/stateActions';
import { load } from '../../actions/databaseActions';
// React components
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { red500, } from 'material-ui/styles/colors';
import { ShakeHorizontal } from 'reshake'; //handles shake-animation

@connect((store) => {
    return {
        theme: store.state.theme,
        hashedMasterPassword: store.state.hashedMasterPassword,
    }
})

/**
* This is the login that is shown once the program is setup and a master password
* has been defined. It simply consists of a textfield and a submit button.
* Once the user clicks on the submit button, the value of the textfield is hashed and
* compared to the hashed Master Password. If they are the same, the login state
* changes to true, the database gets decrypted using the user-submitted master
* password and the user can access the database.
* If they are different, the lock-icon turns red and shakes horizontally in order
* to indicate that the login has failed.
*/

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            masterPassword: '',
            shaking: false,
        }
        this.changePassword = this.changePassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    //callback for master password textfield
    changePassword(event, masterPassword){
        this.setState({masterPassword});
        this.setState({shaking: false});
    }

    //callback for submit button
    submit(){
        var that = this;
        verifyPassword(this.state.masterPassword, this.props.hashedMasterPassword, (err, verified)=>{
            if(verified){
                console.log('correct password')
                setMasterPassword(this.state.masterPassword);
                this.props.dispatch(load());
            } else {
                console.log('false')
                this.setState({shaking: true});
            }
        });
    }

    render() {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                background: this.props.theme.palette.primary1Color,
            }}>
                <Paper style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    height: 'auto',
                    width: 500,
                    padding: 20,
                }}>
                    <ShakeHorizontal style={{marginTop: 10}} trigger={!this.state.shaking && 'someString'} q={1} fixed={false} freez={false} >
                        <FontIcon style={this.state.shaking && {color: red500}} className='material-icons'>lock_outline</FontIcon>
                    </ShakeHorizontal>
                    <TextField
                        style={{marginLeft: 20, marginRight: 20}}
                        name='login'
                        fullWidth={true}
                        type='password'
                        floatingLabelText="Master Password"
                        value={this.state.masterPassword}
                        onChange={this.changePassword}
                    />
                    <RaisedButton
                        label="Login"
                        primary={true}
                        onTouchTap={this.submit}
                    />
                </Paper>
            </div>
        );
    }
}
