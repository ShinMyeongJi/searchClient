/* feCommon.js | IDOP CONSUMER PC */
/*
	Required(Vendor)
	- jQuery v3.4.0
	- jQuery UI v1.12.1: widget.js, data.js, focusable.js, keycode.js, scroll-parent.js, widgets/draggable.js, widgets/sortable.js, widgets/datepicker.js, widgets/mouse.js
	- jQuery Browser mobile
	- jQuery CSS Customizable Scorllbar v0.2.10
	- jQuery Modal v0.9.2
	- jQuery Mask 1.14.15
	- jQuery selectize v0.12.6
	- jQuery Slick slider 1.8.0
	- jQuery Highlight
	- jQuery ellipsis
*/
var feUI = feUI || {};
(function (feUI, $, window, document, undefined) {
	'use strict';
	// Common variable
	var ClassName = {
			ACTIVE: 'active',
			CURRENT: 'current',
			CHECKED: 'checked',
			DISABLED: 'disabled',
			JS_ACTIVE: 'js-active',
			MODAL_ACTIVE: 'modal-active',
			NAVBAR_FIXED: 'navbar-fixed',
			OUTLINE_DISABLE: 'outline-disable'
		};
	var EVENT_KEY = '.feUI',
		Event = {
			KEYDOWN: 'keydown' + EVENT_KEY,
			KEYUP: 'keyup' + EVENT_KEY,
			CLICK: 'click' + EVENT_KEY,
			RESIZE: 'resize' + EVENT_KEY,
			SCROLL: 'scroll' + EVENT_KEY
		};
	var $WINDOW = $(window),
		$DOCUMENT = $(document),
		WINDOW_WIDTH = $WINDOW.width(),
		WINDOW_HEIGHT = $WINDOW.height(),
		SCROLLTOP_POS = $WINDOW.scrollTop();
	var $HTML = $('html').addClass(ClassName.OUTLINE_DISABLE),
		$BODY = $HTML.find('body').off(EVENT_KEY).on(Event.KEYDOWN, function (e) {
			if ( e.keyCode === 9 ) $HTML.removeClass(ClassName.OUTLINE_DISABLE);
		}).on(Event.KEYUP, function (e) {
			if ( e.keyCode === 13 ) $HTML.removeClass(ClassName.OUTLINE_DISABLE);
		}).on(Event.CLICK, function () {
			$HTML.addClass(ClassName.OUTLINE_DISABLE);
		}),
		$CONTENT = $BODY.find('.content');
	// Disable invalid alert
	feUI.DisableInvalidAlert = function () {
		var EVENT_KEY = '.DisableInvalidAlert',
			Event = {
				INVALID: 'invalid' + EVENT_KEY
			};
		var required = '[required]';
		$BODY.off(EVENT_KEY).on(Event.INVALID, required, function (e) {
			e.preventDefault();
		});
	};
	feUI.DisableInvalidAlert();
	// Skip To Content
	feUI.SkipToContent = function () {
		var EVENT_KEY = '.SkipToContent',
			Event = {
				CLICK: 'click' + EVENT_KEY,
				KEYDOWN: 'keydown' + EVENT_KEY
			};
		var $skipNaviBtn = $BODY.find('a.skip-navigation'),
			targetId = $skipNaviBtn.attr('href');
		if (!$skipNaviBtn.length) return false;
		if (!$CONTENT.length) $skipNaviBtn.hide();
		$skipNaviBtn.off(EVENT_KEY).on(Event.CLICK, function (e) {
			e.preventDefault();
			$(targetId).attr('tabindex', 0).focus()
				.off(EVENT_KEY).on(Event.KEYDOWN, function (e) {
					if (e.keyCode === 9) $(this).removeAttr('tabindex');
				});
		});
	};
	feUI.SkipToContent();
	// Focus rotation(Required: jQuery UI)
	feUI.FocusRotation = function ($target) {
		var EVENT_KEY = '.FocusRotation',
			Event = {
				KEYDOWN: 'keydown' + EVENT_KEY
			};
		if (!$target) return false;
		$target.find(':focusable:first').focus().end().off(EVENT_KEY)
			.on(Event.KEYDOWN, ':focusable:first', function (e) {
				if (e.keyCode === 9 && e.shiftKey) {
					e.preventDefault();
					$target.find(':focusable:last').focus();
				}
			}).on(Event.KEYDOWN, ':focusable:last', function (e) {
				if (e.keyCode === 9 && !e.shiftKey) {
					e.preventDefault();
					$target.find(':focusable:first').focus();
				}
			});
	};
	// Document title
	feUI.DocumentTitle = function () {
		var documentTitle = $DOCUMENT.attr('title'),
			pageTitleTxt = $CONTENT.find('h1').filter(':first').text(),
			activeTabTxt = $BODY.find('.tab li.' + ClassName.CURRENT).filter(':first').text(),
			newTitle = (!pageTitleTxt.length)
				? documentTitle : (!activeTabTxt.length)
					? 
							pageTitleTxt + ' | ' + documentTitle
					: activeTabTxt + ' | ' + pageTitleTxt + ' | ' + documentTitle;
		// 회원가입
		if ( $BODY.find('.navbar-join').length ) {
			newTitle = $BODY.find('h2, .h2').filter(':first').text() + ' | ' + documentTitle;
			var activeStepTxt = $BODY.find('.step-info li.' + ClassName.ACTIVE).filter(':first').text();
			if (activeStepTxt.length) newTitle = activeStepTxt + ' | ' + newTitle;
		}
		
//		console.log(documentTitle +"--"+ pageTitleTxt+"--"+activeTabTxt);
		
		// Reset title
//		newTitle = '후다닥건강'; // 임시
//		$DOCUMENT.attr('title', documentTitle);
//		$DOCUMENT.attr('title', newTitle);
		$("#metaOgTitle").attr("content", documentTitle);
//		alert([[${menuAttribute.name}]]);
		
	};
	feUI.DocumentTitle();
	// Scrollbar Style(Required: jQuery CSS Customizable Scrollbar)
	feUI.ScrollbarStyle = function () {
		var $scrollbarWrap = $BODY.find('.scrollbar');
		$scrollbarWrap.scrollbar();
	};
	feUI.ScrollbarStyle();
	// Set map content min-height
	feUI.SetMapMinHeight = function(hnpType) {
		var $map = $BODY.find('.map').removeClass('hnpTypeH hnpTypeP'),
			$mapInfo = $BODY.find('.map-info'),
			$mapAPI = $map.find('.map-api'),
			newMinHeight = (WINDOW_HEIGHT < 1081) ? 730 : WINDOW_HEIGHT - 152 - 199 - 1,
			scrollWrapHeight = newMinHeight;
		if ( !$map.length ) return false;
		$map.add($mapInfo).css('min-height', newMinHeight);
		if ( hnpType === 'P' ) {
			$map.addClass('hnpTypeP');
			$mapAPI.css({
				'min-height': newMinHeight - 71,
				// 'min-height': newMinHeight - 64,
				'top': 71
				// 'top': 64
			});
		} else {
			$map.addClass('hnpTypeH');
			$mapAPI.css({
				'min-height': newMinHeight - 71 - 60,
				// 'min-height': newMinHeight - 64 - 60,
				'top': 71 + 60
				// 'top': 64 + 60
			});
		}
		// Scrollbar wrapper height
		for (var i = 0; i < $mapInfo.find('> *:visible').length - 1; i++) {
			scrollWrapHeight = scrollWrapHeight - $mapInfo.find('> *').eq(i).outerHeight();
		}
		$mapInfo.find('.scrollbar:visible:first').css('height', scrollWrapHeight);
	};
	feUI.SetMapMinHeight();
	// All check checkbox
	feUI.CheckAllCheckbox = function () {
		var EVENT_KEY = '.CheckAllCheckbox',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var contentCheckbox = ':checkbox[data-group]:not(:disabled)',
			tableCheckbox = 'tr > :first-child > .checkbox :checkbox:not(:disabled)';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, contentCheckbox + ',' + tableCheckbox, function () {
			var $this = $(this),
				contentType = $this.is(contentCheckbox),
				groupData = $this.data('group'),
				$targetGroup = (contentType)
					? $(contentCheckbox).filter('[data-group="' + groupData + '"]')
					: $this.closest('table'),
				$checkAllBtn = (contentType)
					? $targetGroup.filter('.checkbox-all')
					: $targetGroup.find('thead :checkbox:not(:disabled)'),
				$targetCheckbox = (contentType)
					? $targetGroup.not($checkAllBtn)
					: $targetGroup.find(':checkbox').not($checkAllBtn),
				targetCheckboxSize = $targetCheckbox.length,
				isChecked = $this.is(':checked');
			if (isChecked) {
				if ($this.is($checkAllBtn)) $targetCheckbox.not(':disabled').prop('checked', true);
				if ($targetCheckbox.filter(':checked').length === targetCheckboxSize)
					$checkAllBtn.prop('checked', true);
			} else {
				($this.is($checkAllBtn))
					? $targetCheckbox.not(':disabled').prop('checked', false)
					: $checkAllBtn.prop('checked', false);
			}
			feUI.FormLabelClass();
		});
	};
	feUI.CheckAllCheckbox();
	// Input type file
	feUI.FileInput = function () {
		var EVENT_KEY = '.FileInput',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var targetFileInp = '.file :file';
		$BODY.find(targetFileInp).each(function () {
			var $this = $(this),
				$targetWrap = $this.closest('.file-group'),
				$targetInp = $targetWrap.find('.textfield');
			if ($this.is(':disabled')) {
				$targetInp.prop('disabled', true);
				$targetWrap.addClass(ClassName.DISABLED);
			} else {
				$targetInp.prop('disabled', false);
				$targetWrap.removeClass(ClassName.DISABLED);
			}
		}).end().off(EVENT_KEY).on(Event.CHANGE, targetFileInp, function () {
			var $this = $(this),
				$resultInp = $this.closest('.file').prev('.textfield');
			$resultInp.val($this.val());
		});
	};
	feUI.FileInput();
	// Highlight Input
	feUI.HighlightInput = function () {
		var EVENT_KEY = '.HighlightInput',
			Event = {
				KEYUP: 'keyup' + EVENT_KEY
			};
		var highlightData = 'data-highlight',
			tgHighlightInp = ':text[' + highlightData + ']';
		$BODY.off(EVENT_KEY).on(Event.KEYUP, tgHighlightInp, function () {
			var $this = $(this),
				tgVal = $this.val(),
				tgData = $this.data('highlight'),
				$tgLayer = $BODY.find('[data-highlight="' + tgData + '"]').not($this);
			$tgLayer.removeHighlights().highlights(tgVal);
		});
	};
	feUI.HighlightInput();
	// Comment Toggle
	feUI.commentToggle = function() {
		var EVENT_KEY = '.commentToggle',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var toggleBtn = '.comment .btn-toggle';
		$BODY.off(EVENT_KEY).on(Event.CLICK, toggleBtn, function() {
			var $this = $(this);
			$this.toggleClass(ClassName.ACTIVE);
		});
	};
	feUI.commentToggle();
	// Mypage Aside
	feUI.navMypage = function(){
		var EVENT_KEY = '.navMypage',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var $nav = $BODY.find('.mypage .aside'),
			toggleBtn = '.btn-toggle';
		$nav.off(EVENT_KEY).on(Event.CLICK, toggleBtn, function(e) {
			var $this = $(this);
			e.preventDefault();
			$this.closest('li').toggleClass(ClassName.ACTIVE);
		});
	};
	feUI.navMypage();
	// Toggle form(Reset)
	feUI.ToggleFormReset = function ($target) {
		var $tgRadio = $target.find(':radio:checked'),
			$tgCheckbox = $target.find(':checkbox:checked'),
			$tgSelect = $target.find('select'),
			$tgTextfield = $target.find('.textfield:not([readonly], [disabled])');
		if (!$target || $target.hasClass('no-reset')) return;
		// Radio, Checkbox
		$tgRadio.add($tgCheckbox).prop('checked', false).trigger('change', true);
		// Select
		$tgSelect.each(function () {
			var $this = $(this);
			// Check Selectiz
			($this.hasClass('selectized'))
				? $this[0].selectize.setValue('', true)
				: $this.find('option:first').prop('selected', true);
			$this.trigger('change', true);
		});
		// Textfield
		$tgTextfield.val('');
	};
	// Toggle form(Radio)
	feUI.ToggleFormRadio = function () {
		var EVENT_KEY = '.ToggleFormRadio',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var dataToggle = 'data-toggle',
			dataToggleGroup = 'data-toggle-group',
			triggerBtn = ':radio[' + dataToggle + ']';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, triggerBtn, function () {
			var $this = $(this),
				$dataGroup = $BODY.find('[' + dataToggleGroup + '="' + $this.prop('name') + '"]'),
				$target = $dataGroup.filter('[' + dataToggle + '*="' + $this.attr(dataToggle) + '"]'),
				checked = $this.is(':checked');
			// Toggle
			$target.show();
			$dataGroup.not($target).hide();
			if (!checked) $target.hide();
			// Reset
			feUI.ToggleFormReset($dataGroup.not($target));
		}).find(triggerBtn).filter(':checked').trigger(Event.CHANGE);
	};
	feUI.ToggleFormRadio();
	// Toggle form(Checkbox)
	feUI.ToggleFormCheckbox = function() {
		var EVENT_KEY = '.ToggleFormCheckbox',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var dataToggle = 'data-toggle',
			dataToggleAttr = 'data-toggle-attr',
			dataToggleGroup = 'data-toggle-group',
			triggerBtn = ':checkbox[' + dataToggle + '], :checkbox[' + dataToggleAttr + ']';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, triggerBtn, function() {
			var $this = $(this),
				dataVal = $this.attr(dataToggle),
				dataAttrVal = $this.attr(dataToggleAttr),
				dataGroupVal = $this.attr(dataToggleGroup),
				checked = $this.is(':checked'),
				disabled = dataAttrVal.indexOf('disabled') !== -1,
				readonly = dataAttrVal.indexOf('readonly') !== -1,
				$target = $('[' + dataToggle + '*="' + dataVal + '"]').not(triggerBtn),
				$targetGroup = $('[' + dataToggleGroup + '*="' + dataGroupVal + '"]').not(triggerBtn);
			// Toggle
			if ( checked ) {
				$target.show();
				// Attr
				if ( disabled ) $targetGroup.prop('disabled', false);
				if ( readonly ) $targetGroup.prop('readonly', false);
			} else {
				$target.hide();
				// Attr
				if ( disabled ) $targetGroup.prop('disabled', true);
				if ( readonly ) $targetGroup.prop('readonly', true);
			}
			// Reset
			if ( !checked ) feUI.ToggleFormReset($target);
		}).find(triggerBtn).filter(':checked').trigger(Event.CHANGE);
	};
	feUI.ToggleFormCheckbox();
	// Toggle form(Select)
	feUI.ToggleFormSelect = function () {
		var EVENT_KEY = '.ToggleFormSelect',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var dataToggle = 'data-toggle',
			dataToggleGroup = 'data-toggle-group',
			triggerSelect = '.select[' + dataToggle + ']';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, triggerSelect, function () {
			var $this = $(this),
				$selected = $this.find('option:selected'),
				$dataGroup = $('[' + dataToggleGroup + '="' + $this.attr(dataToggle) + '"]'),
				$target = $dataGroup.filter('[' + dataToggle + '*="' + $selected.val() + '"]');
			// Toggle
			$target.show();
			$dataGroup.not($target).hide();
			// Reset
			feUI.ToggleFormReset($dataGroup.not($target));
		}).find(triggerSelect).trigger(Event.CHANGE);
	};
	feUI.ToggleFormSelect();
	// Form label toggle class
	feUI.FormLabelClass = function () {
		var EVENT_KEY = '.FormLabelClass',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var targetFormEl = '.checkbox :checkbox, .radio :radio';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, targetFormEl, function () {
			var $this = $(this),
				$label = $this.closest('label');
			($this.is(':checked'))
				? $label.addClass(ClassName.CHECKED)
				: $label.removeClass(ClassName.CHECKED);
			($this.is(':disabled'))
				? $label.addClass(ClassName.DISABLED)
				: $label.removeClass(ClassName.DISABLED);
			// Radio button
			if ($this.is(':radio')) {
				$(targetFormEl).filter(':radio[name="' + $this.prop('name') + '"]:not(:checked)')
					.closest('label').removeClass(ClassName.CHECKED);
			}
		}).find(targetFormEl).trigger(Event.CHANGE);
	};
	feUI.FormLabelClass();
	// Add role and aria label attribute
	feUI.AddRoleAttribute = function () {
		var anchorButton = '.btn[href=""], .btn[href="#"], .btn[href="/"]';
		$BODY.find(anchorButton).attr('role', 'button');
	};
	feUI.AddRoleAttribute();
	// Map search button
	feUI.MapSearhBtn = function () {
		var EVENT_KEY = '.MapSearhBtn',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var $searchLayer = $('.map-search-body'),
			$searchInpWrap = $('.map-search-form'),
			searchBtnWrap = '.map-search',
			mapApi = '.map-api',
			slideSpeed = 100;
		$BODY.off(EVENT_KEY).on(Event.CLICK, searchBtnWrap + ' .title a', function (e) {
			var $this = $(this),
				$wrap = $this.closest(searchBtnWrap);
			e.preventDefault();
			$searchLayer.add($searchInpWrap).stop(true, true);
			$searchInpWrap.find('.input-search .scroll-wrapper, .input-address .scroll-wrapper').hide();
			if ($wrap.hasClass(ClassName.ACTIVE)) {
				$wrap.add($searchInpWrap).removeClass(ClassName.ACTIVE);
				$searchLayer.slideUp(slideSpeed);
				$(mapApi).animate({
					top: 131
					// top: 124
				}, slideSpeed);
			} else {
				$wrap.add($searchInpWrap).addClass(ClassName.ACTIVE);
				$searchLayer.slideDown(slideSpeed);
				$(mapApi).animate({
					top: 447
					// top: 441
				}, slideSpeed);
			}
		});
	};
	feUI.MapSearhBtn();
	// 지도 상세 정보
	feUI.mapInfoSlide = function () {
		var $detailSlide = $('.map-detail-slide');
		$detailSlide.slick({
			dots: true,
			infinite: false,
			centerMode: false,
			variableWidth: false,
			speed: 500,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipe: true
		});
	};
	feUI.mapInfoSlide();
	feUI.modalCardListSlide = function () {
		var $modal = $('.modal:visible'),
			$comparison = $modal.find('.comparison'),
			$counter = $comparison.find('.slick-counter'),
			$cardListSlide = $comparison.find('.card'),
			$slideItem = $cardListSlide.find('.card-list-item');
		var centerModeVal = ( $slideItem.length > 3 ) ? true : false;
		if ( $modal.find('.slick-initialized').length ) {
			$modal.find('.slick-initialized').slick('unslick');
			$slideItem = $cardListSlide.find('.card-list-item');
		}
		// Modal title
		$modal.find('.modal-title span').text('(' + $slideItem.length + '개)');
		// Slide
		$cardListSlide.on('init', function(event, slick) {
			count();
		}).slick({
			dots: true,
			draggable: false,
			// centerMode: true,
			centerMode: centerModeVal,
			centerPadding: '0px',
			slidesToShow: 3,
			slidesToScroll: 1,
			swipe: false,
			appendArrows: $comparison,
			appendDots: $comparison
		}).on('afterChange', function(event, slick, currentSlide, nextSlide) {
			$counter.find('.current').text(slick.currentSlide + 1);
			count();
		});
		function count() {
			var $dot = $('.comparison > .slick-dots li'),
				idx = $dot.index($dot.filter('.slick-active')) + 1;
			if ( $dot.length < 4 ) {
				$counter.hide();
				return false;
			}
			$counter.show().find('.total-num').text($dot.length);
			$counter.find('.current-num').text(idx);
		}
	};
	feUI.modalCardImgSlide = function () {
		var $modal = $('.modal'),
			$cardImgSlide = $modal.find('.card-img-slide');
		$cardImgSlide.slick({
			dots: true,
			draggable: false,
			infinite: false,
			arrows: false,
			swipe: false
		});
	};
	// 병원 상세 정보
	feUI.hostViewSlide = function () {
		var $detailSlide = $('.host-view-slide');
		$detailSlide.slick({
			dots: true,
			infinite: false,
			centerMode: false,
			variableWidth: false,
			speed: 500,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipe: true
		});
	};
	feUI.hostViewSlide();
	// slideSet(slick)
	feUI.slideSet = function () {
		var $realTimeQna = $BODY.find('.realtime-qna'),
			$realTimeQnaList = $realTimeQna.find('.realtime-qna-list'),
			$btnPlay = $realTimeQna.find('.btn-play'),
			$btnStop = $realTimeQna.find('.btn-stop'),
			$sideBanner = $BODY.find('.side-banner'),
			$sideQna = $BODY.find('.qna-group-slide'),
			$keywordSlide = $BODY.find('.keyword-slide'),
			$mainSlide = $BODY.find('.main-group .main-slide'),
			$mainSlideVisual = $BODY.find('.navbar-search-modi .visual-slide'),
			$quizeSlide = $BODY.find('.quize-slide');
		$realTimeQnaList.add($sideBanner).add($sideQna).add($keywordSlide)
			.add($mainSlide).add($mainSlideVisual).add($quizeSlide)
				.filter('.slick-initialized').slick('unslick');
		$btnPlay.off().on(Event.CLICK, function () {
			$realTimeQnaList.slick('slickPlay');
			$(this).hide();
			$btnStop.show();
		});
		$btnStop.off().on(Event.CLICK, function () {
			$realTimeQnaList.slick('slickPause');
			$(this).hide();
			$btnPlay.show();
		});
		// realTimeQna Slide
		$realTimeQnaList.on('init', function () {
			$realTimeQnaList.find('.slick-current + .slick-slide').addClass('expend');
		});
		$realTimeQnaList.slick({
			vertical: true,
			arrows: false,
			slidesToShow: 3,
			draggable: false,
			autoplay: true,
			autoplaySpeed: 5000
		}).on('beforeChange', function () {
			$realTimeQnaList.find('.expend').removeClass('expend');
		}).on('afterChange', function () {
			$realTimeQnaList.find('.slick-current + .slick-slide').addClass('expend');
		});
		// sideBanner slide
		$sideBanner.slick({
			arrows: false,
			dots: true,
			draggable: false,
			autoplay: true,
			pauseOnDotsHover: true
		});
		// sideQna
		$sideQna.slick({
			arrows: false,
			dots: true,
			draggable: false,
			autoplay: true
		});
		// Main keyword
		$keywordSlide.slick({
			draggable: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 2000
		});
		// Main slide
		$mainSlide.slick({
			draggable: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 5000
		});
		$mainSlideVisual.slick({
			draggable: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			// autoplay: true,
			arrows: true,
			dots: true,
			autoplaySpeed: 5000
		});
		// Quize
		$quizeSlide.slick({
			draggable: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			dots: true,
			autoplaySpeed: 5000
		});
	};
	feUI.slideSet();
	// healthForm
	feUI.healthForm = function () {
		var EVENT_KEY = '.healthForm',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var targetBtn = '.form-head > a';
		$BODY.off(EVENT_KEY).on(Event.CLICK, targetBtn, function (e) {
			e.preventDefault();
			var $this = $(this);
			$this.closest('.healthForm').toggleClass('active');
		});
	};
	feUI.healthForm();
	// healthView
	feUI.healthView = function () {
		var EVENT_KEY = '.healthView',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var targetBtn = '.healthFormView .btn-more';
		$BODY.off(EVENT_KEY).on(Event.CLICK, targetBtn, function () {
			var $this = $(this);
			$this.closest('li').toggleClass('active');
		});
	};
	feUI.healthView();
	// donut graph
	feUI.donutGraph = function(){
		var $donutGraph = $BODY.find('.donut-graph');
		if ( !$donutGraph.length ) return false;
		$donutGraph.each(function(){
			var $this = $(this),
				$pie = $this.find('.pie'),
				$leftSide = $pie.find('.left-side'),
				$rightSide = $pie.find('.right-side'),
				donutGraphLabel = $this.find('.label .num').text(),
				percent = Math.round(donutGraphLabel),
				deg = Math.round(360 * (percent / 100));
			if (percent > 100) {
				percent = 100;
			} else if (percent < 0) {
				percent = 0;
			}
			if (percent > 50) {
				$pie.css('clip', 'rect(auto, auto, auto, auto)');
				$rightSide.css('transform', 'rotate(180deg)');
			} else {
				$pie.css('clip', 'rect(0, 94px, 94px, 47px)');
				$rightSide.css('transform', 'rotate(0deg)');
			}
			$leftSide.css('transform', 'rotate(' + deg + 'deg)');
		});
	};
	feUI.donutGraph();
	// Add role and aria label attribute
	feUI.AddRoleAttribute = function () {
		var anchorButton = '.btn[href=""], .btn[href="#"], .btn[href="/"]';
		$BODY.find(anchorButton).attr('role', 'button');
	};
	feUI.AddRoleAttribute();
	// Accordion table
	feUI.accordionMore = function(item) {
		var EVENT_KEY = '.accordionMore',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var accMore = '.accordion-more',
			btnMore = '.btn-text-more',
			btnTxt = $(btnMore).eq(0).text();
		$BODY.off(EVENT_KEY).on(Event.CLICK, btnMore, function(e) {
			var $this = $(this);
			e.preventDefault();
			$this.closest('.accordion-more').toggleClass(ClassName.ACTIVE);
			if ( $this.is(btnMore) ) {
				( $(accMore).hasClass(ClassName.ACTIVE) )
					? $this.text('접기')
					: $this.text(btnTxt);
			} else {
				( $(accMore).hasClass(ClassName.ACTIVE) )
					? $this.find('span').text('접기')
					: $this.find('span').text(btnTxt);
			}
		});
	};
	feUI.accordionMore();
	// Table Tip Box
	feUI.tipbox = function() {
		var EVENT_KEY = '.tipbox',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var tipGroup = '.tip-group',
			tipBtn = '.tip-group > .tooltip',
			closeBtn = '.tip-group .btn-close';
		$BODY.off(EVENT_KEY).on(Event.CLICK, function(e) {
			if ( !$(e.target).closest(tipGroup).length ) $(tipGroup).removeClass(ClassName.ACTIVE);
		}).on(Event.CLICK, tipBtn + ', ' + closeBtn, function(e) {
			var $this = $(this),
				$tgGroup = $this.closest(tipGroup);
			e.preventDefault();
			$tgGroup.toggleClass(ClassName.ACTIVE);
			$(tipGroup).not($tgGroup).removeClass(ClassName.ACTIVE);
		});
	};
	feUI.tipbox();
	// CardToggle
	feUI.CardToggle = function() {
		var EVENT_KEY = '.CardToggle',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var boardCardItem = '.healUnit-layout .card-type03 .item',
			moreBtn = '.btn-toggle',
			showText = '더보기',
			hideText = '접기',
			ellipsisClass = 'ellipsis';
		if ( !$BODY.find(boardCardItem).length ) return false;
		$BODY.find(boardCardItem).has(moreBtn).each(function() {
			var $this = $(this),
				originHeight = $this.height(),
				ellipsisHeight = $this.addClass(ellipsisClass).height();
			if ( originHeight < ellipsisHeight ) $this.find(moreBtn).hide();
		});
		$BODY.off(Event.CLICK).on(Event.CLICK, boardCardItem + ' ' + moreBtn, function(e) {
			var $this = $(this),
				$textWrap = $this.find('span'),
				$thisItem = $this.closest(boardCardItem);
			e.preventDefault();
			if ( $this.hasClass(ClassName.ACTIVE) ) {
				$textWrap.text(showText);
				$thisItem.addClass(ellipsisClass);
				$this.removeClass(ClassName.ACTIVE);
			} else {
				$textWrap.text(hideText);
				$thisItem.removeClass(ellipsisClass);
				$this.addClass(ClassName.ACTIVE);
			}
		});
	};
	feUI.CardToggle();
	// TextMoreBtn
	feUI.TextMoreBtn = function() {
		var EVENT_KEY = '.TextMoreBtn',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var textMoreArea = 'td.txt-more',
			moreBtn = '.btn-toggle',
			showText = '더보기',
			hideText = '접기';
		if ( !$(textMoreArea.length) ) return false;
		$BODY.off(Event.CLICK).on(Event.CLICK, textMoreArea + ' ' + moreBtn, function(e) {
			var $this = $(this),
				$textWrap = $this.find('span');
			e.preventDefault();
			$this.closest('td').toggleClass(ClassName.ACTIVE);
			( $this.closest('td').hasClass(ClassName.ACTIVE) )
				? $textWrap.text(hideText)
				: $textWrap.text(showText);
		});
	};
	feUI.TextMoreBtn();
	// RecruitSearhFilter
	feUI.RecruitSearhFilter = function() {
		var EVENT_KEY = '.RecruitSearhFilter',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var filterBtn = '.recruit-type-select a',
			filterDetail = '.recruit-detail-list',
			filterResult = '.recruit-selected-list';
		$BODY.off(Event.CLICK).on(Event.CLICK, filterBtn, function(e) {
			var $this = $(this),
				$thisList = $this.closest('li'),
				idx = $this.index(filterBtn);
			e.preventDefault();
			$(filterResult).show();
			$(filterDetail).hide();
			$thisList.siblings('li').removeClass(ClassName.ACTIVE);
			if ( $thisList.hasClass(ClassName.ACTIVE) ) {
				$(filterResult).hide();
				$thisList.removeClass(ClassName.ACTIVE);
			} else {
				$(filterDetail).eq(idx).show();
				$thisList.addClass(ClassName.ACTIVE);
			}
		});
	};
	feUI.RecruitSearhFilter();
	// Tab Size
	feUI.TabSizeClass = function() {
		var tab = '.tab[class*="tab-size"]:not(.tab-type03)',
			tabSizeClass = 'tab-size';
		$(tab).each(function() {
			var $this = $(this),
				$itme = $this.find('> li:not(:empty)'),
				size = ( $itme.length < 10 ) ? '0' + $itme.length : $itme.length;
			$this.removeClass(function(index, className) {
				return (className.match(/tab-size../g)).join(' ');
			}).addClass(tabSizeClass + size);
		});
	};
	feUI.TabSizeClass();
	// Toggle class data
	feUI.ToggleClassData = function() {
		var EVENT_KEY = '.ToggleClassData',
			Event = {
				CLICK: 'click' + EVENT_KEY,
				FOCUSOUT: 'focusout' + EVENT_KEY
			};
		var classData = 'toggle-class',
			groupData = 'toggle-class-group',
			targetTrigger = '[data-' + classData + ']',
			targetLayer = '.layer-focusout[data-' + groupData + ']';
		$BODY.off(Event.CLICK).on(Event.CLICK, targetTrigger, function(e, type) {
			var $this = $(this),
				classDataVal = ( $this.data(classData) === '' )
					? ClassName.ACTIVE : $this.data(classData),
				groupDataVal = ( !$this.data(groupData) || $this.data(groupData) === '' )
					? false : $this.data(groupData),
				$target = ( groupDataVal )
					? $this.parents('[data-' + groupData + '*="' + groupDataVal + '"]').add($this) : $this;
			e.preventDefault();
			$BODY.off(Event.FOCUSOUT);
			( $this.hasClass(classDataVal) || type === 0 )
				? $target.removeClass(classDataVal)
				: $target.addClass(classDataVal);
		}).off(Event.FOCUSOUT).on(Event.FOCUSOUT, targetLayer, function() {
			var $this = $(this),
				groupDataVal = $this.data(groupData);
			setTimeout(function() {
				if (!$this.find(':focus').length)
					$(targetTrigger + '[data-' + groupData + '=' + groupDataVal + ']').trigger(Event.CLICK);
			});
		});
	};
	feUI.ToggleClassData();
	// Ellipsis Text
	feUI.EllipsisText = function() {
		var ellipsisLine01 = '.ellipsis-line01',
			ellipsisLine02 = '.ellipsis-line02, .healUnit-line-view-2 > div, .quize-top .qna-group .qna-column p, .quize-top .card .desc, .map-detail-section .map-qna .question .title',
			ellipsisLine03 = '.ellipsis-line03, .map-detail-section .map-qna .answer .text',
			ellipsisData = '[data-ellipsis-line]';
		$(ellipsisLine01).ellipsis({
			lines: 1
		});
		$(ellipsisLine02).ellipsis({
			lines: 2
		});
		$(ellipsisLine03).ellipsis({
			lines: 3
		});
		$(ellipsisData).each(function() {
			var $this = $(this),
				lineVal = $this.data('ellipsis-line');
			$this.ellipsis({
				lines: lineVal
			});
		});
	};
	feUI.EllipsisText();
	// Select(Required: jQuery selectize)
	feUI.Select = {
		init: function () {
			var $select = $BODY.find('select.select:not(.selectized, .select-keyword, .select-custom, .select-label .select)');
			// Email
			feUI.Select.email();
			// Selectize
			$select.selectize({
				allowEmptyOption: true
			});
		},
		email: function () {
			var EVENT_KEY = '.Select.email',
				Event = {
					CHANGE: 'change' + EVENT_KEY
				};
			var serviceDomain = [
				'naver.com', 'hanmail.net', 'daum.net', 'nate.com', 'gmail.com',
				'hotmail.com', 'yahoo.com', 'dreamwiz.com'
			],
				customOpVal = 'custom';
			var emailGroup = '.email-group',
				emailSelect = emailGroup + ' select';
			// Create option, event
			$BODY.find(emailSelect).each(function () {
				var $this = $(this),
					optionCode;
				for (var i = 0; i < serviceDomain.length; i++) {
					optionCode = '<option value="' + serviceDomain[i] + '">' + serviceDomain[i] + '</option>';
					$this.find('option:last').before(optionCode);
				}
			}).end().off(EVENT_KEY).on(Event.CHANGE, emailSelect, function () {
				var $this = $(this),
					$emailGroup = $this.closest(emailGroup),
					$selectedOp = $this.find('option:selected'),
					$domainInp = $emailGroup.find(':text.textfield:last'),
					selectedTxt = $selectedOp.text();
				($selectedOp.val() === customOpVal || $selectedOp.val() === '')
					? $domainInp.removeAttr('readonly').removeAttr('disabled').val('').focus()
					: $domainInp.prop({
						'readonly': true,
						'disabled': true
					}).val(selectedTxt);
			});
		},
		keyword: function (target, value, search, category, options) {
			if (arguments.length < 4) return;
			var optionTemp = [{}],
				optionKeyArr = [],
				valueKey = $.trim(value),
				searchKey = $.trim(search);
			// Create option template
			if (typeof (options) !== 'string') {
				optionTemp = options;
			} else {
				$.each(arguments, function (idx, val) {
					if (idx < 4 || typeof (val) !== 'string') return;
					optionTemp[0][val] = '';
				});
			}
			// Create render option
			optionKeyArr[0] = $.trim(search);
			if (typeof (category) === 'string' && $.trim(category) !== '') {
				optionKeyArr[1] = $.trim(category);
			}
			// Init
			$(target).each(function (idx) {
				var $this = $(this),
					tgSelectize,
					plugins = ($this.hasClass('select-auto'))
						? 'restore_on_backspace' : 'remove_button';
				// Selectize
				$this.selectize({
					plugins: [plugins],
					delimiter: '^',
					persist: false,
					valueField: valueKey,
					searchField: searchKey,
					maxItems: 10,
					options: optionTemp,
					render: {
						option: function (data, escape) {
							var optionCode = '';
							for (var i = 0; i < optionKeyArr.length; i++) {
								optionCode += '<span class="option-item' + (i + 1) + '">' + data[optionKeyArr[i]] + '</span>';
							}
							return '<div class="option">' + optionCode + '</div>';
						},
						item: function (data, escape) {
							return '<div class="item">'
								+ '<span>' + data[searchKey] + '</span>'
								+ '</div>';
						}
					}
				});
				tgSelectize = $this[0].selectize;
				// Create keyup property
				tgSelectize.keyupVal = '';
				// select-reload
				if ($this.hasClass('select-reload')) {
					tgSelectize.settings.openOnFocus = false;
					tgSelectize.on('item_add', function (value, data) {
						tgSelectize.keyupVal = '';
					});
					tgSelectize.on('item_remove', function (value) {
						tgSelectize.clearOptions();
						tgSelectize.keyupVal = '';
					});
				}
				// select-one
				if ($this.hasClass('select-one') || $this.hasClass('select-auto')) {
					tgSelectize.settings.maxItems = 1;
					tgSelectize.on('change', function (value) {
						(value !== '')
							? tgSelectize.$control_input.attr('maxlength', 0)
							: tgSelectize.$control_input.removeAttr('maxlength');
					});
				}
				// select-create
				if ($this.hasClass('select-create') || $this.hasClass('select-auto')) {
					tgSelectize.settings.create = function (input) {
						var createOption = {};
						$.each(Object.keys(optionTemp[0]), function (idx, val) {
							createOption[val] = input;
						});
						createOption['text'] = input;
						return createOption;
					};
				}
				// Close Dropdown
				tgSelectize.$control.on('click', '.item', function() {
					tgSelectize.close();
				});
			});
		}
	};
	feUI.Select.init();
	$.datepicker.setDefaults({
		prevText: '이전 달',
		nextText: '다음 달',
		dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
		showOtherMonths: true,
		showMonthAfterYear: true,
		yearSuffix: '년 ',
		buttonImageOnly: true,
		showOn: 'both',
		dateFormat: 'yy.mm.dd'
		/*,beforeShow: function(e, ui) {
			var offset= $(this).offset();
			setTimeout(function() {
				feUI.Datepicker.caption(e);
				ui.dpDiv.css({'top':offset.top + 30, 'bottom':'', 'left':'50%', 'transform':'translateX(-50%)', 'width':'300px'});
			});
		}*/
	});
	// jQuery UI Datepicker(Required: jQuery UI)
	feUI.Datepicker = {
		init: function () {
			feUI.Datepicker.variable = {
				icoTxt: '달력 보기/숨기기',
				icoURL: '/static/img/common/ico_calendar.png',
				icoURL02: '/static/img/common/ico_calendar02.png',
				datepickerWrap: '.datepicker',
				datepickerInp: '.datepicker-input',
				dashLabel: '.label:contains(~)',
				settingBtn: '[data-dp-setting][data-dp-group]'
			};
			var _ = feUI.Datepicker.variable,
				$datepickerInp = $BODY.find(_.datepickerInp);
			if (!$datepickerInp.length) return false;
			$datepickerInp.each(function(){
				var $this = $(this);
				if( $this.hasClass('datepicker-month') ) {
					$this.datepicker({
						dateFormat: 'yy.mm',
						buttonText: _.icoTxt,
						buttonImage: _.icoURL,
						maxDate:'today'
					});
				} else if( $this.hasClass('datepicker-title')) {
					$this.datepicker({
						buttonText: _.icoTxt,
						buttonImage: _.icoURL,
						maxDate:'today'
					});
				} else {
					$this.datepicker('destroy').datepicker({
						buttonText: _.icoTxt,
						buttonImage: _.icoURL02
					});
				}
			});
			feUI.Datepicker.setting();
			feUI.Datepicker.setMinMax();
			if ( $datepickerInp.hasClass('datepicker-title') ) {
				$datepickerInp.datepicker('setDate', 'today');
			}
		},
		caption: function (e) {
			var $datepicker = $BODY.find('.ui-datepicker-calendar'),
				caption = ($(e).prop('title')) ? $(e).prop('title') : '달력';
			$datepicker.prepend('<caption>' + caption + '</caption>');
		},
		setMinMax: function () {
			var EVENT_KEY = '.Datepicker.setMinMax',
				Event = {
					CHANGE: 'change' + EVENT_KEY
				};
			var _ = feUI.Datepicker.variable;
			$BODY.off(EVENT_KEY).on(Event.CHANGE, _.datepickerInp, function (e, trigger) {
				var $this = $(this),
					$tgWrap = $this.closest(_.datepickerWrap),
					idx = $tgWrap.find(_.datepickerInp).index($this),
					optionKey = (idx === 0) ? 'minDate' : 'maxDate';
				if ($tgWrap.find(_.datepickerInp).length !== 2
					|| $tgWrap.find(_.dashLabel).length !== 1) return;
				$tgWrap.find(_.datepickerInp).not($this).datepicker('option', optionKey, $this.val());
				// Reset setting button
				if (!trigger) $tgWrap.find(_.settingBtn).prop('checked', false);
			});
		},
		setting: function () {
			var EVENT_KEY = '.Datepicker.setting',
				Event = {
					CHANGE: 'change' + EVENT_KEY
				};
			var _ = feUI.Datepicker.variable;
			$BODY.off(EVENT_KEY).on(Event.CHANGE, _.settingBtn, function () {
				var $this = $(this),
					groupStr = $this.data('dp-group'),
					settingStr = $this.data('dp-setting'),
					setDateUnit = settingStr.slice(0, 1),
					setDateStr = settingStr.split(setDateUnit + '-')[1],
					$datepickerInpGroup = $BODY.find(_.datepickerInp + '[data-dp-group="' + groupStr + '"]');
				(setDateUnit === 'b')
					? $datepickerInpGroup
						.first().datepicker('setDate', '-' + setDateStr).end()
						.last().datepicker('setDate', new Date())
					: $datepickerInpGroup
						.first().datepicker('setDate', new Date()).end()
						.last().datepicker('setDate', '+' + setDateStr);
				// setMinMax
				$datepickerInpGroup.trigger('change', true);
			});
		}
	};
	feUI.Datepicker.init();
	// Modal(Required: jQuery Modal)
	feUI.Modal = {
		init: function () {
			$.modal.defaults.closeText = '닫기',
			$.modal.defaults.clickClose = false,
			$.modal.defaults.fadeDuration = 50,
			$.modal.defaults.showSpinner = false,
			$.modal.defaults.closeExisting = false;
			$DOCUMENT.on($.modal.BEFORE_BLOCK, feUI.Modal.before)
				.on($.modal.OPEN, feUI.Modal.open)
				.on($.modal.CLOSE, feUI.Modal.close);
			feUI.Modal.target();
			feUI.Modal.disabled();
		},
		target: function () {
			var EVENT_KEY = '.Modal.target',
				Event = {
					CLICK: 'click' + EVENT_KEY,
				};
			var targetBtn = 'button.modal-open:not(.disabled, [disabled])';
			$BODY.off(EVENT_KEY).on(Event.CLICK, targetBtn, function (e) {
				var $this = $(this);
				$.ajax({
					url: $this.data('modal'),
					success: function (results, textStatus, jqXHR) {
						$this.addClass('modal-anchor');
						$(results).appendTo('body').modal();
					}
				});
			});
		},
		disabled: function () {
			var EVENT_KEY = '.Modal.disabled',
				Event = {
					CLICK: 'click' + EVENT_KEY,
				};
			var disabledBtn = 'a.modal-open.disabled';
			$BODY.off(EVENT_KEY).on(Event.CLICK, disabledBtn, function (e) {
				return false;
			});
		},
		before: function (event, modal) {
			$HTML.addClass(ClassName.MODAL_ACTIVE);
		},
		open: function (event, modal) {
			feUI.FileInput();
			feUI.Select.init();
			feUI.ScrollbarStyle();
			feUI.Datepicker.init();
			feUI.AddRoleAttribute();
			feUI.modalCardListSlide();
			feUI.modalCardImgSlide();
			feUI.FocusRotation(modal.$elm);
			// Scroll
			if ( modal.$elm.has('.scroll-content') ) modal.$elm.find('.scroll-content').scrollTop(0);
		},
		close: function (event, modal) {
			if (modal.$anchor[0].tagName !== 'A') {
				modal.$elm.remove();
				$BODY.find('.modal-anchor').focus().removeClass('modal-anchor');
			} else {
				modal.$anchor.focus();
			}
			setTimeout(function () {
				$HTML.removeClass(ClassName.MODAL_ACTIVE);
			}, $.modal.defaults.fadeDuration + 10);
		}
	};
	feUI.Modal.init();
	// Navbar
	feUI.Navbar = {
		init: function () {
			feUI.Navbar.variable = {
				// Selector
				noticeBanner: '.notice-banner',
				navbar: '.navbar',
				navTopMenu: '.navbar-top',
				navbarBottom: '.navbar-bottom',
				nav: '.navbar-nav',
				navItem: '.nav-item',
				navLink: '.nav-link',
				navLayer: '.navbar-layer',
				navSearch: '.navbar-search, .navbar-search-modi',
				layerCol: '.col',
				// Fixed
				fixed: true,
				autoUnFixed: true,
				fixedClass: 'navbar-fixed',
				scrolledClass: 'navbar-scrolled',
				minWidth: (parseInt($BODY.css('min-width')) === 0)
					? 1418 - 17 - 1 // (17 - 1) for scrollbar
					: parseInt($BODY.css('min-width')) - 17 - 1,
				minHeight: (parseInt($BODY.css('min-height')) === 0)
					? 800 - 17 - 1 // (17 - 1) for scrollbar
					: parseInt($BODY.css('min-height')) - 17 - 1,
				// ETC
				aniSpeed: 150,
				activeBar: true
			};
			feUI.Navbar.variable.fixed = true;
			if ( !$CONTENT.hasClass('main') ) {
				$(feUI.Navbar.variable.navSearch).removeClass(ClassName.ACTIVE);
			} else {
				$(feUI.Navbar.variable.navSearch).addClass(ClassName.ACTIVE);
				// $(feUI.Navbar.variable.navbarBottom).css('border-bottom', 0);
			}
			if (feUI.Navbar.variable.fixed) feUI.Navbar.fixed();
			feUI.Navbar.noticeBanner();
			feUI.Navbar.navLayer();
			feUI.Navbar.scrolled();
		},
		fixed: function () {
			var EVENT_KEY = '.Navbar.fixed',
				Event = {
					RESIZE: 'resize' + EVENT_KEY
				};
			var _ = feUI.Navbar.variable;
			var bannerHeight = ( $(_.noticeBanner).is(':visible') )
				? $(_.noticeBanner).outerHeight() : 0;
			$HTML.addClass(_.fixedClass);
			// Unfixed
			if ( _.autoUnFixed ) {
				$WINDOW.off(EVENT_KEY).on(Event.RESIZE, function () {
					( $WINDOW.width() >= _.minWidth && $WINDOW.height() >= _.minHeight )
						? $HTML.addClass(_.fixedClass) : $HTML.removeClass(_.fixedClass);
					if ( $HTML.hasClass(_.fixedClass) ) {
						( SCROLLTOP_POS <= bannerHeight && $(_.noticeBanner).is(':visible') )
							? $(_.navbar).css('top', bannerHeight - SCROLLTOP_POS)
							: $(_.navbar).css('top', 0);
					} else {
						$(_.navbar).css('top', 0);
					}
					feUI.Navbar.scrolled();
				}).trigger(Event.RESIZE);
			}
		},
		noticeBanner: function() {
			var EVENT_KEY = '.Navbar.noticeBanner',
				Event = {
					CLICK: 'click' + EVENT_KEY,
					SCROLL: 'scroll' + EVENT_KEY
				};
			var _ = feUI.Navbar.variable;
			var bannerHeight = ( $(_.noticeBanner).is(':visible') )
				? $(_.noticeBanner).outerHeight() : 0;
			if ( bannerHeight === 0 ) return false;
			$BODY.off(Event.CLICK).on(Event.CLICK, _.noticeBanner + ' .btn-close', function(e) {
				e.preventDefault();
				$(_.noticeBanner).slideUp(_.aniSpeed);
				$(_.navbar).stop().animate({
					top: 0
				}, _.aniSpeed);
				$WINDOW.off(Event.SCROLL);
			});
			$WINDOW.off(Event.SCROLL).on(Event.SCROLL, function() {
				setTimeout(function() {
					( $HTML.hasClass(_.fixedClass) && SCROLLTOP_POS < bannerHeight && $HTML.hasClass(_.fixedClass) )
						? $(_.navbar).css('top', bannerHeight - SCROLLTOP_POS)
						: $(_.navbar).css('top', 0);
					});
			}).trigger(Event.SCROLL);
		},
		scrolled: function () {
			var EVENT_KEY = '.Navbar.scrolled',
				Event = {
					SCROLL: 'scroll' + EVENT_KEY
				},
				isScrolled;
			var _ = feUI.Navbar.variable;
			$WINDOW.off(EVENT_KEY).on(Event.SCROLL, function () {
				isScrolled = true;
			}).trigger(Event.SCROLL);
			setInterval(function () {
				if (isScrolled) {
					// scrolling();
					isScrolled = false;
				}
			}, 100);
			function scrolling() {
				(!$CONTENT.hasClass('main'))
					? (SCROLLTOP_POS > 0 && $HTML.hasClass(_.fixedClass))
						? $HTML.addClass(_.scrolledClass) : $HTML.removeClass(_.scrolledClass)
					: (SCROLLTOP_POS >= 400 && $HTML.hasClass(_.fixedClass))
						? $HTML.addClass(_.scrolledClass) : $HTML.removeClass(_.scrolledClass);
			}
		},
		navLayer: function () {
			var EVENT_KEY = '.Navbar.navLayer',
				Event = {
					FOCUS: 'focus' + EVENT_KEY,
					KEYDOWN: 'keydown' + EVENT_KEY,
					FOCUSOUT: 'focusout' + EVENT_KEY,
					MOUSEOVER: 'mouseover' + EVENT_KEY,
					MOUSEENTER: 'mouseenter' + EVENT_KEY,
					MOUSELEAVE: 'mouseleave' + EVENT_KEY
				};
			var _ = feUI.Navbar.variable,
				$navbar = $(_.navbar),
				$navTopMenu = $(_.navTopMenu),
				$nav = $(_.nav),
				$navLayer = $(_.navLayer),
				openState = 0,
				activeBar = _.activeBar,
				tgIdx, tgIdxMouse;
			// Set Col width value
			$nav.find(_.navItem).each(function (idx) {
				var $this = $(this),
					$navItemWidth = $this.outerWidth(true);
				$navLayer.find(_.layerCol).eq(idx).width($navItemWidth);
			});
			// Create activebar
			if (activeBar && !$nav.next('ins').length) {
				$nav.after('<ins class="nav-activebar" />');
				_.$activeBar = $nav.siblings('.nav-activebar');
			}
			// Toggle
			$BODY.off(EVENT_KEY).on(Event.MOUSEOVER, _.navLink, function () {
				var $this = $(this);
				tgIdxMouse = $nav.find(_.navLink).index($this);
				// Activebar
				if (activeBar) feUI.Navbar.activeBar(tgIdxMouse);
				// Active class
				$nav.find('.' + ClassName.ACTIVE).removeClass(ClassName.ACTIVE);
				$this.addClass(ClassName.ACTIVE);
				// Show
				if ($navLayer.hasClass(ClassName.ACTIVE)) return;
				$navLayer.addClass(ClassName.ACTIVE);
				$navLayer.add($navLayer.find('> .inner')).stop().slideDown(_.aniSpeed);
			}).on(Event.FOCUS, _.navLink, function () {
				tgIdx = $nav.find(_.navLink).index($(this));
				$BODY.find(_.navLink).eq(tgIdx).trigger(Event.MOUSEOVER);
			}).on(Event.KEYDOWN, _.navLink, function (e) {
				// Focus
				if (e.keyCode === 9 && !e.shiftKey
					&& $navLayer.find(_.layerCol).eq(tgIdx).find(':focusable').length) {
					e.preventDefault();
					$navLayer.find(_.layerCol).eq(tgIdx).find(':focusable:first').focus();
				}
			});
			$navLayer.off(EVENT_KEY).on(Event.MOUSEENTER, _.layerCol, function () {
				// Col select
				tgIdx = $navLayer.find(_.layerCol).index($(this));
				$BODY.find(_.navLink).eq(tgIdx).trigger(Event.MOUSEOVER);
			}).on(Event.FOCUS, _.layerCol + ' :focusable', function () {
				tgIdx = $navLayer.find(_.layerCol).index($(this).closest(_.layerCol));
				$BODY.find(_.navLink).eq(tgIdx).trigger(Event.MOUSEOVER);
			}).on(Event.KEYDOWN, _.layerCol + ' li:first-child :focusable', function (e) {
				// Focus
				if (e.keyCode === 9 && e.shiftKey) {
					e.preventDefault();
					$(_.navLink).eq(tgIdx).focus();
				}
			}).on(Event.KEYDOWN, _.layerCol + ' li:last-child :focusable', function (e) {
				// Focus
				if (e.keyCode === 9 && !e.shiftKey) {
					if ($(this).is(_.layerCol + ':last li:last-child :focusable')) {
						$navLayer.removeClass(ClassName.ACTIVE).stop().slideUp(_.aniSpeed, function () {
							$nav.find('.' + ClassName.ACTIVE).removeClass(ClassName.ACTIVE);
						});
						// Activebar
						if (activeBar) _.$activeBar.stop().fadeOut(_.aniSpeed);
					}
					e.preventDefault();
					$(_.navLink).eq(tgIdx + 1).focus();
				}
			});
			// Hide
			$navbar.off(EVENT_KEY).on(Event.MOUSELEAVE, function () {
				// Check focus
				setTimeout(function () {
					if (!$navbar.find(':focus').length) {
						$navLayer.removeClass(ClassName.ACTIVE).stop().slideUp(_.aniSpeed, function () {
							$nav.find('.' + ClassName.ACTIVE).removeClass(ClassName.ACTIVE);
						});
						// Activebar
						if (activeBar) _.$activeBar.stop().fadeOut(_.aniSpeed);
					}
				});
			}).on(Event.FOCUSOUT, function () {
				setTimeout(function () {
					if (!$navbar.find(':focus').length) $navbar.trigger(Event.MOUSELEAVE);
				});
			});
			$navTopMenu.add('.navbar-search, .navbar-search-modi').on(Event.MOUSEENTER, function () {
				$navbar.trigger(Event.MOUSELEAVE);
			});
		},
		activeBar: function (tgIdx) {
			var _ = feUI.Navbar.variable,
				$nav = $(_.nav),
				$navLink = $(_.navLink),
				navLinkWidthArr = $navLink.find('span').map(function () {
					var tgWidth = $(this).outerWidth();
					return Math.round(tgWidth);
				}).get(),
				navLinkPosArr = $navLink.find('span').map(function () {
					return Math.round($(this).position().left);
				}).get();
			(!$nav.find('.' + ClassName.ACTIVE).length)
				? _.$activeBar.css({
					left: navLinkPosArr[tgIdx],
					width: navLinkWidthArr[tgIdx],
					opacity: 0
				}).show().stop().animate({
					opacity: 1
				}, _.aniSpeed)
				: _.$activeBar.show().stop().animate({
					left: navLinkPosArr[tgIdx],
					width: navLinkWidthArr[tgIdx],
					opacity: 1
				}, _.aniSpeed);
		}
	};
	// DEV Ajax
	// feUI.Navbar.init();
	// Window Event
	$WINDOW.on(Event.RESIZE, function () {
		if (WINDOW_WIDTH !== $WINDOW.width())
			WINDOW_WIDTH = $WINDOW.width();
		if (WINDOW_HEIGHT !== $WINDOW.height())
			WINDOW_HEIGHT = $WINDOW.height();
		feUI.SetMapMinHeight();
	}).on(Event.SCROLL, function () {
		SCROLLTOP_POS = $WINDOW.scrollTop();
	});
})(feUI, jQuery, window, document);
