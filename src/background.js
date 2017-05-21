// This is main process of Electron, started as first thing when the
// app starts. This script is running through entire life of the application.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

// Special module holding environment variables in config/env_xxx.json file.
import env from './env';

// If Linux fix for transparency becomes avaiable, the code below can be activated
// see: @ https://github.com/electron/electron/issues/2170
// if (process.platform === 'linux') {
//     app.commandLine.appendSwitch('enable-transparent-visuals');
//     app.commandLine.appendSwitch('disable-gpu');
// }

const setApplicationMenu = () => {
    const menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    const userDataPath = app.getPath('userData');
    app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
    //load application menu
    setApplicationMenu();

    const mainWindow = createWindow('main', {
        'minWidth': 800,
        'minHeight': 740,
        frame: false, //hide frame
        resizable: true, //make winodw resizable
        show: false, //hide window
    });
    //load 'app.html'
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true,
    }));

    //show window once 'app.html' is loaded
    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });

    //prevent browserwindow from switching to url, if link is dropped.
    mainWindow.webContents.on('will-navigate', event => {
        event.preventDefault();
    })

    //open dev tools if application is in dev mode
    if (env.name === 'development') {
        mainWindow.openDevTools();
    }

});

//quit application if all windows are closed
app.on('window-all-closed', () => {
    app.quit();
});
