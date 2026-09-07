import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';

const ACCENT = Theme.colorPalette.ttcYellow;

const UnderThirtyProfile: React.FC = () => {
	const router = useRouter();
	const profileId = router.query.id ?? 'profile';

	return (
		<Page>
			<Head>
				<title>30 Under 30 Profile | TurnTable Charts</title>
				<meta name="description" content="TurnTable Charts 30 Under 30 profile." />
			</Head>
			<Profile>
				<Link href="/30Under30" passHref><BackLink>&larr; Back to the list</BackLink></Link>
				<h1>30 Under 30</h1>
				<p>Profile page for honoree {profileId}.</p>
			</Profile>
		</Page>
	);
};

export default UnderThirtyProfile;

const Page = styled.main`
	min-height: 100vh; background: #f4f1eb; color: #0c0c0c; font-family: 'Work Sans', sans-serif;
`;

const Profile = styled.div`
	max-width: 1180px; margin: 0 auto; padding: 42px 7vw 110px;
`;

const BackLink = styled.a`
	display: inline-block; color: #0c0c0c; font-size: .78rem; font-weight: 600; text-decoration: none; text-transform: uppercase;
	&:hover { color: ${ACCENT}; }
`;

const ProfileGrid = styled.div`
	display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(32px, 7vw, 96px); align-items: start; margin-top: 48px;
	${media.mobileLarge`grid-template-columns: 1fr; gap: 34px; margin-top: 34px;`}
`;

const Portrait = styled.div`
	aspect-ratio: 1 / 1.15; overflow: hidden; background: #242424;
	img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;

const Details = styled.div`
	padding-top: 12px;
	${media.mobileLarge`padding-top: 0;`}
	h1 { max-width: 680px; margin: 12px 0 10px; font: 800 clamp(2.8rem, 6vw, 6rem) / .92 'Nohemi', sans-serif; text-transform: uppercase; }
`;

const Eyebrow = styled.p`
	margin: 0; color: ${ACCENT}; font-size: .72rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
`;

const Meta = styled.p`
	margin: 0; color: #555; font-size: .82rem; text-transform: uppercase;
`;

const Quote = styled.p`
	max-width: 560px; margin: 42px 0 26px; font: 500 clamp(1.2rem, 2vw, 1.7rem) / 1.35 'Work Sans', sans-serif;
`;

const Bio = styled.p`
	max-width: 620px; margin: 0 0 30px; font: 500 1rem / 1.7 'Work Sans', sans-serif;
`;

const Citation = styled.blockquote`
	max-width: 620px; margin: 34px 0 0; padding-left: 20px; border-left: 3px solid ${ACCENT};
	p { margin: 0 0 10px; font: 500 1rem / 1.6 'Work Sans', sans-serif; }
	cite { color: #555; font-size: .75rem; font-style: normal; text-transform: uppercase; }
`;

const StatePage = styled.main`
	min-height: 60vh; display: grid; place-content: center; gap: 18px; padding: 32px; background: #f4f1eb; color: #0c0c0c; font-family: 'Work Sans', sans-serif; text-align: center;
	p { margin: 0; }
`;
