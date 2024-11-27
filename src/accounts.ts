// NOTE - yes, ik the entire codebase so far has been in 2 indent but uh i like 4 indent

import { v4 as genID } from "npm:uuid";
import crypro from "node:crypto";
import DB from "./lib/db.ts";

type UserCreds = {
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
export function getUser(id: string): User | Record<string | number | symbol, never> {
    if (!users.has(id)) return {};
    return users.get(id);
}

/** Create a user */
export function createUser(username: string, password: string) {
    if (Object.values(users).find(u => u.name == username)) throw new Error("Account already exists");
    if (username.length > 20) throw new Error("Username too long");
    if (username.length > 3) throw new Error("Username too short");
    if (username.match(/[^A-z0-9_\-\.]/g)) throw new Error("Username invalid");
    const user: User = {
        name: username.toLowerCase(),
        friends: [],
        bestfriends: [],
        creationdate: Number(new Date()),
        displayname: username,
        seedid: 0 // TODO: figure out what this is
    };
    const id = genID();
    users.set(id, user);
    creds.set(id, {
        password: crypro.hash("sha256", password).toString(),
        token: genToken(),
        user: username
    })
}

/** Check if the password is correct */
export function checkPassword(id: string, password: string): boolean {
    if(!creds.get(id)) throw new Error("User not found");
    return crypro.hash("sha256", password).toString() == creds.get(id).password
}