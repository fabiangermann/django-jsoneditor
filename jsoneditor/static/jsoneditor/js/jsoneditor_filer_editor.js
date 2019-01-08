/* Patch functions with ones emitting a 'change' event after closing the popup */
(function() {
  var __original_dismissRelatedLookupPopup = window.dismissRelatedLookupPopup;
  window.dismissRelatedLookupPopup = function(win, chosenId) {
    var input = document.getElementById(window.windowname_to_id(win.name));
    __original_dismissRelatedLookupPopup(win, chosenId);
    django.jQuery(input).trigger("change");
  };
})();
/* End patching */

JSONEditor.defaults.editors.django_filer = JSONEditor.defaults.editors.string.extend(
  {
    setValue: function(value, _initial) {
      this.value = value;

      var container = django
        .jQuery(this.input)
        .closest(".related-widget-wrapper");
      var descriptionText = container.find("[id$=description_txt]");

      if (value) {
        this.input.value = value.id;
        descriptionText.text(value.desc);
      }

      this.onChange(true);
    },
    build: function() {
      var id = Math.random()
        .toString(36)
        .substr(2, 5);
      this.input = document.createElement("input");
      this.input.setAttribute("type", "text");
      this.input.className = "vForeignKeyRawIdAdminField";
      this.input.setAttribute("id", "id_" + id);
      this.input.setAttribute("name", id);

      var editor = this;
      this.input.onchange = function() {
        var container = django.jQuery(this).siblings(".filerFile");
        var descriptionText = container.find("[id$=description_txt]");
        editor.setValue({
          id: this.value,
          desc: descriptionText.text()
        });
        django.jQuery(editor).trigger("change");
      };

      var desc = document.createElement("span");
      desc.setAttribute("id", "id_" + id + "_description_txt");

      var relatedLookupLink = document.createElement("a");
      relatedLookupLink.className = "related-lookup";
      relatedLookupLink.setAttribute("id", "lookup_id_" + id);
      relatedLookupLink.setAttribute(
        "href",
        "/admin/files/file/?_popup=1&_to_field=id&folder__id__exact=last"
      );
      relatedLookupLink.setAttribute("title", "Nachschlagen");
      relatedLookupLink.setAttribute(
        "onclick",
        "return showRelatedObjectLookupPopup(this);"
      );

      var wrapper = document.createElement("div");
      wrapper.className = "related-widget-wrapper";

      wrapper.appendChild(this.input);
      wrapper.appendChild(relatedLookupLink);
      wrapper.appendChild(desc);

      this.container.appendChild(wrapper);
    }
  }
);

JSONEditor.defaults.resolvers.unshift(function(schema) {
  if (schema.type === "string" && schema.format === "django_filer") {
    return "django_filer";
  }
});
