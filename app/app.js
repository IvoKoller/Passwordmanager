(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('babel-polyfill');
var electron = require('electron');
var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var reactRedux = require('react-redux');
var redux = require('redux');
var logger = _interopDefault(require('redux-logger'));
var thunk = _interopDefault(require('redux-thunk'));
var materialUi_styles_colors = require('material-ui/styles/colors');
var materialUi_utils_colorManipulator = require('material-ui/utils/colorManipulator');
var jetpack = _interopDefault(require('fs-jetpack'));
var zxcvbn = _interopDefault(require('zxcvbn'));
var crypto = _interopDefault(require('crypto'));
var Datastore = _interopDefault(require('nedb'));
var MuiThemeProvider = _interopDefault(require('material-ui/styles/MuiThemeProvider'));
var getMuiTheme = _interopDefault(require('material-ui/styles/getMuiTheme'));
var Paper = _interopDefault(require('material-ui/Paper'));
var AppBar = _interopDefault(require('material-ui/AppBar'));
var Menu = _interopDefault(require('material-ui/Menu'));
var MenuItem = _interopDefault(require('material-ui/MenuItem'));
var Badge = _interopDefault(require('material-ui/Badge'));
var TextField = _interopDefault(require('material-ui/TextField'));
var FloatingActionButton = _interopDefault(require('material-ui/FloatingActionButton'));
var FlatButton = _interopDefault(require('material-ui/FlatButton'));
var IconButton = _interopDefault(require('material-ui/IconButton'));
var FontIcon = _interopDefault(require('material-ui/FontIcon'));
var CloseIcon = _interopDefault(require('material-ui/svg-icons/navigation/close'));
var RemoveIcon = _interopDefault(require('material-ui/svg-icons/content/remove'));
var AddIcon = _interopDefault(require('material-ui/svg-icons/content/add'));
var CircularProgress = _interopDefault(require('material-ui/CircularProgress'));
var materialUi_List = require('material-ui/List');
var IconMenu = _interopDefault(require('material-ui/IconMenu'));
var Avatar = _interopDefault(require('material-ui/Avatar'));
var spacing = _interopDefault(require('material-ui/styles/spacing'));
var Toggle = _interopDefault(require('material-ui/Toggle'));
var SelectField = _interopDefault(require('material-ui/SelectField'));
var DatePicker = _interopDefault(require('material-ui/DatePicker'));
var RaisedButton = _interopDefault(require('material-ui/RaisedButton'));
var Checkbox = _interopDefault(require('material-ui/Checkbox'));
var Slider = _interopDefault(require('material-ui/Slider'));
var CapsLock = _interopDefault(require('material-ui/svg-icons/hardware/keyboard-capslock'));
var reshake = require('reshake');
var materialAutoRotatingCarousel = require('material-auto-rotating-carousel');
var Dialog = _interopDefault(require('material-ui/Dialog'));
var injectTapEventPlugin = _interopDefault(require('react-tap-event-plugin'));

// This n gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

var Menu$1 = electron.remote.Menu;
var MenuItem$1 = electron.remote.MenuItem;

var isAnyTextSelected = function isAnyTextSelected() {
  return window.getSelection().toString() !== '';
};

var cut = new MenuItem$1({
  label: 'Cut',
  click: function click() {
    document.execCommand('cut');
  }
});

var copy = new MenuItem$1({
  label: 'Copy',
  click: function click() {
    document.execCommand('copy');
  }
});

var paste = new MenuItem$1({
  label: 'Paste',
  click: function click() {
    document.execCommand('paste');
  }
});

var normalMenu = new Menu$1();
normalMenu.append(copy);

var textEditingMenu = new Menu$1();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);

document.addEventListener('contextmenu', function (event) {
  switch (event.target.nodeName) {
    case 'TEXTAREA':
    case 'INPUT':
      event.preventDefault();
      textEditingMenu.popup(electron.remote.getCurrentWindow());
      break;
    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(electron.remote.getCurrentWindow());
      }
  }
}, false);

// Convenient way for opening links in external browser, not in the app.
// Useful especially if you have a lot of links to deal with.
//
// Usage:
//
// Every link with class ".js-external-link" will be opened in external browser.
// <a class="js-external-link" href="http://google.com">google</a>
//
// The same behaviour for many links can be achieved by adding
// this class to any parent tag of an anchor tag.
// <p class="js-external-link">
//    <a href="http://google.com">google</a>
//    <a href="http://bing.com">bing</a>
// </p>

var supportExternalLinks = function supportExternalLinks(event) {
  var href = void 0;
  var isExternal = false;

  var checkDomElement = function checkDomElement(element) {
    if (element.nodeName === 'A') {
      href = element.getAttribute('href');
    }
    if (element.classList.contains('js-external-link')) {
      isExternal = true;
    }
    if (href && isExternal) {
      electron.shell.openExternal(href);
      event.preventDefault();
    } else if (element.parentElement) {
      checkDomElement(element.parentElement);
    }
  };

  checkDomElement(event.target);
};

document.addEventListener('click', supportExternalLinks, false);

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
* The database reducer is essentially big switch statement, which assigns the
* action payload to the state object depending on the action type.
* @return updated state
*/

function reducer$1() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        database: [],
        activeEntry: { _id: null, user: null, url: null, password: null },
        securityScore: { score: 0, count: 0, entries: [] },
        loaded: false
    };
    var action = arguments[1];

    switch (action.type) {
        case 'DATABASE_LOADED':
            {
                return _extends({}, state, { // never mutate state itself!
                    loaded: action.payload
                });
            }
        case 'UPDATE_DATABASE':
            {
                return _extends({}, state, {
                    database: action.payload
                });
            }
        case 'ERROR':
            {
                console.log(action.payload);
                return state;
            }
        case 'UPDATE_ACTIVE_ENTRY':
            {
                return _extends({}, state, {
                    activeEntry: action.payload
                });
            }
        case 'UPDATE_SCORE':
            {
                return _extends({}, state, {
                    securityScore: action.payload
                });
            }
    }
    return state;
}

var lightTheme = {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopLeftNavMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: materialUi_styles_colors.blue500,
    primary2Color: materialUi_styles_colors.blue700,
    primary3Color: materialUi_styles_colors.lightBlack,
    accent1Color: materialUi_styles_colors.pinkA200,
    accent2Color: materialUi_styles_colors.blueGrey100,
    accent3Color: materialUi_styles_colors.blueGrey500,
    textColor: materialUi_styles_colors.darkBlack,
    alternateTextColor: materialUi_styles_colors.white,
    canvasColor: materialUi_styles_colors.white,
    secondaryCanvasColor: materialUi_utils_colorManipulator.darken(materialUi_styles_colors.white, 0.1),
    borderColor: materialUi_styles_colors.grey300,
    disabledColor: materialUi_utils_colorManipulator.fade(materialUi_styles_colors.darkBlack, 0.3),
    pickerHeaderColor: materialUi_styles_colors.blue500
  },
  avatar: {
    borderColor: null
  }
};

/**
* The state reducer is essentially big switch statement, which assigns the action
* payload to the state object depending on the action type.
* @return updated state
*/

function reducer$2() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        darkTheme: false,
        theme: lightTheme,
        activePage: { index: 0, title: 'Dashboard' },
        showSingleEntry: false,
        showDeleteDialog: false,
        showNewDialog: false,
        editing: false,
        capslock: false,
        searchQuery: '',
        searchState: false,
        hashedMasterPassword: null
    };
    var action = arguments[1];

    switch (action.type) {
        case 'THEME':
            {
                return _extends({}, state, { // never mutate state itself!
                    darkTheme: action.payload.darkTheme,
                    theme: action.payload.theme
                });
            }
        case 'SET_ACTIVE_PAGE':
            {
                return _extends({}, state, {
                    activePage: {
                        index: action.payload.index,
                        title: action.payload.title
                    }
                });
            }
        case 'DELETE_DIALOG':
            {
                return _extends({}, state, {
                    showDeleteDialog: action.payload
                });
            }
        case 'NEW_DIALOG':
            {
                return _extends({}, state, {
                    showNewDialog: action.payload
                });
            }
        case 'SHOW_SINGLE_ENTRY':
            {
                return _extends({}, state, {
                    showSingleEntry: action.payload
                });
            }
        case 'SET_SEARCH_QUERY':
            {
                return _extends({}, state, {
                    searchQuery: action.payload
                });
            }
        case 'SET_SEARCH_STATE':
            {
                return _extends({}, state, {
                    searchState: action.payload
                });
            }
        case 'EDITING':
            {
                return _extends({}, state, {
                    editing: action.payload
                });
            }
        case 'ERROR':
            {
                console.log(action.payload);
                return state;
            }
        case 'CAPSLOCK':
            {
                return _extends({}, state, {
                    capslock: action.payload
                });
            }
        case 'SET_HASHED_MASTERPASSWORD':
            {
                return _extends({}, state, {
                    hashedMasterPassword: action.payload
                });
            }

    }
    return state;
}

var reducer = redux.combineReducers({
    state: reducer$2,
    database: reducer$1
});

var middleware = redux.applyMiddleware(thunk, logger);

var store = redux.createStore(reducer, middleware);

var config = {
    // size of the generated hash
    hashBytes: 32,
    // Larger salt means hashed passwords are more resistant to rainbow tables, but
    // you get diminishing returns pretty fast
    saltBytes: 16,
    // more iterations means an attacker has to take longer to brute force an
    // individual password, so larger is better. However, larger also means longer
    // to hash the password.
    iterations: 872791,
    //en-/decryption algorithm
    algorithm: 'aes-256-ctr',
    //master password
    masterPassword: null
};

/**
* Hashing of a password using Node's asynchronous pbkdf2 (key derivation) function.
*
* Returns a self-contained buffer which can be arbitrarily encoded for storage
* that contains all the data needed to verify a password.
*
* @param {!String} password
* @param {!function(?Error, ?Buffer=)} callback
*/

