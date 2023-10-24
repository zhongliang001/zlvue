import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import { src, dest } from 'gulp'
import path from 'path'
import { outDir, packagesDir, projectRoot } from '.'
export function compileCss() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(packagesDir, 'theme-chalk/src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(dest(path.resolve(outDir, './theme-chalk')))
}

export function copyFont() {
  return src(path.resolve(packagesDir, 'theme-chalk/src/fonts/**/*')).pipe(
    dest(path.resolve(outDir, './theme-chalk/fonts'))
  )
}

export function copyPackage() {
  return src(path.resolve(projectRoot, 'internal/build/src/package.json')).pipe(
    dest(path.resolve(outDir, './'))
  )
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
