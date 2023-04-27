import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import useFetch from "use-http";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const Feedback = ({ closeChatFlag, closeBot }) => {
  const { get, post, response, loading, error } = useFetch(
    "https://calm-anchorage-89848.herokuapp.com/api"
  );

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const cancel = () => {
    closeChatFlag(false);
    closeBot(true);
  };

  const submit = async () => {
    const feedbackObj = {
      rating: value,
    };

    await post("/saveFeedback", feedbackObj);
    cancel();
  };

  return (
    <div>
      <section>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            size="large"
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <button className="btn btn-secondary" onClick={() => cancel(false)}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={() => submit(false)}>
          Submit
        </button>
      </section>
    </div>
  );
};

export default Feedback;
