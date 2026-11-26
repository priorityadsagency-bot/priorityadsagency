/* Priority Ads Agency: cookie consent + Meta Pixel + Google Analytics 4
 *
 * To switch tracking on, put your IDs below and upload this file:
 *   META_PIXEL_ID: Meta Events Manager → Data sources → your Pixel → "Pixel ID" (numbers only)
 *   GA4_ID:        Google Analytics → Admin → Data streams → Web → "Measurement ID" (G-XXXXXXXXXX)
 * While both are empty, nothing is loaded, no banner is shown and no cookie is set.
 *
 * Nothing is loaded and no tracking cookie is set until the visitor presses "Accept".
 * The visitor's choice is kept for 180 days in the first-party cookie "pa_consent".
 */
(function () {
  "use strict";
  var META_PIXEL_ID = "";   // e.g. "123456789012345"
  var GA4_ID = "";          // e.g. "G-ABC123XYZ9"

  var hasPixel = /^\d{8,20}$/.test(META_PIXEL_ID);
  var hasGA = /^G-[A-Z0-9]{4,15}$/.test(GA4_ID);
  if (!hasPixel && !hasGA) return; // tracking not configured: stay cookie-free

  var COOKIE = "pa_consent", DAYS = 180;
  function readChoice() {
    var m = document.cookie.match(/(?:^|;\s*)pa_consent=(granted|denied)(?:;|$)/);
    return m ? m[1] : null;
  }
  function saveChoice(v) {
    var exp = new Date(Date.now() + DAYS * 864e5).toUTCString();
    document.cookie = COOKIE + "=" + v + "; expires=" + exp + "; path=/; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
  }
  function removeCookies(prefixes) { // used when consent is withdrawn
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (prefixes.some(function (p) { return name.indexOf(p) === 0; })) {
        var host = location.hostname, parts = host.split(".");
        var domains = ["", host, "." + parts.slice(-2).join(".")];
        domains.forEach(function (d) { document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : ""); });
      }
    });
  }
  function loadScript(src) {
    var s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s);
  }

  /* Google Analytics 4 with Consent Mode v2 (defaults to denied) */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied", wait_for_update: 500 });

  var started = false;
  function startTracking() {
    if (started) return; started = true;
    if (hasGA) {
      gtag("consent", "update", { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" });
      gtag("js", new Date());
      gtag("config", GA4_ID, { anonymize_ip: true });
      loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID));
    }
    if (hasPixel) {
      if (!window.fbq) {
        var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!window._fbq) window._fbq = n;
        n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        loadScript("https://connect.facebook.net/en_US/fbevents.js");
      }
      window.fbq("init", META_PIXEL_ID);
      window.fbq("track", "PageView");
    }
  }

  /* Lead events: WhatsApp, call and email clicks */
  document.addEventListener("click", function (e) {
    if (!started) return;
    var a = e.target.closest && e.target.closest("a[href]"); if (!a) return;
    var href = a.getAttribute("href") || "", method = null;
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) method = "whatsapp";
    else if (href.indexOf("tel:") === 0) method = "phone";
    else if (href.indexOf("mailto:") === 0) method = "email";
    if (!method) return;
    if (hasPixel && window.fbq) window.fbq("track", "Contact", { method: method });
    if (hasGA) gtag("event", "generate_lead", { method: method, page_path: location.pathname });
  }, true);

  /* Banner (styles: .ck in style.css) */
  function banner() {
    if (document.getElementById("ckBanner")) return;
    var root = location.pathname.indexOf("/portfolio/") > -1 ? "../" : "";
    var b = document.createElement("div");
    b.id = "ckBanner"; b.className = "ck"; b.setAttribute("role", "dialog"); b.setAttribute("aria-live", "polite"); b.setAttribute("aria-label", "Cookie choices");
    b.innerHTML =
      '<p class="ck-t">We use cookies</p>' +
      '<p class="ck-d">With your permission we use Google Analytics and the Meta Pixel to understand visits and show you relevant ads. ' +
      'You can change this any time from "Cookie settings" at the bottom of the page. <a href="' + root + 'privacy.html">Privacy &amp; cookies</a></p>' +
      '<div class="ck-b"><button type="button" class="btn ghost ck-no">Only necessary</button><button type="button" class="btn blue ck-yes">Accept</button></div>';
    document.body.appendChild(b); document.documentElement.classList.add("ck-open");
    b.querySelector(".ck-yes").addEventListener("click", function () { saveChoice("granted"); close(); startTracking(); });
    b.querySelector(".ck-no").addEventListener("click", function () { var was = readChoice(); saveChoice("denied"); close(); if (was === "granted") { removeCookies(["_ga", "_gid", "_fbp", "_fbc"]); location.reload(); } });
    function close() { b.remove(); document.documentElement.classList.remove("ck-open"); }
  }

  function init() {
    document.querySelectorAll(".ck-settings").forEach(function (el) {
      el.hidden = false; el.addEventListener("click", banner);
    });
    var c = readChoice();
    if (c === "granted") startTracking(); else if (!c) banner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
