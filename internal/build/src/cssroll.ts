import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import { src, dest } from 'gulp'
import path from 'path'
import { outDir, packagesDir } from '.'
export function compileCss() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(packagesDir, 'theme-chalk/src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(dest(path.resolve(outDir, './theme-chalk')))
}

function copyFont() {
  return src(path.resolve(__dirname, './src/fonts'))
    .pipe(cleanCss())
    .pipe(dest(path.resolve(outDir, './theme-chalk/font')))
}

// function copyfullStyle() {
//   return src(path.resolve(__dirname, './dist/**')).pipe(
//     dest(path.resolve(__dirname, '../../dist/theme-chalk'))
//   )
// }

// export default series(
//   compile,
//   // copyFont,
//   // copyfullStyle
// )
