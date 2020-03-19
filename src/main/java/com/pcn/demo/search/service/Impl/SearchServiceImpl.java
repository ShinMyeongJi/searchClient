package com.pcn.demo.search.service.Impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpSession;


import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrResponse;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.impl.XMLResponseParser;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.GroupCommand;
import org.apache.solr.client.solrj.response.GroupResponse;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.MoreLikeThisParams;
import org.apache.solr.common.params.RequiredSolrParams;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.hibernate.validator.constraints.SafeHtml.WhiteListType;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pcn.demo.search.core.IConstants;
import com.pcn.demo.search.service.SearchService;
import com.pcn.demo.search.service.form.SolrGroupSearchForm;
import com.pcn.demo.search.service.form.SolrSearchForm;

@Service
public class SearchServiceImpl implements SearchService, IConstants {

    @Value("${solr.server.url}")
    private String url;

    @Value("${solr.core.name}")
    private String coreName;


    private Logger logger = LoggerFactory.getLogger(SearchServiceImpl.class);

    private HttpSolrClient httpSolrClient;

    public HttpSolrClient getHttpSolrClient() {
        if(httpSolrClient == null) {
            httpSolrClient = new HttpSolrClient(url + coreName);
        }
        return httpSolrClient;
    }

    @Override
    public SolrDocumentList getSearchResults(SolrSearchForm searchForm, HttpSession session) {
        QueryResponse response = null;

        try{
            String q = searchForm.getQ();
            q = Jsoup.clean(q, Whitelist.basic());
            if(StringUtils.isEmpty(q)){
                return null;
            }

            //쿼리작성
            StringBuffer sb = new StringBuffer()
                .append("(name:").append(q)
                .append(" OR ")
                .append("subject:").append(q)
                .append(" OR ")
                .append("content:").append(q).append(")")
                .append(" AND ")
                .append("cat1 : ").append(searchForm.getCat1());

          /*  if(!StringUtils.isEmpty(searchForm.getCat1())) sb.append(" AND cat1:").append(searchForm.getCat1());
            else if(!StringUtils.isEmpty(searchForm.getCat2())) sb.append(" AND cat2:").append(searchForm.getCat2());
            else if(!StringUtils.isEmpty(searchForm.getCat3())) sb.append(" AND cat3:").append(searchForm.getCat3());*/

            SolrQuery sq = new SolrQuery()
                .setParam("fq", "wdate:[" + searchForm.getStartDate() + " TO " + searchForm.getEndDate() + "]")
                .addSort(searchForm.getSortField(), ORDER.asc)
                .setHighlight(true)
                .addHighlightField(HL_FL)
                .setParam("hl.maxAnalyzedChars", "52300")
                .setParam("rows", "10")
                .setQuery(sb.toString());

            //결과 내 재검색
            String preQuery = "";
            if("Y".equals(searchForm.getSearchAgain())){
                if(session.getAttribute("preQuery") != null){
                    preQuery = (String)session.getAttribute("preQuery");
                }
                sq.addFilterQuery(new String[] {preQuery});
                if(StringUtils.isEmpty(preQuery)){
                    preQuery = sq.getQuery();
                } else {
                    preQuery = preQuery + " AND " + sq.getQuery();
                }
            }else{
                preQuery = sq.getQuery();
            }

            logger.debug("SolrQuery : {}", sq.toString());

            HttpSolrClient server = getHttpSolrClient();
            server.setParser(new XMLResponseParser());
            response = server.query(sq);

            logger.debug("getSearchResults : {}", response.getResults());

        }catch (Exception e){

        }


        return response.getResults();
    }

    @Override
    public List<List<Group>> getGroupSearchResults(SolrGroupSearchForm searchForm, HttpSession session) {
        List<List<Group>> items = null;

        try{
            String q = searchForm.getQ();
            q = Jsoup.clean(q, Whitelist.basic());
            if(StringUtils.isEmpty(q)){
                return items;
            }

            //쿼리작성
            StringBuffer sb = new StringBuffer()
                .append("name:").append(q)
                .append(" OR ")
                .append("subject:").append(q)
                .append(" OR ")
                .append("content:").append(q);

            if(!StringUtils.isEmpty(searchForm.getCat1())) sb.append(" AND cat1:").append(searchForm.getCat1());
            else if(!StringUtils.isEmpty(searchForm.getCat2())) sb.append(" AND cat2:").append(searchForm.getCat2());
            else if(!StringUtils.isEmpty(searchForm.getCat3())) sb.append(" AND cat3:").append(searchForm.getCat3());

            SolrQuery sq = new SolrQuery()
                .setParam("group", true)
                .setParam("group.field", searchForm.getClazz()) // cat1
                .setParam("group.limit", String.valueOf(searchForm.getLimit())) // 한 그룹 당 get하는 document 개수
                .setParam("fq", "wdate:[" + searchForm.getStartDate() + " TO " + searchForm.getEndDate() + "]")
                .addSort(searchForm.getSortField(), ORDER.asc)
                .setHighlight(true)
                .addHighlightField(HL_FL)
                .setParam("hl.maxAnalyzedChars", "52300")
                .setQuery(sb.toString());

            //결과 내 재검색
            String preQuery = "";
            if("Y".equals(searchForm.getSearchAgain())){
                if(session.getAttribute("preQuery") != null){
                    preQuery = (String)session.getAttribute("preQuery");
                }
                sq.addFilterQuery(new String[] {preQuery});
                if(StringUtils.isEmpty(preQuery)){
                    preQuery = sq.getQuery();
                } else {
                    preQuery = preQuery + " AND " + sq.getQuery();
                }
            }else{
                preQuery = sq.getQuery();
            }

            logger.debug("SolrQuery : {}", sq.toString());

            HttpSolrClient server = getHttpSolrClient();
            server.setParser(new XMLResponseParser());
            QueryResponse response = server.query(sq);



            if(response != null){
                GroupResponse group = response.getGroupResponse();
                List<GroupCommand> list = group.getValues();
                items = new ArrayList<>();

                SolrDocumentList solrDocumentList = null;

                for(int i = 0; i < list.size(); i++) {
                    GroupCommand gc = list.get(i);
                    items.add(gc.getValues());
                    searchForm.setTotal(gc.getMatches());
                }
            }

            session.setAttribute("preQuery", preQuery);

        }catch(IOException | SolrServerException e){
            e.printStackTrace();
        }

        return items;
    }

    @Override
    public List<String> getSuggestions(String q) {
        return null;
    }

    @Override
    public SolrDocumentList getMoreLikeThis(String q) throws IOException, SolrServerException {

        StringBuffer sb = new StringBuffer()
            .append("name:").append(q);

        SolrQuery solrQuery = new SolrQuery()
            .setRequestHandler("/mlt")
            .setParam(MoreLikeThisParams.SIMILARITY_FIELDS, "name")
            .setParam(MoreLikeThisParams.MIN_TERM_FREQ, "1")
            .setParam(MoreLikeThisParams.MIN_DOC_FREQ, "1")
            .setParam("fl", "name")
            .setParam("rows", "5")
            .setQuery(sb.toString());

        logger.debug("getMoreLikeThis : {}", solrQuery);


        HttpSolrClient server = getHttpSolrClient();
        server.setParser(new XMLResponseParser());
        QueryResponse response = server.query(solrQuery);

        logger.debug("MoreLikeThis Response : {}", response);

        return response.getResults();
    }

    @Override
    public void setHighlightingByGroup(QueryResponse rsp, SolrDocumentList solrDocumentList, String hlFl) {

    }
}
