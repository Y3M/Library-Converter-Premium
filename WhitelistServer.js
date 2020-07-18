const Express = require("express");
const App = Express();

const Keys = ["Key_Z", "gay"]; // our key database of course you can replace it with a query prepared request to a mysql data base or mongodb
const secretKey2 = "Z&6^^^^@^&@#aad^&535#&@^#&*&@#33355[a}addd3aad4*$&@*$*@$@5Bdadadsad";
const Crypto = require("crypto");

function hmac(secret, data){
    const hash = Crypto.createHash("sha512");
    hash.update(secret + data + secret);
    return hash.digest("hex").toString();
};

App.get("/checkWhitelist", (request, response) => {
    const Key = request.query.Key;
    const Gamer = request.query.gamer;

    if(Key && Gamer){
        const isKeyValid = Keys.find((key) => key !== null && Key == key);

        if(isKeyValid){
            response.send(hmac(secretKey2, Key + Gamer)) // we'll send the data of the whitelist response to the client once the key is valid
        }
        else{
            response.send("Not Whitelisted");
        }
    }
    else{
        response.send("Not Whitelisted");
    }
});

App.listen(80, () => {
    console.log("App started");
});