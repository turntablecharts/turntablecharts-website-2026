import media from 'constants/MediaQuery';
import Theme from 'constants/Theme';
import styled, { css } from 'styled-components';

export const tableRow = (k: any, data: any, item: any, onClick?: any, rowStyle?: any, rowDataStyle?: any) => {
  return (
    <Tr className="border" key={k} id={k} rowStyle={rowStyle} onClick={onClick && (() => onClick(item))}>
      {data &&
        Object.keys(data)
          ?.filter((d) => data[d]?.active)
          .map((key, index) => {
            const keys = index;
            if (typeof item[key] === 'function') {
              const Component = item[key];
              return (
                <Td key={`count-${keys}`}>
                  <Component />
                </Td>
              );
            }
            return (
              <Td style={{ ...rowDataStyle }} key={`count-${keys}`}>
                {item[key]}
              </Td>
            );
          })}
    </Tr>
  );
};

const Tr = styled.tr<{ onClick: any; rowStyle: any }>`
  color: ${Theme.colorPalette.white};
  background: transparent;
  font-family: ${Theme.typography.workSans};

  ${({ onClick }) =>
    onClick &&
    css`
      &:hover {
        cursor: pointer;
        background: rgba(255, 255, 255, 0.03);
      }
    `}
`;
const Td = styled.td`
  font-size: ${Theme.fontSizes.large};
  font-weight: ${Theme.fontWeights.normal};
  font-family: ${Theme.typography.workSans};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  /* No border on last row */
  tr:last-child & {
    border-bottom: none;
  }

  /* Bottom-left corner on last row first cell */
  tr:last-child &:first-child {
    border-radius: 0 0 0 12px;
  }

  /* Bottom-right corner on last row last cell */
  tr:last-child &:last-child {
    border-radius: 0 0 12px 0;
  }

  :first-child {
    padding-left: 24px;
    padding-right: 0;

    ${media.tablet`
      padding-left: 10px;
      font-size: ${Theme.fontSizes.medium};
    `}
    ${media.mobile`
      padding-left: 8px;
    `}
  }

  ${media.tablet`
    font-size: ${Theme.fontSizes.medium};
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 12px;
  `}

  ${media.mobile`
    padding: 10px 6px;
  `}
`;