function hashPassword(password, callback) {
    // generate a salt for pbkdf2
    crypto.randomBytes(config.saltBytes, function (err, salt) {
        if (err) {
            return callback(err);
        }

        crypto.pbkdf2(password, salt, config.iterations, config.hashBytes, function (err, hash) {

            if (err) {
                return callback(err);
            }

            var combined = new Buffer(hash.length + salt.length + 8);

            // include the size of the salt so that we can, during verification,
            // figure out how much of the hash is salt
            combined.writeUInt32BE(salt.length, 0, true);
            // similarly, include the iteration count
            combined.writeUInt32BE(config.iterations, 4, true);

            salt.copy(combined, 8);
            hash.copy(combined, salt.length + 8);
            callback(null, combined);
        });
    });
}

/**
* Verification of a password using Node's asynchronous pbkdf2 (key derivation) function.
*
* Accepts a hash and salt generated by hashPassword, and returns whether the
* hash matched the password (as a boolean).
*
* @param {!String} password
* @param {!Buffer} combined Buffer containing hash and salt as generated by hashPassword.
* @param {!function(?Error, !boolean)}
*/

function verifyPassword(password, combined, callback) {
    // extract the salt and hash from the combined buffer
    var saltBytes = combined.readUInt32BE(0);
    var hashBytes = combined.length - saltBytes - 8;
    var iterations = combined.readUInt32BE(4);
    var salt = combined.slice(8, saltBytes + 8);
    var hash = combined.toString('binary', saltBytes + 8);

    // verify the salt and hash against the password
    crypto.pbkdf2(password, salt, iterations, hashBytes, function (err, verify) {
        if (err) {
            return callback(err, false);
        }

        callback(null, verify.toString('binary') === hash);
    });
}

/**
* Encrypt string using algorithm and password supplied by config object
* @param {String} text plaintext
* @return {String} ciphertext
*/

