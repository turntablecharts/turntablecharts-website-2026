import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import BackToListSVG from 'assets/icons/back-to-list.svg';
import { get30Under30ById } from '../../utility/PowerlistApi/api';

const ACCENT = Theme.colorPalette.ttcYellow;

const UnderThirtyProfile: React.FC = () => {
	const router = useRouter();
	const profileId = router.query.id;
	const { data, isLoading, isError } = useQuery(
		['30-under-30-profile', profileId],
		() => get30Under30ById(profileId as string),
		{ enabled: Boolean(profileId), staleTime: 1000 * 60 * 60 }
	);
	const profile = data?.data;

	if (isLoading || !profileId) return <ProfileSkeleton />;
	if (isError) return <StatePage><p>We couldn&apos;t load this profile right now.</p><BackLink href="/30Under30">Back to the list</BackLink></StatePage>;
	if (!profile) return <StatePage><p>This profile is not available.</p><BackLink href="/30Under30">Back to the list</BackLink></StatePage>;

	return (
		<Page>
			<Head>
				<title>{profile.name} | TurnTable Charts 30 Under 30</title>
				<meta name="description" content={`${profile.name}, ${profile.role}. TurnTable Charts 30 Under 30.`} />
			</Head>
			<Profile>
				<Link href="/30Under30" passHref><BackLink><BackToListSVG aria-hidden="true" /><span>Back to list</span></BackLink></Link>
				<Feature>
					{profile.image && <Portrait src={profile.image} alt={profile.name} />}
					<HeaderQuote>{profile.headerquote}</HeaderQuote>
					<FeatureCredit>
						<strong>{profile.name}</strong>
						<span>{profile.age ? `${profile.age}, ` : ''}{profile.role}</span>
					</FeatureCredit>
				</Feature>
				<Content>
					<h1>{profile.name}</h1>
					<Eyebrow>Bio</Eyebrow>
					<Body>{profile.bio}</Body>
					<Citation>
						<span className="mark">“</span>
						<p>{profile.citation}</p>
						{profile.citationAuthor && <cite>Written by {profile.citationAuthor}</cite>}
					</Citation>
				</Content>
			</Profile>
		</Page>
	);
};

export default UnderThirtyProfile;

const ProfileSkeleton: React.FC = () => (
	<Page aria-busy="true" aria-label="Loading profile">
		<Profile>
			<SkeletonBackLink><SkeletonBar width="22px" height="22px" /><SkeletonBar width="92px" height="10px" /></SkeletonBackLink>
			<SkeletonFeature>
				<SkeletonPortrait />
				<SkeletonQuote>
					<SkeletonBar width="88%" />
					<SkeletonBar width="94%" />
					<SkeletonBar width="76%" />
					<SkeletonBar width="90%" />
					<SkeletonBar width="68%" />
				</SkeletonQuote>
				<SkeletonCredit>
					<SkeletonBar width="82%" />
					<SkeletonBar width="42%" height="14px" />
				</SkeletonCredit>
			</SkeletonFeature>
			<SkeletonContent>
				<SkeletonBar width="68%" height="74px" />
				<SkeletonBar width="34%" height="12px" />
				<SkeletonText>
					<SkeletonBar width="100%" /><SkeletonBar width="96%" /><SkeletonBar width="92%" /><SkeletonBar width="74%" />
				</SkeletonText>
				<SkeletonCitation>
					<SkeletonBar width="28px" height="28px" />
					<SkeletonText><SkeletonBar width="100%" /><SkeletonBar width="94%" /><SkeletonBar width="82%" /></SkeletonText>
					<SkeletonBar width="170px" height="12px" />
				</SkeletonCitation>
			</SkeletonContent>
		</Profile>
	</Page>
);

