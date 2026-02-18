import Typography from 'components/atoms/typography';
import Theme from 'constants/Theme';
import { FormEvent, useState } from 'react';
import media from 'constants/MediaQuery';
import styled from 'styled-components';
import TTCRequest from 'lib/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const WantUpdates = () => {
  const [email, setEmail] = useState('');

  const signUp = (email: string) => {
    return TTCRequest.post('/api/author/subscribe', {
      email: email.trim(),
    });
  };
  const handleWantUpdatesSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    toast.loading('Signing you up... ⏳');

    signUp(email)
      .then(() => {
        toast.success('Successfully signed up ✅');
        setEmail('');
      })
      .catch((e) => {
        console.log(e);
        toast.error('Something went wrong');
      });
  };

  return (
    <WantUpdatesStyling>
      <div className="updates_texts">
        <Typography.Heading fontType="RobotoFlex" weight="extraBold" level={1} className="header" style={{ marginBottom: '20px' }}>
          Want updates straight
          <br /> to your Inbox?
        </Typography.Heading>
        <Typography.Text fontType="WorkSans" className="body" weight="semiBold">
          Enter your email to get the latest news from the TurnTable team, and in-depth knowledge into music and the numbers behind them.
        </Typography.Text>
      </div>
      <form onSubmit={handleWantUpdatesSubmit} className="updates_form">
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" value={email} />
        <button type="submit">Subscribe</button>
      </form>
      <ToastContainer />
    </WantUpdatesStyling>
  );
};

export default WantUpdates;

const WantUpdatesStyling = styled.div`
 
  
`;
