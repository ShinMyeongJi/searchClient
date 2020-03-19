package com.pcn.demo.search.controller;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@RestController
@RequestMapping(value = KeywordController.URL_PREFIX)
public class KeywordController {

    public final static String URL_PREFIX = "";

    @Value("${solr.server.url}")
    private String server_url;

    @RequestMapping(method = RequestMethod.GET, path = "/populars")
    public ArrayList<String> getPopulars() throws IOException, ParseException {
        ArrayList<String> keywords = new ArrayList<String>();
        String url = server_url + "populars.json";

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(getBuffer(url).toString());
        JSONArray json = (JSONArray) jsonObject.get("items");

        for (int i = 0; i < json.size(); i++) {
            JSONObject keyword = (JSONObject) json.get(i);
            keywords.add(keyword.get("poWord").toString());
        }

        return keywords;
    }


    @RequestMapping(method = RequestMethod.POST, path = "/autocomplete")
    public ArrayList<String> getAutocomplete(@RequestBody String data) throws IOException, ParseException {
        String url = server_url + "suggestion.json?q=" + data.substring(0, data.length()-1);

        JSONArray sugArray = (JSONArray) (new JSONParser()).parse(getBuffer(url).toString());
        ArrayList<String> sugList = new ArrayList<>();

        int i = 0;
        for(Object list : sugArray){
            if(i == 10) break;
            sugList.add(list.toString());
            i++;
        }

        return sugList;
    }

    public StringBuffer getBuffer(String url) throws IOException {
        BufferedInputStream reader = null;
        StringBuffer buffer = new StringBuffer();
        try {

            URL requestURL = new URL(url);
            reader = new BufferedInputStream(requestURL.openStream());

            int i = 0;
            byte[] b = new byte[4096];
            while ((i = reader.read(b)) != -1) {
                buffer.append(new String(b, 0, i));
            }

        } catch (Exception e) {

        } finally {
            if (reader != null)
                reader.close();
        }

        return buffer;
    }
}
