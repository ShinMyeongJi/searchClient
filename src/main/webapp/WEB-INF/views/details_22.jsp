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
    <!--[if lt IE 9]>
    <script src="/static/js/html5shiv.min.js"></script>
    <link rel="stylesheet" href="/static/css/font/notosanskr-eot.min.css">
    <![endif]-->
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

      $('.ui-autocomplete').css('top','85px');
      $('.ui-autocomplete').css('left','460px');
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
    <!-- skip -->
    <a href="#content" class="skip-navigation">본문으로 바로가기</a>
    <!-- //skip -->
    <!-- container -->
    <div class="container">
        <!-- content -->
        <main id="content" class="content">
            <!-- searchCont -->
            <div class="searchCont">
                <!-- search -->
                <div class="search totalSearch">
                    <form action="/" class="totalSearch">
                        <fieldset>
                            <legend>검색어 검색</legend>
                            <input type="text" name="q" class="textfield" placeholder="검색어를 입력해주세요" value="${searchForm.q}">
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
                            <li><a href="/search/search?q=${searchForm.q}">전체</a></li>
                            <li><a href="/search/11?q=${searchForm.q}">의약품정보</a></li>
                            <li class="current"><a href="/search/22?q=${searchForm.q}">우리동네 주치의 Q&amp;A</a></li>
                            <li><a href="/search/23?q=${searchForm.q}">건강포인트</a></li>
                            <li><a href="/search/24?q=${searchForm.q}">의학칼럼</a></li>
                            <li><a href="/search/26?q=${searchForm.q}">동네사람들 건강이야기</a></li>
                            <li><a href="/search/27?q=${searchForm.q}">이벤트</a></li>
                        </ul>
                        <!-- //tab -->

                        <!-- message -->
                        <div class="message">
                            <strong>${searchForm.q}</strong>에 대한 검색결과는 총 <strong>${total}</strong>건 입니다.
                        </div>
                        <!-- //message -->
                        <!-- no-data -->
                        <c:if test="${empty total}">
                            <p class="no-data">
                                <strong>검색결과가 없습니다.</strong>
                                검색어를 다시 한번 확인해주세요.
                            </p>
                        </c:if>
                        <!-- //no-data -->
                        <!-- search -->
                        <div class="search">
                            <form action="/search/22" id="detailSearch">
                                <fieldset>
                                    <legend>기간 검색</legend>
                                    <em>기간</em>
                                    <!-- date-group -->
                                    <div class="date-group">
											<span class="datepicker datepicker-type01">
												<input type="text" name="startDate" class="datepicker-input textfield" data-dp-group="dpGroup1" data-mask="0000-00-00" placeholder="YYYY-MM-DD" title="시작일">
											</span>
                                        <em class="space">-</em>
                                        <span class="datepicker datepicker-type01">
												<input type="text" name="endDate" class="textfield datepicker-input" data-dp-group="dpGroup1" data-mask="0000-00-00" placeholder="YYYY-MM-DD" title="종료일">
											</span>
                                    </div>
                                    <!-- //date-group -->
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
                        <!-- heading-depth03 -->
                        <div class="heading heading-depth03">
                            <h3 class="title">우리동네 주치의 Q&amp;A <span class="color01">${total}</span></h3>
                        </div>
                        <!-- //heading-depth03 -->
                        <!-- board-type01 -->
                        <div class="board-type01">
                            <c:forEach var="item" items="${items}">
                                <!-- feed -->
                                <div class="feed">
                                    <!-- feed -->
                                    <div class="feed">
                                        <!-- feed-head -->
                                        <div class="feed-head">
                                            <i class="icon icon-question01 sr-only-text">질문</i>
                                            <a href="/"  class="title">
                                                <span class="tags tags-sizeL tags-bg01">${item.subcat}</span>
                                                <span> ${item.name}</span>
                                            </a>
                                            <div class="tags-group">
                                                <c:set var="keywords" value="${fn:split(item.subject, ',')}"/>
                                                <c:forEach var="keyword" items="${keywords}">
                                                    <span class="tags">#${keyword}</span>
                                                </c:forEach>
                                            </div>
                                            <ul class="list-bar">
                                                <li>${item.wdate}</li>
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
                                                <p>${item.content}</p>
                                            </div>
                                            <!-- //text -->
                                            <ul class="list-bar">
                                                <li>${item.rpwdate}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- //feed-bg -->
                            </c:forEach>
                        </div>
                        <!-- //board-type01 -->
                        <!-- paging-type01 -->
                        <%-- <div class="paging-type01">
                             <a href="/" class="first">첫 페이지</a>
                             <a href="/" class="prev">이전 페이지</a>
                             <strong title="현재 페이지"><span>1</span></strong>
                             <a href="/"><span>2</span></a>
                             <a href="/"><span>3</span></a>
                             <a href="/"><span>4</span></a>
                             <a href="/"><span>5</span></a>
                             <a href="/"><span>6</span></a>
                             <a href="/"><span>7</span></a>
                             <a href="/"><span>8</span></a>
                             <a href="/"><span>9</span></a>
                             <a href="/"><span>10</span></a>
                             <a href="/" class="next">다음 페이지</a>
                             <a href="/" class="last">마지막 페이지</a>
                         </div>--%>
                        <!-- //paging-type01 -->
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
</body>
</html>
