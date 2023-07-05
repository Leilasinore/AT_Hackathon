const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 6000;

const credentials = {
  apiKey: "7db1332f466b50786e014280969d112dab1362b0eb1a14f36eecea7a998988c1",
  username: "Novaappcooluser",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/ussd", (req, res) => {
  const { phoneNumber, text } = req.body;

  if (text === "") {
    console.log("hjhhjk")

    response = `CON Welcome To Shamba Support
        1. Vaccinate
        2. Consult`;

  } else if (text === "1") {
    console.log("jkjkjk");

    response = `CON Pick a location and time
        1. Nairobi 2nd July
        2. Mombasa 2nd August
        3. Kisumu 2nd December`;
  }
  else if (text === "1*1") {
     response = `CON These are the available slots
           1.Monday 10am
           2.Tuesday 11am
           3.Wednesday 12pm
           4.Thursday 1pm
           5.Friday 2pm
           6. Saturday 3pm `;
     } else if (text.startsWith("1*1*")) {
      // Extract the selected day and time from the user input
      const selectedSlot = text.split("*")[2];
      const slots = [
        "Monday 10am",
        "Tuesday 11am",
        "Wednesday 12pm",
        "Thursday 1pm",
        "Friday 2pm",
        "Saturday 3pm",
      ];

      // Check if the selected slot number is valid
      const slotIndex = parseInt(selectedSlot) - 1;
      if (slotIndex >= 0 && slotIndex < slots.length) {
        const selectedSlotValue = slots[slotIndex];

        console.log(selectedSlotValue);

        // Call the function to send the SMS with the selected slot information
        sendsms(selectedSlotValue);

        // Provide a response to the user
        response = `END You have selected an appointment for ${selectedSlotValue}. You will receive a confirmation SMS shortly.`;
      } else {
        response = `END Invalid slot selection. Please try again.`;
      }
    }

    function sendsms(selectedSlotValue) {
      const credentials = {
        apiKey:
          "7db1332f466b50786e014280969d112dab1362b0eb1a14f36eecea7a998988c1",
        username: "Novaappcooluser",
      };
      const AfricasTalking = require("africastalking")(credentials);
      const sms = AfricasTalking.SMS;

      const message = `Your appointment has been booked for ${selectedSlotValue}
                       June updates: `;

      // Send the SMS
      const options = {
        to: phoneNumber,
        message: message,
      };

      sms
        .send(options)
        .then((response) => {
          console.log("SMS sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending SMS:", error);
        });
    }

  if (text === "2") {
    console.log("wwwwwww");

    response = `END you will receive a call shortly `;
  }

  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
