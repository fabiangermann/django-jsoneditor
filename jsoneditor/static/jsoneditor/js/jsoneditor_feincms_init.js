django.jQuery(document).ready(function () {
    instances = [];
    contentblock_init_handlers.push(function() {
        django.jQuery('.order-machine .jsoneditor').each(function() {
            var editor = init_editor(this);

            if (editor) {
                instances.push(editor);
                editor.on('change', function() {
                    updateValues(instances);
                });
            }
        });
    });
});
