; (function ($) {
	const UI = {
		/**
		 * UserAgent 관련 기능
		 */
		userAgent: {
			info: null,

			/**
			 * UserAgent 정보를 수집하여 반환
			 * @returns {Object} UserAgent 정보 객체
			 */
			getInfo: function () {
				const userAgent = navigator.userAgent;
				const userAgentCheck = {
					ieMode: document.documentMode,
					isIos: Boolean(userAgent.match(/iPod|iPhone|iPad/)),
					isAndroid: Boolean(userAgent.match(/Android/)),
				};

				if (userAgent.match(/Edge/gi)) {
					userAgentCheck.ieMode = 'edge';
				}

				userAgentCheck.androidVersion = (function () {
					if (userAgentCheck.isAndroid) {
						try {
							const match = userAgent.match(/Android ([0-9]+\.[0-9]+(\.[0-9]+)*)/);
							return match ? match[1] : null;
						} catch (e) {
							console.log(e);
							return null;
						}
					}
					return null;
				})();

				return userAgentCheck;
			},

			/**
			 * OS 타입을 반환
			 * @returns {String} OS 타입 ('ios', 'android', '')
			 */
			getOsType: function () {
				if (!this.info) {
					this.info = this.getInfo();
				}

				if (this.info.isIos) {
					return 'ios';
				} else if (this.info.isAndroid) {
					return 'android';
				}
				return '';
			},

			/**
			 * HTML 요소에 OS 클래스를 추가
			 */
			addOsClass: function () {
				const osType = this.getOsType();
				if (osType) {
					$('html').addClass('is-' + osType + '-os');
				}
			},

			/**
			 * UserAgent 초기화
			 */
			init: function () {
				this.info = this.getInfo();
				this.addOsClass();
			}
		},

		/**
		 * 탭 관련 기능
		 */
		tab: {
			/**
			 * 탭 접근성 설정
			 */
			setupAccessibility: function () {
				$('.tabname_btn_box > ul > li').each(function () {
					const $tabItem = $(this);
					const $tabnameEventWrap = $tabItem.closest('.tabname_event_wrap');
					const $tabContsBox = $tabnameEventWrap.find('> .tab_conts_box');
					const dataName = $tabItem.data('name');
					const $targetPanel = $tabContsBox.find(`> ul > li[data-name="${dataName}"]`);
					const tabId = $tabItem.attr('id')?.trim() || `tab-${dataName}`;
					const targetPanelId = $targetPanel.attr('id')?.trim() || `tabpanel-${dataName}`;

					if ($tabnameEventWrap.length !== 0) {
						if (dataName != 'disabled') {
							$tabItem.parent('ul').attr('role', 'tablist');
							$tabItem.attr({
								'id': tabId,
								'role': 'tab'
							});
							$targetPanel.attr({
								'id': targetPanelId,
								'aria-labelledby': tabId,
								'role': 'tabpanel'
							});

							if ($tabItem.hasClass('on')) {
								$tabItem.children('a').attr('aria-selected', 'true');
								$targetPanel.show().attr('aria-hidden', 'false');
							} else {
								$tabItem.children('a').attr('aria-selected', 'false');
								$targetPanel.hide().attr('aria-hidden', 'true');
							}
						}
					}
				});
			},

			/**
			 * 탭 클릭 이벤트 핸들러
			 * @param {Event} e - 클릭 이벤트 객체
			 */
			handleClick: function (e) {
				const $link = $(e.currentTarget);
				const $tabnameEventWrap = $link.closest('.tabname_event_wrap');

				if ($tabnameEventWrap.length !== 0) {
					const dataName = $link.parent('li').attr('data-name');
					const $tabContsBox = $tabnameEventWrap.find('> .tab_conts_box');
					const $targetPanel = $tabContsBox.find(`> ul > li[data-name="${dataName}"]`);

					if (dataName === 'disabled') {
						return;
					}

					if (dataName != 'disabled') {
						e.preventDefault();

						$link.attr('aria-selected', 'true').parent('li').addClass('on')
							.siblings().removeClass('on').find('a').attr('aria-selected', 'false');
						$tabContsBox.find('> ul > li').hide().attr('aria-hidden', 'true');
						$targetPanel.fadeIn(200).attr('aria-hidden', 'false');
					}
				}
			},

			/**
			 * 탭 이벤트 바인딩
			 */
			bindEvents: function () {
				const self = this;
				$(document).on('click', '.tabname_btn_box > ul li a', function (e) {
					self.handleClick(e);
				});
			},

			/**
			 * 탭 초기화
			 */
			init: function () {
				this.setupAccessibility();
				this.bindEvents();
			}
		},

		/**
		 * 전체 초기화 메서드
		 */
		init: function () {
			this.userAgent.init();
			this.tab.init();
		}
	};

	$(document).ready(function () {
		UI.init();
	});

	window.UI = UI;
})(jQuery);