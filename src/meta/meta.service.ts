import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

@Injectable()
export class MetaService {
  async fetchMetadata(url: string) {
    const { data } = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(data);

    const baseUrl = new URL(url);

    const resolveUrl = (rawHref: string | undefined | null): string | null => {
      if (!rawHref) return null;
      try {
        return new URL(rawHref, baseUrl.origin).href;
      } catch {
        return null;
      }
    };

    const title = $('title').text() || null;

    const favicon =
      resolveUrl(
        $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href')
      ) || null;

    const canonical = resolveUrl($('link[rel="canonical"]').attr('href')) || null;

    const meta: Record<string, string> = {};

    $('meta').each((_, el) => {
      const name = $(el).attr('name') || $(el).attr('property') || $(el).attr('http-equiv');
      const content = $(el).attr('content');
      if (name && content) {
        meta[name.toLowerCase()] = content;
      }
    });

    return {
      title,
      favicon,
      canonical,
      meta,
    };
  }

async calculateScore(meta: Record<string, string>) {
  const recommendedTags: { tag: string; weight: number; note: string }[] = [
    { tag: 'title', weight: 20, note: 'Improves page discoverability and usability.' },
    { tag: 'description', weight: 15, note: 'Essential for search engine snippets.' },
    { tag: 'keywords', weight: 5, note: 'Helps refine search indexing.' },

    { tag: 'og:title', weight: 10, note: 'Key for social preview titles.' },
    { tag: 'og:description', weight: 10, note: 'Used in social link descriptions.' },
    { tag: 'og:image', weight: 10, note: 'Boosts engagement with link previews.' },
    { tag: 'og:url', weight: 5, note: 'Clarifies canonical URL on social.' },
    { tag: 'og:type', weight: 5, note: 'Helps define content type on Open Graph.' },

    { tag: 'twitter:card', weight: 5, note: 'Enables Twitter Cards rendering.' },
    { tag: 'twitter:title', weight: 5, note: 'Improves tweet link previews.' },
    { tag: 'twitter:description', weight: 5, note: 'Improves tweet context.' },
    { tag: 'twitter:image', weight: 5, note: 'Enriches shared tweets visually.' },

    { tag: 'viewport', weight: 3, note: 'Improves mobile responsiveness.' },
    { tag: 'charset', weight: 2, note: 'Defines character encoding for proper display.' },
  ];

  let score = 0;
  const present: string[] = [];
  const missing: string[] = [];
  const recommendations: string[] = [];

  for (const { tag, weight, note } of recommendedTags) {
    if (meta[tag]) {
      present.push(tag);
      score += weight;
    } else {
      missing.push(tag);
      recommendations.push(`Add '${tag}' (${note})`);
    }
  }

  return {
    score: Math.round(score),
    present,
    missing,
    recommendations,
  };
}

}
