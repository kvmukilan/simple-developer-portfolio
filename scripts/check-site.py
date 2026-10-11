from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

root = Path(__file__).resolve().parents[1]
class Check(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            assert attrs['id'] not in self.ids, 'Duplicate id: ' + attrs['id']
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            if attrs.get(key): self.links.append(attrs[key])

check = Check()
check.feed((root / 'index.html').read_text(encoding='utf-8'))
for link in check.links:
    url = urlsplit(link)
    if url.scheme or url.netloc: continue
    if url.path:
        assert (root / unquote(url.path)).is_file(), 'Missing asset: ' + link
    elif url.fragment:
        assert unquote(url.fragment) in check.ids, 'Broken anchor: ' + link
print('Local assets, anchors, and unique IDs verified')
