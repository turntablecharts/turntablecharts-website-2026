import media from "constants/MediaQuery";
import Theme from "constants/Theme";
import styled, { css } from "styled-components";

export const tableRow = (
  k: any,
  data: any,
  item: any,
  onClick?: any,
  rowStyle?: any,
  rowDataStyle?: any
) => {
  return (
    <Tr
      className="border"
      key={k}
      id={k}
      rowStyle={rowStyle}
      onClick={onClick && (() => onClick(item))}
    >
      {data &&
        Object.keys(data)
          ?.filter((d) => data[d]?.active)
          .map((key, index) => {
            const keys = index;
            if (typeof item[key] === "function") {
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
  background: #121212;
  margin-bottom: 20px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.08); */
  /* padding: 12px 30px; */
  font-family: ${Theme.typography.secondary};
  :last-of-type td {
    padding-bottom: 20px;
  }
  ${({ onClick }) =>
    onClick &&
    css`
      &:hover {
        cursor: pointer;
        color: ${Theme.colorPalette.black};
      }
    `}

  ${({ rowStyle }) =>
    rowStyle === "spaced" &&
    css`
      & {
        border-bottom: none;
        box-shadow: 0px 4px 15px rgba(229, 229, 229, 0.3),
          0px 4px 5px rgba(229, 229, 229, 0.3);
      }
    `}
`;
const Td = styled.td`
  font-size: ${Theme.fontSizes.xlarge};
  font-weight: ${Theme.fontWeights.semiBold};
  font-family: ${Theme.typography.primary};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 20px;
  :first-child {
    padding-left: 20px;
    padding-right: 0;

    ${media.tablet`
    padding: 0px;
    font-size: 14px;
  `}
  }
  ${media.tablet`
font-size: 14px;
`}

  ${media.mobileLarge`
    padding: 15px 12px;
  `}
`;
