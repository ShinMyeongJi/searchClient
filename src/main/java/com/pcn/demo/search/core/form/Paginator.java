package com.pcn.demo.search.core.form;

import com.pcn.demo.search.service.form.SolrSearchForm;

/**
 * @class Paginator
 * 	com.ildong.idop.service.web.search.core.form
 * @section 클래스작성정보
 *    |    항  목        	|       	내  용       			|
 *    | :--------: 	| -----------------------------	|
 *    | Company 	| PCN
 *    | Author 		| rnd
 *    | Date 		| 2019. 7. 30.
 *    | 작업자 		| rnd, Others...
 * @section 상세설명
 * - 클래스의 업무내용에 대해 기술...
*/
public class Paginator {
    public static final int DEFAULT_FIRST_PAGE = 1;
    public static final int DEFAULT_NUM_OF_ROWS = 20;
    public static final int DEFAULT_PAGE_RANGE = 10;

    public static final String KEY = "paginator";

    public static final String PAGE_NO = "cPage";
    public static final String PAGE_SIZE = "rows";

    public static int getDefaultFirstPage() {
        return DEFAULT_FIRST_PAGE;
    }

    private int pageSize = DEFAULT_NUM_OF_ROWS;
    private long totalRowCount;

    private int pageNo;
    private int pageCount;

    private int pageRange = DEFAULT_PAGE_RANGE;
    private int pageSetNo;
    private int pageSetCount;

    /**
     * <p>페이지 생성자</p>
     *
     * @param pageNo 페이지 번호(1부터 시작)
     * @param pageSize 페이지 크기(한 페이지에 보여줄 데이터의 갯수)
     * @param count 데이터의 총 갯수
     */
    public Paginator(int pageNo, int pageSize, long count) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.totalRowCount = count;

        init();
    }

    /**
     * <p>페이지 생성자</p>
     *
     * @param searchParams 검색 파라메터
     * @param count 데이터의 총 갯수
     */
    public Paginator(SearchForm searchParams, long count) {
        this.pageNo = searchParams.getPageNo();
        this.pageSize = searchParams.getRows();
        this.totalRowCount = count;

        init();
    }

    public Paginator(SolrSearchForm searchParams, int count) {
        this.pageNo = searchParams.getcPage();
        this.pageSize = searchParams.getRows();
        this.totalRowCount = count;

        init();
    }

    protected void init() {
        // 총페이지수 = ((전체 게시물수-1) / 페이지크기 )+ 1
        pageCount = (int) (((totalRowCount - 1) / pageSize) + 1);

        pageSetCount = ((pageCount - 1) / pageRange) + 1;
        pageSetNo = ((pageNo - 1) / pageRange) + 1;
    }

    public int getPageNo() {
        return pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public long getTotalRowCount() {
        return totalRowCount;
    }

    public int getPageCount() {
        return pageCount;
    }

    public int getPageRange() {
        return pageRange;
    }

    /**
     * <p>현재 블럭내의 시작 페이지 번호를 반환한다.</p>
     *
     * @return 시작 페이지 번호
     */
    public int getFirstPageNo() {
        return ((pageSetNo - 1) * pageRange) + 1;
    }

    /**
     * <p>현재 블럭내의 마지막 페이지 번호를 반환한다.</p>
     *
     * @return 마지막 페이지 번호
     */
    public int getLastPageNo() {
        int page = pageSetNo * pageRange;
        return page <= pageCount ? page : pageCount;
    }

    /**
     * <p>이전 페이지가 존재하는지 판단한다.</p>
     *
     * @return
     */
    public boolean hasPrevPage() {
        return pageNo > 1;
    }

    /**
     * <p>다음 페이지가 존재하는지 판단한다.</p>
     * @return
     */
    public boolean hasNextPage() {
        return pageNo < pageCount;
    }

    /**
     * <p>이전 페이지 번호를 반환한다.
     * 이전 페이지가 존재하지 않는다면 -1을 반환한다.</p>
     *
     * @return
     */
    public int getPrevPageNo() {
        return hasPrevPage() ? (pageNo - 1) : -1;
    }

    /**
     * <p>다음 페이지 번호를 반환한다.
     * 다음 페이지가 존재하지 않는다면 -1을 반환한다.</p>
     * @return
     */
    public int getNextPageNo() {
        return hasNextPage() ? (pageNo + 1) : -1;
    }

    /**
     * <p>이전 페이지 블럭이 존재하는지 판단한다.</p>
     *
     * @return
     */
    public boolean hasPrevPageSet() {
        //      return pageSetNo > 1;
        return pageNo > 1;
    }

    /**
     * <p>다음 페이지 블럭이 존재하는지 판단한다.</p>
     * @return
     */
    public boolean hasNextPageSet() {
        /*return pageSetNo < pageSetCount;*/
        return pageNo < pageCount;
    }

    /**
     * <p>이전 페이지 블럭 번호를 반환한다.
     * 이전 페이지 블럭의 페이지가 존재하지 않는다면 -1을 반환한다.</p>
     *
     * @return
     */
    public int getPrevPageSetPageNo() {
        if (hasPrevPageSet()) {
            //          return ((pageSetNo - 2) * pageRange) + 1;
            return pageNo - 1;
        }
        return -1;
    }

    /**
     * <p>다음 페이지 블럭의 페이지 번호를 반환한다.
     * 다음 페이지 블럭의 페이지가 존재하지 않는다면 -1을 반환한다.</p>
     * @return
     */
    public int getNextPageSetPageNo() {
        if (hasNextPageSet()) {
            //          return (pageSetNo * pageRange) + 1;
            return pageNo + 1;
        }
        return -1;
    }

    public int getFirstPageSetPageNo() {
        return 1;
    }

    public int getLastPageSetPageNo() {
        return pageCount;
    }

}
