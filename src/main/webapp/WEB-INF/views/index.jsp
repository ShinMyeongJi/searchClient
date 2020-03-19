<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="일동제약">
    <meta name="keyword" content="일동제약, 후다닥, ID Online Platform, 일동제약 온라인 플렛폼">
    <meta name="description" content="ID Online Platform, 일동제약 온라인 플렛폼">
    <meta name="format-detection" content="telephone=no">
    <title>후다닥 의료소비자</title>
    <!--[if lt IE 9]><![endif]-->
    <!--<script src="/static/js/html5shiv.min.js"></script>-->
    <link rel="stylesheet" href="/static/css/font/notosanskr-eot.min.css">

    <script src="/static/js/webfont.min.js"></script>
    <link rel="shortcut icon" href="/static/img/common/ico_favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/static/css/common/feCommon.css">
    <link href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" rel="Stylesheet"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js" ></script>
</head>
<script>
  $(function(){
      var keyword="";
      var res = [];

      $(".textfield").keyup(function () {
        keyword =  $(".textfield").val();
        if(keyword != "") {
          $.ajax({
            url: "/autocomplete",
            type: "POST",
            data: keyword,
            success: function (result) {
              res = result;
              $( ".textfield" ).autocomplete({
                source: res,
                appendTo: ".totalSearch"
              });

            }
          });
        }

        $('.ui-autocomplete').css('text-align','center');
        $('.ui-autocomplete').css('width','590px');
        $('.ui-autocomplete').css('position','relative');
        $("#ui-id-1").css('display', 'inline-block');


      });


      $("#detailSearch").submit(function(event){
        $("#q").val($(".textfield").val());
      })
    });

    $.ajax({
        url: "/populars",
        type: "GET",
        success: function(data){
          var values = data;
          $.each(values, function( index, value ) {
            if(index == 10) return false;
            $(".rank-ul").append("<li><a href='/search/search?q="+value+"'><strong>" + Number(index+1) + "</strong>" + value + "</a></li>")
          });
        },
        error: function(){
          alert("stringify err");
        }
    });
