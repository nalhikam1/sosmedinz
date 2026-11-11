'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { SocialAccount, ContentPost, SocialPlatform, PostStatus } from '@/types';
import { INITIAL_ACCOUNTS, INITIAL_POSTS } from './initial-data';

const STORAGE_KEYS = {
  ACCOUNTS: 'cuanstack_vault_accounts_v2',
  POSTS: 'cuanstack_vault_posts_v2',
};

function getInitialData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

export function useSocialStore() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(() =>
    getInitialData(STORAGE_KEYS.ACCOUNTS, INITIAL_ACCOUNTS)
  );
  const [posts, setPosts] = useState<ContentPost[]>(() =>
    getInitialData(STORAGE_KEYS.POSTS, INITIAL_POSTS)
  );

  const isLoaded = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Filters
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [accounts, posts, isLoaded]);

  // Account operations
  const addAccount = (accountData: Omit<SocialAccount, 'id' | 'updatedAt'>) => {
    const newAccount: SocialAccount = {
      ...accountData,
      id: `acc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setAccounts((prev) => [newAccount, ...prev]);
    return newAccount;
  };

  const updateAccount = (id: string, updates: Partial<SocialAccount>) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : acc
      )
    );
  };

  const deleteAccount = (id: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  // Post operations
  const addPost = (postData: Omit<ContentPost, 'id' | 'createdAt'>) => {
    const newPost: ContentPost = {
      ...postData,
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<ContentPost>) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
    );
  };

  const updatePostStatus = (id: string, status: PostStatus) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, status } : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // Export / Import
  const exportAllDataJson = () => {
    const data = {
      appName: 'CuanStack Social Organizer',
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      accounts,
      posts,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonStr);
    downloadAnchor.setAttribute('download', `cuanstack_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportPostsCsv = () => {
    const headers = ['ID', 'Judul', 'Caption', 'Platforms', 'Tanggal Tayang', 'Jam', 'Status', 'Link'];
    const rows = posts.map((p) => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.caption.replace(/"/g, '""')}"`,
      `"${p.platforms.join(', ')}"`,
      p.scheduledDate,
      p.scheduledTime,
      p.status,
      `"${p.linkUrl || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cuanstack_jadwal_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.accounts && Array.isArray(parsed.accounts)) setAccounts(parsed.accounts);
      if (parsed.posts && Array.isArray(parsed.posts)) setPosts(parsed.posts);
      return true;
    } catch (e) {
      console.error('Failed to parse json', e);
      return false;
    }
  };

  const resetToDefaultData = () => {
    setAccounts(INITIAL_ACCOUNTS);
    setPosts(INITIAL_POSTS);
    localStorage.removeItem(STORAGE_KEYS.ACCOUNTS);
    localStorage.removeItem(STORAGE_KEYS.POSTS);
  };

  // Filtered lists
  const filteredAccounts = accounts.filter((acc) => {
    const matchPlatform = selectedPlatform === 'all' || acc.platform === selectedPlatform;
    const matchSearch =
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.loginEmailOrUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchSearch;
  });

  const filteredPosts = posts.filter((p) => {
    const matchPlatform = selectedPlatform === 'all' || p.platforms.includes(selectedPlatform);
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchSearch;
  });

  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const todayPosts = posts.filter((p) => p.scheduledDate === todayStr);
  const scheduledCount = posts.filter((p) => p.status === 'scheduled' || p.status === 'ready').length;
  const totalFollowers = accounts.reduce((acc, curr) => acc + curr.followers, 0);

  return {
    isLoaded,
    accounts,
    posts,
    filteredAccounts,
    filteredPosts,
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
    addAccount,
    updateAccount,
    deleteAccount,
    addPost,
    updatePost,
    updatePostStatus,
    deletePost,
    exportAllDataJson,
    exportPostsCsv,
    importDataJson,
    resetToDefaultData,
    todayPosts,
    scheduledCount,
    totalFollowers,
  };
}
