var withInstall = function (comp) {
  comp.install = function (app) {
    app.component(comp.name, comp)
  }
  return comp
}
export default withInstall
