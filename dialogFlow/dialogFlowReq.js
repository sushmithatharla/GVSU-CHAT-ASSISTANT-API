"use strict";
const dialogflow = require("dialogflow");
const mongoose = require("mongoose");
const config = require("../config/keys");

const projectID = config.googleProjectID;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

const ContactInfo = mongoose.model("contactInfo");
const Feedback = mongoose.model("feedback");

module.exports = {
  textQuery: async (text, param = {}) => {
    let self = module.exports;
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: text,
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLangugaeCode,
        },
      },
      queryParams: {
        payload: {
          data: param,
        },
      },
    };

    let response = await sessionClient.detectIntent(request);
    response = await self.handleResponse(response);
    return response;
  },
  handleResponse: (response) => {
    return response;
  },
  saveContactInfo: async (cntctInfo) => {
    const newDate = new Date();
    const contactInfo = new ContactInfo({
      fullName: cntctInfo.fullName,
      email: cntctInfo.email,
      phone: cntctInfo.phone,
      question: cntctInfo.question,
      date: newDate.toISOString(),
    });

    try {
      let info = await contactInfo.save();
      response = await self.handleResponse(info);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getAllContactInfo: async () => {
    try {
      let info = await ContactInfo.find();
      info.sort((a, b) => b.date.toString().localeCompare(a.date.toString()));
      info.forEach((record) => {
        let realDate = new Date(record.date.toString());
        record["date"] = `${
          realDate.getMonth() + 1
        }-${realDate.getDate()}-${realDate.getFullYear()}`;
      });
      return info;
    } catch (error) {
      console.log(error);
    }
  },
  saveFeedback: async (ratingObj) => {
    const feedback = new Feedback({
      rating: ratingObj.rating,
      date: Date.now(),
    });

    try {
      let info = await feedback.save();
      response = await self.handleResponse(info);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