const Page = styled.main`
	min-height: 100vh; background-color: #050505; color: #fff; font-family: 'Work Sans', sans-serif;
	background-image: linear-gradient(rgba(0, 0, 0, .66), rgba(0, 0, 0, .66)), repeating-linear-gradient(90deg, #050505 0 190px, #0d0d0d 190px 360px, #050505 360px 540px), repeating-linear-gradient(0deg, transparent 0 150px, rgba(255,255,255,.055) 150px 152px, transparent 152px 310px);
	background-size: 100% 100%, 100% 310px, 100% 310px;
	background-position: 0 0, 0 0, 0 0;
`;

const Profile = styled.div`
	max-width: 1280px; margin: 0 auto; padding: 120px 9vw 180px;
	${media.mobileLarge`padding: 70px 0 120px;`}
`;

const BackLink = styled.a`
	display: inline-flex; align-items: center; gap: 12px; color: #fff; font-size: .78rem; font-weight: 600; text-decoration: none; text-transform: uppercase;
	svg { width: 22px; height: auto; display: block; }
	&:hover { color: ${ACCENT}; }
	${media.mobileLarge`margin-left: 12px; font-size: .62rem; gap: 8px; svg { width: 14px; }`}
`;

const SkeletonBar = styled.span<{ width?: string; height?: string }>`
	display: block; width: ${({ width = '100%' }) => width}; height: ${({ height = '18px' }) => height}; border-radius: 2px; background: linear-gradient(90deg, #171717 25%, #292929 50%, #171717 75%); background-size: 200% 100%; animation: skeletonShimmer 1.6s ease-in-out infinite;
	@keyframes skeletonShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
`;

const SkeletonBackLink = styled.div`
	display: flex; align-items: center; gap: 12px;
`;

const SkeletonFeature = styled.section`
	display: grid; grid-template-columns: 1.15fr 1fr; grid-template-rows: 1fr auto; max-width: 1110px; min-height: 670px; margin: 104px auto 0; padding: 60px 56px; background: #111; gap: 0;
	${media.mobileLarge`grid-template-columns: 1fr; grid-template-rows: auto; gap: 32px; min-height: 0; margin-top: 58px; padding: 24px;`}
`;

const SkeletonPortrait = styled.div`
	grid-column: 1; grid-row: 1 / -1; width: 100%; height: 100%; min-height: 100%; background: linear-gradient(90deg, #171717 25%, #292929 50%, #171717 75%); background-size: 200% 100%; animation: skeletonShimmer 1.6s ease-in-out infinite;
	${media.mobileLarge`grid-column: 1; grid-row: auto; height: auto; min-height: 0; aspect-ratio: 1 / .9;`}
`;

const SkeletonQuote = styled.div`
	display: grid; grid-column: 2; grid-row: 1; align-content: start; gap: 16px; padding: 0 4px 0 42px;
	${media.mobileLarge`grid-column: 1; grid-row: auto; padding-left: 0;`}
`;

const SkeletonCredit = styled.div`
	display: grid; grid-column: 2; grid-row: 2; gap: 8px; max-width: 440px; margin: 24px 0 0 42px; align-self: end;
	${media.mobileLarge`grid-column: 1; grid-row: auto; max-width: none; margin: 0;`}
`;

const SkeletonContent = styled.section`
	max-width: 940px; margin: 88px auto 0; display: grid; gap: 20px;
	${media.mobileLarge`margin-top: 58px;`}
`;

const SkeletonText = styled.div`
	display: grid; gap: 14px; margin: 12px 0 42px;
`;

const SkeletonCitation = styled.div`
	display: grid; gap: 26px; padding: 52px 64px 46px; border: 3px solid #6b470e;
	${media.mobileLarge`padding: 32px 24px;`}
`;

const Feature = styled.section`
	position: relative; display: grid; grid-template-columns: 1.15fr 1fr; grid-template-rows: 1fr auto; max-width: 1110px; min-height: 670px; margin: 104px auto 0; padding: 60px 56px; background-color: #8c300c; background-image: linear-gradient(90deg, rgba(198, 70, 8, .82) 0 16%, transparent 16% 31%, rgba(179, 57, 8, .62) 31% 47%, transparent 47% 63%, rgba(154, 48, 10, .58) 63% 79%, transparent 79% 100%), linear-gradient(0deg, rgba(255, 132, 39, .08) 0 50%, transparent 50% 100%); background-size: 100% 100%, 100% 210px; align-items: stretch;
	${media.mobileLarge`grid-template-columns: 1fr; grid-template-rows: auto; gap: 34px; min-height: 0; margin: 30px 0 0; padding: 29px 11px 31px;`}
`;

