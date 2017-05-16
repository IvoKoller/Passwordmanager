//React
import React from 'react';
//Redux
import { connect } from 'react-redux';
import {showDeleteDialog, showNewDialog, showSingleEntry, editing } from '../actions/stateActions';
import {fetch, remove, evaluate, insert, updateActiveEntry} from '../actions/databaseActions';
//React components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Entry from './pages/entry'

/**
* Add-dialog with action buttons. The actions are passed in as an array of React objects
* It should prevent the user from accidently deleting an entry.
* You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
*/

@connect((store) => {
    return {
        showDeleteDialog: store.state.showDeleteDialog,
        activeEntry: store.database.activeEntry,
        activePage: store.state.activePage,
    };
})

export class DeleteDialog extends React.Component {

    constructor(props){
        super(props);
        this.cancel = this.cancel.bind(this);
        this.delete = this.delete.bind(this);
    }

    //callback for cancel button/ 'Esc' key press/ click outside dialog
    cancel() {
        this.props.dispatch(showDeleteDialog(false));
    }

    //callback for delete button
    delete() {
        this.props.dispatch(remove(this.props.activeEntry._id));
        this.props.dispatch(fetch({type: this.props.activePage.index-1}));
        //re-evaluate database, in order to update securityScore
        this.props.dispatch(evaluate());
        this.props.dispatch(showDeleteDialog(false));
        this.props.dispatch(showSingleEntry(false));
        this.props.dispatch(editing(false));
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.cancel}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.delete}
            />,
        ];

        return (
            <Dialog
                title={"Do you want to delete this entry?"}
                actions={actions}
                modal={false}
                open={this.props.showDeleteDialog}
                onRequestClose={this.cancel}
            ></Dialog>
        );
    }
}

/**
* Add-dialog with action buttons. The actions are passed in as an array of React objects
* You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
*/

@connect((store) => {
    return {
        showNewDialog: store.state.showNewDialog,
        activeEntry: store.database.activeEntry,
        activePage: store.state.activePage,
    };
})

export class AddDialog extends React.Component {
    
    constructor(props){
        super(props);
        this.cancel = this.cancel.bind(this);
        this.add = this.add.bind(this);
    }

    //callback for cancel button/ 'Esc' key press/ click outside dialog
    cancel() {
        this.props.dispatch(showNewDialog(false));
        this.props.dispatch(editing(false));
        this.props.dispatch(fetch({type: this.props.activePage.index-1}));
    }

    //callback for add button
    add() {
        this.props.dispatch(insert(this.props.activeEntry));
        this.props.dispatch(showNewDialog(false));
        this.props.dispatch(editing(false));
        this.props.dispatch(fetch({type: this.props.activePage.index-1}));
        //re-evaluate database, in order to update securityScore
        this.props.dispatch(evaluate());
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.cancel}
            />,
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.add}
            />,
        ];

        return (
            <Dialog
                title='Add new entry'
                actions={actions}
                modal={false}
                open={this.props.showNewDialog}
                onRequestClose={this.cancel}
                autoScrollBodyContent={true}
            >
                <Entry />
            </Dialog>
        );
    }
}