function encrypt(text) {
    var cipher = crypto.createCipher(config.algorithm, config.masterPassword);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
* Decrypt string using algorithm and password supplied by config object
* @param {String} text ciphertext
* @return {String} plaintext
*/

function decrypt(text) {
    var decipher = crypto.createDecipher(config.algorithm, config.masterPassword);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

/**
* Generates a random password, with a default length of 14 characters
* @ http://www.frontcoded.com/javascript-generate-passwords.html
* @param numLc Number of lowercase letters to be used (default 4)
* @param numUc Number of uppercase letters to be used (default 4)
* @param numDigits Number of digits to be used (default 4)
* @param numSpecial Number of special characters to be used (default 2)
* @returns {*|string|String}
*/

function generatePassword(numLc, numUc, numDigits, numSpecial) {
    numLc = numLc || 4;
    numUc = numUc || 4;
    numDigits = numDigits || 4;
    numSpecial = numSpecial || 2;

    var lcLetters = 'abcdefghijklmnopqrstuvwxyz';
    var ucLetters = lcLetters.toUpperCase();
    var numbers = '0123456789';
    var special = '!?=#*$@+-.()<>';

    var pass = [];
    for (var i = 0; i < numLc; ++i) {
        pass.push(getRand(lcLetters));
    }
    for (var i = 0; i < numUc; ++i) {
        pass.push(getRand(ucLetters));
    }
    for (var i = 0; i < numDigits; ++i) {
        pass.push(getRand(numbers));
    }
    for (var i = 0; i < numSpecial; ++i) {
        pass.push(getRand(special));
    }

    return shuffle(pass).join('');
}

function getRand(values) {
    return values.charAt(Math.floor(Math.random() * values.length));
}

/**
* Fisher-Yates Shuffle
* @ https://bost.ocks.org/mike/shuffle/
* Interesting read: @ https://blog.codinghorror.com/the-danger-of-naivete/
* @param {array} array An array containing elements to be shuffled (pass by refrence)
* @return {array} Shuffled array
*/

function shuffle(array) {
    var m = array.length,
        t,
        i;
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

/**
* Set master password in config object
* @param {String} password master password
*/

function setMasterPassword(password) {
    config = _extends({}, config, { masterPassword: password });
}

var database;

/*
* The database reducer handles all requests to the NeDB database.
*/

/**
* Loads/Creates the database after a masterPassword has been defined.
* NeDB handles encryption/ decryption automatically using the callback functions
* defined in 'crypto.js'. The datastore gets loaded automatically and
* synchronously - requests to the database can be issued immediately.
*
* @returns {action} of type 'DATABASE_LOADED', with payload true
*
* If store.database.loaded == true, the layout component switches from the login
* screen to the 'application-home-screen'.
*/

function load() {
    var filename = electron.remote.app.getAppPath('userData') + './app/db/database.db';
    database = new Datastore({
        filename: filename,
        autoload: true,
        afterSerialization: encrypt,
        beforeDeserialization: decrypt
    });

    return {
        type: 'DATABASE_LOADED',
        payload: true
    };
}

/**
* Fetches data from the database.
* Fetching from the NeDB database happens asynchronously, as redux works synchronously,
* the thunk-middleware is utilised.
*
* @param {object} query (optional) An object containing the field to query, if
* left empty, all entries of the database are returned
*
* if fetching happens successfully, the function
* dispatches an action of type 'UPDATE_DATABASE', with an array of the found entries as a payload.
* Should something go wrong, it dispatches an action of type 'ERROR', with the error as a payload.
*
* @returns {dispatchFunction}
*
* The dispatch function itself
* @returns {Promise} In order to issue commands which depend on fetch() having finished
* see: @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/

function fetch(query) {
    return function (dispatch) {
        return new Promise(function (resolve, reject) {
            database.find(query, function (err, docs) {
                if (err) {
                    dispatch({
                        type: 'ERROR',
                        payload: err
                    });
                    reject(err);
                } else {
                    dispatch({
                        type: 'UPDATE_DATABASE',
                        payload: docs
                    });
                    resolve(docs);
                }
            });
        });
    };
}

/**
* Evaluates the securityScore
* It checks every password using the zxcvbn() function and adds the resulting scores.
*
* If fetching happens successfully, the function dispatches an action
* of type 'UPDATE_SCORE', with an object containing the score, the number of weak
* passwords and an array of the corresponding weak entries as a payload.
* Should something go wrong, it dispatches an action of type 'ERROR', with the error as a payload.
* @returns {dispatchFunction}
*/

function evaluate() {
    return function (dispatch) {
        database.find({}, function (err, docs) {
            if (err) {
                dispatch({
                    type: 'ERROR',
                    payload: err
                });
            } else {
                var score = 0,
                    count = 0,
                    entries = [];
                docs.map(function (item) {
                    if (item.type == 2) {
                        score += 4;
                        return;
                    }
                    var result = zxcvbn(item.password).score;
                    if (result < 4) {
                        count++;
                        entries.push(item);
                    }
                    score += result;
                });
                var percentage = score / (docs.length * 4);
                dispatch({
                    type: 'UPDATE_SCORE',
                    payload: {
                        score: percentage,
                        count: count,
                        entries: entries
                    }
                });
            }
        });
    };
}

/**
* Inserts entry into database
* @param entry the entry to be inserted
* @returns {action} of type null, as action doesn't have to change anything
*/

function insert(entry) {
    database.insert(entry);
    return { type: null };
}

/**
* Updates entry of database
* @param id id of the entry to be updated
* @param entry the entry to be updated
* @returns {action} of type null, as action doesn't have to change anything
*/

function update(id, entry) {
    database.update({ _id: id }, entry);
    return { type: null };
}

/**
* Removes entry of database
* @param id id of the entry to be deleted
* @returns {action} of type null, as action doesn't have to change anything
*/

function remove(id) {
    database.remove({ _id: id });
    return { type: null };
}

/**
* Searches entry and sets result as active entry
* @param id id of the entry to be deleted
* If fetching happens successfully, the function dispatches an action
* of type 'UPDATE_ACTIVE_ENTRY', with an the entry as a payload.
* @returns {dispatchFunction}
* @returns {Promise} In order to issue commands which depend on fetch() having finished
*/

function setActiveEntry(id) {
    return function (dispatch) {
        return new Promise(function (resolve, reject) {
            database.findOne({ _id: id }, function (err, doc) {
                if (err) {
                    dispatch({
                        type: 'ERROR',
                        payload: err
                    });
                    reject(err);
                } else {
                    dispatch({
                        type: 'UPDATE_ACTIVE_ENTRY',
                        payload: doc
                    });
                    resolve(doc);
                }
            });
        });
    };
}

/**
* Updates the active entry
* @param id id of the entry to be deleted
*
* @returns {action} of type 'UPDATE_ACTIVE_ENTRY', with the entry as a payload
*/

function updateActiveEntry(entry) {
    return {
        type: 'UPDATE_ACTIVE_ENTRY',
        payload: entry
    };
}

/*
* The state reducer handles all application state changes.
*/

/**
* Sets theme
* @param theme theme to set
* @param bool if toggle in settings should be set to true or not
*
* @returns {action} of type 'THEME' with the theme and bool as a payload
*/

function setTheme(theme, bool) {
    return {
        type: 'THEME',
        payload: { theme: theme, darkTheme: bool }
    };
}

/**
* Sets active page
* @param pageNumber page-index
* @param pageTitle sets page-title
*
* @returns {action} of type 'SET_ACTIVE_PAGE' with the page-index and title as a payload
*/

function setActivePage(pageNumber, pageTitle) {
    return {
        type: 'SET_ACTIVE_PAGE',
        payload: { index: pageNumber, title: pageTitle }
    };
}

/**
* Sets application is in edit mode
* @param bool state to set
*
* @returns {action} of type 'EDITING' with boolean as a payload
*/

function editing(bool) {
    return {
        type: 'EDITING',
        payload: bool
    };
}

/**
* Registers the current state of capslock in the store
* @param bool capslock state
*
* @returns {action} of type 'CAPSLOCK' with boolean as a payload
*/

function capslock(bool) {
    return {
        type: 'CAPSLOCK',
        payload: bool
    };
}

/**
* Sets active page
* @param pageNumber page-index
* @param pageTitle sets page-title
*
* @returns {action} of type 'SET_ACTIVE_PAGE' with the page-index and title as a payload
*/

function showDeleteDialog(bool) {
    return {
        type: 'DELETE_DIALOG',
        payload: bool
    };
}

function showSingleEntry(bool) {
    return {
        type: 'SHOW_SINGLE_ENTRY',
        payload: bool
    };
}

function showNewDialog(bool) {
    return {
        type: 'NEW_DIALOG',
        payload: bool
    };
}

function setSearchQuery(query) {
    return {
        type: 'SET_SEARCH_QUERY',
        payload: query
    };
}

function setSearchState(bool) {
    return {
        type: 'SET_SEARCH_STATE',
        payload: bool
    };
}
function setHashedMasterPassword(password) {
    return {
        type: 'SET_HASHED_MASTERPASSWORD',
        payload: password
    };
}

var _dec$2;
var _class$2;

// React
// Redux
// React components
/**
* This component lists the entries of the active database. Just like the entry-component
* it is thus multi functional. It serves as the representation of the search-results,
* the bad logins and of course the database itself.
* If no entries are present, a custom message is shown.
* Each entry has a menu which offers the user to edit or delete the entry. Additionaly
* the user can also copy the password. If the user chooses to do this, the password
* is copied into the clipboard. After 10 secondes, the clipboard is cleared.
*/

var Database = (_dec$2 = reactRedux.connect(function (store) {
    return {
        database: store.database.database,
        activeEntry: store.database.activeEntry,
        searchState: store.state.searchState,
        securityScore: store.database.securityScore
    };
}), _dec$2(_class$2 = function (_React$Component) {
    inherits(Database, _React$Component);

    function Database(props) {
        classCallCheck(this, Database);

        var _this = possibleConstructorReturn(this, (Database.__proto__ || Object.getPrototypeOf(Database)).call(this, props));

        _this.copyPassword = _this.copyPassword.bind(_this);
        _this.delete = _this.delete.bind(_this);
        _this.edit = _this.edit.bind(_this);
        _this.content = _this.content.bind(_this);
        return _this;
    }

    //callback for delete menu item


    createClass(Database, [{
        key: 'delete',
        value: function _delete(event) {
            this.props.dispatch(showDeleteDialog(true));
            this.props.dispatch(setSearchState(false));
        }

        //callback for delete menu item

    }, {
        key: 'edit',
        value: function edit() {
            this.props.dispatch(editing(true));
            this.props.dispatch(showSingleEntry(true));
            this.props.dispatch(setSearchState(false));
        }

        //callback for copy-password menu item

    }, {
        key: 'copyPassword',
        value: function copyPassword() {
            var copy = function () {
                var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(password) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    electron.clipboard.writeText(password); //copy password to clipboard
                                    _context.next = 3;
                                    return wait(10000);

                                case 3:
                                    //start asynchrounous function, 10 second timeout
                                    electron.clipboard.writeText(''); //clear clipboard

                                case 4:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                return function copy(_x) {
                    return _ref.apply(this, arguments);
                };
            }();

            function wait(ms) {
                return new Promise(function (r) {
                    return setTimeout(r, ms);
                });
            }

            copy(this.props.activeEntry.password);
        }

        //callback to set active entry

    }, {
        key: 'setActive',
        value: function setActive(id) {
            this.props.dispatch(setActiveEntry(id));
        }

        //callback to set active page

    }, {
        key: 'activePage',
        value: function activePage(id) {
            var _this2 = this;

            this.props.dispatch(setActiveEntry(id)).then(function (doc) {
                _this2.props.dispatch(showSingleEntry(true));
            });
        }
    }, {
        key: 'content',
        value: function content() {
            var _this3 = this;

            if (this.props.onlyShowBadLogins && this.props.securityScore.count > 0 || this.props.database.length > 0) {
                return React.createElement(
                    materialUi_List.List,
                    null,
                    this.props.onlyShowBadLogins ? this.props.securityScore.entries.map(function (item, index) {
                        return React.createElement(materialUi_List.ListItem, {
                            key: index,
                            onTouchTap: _this3.activePage.bind(_this3, item._id),
                            leftAvatar: React.createElement(Avatar, { icon: React.createElement(FontIcon, {
                                    className: 'fa fa-' + item.title.toLowerCase() }) }),
                            rightIcon: zxcvbn(item.password).score < 4 && item.type !== 2 && React.createElement(
                                FontIcon,
                                { color: materialUi_styles_colors.red400, style: { marginRight: 50 }, className: 'material-icons' },
                                'warning'
                            ),
                            rightIconButton: React.createElement(
                                IconMenu,
                                { iconButtonElement: React.createElement(
                                        IconButton,
                                        { onTouchTap: _this3.setActive.bind(_this3, item._id) },
                                        React.createElement(
                                            FontIcon,
                                            { className: 'material-icons', color: materialUi_styles_colors.grey400 },
                                            'more_vert'
                                        )
                                    ) },
                                React.createElement(
                                    MenuItem,
                                    { onTouchTap: _this3.copyPassword },
                                    'Copy Password'
                                ),
                                React.createElement(
                                    MenuItem,
                                    { onTouchTap: _this3.edit },
                                    'Edit'
                                ),
                                React.createElement(
                                    MenuItem,
                                    { onTouchTap: _this3.delete },
                                    'Delete'
                                )
                            ),
                            primaryText: item.title,
                            secondaryText: item.user
                        });
                    }) : this.props.database.map(function (item, index) {
                        return React.createElement(materialUi_List.ListItem, {
                            key: index,
                            onTouchTap: _this3.activePage.bind(_this3, item._id),
                            leftAvatar: React.createElement(Avatar, { icon: React.createElement(FontIcon, {
                                    className: 'fa fa-' + item.title.toLowerCase() }) }),
                            rightIcon: zxcvbn(item.password).score < 4 && item.type !== 2 && React.createElement(
                                FontIcon,
                                { color: materialUi_styles_colors.red400, style: { marginRight: 50 }, className: 'material-icons' },
                                'warning'
                            ),
                            rightIconButton: React.createElement(
                                IconMenu,
                                { iconButtonElement: React.createElement(
                                        IconButton,
                                        { onTouchTap: _this3.setActive.bind(_this3, item._id) },
                                        React.createElement(
                                            FontIcon,
                                            { className: 'material-icons', color: materialUi_styles_colors.grey400 },
                                            'more_vert '
                                        )
                                    ) },
                                React.createElement(
                                    MenuItem,
                                    { onTouchTap: _this3.copyPassword },
                                    'Copy Password'
                                ),
                                React.createElement(
                                    MenuItem,
                                    { onTouchTap: _this3.edit },
                                    'Edit'
                                ),
                                React.createElement(
                                    MenuItem,
                                    { onTouchTap: _this3.delete },
                                    'Delete'
                                )
                            ),
                            primaryText: item.title,
                            secondaryText: item.user
                        });
                    })
                );
            } else {
                if (this.props.searchState) {
                    return React.createElement(
                        'p',
                        { style: { fontStyle: 'italic', color: 'gray', textAlign: 'center' } },
                        'No matching entries could be found.'
                    );
                } else {
                    return React.createElement(
                        'p',
                        { style: { fontStyle: 'italic', color: 'gray', textAlign: 'center' } },
                        'You haven\'t made any entries! Click the red button to add one.'
                    );
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.content()
            );
        }
    }]);
    return Database;
}(React.Component)) || _class$2);

var _dec$1;
var _class$1;

//Zxcvbn
// React
// Redux
// React components
/**
* Dashboard page of the application
* The user is presented with a circular-progress-bar, which represents the current
* state of the securityScore.
* If there are entries that have issues (weak passwords), they are listed using
* the List component.
*/

var Dashboard = (_dec$1 = reactRedux.connect(function (store) {
    return {
        theme: store.state.theme,
        securityScore: store.database.securityScore
    };
}), _dec$1(_class$1 = function (_React$Component) {
    inherits(Dashboard, _React$Component);

    function Dashboard() {
        classCallCheck(this, Dashboard);
        return possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).apply(this, arguments));
    }

    createClass(Dashboard, [{
        key: 'componentWillMount',

        //before the Dashboard is rendered, the database is re-evaluated
        value: function componentWillMount() {
            this.props.dispatch(evaluate());
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: { display: 'flex' } },
                    React.createElement(
                        'div',
                        { style: { flex: 1, width: '100%', height: 200, position: 'relative' } },
                        React.createElement(CircularProgress, {
                            mode: 'determinate',
                            value: this.props.securityScore.score,
                            min: 0,
                            max: 1,
                            size: 200,
                            thickness: 5,
                            style: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                justifyContent: 'center'
                            }
                        }),
                        React.createElement(
                            'div',
                            {
                                style: {
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
                                    color: this.props.theme.palette.disabledColor
                                }
                            },
                            React.createElement(
                                'p',
                                null,
                                'Score: ' + (this.props.securityScore.score * 100).toFixed().toString() + '%'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: 1 } },
                        React.createElement(
                            'h1',
                            null,
                            'Welcome!'
                        ),
                        'To the left you see your current security score. It tells you how safe your current passwords are. In order to improve your security score, check the list of issues below.',
                        React.createElement(
                            'h4',
                            null,
                            'Having trouble creating a new password?'
                        ),
                        'Let us do the thinking for you by generating a new password - thanks to your passwordmanager you won\'t have to remember your old one!'
                    )
                ),
                this.props.securityScore.count > 0 && React.createElement(
                    'div',
                    { style: { borderTop: 'solid 1px gray', marginTop: 20, paddingTop: 20 } },
                    React.createElement(Database, { onlyShowBadLogins: true })
                )
            );
        }
    }]);
    return Dashboard;
}(React.Component)) || _class$1);

