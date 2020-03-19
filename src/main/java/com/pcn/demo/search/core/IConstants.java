package com.pcn.demo.search.core;

/**
 * @class IConstants
 * 	com.ildong.idop.service.web.search.core
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
public interface IConstants {
    public static final String Y = "Y";
    public static final String N = "N";

    public static final int URL_CONTENTS_LENGTH = 5000;
    public static final int CROP_SIZE_NO_IMG = 1480;
    public static final int CROP_SIZE_WITH_IMG = 1220;
    public static final int HL_FRAGSIZE = CROP_SIZE_NO_IMG;
    public static final int CROP_SIZE_IMG_LIST = 26;

    public static final String MORE_TEXT = "";

    public static final int MAIN_NORMAL_LIMIT = 3;

    public static final String KEY_MY_SEARCH_TEXTS = "my_search_texts";
    public static final String MY_SEARCH_TEXTS_SEPARATOR = ",";

    public static final String HL_FL = "name,subject,content";

    //public static final String SITE_URL = "http://www.nongshim.com";

    public static final int MY_SEARCH_TEXT_LIST_SIZE = 10;
}
