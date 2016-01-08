from django.conf import settings

JSONEDITOR_JS = getattr(
    settings, 'JSONEDITOR_JS', 'jsoneditor/js/jsoneditor.min.js')
