import { getCmsData } from './cms';

export function getAreaGuidePosts() {
  const data = getCmsData();
  return data?.areaGuides || [];
}

export function getAreaGuidePostBySlug(slug) {
  const data = getCmsData();
  const guides = data?.areaGuides || [];
  return guides.find(post => post.slug === slug);
}
