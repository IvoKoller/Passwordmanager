// Electron
const { BrowserWindow } = require('electron').remote;
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import { fetch, update, updateActiveEntry, evaluate } from '../actions/databaseActions';
import {
        setActivePage,
        setSearchQuery,
        setSearchState,
        showSingleEntry,
        editing,
        showDeleteDialog,
        setHashedMasterPassword,
        showNewDialog } from '../actions/stateActions';

// React components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
// - Svg Icons
import FontIcon from 'material-ui/FontIcon'
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import AddIcon from 'material-ui/svg-icons/content/add';
// - Pages
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import Database from './pages/database';
import Entry from './pages/entry';
import About from './pages/about';
import Login from './pages/login';
import Setup from './pages/setup';
// - Dialogs
import { DeleteDialog, AddDialog } from './dialogs';

@connect((store) => {
    return {
        theme: store.state.theme,
        activePage: store.state.activePage,
        activeEntry: store.database.activeEntry,
        newActiveEntry: store.state.newActiveEntry,
        showSingleEntry: store.state.showSingleEntry,
        searchQuery: store.state.searchQuery,
        searchState: store.state.searchState,
        securityScore: store.database.securityScore,
        editing: store.state.editing,
        badLogins: store.state.badLogins,
        loaded: store.database.loaded,
        hashedMasterPassword: store.state.hashedMasterPassword,
    };
})


/**
* This is the central component that handles the different application states.
* Once the application starts, it checks wheter or not a config file exists.
* If there doesn't exist one, the application starts the setup page.
* Once a master password has been defined by the user, the layout then switches to
* the login page where the user is asked to (re-)enter their password. If this
* happens successfully, the layout then switches to the standard application layout
* featuring a side- and app-bar with a search field. The user is now able to navigate
* between the different pages, creating, editing and deleting database entries.
*/

export default class Layout extends React.Component {

    constructor(props){
        super(props);
        this.activePage = this.activePage.bind(this);
        this.back = this.back.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.resetSearchQuery = this.resetSearchQuery.bind(this);
        this.content = this.content.bind(this);
    }

    //check on application start if config-file exists
    componentWillMount(){
        const app = remote.app;
        const appDir = jetpack.cwd(app.getAppPath());
        const config = appDir.read('app/config.json', 'json');
        if(config !== undefined){ //check if file exists, if it does, set hashed Master Password
            this.props.dispatch(setHashedMasterPassword(new Buffer(config.masterPassword)));
        }
    }

    //function that sets the active page
    activePage(event,item,index){
        if(index > 0)
            this.props.dispatch(fetch({type: index-1}));
        this.props.dispatch(setActivePage(index, item.props.primaryText));
        this.props.dispatch(showSingleEntry(false));
        this.props.dispatch(setSearchState(false));
    }

    //callback for floating action button.
    add(){
        this.props.dispatch(showSingleEntry(false));
        this.props.dispatch(setSearchState(false));
        //reset active entry
        this.props.dispatch(updateActiveEntry({
            url: '',
            user: '',
            password: '',
            title: '',
            type: 0,
            server: null,
        }));
        //show add dialog
        this.props.dispatch(showNewDialog(true));
        this.props.dispatch(editing(true));
    }

    //callback for back-arrow button
    back(){
        this.props.dispatch(fetch({type: this.props.activePage.index-1}))
        this.props.dispatch(showSingleEntry(false));
        this.props.dispatch(editing(false));
    }

    //callback for search function
    changeSearch(event, query){
        if(this.props.searchState){
            this.props.dispatch(setSearchQuery(query));
            this.props.dispatch(fetch({type: this.props.activePage.index-1, title: new RegExp(query,'i')})); //i flag so it is case-insensetive
        }
    }

    //callback for close button
    close(){
        //close window
        BrowserWindow.getFocusedWindow().close();
    }

    //callback if menu item is clicked
    page(){
        if(this.props.showSingleEntry) return <Entry />
        else {
            //depending on active page index, certain components are shown
            switch(this.props.activePage.index){
                case 0: return <Dashboard />
                case 1: return <Database />
                case 2: return <Database />
                case 3: return <Database />
                case 4: return <Settings />
                case 5: return <About />
            }
        }
    }

    //callback for delete button in app bar
    delete(){
        this.props.dispatch(showDeleteDialog(true));
    }

    //callback for edit button in app bar
    edit(){
        this.props.dispatch(editing(true));
        this.props.dispatch(showSingleEntry(true));
    }

    //callback for save button in app bar
    save(){
        let {_id, ...entry} = this.props.activeEntry;
        this.props.dispatch(update(_id, entry));
        this.props.dispatch(editing(false));
        this.props.dispatch(evaluate());
    }

    //callback for search button
    search(search){
        this.props.dispatch(setSearchState(search));
        if(!search)
            this.props.dispatch(fetch({type: this.props.activePage.index-1}));
    }

    //callback for maximize button
    maximize(){
        //if window is maximized, unmaximize, if not maximize
        if(BrowserWindow.getFocusedWindow().isMaximized())
            BrowserWindow.getFocusedWindow().unmaximize();
        else BrowserWindow.getFocusedWindow().maximize();
    }

    //callback for minimize button
    minimize(){
        //minimize window
        BrowserWindow.getFocusedWindow().minimize();
    }

