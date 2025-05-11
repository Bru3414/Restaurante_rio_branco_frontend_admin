import * as S from './styles'

type Props = {
  totalPage: number
  currentPage: number
  windowSize?: number
  onClick: (page: number) => void
  prevPage: VoidFunction
  nextPage: VoidFunction
}

const Navigation = ({
  totalPage,
  onClick,
  currentPage,
  windowSize = 5,
  prevPage,
  nextPage
}: Props) => {
  const startPage = Math.max(1, currentPage - Math.floor(windowSize / 2))
  const endPage = Math.min(totalPage, startPage + windowSize - 1)
  const adjustedStart = Math.max(1, endPage - windowSize + 1)

  const pages = []
  for (let i = adjustedStart; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <S.DivContainer>
      <S.ButtonPrevNext disabled={currentPage <= 1} onClick={prevPage}>
        &lt;
      </S.ButtonPrevNext>
      {pages.map((page) => (
        <S.ButtonPage
          className={page === currentPage ? 'current-page' : ''}
          key={page}
          onClick={() => onClick(page)}
        >
          {page}
        </S.ButtonPage>
      ))}
      <S.ButtonPrevNext
        disabled={currentPage === totalPage || totalPage === 0}
        onClick={nextPage}
      >
        &gt;
      </S.ButtonPrevNext>
    </S.DivContainer>
  )
}

export default Navigation
