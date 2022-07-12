import React, { useContext, useRef } from "react";
import styled, { css } from "styled-components";
import Theme from "constants/Theme";
// import { thousandsSeparators } from "utility/helpers";
import media from "constants/MediaQuery";
import { TableContent } from "./TableContent";
import { tableRow } from "../molecules/TableRow";
import { TableLoadingSkeleton } from "../molecules/TableLoadingSkeleton";
// import { TableType } from "./types";
import { EmptyState } from "../molecules/TableEmptyState";

interface TableProps {
  // type: TableType.Agent | TableType.Aggregator | TableType.AgentTransactions;
  columns: any;
  data?: any[] | null;
  onClick?: (value: any, e: React.MouseEvent<HTMLTableSectionElement>) => void;
  paginationMeta?: {
    page?: number;
    total?: number;
    limit?: number;
    totalPages?: number;
  };
  handlePagination?: (page: number) => void;
  handlePaginationPrev?: (page: number) => void;
  handlePaginationNext?: (page: number) => void;
  pageNumber?: number;
  loading?: boolean;
  rowStyle?: "spaced";
}

export const TableContentLayout: React.FC<TableProps> = ({
  columns,
  data,
  onClick,
  loading,
  rowStyle,
}) => {
  const isTableEmpty = data?.length! < 1;

  if (loading) {
    return <TableLoadingSkeleton />;
  }

  return (
    <>
      <TableContent>
        <Table rowStyle={rowStyle}>
          <thead>
            <tr>
              {columns &&
                Object.keys(columns)
                  ?.filter((col) => columns[col].active)
                  .map((key) => <Th key={key}>{columns[key].label}</Th>)}
            </tr>
          </thead>
          {!isTableEmpty && (
            <tbody role="presentation">
              {data?.map((item, i) =>
                tableRow(i, columns, item, onClick, rowStyle)
              )}
            </tbody>
          )}
        </Table>
        {isTableEmpty && <EmptyState />}
      </TableContent>
    </>
  );
};

const Table = styled.table<{ rowStyle: any }>`
  width: 100%;
  border-collapse: collapse;
  /* white-space: nowrap; */
  overflow: auto;
  /* ******************** */
  /* .table-header {
    scroll-margin: 95px;
  } */
  tbody {
    background: #000;
  }
  ${({ rowStyle }) =>
    rowStyle !== "spaced" &&
    css`
      & {
        border-collapse: separate;
        border-spacing: 0px 20px;
        border: none;
        background: transparent;
        padding: 0 5px;
        & ${Th} {
          border-bottom: none;
        }
      }
    `}
`;

const Th = styled.th`
  font-size: ${Theme.fontSizes.medium};
  font-weight: ${Theme.fontWeights.semiBold};
  font-family: ${Theme.typography.primary};
  line-height: 22px;
  color: ${Theme.colorPalette.white};
  border-bottom: 1px solid rgba(172, 161, 161, 0.08);
  text-align: left;
  padding-right: 20px;

  :first-child {
    padding-left: 53px;
    ${media.tablet`
    padding-left: 10px;
  `}
  }
  :last-child {
    padding-left: 53px;
    ${media.tablet`
    padding: 0px;
  `}
  }
  :not(:first-child) {
    padding-top: 19px;
    padding-bottom: 19px;
    padding-right: 20px;
    ${media.tablet`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
     `}
  }
  ${media.tablet`
  line-height: 12px;
  /* padding: 12px 12px; */
  `}
`;
