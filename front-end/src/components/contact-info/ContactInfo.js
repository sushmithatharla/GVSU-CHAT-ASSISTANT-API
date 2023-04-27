import React, { useState } from "react";
import useFetch from "use-http";
import * as mdb from "mdb-ui-kit"; // lib
import "./ContactInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Feedback from "../feedback/Feedback";

const ContactInfo = ({ showContactForm, closeChatFlag }) => {
  const { get, post, response, loading, error } = useFetch(
    "https://calm-anchorage-89848.herokuapp.com/api"
  );

  const [success, setsuccess] = useState(false);
  const [feedbackFlag, setFeedbackFlag] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const closeChat = () => {
    setFeedbackFlag(true);
  };

  const onSubmit = async (data) => {
    const submitObj = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      question: data.question,
    };

    await post("/saveContactInfo", submitObj);
    if (response.ok) {
      setsuccess(true);
    }
  };

  const renderMessage = () => {
    return success
      ? `Your form is submitted. You can close the chat assistant or you can go back to the chat`
      : `There is an error saving your information. Please contact GVSU IT at (855) 435-7488 (Toll-free Phone)`;
  };

  return (
    <div className="chat-container">
      <section>
        <div className="container py-5" id="container-align">
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
                    icon={faLongArrowLeft}
                    id="arrow-left"
                    size="2x"
                    onClick={() => showContactForm(false)}
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
                  data-mdb-perfect-scrollbar="true"
                  style={{ position: "relative", height: "400px" }}
                >
                  {feedbackFlag ? (
                    <Feedback closeChatFlag={closeChatFlag} />
                  ) : !loading && !error && !response.ok ? (
                    <form
                      className="contact-info-box"
                      autoComplete="off"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form4Example1"
                          className="form-control"
                          {...register("fullName", { required: true })}
                        />
                        {errors.fullName && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                        <label className="form-label" htmlFor="form4Example1">
                          Full Name <span className="error-message">*</span>
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          id="form4Example2"
                          className="form-control"
                          {...register("email", {
                            required: true,
                            pattern: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
                          })}
                        />

                        {errors.email && (
                          <span className="error-message">
                            {errors.email.type === "pattern"
                              ? "Type email pattern"
                              : "This field is required"}
                          </span>
                        )}
                        <label className="form-label" htmlFor="form4Example2">
                          Email address <span className="error-message">*</span>
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="phone"
                          id="form4Example2"
                          className="form-control"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                        <label className="form-label" htmlFor="form4Example2">
                          Phone Number with country code (optional)
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <textarea
                          className="form-control"
                          id="form4Example3"
                          rows="4"
                          {...register("question", { required: true })}
                        ></textarea>

                        {errors.question && (
                          <span className="error-message">
                            This field is required
                          </span>
                        )}
                        <label className="form-label" htmlFor="form4Example3">
                          Question <span className="error-message">*</span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <span
                      className={
                        success ? "confirmation-message" : "contact-it"
                      }
                    >
                      {renderMessage()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactInfo;
