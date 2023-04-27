import React, { useEffect, useRef, useState } from "react";
import useFetch from "use-http";
import "./ChatBox.css";
import ChatLogo from "../../images/chat-assistant-logo.png";
import UserLogo from "../../images/user-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faLongArrowLeft,
  faClose,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Feedback from "../feedback/Feedback";

const ChatBox = ({ showContactForm, showBotFlag, closeChatFlag }) => {
  const messageEl = useRef(null);
  const { get, post, response, loading, error } = useFetch(
    "https://calm-anchorage-89848.herokuapp.com/api"
  );

  const getTime = () => {
    const date = new Date();
    return date.getHours() + ":" + date.getMinutes();
  };

  const closeBot = () => {
    setShowBot(false);
    setFeedbackFlag(false);
  };

  const [inputValue, setInputValue] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [messages, setMessages] = useState(
    sessionStorage.getItem("messages")
      ? JSON.parse(sessionStorage.getItem("messages"))
      : [
          {
            type: "api",
            text: "Hello! Welcome to GVSU Chat Assistant. How may I help you today?",
            time: getTime(),
            showContactInfoFlag: false,
          },
        ]
  );
  const [renderMessages, setRenderMessages] = useState([]);
  const [feedbackFlag, setFeedbackFlag] = useState(false);

  useEffect(() => {
    if (showBotFlag) {
      setShowBot(true);
    } else {
      setShowBot(false);
    }
  }, [showBotFlag]);

  const sendMessage = async (userInput) => {
    const newMessages = await post("/df_text_query", { text: userInput.text });
    const showContactInfoFlag =
      newMessages.action === "input.unknown" ? true : false;
    const newMessageArray = newMessages.fulfillmentMessages.map((message) => {
      return {
        type: "api",
        text: message.text.text,
        time: getTime(),
        showContactInfoFlag,
      };
    });

    setMessages([...messages, ...[userInput], ...newMessageArray]);
  };

  const send = () => {
    const userInput = {
      type: "user",
      text: inputValue.trim(),
      time: getTime(),
      showContactInfoFlag: false,
    };
    if (userInput.text.trim() !== "") {
      setMessages([...messages, ...[userInput]]);
      setInputValue("");
      sendMessage(userInput);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("messages", JSON.stringify(messages));
    setRenderMessages(messages);
  }, [messages]);

  const renderText = (text, type) => {
    let textValue = text;
    let urlValue = "";
    if (type === "api" && typeof text === "object") {
      const urlIndex = text[0].indexOf("https");
      textValue = text[0].slice(0, urlIndex);
      urlValue = text[0].slice(urlIndex, text[0].length);
    }

    return (
      <span>
        <p className={type}>{textValue}</p>
        <a href={urlValue} className="reply-link" target="_blank">
          {urlValue}
        </a>
      </span>
    );
  };

  const userMessage = (props) => {
    const { text, type, time } = props;
    return (
      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
            {renderText(text, type)}
          </p>
          <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
            {time}
          </p>
        </div>
        <img
          src={UserLogo}
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);

  const closeChat = () => {
    sessionStorage.removeItem("messages");
    setMessages([
      {
        type: "api",
        text: "Hello! Welcome to GVSU Chat Assistant. How may I help you today?",
        time: getTime(),
        showContactInfoFlag: false,
      },
    ]);
    setFeedbackFlag(true);
  };

  const navToContactInfo = () => {
    showContactForm(true);
  };

  const autoMessage = (props) => {
    const { text, type, time, showContactInfoFlag } = props;
    return (
      <div className="d-flex flex-row justify-content-start">
        <img
          src={ChatLogo}
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        />
        <div>
          <p
            className="small p-2 ms-3 mb-1 rounded-3"
            style={{ backgroundColor: "#f5f6f7", fontWeight: 700 }}
          >
            {showContactInfoFlag ? (
              <span>
                Unfortunately I coudnt get the answer for the question you have
                asked. Please{" "}
                <a className="reply-link" onClick={() => navToContactInfo()}>
                  <span className="click-here">click here</span>
                </a>{" "}
                to fill out the Contact Information form with your question and
                we will get back to you in 1 - 2 business days
              </span>
            ) : (
              renderText(text, type)
            )}
          </p>
          <p className="small ms-3 mb-3 rounded-3 text-muted">{time}</p>
        </div>
      </div>
    );
  };

  const message = (props) => {
    const { type } = props;

    return type === "user" ? userMessage(props) : autoMessage(props);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      send();
    }
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      setInputValue("");
    }
  };

  return (
    <div className="chat-container">
      <section>
        <div className="container py-5" id="container-align">
          {showBot ? (
            <div
              className="row d-flex justify-content-center"
              id="align-chat-window"
            >
              <div className="col-md-10 col-lg-8 col-xl-6">
                <div className="card" id="chat2">
                  <div
                    className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                    id="card-header-styles"
                    style={{
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  >
                    <FontAwesomeIcon
                      id="arrow-left"
                      icon={faLongArrowLeft}
                      size="2x"
                    />
                    <p className="mb-0 fw-bold">Chat Assistant</p>
                    <FontAwesomeIcon
                      id="close"
                      icon={faClose}
                      size="2x"
                      onClick={() => closeChat()}
                    />
                  </div>
                  <div
                    className="card-body"
                    ref={messageEl}
                    data-mdb-perfect-scrollbar="true"
                    style={{ position: "relative", height: "400px" }}
                  >
                    {feedbackFlag ? (
                      <Feedback
                        closeChatFlag={closeChatFlag}
                        closeBot={closeBot}
                      />
                    ) : (
                      renderMessages.map((msg) => message(msg))
                    )}
                  </div>
                  <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                    <img
                      src={UserLogo}
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                    <textarea
                      type="text"
                      className="form-control form-control-lg text-area-style"
                      id="exampleFormControlInput1"
                      placeholder="Type Your Question Here"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onKeyUp={handleKeyUp}
                    ></textarea>
                    <a className="ms-1 text-muted" href="#!" onClick={send}>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        size="2x"
                        className="send-message"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span>
              <span className="chat-icon-text" onClick={() => setShowBot(true)}>
                <FontAwesomeIcon
                  icon={faComment}
                  size="1x"
                  id="align-chat-icon"
                />
                Virtual Assistant here to help
              </span>
            </span>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
