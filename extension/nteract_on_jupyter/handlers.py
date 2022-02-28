import json
import os
from tornado import web

HTTPError = web.HTTPError

import notebook

from notebook.base.handlers import IPythonHandler, FileFindHandler, FilesRedirectHandler, path_regex

from notebook.utils import url_escape

from jinja2 import FileSystemLoader
from notebook.utils import url_path_join as ujoin
from traitlets import HasTraits, Unicode, Bool

from . import PACKAGE_DIR

FILE_LOADER = FileSystemLoader(PACKAGE_DIR)


class NAppHandler(IPythonHandler):
    """Render the nteract view"""

    def initialize(self, config, page):
        self.nteract_config = config
        self.page = page

    @web.authenticated
    def get(self, path="/"):
        config = self.nteract_config
        settings_dir = config.settings_dir
        assets_dir = config.assets_dir

        base_url = self.settings['base_url']
        url = ujoin(base_url, config.page_url, '/static/')

        # Handle page config data.
        page_config = dict()
        page_config.update(self.settings.get('page_config_data', {}))
        page_config.setdefault('appName', config.name)
        page_config.setdefault('appVersion', config.version)

        mathjax_config = self.settings.get('mathjax_config', 'TeX-AMS_HTML-full,Safe')

        asset_url = config.asset_url

        if asset_url == "":
            asset_url = base_url

        # Ensure there's a trailing slash
        if not asset_url.endswith('/'):
            asset_url = asset_url + '/'

        filename = path.split("/")[-1]
        if filename:
            page_title = '{filename} - nteract'.format(filename=filename)
        else:
            page_title = 'nteract'

        bookstore_settings =  self.settings.get("bookstore", {})
        bookstore_settings['enabled'] = all(value for value in bookstore_settings.get("validation", {}).values())

        config = dict(
            ga_code=config.ga_code,
            asset_url=asset_url,
            page_title=page_title,
            mathjax_url=self.mathjax_url,
            mathjax_config=mathjax_config,
            page_config=page_config,
            public_url=url,
            contents_path=path,
            page=self.page,
            bookstore=bookstore_settings
        )

        self.write(self.render_template('index.html', **config))

    def get_template(self, name):
        return FILE_LOADER.load(self.settings['jinja2_env'], name)


def add_handlers(web_app, config):
    """Add the appropriate handlers to the web app.
    """
    base_url = web_app.settings['base_url']
    url = ujoin(base_url, config.page_url)
    assets_dir = config.assets_dir

    package_file = os.path.join(assets_dir, 'package.json')
    with open(package_file) as fid:
        data = json.load(fid)

    config.version = config.version or data['version']
    config.name = config.name or data['name']

    handlers = [
        # TODO Redirect to /tree
        (url + r'/?', NAppHandler, {'config': config, 'page': 'tree'}),
        (url + r"/tree%s" % path_regex, NAppHandler, {'config': config, 'page': 'tree'}),
        (url + r"/edit%s" % path_regex, NAppHandler, {'config': config, 'page': 'edit'}),
        (url + r"/view%s" % path_regex, NAppHandler, {'config': config, 'page': 'view'}),
        (url + r"/static/(.*)", FileFindHandler, {'path': assets_dir}),
    ]

    web_app.add_handlers(".*$", handlers)