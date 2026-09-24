/*
  Sends a first-time visitor from the English home page to /fr/ or /nl/ when that
  matches their browser language settings. Runs on the home page only.

  Deliberately conservative:
  - if the browser exposes no language preference, nothing happens;
  - if English is preferred over French or Dutch, nothing happens;
  - an explicit choice wins: arriving from our own pages (the EN link in the
    language switcher points at ../?lang=en) never redirects, so nobody gets
    bounced back to a language they just left;
  - location.replace keeps the back button pointing at wherever they came from.

  Without JavaScript the home page simply stays English; the switcher still works.
*/
(function (nav, doc, loc) {
  if (loc.search.indexOf('lang=en') !== -1) return;
  if (doc.referrer && doc.referrer.indexOf(loc.origin) === 0) return;

  var prefs = nav.languages || (nav.language ? [nav.language] : []);
  for (var i = 0; i < prefs.length; i++) {
    var code = String(prefs[i]).toLowerCase().split('-')[0];
    if (code === 'en') return;
    if (code === 'fr' || code === 'nl') {
      loc.replace(code + '/' + loc.search + loc.hash);
      return;
    }
  }
})(navigator, document, location);
