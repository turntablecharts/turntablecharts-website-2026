import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import media from 'constants/MediaQuery';
import { submitPowerlistNomination } from '../../../utility/PowerlistApi/api';

const ACCENT = '#2BB673';
const ACCENT_DIM = 'rgba(43,182,115,0.12)';

type Status = 'idle' | 'loading' | 'success' | 'error';

const NominatePage: React.FC = () => {
  const [name, setName] = useState('');
  const [field, setField] = useState('producer');
  const [achievement, setAchievement] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await submitPowerlistNomination({ name, field, achievement });
      setStatus('success');
      setName('');
      setField('producer');
      setAchievement('');
    } catch (err: any) {
      console.error('Nomination submission failed', err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong. Please try again.';
      setErrorMsg(msg);
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Nominate | TurnTable Power List 2025</title>
        <meta
          name="description"
          content="Nominate an individual for the TurnTable Power List 2025 — the most influential figures in Nigerian music."
        />
      </Head>

      <PageWrap>
        <PageInner>
          <PageHeader>
            <div className="logo_wrap">
              <img
                src="/assets/30U30_PH.png"
                alt="30U30 PH logo"
                className="u30_logo"
              />
            </div>
            <h1 className="page_title">NOMINATE</h1>
            <div className="page_title_bar" />
            <p className="page_subtitle">
              Know someone shaping Nigerian music? Submit your nomination below.
              Our editorial team reviews all submissions — not every nominee will
              make the final list.
            </p>
          </PageHeader>

          {status === 'success' ? (
            <SuccessBox>
              <div className="success_icon">✓</div>
              <h2 className="success_heading">Nomination Received</h2>
              <p className="success_body">
                Thank you for your nomination. Our editorial team will review your
                submission as part of the selection process.
              </p>
              <button
                className="success_again"
                onClick={() => setStatus('idle')}
              >
                Submit Another
              </button>
            </SuccessBox>
          ) : (
            <NominationForm onSubmit={handleSubmit} noValidate>
              <FieldGroup>
                <label htmlFor="nom_name" className="field_label">
                  Name of your nominee
                </label>
                <input
                  id="nom_name"
                  type="text"
                  className="field_input"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={status === 'loading'}
                />
              </FieldGroup>

              <FieldGroup>
                <label htmlFor="nom_field" className="field_label">
                  Their Field in Culture
                </label>
                <div className="select_wrap">
                  <select
                    id="nom_field"
                    className="field_select"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    disabled={status === 'loading'}
                  >
                    <option value="streaming">Streaming</option>
                    <option value="traditionalMedia">Traditional Media</option>
                    <option value="liveEntertainment">Live Entertainment</option>
                    <option value="oaps">OAPs</option>
                    <option value="djs">DJs</option>
                    <option value="musicExecutives">Music Executives</option>
                    <option value="foundersOfCulturePlatforms">Founders of Culture Platforms</option>
                    <option value="podcasters">Podcasters</option>
                    <option value="hosts">Hosts</option>
                    <option value="others">Others</option>
                  </select>
                  <span className="select_arrow">▾</span>
                </div>
              </FieldGroup>

              <FieldGroup>
                <label htmlFor="nom_achievement" className="field_label">
                  Their achievements, work and contributions to culture between August 2025 and July 2026
                </label>
                <textarea
                  id="nom_achievement"
                  className="field_textarea"
                  placeholder="Describe key achievements, releases, deals or contributions…"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  required
                  rows={6}
                  disabled={status === 'loading'}
                />
              </FieldGroup>

              {status === 'error' && (
                <ErrorBanner role="alert">{errorMsg}</ErrorBanner>
              )}

              <SubmitBtn type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? <Spinner /> : 'SUBMIT NOMINATION'}
              </SubmitBtn>

              <NoticeText>
                Not all nominated individuals will appear in the final Power
                List revealed at the end of the year.
              </NoticeText>
            </NominationForm>
          )}
        </PageInner>
      </PageWrap>
    </>
  );
};

export default NominatePage;

/* ─────────────────────── Animations ─────────────────────── */

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─────────────────────── Styled Components ─────────────────────── */

const PageWrap = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/powerBG.png');
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  color: #fff;
  padding-top: 70px;
  display: flex;
  justify-content: center;
`;

const PageInner = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 64px 40px 100px;
  animation: ${fadeUp} 0.45s ease both;

  ${media.mobileLarge`
    padding: 40px 20px 80px;
  `}
`;

const PageHeader = styled.header`
  margin-bottom: 48px;

  .logo_wrap {
    margin-bottom: 18px;
    display: flex;
    justify-content: flex-start;
  }

  .u30_logo {
    height: 72px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  .page_title {
    font-family: 'Nohemi', sans-serif;
    font-size: clamp(3rem, 8vw, 5.5rem);
    font-weight: 900;
    font-variation-settings: 'wght' 900;
    font-stretch: condensed;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    margin: 0 0 14px;
    line-height: 1;
  }

  .page_title_bar {
    width: 72px;
    height: 3px;
    background: ${ACCENT};
    border-radius: 2px;
    margin-bottom: 24px;
    opacity: 0.85;
  }

  .page_subtitle {
    font-family: 'Work Sans', sans-serif;
    font-size: 0.9rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }
`;

const NominationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .field_label {
    font-family: 'Work Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${ACCENT};
  }

  .field_input,
  .field_select,
  .field_textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.22);
    }

    &:focus {
      border-color: ${ACCENT};
      background: rgba(43,182,115,0.05);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .field_input {
    height: 50px;
    padding: 0 16px;
  }

  .field_select {
    height: 50px;
    padding: 0 40px 0 16px;
    appearance: none;
    cursor: pointer;

    option {
      background: #111;
      color: #fff;
    }
  }

  .field_textarea {
    padding: 14px 16px;
    resize: vertical;
    min-height: 150px;
    line-height: 1.6;
  }

  .select_wrap {
    position: relative;

    .select_arrow {
      position: absolute;
      top: 50%;
      right: 14px;
      transform: translateY(-50%);
      pointer-events: none;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;

const ErrorBanner = styled.p`
  background: rgba(255, 60, 60, 0.1);
  border: 1px solid rgba(255, 60, 60, 0.28);
  border-radius: 6px;
  padding: 14px 18px;
  font-family: 'Work Sans', sans-serif;
  font-size: 0.88rem;
  color: #ff8080;
  margin: 0;
`;

const SubmitBtn = styled.button`
  height: 52px;
  width: 100%;
  border: none;
  border-radius: 6px;
  background: ${ACCENT};
  color: #000;
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const NoticeText = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-size: 0.75rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  margin: 0;
  font-style: italic;
`;

const SuccessBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 40px;
  background: ${ACCENT_DIM};
  border: 1px solid rgba(43, 182, 115, 0.22);
  border-radius: 8px;
  animation: ${fadeUp} 0.4s ease both;

  .success_icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: ${ACCENT};
    color: #000;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .success_heading {
    font-family: 'Anton', sans-serif;
    font-size: 2rem;
    font-weight: 400;
    color: ${ACCENT};
    letter-spacing: 0.04em;
    margin: 0;
  }

  .success_body {
    font-family: 'Work Sans', sans-serif;
    font-size: 0.95rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  .success_again {
    margin-top: 8px;
    background: none;
    border: 1px solid ${ACCENT};
    color: ${ACCENT};
    font-family: 'Anton', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    padding: 10px 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      background: ${ACCENT};
      color: #000;
    }
  }
`;