var darkTheme = {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: materialUi_styles_colors.cyan500,
        primary2Color: materialUi_styles_colors.cyan700,
        primary3Color: materialUi_styles_colors.grey600,
        accent1Color: materialUi_styles_colors.pinkA200,
        accent2Color: materialUi_styles_colors.pinkA400,
        accent3Color: materialUi_styles_colors.pinkA100,
        textColor: materialUi_styles_colors.fullWhite,
        secondaryTextColor: materialUi_utils_colorManipulator.fade(materialUi_styles_colors.fullWhite, 0.7),
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        secondaryCanvasColor: materialUi_utils_colorManipulator.darken('#303030', 0.1),
        borderColor: materialUi_utils_colorManipulator.fade(materialUi_styles_colors.fullWhite, 0.3),
        disabledColor: materialUi_utils_colorManipulator.fade(materialUi_styles_colors.fullWhite, 0.3),
        pickerHeaderColor: materialUi_utils_colorManipulator.fade(materialUi_styles_colors.fullWhite, 0.12),
        clockCircleColor: materialUi_utils_colorManipulator.fade(materialUi_styles_colors.fullWhite, 0.12)
    }
};

var _dec$3;
var _class$3;

// React
// Redux
// React components
/**
* This component that handles the settings page.
* At this point in time, only the theme can be changed, this may change in the
* future. As there are no 'important' changes to be made, the settings are not
* persistent. Also this may change in the future.
*/

var Settings = (_dec$3 = reactRedux.connect(function (store) {
    return {
        darkTheme: store.state.darkTheme
    };
}), _dec$3(_class$3 = function (_React$Component) {
    inherits(Settings, _React$Component);

    function Settings(props) {
        classCallCheck(this, Settings);

        var _this = possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

        _this.setTheme = _this.setTheme.bind(_this);
        return _this;
    }

    //callback for dark-theme-toggle


    createClass(Settings, [{
        key: 'setTheme',
        value: function setTheme$$1(event, bool) {
            if (bool) this.props.dispatch(setTheme(darkTheme, bool));else this.props.dispatch(setTheme(lightTheme, bool));
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Toggle, {
                    label: 'Dark Theme',
                    toggled: this.props.darkTheme,
                    onToggle: this.setTheme
                })
            );
        }
    }]);
    return Settings;
}(React.Component)) || _class$3);

var _dec$5;
var _class$5;

// React
// Redux
// React components
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

var PasswordSection = (_dec$5 = reactRedux.connect(function (store) {
    return {
        theme: store.state.theme,
        editing: store.state.editing,
        activeEntry: store.database.activeEntry,
        capslock: store.state.capslock
    };
}), _dec$5(_class$5 = function (_React$Component) {
    inherits(PasswordSection, _React$Component);

    function PasswordSection(props) {
        classCallCheck(this, PasswordSection);

        var _this = possibleConstructorReturn(this, (PasswordSection.__proto__ || Object.getPrototypeOf(PasswordSection)).call(this, props));

        _this.state = {
            showPassword: false,
            passwordEval: zxcvbn(_this.props.activeEntry.password),
            //default values for password generator
            lowercaseLetters: 4,
            uppercaseLetters: 4,
            digits: 4,
            special: 2
        };
        _this.changePassword = _this.changePassword.bind(_this);
        _this.showPassword = _this.showPassword.bind(_this);
        _this.showOptional = _this.showOptional.bind(_this);
        _this.capslock = _this.capslock.bind(_this);
        _this.copyPassword = _this.copyPassword.bind(_this);
        _this.pastePassword = _this.pastePassword.bind(_this);
        _this.genPassword = _this.genPassword.bind(_this);
        _this.handleFirstSlider = _this.handleFirstSlider.bind(_this);
        _this.handleSecondSlider = _this.handleSecondSlider.bind(_this);
        _this.handleThirdSlider = _this.handleThirdSlider.bind(_this);
        _this.handleFourthSlider = _this.handleFourthSlider.bind(_this);
        return _this;
    }

    createClass(PasswordSection, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            //set capslock callback
            document.addEventListener('keydown', this.capslock);
        }

        //capslock callback

    }, {
        key: 'capslock',
        value: function capslock$$1(event) {
            this.props.dispatch(capslock(event.getModifierState('CapsLock')));
        }

        //callback if password is changed

    }, {
        key: 'changePassword',
        value: function changePassword(event, password) {
            this.setState({ passwordEval: zxcvbn(password) });
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    password: password
                })));
            }
        }

        //callback for copy-password button

    }, {
        key: 'copyPassword',
        value: function copyPassword() {
            var copy = function () {
                var _ref = asyncToGenerator(regeneratorRuntime.mark(function _callee(password) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    electron.clipboard.writeText(password); //copy password to clipboard
                                    _context.next = 3;
                                    return wait(10000);

                                case 3:
                                    //start asynchrounous function, 10 second timeout
                                    electron.clipboard.writeText(''); //clear clipboard

                                case 4:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                return function copy(_x) {
                    return _ref.apply(this, arguments);
                };
            }();

            function wait(ms) {
                return new Promise(function (r) {
                    return setTimeout(r, ms);
                });
            }

            copy(this.props.activeEntry.password);
        }

        //callback for paste-password button

    }, {
        key: 'pastePassword',
        value: function pastePassword() {
            this.changePassword({}, electron.clipboard.readText());
        }

        //callback for generate-password button

    }, {
        key: 'genPassword',
        value: function genPassword() {
            //generate password using the parameters set by user (if unchanged, default values)
            this.changePassword({}, generatePassword(this.state.lowercaseLetters, this.state.uppercaseLetters, this.state.digits, this.state.special));
        }

        //callback for password-visibility toggle

    }, {
        key: 'showPassword',
        value: function showPassword(event, _showPassword) {
            this.setState({ showPassword: _showPassword });
        }

        //callback for optional settings toggle

    }, {
        key: 'showOptional',
        value: function showOptional() {
            this.setState({ optional: !this.state.optional });
        }

        //handlers for sliders

    }, {
        key: 'handleFirstSlider',
        value: function handleFirstSlider(event, value) {
            this.setState({ lowercaseLetters: value });
        }
    }, {
        key: 'handleSecondSlider',
        value: function handleSecondSlider(event, value) {
            this.setState({ uppercaseLetters: value });
        }
    }, {
        key: 'handleThirdSlider',
        value: function handleThirdSlider(event, value) {
            this.setState({ digits: value });
        }
    }, {
        key: 'handleFourthSlider',
        value: function handleFourthSlider(event, value) {
            this.setState({ special: value });
        }
    }, {
        key: 'render',
        value: function render() {
            var faces = ['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_satisfied'];
            var colors = [materialUi_styles_colors.red500, materialUi_styles_colors.deepOrange500, materialUi_styles_colors.orange500, materialUi_styles_colors.green500, materialUi_styles_colors.lightGreen500];
            var strength = ['very weak', 'weak', 'not bad', 'good', 'very good'];

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: { display: 'flex' } },
                    React.createElement(
                        'div',
                        { style: { flex: 1, marginRight: 7 } },
                        React.createElement(TextField, {
                            value: this.props.activeEntry.password,
                            onChange: this.changePassword,
                            floatingLabelText: 'Password',
                            underlineShow: this.props.editing,
                            type: this.state.showPassword ? 'text' : 'password',
                            fullWidth: true
                        }),
                        this.props.capslock && React.createElement(CapsLock, { color: this.props.theme.palette.primary1Color, style: { marginLeft: -30, alignSelf: 'center' } })
                    ),
                    React.createElement(
                        'div',
                        { style: { display: 'flex', justifyContent: 'flex-right' } },
                        React.createElement(Checkbox, {
                            style: { width: 30, alignSelf: 'center' },
                            onCheck: this.showPassword,
                            checkedIcon: React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'visibility'
                            ),
                            uncheckedIcon: React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'visibility_off'
                            )
                        }),
                        this.props.editing ? React.createElement(
                            IconButton,
                            { onTouchTap: this.pastePassword, style: { alignSelf: 'center' } },
                            React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'content_paste'
                            )
                        ) : React.createElement(
                            IconButton,
                            { onTouchTap: this.copyPassword, style: { alignSelf: 'center' } },
                            React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'content_copy'
                            )
                        ),
                        this.props.editing && React.createElement(
                            IconButton,
                            { tooltip: 'Generate Password', onTouchTap: this.genPassword, style: { alignSelf: 'center' } },
                            React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'refresh'
                            )
                        ),
                        this.props.editing && React.createElement(Checkbox, {
                            style: { alignSelf: 'center', marginLeft: 10 },
                            onCheck: this.showOptional,
                            checkedIcon: React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'keyboard_arrow_up'
                            ),
                            uncheckedIcon: React.createElement(
                                FontIcon,
                                { className: 'material-icons' },
                                'keyboard_arrow_down'
                            )
                        })
                    )
                ),
                this.state.optional && React.createElement(
                    'div',
                    { style: { display: 'flex', margin: '0 -7px', marginTop: 15 } },
                    React.createElement(
                        'div',
                        { style: { flex: 1, margin: '0 7px' } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Digits: ',
                                this.state.digits
                            ),
                            React.createElement(Slider, { min: 0, max: 10, step: 1, defaultValue: 4, style: { height: 30 },
                                value: this.state.digits, onChange: this.handleThirdSlider })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Special letters: ',
                                this.state.special
                            ),
                            React.createElement(Slider, { min: 0, max: 10, step: 1, defaultValue: 4, style: { height: 30 },
                                value: this.state.special, onChange: this.handleFourthSlider })
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: 1, margin: '0 7px' } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Lowercase letters: ',
                                this.state.lowercaseLetters
                            ),
                            React.createElement(Slider, { min: 0, max: 10, step: 1, defaultValue: 4, style: { height: 30 },
                                value: this.state.lowercaseLetters, onChange: this.handleFirstSlider })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Uppercase letters: ',
                                this.state.uppercaseLetters
                            ),
                            React.createElement(Slider, { min: 0, max: 10, step: 1, defaultValue: 4, style: { height: 30 },
                                value: this.state.uppercaseLetters, onChange: this.handleSecondSlider })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { style: { display: 'flex', margin: '0 -7px' } },
                    React.createElement(
                        'div',
                        { style: { flex: 1, margin: '0 7px' } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'p',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Feedback:'
                            ),
                            React.createElement(
                                'p',
                                null,
                                ' ',
                                this.state.passwordEval.feedback.warning || 'none',
                                ' '
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'p',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Suggestions:'
                            ),
                            React.createElement(
                                'p',
                                null,
                                ' ',
                                this.state.passwordEval.feedback.suggestions == '' ? 'none' : this.state.passwordEval.feedback.suggestions,
                                ' '
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: 1, margin: '0 7px' } },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'p',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Crack Time:'
                            ),
                            React.createElement(
                                'p',
                                null,
                                ' ',
                                this.state.passwordEval.crack_times_display.offline_slow_hashing_1e4_per_second,
                                ' '
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'p',
                                { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                'Strength:'
                            ),
                            React.createElement(
                                'div',
                                { style: { display: 'flex', alignItems: 'center' } },
                                React.createElement(
                                    'span',
                                    { style: { color: colors[this.state.passwordEval.score] } },
                                    ' ',
                                    strength[this.state.passwordEval.score]
                                ),
                                React.createElement(
                                    FontIcon,
                                    { style: { marginLeft: 10 }, color: colors[this.state.passwordEval.score], className: 'material-icons' },
                                    faces[this.state.passwordEval.score]
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return PasswordSection;
}(React.Component)) || _class$5);

