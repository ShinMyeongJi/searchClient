/* feCommon.js | IDOP HCP PC */
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
(function(feUI, $, window, document, undefined) {
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
		$BODY = $HTML.find('body').off(EVENT_KEY).on(Event.KEYDOWN, function(e) {
			if ( e.keyCode === 9 ) $HTML.removeClass(ClassName.OUTLINE_DISABLE);
		}).on(Event.KEYUP, function(e) {
			if ( e.keyCode === 13 ) $HTML.removeClass(ClassName.OUTLINE_DISABLE);
		}).on(Event.CLICK, function() {
			$HTML.addClass(ClassName.OUTLINE_DISABLE);
		}),
		$HEADER = $BODY.find('.header'),
		$CONTENT = $BODY.find('.content');
	// Disable invalid alert
	feUI.DisableInvalidAlert = function() {
		var EVENT_KEY = '.DisableInvalidAlert',
			Event = {
				INVALID: 'invalid' + EVENT_KEY
			};
		var required = '[required]';
		$BODY.off(EVENT_KEY).on(Event.INVALID, required, function(e) {
			e.preventDefault();
		});
	};
	feUI.DisableInvalidAlert();
	// Skip To Content
	feUI.SkipToContent = function() {
		var EVENT_KEY = '.SkipToContent',
			Event = {
				CLICK: 'click' + EVENT_KEY,
				KEYDOWN: 'keydown' + EVENT_KEY
			};
		var $skipNaviBtn = $BODY.find('a.skip-navigation'),
			targetId = $skipNaviBtn.attr('href');
		if ( !$skipNaviBtn.length ) return false;
		if ( !$CONTENT.length ) $skipNaviBtn.hide();
		$skipNaviBtn.off(EVENT_KEY).on(Event.CLICK, function(e) {
			e.preventDefault();
			$(targetId).attr('tabindex', 0).focus()
				.off(EVENT_KEY).on(Event.KEYDOWN, function(e) {
					if ( e.keyCode === 9 ) $(this).removeAttr('tabindex');
				});
		});
	};
	feUI.SkipToContent();
	// Focus rotation(Required: jQuery UI)
	feUI.FocusRotation = function($target) {
		var EVENT_KEY = '.FocusRotation',
			Event = {
				KEYDOWN: 'keydown' + EVENT_KEY
			};
		var $selectize = $target.find(':focusable:first').closest('.selectize-control');
		if ( !$target ) return false;
		( $selectize.length )
			? $target.find(':focusable:last').focus()
			: $target.find(':focusable:first').focus();
		$target.off(EVENT_KEY).on(Event.KEYDOWN, ':focusable:first', function(e) {
			if ( e.keyCode === 9 && e.shiftKey ) {
				e.preventDefault();
				$target.find(':focusable:last').focus();
			}
		}).on(Event.KEYDOWN, ':focusable:last', function(e) {
			if ( e.keyCode === 9 && !e.shiftKey ) {
				e.preventDefault();
				$target.find(':focusable:first').focus();
			}
		});
	};
	// Document title
	feUI.DocumentTitle = function(titleCheck) {
		var documentTitle = $DOCUMENT.attr('title'),
			pageTitleTxt = $CONTENT.find('h2, .h2').filter(':first').text(),
			activeTabTxt = $BODY.find('.tab li a.' + ClassName.ACTIVE).filter(':first').text(),
			newTitle = ( !pageTitleTxt.length )
				? documentTitle : ( !activeTabTxt.length )
					? pageTitleTxt + ' | ' + documentTitle
					: activeTabTxt + ' | ' + pageTitleTxt + ' | ' + documentTitle;
		// 회원가입
		var activeStepTxt = $BODY.find('.step-info li.' + ClassName.ACTIVE).filter(':first').text();
		if ( activeStepTxt.length ) newTitle = activeStepTxt + ' | ' + newTitle;
		// Reset title
//		newTitle = '후다닥의사'; // 임시
		if(titleCheck) {
			newTitle = ''
			documentTitle = '후다닥의사'	
			console.log(newTitle);
				var firstChild = $CONTENT.find('ol').filter(':first').children().filter('li:eq(1)').text(),
			secondChild = $CONTENT.find('ol').filter(':first').children().filter('li:eq(2)').text().split('주메뉴',1)[0];
			newTitle = (!firstChild.length) 
				? documentTitle : (!secondChild.length) 
						?  firstChild + ' | ' + documentTitle
						: secondChild + ' | ' + firstChild + ' | ' + documentTitle
			console.log(documentTitle)
		}
		$('meta[property="og:title"]').attr('content', newTitle);
		$('meta[name="title"]').attr('content', newTitle);
		$('meta[itemprop="name"]').attr('content', newTitle);
		$('meta[itemprop="headline"]').attr('content', newTitle);
		$DOCUMENT.attr('title', newTitle);

	};
	feUI.DocumentTitle();
	// Scrollbar Style(Required: jQuery CSS Customizable Scrollbar)
	feUI.ScrollbarStyle = function() {
		var $scrollbarWrap = $BODY.find('.scrollbar');
		$scrollbarWrap.scrollbar();
	};
	feUI.ScrollbarStyle();
	// All check checkbox
	feUI.CheckAllCheckbox = function() {
		var EVENT_KEY = '.CheckAllCheckbox',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var contentCheckbox = ':checkbox[data-group]:not(:disabled)',
			tableCheckbox = 'tr > :first-child > .checkbox :checkbox:not(:disabled)';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, contentCheckbox + ',' + tableCheckbox , function() {
			var $this = $(this),
				contentType = $this.is(contentCheckbox),
				groupData = $this.data('group'),
				$targetGroup = ( contentType )
					? $(contentCheckbox).filter('[data-group="' + groupData + '"]')
					: $this.closest('table'),
				$checkAllBtn = ( contentType )
					? $targetGroup.filter('.checkbox-all')
					: $targetGroup.find('thead :checkbox:not(:disabled)'),
				$targetCheckbox = ( contentType )
					? $targetGroup.not($checkAllBtn)
					: $targetGroup.find(':checkbox').not($checkAllBtn),
				targetCheckboxSize = $targetCheckbox.length,
				isChecked = $this.is(':checked');
			if ( isChecked ) {
				if ( $this.is($checkAllBtn) ) $targetCheckbox.not(':disabled').prop('checked', true);
				if ( $targetCheckbox.filter(':checked').length === targetCheckboxSize )
					$checkAllBtn.prop('checked', true);
			} else {
				( $this.is($checkAllBtn) )
					? $targetCheckbox.not(':disabled').prop('checked', false)
					: $checkAllBtn.prop('checked', false);
			}
			feUI.FormLabelClass();
		});
	};
	feUI.CheckAllCheckbox();
	// Input type file
	feUI.FileInput = function() {
		var EVENT_KEY = '.FileInput',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var targetFileInp = '.file :file';
		$BODY.find(targetFileInp).each(function() {
			var $this = $(this),
				$targetWrap = $this.closest('.file-group'),
				$targetInp = $targetWrap.find('.textfield');
			if ( $this.is(':disabled') ) {
				$targetInp.prop('disabled', true);
				$targetWrap.addClass(ClassName.DISABLED);
			} else {
				$targetInp.prop('disabled', false);
				$targetWrap.removeClass(ClassName.DISABLED);
			}
		}).end().off(EVENT_KEY).on(Event.CHANGE, targetFileInp, function() {
			var $this = $(this),
				$resultInp = $this.closest('.file').prev('.textfield');
			$resultInp.val($this.val());
		});
	};
	feUI.FileInput();
	// Highlight Input
	feUI.HighlightInput = function() {
		var EVENT_KEY = '.HighlightInput',
			Event = {
				KEYUP: 'keyup' + EVENT_KEY
			};
		var highlightData = 'data-highlight',
			tgHighlightInp = ':text[' + highlightData + ']';
		$BODY.off(EVENT_KEY).on(Event.KEYUP, tgHighlightInp, function() {
			var $this = $(this),
				tgVal = $this.val(),
				tgData = $this.data('highlight'),
				$tgLayer = $BODY.find('[data-highlight="' + tgData + '"]').not($this);
			$tgLayer.removeHighlights().highlights(tgVal);
		});
	};
	feUI.HighlightInput();
	// Toggle form(Reset)
	feUI.ToggleFormReset = function($target) {
		if ( !$target ) return;
		$target.each(function() {
			var $this = $(this),
				$tgRadio = $this.find(':radio:checked'),
				$tgCheckbox = $this.find(':checkbox:checked'),
				$tgSelect = $this.find('select'),
				$tgTextfield = $this.find('.textfield:not([readonly], [disabled])');
			if ( $this.hasClass('no-reset') ) return;
			// Radio, Checkbox
			$tgRadio.add($tgCheckbox).prop('checked', false).trigger('change', true);
			// Select
			$tgSelect.each(function() {
				var $this = $(this);
				// Check Selectiz
				( $this.hasClass('selectized') )
					? $this[0].selectize.setValue('', true)
					: $this.find('option:first').prop('selected', true);
				$this.trigger('change', true);
			});
			// Textfield
			$tgTextfield.val('');
		});
	};
	// Toggle form(Radio)
	feUI.ToggleFormRadio = function() {
		var EVENT_KEY = '.ToggleFormRadio',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var dataToggle = 'data-toggle',
			dataToggleGroup = 'data-toggle-group',
			triggerBtn = ':radio[' + dataToggle + ']';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, triggerBtn, function() {
			var $this = $(this),
				$dataGroup = $BODY.find('[' + dataToggleGroup + '="' + $this.prop('name') + '"]'),
				$target = $dataGroup.filter('[' + dataToggle + '*="' + $this.attr(dataToggle) + '"]'),
				checked = $this.is(':checked');
			// Toggle
			$target.show();
			$dataGroup.not($target).hide();
			if ( !checked ) $target.hide();
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
	feUI.ToggleFormSelect = function() {
		var EVENT_KEY = '.ToggleFormSelect',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var dataToggle = 'data-toggle',
			dataToggleGroup = 'data-toggle-group',
			triggerSelect = '.select[' + dataToggle + ']';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, triggerSelect, function() {
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
	feUI.FormLabelClass = function() {
		var EVENT_KEY = '.FormLabelClass',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var targetFormEl = '.checkbox :checkbox, .radio :radio';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, targetFormEl, function() {
			var $this = $(this),
				$label = $this.closest('label');
			( $this.is(':checked') )
				? $label.addClass(ClassName.CHECKED)
				: $label.removeClass(ClassName.CHECKED);
			( $this.is(':disabled') )
				? $label.addClass(ClassName.DISABLED)
				: $label.removeClass(ClassName.DISABLED);
			// Radio button
			if ( $this.is(':radio') ) {
				$(targetFormEl).filter(':radio[name="' + $this.prop('name') + '"]:not(:checked)')
					.closest('label').removeClass(ClassName.CHECKED);
			}
		}).find(targetFormEl).trigger(Event.CHANGE);
	};
	feUI.FormLabelClass();
	// Add role and aria label attribute
	feUI.AddRoleAttribute = function() {
		var anchorButton = '.btn[href=""], .btn[href="#"], .btn[href="/"]';
		$BODY.find(anchorButton).attr('role', 'button');
	};
	feUI.AddRoleAttribute();
	// Breadcrumb
	feUI.breadcrumb = function() {
		var EVENT_KEY = '.breadcrumb',
			Event = {
				FOCUSOUT: 'focusout' + EVENT_KEY,
				CLICK: 'click' + EVENT_KEY
			};
		var breadcrumb = '.breadcrumb',
			bcLinkLayerBtn = '.btn-bcLink',
			bcLinkLayer = '.bcLinkLayer',
			aniSpeed = 150,
			$tgBcLinkLayer;
		if ( !$(breadcrumb).length ) return false;
		// Attribute
		$(breadcrumb).find(bcLinkLayer).attr({
			'role': 'region',
			'aria-hidden': true,
			'aria-expanded': false
		});
		// Event
		$BODY.off(EVENT_KEY).on(Event.CLICK, bcLinkLayerBtn, function() {
			var $this = $(this);
			$tgBcLinkLayer = $this.siblings(bcLinkLayer);
			$tgBcLinkLayer.stop(true, true);
			( $this.hasClass(ClassName.ACTIVE) ) ? hideLayer() : showLayer();
		}).on(Event.FOCUSOUT, bcLinkLayer, function() {
			setTimeout(function() {
				if ( !$(bcLinkLayer).filter(':visible').find(':focus').length ) hideLayer();
			});
		});
		// Toggle
		function showLayer() {
			$tgBcLinkLayer.slideDown(aniSpeed, function() {
				$(this).attr({
					'aria-hidden': false,
					'aria-expanded': true
				});
			});
			$(bcLinkLayerBtn).addClass(ClassName.ACTIVE);
		}
		function hideLayer() {
			$tgBcLinkLayer.slideUp(aniSpeed, function() {
				$(this).attr({
					'aria-hidden': true,
					'aria-expanded': false
				});
			});
			$(bcLinkLayerBtn).filter(':visible').removeClass(ClassName.ACTIVE);
		}
	};
	feUI.breadcrumb();
	// slideSet(slick)
	feUI.slideSet = function() {
		var $sideBanner = $BODY.find('.side-banner:has(>)'),
			$recommendList = $BODY.find('.recommend-list .slide:has(>)'),
			$thumbSlideView = $BODY.find('.thumb-slide-view:has(>)'),
			$thumbSlideNav = $BODY.find('.thumb-slide:has(>)'),
			$thumbRowSlideView = $BODY.find('.thumb-row-slide-view:has(>)'),
			$thumbRowSlideNav = $BODY.find('.thumb-row-slide:has(>)'),
			$columnSlide = $BODY.find('.column-slide:has(>)'),
			$recruitSlide = $BODY.find('.recruit-slide:has(>)'),
			$mylifeSlide = $BODY.find('.mylife-slide01:has(>)'),
			$mylifeSlide02 = $BODY.find('.mylife-slide02:has(>)'),
			$mainQnaSlide01 = $BODY.find('.main .qna48 .qna-slide:has(>)'),
			$mainQnaSlide02 = $BODY.find('.main .qna-town .qna-slide:has(>)'),
			$mainEventSlide = $BODY.find('.main .event-banner .banner-slide:has(>)');
		// Destroy
		$('.slick-initialized').slick('unslick');
		// Init
		$sideBanner.slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1
		});
		$recommendList.slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			aoutPlay: true
		});
		$thumbSlideView.slick({
			slidesToShow: 1,
			slidesToScroll: 6,
			arrows: false,
			fade: true,
			asNavFor: '.slider-nav',
			zIndex: 10
		});
		$thumbSlideNav.slick({
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			arrows: false,
			focusOnSelect: true,
			zIndex: 10
		});
		$thumbRowSlideView.slick({
			slidesToShow: 1,
			slidesToScroll: 3,
			arrows: false,
			fade: true,
			asNavFor: '.slider-row-nav',
			zIndex: 10
		});
		$thumbRowSlideNav.slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.slider-row-for',
			arrows: false,
			vertical: true,
			focusOnSelect: true,
			zIndex: 10
		});
		$columnSlide.slick({
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: true
		});
		$recruitSlide.slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1
		});
		$mylifeSlide.slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1
		});
		$mylifeSlide02.slick({
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1
		});
		$mainQnaSlide01.slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			vertical: true,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 5000
		});
		$mainQnaSlide02.slick({
			infinite: true,
			slidesToShow: 7,
			slidesToScroll: 1,
			vertical: true,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 5000
		});
		$mainEventSlide.slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			autoplaySpeed: 5000,
			dots: true
		});
	};
	feUI.slideSet();
	// KeywordRankSlide
	feUI.KeywordRankSlide = function() {
		var EVENT_KEY = '.KeywordRankSlide',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var keywordRank = '.main-srh .keyword',
			keywordSlide = '.keyword-slide',
			toggleBtn = '.btn-open';
		$BODY.off(EVENT_KEY).on(Event.CLICK, keywordRank + ' ' + toggleBtn, function(e) {
			e.preventDefault();
			if ( $(keywordRank).hasClass(ClassName.ACTIVE) ) {
				$(keywordRank).removeClass(ClassName.ACTIVE);
				slide();
			} else {
				$(keywordRank).addClass(ClassName.ACTIVE);
				$(keywordSlide).filter('.slick-initialized').slick('unslick');
			}
		});
		function slide() {
			$(keywordSlide).slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				vertical: true,
				autoplay: true,
				arrows: false,
				autoplaySpeed: 2000
			});
		}
		slide();
	};
	feUI.KeywordRankSlide();
	// ratingBtnToggle
	feUI.ratingBtnToggle = function() {
		var EVENT_KEY = '.ratingBtnToggle',
			Event = {
				MOUSEOVER: 'mouseover' + EVENT_KEY,
			};
		var ratingBtn = '.btn-rating a';
		$BODY.off(EVENT_KEY).on(Event.MOUSEOVER, ratingBtn, function(e) {
			var $this = $(this);
			e.preventDefault();
			if ( !$this.hasClass(ClassName.ACTIVE) ) {
				$this.addClass(ClassName.ACTIVE);
				$this.prevAll('a').addClass(ClassName.ACTIVE);
			} else if ( $this.next('a').hasClass(ClassName.ACTIVE) ) {
				$this.removeClass(ClassName.ACTIVE);
				$this.nextAll('a').removeClass(ClassName.ACTIVE);
			} else {
				$this.removeClass(ClassName.ACTIVE);
			}
		});
	};
	feUI.ratingBtnToggle();
	// Preview Layer
	feUI.PreviewLayer = function() {
		var $previewLayer = $BODY.find('.preview-layer').add('.hosMoContent .view'),
			startPos;
		if ( !$previewLayer.length ) return false;
		startPos = $('.hosMoContent').offset().top - $('.navbar').outerHeight() - 70;
		if ( $WINDOW.height() < 950 ) {
			$previewLayer.removeClass(ClassName.ACTIVE);
			return false;
		}
		( startPos < SCROLLTOP_POS )
			? $previewLayer.addClass(ClassName.ACTIVE)
			: $previewLayer.removeClass(ClassName.ACTIVE);
	};
	feUI.PreviewLayer();
	// profileToggle(전문가 프로필 더 보기)
	feUI.profileToggle = function() {
		var EVENT_KEY = '.profileToggle',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var $toggleGroup = $BODY.find('.toggle-group'),
			$toggleBtn = $toggleGroup.find('.btn');
		$toggleBtn.off(EVENT_KEY).on(Event.CLICK, function() {
			var $this = $(this);
			$this.closest($toggleGroup).toggleClass(ClassName.ACTIVE);
		});
	};
	feUI.profileToggle();
	// Workday group
	feUI.WorkdayGroup = function() {
		var EVENT_KEY = '.WorkdayGroup',
			Event = {
				CHANGE: 'change' + EVENT_KEY
			};
		var workdayGroup = '.workday-group';
		$BODY.off(EVENT_KEY).on(Event.CHANGE, workdayGroup + ' :checkbox:not(.allDay)', function() {
			var $this = $(this),
				$tgGroup = $this.closest(workdayGroup),
				$tgSelect = ( $tgGroup.find('.selectized').length )
					? $tgGroup.find('.selectized') // Selectize
					: $tgGroup.find('select'),
				checked = $this.prop('checked');
			if ( checked ) {
				$tgSelect.each(function() {
					var $this = $(this);
					( $this.hasClass('selectized') )
						? $this[0].selectize.disable()
						: $this.prop('disabled', true);
				});
			} else {
				$tgSelect.each(function() {
					var $this = $(this);
					( $this.hasClass('selectized') )
						? $this[0].selectize.enable()
						: $this.prop('disabled', false);
				});
			}
		});
	};
	feUI.WorkdayGroup();
	// Img sortable
	feUI.ImgSortable = function() {
		var EVENT_KEY = '.ImgSortable',
			Event = {
				CLICK: 'click' + EVENT_KEY
			};
		var imgGroup = '.img-sortable',
			imgAnchor = '.img-anchor';
		$(imgGroup).sortable({
			disabled: true,
			placeholder: 'ui-state-highlight'
		});
		$BODY.off(EVENT_KEY).on(Event.CLICK, imgGroup + ' ' + imgAnchor, function(e) {
			var $this = $(this),
				$imgGroup = $this.closest(imgGroup);
			e.preventDefault();
			$this.toggleClass(ClassName.ACTIVE).siblings().removeClass(ClassName.ACTIVE);
			( $this.hasClass(ClassName.ACTIVE) )
				? $imgGroup.sortable('enable')
				: $imgGroup.sortable('disable');
		});
	};
	feUI.ImgSortable();
	// Table Tip Box
	feUI.tipbox = function() {
		var EVENT_KEY = '.tipbox',
			Event = {
				CLICK: 'click' + EVENT_KEY,
				SCROLL: 'scroll' + EVENT_KEY
			};
		var tipGroup = '.tip-group',
			tipBtn = '.tip-group > .btn';
		$BODY.off(EVENT_KEY).on(Event.CLICK, function(e) {
			if ( !$(e.target).closest(tipGroup).length ) $(tipGroup).removeClass(ClassName.ACTIVE);
		}).on(Event.CLICK, tipBtn, function(e) {
			var $this = $(this),
				$tgGroup = $this.closest(tipGroup);
			e.preventDefault();
			$tgGroup.toggleClass(ClassName.ACTIVE);
			$(tipGroup).not($tgGroup).removeClass(ClassName.ACTIVE);
		});
		$WINDOW.on(Event.SCROLL, function(e) {
			$(tipGroup).filter('.' + ClassName.ACTIVE).find('.btn').trigger(Event.CLICK);
		});
	};
	feUI.tipbox();
	// Comment Toggle
	feUI.commentToggle = function() {
		var EVENT_KEY = '.commentToggle',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var toggleBtn = '.btn-toggle';
		$BODY.off(EVENT_KEY).on(Event.CLICK, toggleBtn, function() {
			var $this = $(this);
			$this.toggleClass(ClassName.ACTIVE);
		});
	};
	feUI.commentToggle();
	// cardToggle
	feUI.CardToggle = function() {
		var EVENT_KEY = '.CardToggle',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var boardCardItem = '.boardCard .item',
			moreBtn = '.btn-more',
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
				$this.add($thisItem).removeClass(ClassName.ACTIVE);
			} else {
				$textWrap.text(hideText);
				$this.add($thisItem).addClass(ClassName.ACTIVE);
			}
		});
	};
	feUI.CardToggle();
	//tblToggle
	feUI.tblToggle = function() {
		var $boardCard = $BODY.find('.view-medicine'),
			$btnMore = $boardCard.find('.btn-more'),
			_EVENT_KEY = EVENT_KEY + 'tblToggle';
		if ( !$boardCard.length ) return false;
		$btnMore.off('click' + _EVENT_KEY).on('click' + _EVENT_KEY, function() {
			var $this = $(this);
			$this.closest('td').toggleClass(ClassName.ACTIVE);
			( $this.closest('td').hasClass(ClassName.ACTIVE) )
				? $this.find('span').text('접기')
				: $this.find('span').text('더보기');
		});
	};
	feUI.tblToggle();
	//medicineSearch
	feUI.medicineSearch = function() {
		var EVENT_KEY = '.medicineSearch',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var searchList = '.medicine-search';
		$BODY.off(EVENT_KEY).on(Event.CLICK, searchList + ' span, ' + searchList + ' a', function(e) {
			var $this = $(this),
				$list = $this.closest('li');
			e.preventDefault();
			$list.addClass(ClassName.ACTIVE).siblings('li')
				.removeClass(ClassName.ACTIVE);
		});
	};
	feUI.medicineSearch();
	//searchFilter
	feUI.searchFilter = function() {
		var EVENT_KEY = '.searchFilter',
			Event = {
				CLICK: 'click' + EVENT_KEY,
			};
		var tgBtn = '.select-btn button';
		var $filterGroup = $BODY.find('.search-filter'),
			$btnGroup = $filterGroup.find('.select-btn'),
			$tgItem = $filterGroup.find('.item-group .item');
		$BODY.off(EVENT_KEY).on(Event.CLICK, tgBtn, function() {
			var $this = $(this),
				$tglength = $this.data('detail');
			$this.toggleClass(ClassName.ACTIVE);
			if ( $btnGroup.find('button').hasClass(ClassName.ACTIVE) ) {
				$btnGroup.find('button').not($this).removeClass(ClassName.ACTIVE);
				$tgItem.removeClass(ClassName.ACTIVE);
				$tgItem.eq($tglength - 1).addClass(ClassName.ACTIVE);
				$filterGroup.addClass(ClassName.ACTIVE);
			} else {
				$tgItem.removeClass(ClassName.ACTIVE);
				$filterGroup.removeClass(ClassName.ACTIVE);
			}
		});
	};
	feUI.searchFilter();
	// Tab Size
	feUI.TabSizeClass = function() {
		var tab = '.tab.tab-type01',
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
	// TextfieldSearch
	feUI.TextfieldSearch = function() {
		var EVENT_KEY = '.TextfieldSearch',
			Event = {
				FOCUS: 'focus' + EVENT_KEY,
				FOCUSOUT: 'focusout' + EVENT_KEY
			};
		var formGroup = '.form-group',
			searchField = '.textfield-search',
			resultLayer = '.textfield-layer';
		$BODY.off(EVENT_KEY).on(Event.FOCUSOUT, searchField, function() {
			var $this = $(this),
				$tgGroup = $this.closest(formGroup),
				$tgLayer = $tgGroup.find(resultLayer);
			setTimeout(function() {
				if ( !$tgLayer.find(':focus').length ) $tgLayer.hide();
			});
		}).on(Event.FOCUSOUT, resultLayer, function() {
			var $this = $(this);
			setTimeout(function() {
				if ( !$this.find(':focus').length ) $this.hide();
			});
		});
	};
	feUI.TextfieldSearch();
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
		var ellipsisLine01 = '.ellipsis-line01, .line-size01',
			ellipsisLine02 = '.ellipsis-line02, .line-size02, .feed-body > a > .text,.title-row2, .info-template02 .card-list .text, .info-template05 .desc, [class*=boardCard-type] .txt, .my-layout .my-boardCard-type05 .title strong, .card-event .title, .boardCard-text .text, .boardCard-type03 .item.ellipsis ul.more-list li.more',
			ellipsisLine03 = '.ellipsis-line03, .line-size03, .list-group .list .text',
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
				$pie.css('clip', 'rect(0px, 94px, 94px, 47px)');
				$rightSide.css('transform', 'rotate(0deg)');
			}
			$leftSide.css('transform', 'rotate(' + deg + 'deg)');
		});
	};
	feUI.donutGraph();
	// Site Map
	feUI.SiteMap = function() {
		var EVENT_KEY = '.SiteMap',
			Event = {
				CLICK: 'click' + EVENT_KEY,
				MOUSELEAVE: 'mouseleave' + EVENT_KEY
			};
		var header = '.header',
			siteMap = '.site-map',
			mapBtn = '.btn-map',
			mapLayer = '.map-layer',
			aniSpeed = 150;
		$BODY.off(Event.CLICK).on(Event.CLICK, mapBtn, function(e) {
			e.preventDefault();
			feUI.Navbar.navLayer('close');
			// Toggle
			if ( $(siteMap).hasClass(ClassName.ACTIVE) ) {
				$(siteMap).removeClass(ClassName.ACTIVE);
				$(mapLayer).slideUp(aniSpeed);
			} else {
				$(siteMap).addClass(ClassName.ACTIVE);
				$(mapLayer).slideDown(aniSpeed);
			}
		}).on(Event.MOUSELEAVE, header, function(e) {
			if ( !$(siteMap).hasClass(ClassName.ACTIVE) ) return;
			$(mapBtn).trigger(Event.CLICK);
		});
	};
	feUI.SiteMap();
	// TextMoreBtn
	// feUI.TextMoreBtn = function() {
	// 	var EVENT_KEY = '.TextMoreBtn',
	// 		Event = {
	// 			CLICK: 'click' + EVENT_KEY
	// 		};
	// 	var textMoreArea = 'td.txt-more',
	// 		moreBtn = '.btn-more',
	// 		showText = '더보기',
	// 		hideText = '접기';
	// 	if ( !$(textMoreArea.length) ) return false;
	// 	$(textMoreArea).each(function() {
	// 		var $this = $(this),
	// 			$moreBtn = $this.find(moreBtn);
	// 		( $this.find('> p').length === 1 )
	// 			? $moreBtn.hide()
	// 			: $this.find('> p:not(:first)').hide();
	// 	});
	// 	$BODY.off(Event.CLICK).on(Event.CLICK, textMoreArea + ' ' + moreBtn, function(e) {
	// 		var $this = $(this),
	// 			$textWrap = $this.find('span'),
	// 			$moreText = $this.closest(textMoreArea).find('> p:not(:first)');
	// 		e.preventDefault();
	// 		if ( $this.hasClass(ClassName.ACTIVE) ) {
	// 			$moreText.hide();
	// 			$textWrap.text(showText);
	// 			$this.removeClass(ClassName.ACTIVE);
	// 		} else {
	// 			$moreText.show();
	// 			$textWrap.text(hideText);
	// 			$this.addClass(ClassName.ACTIVE);
	// 		}
	// 	});
	// };
	// feUI.TextMoreBtn();
	// Select(Required: jQuery selectize)
	feUI.Select = {
		init: function() {
			var $select = $BODY.find('select.select:not(.selectized, .select-keyword, .select-custom, .select-label .select)');
			// Email
			feUI.Select.email();
			// Selectize
			$select.selectize({
				allowEmptyOption: true
			});
		},
		email: function() {
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
			$BODY.find(emailSelect).each(function() {
				var $this = $(this),
					optionCode;
				for ( var i = 0; i < serviceDomain.length; i++ ) {
					optionCode = '<option value="' + serviceDomain[i] + '">' + serviceDomain[i] + '</option>';
					$this.find('option:last').before(optionCode);
				}
			}).end().off(EVENT_KEY).on(Event.CHANGE, emailSelect, function() {
				var $this = $(this),
					$emailGroup = $this.closest(emailGroup),
					$selectedOp = $this.find('option:selected'),
					$domainInp = $emailGroup.find(':text.textfield:last'),
					selectedTxt = $selectedOp.text();
				( $selectedOp.val() === customOpVal || $selectedOp.val() === '' )
					? $domainInp.removeAttr('readonly').removeAttr('disabled').val('').focus()
					: $domainInp.prop({
						'readonly': true,
						'disabled': true
					}).val(selectedTxt);
			});
		},
		keyword: function(target, value, search, category, options) {
			if ( arguments.length < 4 ) return;
			var optionTemp = [{}],
				optionKeyArr = [],
				valueKey = $.trim(value),
				searchKey = $.trim(search);
			// Create option template
			if ( typeof(options) !== 'string' ) {
				optionTemp = options;
			} else {
				$.each(arguments, function(idx, val) {
					if ( idx < 4 || typeof(val) !== 'string' ) return;
					optionTemp[0][val] = '';
				});
			}
			// Create render option
			optionKeyArr[0] = $.trim(search);
			if ( typeof(category) === 'string' && $.trim(category) !== '' ) {
				optionKeyArr[1] = $.trim(category);
			}
			// Init
			$(target).each(function(idx) {
				var $this = $(this),
					tgSelectize,
					plugins = ( $this.hasClass('select-auto') )
						? 'restore_on_backspace' : 'remove_button';
				// Selectize
				$this.selectize({
					plugins: [plugins],
					delimiter: '^',
					persist: false,
					valueField:  valueKey,
					searchField: searchKey,
					maxItems: 10,
					options: optionTemp,
					render: {
						option: function(data, escape) {
							var optionCode = '';
							for (var i = 0; i < optionKeyArr.length; i++) {
								optionCode += '<span class="option-item' + ( i + 1 ) + '">' + data[optionKeyArr[i]] + '</span>';
							}
							return '<div class="option">' +	optionCode + '</div>';
						},
						item: function(data, escape) {
							return '<div class="item">'
								+	'<span>' + data[searchKey] + '</span>'
								+ '</div>';
						}
					}
				});
				tgSelectize = $this[0].selectize;
				// Create keyup property
				tgSelectize.keyupVal = '';
				// select-reload
				if ( $this.hasClass('select-reload') ) {
					tgSelectize.settings.openOnFocus = false;
					tgSelectize.on('item_add', function(value, data) {
						tgSelectize.keyupVal = '';
					});
					tgSelectize.on('item_remove', function(value) {
						tgSelectize.clearOptions();
						tgSelectize.keyupVal = '';
					});
				}
				// select-one
				if ( $this.hasClass('select-one') || $this.hasClass('select-auto') ) {
					tgSelectize.settings.maxItems = 1;
					tgSelectize.on('change', function(value) {
						( value !== '' )
							? tgSelectize.$control_input.attr('maxlength', 0)
							: tgSelectize.$control_input.removeAttr('maxlength');
					});
				}
				// select-create
				if ( $this.hasClass('select-create') || $this.hasClass('select-auto') ) {
					tgSelectize.settings.create = function(input) {
						var createOption = {};
						$.each(Object.keys(optionTemp[0]), function(idx, val) {
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
	// jQuery UI Datepicker(Required: jQuery UI)
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
	});
	feUI.Datepicker = {
		init: function() {
			feUI.Datepicker.variable = {
				icoTxt: '달력 보기/숨기기',
				icoURL: '/static/img/common/ico_calendar.png',
				datepickerWrap: '.datepicker',
				datepickerInp: '.datepicker-input',
				dashLabel: '.label:contains(~)',
				settingBtn: '[data-dp-setting][data-dp-group]',
				dateFormat: 'yy-mm-dd'
			};
			var _ = feUI.Datepicker.variable,
				$datepickerInp = $BODY.find(_.datepickerInp);
			if ( !$datepickerInp.length ) return false;
			$datepickerInp.datepicker('destroy').datepicker({
				showOn: 'both',
				buttonText: _.icoTxt,
				buttonImage: _.icoURL,
				buttonImageOnly: true,
				dateFormat: _.dateFormat,
				beforeShow: function(e) {
					setTimeout(function() {
						feUI.Datepicker.caption(e);
					});
				}
			});
			feUI.Datepicker.setting();
			feUI.Datepicker.setMinMax();
		},
		caption: function(e) {
			var $datepicker = $BODY.find('.ui-datepicker-calendar'),
				caption = ( $(e).prop('title') ) ? $(e).prop('title') : '달력';
			$datepicker.prepend('<caption>' + caption + '</caption>');
		},
		setMinMax: function() {
			var EVENT_KEY = '.Datepicker.setMinMax',
				Event = {
					CHANGE: 'change' + EVENT_KEY
				};
			var _ = feUI.Datepicker.variable;
			$BODY.off(EVENT_KEY).on(Event.CHANGE, _.datepickerInp, function(e, trigger) {
				var $this = $(this),
					$tgWrap = $this.closest(_.datepickerWrap),
					idx = $tgWrap.find(_.datepickerInp).index($this),
					optionKey = ( idx === 0 ) ? 'minDate' : 'maxDate';
				if ( $tgWrap.find(_.datepickerInp).length !== 2
					|| $tgWrap.find(_.dashLabel).length !== 1 ) return;
				$tgWrap.find(_.datepickerInp).not($this).datepicker('option', optionKey, $this.val());
				// Reset setting button
				if ( !trigger ) $tgWrap.find(_.settingBtn).prop('checked', false);
			});
		},
		setting: function() {
			var EVENT_KEY = '.Datepicker.setting',
				Event = {
					CHANGE: 'change' + EVENT_KEY
				};
			var _ = feUI.Datepicker.variable;
			$BODY.off(EVENT_KEY).on(Event.CHANGE, _.settingBtn, function() {
				var $this = $(this),
					groupStr = $this.data('dp-group'),
					settingStr = $this.data('dp-setting'),
					setDateUnit = settingStr.slice(0, 1),
					setDateStr = settingStr.split(setDateUnit + '-')[1],
					$datepickerInpGroup = $BODY.find(_.datepickerInp + '[data-dp-group="' + groupStr +'"]');
				( setDateUnit === 'b' )
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
		init: function() {
			$.modal.defaults.closeText = '닫기',
			$.modal.defaults.clickClose = false,
			$.modal.defaults.fadeDuration = 50,
			$.modal.defaults.showSpinner = false;
			$DOCUMENT.on($.modal.BEFORE_BLOCK, feUI.Modal.before)
				.on($.modal.OPEN, feUI.Modal.open)
				.on($.modal.CLOSE, feUI.Modal.close);
			feUI.Modal.target();
			feUI.Modal.disabled();
		},
		target: function() {
			var EVENT_KEY = '.Modal.target',
				Event = {
					CLICK: 'click' + EVENT_KEY,
				};
			var targetBtn = 'button.modal-open:not(.disabled, [disabled])';
			$BODY.off(EVENT_KEY).on(Event.CLICK, targetBtn, function(e) {
				var $this = $(this);
				$.ajax({
					url: $this.data('modal'),
					success: function(results, textStatus, jqXHR) {
						$this.addClass('modal-anchor');
						$(results).appendTo('body').modal();
					}
				});
			});
		},
		disabled: function() {
			var EVENT_KEY = '.Modal.disabled',
				Event = {
					CLICK: 'click' + EVENT_KEY,
				};
			var disabledBtn = 'a.modal-open.disabled';
			$BODY.off(EVENT_KEY).on(Event.CLICK, disabledBtn, function(e) {
				return false;
			});
		},
		before: function(event, modal) {
			$HTML.addClass(ClassName.MODAL_ACTIVE);
		},
		open: function(event, modal) {
			feUI.FileInput();
			feUI.Select.init();
			feUI.ScrollbarStyle();
			feUI.ImgSortable();
			feUI.Datepicker.init();
			feUI.AddRoleAttribute();
			feUI.FocusRotation(modal.$elm);
			feUI.donutGraph();
			feUI.EllipsisText();
			// Scroll
			if ( modal.$elm.has('.scroll-content') ) modal.$elm.find('.scroll-content').scrollTop(0);
		},
		close: function(event, modal) {
			if ( modal.$anchor[0].tagName !== 'A' ) {
				modal.$elm.remove();
				$BODY.find('.modal-anchor').focus().removeClass('modal-anchor');
			} else {
				modal.$anchor.focus();
			}
			setTimeout(function() {
				$HTML.removeClass(ClassName.MODAL_ACTIVE);
			}, $.modal.defaults.fadeDuration + 10);
		}
	};
	feUI.Modal.init();
	// Navbar
	feUI.Navbar = {
		init: function() {
			feUI.Navbar.variable = {
				// Selector
				navbar: '.navbar',
				nav: '.navbar-nav',
				navLink: '.nav-link',
				navLayer: '.navbar-layer',
				navItem: '.nav-item',
				siteMap: '.site-map',
				siteMapBtn: '.btn-map',
				siteMapItem: '[class*=map-item]',
				// Fixed
				fixed: true,
				autoUnFixed: true,
				fixedClass: 'navbar-fixed',
				minWidth: ( parseInt($BODY.css('min-width')) === 0 )
					? 1190 - 17 - 1 // (17 - 1) for scrollbar
					: parseInt($BODY.css('min-width')) - 17 - 1,
				minHeight: ( parseInt($BODY.css('min-height')) === 0 )
					? 800 - 17 - 1 // (17 - 1) for scrollbar
					: parseInt($BODY.css('min-height')) - 17 - 1,
				// ETC
				aniSpeed: 150,
				activeBar: true
			};
			feUI.Navbar.variable.fixed = true;
			if ( feUI.Navbar.variable.fixed ) feUI.Navbar.fixed();
			feUI.Navbar.navLayer();
			// feUI.Navbar.siteMapWidth();
		},
		fixed: function() {
			var EVENT_KEY = '.Navbar.fixed',
				Event = {
					RESIZE: 'resize' + EVENT_KEY
				};
			var _ = feUI.Navbar.variable;
			$HTML.addClass(_.fixedClass);
			// Unfixed
			if ( _.autoUnFixed ) {
				$WINDOW.off(EVENT_KEY).on(Event.RESIZE, function() {
					( $WINDOW.width() >= _.minWidth && $WINDOW.height() >= _.minHeight )
						? $HTML.addClass(_.fixedClass) : $HTML.removeClass(_.fixedClass);
				}).trigger(Event.RESIZE);
			}
		},
		navLayer: function(state) {
			var EVENT_KEY = '.Navbar.navLayer',
				Event = {
					FOCUS: 'focus' + EVENT_KEY,
					FOCUSOUT: 'focusout' + EVENT_KEY,
					MOUSEENTER: 'mouseenter' + EVENT_KEY,
					MOUSELEAVE: 'mouseleave' + EVENT_KEY
				};
			var _ = feUI.Navbar.variable,
				$navbar = $(_.navbar),
				$nav = $(_.nav),
				$navLayer = $(_.navLayer),
				lastHeight = 0,
				activeBar = _.activeBar,
				$tgLayer, $tgLayerInner, currentHeight, tgIdx;
			// Add class
			$(_.navLink).filter(':eq(0), :eq(1), :eq(2), :eq(3)').addClass('import');
			// State
			if ( state === 'close' ) {
				hideLayer();
				return;
			}
			// Create activebar
			if ( activeBar && !$nav.next('ins').length ) {
				$nav.after('<ins class="nav-activebar" />');
				_.$activeBar = $nav.siblings('.nav-activebar');
			}
			// Toggle
			$BODY.off(EVENT_KEY).on(Event.FOCUS + ' ' + Event.MOUSEENTER, _.navLink, function() {
				var $this = $(this);
				$tgLayer = $this.siblings($navLayer).css('height', 'auto'),
				$tgLayerInner = $tgLayer.find('> .inner').css('height', 'auto').show(),
				currentHeight = ( !$tgLayerInner.find('ul').length ) ? 0 : $tgLayer.outerHeight(),
				tgIdx = $nav.find(_.navLink).index($this);
				// Sitemap
				if ( $(_.siteMap).hasClass(ClassName.ACTIVE) ) return;
				// Activebar
				if ( activeBar ) feUI.Navbar.activeBar(tgIdx);
				// Active class
				$nav.find(_.navLink + ', ' + _.navLayer).filter('.' + ClassName.ACTIVE)
					.removeClass(ClassName.ACTIVE);
				$this.add($tgLayer).addClass(ClassName.ACTIVE);
				// Show
				if ( lastHeight === 0 && currentHeight === 0 ) return;
				$navLayer.hide();
				$tgLayer.add($tgLayerInner).css('height', lastHeight).show();
				lastHeight = currentHeight;
				$tgLayer.add($tgLayerInner).stop().animate({
					height: currentHeight
				}, _.aniSpeed, function() {
					if ( currentHeight === 0 ) $tgLayer.hide();
					$tgLayer.add($tgLayerInner).css('height', 'auto');
				});
			});
			// Hide
			$navbar.off(EVENT_KEY).on(Event.MOUSELEAVE, function() {
				$(_.siteMapBtn).blur();
				// Check focus
				setTimeout(function() {
					if ( !$navbar.find(':focus').length ) hideLayer();
				});
			}).on(Event.FOCUSOUT, function() {
				setTimeout(function() {
					if ( !$navbar.find(':focus').length ) hideLayer();
				});
			});
			function hideLayer() {
				$navLayer.removeClass(ClassName.ACTIVE).stop().slideUp(_.aniSpeed, function() {
					$nav.find(_.navLink + ', ' + _.navLayer).filter('.' + ClassName.ACTIVE)
						.removeClass(ClassName.ACTIVE);
				});
				// Activebar
				if ( activeBar ) _.$activeBar.stop().fadeOut(_.aniSpeed);
				// Reset
				lastHeight = 0;
			}
		},
		activeBar: function(tgIdx) {
			var _ = feUI.Navbar.variable,
				$nav = $(_.nav),
				$navLink = $(_.navLink),
				navLinkWidthArr = $navLink.find('span').map(function() {
					var tgWidth = $(this).outerWidth();
					return Math.round(tgWidth);
				}).get(),
				navLinkPosArr = $navLink.find('span').map(function() {
					return Math.round($(this).position().left);
				}).get();
			( !$nav.find('.' + ClassName.ACTIVE).length )
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
		},
		siteMapWidth: function() {
			var _ = feUI.Navbar.variable;
			$(_.siteMapItem).each(function(idx, e) {
				var $this = $(this),
					thisWidth = Math.ceil($(_.navItem).eq(idx).outerWidth(true));
				$this.width(thisWidth);
			});
		}
	};
	// Dev Ajax load
	// feUI.Navbar.init();
	// headerLayout
	feUI.headerLayout = {
		init: function () {
			feUI.headerLayout.variable = {
				headerTop: '.top',
				navbar: '.navbar',
				noticeBanner: '.notice-banner',
				fixedClass: 'navbar-fixed',
				headerTopH: null,
				noticeBannerH: null,
				aniSpeed: 150
			};
			feUI.headerLayout.noticeBanner();
			feUI.headerLayout.setHeader();
		},
		noticeBanner: function () {
			var _ = feUI.headerLayout.variable,
				$noticeBanner = $BODY.find(_.noticeBanner);
			_.noticeBannerH = ($noticeBanner.filter(':visible').length) ? $noticeBanner.height() : 0;
			$noticeBanner.off('click').on('click', '.btn-close', function (e) {
				$noticeBanner.slideUp(_.aniSpeed);
				$HEADER.stop().animate({
					top: 0
				}, _.aniSpeed);
				e.preventDefault();
			});
		},
		setHeader: function () {
			var _ = feUI.headerLayout.variable,
				headerTopPos,
				navTopPos,
				$headerTop = $HEADER.find(_.headerTop),
				$navbar = $(_.navbar);
			_.headerTopH = $headerTop.outerHeight();
			if ($HTML.hasClass(_.fixedClass)) {
				if ($CONTENT.hasClass('main')) {
					(_.noticeBannerH > 0)
						? (SCROLLTOP_POS < _.noticeBannerH)
							? headerTopPos = _.noticeBannerH - SCROLLTOP_POS
							: headerTopPos = 0
						: headerTopPos = 0;
					$HEADER.css('top', headerTopPos);
				} else {
					$HEADER.css('position', 'relative');
					if (SCROLLTOP_POS < _.noticeBannerH + _.headerTopH) {
						( $navbar.hasClass(ClassName.ACTIVE) )
							? $navbar.removeClass(ClassName.ACTIVE)
							: $navbar.css('position', 'relative').removeClass(ClassName.ACTIVE);
					} else {
						$navbar.css('position', 'fixed').addClass(ClassName.ACTIVE);
						navTopPos = 0;
					}
					$navbar.css('top', navTopPos);
				}
			} else {
				$HEADER.add($navbar).removeAttr('style');
			}
		}
	};
	feUI.headerLayout.init();
	// Window Event
	$WINDOW.on(Event.RESIZE, function() {
		if ( WINDOW_WIDTH !== $WINDOW.width() )
			WINDOW_WIDTH = $WINDOW.width();
		if ( WINDOW_HEIGHT !== $WINDOW.height() )
			WINDOW_HEIGHT = $WINDOW.height();
		feUI.headerLayout.init();
	}).on(Event.SCROLL, function(e) {
		SCROLLTOP_POS = $WINDOW.scrollTop();
		feUI.headerLayout.init();
		feUI.PreviewLayer();
	});
})(feUI, jQuery, window, document);
