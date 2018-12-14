# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django import forms
from django.utils.html import format_html

from .app_settings import JSONEDITOR_JS


class JSONEditorWidget(forms.widgets.Textarea):
    default_config = {
        'disable_collapse': True,
        'disable_edit_json': True,
        'disable_properties': True,
        'theme': 'django',
        'schema': {}
    }

    def __init__(self, config, *args, **kwargs):
        self.config = self.default_config.copy()
        self.config.update(config)
        super(JSONEditorWidget, self).__init__(*args, **kwargs)

    class Media:
        css = {'screen': ('jsoneditor/css/jsoneditor_widget.css',)}
        js = (
            JSONEDITOR_JS,
            'jsoneditor/js/jsoneditor_filer_editor.js',
            'jsoneditor/js/jsoneditor_django_theme.js',
            'jsoneditor/js/jsoneditor_widget.js'
        )

    def render(self, name, value, attrs=None, **kwargs):
        input_field = super(JSONEditorWidget, self).render(
            name, value, attrs, **kwargs
        )

        return format_html(
            """
            <div class="jsoneditor-wrapper">
                <div class="jsoneditor" data-config="{config}"></div>

                <div class="datafield">
                    <a class="toggle-datafield" href="#">
                        Show/Hide Datafield
                    </a><br>
                    {field}
                </div>
            </div>
            """,
            field=input_field,
            config=json.dumps(self.config),
        )


class FeinCMSJSONEditorWidget(JSONEditorWidget):
    class Media:
        css = {'screen': ('jsoneditor/css/jsoneditor_widget.css',)}
        js = (
            JSONEDITOR_JS,
            'jsoneditor/js/jsoneditor_filer_editor.js',
            'jsoneditor/js/jsoneditor_django_theme.js',
            'jsoneditor/js/jsoneditor_widget.js',
            'jsoneditor/js/jsoneditor_feincms_init.js'
        )