    //layout of the buttons on the right hand side of the app bar
    rightIcon(){
        if(this.props.showSingleEntry){
            if(!this.props.editing) return <IconButton onTouchTap={this.edit}><FontIcon className='material-icons'>edit</FontIcon></IconButton>
            else return (
                    <div>
                        <IconButton onTouchTap={this.delete}><FontIcon color={this.props.theme.palette.alternateTextColor} className='material-icons'>delete</FontIcon></IconButton>
                        <IconButton onTouchTap={this.save}><FontIcon color={this.props.theme.palette.alternateTextColor} className='material-icons'>save</FontIcon></IconButton>
                    </div>
                );
        } else {
            if( 0 < this.props.activePage.index && this.props.activePage.index < 4){
                return (
                    <IconButton onTouchTap={this.search.bind(this, true)}><FontIcon className='material-icons'>search</FontIcon></IconButton>
                );
            }
        }
    }

    //callback for the reset button of the search bar
    resetSearchQuery(){
        this.props.dispatch(setSearchQuery(''));
        this.props.dispatch(fetch({type: this.props.activePage.index-1}));
    }


    content(){
        if(!this.props.loaded){ //check if database is loaded (user is logged in)
            if(this.props.hashedMasterPassword == null) return <Setup /> //if config file couldn't be found, start setup process
            else return <Login /> //if hashedMasterPassword present, show login
        } else{ //if logged in, show layout
            return(
                <Paper style={{flex: 1, display: 'flex', height: '100%',flexDirection: 'row'}} rounded={false}>
                    <Paper rounded={false} style={{zIndex: 1}}>
                        <div style={{height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <FontIcon className='material-icons' style={{color: this.props.theme.palette.alternateTextColor, borderRadius: 50,  background: this.props.theme.palette.primary1Color,  padding: 10, fontSize: 70, }}>lock</FontIcon>
                        </div>
                        <Menu disableAutoFocus={true} onItemTouchTap={this.activePage} >
                            <MenuItem primaryText='Dashboard' leftIcon={<FontIcon className='material-icons'>dashboard</FontIcon>} rightIcon={
                                (this.props.securityScore.count > 0) && <Badge badgeContent={this.props.securityScore.count} secondary={true} /> //display number of issues in badge
                            } />
                            <MenuItem primaryText='Logins' leftIcon={<FontIcon className='material-icons'>lock_outline</FontIcon>} />
                            <MenuItem primaryText='Email Accounts' leftIcon={<FontIcon className='material-icons'>mail_outline</FontIcon>} />
                            <MenuItem primaryText='Credit Cards' leftIcon={<FontIcon className='material-icons'>credit_card</FontIcon>} />
                            <MenuItem primaryText='Settings' leftIcon={<FontIcon className='material-icons'>settings</FontIcon>} />
                            <MenuItem primaryText='About' leftIcon={<FontIcon className="material-icons">face</FontIcon>} />
                        </Menu>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                            <FloatingActionButton onTouchTap={this.add} secondary={true} style={{position: 'relative', left: 25}}>
                                <FontIcon className='material-icons'>add</FontIcon>
                            </FloatingActionButton>
                        </div>
                    </Paper>
                    <div style={{flex: 1, flexDirection: 'column', display: 'flex'}}>
                        { this.props.searchState ?
                            <Paper style={{zIndex: 1, padding: 10, paddingTop: 6, display: 'flex'}}  >
                                <IconButton onTouchTap={this.search.bind(this, false)}><FontIcon className='material-icons'>arrow_back</FontIcon></IconButton>
                                <TextField
                                    value={this.props.searchQuery}
                                    onChange={this.changeSearch}
                                    ref={(input)=>{input && input.focus()}}
                                    style={{marginLeft: 20, marginRight: 20}}
                                    fullWidth={true}
                                    name='searchfield'
                                />
                                {(this.props.searchQuery !== '') && <IconButton onTouchTap={this.resetSearchQuery}><FontIcon className='material-icons'>close</FontIcon></IconButton>}
                            </Paper>
                            :
                            <AppBar
                                iconElementLeft={this.props.showSingleEntry ?
                                    <IconButton onTouchTap={this.back}><FontIcon className='material-icons'>arrow_back</FontIcon></IconButton>
                                    : null}
                                showMenuIconButton={this.props.showSingleEntry}
                                iconElementRight={this.rightIcon()}
                                title={<span>{
                                    this.props.showSingleEntry ?
                                    this.props.activeEntry.title :
                                    this.props.activePage.title
                                }</span>}
                            />
                        }
                        <div style={{flex: 1, padding: 20, overflowY: 'scroll', background: this.props.theme.palette.secondaryCanvasColor }}>
                            <Paper style={{padding: 20}}>
                                {this.page()}
                            </Paper>
                        </div>
                    </div>
                </Paper>
            )
        }
    }

    render() {
        const styles =   {
            smallIcon: {
                width: 20,
                height: 20,
                color: this.props.theme.palette.alternateTextColor,
            },
            small: {
                width: 30,
                height: 30,
                padding: 5,
                WebkitAppRegion: 'no-drag',
            },
        }
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(this.props.theme)}>
            {/* Top bar, always present, makes window dragable even if covered */}
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <div style={{
                    height: 30,
                    WebkitAppRegion: 'drag', //make window dragable
                    backgroundColor: this.props.theme.palette.primary2Color,
                    display: 'flex',
                    justifyContent: 'flex-end',
                }} >
                    <IconButton
                        iconStyle={styles.smallIcon}
                        style={styles.small}
                        onTouchTap={this.minimize}><RemoveIcon /></IconButton>
                    <IconButton
                        iconStyle={styles.smallIcon}
                        style={styles.small}
                        onTouchTap={this.maximize}><AddIcon/></IconButton>
                    <IconButton
                        iconStyle={styles.smallIcon}
                        style={styles.small}
                        onTouchTap={this.close}><CloseIcon/></IconButton>
                </div>
                    {this.content()}
                    <DeleteDialog />
                    <AddDialog />
            </div>
        </MuiThemeProvider>
    );
    }
}
