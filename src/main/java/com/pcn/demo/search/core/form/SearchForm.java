package com.pcn.demo.search.core.form;

import javax.servlet.http.HttpServletRequest;

/**
 * @class SearchForm
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
public class SearchForm {

    private Integer pageNo;
    private Integer rows;

    private Integer beginRow;
    private Integer endRow;

    public SearchForm() {

    }

    public SearchForm(Integer pageNo, Integer rows) {
        setPagingParam(pageNo, rows);
    }

    public SearchForm(HttpServletRequest request) {
        if (request.getParameter("pageNo") == null) {
            pageNo = 1;
        } else {
            pageNo = Integer.parseInt(request.getParameter("pageNo"));
        }
        if (request.getParameter("rows") == null) {
            rows = 20;
        } else {
            rows = Integer.parseInt(request.getParameter("rows"));
        }
        setPagingParam(pageNo, rows);
    }

    public void setPagingParam(Integer pageNo, Integer rows) {
        if (pageNo > 0 && rows > 0) {
            endRow = pageNo * rows;
            beginRow = endRow - rows;
        }
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public Integer getBeginRow() {
        return beginRow;
    }

    public void setBeginRow(Integer beginRow) {
        this.beginRow = beginRow;
    }

    public Integer getEndRow() {
        return endRow;
    }

    public void setEndRow(Integer endRow) {
        this.endRow = endRow;
    }

    @Override
    public String toString() {
        return "SearchForm [pageNo=" + pageNo + ", rows=" + rows
            + ", beginRow=" + beginRow + ", endRow=" + endRow + "]";
    }

    public String toQueryString() {
        StringBuilder sb = new StringBuilder();
        if (pageNo != null) {
            sb.append("&");
            sb.append(Paginator.PAGE_NO).append("=").append(pageNo);
        }
        if (rows != null) {
            sb.append("&");
            sb.append(Paginator.PAGE_SIZE).append("=").append(rows);
        }
        return sb.toString();
    }
}
