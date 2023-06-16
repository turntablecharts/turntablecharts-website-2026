import { useState } from 'react';
import Typography from 'components/atoms/typography';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import styled from 'styled-components';
import Image from 'next/image';

// POWER 100 FORM
const Form = () => {
  const [name, setName] = useState('');
  const [field, setField] = useState('producer');
  const [achievement, setAchievement] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a form data object
    const formData = {
      name,
      field,
      achievement,
    };

    console.log(formData);
    try {
      // Send a POST request to the powerlist API
      const response = await fetch('https://turntablechartsapi.azurewebsites.net/api/public/powerList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully');
        // Reset the form fields
        setName('');
        setField('producer');
        setAchievement('');
      } else {
        alert('Form submission failed');
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form', error);
    }
  };

  return (
    <Power100FormStyling onSubmit={handleSubmit}>
      <label>
        Name of your nominee:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" />
      </label>
      <br />
      <label>
        Their field of music:
        <div className="select-container">
          <select value={field} onChange={(e) => setField(e.target.value)}>
            <option value="producer">Producer</option>
            <option value="artist">Artist</option>
            <option value="engineer">Engineer</option>
            <option value="songwriter">Songwriter</option>
            <option value="musicExecutive">Music Executive</option>
            <option value="mediaPersonnel">Media Personnel</option>
            <option value="writer">Writer</option>
            <option value="creative">Creative</option>
            <option value="influencer">Influencer</option>
            <option value="others">Others</option>
          </select>
          <span className="select-icon">
            <Image src="/assets/icons/selectDown.svg" alt="Icon" width={10} height={6} />
          </span>
        </div>
      </label>
      <br />
      <label>
        Their achievement(s) in the past 3 years:
        <textarea value={achievement} onChange={(e) => setAchievement(e.target.value)} required placeholder="Type here..." />
      </label>
      <br />
      <button type="submit" className="btn-submit">
        Submit
      </button>
      <Typography.Text fontType="SFProText" className="note" style={{ marginTop: '10px' }} weight="semiBold">
        Note: Not all nominated individuals will be among the final Power 100 that will be revealed at the end of the year
      </Typography.Text>
    </Power100FormStyling>
  );
};

const Power100FormStyling = styled.form`
  width: 400px;
  height: 400px;
  font-family: SFProText;

  .note {
    font-size: 14px;
  }

  select,
  .select-container {
    width: 400px;
  }

  .select-container {
    position: relative;
  }

  .select-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }

  ${media.mobileLarge`
  width: 300px;
  height: 300px;
  font-size: 14px;
  .note{
    font-size: 10px;
  }
  select,
  .select-container {
    width: 300px;
  }
`}

  ${media.smallMobile`
width: 260px;
height: 260px;
font-size: 10px;
select,
.select-container {
  width: 260px;
}

`}

  label {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 5px;
  }
  input {
    margin-top: 5px;
  }

  option {
    width: 80%;
  }
  input,
  select {
    background-color: #2c2c2c;
    height: 43px;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 6px;
  }
  textarea {
    background-color: #2c2c2c;
    height: 150px;
    padding: 10px;
    border-radius: 6px;
    border: none;
    outline: none;
  }

  .btn-submit {
    outline: none;
    border: none;
    width: 100%;
    height: 43px;
    padding: 10px;
    border-radius: 6px;
    background-color: ${Theme.colorPalette.ttcYellow};
    &:hover {
      cursor: pointer;
    }
  }
`;
export default Form;