var _dec$4;
var _class$4;

// React
// Redux
// React components
/**
* This component handles the representation of the activeEntry. With other words,
* it handles both the representation of existing database entries (when triggered
* by the list-component) and a new ones (when triggered by AddDialog-component).
*/

var Entry = (_dec$4 = reactRedux.connect(function (store) {
    return {
        theme: store.state.theme,
        editing: store.state.editing,
        activeEntry: store.database.activeEntry
    };
}), _dec$4(_class$4 = function (_React$Component) {
    inherits(Entry, _React$Component);

    function Entry(props) {
        classCallCheck(this, Entry);

        var _this = possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

        _this.changeUrl = _this.changeUrl.bind(_this);
        _this.changeUser = _this.changeUser.bind(_this);
        _this.content = _this.content.bind(_this);
        _this.changeTitle = _this.changeTitle.bind(_this);
        _this.changeType = _this.changeType.bind(_this);
        _this.changeNumber = _this.changeNumber.bind(_this);
        _this.changeCCV = _this.changeCCV.bind(_this);
        _this.changeDate = _this.changeDate.bind(_this);
        _this.changeOutgoingMailServer = _this.changeOutgoingMailServer.bind(_this);
        _this.changeIncomingMailServer = _this.changeIncomingMailServer.bind(_this);
        _this.changeServer = _this.changeServer.bind(_this);
        return _this;
    }

    //callback for title-textfield


    createClass(Entry, [{
        key: 'changeTitle',
        value: function changeTitle(event, title) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    title: title
                })));
            }
        }

        //callback for type-selectfield

    }, {
        key: 'changeType',
        value: function changeType(event, type) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    type: type
                })));
            }
        }

        //callback for url-textfield

    }, {
        key: 'changeUrl',
        value: function changeUrl(event, url) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    url: url
                })));
            }
        }

        //callback for user-textfield

    }, {
        key: 'changeUser',
        value: function changeUser(event, user) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    user: user
                })));
            }
        }

        //callback for number-textfield

    }, {
        key: 'changeNumber',
        value: function changeNumber(event, number) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    number: number
                })));
            }
        }

        //callback for ccv-textfield

    }, {
        key: 'changeCCV',
        value: function changeCCV(event, ccv) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    ccv: ccv
                })));
            }
        }
        //callback for date-component

    }, {
        key: 'changeDate',
        value: function changeDate(event, date) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    date: date
                })));
            }
        }

        //callback for title-textfield

    }, {
        key: 'changeOutgoingMailServer',
        value: function changeOutgoingMailServer(event, oms) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    outgoingMailServer: oms
                })));
            }
        }

        //callback for incomingMailServer-textfield

    }, {
        key: 'changeIncomingMailServer',
        value: function changeIncomingMailServer(event, ims) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    incomingMailServer: ims
                })));
            }
        }

        //callback for server-selectfield

    }, {
        key: 'changeServer',
        value: function changeServer(event, server) {
            if (this.props.editing) {
                this.props.dispatch(updateActiveEntry(_extends({}, this.props.activeEntry, {
                    server: server
                })));
            }
        }

        /**
        * Function handling the layout of the entry depending on the activeEntry type
        * @returns entry-layout
        */

    }, {
        key: 'content',
        value: function content() {
            switch (this.props.activeEntry.type) {
                case 1:
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { style: { display: 'flex', margin: '0 -7px' } },
                            React.createElement(
                                'div',
                                { style: { flex: 1, margin: '0 7px' } },
                                React.createElement(TextField, {
                                    value: this.props.activeEntry.incomingMailServer,
                                    onChange: this.changeIncomingMailServer,
                                    floatingLabelText: 'Incoming Mail Server',
                                    fullWidth: true,
                                    underlineShow: this.props.editing
                                }),
                                React.createElement('br', null),
                                React.createElement(TextField, {
                                    value: this.props.activeEntry.user,
                                    onChange: this.changeUser,
                                    floatingLabelText: 'Username',
                                    fullWidth: true,
                                    underlineShow: this.props.editing
                                })
                            ),
                            React.createElement(
                                'div',
                                { style: { flex: 1, margin: '0 7px' } },
                                React.createElement(TextField, {
                                    value: this.props.activeEntry.outgoingMailServer,
                                    onChange: this.changeOutgoingMailServer,
                                    floatingLabelText: 'Outgoing Mail Server',
                                    fullWidth: true,
                                    underlineShow: this.props.editing
                                }),
                                React.createElement('br', null),
                                React.createElement(
                                    SelectField,
                                    {
                                        fullWidth: true,
                                        onChange: this.changeServer,
                                        value: this.props.activeEntry.server,
                                        disabled: !this.props.editing,
                                        floatingLabelText: 'Server Type' },
                                    React.createElement(MenuItem, { value: 0, primaryText: 'POP' }),
                                    React.createElement(MenuItem, { value: 1, primaryText: 'IMAP' })
                                )
                            )
                        ),
                        React.createElement(PasswordSection, null)
                    );

                case 2:
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(TextField, {
                            value: this.props.activeEntry.number,
                            onChange: this.changeNumber,
                            floatingLabelText: 'Card Number',
                            fullWidth: true,
                            underlineShow: this.props.editing
                        }),
                        React.createElement('br', null),
                        React.createElement(DatePicker, {
                            value: this.props.activeEntry.date,
                            onChange: this.changeDate,
                            floatingLabelText: 'Expiration Date',
                            autoOk: true,
                            disabled: !this.props.editing
                        }),
                        React.createElement('br', null),
                        React.createElement(TextField, {
                            value: this.props.activeEntry.ccv,
                            onChange: this.changeCCV,
                            floatingLabelText: 'CCV',
                            fullWidth: true,
                            underlineShow: this.props.editing
                        }),
                        React.createElement('br', null)
                    );

                default:
                    return React.createElement(
                        'div',
                        null,
                        React.createElement(TextField, {
                            value: this.props.activeEntry.user,
                            onChange: this.changeUser,
                            floatingLabelText: 'Username',
                            fullWidth: true,
                            underlineShow: this.props.editing
                        }),
                        React.createElement('br', null),
                        React.createElement(TextField, {
                            value: this.props.activeEntry.url,
                            onChange: this.changeUrl,
                            floatingLabelText: 'Url',
                            fullWidth: true,
                            underlineShow: this.props.editing
                        }),
                        React.createElement('br', null),
                        React.createElement(PasswordSection, null)
                    );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { overflow: 'hidden' } },
                this.props.editing && React.createElement(
                    'div',
                    { style: { display: 'flex', margin: '0 -7px' } },
                    React.createElement(
                        SelectField,
                        { style: { flex: 1, margin: '0 7px' }, value: this.props.activeEntry.type, floatingLabelText: 'Login Type', onChange: this.changeType },
                        React.createElement(MenuItem, { value: 0, primaryText: 'Login' }),
                        React.createElement(MenuItem, { value: 1, primaryText: 'Email' }),
                        React.createElement(MenuItem, { value: 2, primaryText: 'Credit Card' })
                    ),
                    React.createElement(TextField, {
                        style: { flex: 1, margin: '0 7px' },
                        value: this.props.activeEntry.title,
                        onChange: this.changeTitle,
                        floatingLabelText: 'Title',
                        fullWidth: true,
                        underlineShow: this.props.editing
                    })
                ),
                this.content()
            );
        }
    }]);
    return Entry;
}(React.Component)) || _class$4);

var _dec$6;
var _class$6;

// React
/**
*  Component handling the about me page.
*/

