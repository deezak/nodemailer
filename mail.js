const nodemailer = require("nodemailer");
require("dotenv").config();
 const { google } = require("googleapis");
 const OAuth2 = google.auth.OAuth2;
const schedule = require('node-schedule');


const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });

      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log("*ERR: ", err)
            reject();
          }
          resolve(token); 
        });
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.USER_EMAIL,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
        },
      });
      return transporter;
  } catch (err) {
    return err
  }
};

const sendMail = async () => {
  try {
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: "dina.m.zakaria@gmail.com",
      subject: "Test",
      text: "Hi, this is a test email",
    }

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions);
  } catch (err) {
    console.log("ERROR: ", err)
  }
};


// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: 'dina.m.zakaria@gmail.com', // sender address
//     to: 'dina.m.zakaria@gmail.com', // list of receivers
//     subject: "Hello to Myself", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.envelope);
//   console.log("")
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

schedule.scheduleJob('*/1 * * * *', function(){
  console.log('Running task every 1 minutes');
  sendMail();
});

sendMail().catch(console.error);