const Portrait = styled.img`
	grid-column: 1; grid-row: 1 / -1; width: 100%; height: 100%; min-height: 100%; object-fit: cover; display: block; background: #242424;
	${media.mobileLarge`grid-column: 1; grid-row: auto; height: auto; min-height: 0; aspect-ratio: 1 / .98;`}
`;

const HeaderQuote = styled.p`
	grid-column: 2; grid-row: 1; margin: 0; padding: 0 4px 0 42px; color: #c8a895; font-family: 'Work Sans', sans-serif; font-size: 32px; font-style: normal; font-weight: 700; line-height: 34px; letter-spacing: -0.64px; text-transform: uppercase; align-self: start;
	${media.mobileLarge`grid-column: 1; grid-row: auto; padding: 0; font-size: 17px; line-height: 20px; overflow-wrap: anywhere;`}
`;

const FeatureCredit = styled.p`
	grid-column: 2; grid-row: 2; max-width: 440px; margin: 24px 0 0 42px; color: #fff; font-size: .72rem; font-weight: 700; text-transform: uppercase; align-self: end;
	strong, span { display: block; font-family: 'Work Sans', sans-serif; font-size: clamp(13px, 1.25vw, 18px); line-height: clamp(15px, 1.38vw, 20px); letter-spacing: -0.36px; text-transform: uppercase; }
	strong { font-weight: 700; }
	span { font-weight: 400; }
	${media.mobileLarge`grid-column: 1; grid-row: auto; max-width: none; margin: 0; overflow-wrap: anywhere; strong, span { font-size: 11px; line-height: 14px; }`}
`;

const Content = styled.section`
	max-width: 940px; margin: 88px auto 0;
	h1 { max-width: 780px; margin: 0 0 58px; font-family: 'Nohemi', sans-serif; font-size: clamp(3rem, 6.2vw, 5.8rem); font-style: normal; font-weight: 900; line-height: .88; letter-spacing: 0; text-transform: uppercase; }
	${media.mobileLarge`margin: 42px 11px 0; h1 { margin-bottom: 26px; font-size: 29px; line-height: .9; }`}
`;

const Eyebrow = styled.p`
	margin: 0 0 20px; color: ${ACCENT}; font-size: .72rem; font-weight: 700; text-transform: uppercase;
`;

const Body = styled.p`
	max-width: 930px; margin: 0 0 62px; color: #ddd; text-align: justify; font: 400 1rem / 1.8 'Work Sans', sans-serif;
	${media.mobileLarge`font-size: .68rem; line-height: 1.65; letter-spacing: -0.1px; margin-bottom: 38px;`}
`;

const Citation = styled.blockquote`
	position: relative; max-width: 940px; margin: 0; text-align: justify; padding: 52px 64px 46px; border: 3px solid ${ACCENT}; color: #ddd; font-family: 'Work Sans', sans-serif;
	.mark { display: block; color: ${ACCENT}; font: 800 2.1rem / 1 'Georgia', serif; }
	p { margin: 0 0 44px; font: 400 1rem / 1.8 'Work Sans', sans-serif; }
	cite { color: ${ACCENT}; font-size: .73rem; font-style: normal; font-weight: 700; text-transform: none; }
	${media.mobileLarge`padding: 26px 20px 30px; border-width: 2px; p { margin-bottom: 30px; font-size: .78rem; line-height: 1.65; } cite { font-size: .6rem; }`}
`;

const StatePage = styled.main`
	min-height: 60vh; display: grid; place-content: center; gap: 18px; padding: 32px; background: #000; color: #fff; font-family: 'Work Sans', sans-serif; text-align: center;
	p { margin: 0; }
`;
