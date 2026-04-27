import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getChartCategories } from 'utility/ChartsApi/api';
import { ChartCategory } from 'utility/ChartsApi/types';
import Theme from 'constants/Theme';
import media from 'constants/MediaQuery';

const ChartSubNav: React.FC = () => {
  const router = useRouter();
  const currentChartId = router.query.chartId as string | undefined;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data } = useQuery('chart-categories-subnav', getChartCategories, {
    staleTime: 1000 * 60 * 60,
  });

  const categories: ChartCategory[] = data?.data ?? [];

  // Group by heading
  const groups: Record<string, ChartCategory[]> = {};
  categories.forEach((cat) => {
    if (!cat.heading || !cat.heading.trim()) return;
    if (!groups[cat.heading]) groups[cat.heading] = [];
    groups[cat.heading].push(cat);
  });

  // Find which group the current chart belongs to
  const currentGroup = currentChartId
    ? Object.entries(groups).find(([, cats]) =>
        cats.some((c) => c.id.toString() === currentChartId)
      )
    : null;

  const groupName = currentGroup?.[0] ?? null;
  const groupCharts = currentGroup?.[1] ?? [];
  const currentCat = groupCharts.find((c) => c.id.toString() === currentChartId);

  if (!currentChartId || groupCharts.length === 0) return null;

  return (
    <SubNavBar>
      {/* Desktop: horizontal tabs */}
      <DesktopNav>
        {groupCharts.map((cat) => (
          <Link key={cat.id} href={`/charts/${cat.id}`}>
            <NavTab className={cat.id.toString() === currentChartId ? 'active' : ''}>
              {cat.name}
            </NavTab>
          </Link>
        ))}
      </DesktopNav>

      {/* Mobile: dropdown */}
      <MobileNav>
        <Dropdown onClick={() => setDropdownOpen((o) => !o)}>
          <span>{currentCat?.name ?? 'Select Chart'}</span>
          <svg
            className={dropdownOpen ? 'open' : ''}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Dropdown>
        {dropdownOpen && (
          <DropdownMenu>
            {groupCharts.map((cat) => (
              <Link key={cat.id} href={`/charts/${cat.id}`}>
                <DropdownItem
                  className={cat.id.toString() === currentChartId ? 'active' : ''}
                  onClick={() => setDropdownOpen(false)}
                >
                  {cat.name}
                </DropdownItem>
              </Link>
            ))}
          </DropdownMenu>
        )}
      </MobileNav>
    </SubNavBar>
  );
};

export default ChartSubNav;

const SubNavBar = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  z-index: 998;
  background-color: ${Theme.colorPalette.white};
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  ${media.mobileLarge`
    background-color: ${Theme.colorPalette.black};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  `}
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  ${media.mobileLarge`
    display: none;
  `}
`;

const NavTab = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 14px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  text-decoration: none;

  &:hover {
    color: ${Theme.colorPalette.black};
  }

  &.active {
    color: ${Theme.colorPalette.black};

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: ${Theme.colorPalette.ttcOrange};
      border-radius: 2px 2px 0 0;
    }
  }
`;

const MobileNav = styled.div`
  display: none;

  ${media.mobileLarge`
    display: block;
    overflow: hidden;
    margin: 8px 16px;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 6px;
  `}
`;

const Dropdown = styled.button`
  all: unset;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${Theme.colorPalette.white};
  cursor: pointer;
  box-sizing: border-box;

  svg {
    flex-shrink: 0;
    transition: transform 0.25s ease;

    &.open {
      transform: rotate(180deg);
    }
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  background: ${Theme.colorPalette.black};
  max-height: 55vh;
  overflow-y: auto;
`;

const DropdownItem = styled.a`
  display: block;
  font-family: 'Host Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${Theme.colorPalette.white};
  }

  &.active {
    color: ${Theme.colorPalette.white};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
