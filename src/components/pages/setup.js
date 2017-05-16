//Electron
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
//Crypto
import { hashPassword } from '../../crypto';
import zxcvbn from 'zxcvbn';
// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { setHashedMasterPassword } from '../../actions/stateActions';
// React components
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
// - Colors
import { blueGrey900, red500, deepOrange500, orange500, green500, lightGreen500,
         amber400, amber600, blue300, blue600, red400, red600 } from 'material-ui/styles/colors'
// - Carousel component
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';

@connect((store) => {
    return {
        theme: store.state.theme,
        masterPassword: store.state.masterPassword,
    }
})

/**
* Should the application start for the first time/ the 'config.json' file be deleted,
* the application starts in a setup mode. The setup component shows a carousel,
* showing off some of the features teh passwordmanager has to offer. If the user
* clicks on the 'get started' button, they are taken to the setup screen, where
* they have to define a new master password. If the defined master password
* is secure enough (scores 4 in the Zxcvbn test) and has been entered two identical
*  times by the user, the password gets hashed and written into the 'config.json' file.
*/

export default class Setup extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            firstPassword: '',
            secondPassword: '',
            passwordEval: zxcvbn(''),
            equal: true,
            start: false,
        }
        this.changeFirstPassword = this.changeFirstPassword.bind(this);
        this.changeSecondPassword = this.changeSecondPassword.bind(this);
        this.submit = this.submit.bind(this);
        this.onStart = this.onStart.bind(this);
    }

    //callback for first textfield
    changeFirstPassword(event, password){
        this.setState({
            firstPassword: password,
            passwordEval: zxcvbn(password),
            equal: this.state.secondPassword == password ? true : false,
        });
    }

    //callback for second textfield
    changeSecondPassword(event, password){
        this.setState({
            secondPassword: password,
            equal: this.state.firstPassword == password ? true : false,
        });
    }

    //on submit,
    submit(){
        const app = remote.app;
        const appDir = jetpack.cwd(app.getAppPath());
        //hash password,
        hashPassword(this.state.firstPassword, (err, masterPassword)=>{
            //write to 'config.json'
            appDir.write('app/config.json', { masterPassword })
            //set in redux store
            this.props.dispatch(setHashedMasterPassword(masterPassword));
        });

    }

    //callback for 'get started' button, start setup process
    onStart(){
        this.setState({start: true});
    }

    render() {
        const faces = ['sentiment_very_dissatisfied', 'sentiment_dissatisfied',
            'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_satisfied'];
        const colors = [red500, deepOrange500, orange500, green500, lightGreen500];
        const strength = ['very weak', 'weak', 'not bad', 'good', 'very good'];

        const carousel = (<div>
              <AutoRotatingCarousel
                label="Get started"
                open
                interval={5000}
                landscape={true}
                mobile={true}
                onStart={this.onStart}
              >
                <Slide
                  media={<img src="img/forget.svg" />}
                  mediaStyle={{width: '50%', margin: '0 auto'}}
                  mediaBackgroundStyle={{ backgroundColor: red400 }}
                  contentStyle={{ backgroundColor: red600 }}
                  title="Sick of forgetting your passwords?"
                  subtitle="From now on you just have to remember one."
                />
                <Slide
                  media={<img src="img/generate.svg" />}
                  mediaStyle={{width: '50%', margin: '0 auto'}}
                  mediaBackgroundStyle={{ backgroundColor: amber400 }}
                  contentStyle={{ backgroundColor: amber600 }}
                  title="Auto-generated Passwords"
                  subtitle="Why come up with new passwords? Let your computer do the work for you!"
                />
                <Slide
                  media={<img src="img/secure.svg" />}
                  mediaStyle={{width: '50%', margin: '0 auto'}}
                  mediaBackgroundStyle={{ backgroundColor: blue300 }}
                  contentStyle={{ backgroundColor: blue600 }}
                  title="Military-grade Encryption"
                  subtitle="All passwords are encrypted using AES-256."
                />
              </AutoRotatingCarousel>
            </div>)

        const start = (<div style={{
                flex: 1,
                display: 'flex',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                background: blueGrey900,
            }}>
                <div style={{
                    height: '100%',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img style={{width: '50%'}} src='img/start.svg'></img>
                </div>
                <div style={{
                    flex: 1,
                    overflowY: 'scroll',
                }}>
                        <AppBar style={{position: 'fixed'}} showMenuIconButton={false} title='Create Master Password' />
                    <Paper style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex',
                        height: '100%',
                        padding: 20,
                        paddingTop: 90,
                    }}>
                        <span>Please choose your Master Password - the last one
                            that you'll have to remember. We reccomend creating a password
                            by chaining together a bunch of uncommon words. No need for
                            symbols, digits, numbers or uppercase letters.
                        </span>
                        <TextField
                            style={{marginLeft: 20, marginRight: 20}}
                            name='login'
                            fullWidth={true}
                            type='password'
                            floatingLabelText="Master Password"
                            value={this.state.firstPassword}
                            onChange={this.changeFirstPassword}
                        />
                        <TextField
                            style={{marginLeft: 20, marginRight: 20}}
                            name='firstPassword'
                            fullWidth={true}
                            type='password'
                            errorText={!this.state.equal ? 'Passwords are not equal' : ''}
                            floatingLabelText="Repeat Password"
                            value={this.state.secondPassword}
                            onChange={this.changeSecondPassword}
                        />
                        <div style={{display: 'flex', width: '100%', margin: '0 -7px', marginTop: 10}}>
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
                        <span style={{margin: 10, marginBottom: 20}}>
                            <strong>Attention:</strong> You <strong>must</strong> remember you password.
                            If you forget your Master Password, it <strong>cannot</strong> be reset.
                            Without it, your data is <strong>impossible</strong> to retrieve.
                        </span>
                        {
                            (this.state.equal && this.state.passwordEval.score == 4) ?
                                <RaisedButton
                                    label="Login"
                                    primary={true}
                                    onTouchTap={this.submit}
                                />
                            :
                                <RaisedButton
                                    label="Login"
                                    primary={true}
                                    disabled={true}
                                    onTouchTap={this.submit}
                                />
                        }
                    </Paper>
                </div>
            </div>)
        return (this.state.start ? start : carousel);
    }
}
