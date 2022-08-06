import * as Knex from 'knex';
var axios = require("axios").default;
const line = require('@line/bot-sdk');
export class RequestModel {

  saveRequest(db: Knex, data: any) {
    return db('requests')
      .insert(data);
  }

  saveStatus(db: Knex, data: any) {
    return db('line_status')
      .insert(data);
  }

  getProfile(userId) {
    var options = {
      method: 'GET',
      url: `https://api.line.me/v2/bot/profile/${userId}`,
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    };
    return new Promise<void>((resolve, reject) => {
      axios.request(options).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(error);
      });

    })
  }

  sendMessage(userId, token, msg) {
    const client = new line.Client({
      channelAccessToken: token
    });

    const message = {
      type: 'text',
      text: msg
    };

    client.pushMessage(userId, message)
      .then(() => {
        console.log('success');

      })
      .catch((err) => {
        console.log(err);

        // error handling
      });
  }
}