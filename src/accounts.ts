// NOTE - yes, ik the entire codebase so far has been in 2 indent but uh i like 4 indent

import { v4 as genID } from "npm:uuid";

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

async function loadIfExists (name: string, contents: string) {
    try {
        return await Deno.readTextFile(name);
    } catch {
        await Deno.writeTextFile(name, contents);
        return contents;
    }
};

function Uint8ify(text: string): Uint8Array {
    const numarr: number[] = text.split('').map<number>((char: string): number => {return char.charCodeAt(0)});
    return Uint8Array.from(numarr)
}

// Bsicaly says that the object will have keys of string and values of user
export const users: {[key: string]: User} = JSON.parse(await loadIfExists("data/users.json", "{}"));
const creds: {[key: string]: User} = JSON.parse(await loadIfExists("data/creds.json", "{}"));

function syncDBs(): void {
    Deno.writeFileSync("data/users.json", Uint8ify(JSON.stringify(users)))
    Deno.writeFileSync("data/creds.json", Uint8ify(JSON.stringify(creds)))
}

// why cant i just use {} to mean empty object
export function getUser(id: string): User | Record<string | number | symbol, never> {
    if(!users[id]) return {};
    return users[id];
}

export function createUser(username: string, password: string) {
    if(Object.values(users).find(u => u.name == username)) throw new Error("Account already exists");
    const user: User = {
        name: username,
        friends: [],
        bestfriends: [],
        creationdate: Number(new Date()),
        displayname: username,
        seedid: 0 // TODO: figure out what this is
    };
    const id = genID();
    users[id] = user;
    syncDBs()
}