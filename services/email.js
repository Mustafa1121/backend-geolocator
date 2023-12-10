const nodemailer = require("nodemailer");

class Email {
  constructor(email, url="") {
    this.to = email;
    this.url = url;
    this.from = `IT-PLUS`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: template
    };
    // 3) Create a transport and send email
    try{
      await this.newTransport().sendMail(mailOptions);
      console.log("email sent")
    }catch(err){
      console.log(err)
    }
    
  }

  async sendGeoLocationResult(geolocationData) {
    const subject = "Geolocation Results"
    const text= `Latitude: ${geolocationData.latitude}, Longitude: ${geolocationData.longitude}`

    await this.send(text, subject);
  }

}

module.exports = Email;
