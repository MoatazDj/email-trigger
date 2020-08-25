const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const TOKEN_DIR = __dirname;
const TOKEN_PATH = TOKEN_DIR + "/gmail-nodejs-quickstart.json"; // Specify the access token file
function listMessages(query) {
  return new Promise(async (resolve, reject) => {
    let content = await readFileAsync(__dirname + "/client_secret.json");
    const credentials = JSON.parse(content); // credential
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
    const token = await readFileAsync(TOKEN_PATH);
    oauth2Client.credentials = JSON.parse(token);
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    gmail.users.threads.list(
      {
        userId: "me",
        q: query,
      },
      (err, res) => {
        if (err) {
          console.log("err");
          reject(err);
          return;
        }
        if (!res.data) {
          resolve([]);
          return;
        }
        resolve(res.data);
      }
    );
  });
}
module.exports = listMessages;
