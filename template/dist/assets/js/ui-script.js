(function ($) {
	var userAgent = navigator.userAgent;
	var userAgentCheck = {
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
				var match = userAgent.match(/Android ([0-9]+\.[0-9]+(\.[0-9]+)*)/);
				return match[1];
			} catch (e) {
				console.log(e);
			}
		}
	})();

	var osType = '';
	if (userAgentCheck.isIos) {
		osType = 'ios';
	} else if (userAgentCheck.isAndroid) {
		osType = 'android';
	}

	switch (osType) {
		case 'ios':
			$('html').addClass('is-ios-os');
			break;
		case 'android':
			$('html').addClass('is-android-os');
			break;
	}
})(jQuery);