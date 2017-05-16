// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { editing, showSingleEntry } from '../../actions/stateActions';
import { updateActiveEntry } from '../../actions/databaseActions';
// React components
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import PasswordSection from './passwordSection';

@connect((store) => {
    return {
        theme: store.state.theme,
        editing: store.state.editing,
        activeEntry: store.database.activeEntry,
    };
})

/**
* This component handles the representation of the activeEntry. With other words,
* it handles both the representation of existing database entries (when triggered
* by the list-component) and a new ones (when triggered by AddDialog-component).
*/

export default class Entry extends React.Component {

    constructor(props){
        super(props);
        this.changeUrl = this.changeUrl.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.content = this.content.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeNumber = this.changeNumber.bind(this);
        this.changeCCV = this.changeCCV.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeOutgoingMailServer = this.changeOutgoingMailServer.bind(this);
        this.changeIncomingMailServer = this.changeIncomingMailServer.bind(this);
        this.changeServer = this.changeServer.bind(this);
    }

    //callback for title-textfield
    changeTitle(event, title){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                title: title,
            }));
        }
    }

    //callback for type-selectfield
    changeType(event, type){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                type: type,
            }));
        }
    }

    //callback for url-textfield
    changeUrl(event, url){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                url: url,
            }));
        }
    }

    //callback for user-textfield
    changeUser(event, user){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                user: user,
            }));
        }
    }

    //callback for number-textfield
    changeNumber(event, number){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                number: number,
            }));
        }
    }

    //callback for ccv-textfield
    changeCCV(event, ccv){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                ccv: ccv,
            }));
        }
    }
    //callback for date-component
    changeDate(event, date){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                date: date,
            }));
        }
    }

    //callback for title-textfield
    changeOutgoingMailServer(event, oms){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                outgoingMailServer: oms,
            }));
        }
    }

    //callback for incomingMailServer-textfield
    changeIncomingMailServer(event, ims){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                incomingMailServer: ims,
            }));
        }
    }

    //callback for server-selectfield
    changeServer(event, server){
        if(this.props.editing){
            this.props.dispatch(updateActiveEntry({
                ...this.props.activeEntry,
                server: server,
            }));
        }
    }

    /**
    * Function handling the layout of the entry depending on the activeEntry type
    * @returns entry-layout
    */

    content(){
        switch(this.props.activeEntry.type){
            case 1 :
                return (
                <div>
                    <div style={{display: 'flex',  margin: '0 -7px'}}>
                        <div style={{flex: 1, margin: '0 7px'}}>
                            <TextField
                                value={this.props.activeEntry.incomingMailServer}
                                onChange={this.changeIncomingMailServer}
                                floatingLabelText='Incoming Mail Server'
                                fullWidth={true}
                                underlineShow={this.props.editing}
                            /><br />
                            <TextField
                                value={this.props.activeEntry.user}
                                onChange={this.changeUser}
                                floatingLabelText='Username'
                                fullWidth={true}
                                underlineShow={this.props.editing}
                            />
                        </div>
                        <div style={{flex: 1, margin: '0 7px'}}>
                            <TextField
                                value={this.props.activeEntry.outgoingMailServer}
                                onChange={this.changeOutgoingMailServer}
                                floatingLabelText='Outgoing Mail Server'
                                fullWidth={true}
                                underlineShow={this.props.editing}
                            /><br />
                            <SelectField
                                fullWidth={true}
                                onChange={this.changeServer}
                                value={this.props.activeEntry.server}
                                disabled={!this.props.editing} 
                                floatingLabelText="Server Type" >
                                <MenuItem value={0} primaryText="POP" />
                                <MenuItem value={1} primaryText="IMAP" />
                            </SelectField>
                        </div>

                    </div>
                    <PasswordSection />
                </div>
                );

            case 2 :
                return (
                <div >
                    <TextField
                        value={this.props.activeEntry.number}
                        onChange={this.changeNumber}
                        floatingLabelText='Card Number'
                        fullWidth={true}
                        underlineShow={this.props.editing}
                    /><br />
                    <DatePicker
                        value={this.props.activeEntry.date}
                        onChange={this.changeDate}
                        floatingLabelText="Expiration Date"
                        autoOk={true}
                        disabled={!this.props.editing}
                    /><br />
                    <TextField
                        value={this.props.activeEntry.ccv}
                        onChange={this.changeCCV}
                        floatingLabelText='CCV'
                        fullWidth={true}
                        underlineShow={this.props.editing}
                    /><br />
                </div>
                );

            default :
                return (
                <div>
                    <TextField
                        value={this.props.activeEntry.user}
                        onChange={this.changeUser}
                        floatingLabelText='Username'
                        fullWidth={true}
                        underlineShow={this.props.editing}
                    /><br />
                    <TextField
                        value={this.props.activeEntry.url}
                        onChange={this.changeUrl}
                        floatingLabelText='Url'
                        fullWidth={true}
                        underlineShow={this.props.editing}
                    /><br />
                    <PasswordSection />
                </div>
            );
        }
    }

    render(){
        return (
            <div style={{overflow: 'hidden'}}>
                {this.props.editing &&
                    <div style={{display: 'flex',margin: '0 -7px',}}>
                        <SelectField style={{flex: 1, margin: '0 7px'}} value={this.props.activeEntry.type} floatingLabelText="Login Type" onChange={this.changeType}>
                            <MenuItem value={0} primaryText="Login" />
                            <MenuItem value={1} primaryText="Email" />
                            <MenuItem value={2} primaryText="Credit Card" />
                        </SelectField>
                        <TextField
                            style={{flex: 1, margin: '0 7px'}}
                            value={this.props.activeEntry.title}
                            onChange={this.changeTitle}
                            floatingLabelText='Title'
                            fullWidth={true}
                            underlineShow={this.props.editing}
                        />
                    </div>
                }
                {this.content()}
            </div>
        );
    }
}
