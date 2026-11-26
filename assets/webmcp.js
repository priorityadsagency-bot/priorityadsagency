/* WebMCP: tools that in-browser AI agents can call on priorityadsagency.com.
 * Uses navigator.modelContext when the browser supports it; does nothing otherwise.
 * No tool sends data anywhere: enquiries are returned as a WhatsApp link for the visitor to open.
 */
(function () {
  "use strict";
  var mc = navigator.modelContext;
  if (!mc || typeof mc.registerTool !== "function") return;

  var ROOT = location.pathname.indexOf("/portfolio/") > -1 ? "../" : "";
  var WA = "917760665912";
  var SERVICES = [
    ["meta-ads", "Meta Ads", "Facebook and Instagram ad campaigns"],
    ["google-ads", "Google Ads", "Search, Performance Max, YouTube and local campaigns"],
    ["lead-generation-services", "Lead Generation Services", "Ads, landing pages and follow-up systems for qualified leads"],
    ["whatsapp-marketing", "WhatsApp Marketing", "Broadcasts, WhatsApp Business API, chatbots and click-to-WhatsApp ads"],
    ["digital-marketing-branding", "Digital Marketing & Branding", "Brand strategy, creatives, ads and content"],
    ["social-media-handling", "Social Media Handling", "Posts, reels, scheduling and engagement"],
    ["content-creator-outreach", "Content Creator Outreach", "Influencer and creator collaborations"],
    ["telecalling-support", "Telecalling Support", "Lead calling, qualification and appointment booking"],
    ["website-development", "Website Development", "Fast, mobile-friendly business websites"],
    ["landing-pages", "Landing Pages", "High-converting landing pages for ads"],
    ["e-commerce-websites", "E-commerce Websites", "Online stores with UPI and card payments"],
    ["app-development", "App Development", "Android and iOS apps with admin panels"],
    ["api-development", "API Development", "Secure APIs and integrations"],
    ["video-editing-ai-creative", "Video Editing (AI & Creative)", "Reels, ad videos and promos"],
    ["poster-graphic-design", "Poster & Graphic Design", "Posters, ad creatives and banners"],
    ["logo-design", "Logo Design", "Logos and brand identity"]
  ];
  function text(t) { return { content: [{ type: "text", text: t }] }; }
  function abs(p) { return new URL(ROOT + p, location.href).href; }

  var tools = [
    {
      name: "get_business_info",
      description: "Get Priority Ads Agency's business details: what it does, location, phone/WhatsApp, email, office address and social profiles.",
      inputSchema: { type: "object", properties: {} },
      execute: function () {
        return text([
          "Priority Ads Agency: digital marketing agency in Bengaluru (Bangalore), India.",
          "Services: Meta Ads, Google Ads, lead generation, WhatsApp marketing, social media, websites, landing pages, e-commerce, apps, APIs, video editing, posters and logo design. Also digital marketing courses.",
          "Phone / WhatsApp: +91 77606 65912",
          "Email: ningappa@priorityadsagency.com",
          "Office: No. 116, Gurunath Layout, opp. bus stop, Huralichikkanahalli, Hesaraghatta Main Road, Bengaluru 560090",
          "Map: https://www.google.com/maps?cid=9290848558998229444",
          "Instagram: https://www.instagram.com/priorityadsagency | Facebook: https://www.facebook.com/profile.php?id=61586386984021 | X: https://x.com/PriorityAds",
          "Website: " + abs("index.html") + " | About: " + abs("about.html") + " | Contact: " + abs("contact.html")
        ].join("\n"));
      }
    },
    {
      name: "list_services",
      description: "List the 16 services Priority Ads Agency offers, each with a one-line summary, its page URL and a Markdown version for agents.",
      inputSchema: { type: "object", properties: {} },
      execute: function () {
        return text(SERVICES.map(function (s) {
          return "- " + s[1] + " (id: " + s[0] + "): " + s[2] + ". Page: " + abs("portfolio/" + s[0] + ".html") + " | Markdown: " + abs("md/portfolio/" + s[0] + ".md");
        }).join("\n"));
      }
    },
    {
      name: "get_service_details",
      description: "Get the full details of one service (what is included, process, FAQs) as Markdown. Use an id from list_services, e.g. 'meta-ads'.",
      inputSchema: {
        type: "object",
        properties: { service_id: { type: "string", description: "Service id from list_services", enum: SERVICES.map(function (s) { return s[0]; }) } },
        required: ["service_id"]
      },
      execute: function (args) {
        var id = args && args.service_id;
        if (!SERVICES.some(function (s) { return s[0] === id; })) return text("Unknown service_id. Call list_services for valid ids.");
        return fetch(abs("md/portfolio/" + id + ".md"), { headers: { Accept: "text/markdown" } })
          .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
          .then(text, function () { return text("Could not load details. See " + abs("portfolio/" + id + ".html")); });
      }
    },
    {
      name: "prepare_whatsapp_enquiry",
      description: "Prepare an enquiry to Priority Ads Agency. Returns a WhatsApp link with the message filled in; the visitor must open it and press send. Nothing is sent automatically.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Visitor's name" },
          phone: { type: "string", description: "10-digit Indian mobile number (optional)" },
          business: { type: "string", description: "Business name and type" },
          service: { type: "string", description: "Service of interest, e.g. 'Meta Ads'" },
          message: { type: "string", description: "Goals or questions (max 500 characters)" }
        },
        required: ["name", "business"]
      },
      execute: function (a) {
        a = a || {};
        var clean = function (v, n) { return String(v || "").replace(/[<>{}]/g, "").trim().slice(0, n); };
        var name = clean(a.name, 50), biz = clean(a.business, 80), svc = clean(a.service, 60) || "Not sure yet, please advise", msg = clean(a.message, 500);
        var phone = String(a.phone || "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "").slice(0, 10);
        var t = "Hi Priority Ads Agency, I'm " + name + " from " + biz + ".\nInterested in: " + svc + (msg ? "\n" + msg : "") + (/^[6-9]\d{9}$/.test(phone) ? "\nMy number: " + phone : "");
        return text("Open this link to send the enquiry on WhatsApp: https://wa.me/" + WA + "?text=" + encodeURIComponent(t));
      }
    }
  ];

  tools.forEach(function (t) { try { mc.registerTool(t); } catch (e) { /* already registered or unsupported */ } });
})();
