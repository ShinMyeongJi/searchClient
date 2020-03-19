package com.pcn.demo.search.controller;

    import java.io.IOException;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpSession;

    import org.apache.commons.lang3.StringUtils;
    import org.apache.solr.client.solrj.SolrServerException;
    import org.apache.solr.client.solrj.response.Group;
    import org.apache.solr.common.SolrDocumentList;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;

    import com.pcn.demo.search.service.SearchService;
    import com.pcn.demo.search.service.form.SolrGroupSearchForm;
    import com.pcn.demo.search.service.form.SolrSearchForm;

@Controller
@RequestMapping(value = SearchController.URL_PREFIX)
public class SearchController {

    private Logger logger = LoggerFactory.getLogger(SearchController.class);

    public static final String URL_PREFIX = "/search/";
    public static final String SEARCH = "search";
    @Autowired
    private SearchService searchService;

    @RequestMapping(method = RequestMethod.GET, path = SEARCH)
    public String groupSearch(HttpServletRequest request, Model model, HttpSession session) throws IOException, SolrServerException {
        String q = request.getParameter("q");
        Map<String, Long> numPerGroup = new HashMap<String, Long>();

        if(StringUtils.isNotEmpty(q)){
            SolrGroupSearchForm searchForm = new SolrGroupSearchForm(request);
            List<List<Group>> items = searchService.getGroupSearchResults(searchForm, session);
            for(List<Group> groups : items){
                for(Group group : groups){
                    numPerGroup.put(group.getGroupValue(), group.getResult().getNumFound());
                }
            }

            model.addAttribute("items", items);
            model.addAttribute("numPerGroup", numPerGroup);
            model.addAttribute("searchForm", searchForm);
            model.addAttribute("suggestions", getSuggestion(q));

        }
        return "index";
    }

    @RequestMapping(method = RequestMethod.GET, value = "{cat1}")
    public String search(
        HttpServletRequest request,
        Model model,
        HttpSession session,
        @PathVariable("cat1") String cat
    ) throws IOException, SolrServerException {
        String q = request.getParameter("q");

        SolrSearchForm solrSearchForm = new SolrSearchForm(request);
        solrSearchForm.setCat1(cat);


        SolrDocumentList items = searchService.getSearchResults(solrSearchForm, session);

        model.addAttribute("items", items);
        model.addAttribute("total", items.getNumFound());
        model.addAttribute("searchForm", solrSearchForm);
        model.addAttribute("suggestions", getSuggestion(q));

        return "details_" + cat;
    }


    public List<Object> getSuggestion(String q) throws IOException, SolrServerException {

        List<Object> suggestions = new ArrayList<>();

        SolrDocumentList docList = searchService.getMoreLikeThis(q);
        logger.debug("getSuggestion get SolrDocumentList: {}", docList);

        if (docList != null) {
            for(Map list : docList){
                suggestions.add(list.get("name"));
            }
        }

        return suggestions;
    }

}
