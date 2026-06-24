import React, { useEffect } from "react";
import { movies } from "../../data/movies";
import { news } from "../../data/news";

interface SEOProps {
  route: string;
}

export default function SEO({ route }: SEOProps) {
  useEffect(() => {
    // 1. Establish Default Meta Values
    let pageTitle = "Harish Cinemas | Stories That Inspire. Cinema That Matters.";
    let pageDescription = "Harish Cinemas is a premium Chennai-based independent film production house behind the celebrated Tamil suspense thriller 'Naruvee' and upcoming drama 'Nalla Padam'. Explore exclusive trailers, behind-the-scenes content, and news.";
    let pageKeywords = "Harish Cinemas, Tamil movie production, Chennai film studio, Harish Pandian, independent Tamil cinema";
    let dynamicSchema: any = null;

    // Helper to generate full URLs for canonical paths
    const getCanonicalUrl = (hashPath: string) => {
      const base = "https://x.com/harish_cinemas"; // Primary channel
      return `${base}/${hashPath}`;
    };

    let canonicalHref = getCanonicalUrl(route);

    // 2. Parse Router Hash Paths dynamically incorporating page name and studio brand
    const brand = "Harish Cinemas";
    let pageName = "";

    if (!route || route === "#/" || route === "#") {
      pageName = "Stories That Inspire. Cinema That Matters.";
      pageTitle = `${brand} | ${pageName}`;
      pageDescription = "Harish Cinemas is Chennai's premium independent film studio producing high-impact cinematic offerings, behind Naruvee and Nalla Padam.";
    } 
    else if (route === "#/about") {
      pageName = "About Executive Leadership & Artistic Principles";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Learn about Founder DR. A. Harish Pandian, Producer A. Alagu Pandian, and the artistic principles guiding Harish Cinemas in drafting high-impact independent Tamil screenplays.";
      pageKeywords = "About Harish Cinemas, Harish Cinemas founder, Alagu Pandian producer, Tamil cinema leadership, Chennai film team";
    } 
    else if (route === "#/productions") {
      pageName = "Official Independent Film Productions Catalog";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Browse our high-quality independent cinema projects including celebrated thriller Naruvee and upcoming socio-drama Nalla Padam.";
      pageKeywords = "Tamil movie roster, Harish Cinemas films, Naruvee release, Nalla Padam cast, Chennai movies catalog";
    } 
    else if (route.startsWith("#/productions/")) {
      const slug = route.substring("#/productions/".length);
      const movie = movies.find((m) => m.slug === slug);
      if (movie) {
        pageName = `${movie.title} (${movie.releaseYear}) | Showcase`;
        pageTitle = `${movie.title} (${movie.releaseYear}) — ${brand}`;
        pageDescription = `${movie.tagline} ${movie.synopsis.slice(0, 160)}...`;
        pageKeywords = `${movie.title}, ${movie.genre.join(", ")}, Harish Cinemas ${movie.title}, ${movie.cast.join(", ")}, Tamil suspense films`;
        
        // Define full rich results Schema for Movies
        dynamicSchema = {
          "@context": "https://schema.org",
          "@type": "Movie",
          "name": movie.title,
          "image": movie.posterUrl,
          "dateCreated": movie.releaseYear,
          "genre": movie.genre,
          "description": movie.synopsis,
          "actor": movie.cast.map(name => ({ "@type": "Person", "name": name })),
          "director": movie.crew.filter(c => c.role.toLowerCase().includes("director")).map(c => ({ "@type": "Person", "name": c.name })),
          "productionCompany": {
            "@type": "Organization",
            "name": "Harish Cinemas",
            "url": "https://x.com/harish_cinemas"
          }
        };
      }
    } 
    else if (route === "#/upcoming-projects") {
      pageName = "Upcoming Projects & Production Schedules";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Stay ahead with Harish Cinemas' upcoming releases, rustic schedule shoots, casting announcements, and Tamil scripts under development in Chennai.";
      pageKeywords = "upcoming Tamil movies, new movie releases 2026 Chennai, film pre-production, next film Alagu Pandian";
    } 
    else if (route === "#/gallery") {
      pageName = "Key Art & Creative Production Gallery";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Peruse official movie stills, production event highlights, launch functions in Chennai, and raw behind-the-scenes snaps.";
      pageKeywords = "Naruvee photo gallery, behind the scenes movie photos, theater premiere launch media, Chennai cine events";
    } 
    else if (route === "#/videos") {
      pageName = "Cinema Teasers, Videos & Trailers";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Watch official high-fidelity full trailers, suspense teasers, musical theme songs, and exclusive sets construction diaries.";
      pageKeywords = "Naruvee trailer, high quality Tamil movie teaser, Kannupada Podhum song video, Harish Cinemas sound track";
    } 
    else if (route === "#/news") {
      pageName = "Press Room & Media Dispatches";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Get the latest official news, major press releases, and production crew announcements directly from our operations desk.";
      pageKeywords = "Harish Cinemas news, Tamil cinema industry blog, Chennai media press release, Nalla Padam movie announcement";
    } 
    else if (route.startsWith("#/news/")) {
      const slug = route.substring("#/news/".length);
      const article = news.find((item) => item.slug === slug);
      if (article) {
        pageName = `${article.title} | Blog Announcement`;
        pageTitle = `${article.title} — ${brand}`;
        pageDescription = article.summary;
        pageKeywords = `${article.category}, Harish Cinemas blog, ${article.title}, Tamil film updates, Alagu Pandian news`;

        // Define premium BlogPosting/NewsArticle Schema for Rich Snippets
        dynamicSchema = {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": article.title,
          "image": [article.imageUrl],
          "datePublished": new Date(article.date).toISOString().split('T')[0] || "2026-06-12",
          "dateModified": new Date(article.date).toISOString().split('T')[0] || "2026-06-12",
          "description": article.summary,
          "publisher": {
            "@type": "Organization",
            "name": "Harish Cinemas",
            "logo": {
              "@type": "ImageObject",
              "url": "https://upload.wikimedia.org/wikipedia/en/3/38/Naruvee.jpg"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "Harish Cinemas Operations Desk"
          }
        };
      }
    } 
    else if (route === "#/contact") {
      pageName = "Contact Corporate Desk & Project Pitching";
      pageTitle = `${pageName} — ${brand}`;
      pageDescription = "Get in touch for script pitches, film distributions, co-production options, media clearances, and VIP dispatch options in Chennai.";
      pageKeywords = "Contact Harish Cinemas, Adyar Chennai cinema address, submit screenplay Tamil movie, producer email Chennai, cinematic business";
    }
    else if (route === "#/crew-credits") {
      pageName = "Crew & Credits";
      pageTitle = `${brand} | ${pageName}`;
      pageDescription = "Official comprehensive list of department credits, talented cast, production crew memberships, and technical technicians of Harish Cinemas.";
      pageKeywords = "Harish Cinemas crew, Tamil movie credits, Nalla Padam crew members, Naruvee production crew, Chennai film technicians";
    }

    // 3. Update DOM Elements
    document.title = pageTitle;

    // A. Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", pageDescription);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = pageDescription;
      document.head.appendChild(meta);
    }

    // B. Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", pageKeywords);
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = pageKeywords;
      document.head.appendChild(meta);
    }

    // C. Update Canonical Rel Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute("href", canonicalHref);
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonicalHref);
      document.head.appendChild(link);
    }

    // D. Update Open Graph Title and Description for beautiful WhatsApp / X sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", pageTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", pageDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalHref);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", pageTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute("content", pageDescription);

    // E. Dynamic Script Injection for Structured Data (JSON-LD JSON blocks)
    // Remove existing dynamic script blocks
    const existingDynamicScript = document.getElementById("hc-dynamic-seo-schema");
    if (existingDynamicScript) {
      existingDynamicScript.remove();
    }

    if (dynamicSchema) {
      const script = document.createElement("script");
      script.id = "hc-dynamic-seo-schema";
      script.type = "application/ld+json";
      script.text = JSON.stringify(dynamicSchema);
      document.head.appendChild(script);
    }
  }, [route]);

  // It's a headless engine, it works entirely background under client lifecycle hooks
  return null;
}
