import {clipboard} from 'electron';
import zxcvbn from 'zxcvbn';
// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { fetch, insert, remove, setActiveEntry } from '../../actions/databaseActions';
import {
    showDeleteDialog,
    setActivePage,
    editing,
    showSingleEntry,
    setSearchState,
} from '../../actions/stateActions';

// React components
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { grey400, red400 } from 'material-ui/styles/colors';

@connect((store) => {
    return {
        database: store.database.database,
        activeEntry: store.database.activeEntry,
        searchState: store.state.searchState,
        securityScore: store.database.securityScore,
    };
})

/**
* This component lists the entries of the active database. Just like the entry-component
* it is thus multi functional. It serves as the representation of the search-results,
* the bad logins and of course the database itself.
* If no entries are present, a custom message is shown.
* Each entry has a menu which offers the user to edit or delete the entry. Additionaly
* the user can also copy the password. If the user chooses to do this, the password
* is copied into the clipboard. After 10 secondes, the clipboard is cleared.
*/

export default class Database extends React.Component {

    constructor(props){
        super(props);
        this.copyPassword = this.copyPassword.bind(this);
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.content = this.content.bind(this);
    }

    //callback for delete menu item
    delete(event){
        this.props.dispatch(showDeleteDialog(true));
        this.props.dispatch(setSearchState(false));
    }

    //callback for delete menu item
    edit(){
        this.props.dispatch(editing(true));
        this.props.dispatch(showSingleEntry(true));
        this.props.dispatch(setSearchState(false));
    }

    //callback for copy-password menu item
    copyPassword(){
        function wait(ms) { return new Promise(r => setTimeout(r,ms)); }

        async function copy(password){
            clipboard.writeText(password); //copy password to clipboard
            await wait(10000); //start asynchrounous function, 10 second timeout
            clipboard.writeText(''); //clear clipboard
        }

        copy(this.props.activeEntry.password);
    }

    //callback to set active entry
    setActive(id){
        this.props.dispatch(setActiveEntry(id));
    }

    //callback to set active page
    activePage(id){
        this.props.dispatch(setActiveEntry(id)).then((doc)=>{
            this.props.dispatch(showSingleEntry(true));
        })
    }

    content(){
        if(this.props.onlyShowBadLogins && this.props.securityScore.count > 0
            || this.props.database.length > 0){
            return(
                <List>
                    {this.props.onlyShowBadLogins ?
                        this.props.securityScore.entries.map((item, index)=>{
                            return (
                                <ListItem
                                    key={index}
                                    onTouchTap={this.activePage.bind(this, item._id)}
                                    leftAvatar={<Avatar icon={<FontIcon
                                        className={'fa fa-'+item.title.toLowerCase()} />} />}
                                        rightIcon={(zxcvbn(item.password).score < 4 && item.type !== 2) && <FontIcon color={red400} style={{marginRight: 50, }} className='material-icons'>warning</FontIcon> }
                                        rightIconButton={
                                        <IconMenu  iconButtonElement={<IconButton onTouchTap={this.setActive.bind(this, item._id)} ><FontIcon className='material-icons' color={grey400}>more_vert</FontIcon></IconButton>} >
                                            <MenuItem onTouchTap={this.copyPassword}>Copy Password</MenuItem>
                                            <MenuItem onTouchTap={this.edit}>Edit</MenuItem>
                                            <MenuItem onTouchTap={this.delete}>Delete</MenuItem>
                                        </IconMenu>
                                    }
                                    primaryText={item.title}
                                    secondaryText={item.user}
                                />
                            );
                        })
                        :
                        this.props.database.map((item, index)=>{
                            return (
                                <ListItem
                                    key={index}
                                    onTouchTap={this.activePage.bind(this, item._id)}
                                    leftAvatar={<Avatar icon={<FontIcon
                                        className={'fa fa-'+item.title.toLowerCase()} />} />}
                                        rightIcon={(zxcvbn(item.password).score < 4 && item.type !== 2) && <FontIcon color={red400} style={{marginRight: 50, }} className='material-icons'>warning</FontIcon> }
                                        rightIconButton={
                                        <IconMenu  iconButtonElement={<IconButton onTouchTap={this.setActive.bind(this, item._id)} ><FontIcon className='material-icons' color={grey400}>more_vert </FontIcon></IconButton>} >
                                            <MenuItem onTouchTap={this.copyPassword}>Copy Password</MenuItem>
                                            <MenuItem onTouchTap={this.edit}>Edit</MenuItem>
                                            <MenuItem onTouchTap={this.delete}>Delete</MenuItem>
                                        </IconMenu>
                                    }
                                    primaryText={item.title}
                                    secondaryText={item.user}
                                />
                            );
                        })
                    }
                </List>
            );
        } else {
            if (this.props.searchState){
                return <p style={{fontStyle: 'italic', color: 'gray', textAlign: 'center'}}>
                    No matching entries could be found.</p>

            } else {
                return <p style={{fontStyle: 'italic', color: 'gray', textAlign: 'center'}}>
                    You haven't made any entries! Click the red button to add one.</p>
            }
        }
    }

    render(){
        return (
            <div>
                {this.content()}
            </div>
        );
    }
}