</script>
<body>
    <!-- wrap -->
    <div class="wrap">
        <!-- container -->
        <div class="container">
            <!-- content -->
            <main id="content" class="content">
                <!-- searchCont -->
                <div class="searchCont">
                    <!-- search -->
                    <div class="search totalSearch">
                        <form action="/search/search" class="totalSearch" method="get">
                            <fieldset class="searchArea">
                                <legend>검색어 검색</legend>
                                <input type="text" name="q" class="textfield" placeholder="검색어를 입력해주세요" value="${searchForm.q}"/>
                                <button type="submit" class="btn btn-type01 btn-bg01">검색</button>
                            </fieldset>
                        </form>
                    </div>
                    <!-- //search -->
                    <div class="inner">
                        <section>
                            <c:if test="${not empty suggestions}">
                                <!-- desc -->
                                <p class="desc">
                                    <strong>연관검색어</strong>
                                    <c:forEach var="suggestion" items="${suggestions}">
                                        <a href="/search/search?q=${suggestion}">${suggestion}</a>
                                    </c:forEach>
                                </p>
                                <!-- //desc -->
                            </c:if>
                            <!-- tab -->
                            <ul class="tab tab-type03 tab-size05">
                                <li class="current"><a href="/search/search?q=${searchForm.q}">전체</a></li>
                                <li><a href="/search/11?q=${searchForm.q}">의약품정보</a></li>
                                <li><a href="/search/22?q=${searchForm.q}">우리동네 주치의 Q&amp;A</a></li>
                                <li><a href="/search/23?q=${searchForm.q}">건강포인트</a></li>
                                <li><a href="/search/24?q=${searchForm.q}">의학칼럼</a></li>
                                <li><a href="/search/26?q=${searchForm.q}">동네사람들 건강이야기</a></li>
                                <li><a href="/search/27?q=${searchForm.q}">이벤트</a></li>
                            </ul>
                            <!-- //tab -->
                            <h2 class="sr-only">통합검색 전체</h2>
                            <!-- message -->
                            <div class="message">
                                <strong>${searchForm.q}</strong>에 대한 검색결과는 총 <strong>${searchForm.total}</strong>건 입니다.
                            </div>
                            <!-- //message -->
                            <!-- no-data -->
                            <c:if test="${searchForm.total eq '0'}">
                                <p class="no-data">
                                    <strong>검색결과가 없습니다.</strong>
                                    검색어를 다시 한번 확인해주세요.
                                </p>
                            </c:if>

                            <!-- //no-data -->
                            <!-- search -->
                            <div class="search">
                                <form action="/search/search" id="detailSearch">
                                    <fieldset>
                                        <legend>기간 검색</legend>
                                        <em>기간</em>
                                        <!-- date-group -->
                                        <div class="date-group">
                                                <span class="datepicker datepicker-type01">
                                                    <input name="startDate" type="text" class="datepicker-input textfield" data-dp-group="dpGroup1" data-mask="0000-00-00" placeholder="YYYY-MM-DD" title="시작일">
                                                </span>
                                            <em class="space">-</em>
                                            <span class="datepicker datepicker-type01">
                                                    <input name="endDate" type="text" class="textfield datepicker-input" data-dp-group="dpGroup1" data-mask="0000-00-00" placeholder="YYYY-MM-DD" title="종료일">
                                                </span>
                                        </div>
                                        <input name ="q" id="q" type="hidden" title="통합검색" placeholder="검색어를 입력해주세요" value="${searchForm.q}">
                                        <button type="submit" class="btn btn-type01 btn-bg01">결과 내 검색</button>
                                        <!-- select -->
                                        <select class="select" name="sortField" title="분류선택" style="width: 20%">
                                            <option value="">정렬</option>
                                            <option value="wdate" <c:if test="${searchForm.sortField eq 'wdate'}">selected</c:if>>최신순</option>
                                            <option value="score" <c:if test="${searchForm.sortField eq 'score'}">selected</c:if>>정확도 순</option>
                                        </select>
                                        <!-- //select -->
                                    </fieldset>
                                </form>
                            </div>
                            <!-- //search -->

                            <c:if test="${not empty numPerGroup.get('11')}">
                                <!-- heading-depth03 -->
                                <div class="heading heading-depth03">
                                    <h3 class="title">의약품 정보 <span class="color01">${numPerGroup.get("11")}</span></h3>
                                    <div class="right">
                                        <a href="/" class="btn btn-link underline" role="button"><strong>더보기<i class="icon-angle"></i></strong></a>
                                    </div>
                                </div>
                                <!-- //heading-depth03 -->

                                <!-- board-dic -->
                                <div class="board-dic">
                                    <c:forEach var="groups" items="${items}">
                                        <c:forEach var="group" items="${groups}">
                                            <c:forEach var="res" items="${group.result}" varStatus="status">
                                              <c:if test="${res.cat1 eq '11'}">
                                                  <!-- item -->
                                                  <div class="item">
                                                      <strong>${res.name}</strong>
                                                      <ul>
                                                          <li>
                                                              <span>업체명</span>
                                                              <div>${res.subject}</div>
                                                          </li>
                                                          <li>
                                                              <span>약품 타입</span>
                                                              <div>${res.etc}</div>
                                                          </li>
                                                          <li>
                                                              <span>주성분</span>
                                                              <div>${res.content}</div>
                                                          </li>
                                                      </ul>
                                                  </div>
                                                  <!-- //item -->
                                              </c:if>
                                            </c:forEach>
                                        </c:forEach>
                                    </c:forEach>
                                </div>
                                <!-- //board-dic -->
                            </c:if>
                            <c:if test="${not empty numPerGroup.get('22')}">
                                <div class="heading heading-depth03">
                                    <h3 class="title">우리동네 주치의 Q&amp;A <span class="color01">${numPerGroup.get("22")}</span></h3>
                                    <div class="right">
                                        <a href="/" class="btn btn-link underline" role="button"><strong>더보기<i class="icon-angle"></i></strong></a>
                                    </div>
                                </div>
                                <!-- //heading-depth03 -->
                                <!-- board-type01 -->
                                <div class="board-type01">
                                    <c:forEach var="groups" items="${items}">
                                        <c:forEach var="group" items="${groups}">
                                            <c:forEach var="res" items="${group.result}" varStatus="status">
                                                <c:if test="${res.cat1 eq '22'}">
                                                    <!-- feed -->
                                                    <div class="feed">
                                                        <!-- feed-head -->
                                                        <div class="feed-head">
                                                            <i class="icon icon-question01 sr-only-text">질문</i>
                                                            <a href="/"  class="title">
                                                                <span class="tags tags-sizeL tags-bg01">${res.subcat}</span>
                                                                <span> ${res.name}</span>
                                                            </a>
                                                            <div class="tags-group">
                                                                <c:set var="keywords" value="${fn:split(res.subject, ',')}"/>
                                                                <c:forEach var="keyword" items="${keywords}">
                                                                    <span class="tags">#${keyword}</span>
                                                                </c:forEach>
                                                            </div>
                                                            <ul class="list-bar">
                                                                <li>${res.wdate}</li>
                                                            </ul>
                                                        </div>
                                                        <!-- //feed-head -->
                                                    </div>
                                                    <!-- //feed -->
                                                    <!-- feed-bg -->
                                                    <div class="feed feed-bg">
                                                        <i class="icon-answer sr-only-text">답변</i>
                                                        <div class="feed-body">
                                                            <!-- text -->
                                                            <div class="text">
                                                                <p>${res.content}</p>
                                                            </div>
                                                            <!-- //text -->
                                                            <ul class="list-bar">
                                                                <li>${res.rpwdate}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <!-- //feed-bg -->
                                                </c:if>
                                            </c:forEach>
                                        </c:forEach>
                                    </c:forEach>
                                </div>
                                <!-- //board-type01 -->
                            </c:if>
                            <c:if test="${not empty numPerGroup.get('23')}">
                                <!-- heading-depth03 -->
                                <div class="heading heading-depth03">
                                    <h3 class="title">건강 포인트 <span class="color01">${numPerGroup.get("23")}</span></h3>
                                    <div class="right">
                                        <a href="/" class="btn btn-link underline" role="button"><strong>더보기<i class="icon-angle"></i></strong></a>
                                    </div>
                                </div>
                                <!-- //heading-depth03 -->
                                <!-- boardCard -->
                                <ul class="boardCard">
                                    <c:forEach var="groups" items="${items}">
                                        <c:forEach var="group" items="${groups}">
                                            <c:forEach var="res" items="${group.result}" varStatus="status">
                                                <c:if test="${res.cat1 eq '23'}">
                                                    <li>
                                                        <!-- item -->
                                                        <a href="/" class="item ani-scale">
                                                            <!-- item-img -->
                                                            <div class="item-img dimmed img-size01">
                                                                <img src="https://dummyimage.com/310x175/ffc0cb/fff" alt="">
                                                                <i class="icon-mediaPlay01"></i>
                                                            </div>
                                                            <!-- //item-img -->
                                                            <!-- item-body -->
                                                            <div class="item-body">
                                                                <span class="underline-ctg">${res.subcat}</span>
                                                                <strong class="title">${res.name}</strong>
                                                                <div class="item-foot">
                                                                    <c:set var="keywords" value="${fn:split(res.subject, ',')}"/>
                                                                    <c:forEach var="keyword" items="${keywords}">
                                                                        <span>#${keyword}</span>
                                                                    </c:forEach>
                                                                </div>
                                                            </div>
                                                            <!-- //item-body -->
                                                        </a>
                                                        <!-- //item -->
                                                    </li>
                                                </c:if>
                                            </c:forEach>
                                        </c:forEach>
                                    </c:forEach>
                                </ul>
                                <!--// boardCard -->
                            </c:if>
                            <c:if test="${not empty numPerGroup.get('24')}">
                                <!-- heading-depth03 -->
                                <div class="heading heading-depth03">
                                    <h3 class="title">의학 칼럼 <span class="color01">${numPerGroup.get("24")}</span></h3>
                                    <div class="right">
                                        <a href="/" class="btn btn-link underline" role="button"><strong>더보기<i class="icon-angle"></i></strong></a>
                                    </div>
                                </div>
                                <!-- //heading-depth03 -->
                                <!-- boardCard -->
                                <ul class="boardCard">
                                    <c:forEach var="groups" items="${items}">
                                        <c:forEach var="group" items="${groups}">
                                            <c:forEach var="res" items="${group.result}" varStatus="status">
                                                <c:if test="${res.cat1 eq '24'}">
                                                    <li>
                                                        <!-- item -->
                                                        <a href="/" class="item ani-scale">
                                                            <!-- item-img -->
                                                            <div class="item-img dimmed img-size01">
                                                                <img src="https://dummyimage.com/310x175/ffc0cb/fff" alt="">
                                                                <i class="icon-mediaPlay01"></i>
                                                            </div>
                                                            <!-- //item-img -->
                                                            <!-- item-body -->
                                                            <div class="item-body">
                                                                <span class="underline-ctg">${res.subcat}</span>
                                                                <strong class="title">${res.name}</strong>
                                                                <div class="item-foot">
                                                                    <c:set var="keywords" value="${fn:split(res.subject, ',')}"/>
                                                                    <c:forEach var="keyword" items="${keywords}">
                                                                        <span>#${keyword}</span>
                                                                    </c:forEach>
                                                                </div>
                                                            </div>
                                                            <!-- //item-body -->
                                                        </a>
                                                        <!-- //item -->
                                                    </li>
                                                </c:if>
                                            </c:forEach>
                                        </c:forEach>
                                    </c:forEach>
                                </ul>
                                <!--// boardCard -->
                            </c:if>
                            <c:if test="${not empty numPerGroup.get('26')}">
                                <!-- heading-depth03 -->
                                <div class="heading heading-depth03">
                                    <h3 class="title">동네사람들 건강이야기 <span class="color01">${numPerGroup.get("26")}</span></h3>
                                    <div class="right">
                                        <a href="/" class="btn btn-link underline" role="button"><strong>더보기<i class="icon-angle"></i></strong></a>
                                    </div>
                                </div>
                                <!-- //heading-depth03 -->
                                <!-- table -->
                                <div class="table table-bg01">
                                    <table>
                                        <caption>동네사람들 건강이야기</caption>
                                        <colgroup>
                                            <col style="width: auto;">
                                            <col style="width: 150px;">
                                        </colgroup>
                                        <tbody>
                                            <c:forEach var="groups" items="${items}">
                                                <c:forEach var="group" items="${groups}">
                                                    <c:forEach var="res" items="${group.result}" varStatus="status">
                                                        <c:if test="${res.cat1 eq '26'}">
                                                            <tr>
                                                                <td class="align-left">
                                                                    <a href="/" class="title">
                                                                        <span class="tags tags-sizeL tags-bg01">${res.subcat}</span>
                                                                        <span>${res.name}</span>
                                                                    </a>
                                                                    <div class="tags-group">
                                                                        <c:set var="keywords" value="${fn:split(res.subject, ',')}"/>
                                                                        <c:forEach var="keyword" items="${keywords}">
                                                                            <span class="tags">#${keyword}</span>
                                                                        </c:forEach>
                                                                    </div>
                                                                </td>
                                                                <td class="color05 verticalT">${res.wdate}</td>
                                                            </tr>
                                                        </c:if>
                                                    </c:forEach>
                                                </c:forEach>
                                            </c:forEach>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- //table -->
                            </c:if>
                            <c:if test="${not empty numPerGroup.get('27')}">
                                <!-- heading-depth03 -->
                                <div class="heading heading-depth03">
                                <h3 class="title">이벤트 <span class="color01">${numPerGroup.get("27")}</span></h3>
                                <div class="right">
                                <a href="/" class="btn btn-link underline" role="button"><strong>더보기<i class="icon-angle"></i></strong></a>
                                </div>
                                </div>
                                <!-- //heading-depth03 -->
                                <!-- card -->
                                <ul class="card card-type03 card-row card-full">
                                <c:forEach var="groups" items="${items}">
                                    <c:forEach var="group" items="${groups}">
                                        <c:forEach var="res" items="${group.result}" varStatus="status">
                                            <c:if test="${res.cat1 eq '27'}">
                                                <li>
                                                    <!-- item -->
                                                    <div class="item">
                                                        <div class="card-img">
                                                            <img src="https://dummyimage.com/160x160/ffc0cb/fff" alt="">
                                                        </div>
                                                        <div class="card-body">
                                                            <ul class="list-bar">
                                                                <li class="color01">${res.subcat}</li>
                                                            </ul>
                                                            <a href="/" class="title">
                                                                    ${res.name}
                                                            </a>
                                                            <div class="card-date">
                                                                <span>yyyy-mm-dd ~ yyyy-mm-dd</span><span class="label">진행중</span>
                                                            </div>
                                                            <div class="card-foot">${res.wdate}</div>
                                                        </div>
                                                    </div>
                                                    <!-- //item -->
                                                </li>
                                            </c:if>
                                        </c:forEach>
                                    </c:forEach>
                                </c:forEach>
                                </ul>
                                <!-- //card -->
                            </c:if>
                        </section>
                        <aside>
                            <!-- heading-depth02 -->
                            <div class="heading heading-depth02">
                                <h3 class="title">인기 검색어</h3>
                            </div>
                            <!-- //heading-depth02 -->
                            <!-- rank -->
                            <div class="rank">
                                <ul class="rank-ul">

                                </ul>
                            </div>
                            <!-- //rank-->

                        </aside>
                    </div>
                    <!-- //searchCont -->
                </div>
            </main>
            <!-- //content -->
            <footer id="footer" class="footer">
                <!-- footer-linkWrap -->
                <div class="footer-linkWrap">
                    <div class="inner">
                        <ul class="footer-link">
                            <li><a href="/">이용약관</a></li>
                            <li><a href="/" class="color01">개인정보처리방침</a></li>
                            <li><a href="/">위치기반 서비스 이용약관</a></li>
                            <li><a href="/">제휴업체</a></li>
                        </ul>
                    </div>
                </div>
                <!-- //footer-linkWrap -->

            </footer>
        </div>
        <!-- //container -->
    </div>
    <!-- //wrap -->
    <%--<script src="/static/js/vendor.min.js"></script>
    <script src="/static/js/feCommon.js"></script>--%>
</body>
</html>
