import autoprefixer from 'autoprefixer';
import purgecssModule from '@fullhuman/postcss-purgecss';

const purgecss = purgecssModule.default || purgecssModule;

export default {
	plugins: [
		autoprefixer({
			grid: true, // 'autoplace' 대신 true로 변경
			flexbox: 'no-2009',
			supports: true,
			overrideBrowserslist: [
				'ie 11',
				'ie_mob 11',
				'last 4 versions',
				'> 1%',
				'Firefox ESR',
				'ios >= 9',
				'android >= 4.4'
			]
		}),
		purgecss({
			content: ['./web/**/*.html'],
			safelist: [
				// 실제로 필요한 클래스 패턴만 남깁니다.
				// 예: /^w\d+$/, /^mt\d+$/ 등
			]
		})
	]
} 