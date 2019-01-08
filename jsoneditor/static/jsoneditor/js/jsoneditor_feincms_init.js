django.jQuery(document).ready(function ($) {
  var instances = [],
    doUpdate = function() { updateValues(instances); };


  if (window.contentblock_init_handlers) {
    // FeinCMS 1.x
    contentblock_init_handlers.push(function() {
      django.jQuery(".order-machine .jsoneditor").each(function() {
        var editor = init_editor(this);

        if (editor) {
          instances.push(editor);
          editor.on("change", doUpdate);
        }
      });
    });

  } else {
    // django-content-editor (obviously!)

    $(document).on("content-editor:activate", function(event, formset) {
      console.log("Activating", formset);
      var jsoneditor = formset.find(".jsoneditor");
      if (jsoneditor.length) {
        var editor = init_editor(jsoneditor[0]);
        if (editor) {
          instances.push(editor);
          editor.on("change", doUpdate);
        }
      }
    });

  }
});
