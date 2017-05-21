import crypto from 'crypto';

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
    masterPassword: null,
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

export function hashPassword(password, callback) {
    // generate a salt for pbkdf2
    crypto.randomBytes(config.saltBytes,
        function(err, salt) {
            if (err) {
                return callback(err);
            }

            crypto.pbkdf2(password, salt, config.iterations, config.hashBytes,
                function(err, hash) {

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
                }
            );
        }
    );
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

export function verifyPassword(password, combined, callback) {
    // extract the salt and hash from the combined buffer
    var saltBytes = combined.readUInt32BE(0);
    var hashBytes = combined.length - saltBytes - 8;
    var iterations = combined.readUInt32BE(4);
    var salt = combined.slice(8, saltBytes + 8);
    var hash = combined.toString('binary', saltBytes + 8);

    // verify the salt and hash against the password
    crypto.pbkdf2(password, salt, iterations, hashBytes, function(err, verify) {
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

export function encrypt(text){
  var cipher = crypto.createCipher(config.algorithm, config.masterPassword)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

/**
* Decrypt string using algorithm and password supplied by config object
* @param {String} text ciphertext
* @return {String} plaintext
*/

export function decrypt(text){
  var decipher = crypto.createDecipher(config.algorithm, config.masterPassword)
  var dec = decipher.update(text,'hex','utf8')
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

export function generatePassword(numLc, numUc, numDigits, numSpecial) {
    numLc = numLc || 4;
    numUc = numUc || 4;
    numDigits = numDigits || 4;
    numSpecial = numSpecial || 2;

    var lcLetters = 'abcdefghijklmnopqrstuvwxyz';
    var ucLetters = lcLetters.toUpperCase();
    var numbers = '0123456789';
    var special = '!?=#*$@+-.()<>';

    var pass = [];
    for(var i = 0; i < numLc; ++i) { pass.push(getRand(lcLetters)); }
    for(var i = 0; i < numUc; ++i) { pass.push(getRand(ucLetters)); }
    for(var i = 0; i < numDigits; ++i) { pass.push(getRand(numbers)); }
    for(var i = 0; i < numSpecial; ++i) { pass.push(getRand(special)); }

    return shuffle(pass).join('');
};

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
    var m = array.length, t, i;
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

export function setMasterPassword(password){
    config = {...config, masterPassword: password};
}
