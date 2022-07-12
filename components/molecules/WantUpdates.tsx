import Typography from "components/atoms/typography";
import Theme from "constants/Theme";
import { FormEvent, useState } from "react";
import media from "constants/MediaQuery";
import styled from "styled-components";
import TTCRequest from "lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const WantUpdates = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const signUp = TTCRequest.post("/api/author/subscribe", {
    name: name.trim(),
    email: email.trim(),
  });

  const handleWantUpdatesSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    const response = await toast.promise(signUp, {
      pending: "Signing you up... ⏳",
      success: "Successfully signed up ✅",
      error: "Something went wrong",
    });

    setName("");
    setEmail("");
  };

  return (
    <WantUpdatesStyling>
      <div className="updates_texts">
        <Typography.Heading
          fontType="Mermaid"
          level={2}
          className="header"
          style={{ marginBottom: "20px" }}
        >
          Want updates straight into your Inbox?
        </Typography.Heading>
        <Typography.Text
          fontType="Montserrat"
          className="body"
          weight="semiBold"
        >
          Enter your name and email to get the latest news from the TurnTable
          team, and in-depth knowledge into music and the numbers behind them.
        </Typography.Text>
      </div>
      <form onSubmit={handleWantUpdatesSubmit} className="updates_form">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          value={name}
        />
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          value={email}
        />
        <button type="submit">Subscribe</button>
      </form>
      <ToastContainer />
    </WantUpdatesStyling>
  );
};

export default WantUpdates;

const WantUpdatesStyling = styled.div`
  background-image: url("/assets/wantUpdatesBG.png");
  text-align: center;
  padding: 100px 0;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  .updates_texts {
    max-width: 790px;
    width: 95%;
    margin: 0 auto 70px;

    .header {
      font-size: ${Theme.fontSizes.extralarge};
      ${media.mobileLarge`
      font-size: 24px;
    `}
    }

    .body {
      font-size: ${Theme.fontSizes.xlarge};
      ${media.mobileLarge`
      font-size: 16px;
    `}
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 0px 15px;
    font-family: ${Theme.typography.primary};

    button {
      border: 1px solid transparent;
      border-radius: 5px;
      padding: 12px 16px;
      background: #000;
      width: 180px;
      color: #fff;
      align-self: stretch;
      font-family: inherit;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        border: 1px solid ${Theme.colorPalette.ttcYellow};
      }
    }
    input {
      border: 1px solid transparent;
      border-radius: 5px;
      padding: 12px 16px;
      background: #fff;
      width: 280px;
      color: #000;
      font-family: inherit;
      outline: 1px solid ${Theme.colorPalette.ttcYellow};
    }

    ${media.tablet`
      flex-direction: column;

      button {
        align-self: center;
        width: 280px;
      }
    `}
  }
`;
