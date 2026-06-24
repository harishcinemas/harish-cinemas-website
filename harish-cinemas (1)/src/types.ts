export interface Movie {
  title: string;
  slug: string;
  tagline: string;
  synopsis: string;
  status: 'Development' | 'Pre Production' | 'Production' | 'Post Production' | 'Released';
  genre: string[];
  releaseYear: string;
  posterUrl: string;
  bannerUrl: string;
  trailerYamlUrl?: string;
  cast: string[];
  crew: { role: string; name: string }[];
  productionNotes?: string[];
  isFeatured?: boolean;
  galleryImages?: string[];
}

export interface NewsItem {
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Movie Stills' | 'Events' | 'Behind The Scenes' | 'Launch Functions';
  imageUrl: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Trailers' | 'Teasers' | 'Songs' | 'Interviews' | 'BTS' | 'Shorts' | 'Sneak Peeks' | 'Public Reviews';
  youtubeId: string;
  thumbnailUrl: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  localUrl?: string;
  bio: string;
}
