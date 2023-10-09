import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import { series, src, dest } from 'gulp'
import path from 'path'
function compile() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, './src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(dest('./dist/css'))
}

function copyFont() {
  return src(path.resolve(__dirname, './src/fonts')).pipe(cleanCss()).pipe(dest('./dist'))
}

function copyfullStyle() {
  return src(path.resolve(__dirname, './dist/**')).pipe(
    dest(path.resolve(__dirname, '../../dist/theme-chalk'))
  )
}

export default series(
  compile,
  // copyFont,
  copyfullStyle
)
