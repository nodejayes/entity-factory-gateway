const path = require('path');
const fs = require('fs');

let adminPassword = null;
const AUTHENTICATION_PATH = path.join(process.cwd(), '_auth');
const RIGHTS_FILE = path.join(AUTHENTICATION_PATH, '_rights.json');
const USERS_PATH = path.join(AUTHENTICATION_PATH, 'users');
const GROUPS_PATH = path.join(AUTHENTICATION_PATH, 'groups');
const ADMIN_GROUP_FILE = path.join(GROUPS_PATH, 'admin.json');

function createIfNotExists(something, type, content = '') {
    if (type === 'folder') {
        fs.mkdirSync(something, {recursive: true});
    } else if (type === 'file') {
        fs.writeFileSync(something, content);
    }
}

function setupAuthentication(password) {
    if (!password) {
        return;
    }
    adminPassword = password;
    createIfNotExists(AUTHENTICATION_PATH, 'folder');
    createIfNotExists(USERS_PATH, 'folder');
    createIfNotExists(GROUPS_PATH, 'folder');
    createIfNotExists(RIGHTS_FILE, 'file', '[]');
    createIfNotExists(ADMIN_GROUP_FILE, 'file', '{"rights":["createUser", "deleteUser", "createRight", "deleteRight", "createGroup", "deleteGroup"]}');
}

function getUserData(user, password) {
    const userFile = path.join(USERS_PATH, `${user}.json`);
    if (!fs.existsSync(userFile)) {
        return null;
    }
    const data = JSON.parse(fs.readFileSync(userFile).toString());
    if (data.password !== password) {
        return null;
    }
    return {
        ...data,
        password: undefined,
    }
}

function readUserData(user, password) {
    if (user === 'admin' && password === adminPassword) {
        return {
            username: 'admin',
            groups: {
                admin: JSON.parse(fs.readFileSync(ADMIN_GROUP_FILE).toString()),
            },
        };
    }
    return getUserData(user, password);
}

module.exports = {setupAuthentication, readUserData};
