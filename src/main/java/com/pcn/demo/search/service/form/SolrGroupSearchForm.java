package com.pcn.demo.search.service.form;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
//import org.apache.solr.common.StringUtils;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

/**
 * @class SolrGroupSearchForm
 * 	com.ildong.idop.service.web.search.form
 * @section 클래스작성정보
 *    |    항  목        	|       	내  용       			|
 *    | :--------: 	| -----------------------------	|
 *    | Company 	| PCN
 *    | Author 		| rnd
 *    | Date 		| 2019. 7. 29.
 *    | 작업자 		| rnd, Others...
 * @section 상세설명
 * - 클래스의 업무내용에 대해 기술...
*/
public class SolrGroupSearchForm {

    public static final String DATE_STRING_PATTERN = "YYYY-MM-dd";

    private String clazz;
    private int limit;

    private String q; // 질의어

    private String cat1;
    private String cat2;
    private String cat3;

    private String sortField; // 정확도순, 최신순
    private String searchAgain; //결과내 재검색 여부

    private String startDate;

    private String endDate;

    private int total;

    public SolrGroupSearchForm() {
        super();
    }

    public SolrGroupSearchForm(HttpServletRequest request) {

        if (StringUtils.isEmpty(clazz)) {
            clazz = "cat1";
        }
        limit = 3;
        q = request.getParameter("q");
        q = Jsoup.clean(q, Whitelist.basic()); //return safe HTML
        cat1 = request.getParameter("cat1");
        cat2 = request.getParameter("cat2");
        cat3 = request.getParameter("cat3");
        searchAgain = request.getParameter("searchAgain");

        sortField = request.getParameter("sortField");

        startDate = request.getParameter("startDate");
        endDate = request.getParameter("endDate");

        if (StringUtils.isEmpty(startDate)) {
            startDate = "*";
        }
        if (StringUtils.isEmpty(endDate)) {
            endDate = "*";
        }

        if (StringUtils.isEmpty(sortField)) {
            sortField = "score"; //정확도순, 최신순
        }

    }

    /**
     * @fn String getStartDate()
     * @return the startDate get
    */
    public String getStartDate() {
        return startDate;
    }

    /**
     * @fn void setStartDate(String startDate)
     * @param startDate the startDate to set
    */
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    /**
     * @fn String getEndDate()
     * @return the endDate get
    */
    public String getEndDate() {
        return endDate;
    }

    /**
     * @fn void setEndDate(String endDate)
     * @param endDate the endDate to set
    */
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }

    public String getCat1() {
        return cat1;
    }

    public void setCat1(String cat1) {
        this.cat1 = cat1;
    }

    public String getCat2() {
        return cat2;
    }

    public void setCat2(String cat2) {
        this.cat2 = cat2;
    }

    public String getCat3() {
        return cat3;
    }

    public void setCat3(String cat3) {
        this.cat3 = cat3;
    }

    public String getSearchAgain() {
        return searchAgain;
    }

    public void setSearchAgain(String searchAgain) {
        this.searchAgain = searchAgain;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getSortField() {
        return sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }
}
