export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'threads' | 'x';

export type PostStatus = 'draft' | 'ready' | 'scheduled' | 'published';

export interface PlatformConfig {
  name: string;
  label: string;
  color: string;
  loginUrl: string;
}

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  name: string;
  handle: string;
  loginEmailOrUsername: string;
  loginPassword: string;
  profileUrl?: string;
  followers: number;
  status: 'active' | 'warming_up' | 'monetized' | 'review';
  notes?: string;
  updatedAt: string;
}

export interface ContentPost {
  id: string;
  title: string;
  caption: string;
  platforms: SocialPlatform[];
  targetAccountIds: string[];
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: PostStatus;
  linkUrl?: string;
  createdAt: string;
}
