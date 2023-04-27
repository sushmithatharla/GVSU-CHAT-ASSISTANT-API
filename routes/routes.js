const dialogFlowReq = require("../dialogFlow/dialogFlowReq");

module.exports = (app) => {
  // dialogflow route
  app.post("/api/df_text_query", async (req, res) => {
    let response = await dialogFlowReq.textQuery(
      req.body.text,
      req.body.params
    );
    res.send(response[0].queryResult);
  });

  // save contact info route
  app.post("/api/saveContactInfo", async (req, res) => {
    let response = await dialogFlowReq.saveContactInfo(req.body);
    res.send(response);
  });

  app.get("/api/getAllContactInfo", async (req, res) => {
    let response = await dialogFlowReq.getAllContactInfo();
    res.send(response);
  });

  // save feedback
  app.post("/api/saveFeedback", async (req, res) => {
    let response = await dialogFlowReq.saveFeedback(req.body);
    res.send(response);
  });
};
