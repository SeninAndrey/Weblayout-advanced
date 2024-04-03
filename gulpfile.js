const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

// условие dev/build сборки
let prod = true;
const isProd = (done) => {
	prod = false;
	done();
}
// удаление папки dist
const clean = () => {
  	return del(['dist'])
}
// переносим не используемые файлы
const resources = () => {
	return src('src/resources/**')
		.pipe(dest('dist'))
}

const favicon = () => {
	return src('src/*.ico')
		.pipe(dest('dist'))
  }
// объединяем и оптимизируем стили
const styles = () => {
	return src('src/styles/**/*.css')
		.pipe(gulpIf(!prod, sourcemaps.init()))
		.pipe(concat('main.css'))
		.pipe(autoPrefixer({
			cascade: false,
		}))
		.pipe(gulpIf(prod, cleanCSS({
			level: 2,
		})))
		.pipe(gulpIf(!prod, sourcemaps.write()))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}
// конвертируем SCSS в CSS, минифицируем
const sassToCSS = () => {
	return src('src/styles/style.scss')
	.pipe(gulpIf(!prod, sourcemaps.init()))
	  .pipe(sass({
		errorLogToConsole: true,
		outputStyle: 'compressed'
	  }))
	  .on('error', console.error.bind(console))
	  .pipe(rename({suffix: '.min'}))
	  .pipe(gulpIf(!prod, sourcemaps.write()))
	  .pipe(dest('dist'))
	  .pipe(browserSync.stream());
  }
// оптимизируем HTML
const htmlMinify = () => {
	return src('src/**/*.html')
		.pipe(gulpIf(prod, htmlMin({
			collapseWhitespace: true,
		})))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}
// объединяем svg в sprite
const svgSprites = () => {
	return src('src/images/svg/**/*.svg')
		.pipe(svgSprite({
			mode: {
			stack: {
				sprite: '../sprite.svg'
			}
			}
		}))
		.pipe(dest('dist/images'))
}
// оптимизируем и зашифровываем js
const scripts = () => {
	return src([
			'src/js/components/**/*.js',
			'src/js/main.js'
		])
		.pipe(gulpIf(!prod, sourcemaps.init()))
		.pipe(babel({
			presets: ['@babel/env'],
		}))
		.pipe(concat('app.js'))
		.pipe(gulpIf(prod, uglify({
			toplevel: true
		}).on('error', notify.onError())) )
		.pipe(gulpIf(!prod, sourcemaps.write()))
		.pipe(dest('dist'))
		.pipe(browserSync.stream())
}
// меням конечные файлы при изменениях в исходниках "на горячую"
const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
}
// оптимизируем изображения
const images = () => {
	return src([
			'src/images/**/*.png',
			'src/images/*.svg',
			'src/images/**/*.jpg',
			'src/images/**/*.jpeg',
			'src/images/**/*.webp',
		])
		.pipe(image())
		.pipe(dest('dist/images'))
}
// переносим шрифты
const fonts = () => {
	return src('src/fonts/**/*')
	  	.pipe(dest('dist/fonts'))
}

// отслеживаем изменения в файлах
watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.scss', sassToCSS);
watch('src/images/svg/**/*.svg');
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);

// exports.styles = styles;
// exports.htmlMinify = htmlMinify;

exports.build = series(clean, resources, htmlMinify, scripts, sassToCSS, images, fonts, favicon, svgSprites);
exports.dev = series(isProd, clean, resources, htmlMinify, scripts, sassToCSS,  images, fonts, favicon, svgSprites, watchFiles);

// export default series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles);