var About = (_dec$6 = reactRedux.connect(function (store) {
    return {
        theme: store.state.theme
    };
}), _dec$6(_class$6 = function (_React$Component) {
    inherits(About, _React$Component);

    function About() {
        classCallCheck(this, About);
        return possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
    }

    createClass(About, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { style: { fontSize: 20, letterSpacing: 4, textAlign: 'center' } },
                    React.createElement('i', { className: 'fa fa-code' }),
                    React.createElement(
                        'span',
                        { style: { letterSpacing: 1 } },
                        ' with '
                    ),
                    React.createElement('i', { className: 'fa fa-heart' }),
                    React.createElement(
                        'span',
                        { style: { letterSpacing: 1 } },
                        ' by '
                    ),
                    React.createElement(
                        'a',
                        { className: 'js-external-link', style: { color: this.props.theme.palette.textColor }, href: 'https://github.com/IvoKoller' },
                        React.createElement('i', { className: 'fa fa-hand-pointer-o' }),
                        React.createElement('i', { className: 'fa fa-hand-peace-o' }),
                        React.createElement('i', { className: 'fa fa-hand-rock-o' })
                    )
                )
            );
        }
    }]);
    return About;
}(React.Component)) || _class$6);

var _dec$7;
var _class$7;

// React
// Redux
// React components
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

