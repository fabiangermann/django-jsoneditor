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

      var container = django.jQuery(this.input).siblings(".filerFile");
      var thumb = container.find("[id$=thumbnail_img]");
      var descriptionText = container.find("[id$=description_txt]");

      if (value) {
        this.input.value = value.id;
        thumb.attr("src", value.thumb_url);
        descriptionText.text(value.desc);
      }

      this.onChange(true);
    },
    build: function() {
      var id = Math.random()
        .toString(36)
        .substr(2, 5);
      this.input = document.createElement("input");
      this.input.setAttribute("type", "hidden");
      this.input.className = "setAttribute";
      this.input.setAttribute("id", "id_" + id);
      this.input.setAttribute("name", id);

      var editor = this;
      this.input.onchange = function() {
        var container = django.jQuery(this).siblings(".filerFile");
        var thumb = container.find("[id$=thumbnail_img]");
        var descriptionText = container.find("[id$=description_txt]");
        editor.setValue({
          id: this.value,
          desc: descriptionText.text(),
          thumb_url: thumb.attr("src")
        });
        django.jQuery(editor).trigger("change");
      };

      var thumb = document.createElement("img");
      thumb.className = "quiet";
      thumb.setAttribute("id", "id_" + id + "_thumbnail_img");
      thumb.setAttribute("src", "/static/filer/icons/nofile_48x48.png");
      thumb.setAttribute("alt", "keine Datei ausgewählt");

      var desc = document.createElement("span");
      desc.setAttribute("id", "id_" + id + "_description_txt");

      var relatedLookupLink = document.createElement("a");
      relatedLookupLink.className = "related-lookup";
      relatedLookupLink.setAttribute("id", "lookup_id_" + id);
      relatedLookupLink.setAttribute(
        "href",
        "/admin/files/file/?_popup=1&_to_field=id"
      );
      relatedLookupLink.setAttribute("title", "Nachschlagen");
      relatedLookupLink.setAttribute(
        "onclick",
        "return showRelatedObjectLookupPopup(this);"
      );

      // Clearer does not work at all atm (but has to be here
      // otherwise the filer code crashes wenn selecting an item).
      var clearer = document.createElement("img");
      clearer.className = "filerClearer";
      clearer.setAttribute("id", "id_" + id + "_clear");
      clearer.setAttribute("src", "/static/admin/img/icon_deletelink.gif");
      clearer.setAttribute("width", "10");
      clearer.setAttribute("height", "10");
      clearer.setAttribute("alt", "Zurücksetzen");
      clearer.setAttribute("title", "Zurücksetzen");
      clearer.setAttribute("style", "display: none");

      var widget = document.createElement("span");
      widget.className = "filerFile";
      widget.appendChild(thumb);
      widget.innerHTML += "&nbsp;";
      widget.appendChild(desc);
      widget.appendChild(relatedLookupLink);
      widget.appendChild(clearer);

      var wrapper = document.createElement("div");
      wrapper.className = "related-widget-wrapper";
      wrapper.appendChild(widget);
      wrapper.appendChild(this.input);

      this.container.appendChild(wrapper);
    }
  }
);

JSONEditor.defaults.resolvers.unshift(function(schema) {
  if (schema.type === "string" && schema.format === "django_filer") {
    return "django_filer";
  }
});
