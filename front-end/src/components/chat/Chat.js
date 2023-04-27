import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import "./Chat.css";
import ContactInfo from "../contact-info/ContactInfo.js";
import ChatBox from "../chatbox/ChatBox.js";

const Chat = () => {
  const [showContactInfo, setshowContactInfo] = useState(false);
  const [showBotFlag, setShowBotFlag] = useState(false);

  const showContactForm = (flag) => {
    setshowContactInfo(flag);
    if (!flag) setShowBotFlag(true);
  };

  const closeChatFlag = (flag) => {
    sessionStorage.removeItem("messages");
    showContactForm(false);
    setShowBotFlag(false);
  };

  return (
    <div className="chat-container">
      {showContactInfo ? (
        <ContactInfo
          showContactForm={showContactForm}
          closeChatFlag={closeChatFlag}
        />
      ) : (
        <ChatBox
          showContactForm={showContactForm}
          showBotFlag={showBotFlag}
          closeChatFlag={closeChatFlag}
        />
      )}
    </div>
  );
};

export default Chat;
