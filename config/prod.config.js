module.exports = {
    googleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID,
    dialogFlowSessionLangugaeCode: process.env.DIALOGFLOW_SESSION_LANGUAGE_CODE,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey:JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
    mongoDbURI: process.env.MONGO_DB_URI
}