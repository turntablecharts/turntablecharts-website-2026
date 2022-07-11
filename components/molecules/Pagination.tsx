import Theme from "constants/Theme";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import media from "constants/MediaQuery";

const Pagination: React.FC<{
  totalElements: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ totalElements, setPage }) => {
  const pageSize = 12;
  // const totalElements = 55;

  const totalPages = Math.ceil(totalElements / pageSize);

  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };

  return (
    <PaginationStyling>
      <ReactPaginate
        nextLabel="NEXT"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel="PREV"
        pageClassName="pageBtn"
        pageLinkClassName="pageLink"
        previousClassName="btn prev"
        previousLinkClassName="btn prev"
        nextClassName="btn next"
        nextLinkClassName="link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="break"
        containerClassName="pagination"
        activeClassName="active"
        // renderOnZeroPageCount={null}
      />
    </PaginationStyling>
  );
};

export default Pagination;

const PaginationStyling = styled.div`
  margin: 30px 0;
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 45px;
    margin: 0;
    ${media.mobileLarge`
      gap: 20px;
    `}
  }

  /* .link {
    all: unset;
  } */

  .btn {
    all: unset;
    font-size: ${Theme.fontSizes.medium};
    font-family: ${Theme.typography.primary};
    font-weight: ${Theme.fontWeights.semiBold};
    cursor: pointer;

    ${media.mobileLarge`
      font-size: 0.813rem;

    `}

    &.disabled {
      color: ${Theme.colorPalette.textGrey};
      cursor: not-allowed;
    }
  }
  .prev {
    color: ${Theme.colorPalette.ttcYellow};
  }
  .next {
    color: ${Theme.colorPalette.ttcGreen};
  }

  .pageBtnContainer {
    display: flex;
    gap: 37px;
    ${media.mobileLarge`
      gap: 20px;
    `}
  }

  .page-item {
    list-style: none;
  }

  .pageBtn {
    all: unset;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px solid transparent;
    background-color: #ffffff33;
    display: grid;
    place-items: center;
    font-size: ${Theme.fontSizes.medium};
    font-family: ${Theme.typography.primary};
    font-weight: ${Theme.fontWeights.semiBold};
    cursor: pointer;

    ${media.mobileLarge`
      height: 30px;
      width: 30px;
      font-size: 0.813rem;

    `}

    &:hover {
      border: 1px solid ${Theme.colorPalette.ttcGreen};
    }

    &.active {
      border: 1px solid transparent;
      background-color: ${Theme.colorPalette.ttcGreen};
    }

    &.disabled {
      pointer-events: none;
    }
  }

  .break {
    pointer-events: none;
  }

  .pageLink {
    all: unset;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    ${media.mobileLarge`
      height: 30px;
      width: 30px;
    `}
  }
`;
