package com.pcn.demo.search.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpSession;


import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;

import com.pcn.demo.search.service.form.SolrGroupSearchForm;
import com.pcn.demo.search.service.form.SolrSearchForm;

public interface SearchService {
    SolrDocumentList getSearchResults(SolrSearchForm searchForm, HttpSession session);

    List<List<Group>> getGroupSearchResults(SolrGroupSearchForm searchForm, HttpSession session);

    List<String> getSuggestions(String q);

    SolrDocumentList getMoreLikeThis(String q) throws IOException, SolrServerException;

    void setHighlightingByGroup(QueryResponse rsp, SolrDocumentList solrDocumentList, String hlFl);
}
