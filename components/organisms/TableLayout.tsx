import React, { useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import Theme from 'constants/Theme';
// import { thousandsSeparators } from "utility/helpers";
import media from 'constants/MediaQuery';
import { TableContent } from './TableContent';
import { tableRow } from '../molecules/TableRow';
import { TableLoadingSkeleton } from '../molecules/TableLoadingSkeleton';
// import { TableType } from "./types";
import { EmptyState } from '../molecules/TableEmptyState';

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
  rowStyle?: 'spaced';
}

export const TableContentLayout: React.FC<TableProps> = ({ columns, data, onClick, loading, rowStyle }) => {
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
          {!isTableEmpty && <tbody role="presentation">{data?.map((item, i) => tableRow(i, columns, item, onClick, rowStyle))}</tbody>}
        </Table>
        {isTableEmpty && <EmptyState />}
      </TableContent>
    </>
  );
};

const Table = styled.table<{ rowStyle: any }>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #181818;
  border-radius: 12px;
  tbody {
    background: #181818;
  }
`;

const Th = styled.th`
  font-size: ${Theme.fontSizes.large};
  font-weight: ${Theme.fontWeights.semiBold};
  font-family: ${Theme.typography.workSans};
  line-height: 22px;
  color: ${Theme.colorPalette.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  text-align: left;
  padding: 32px 20px;
  white-space: pre;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #181818;

  /* Round the top-left corner */
  :first-child {
    padding-left: 14px;
    text-align: center;
    border-radius: 12px 0 0 0;
    ${media.tablet`
      padding-left: 10px;
    `}
    ${media.mobile`
      padding-left: 8px;
    `}
  }

  /* Round the top-right corner */
  :last-child {
    border-radius: 0 12px 0 0;
  }

  ${media.tablet`
    font-size: ${Theme.fontSizes.medium};
    padding: 14px 12px 14px 0;
  `}
`;

