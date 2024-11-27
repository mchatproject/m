import * as accounts from "./src/accounts.ts";
import { assert, assertThrows } from "jsr:@std/assert";
import DB from "./src/lib/db.ts";

Deno.test({
    name: "test min name",

    fn: ()=> {
        assertThrows(() => {
            accounts.createUser("", "password", false)
        }, "createUser() accepted account name of 0 length")
    }
})

Deno.test({
    name: "test max name",

    fn: ()=> {
        assertThrows(() => {
            accounts.createUser("a".repeat(100), "password", false)
        }, "createUser() accepted account name of 100 length")
    }
})

Deno.test({
    name: "test min password",

    fn: ()=> {
        assertThrows(() => {
            accounts.createUser("_", "p", false)
        }, "createUser() acceptd account password of 1 length")
    }
})

Deno.test({
    name: "test account exist",

    fn: ()=> {
        const testDBs = {
            user: new DB<accounts.User>("", false),
            creds: new DB<accounts.UserCreds>("", false)
        }
        assertThrows(() => {
            accounts.createUser("user1", "password", true, testDBs.user, testDBs.creds)
            accounts.createUser("user1", "password", true, testDBs.user, testDBs.creds)
        }, "createUser() acceptd account wit name dat alr existing")
    }
})


Deno.test({
    name: "test account creation",

    fn: ()=> {
        const testDBs = {
            user: new DB<accounts.User>("", false),
            creds: new DB<accounts.UserCreds>("", false)
        }
        accounts.createUser("user1", "password", true, testDBs.user, testDBs.creds)
        assert(accounts.getUser('user1', testDBs.user).name == 'user1')
        assert(accounts.checkPassword('user1', 'password', testDBs.creds))
    }
})