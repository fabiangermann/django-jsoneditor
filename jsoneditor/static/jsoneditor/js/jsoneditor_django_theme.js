JSONEditor.defaults.themes.django = JSONEditor.defaults.themes.html.extend({
  getContainer: function() {
    var el = document.createElement("div");
    el.setAttribute("class", "jsoneditor-container");
    return el;
  },
  getIndentedPanel: function() {
    var el = this._super();
    el.removeAttribute("style");
    el.setAttribute("class", "indented-panel");
    return el;
  },
  getGridContainer: function() {
    var el = this._super();
    el.setAttribute("class", "grid-container");
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.setAttribute("class", el.getAttribute("class") + " button");
    return el;
  },
  getChildEditorHolder: function() {
    var el = this._super();
    el.setAttribute("class", "child-editor-holder");
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this._super();
    el.removeAttribute("style");
    el.setAttribute("class", "header-button-holder");
    return el;
  },
  getTabHolder: function() {
    var el = this._super();
    el.setAttribute("class", "tab-holder");
    el.innerHTML = [
      "<div class='tabs'></div>",
      "<div class='content'></div>",
      "<div style='clear:both;'></div>"
    ].join("");
    return el;
  },
  getTab: function(span) {
    var el = this._super(span);
    el.appendChild(span);
    el.setAttribute("class", "tab");
    el.removeAttribute("style");
    return el;
  },
  markTabActive: function(tab) {
    tab.setAttribute("class", "tab active");
    tab.removeAttribute("style");
  },
  getTextareaInput: function() {
    var el = this._super();
    el.removeAttribute("style");
    return el;
  }
});
