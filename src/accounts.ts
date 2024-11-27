// NOTE - yes, ik the entire codebase so far has been in 2 indent but uh i like 4 indent
// ok

import { v4 as genID } from "npm:uuid";
import crypro from "node:crypto";
import DB from "./lib/db.ts";
import { config } from "./config.ts";

export type UserCreds = {
    user: string;
    token: string; // resets every time the password is reset
    password: string; // maybe dont make this the actual password and instead make it a sha256 or smth idk
}

// secret:
// mayonnaise prime
export type User = {
    name: string;
    seedid: number; // ui shit
    displayname: string;
    friends: string[];
    bestfriends: string[];
    creationdate: number;
    //TODO - add more stuff to the type
};

// Bsicaly says that the object will have keys of string and values of user
export const users: DB<User> = new DB<User>("data/users.json");
const creds: DB<UserCreds> = new DB<UserCreds>("data/creds.json");

/** Genertes a token */
function genToken(): string {
    return crypro.hash('sha256', crypro.randomBytes(15))
}

// why cant i just use {} to mean empty object
/** Get a user by their uuid */
export function getUser(id: string, _users: DB<User>=users): User | Record<string | number | symbol, never> {
    if (!_users.has(id)) return {};
    return _users.get(id);
}

/** Create a user */
export function createUser(username: string, password: string, write:boolean=true, _users: DB<User>=users, _creds: DB<UserCreds>=creds) {
    if (Object.values(_users).find(u => u.name == username)) throw new Error("Account already exists");
    if (username.length > config.accounts['max-name-length']) throw new Error("Username too long");
    if (username.length < config.accounts['min-name-length']) throw new Error("Username too short");
    if (password.length < config.accounts['min-pswd-length']) throw new Error("Password too short");
    if (username.match(new RegExp(config.accounts.regex, 'g'))) throw new Error("Username invalid");
    const user: User = {
        name: username.toLowerCase(),
        friends: [],
        bestfriends: [],
        creationdate: Number(new Date()),
        displayname: username,
        seedid: 0 // TODO: figure out what this is
    };
    const id = genID();
    if (!write) return {user, creds}
    _users.set(id, user);
    _creds.set(id, {
        password: crypro.hash("sha256", password).toString(),
        token: genToken(),
        user: username
    })
}

/** Check if the password is correct */
export function checkPassword(id: string, password: string, _creds: DB<UserCreds>=creds): boolean {
    if(!_creds.get(id)) throw new Error("User not found");
    return crypro.hash("sha256", password).toString() == _creds.get(id).password
}