var Login = (_dec$7 = reactRedux.connect(function (store) {
    return {
        theme: store.state.theme,
        hashedMasterPassword: store.state.hashedMasterPassword
    };
}), _dec$7(_class$7 = function (_React$Component) {
    inherits(Login, _React$Component);

    function Login(props) {
        classCallCheck(this, Login);

        var _this = possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

        _this.state = {
            masterPassword: '',
            shaking: false
        };
        _this.changePassword = _this.changePassword.bind(_this);
        _this.submit = _this.submit.bind(_this);
        return _this;
    }

    //callback for master password textfield


    createClass(Login, [{
        key: 'changePassword',
        value: function changePassword(event, masterPassword) {
            this.setState({ masterPassword: masterPassword });
            this.setState({ shaking: false });
        }

        //callback for submit button

    }, {
        key: 'submit',
        value: function submit() {
            var _this2 = this;

            var that = this;
            verifyPassword(this.state.masterPassword, this.props.hashedMasterPassword, function (err, verified) {
                if (verified) {
                    console.log('correct password');
                    setMasterPassword(_this2.state.masterPassword);
                    _this2.props.dispatch(load());
                } else {
                    console.log('false');
                    _this2.setState({ shaking: true });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: {
                        flex: 1,
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: this.props.theme.palette.primary1Color
                    } },
                React.createElement(
                    Paper,
                    { style: {
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            display: 'flex',
                            height: 'auto',
                            width: 500,
                            padding: 20
                        } },
                    React.createElement(
                        reshake.ShakeHorizontal,
                        { style: { marginTop: 10 }, trigger: !this.state.shaking && 'someString', q: 1, fixed: false, freez: false },
                        React.createElement(
                            FontIcon,
                            { style: this.state.shaking && { color: materialUi_styles_colors.red500 }, className: 'material-icons' },
                            'lock_outline'
                        )
                    ),
                    React.createElement(TextField, {
                        style: { marginLeft: 20, marginRight: 20 },
                        name: 'login',
                        fullWidth: true,
                        type: 'password',
                        floatingLabelText: 'Master Password',
                        value: this.state.masterPassword,
                        onChange: this.changePassword
                    }),
                    React.createElement(RaisedButton, {
                        label: 'Login',
                        primary: true,
                        onTouchTap: this.submit
                    })
                )
            );
        }
    }]);
    return Login;
}(React.Component)) || _class$7);

var _dec$8;
var _class$8;

//Electron
//Crypto
// React
// Redux
// React components
// - Colors
// - Carousel component
/**
* Should the application start for the first time/ the 'config.json' file be deleted,
* the application starts in a setup mode. The setup component shows a carousel,
* showing off some of the features teh passwordmanager has to offer. If the user
* clicks on the 'get started' button, they are taken to the setup screen, where
* they have to define a new master password. If the defined master password
* is secure enough (scores 4 in the Zxcvbn test) and has been entered two identical
*  times by the user, the password gets hashed and written into the 'config.json' file.
*/

var Setup = (_dec$8 = reactRedux.connect(function (store) {
    return {
        theme: store.state.theme,
        masterPassword: store.state.masterPassword
    };
}), _dec$8(_class$8 = function (_React$Component) {
    inherits(Setup, _React$Component);

    function Setup(props) {
        classCallCheck(this, Setup);

        var _this = possibleConstructorReturn(this, (Setup.__proto__ || Object.getPrototypeOf(Setup)).call(this, props));

        _this.state = {
            firstPassword: '',
            secondPassword: '',
            passwordEval: zxcvbn(''),
            equal: true,
            start: false
        };
        _this.changeFirstPassword = _this.changeFirstPassword.bind(_this);
        _this.changeSecondPassword = _this.changeSecondPassword.bind(_this);
        _this.submit = _this.submit.bind(_this);
        _this.onStart = _this.onStart.bind(_this);
        return _this;
    }

    //callback for first textfield


    createClass(Setup, [{
        key: 'changeFirstPassword',
        value: function changeFirstPassword(event, password) {
            this.setState({
                firstPassword: password,
                passwordEval: zxcvbn(password),
                equal: this.state.secondPassword == password ? true : false
            });
        }

        //callback for second textfield

    }, {
        key: 'changeSecondPassword',
        value: function changeSecondPassword(event, password) {
            this.setState({
                secondPassword: password,
                equal: this.state.firstPassword == password ? true : false
            });
        }

        //on submit,

    }, {
        key: 'submit',
        value: function submit() {
            var _this2 = this;

            var app = electron.remote.app;
            var appDir = jetpack.cwd(app.getAppPath('userData'));
            //hash password,
            hashPassword(this.state.firstPassword, function (err, masterPassword) {
                //write to 'config.json'
                appDir.write('../config.json', { masterPassword: masterPassword });
                //set to redux store
                _this2.props.dispatch(setHashedMasterPassword(masterPassword));
            });
        }

        //callback for 'get started' button, start setup process

    }, {
        key: 'onStart',
        value: function onStart() {
            this.setState({ start: true });
        }
    }, {
        key: 'render',
        value: function render() {
            var faces = ['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_satisfied'];
            var colors = [materialUi_styles_colors.red500, materialUi_styles_colors.deepOrange500, materialUi_styles_colors.orange500, materialUi_styles_colors.green500, materialUi_styles_colors.lightGreen500];
            var strength = ['very weak', 'weak', 'not bad', 'good', 'very good'];

            var carousel = React.createElement(
                'div',
                null,
                React.createElement(
                    materialAutoRotatingCarousel.AutoRotatingCarousel,
                    {
                        label: 'Get started',
                        open: true,
                        interval: 5000,
                        landscape: true,
                        mobile: true,
                        onStart: this.onStart
                    },
                    React.createElement(materialAutoRotatingCarousel.Slide, {
                        media: React.createElement('img', { src: 'img/forget.svg' }),
                        mediaStyle: { width: '50%', margin: '0 auto' },
                        mediaBackgroundStyle: { backgroundColor: materialUi_styles_colors.red400 },
                        contentStyle: { backgroundColor: materialUi_styles_colors.red600 },
                        title: 'Sick of forgetting your passwords?',
                        subtitle: 'From now on you\'ll just have to remember one.'
                    }),
                    React.createElement(materialAutoRotatingCarousel.Slide, {
                        media: React.createElement('img', { src: 'img/generate.svg' }),
                        mediaStyle: { width: '50%', margin: '0 auto' },
                        mediaBackgroundStyle: { backgroundColor: materialUi_styles_colors.amber400 },
                        contentStyle: { backgroundColor: materialUi_styles_colors.amber600 },
                        title: 'Auto-generated passwords',
                        subtitle: 'Why come up with new passwords? Let your computer do the work for you!'
                    }),
                    React.createElement(materialAutoRotatingCarousel.Slide, {
                        media: React.createElement('img', { src: 'img/secure.svg' }),
                        mediaStyle: { width: '50%', margin: '0 auto' },
                        mediaBackgroundStyle: { backgroundColor: materialUi_styles_colors.blue300 },
                        contentStyle: { backgroundColor: materialUi_styles_colors.blue600 },
                        title: 'Military grade encryption',
                        subtitle: 'All passwords are encrypted using AES-256.'
                    })
                )
            );

            var start = React.createElement(
                'div',
                { style: {
                        flex: 1,
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        background: materialUi_styles_colors.blueGrey900
                    } },
                React.createElement(
                    'div',
                    { style: {
                            height: '100%',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        } },
                    React.createElement('img', { style: { width: '50%' }, src: 'img/start.svg' })
                ),
                React.createElement(
                    'div',
                    { style: {
                            flex: 1,
                            overflowY: 'scroll'
                        } },
                    React.createElement(AppBar, { style: { position: 'fixed' }, showMenuIconButton: false, title: 'Create Master Password' }),
                    React.createElement(
                        Paper,
                        { style: {
                                flexDirection: 'column',
                                alignItems: 'center',
                                display: 'flex',
                                height: '100%',
                                padding: 20,
                                paddingTop: 90
                            } },
                        React.createElement(
                            'span',
                            null,
                            'Please choose your Master Password - the last one that you\'ll have to remember. We reccomend creating a password by chaining together a bunch of uncommon words. No need for symbols, digits, numbers or uppercase letters.'
                        ),
                        React.createElement(TextField, {
                            style: { marginLeft: 20, marginRight: 20 },
                            name: 'login',
                            fullWidth: true,
                            type: 'password',
                            floatingLabelText: 'Master Password',
                            value: this.state.firstPassword,
                            onChange: this.changeFirstPassword
                        }),
                        React.createElement(TextField, {
                            style: { marginLeft: 20, marginRight: 20 },
                            name: 'firstPassword',
                            fullWidth: true,
                            type: 'password',
                            errorText: !this.state.equal ? 'Passwords are not equal' : '',
                            floatingLabelText: 'Repeat Password',
                            value: this.state.secondPassword,
                            onChange: this.changeSecondPassword
                        }),
                        React.createElement(
                            'div',
                            { style: { display: 'flex', width: '100%', margin: '0 -7px', marginTop: 10 } },
                            React.createElement(
                                'div',
                                { style: { flex: 1, margin: '0 7px' } },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'p',
                                        { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                        'Feedback:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        ' ',
                                        this.state.passwordEval.feedback.warning || 'none',
                                        ' '
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'p',
                                        { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                        'Suggestions:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        ' ',
                                        this.state.passwordEval.feedback.suggestions == '' ? 'none' : this.state.passwordEval.feedback.suggestions,
                                        ' '
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { flex: 1, margin: '0 7px' } },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'p',
                                        { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                        'Crack Time:'
                                    ),
                                    React.createElement(
                                        'p',
                                        null,
                                        ' ',
                                        this.state.passwordEval.crack_times_display.offline_slow_hashing_1e4_per_second,
                                        ' '
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'p',
                                        { style: { fontSize: 13, color: this.props.theme.palette.disabledColor } },
                                        'Strength:'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { display: 'flex', alignItems: 'center' } },
                                        React.createElement(
                                            'span',
                                            { style: { color: colors[this.state.passwordEval.score] } },
                                            ' ',
                                            strength[this.state.passwordEval.score]
                                        ),
                                        React.createElement(
                                            FontIcon,
                                            { style: { marginLeft: 10 }, color: colors[this.state.passwordEval.score], className: 'material-icons' },
                                            faces[this.state.passwordEval.score]
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'span',
                            { style: { margin: 10, marginBottom: 20 } },
                            React.createElement(
                                'strong',
                                null,
                                'Attention:'
                            ),
                            ' You ',
                            React.createElement(
                                'strong',
                                null,
                                'must'
                            ),
                            ' remember you password. If you forget your Master Password, it ',
                            React.createElement(
                                'strong',
                                null,
                                'cannot'
                            ),
                            ' be reset. Without it, your data is ',
                            React.createElement(
                                'strong',
                                null,
                                'impossible'
                            ),
                            ' to retrieve.'
                        ),
                        this.state.equal && this.state.passwordEval.score == 4 ? React.createElement(RaisedButton, {
                            label: 'Login',
                            primary: true,
                            onTouchTap: this.submit
                        }) : React.createElement(RaisedButton, {
                            label: 'Login',
                            primary: true,
                            disabled: true,
                            onTouchTap: this.submit
                        })
                    )
                )
            );
            return this.state.start ? start : carousel;
        }
    }]);
    return Setup;
}(React.Component)) || _class$8);

var _dec$9;
var _class$9;
var _dec2;
var _class2;

//React
//Redux
//React components
/**
* Add-dialog with action buttons. The actions are passed in as an array of React objects
* It should prevent the user from accidently deleting an entry.
* You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
*/

var DeleteDialog = (_dec$9 = reactRedux.connect(function (store) {
    return {
        showDeleteDialog: store.state.showDeleteDialog,
        activeEntry: store.database.activeEntry,
        activePage: store.state.activePage
    };
}), _dec$9(_class$9 = function (_React$Component) {
    inherits(DeleteDialog, _React$Component);

    function DeleteDialog(props) {
        classCallCheck(this, DeleteDialog);

        var _this = possibleConstructorReturn(this, (DeleteDialog.__proto__ || Object.getPrototypeOf(DeleteDialog)).call(this, props));

        _this.cancel = _this.cancel.bind(_this);
        _this.delete = _this.delete.bind(_this);
        return _this;
    }

    //callback for cancel button/ 'Esc' key press/ click outside dialog


    createClass(DeleteDialog, [{
        key: 'cancel',
        value: function cancel() {
            this.props.dispatch(showDeleteDialog(false));
        }

        //callback for delete button

    }, {
        key: 'delete',
        value: function _delete() {
            this.props.dispatch(remove(this.props.activeEntry._id));
            this.props.dispatch(fetch({ type: this.props.activePage.index - 1 }));
            //re-evaluate database, in order to update securityScore
            this.props.dispatch(evaluate());
            this.props.dispatch(showDeleteDialog(false));
            this.props.dispatch(showSingleEntry(false));
            this.props.dispatch(editing(false));
        }
    }, {
        key: 'render',
        value: function render() {
            var actions = [React.createElement(FlatButton, {
                label: 'Cancel',
                primary: true,
                onTouchTap: this.cancel
            }), React.createElement(FlatButton, {
                label: 'Delete',
                primary: true,
                onTouchTap: this.delete
            })];

            return React.createElement(Dialog, {
                title: "Do you want to delete this entry?",
                actions: actions,
                modal: false,
                open: this.props.showDeleteDialog,
                onRequestClose: this.cancel
            });
        }
    }]);
    return DeleteDialog;
}(React.Component)) || _class$9);

/**
* Add-dialog with action buttons. The actions are passed in as an array of React objects
* You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
*/

var AddDialog = (_dec2 = reactRedux.connect(function (store) {
    return {
        showNewDialog: store.state.showNewDialog,
        activeEntry: store.database.activeEntry,
        activePage: store.state.activePage
    };
}), _dec2(_class2 = function (_React$Component2) {
    inherits(AddDialog, _React$Component2);

    function AddDialog(props) {
        classCallCheck(this, AddDialog);

        var _this2 = possibleConstructorReturn(this, (AddDialog.__proto__ || Object.getPrototypeOf(AddDialog)).call(this, props));

        _this2.cancel = _this2.cancel.bind(_this2);
        _this2.add = _this2.add.bind(_this2);
        return _this2;
    }

    //callback for cancel button/ 'Esc' key press/ click outside dialog


    createClass(AddDialog, [{
        key: 'cancel',
        value: function cancel() {
            this.props.dispatch(showNewDialog(false));
            this.props.dispatch(editing(false));
            this.props.dispatch(fetch({ type: this.props.activePage.index - 1 }));
        }

        //callback for add button

    }, {
        key: 'add',
        value: function add() {
            this.props.dispatch(insert(this.props.activeEntry));
            this.props.dispatch(showNewDialog(false));
            this.props.dispatch(editing(false));
            this.props.dispatch(fetch({ type: this.props.activePage.index - 1 }));
            //re-evaluate database, in order to update securityScore
            this.props.dispatch(evaluate());
        }
    }, {
        key: 'render',
        value: function render() {
            var actions = [React.createElement(FlatButton, {
                label: 'Cancel',
                primary: true,
                onTouchTap: this.cancel
            }), React.createElement(FlatButton, {
                label: 'Add',
                primary: true,
                onTouchTap: this.add
            })];

            return React.createElement(
                Dialog,
                {
                    title: 'Add new entry',
                    actions: actions,
                    modal: false,
                    open: this.props.showNewDialog,
                    onRequestClose: this.cancel,
                    autoScrollBodyContent: true
                },
                React.createElement(Entry, null)
            );
        }
    }]);
    return AddDialog;
}(React.Component)) || _class2);

var _dec;
var _class;

// Electron
var BrowserWindow = require('electron').remote.BrowserWindow;

// React
// Redux
// React components
// - Svg Icons
// - Pages
// - Dialogs
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

var Layout = (_dec = reactRedux.connect(function (store) {
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
        hashedMasterPassword: store.state.hashedMasterPassword
    };
}), _dec(_class = function (_React$Component) {
    inherits(Layout, _React$Component);

    function Layout(props) {
        classCallCheck(this, Layout);

        var _this = possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

        _this.activePage = _this.activePage.bind(_this);
        _this.back = _this.back.bind(_this);
        _this.add = _this.add.bind(_this);
        _this.edit = _this.edit.bind(_this);
        _this.delete = _this.delete.bind(_this);
        _this.save = _this.save.bind(_this);
        _this.changeSearch = _this.changeSearch.bind(_this);
        _this.resetSearchQuery = _this.resetSearchQuery.bind(_this);
        _this.content = _this.content.bind(_this);
        return _this;
    }

    //check on application start if config-file exists


    createClass(Layout, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var app = electron.remote.app;
            var appDir = jetpack.cwd(app.getAppPath('userData'));
            var config = appDir.read('../config.json', 'json');
            if (config !== undefined) {
                //check if file exists, if it does, set hashed Master Password
                this.props.dispatch(setHashedMasterPassword(new Buffer(config.masterPassword)));
            }
        }

        //function that sets the active page

    }, {
        key: 'activePage',
        value: function activePage(event, item, index) {
            if (index > 0) this.props.dispatch(fetch({ type: index - 1 }));
            this.props.dispatch(setActivePage(index, item.props.primaryText));
            this.props.dispatch(showSingleEntry(false));
            this.props.dispatch(setSearchState(false));
        }

        //callback for floating action button.

    }, {
        key: 'add',
        value: function add() {
            this.props.dispatch(showSingleEntry(false));
            this.props.dispatch(setSearchState(false));
            //reset active entry
            this.props.dispatch(updateActiveEntry({
                url: '',
                user: '',
                password: '',
                title: '',
                type: 0,
                server: null
            }));
            //show add dialog
            this.props.dispatch(showNewDialog(true));
            this.props.dispatch(editing(true));
        }

        //callback for back-arrow button

    }, {
        key: 'back',
        value: function back() {
            this.props.dispatch(fetch({ type: this.props.activePage.index - 1 }));
            this.props.dispatch(showSingleEntry(false));
            this.props.dispatch(editing(false));
        }

        //callback for search function

    }, {
        key: 'changeSearch',
        value: function changeSearch(event, query) {
            if (this.props.searchState) {
                this.props.dispatch(setSearchQuery(query));
                this.props.dispatch(fetch({ type: this.props.activePage.index - 1, title: new RegExp(query, 'i') })); //i flag so it is case-insensetive
            }
        }

        //callback for close button

    }, {
        key: 'close',
        value: function close() {
            //close window
            BrowserWindow.getFocusedWindow().close();
        }

        //callback if menu item is clicked

    }, {
        key: 'page',
        value: function page() {
            if (this.props.showSingleEntry) return React.createElement(Entry, null);else {
                //depending on active page index, certain components are shown
                switch (this.props.activePage.index) {
                    case 0:
                        return React.createElement(Dashboard, null);
                    case 1:
                        return React.createElement(Database, null);
                    case 2:
                        return React.createElement(Database, null);
                    case 3:
                        return React.createElement(Database, null);
                    case 4:
                        return React.createElement(Settings, null);
                    case 5:
                        return React.createElement(About, null);
                }
            }
        }

        //callback for delete button in app bar

    }, {
        key: 'delete',
        value: function _delete() {
            this.props.dispatch(showDeleteDialog(true));
        }

        //callback for edit button in app bar

    }, {
        key: 'edit',
        value: function edit() {
            this.props.dispatch(editing(true));
            this.props.dispatch(showSingleEntry(true));
        }

        //callback for save button in app bar

    }, {
        key: 'save',
        value: function save() {
            var _props$activeEntry = this.props.activeEntry,
                _id = _props$activeEntry._id,
                entry = objectWithoutProperties(_props$activeEntry, ['_id']);

            this.props.dispatch(update(_id, entry));
            this.props.dispatch(editing(false));
            this.props.dispatch(evaluate());
        }

        //callback for search button

    }, {
        key: 'search',
        value: function search(_search) {
            this.props.dispatch(setSearchState(_search));
            if (!_search) this.props.dispatch(fetch({ type: this.props.activePage.index - 1 }));
        }

        //callback for maximize button

    }, {
        key: 'maximize',
        value: function maximize() {
            //if window is maximized, unmaximize, if not maximize
            if (BrowserWindow.getFocusedWindow().isMaximized()) BrowserWindow.getFocusedWindow().unmaximize();else BrowserWindow.getFocusedWindow().maximize();
        }

        //callback for minimize button

    }, {
        key: 'minimize',
        value: function minimize() {
            //minimize window
            BrowserWindow.getFocusedWindow().minimize();
        }

        //layout of the buttons on the right hand side of the app bar

    }, {
        key: 'rightIcon',
        value: function rightIcon() {
            if (this.props.showSingleEntry) {
                if (!this.props.editing) return React.createElement(
                    IconButton,
                    { onTouchTap: this.edit },
                    React.createElement(
                        FontIcon,
                        { className: 'material-icons' },
                        'edit'
                    )
                );else return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        IconButton,
                        { onTouchTap: this.delete },
                        React.createElement(
                            FontIcon,
                            { color: this.props.theme.palette.alternateTextColor, className: 'material-icons' },
                            'delete'
                        )
                    ),
                    React.createElement(
                        IconButton,
                        { onTouchTap: this.save },
                        React.createElement(
                            FontIcon,
                            { color: this.props.theme.palette.alternateTextColor, className: 'material-icons' },
                            'save'
                        )
                    )
                );
            } else {
                if (0 < this.props.activePage.index && this.props.activePage.index < 4) {
                    return React.createElement(
                        IconButton,
                        { onTouchTap: this.search.bind(this, true) },
                        React.createElement(
                            FontIcon,
                            { className: 'material-icons' },
                            'search'
                        )
                    );
                }
            }
        }

        //callback for the reset button of the search bar

    }, {
        key: 'resetSearchQuery',
        value: function resetSearchQuery() {
            this.props.dispatch(setSearchQuery(''));
            this.props.dispatch(fetch({ type: this.props.activePage.index - 1 }));
        }
    }, {
        key: 'content',
        value: function content() {
            if (!this.props.loaded) {
                //check if database is loaded (user is logged in)
                if (this.props.hashedMasterPassword == null) return React.createElement(Setup, null); //if config file couldn't be found, start setup process
                else return React.createElement(Login, null); //if hashedMasterPassword present, show login
            } else {
                //if logged in, show layout
                return React.createElement(
                    Paper,
                    { style: { flex: 1, display: 'flex', height: '100%', flexDirection: 'row' }, rounded: false },
                    React.createElement(
                        Paper,
                        { rounded: false, style: { zIndex: 1 } },
                        React.createElement(
                            'div',
                            { style: { height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                            React.createElement(
                                FontIcon,
                                { className: 'material-icons', style: { color: this.props.theme.palette.alternateTextColor, borderRadius: 50, background: this.props.theme.palette.primary1Color, padding: 10, fontSize: 70 } },
                                'lock'
                            )
                        ),
                        React.createElement(
                            Menu,
                            { disableAutoFocus: true, onItemTouchTap: this.activePage },
                            React.createElement(MenuItem, { primaryText: 'Dashboard', leftIcon: React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'dashboard'
                                ), rightIcon: this.props.securityScore.count > 0 && React.createElement(Badge, { badgeContent: this.props.securityScore.count, secondary: true }) //display number of issues in badge
                            }),
                            React.createElement(MenuItem, { primaryText: 'Logins', leftIcon: React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'lock_outline'
                                ) }),
                            React.createElement(MenuItem, { primaryText: 'Email Accounts', leftIcon: React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'mail_outline'
                                ) }),
                            React.createElement(MenuItem, { primaryText: 'Credit Cards', leftIcon: React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'credit_card'
                                ) }),
                            React.createElement(MenuItem, { primaryText: 'Settings', leftIcon: React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'settings'
                                ) }),
                            React.createElement(MenuItem, { primaryText: 'About', leftIcon: React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'face'
                                ) })
                        ),
                        React.createElement(
                            'div',
                            { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' } },
                            React.createElement(
                                FloatingActionButton,
                                { onTouchTap: this.add, secondary: true, style: { position: 'relative', left: 25 } },
                                React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'add'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { flex: 1, flexDirection: 'column', display: 'flex' } },
                        this.props.searchState ? React.createElement(
                            Paper,
                            { style: { zIndex: 1, padding: 10, paddingTop: 6, display: 'flex' } },
                            React.createElement(
                                IconButton,
                                { onTouchTap: this.search.bind(this, false) },
                                React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'arrow_back'
                                )
                            ),
                            React.createElement(TextField, {
                                value: this.props.searchQuery,
                                onChange: this.changeSearch,
                                ref: function ref(input) {
                                    input && input.focus();
                                },
                                style: { marginLeft: 20, marginRight: 20 },
                                fullWidth: true,
                                name: 'searchfield'
                            }),
                            this.props.searchQuery !== '' && React.createElement(
                                IconButton,
                                { onTouchTap: this.resetSearchQuery },
                                React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'close'
                                )
                            )
                        ) : React.createElement(AppBar, {
                            iconElementLeft: this.props.showSingleEntry ? React.createElement(
                                IconButton,
                                { onTouchTap: this.back },
                                React.createElement(
                                    FontIcon,
                                    { className: 'material-icons' },
                                    'arrow_back'
                                )
                            ) : null,
                            showMenuIconButton: this.props.showSingleEntry,
                            iconElementRight: this.rightIcon(),
                            title: this.props.showSingleEntry ? this.props.activeEntry.title : this.props.activePage.title
                        }),
                        React.createElement(
                            'div',
                            { style: { flex: 1, padding: 20, overflowX: 'hide', overflowY: 'scroll', background: this.props.theme.palette.secondaryCanvasColor } },
                            React.createElement(
                                Paper,
                                { style: { padding: 20 } },
                                this.page()
                            )
                        )
                    )
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var styles = {
                smallIcon: {
                    width: 20,
                    height: 20,
                    color: this.props.theme.palette.alternateTextColor
                },
                small: {
                    width: 30,
                    height: 30,
                    padding: 5,
                    WebkitAppRegion: 'no-drag'
                }
            };
            return React.createElement(
                MuiThemeProvider,
                { muiTheme: getMuiTheme(this.props.theme) },
                React.createElement(
                    'div',
                    { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
                    React.createElement(
                        'div',
                        { style: {
                                height: 30,
                                WebkitAppRegion: 'drag', //make window dragable
                                backgroundColor: this.props.theme.palette.primary2Color,
                                display: 'flex',
                                justifyContent: 'flex-end'
                            } },
                        React.createElement(
                            IconButton,
                            {
                                iconStyle: styles.smallIcon,
                                style: styles.small,
                                onTouchTap: this.minimize },
                            React.createElement(RemoveIcon, null)
                        ),
                        React.createElement(
                            IconButton,
                            {
                                iconStyle: styles.smallIcon,
                                style: styles.small,
                                onTouchTap: this.maximize },
                            React.createElement(AddIcon, null)
                        ),
                        React.createElement(
                            IconButton,
                            {
                                iconStyle: styles.smallIcon,
                                style: styles.small,
                                onTouchTap: this.close },
                            React.createElement(CloseIcon, null)
                        )
                    ),
                    this.content(),
                    React.createElement(DeleteDialog, null),
                    React.createElement(AddDialog, null)
                )
            );
        }
    }]);
    return Layout;
}(React.Component)) || _class);

/*
 *  Passwordmanager
 *
 *  Created by Ivo Koller
 *  15.5.2017
 *
 */

// Here is the starting point of the application code.

// Needed for redux-saga es6 generator support
// Helpers
//React
//React-Components
// This dependency by Material-UI is temporary and will eventually go away
// http://stackoverflow.com/a/34015469/988941

// Initialize onTouchTap
injectTapEventPlugin();

ReactDOM.render(React.createElement(
    reactRedux.Provider,
    { store: store },
    React.createElement(Layout, null)
), document.getElementById('app'));

}());
//# sourceMappingURL=app.js.map