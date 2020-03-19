package com.pcn.demo.search.service.form;

import javax.servlet.http.HttpServletRequest;


import org.apache.commons.lang3.StringUtils;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import com.pcn.demo.search.core.IConstants;

/**
 * @class SolrSearchForm
 * 	com.ildong.idop.service.web.search.form
 * @section 클래스작성정보
 *    |    항  목        	|       	내  용       			|
 *    | :--------: 	| -----------------------------	|
 *    | Company 	| PCN
 *    | Author 		| rnd
 *    | Date 		| 2019. 7. 26.
 *    | 작업자 		| rnd, Others...
 * @section 상세설명
 * - 클래스의 업무내용에 대해 기술...
*/

public class SolrSearchForm implements IConstants {
    private String indent;
    private String version;
    private String fl;
    private String hl;
    private String hlFl;
    private String qt;
    private String cat1;
    private String cat2;
    private String cat3;
    private String cat4;
    private String sortField;

    private String field; // 검색 분류
    private String assonant; // 유사어 포함 검색여부 (성능이 떨어질수 있음)
    private String searchAgain; //결과내 재검색 여부

    private String startDate;
    private String endDate;

    private boolean facet; // Faceted Search
    private String facetField;

    private String q; // 질의어

    private String preQuary;

    private int start;
    private int rows;

    private int totalPage;
    private int total;
    private int cPage;

    private String subCat;
    private String subCatName;
    private String subDetailCat;

    public SolrSearchForm() {
        indent = "on";
        version = "2.2";
        fl = "*,score"; // 모든 stored 필드 반환
        hl = "on";
        hlFl = HL_FL;
        qt = "standard";

        facet = true;
        facetField = "cat1";

        if (StringUtils.isEmpty(field)) {
            field = "all";
        }
        if (StringUtils.isEmpty(facetField)) {
            facetField = "cat1";
        }
        if (StringUtils.isEmpty(sortField)) {
            sortField = "wdate";
        }

        rows = 10;
        start = 0;
    }

    public SolrSearchForm(HttpServletRequest request) {
        indent = "on";
        version = "2.2";
        fl = "*,score"; // 모든 stored 필드 반환
        hl = "on";
        hlFl = HL_FL;
        qt = "standard";

        facet = true;
        facetField = "cat1";

        cat1 = request.getParameter("cat1");
        cat2 = request.getParameter("cat2");
        cat3 = request.getParameter("cat3");
        cat4 = request.getParameter("cat4");
        field = request.getParameter("field");
        if (StringUtils.isEmpty(field)) {
            field = "all";
        }
        facetField = request.getParameter("facetField");
        if (StringUtils.isEmpty(facetField)) {
            facetField = "cat1";
        }
        sortField = request.getParameter("sortField");
        if (StringUtils.isEmpty(sortField)) {
            sortField = "score";
        }
        q = request.getParameter("q");
        q = Jsoup.clean(q, Whitelist.basic());
        assonant = request.getParameter("assonant");
        searchAgain = request.getParameter("searchAgain");
        startDate = request.getParameter("startDate");
        endDate = request.getParameter("endDate");

        if (StringUtils.isEmpty(startDate)) {
            startDate = "*";
        }
        if (StringUtils.isEmpty(endDate)) {
            endDate = "*";
        }

        //log.debug("request.getAttribute(\"cat1\") =" + request.getAttribute("cat1"));

        //cat1 = StringUtils.isNotEmpty(request.getAttribute("cat1"), "").toString();
        //cat1 = request.getAttribute("cat1").toString();
        rows = 10;

        if (!StringUtils.isEmpty(request.getParameter("cPage"))) {
            cPage = Integer.parseInt(request.getParameter("cPage"));
            start = rows * (cPage - 1);

        } else {
            cPage = 1; // 2019.02.20 paging 처리
            start = 0;
        }
        subCat = request.getParameter("subCat");
        subCatName = request.getParameter("subCatName");
        subDetailCat = request.getParameter("subDetailCat");
    }

    public String getIndent() {
        return indent;
    }

    public void setIndent(String indent) {
        this.indent = indent;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getFl() {
        return fl;
    }

    public void setFl(String fl) {
        this.fl = fl;
    }

    public String getHl() {
        return hl;
    }

    public void setHl(String hl) {
        this.hl = hl;
    }

    public String getHlFl() {
        return hlFl;
    }

    public void setHlFl(String hlFl) {
        this.hlFl = hlFl;
    }

    public String getQt() {
        return qt;
    }

    public void setQt(String qt) {
        this.qt = qt;
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

    public String getCat4() {
        return cat4;
    }

    public void setCat4(String cat4) {
        this.cat4 = cat4;
    }

    public String getSortField() {
        return sortField;
    }

    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getAssonant() {
        return assonant;
    }

    public void setAssonant(String assonant) {
        this.assonant = assonant;
    }

    public String getSearchAgain() {
        return searchAgain;
    }

    public void setSearchAgain(String searchAgain) {
        this.searchAgain = searchAgain;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public boolean isFacet() {
        return facet;
    }

    public void setFacet(boolean facet) {
        this.facet = facet;
    }

    public String getFacetField() {
        return facetField;
    }

    public void setFacetField(String facetField) {
        this.facetField = facetField;
    }

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }

    public String getPreQuary() {
        return preQuary;
    }

    public void setPreQuary(String preQuary) {
        this.preQuary = preQuary;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getcPage() {
        return cPage;
    }

    public void setcPage(int cPage) {
        this.cPage = cPage;
    }

    public String getSubCat() {
        return subCat;
    }

    public void setSubCat(String subCat) {
        this.subCat = subCat;
    }

    public String getSubDetailCat() {
        return subDetailCat;
    }

    public void setSubDetailCat(String subDetailCat) {
        this.subDetailCat = subDetailCat;
    }

    public String getSubCatName() {
        return subCatName;
    }

    public void setSubCatName(String subCatName) {
        this.subCatName = subCatName;
    }
}
