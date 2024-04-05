const nodemailer = require("nodemailer");
require("dotenv").config();
 const { google } = require("googleapis");
 const OAuth2 = google.auth.OAuth2;
const schedule = require('node-schedule');

const emailSubject= ["Constituent Demand: SUDAN - IMMEDIATE CEASEFIRE", "Constituent Demand: GAZA - IMMEDIATE CEASEFIRE"]
const emailMessage= ["It's important to highlight the dire situation in Sudan and the urgent need for humanitarian assistance and international intervention. Your detailed summary of the conflict, its impact on civilians, and the demands for action are clear and compelling. Here's a recap of your key points and demands: <br><br>1. <b>**Appointment of a Special Envoy:**</b> The U.S. should appoint a Special Envoy for Sudan to prioritize negotiations for humanitarian assistance, peace talks, and engagement with neighboring countries.<br><br>2. <b>**Immediate Ceasefire:**</b> There should be strong international pressure for an immediate ceasefire, monitoring mechanisms, safe corridors for aid, and the resumption of aid operations.<br><br>3. <b>**Increased Aid to NGOs:**</b> The U.S. government should provide more support to NGOs operating in Sudan, focusing on food and medical aid distribution to address the looming famine and healthcare crises.<br><br>4. <b>**Enforcement of Arms Regulations:**</b> Strict enforcement of the Arms Export Control Act and other regulations to prevent the export of military items to Sudan, including measures against illicit arms flows to non-state actors.<br><br>5. <b>**Expansion of UN Arms Embargo:**</b> Work at the international level to expand the UN arms embargo on Sudan and consider additional sanctions against key individuals and human rights violators.<br><br>These demands underscore the urgency of the situation in Sudan and the moral responsibility of the international community, including the United States, to act swiftly and decisively to alleviate suffering and promote peace.",
    "<b>Immediate Ceasefire Needed:</b> <br><br>The UN Security Council has just passed a binding resolution for an immediate pause during Ramadan followed by a lasting sustainable ceasefire. At this critical moment, I urge you as my elected representative to take immediate action to ensure Israel complies with this resolution. The U.S. government must fulfill its obligation to <b>suspend weapons transfers to Israel and enforce all U.S. laws violated by Israel</b>, in order to finally <b>end the genocide</b>. I am deeply concerned about the ongoing situation in Gaza: the atrocities committed against Palestinian women, refugees deliberately starved, injured children subjected to amputations without anesthesia, families shot dead by snipers, and individuals tortured in concentration camps. The mass graves, field executions, and other war crimes must be addressed urgently.It is UNDENIABLE that this is GENOCIDE. <br><br>My tax dollars should not be funding Israel's mass killings of over 40,000 Palestinian people, including thousands of children.To stop this genocide, we need a <b>PERMANENT CEASEFIRE NOW</b>, as supported by a <b>67% majority of the American public</b>. Why have you not yet taken this absolute bare minimum step to call for a permanent ceasefire? <br><br>AS YOUR CONSTITUENT and a supporter of the US Campaign for Palestinian Rights (USCPR), I demand that you stop arming and enabling Israel's massive violence. It's extremely urgent, as Israel kills another Palestinian person every four minutes. You must immediately take steps to deescalate by:<br><br><b>Calling for a total and permanent ceasefire. You can start by cosponsoring the Ceasefire Now resolution H.Res. 786, led by Rep. Cori Bush.<br><br>Restoring funding to the UNRWA aid agency for Palestinian refugees and pressuring Israel to allow humanitarian aid to enter Gaza.<br><br>Ending Israel's siege on Gaza.<br><br>Stopping the U.S. bombing of Yemen.<br><br>Halting any further weapons or funding to the Israeli military.</b><br><br> The Biden administration's promises to send more weapons and military funding to Israel only perpetuate the cycle of violence. I urge you to take immediate action to bring about peace and justice in the region."]
var i = 0;
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
    const mailOptions0 = {
      from: process.env.USER_EMAIL,
      to: ['craig_carbone@rickscott.senate.gov', 'John.Rutherford@mail.house.gov', 'marco_rubio@rubio.senate.gov'],
      subject: emailSubject[0],
      html: emailMessage[0],
    }

    const mailOptions1 = {
      from: process.env.USER_EMAIL,
      to: ['craig_carbone@rickscott.senate.gov', 'John.Rutherford@mail.house.gov', 'marco_rubio@rubio.senate.gov'],
      subject: emailSubject[1],
      html: emailMessage[1],
    }

    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions0);
    await emailTransporter.sendMail(mailOptions1);
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

// schedule.scheduleJob('*/1 * * * *', function(){
//   // if(i > 1){
//   //   i=0;
//   // }
  
//   console.log('Running task every 1 minutes');
//   sendMail();
//   // i++;
// });

sendMail().catch(console.error);
console.log('Running task every 1 minutes');
