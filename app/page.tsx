'use client';

import React, { useState } from 'react';
import { Navbar, ActiveTab } from '@/components/Navbar';
import { Overview } from '@/components/Overview';
import { ContentOrganizer } from '@/components/ContentOrganizer';
import { PasswordVault } from '@/components/PasswordVault';
import { CreatePostModal } from '@/components/CreatePostModal';
import { useSocialStore } from '@/lib/store';
import { ContentPost } from '@/types';

export default function Home() {
  const store = useSocialStore();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<ContentPost | null>(null);

  const handleOpenCreatePost = (postToEdit?: ContentPost) => {
    setEditingPost(postToEdit || null);
    setIsCreateModalOpen(true);
  };

  const handleSavePost = (
    postData: Omit<ContentPost, 'id' | 'createdAt'>,
    existingId?: string
  ) => {
    if (existingId) {
      store.updatePost(existingId, postData);
    } else {
      store.addPost(postData);
    }
    setIsCreateModalOpen(false);
  };

  if (!store.isLoaded) {
    return (
      <div className="min-h-screen bg-[#F4F7F2] flex items-center justify-center p-4">
        <div className="bg-white border-[3px] border-black p-6 shadow-[5px_5px_0px_#000] font-mono text-center space-y-2">
          <div className="w-8 h-8 border-4 border-black border-t-[#A3E635] rounded-full animate-spin mx-auto" />
          <div className="font-black text-sm uppercase">Memuat CuanStack...</div>
          <div className="text-xs text-neutral-500">Membuka vault akun lokal</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F2] text-black font-sans selection:bg-[#A3E635] selection:text-black">
      {/* Navbar with 3 Core Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreatePost={() => handleOpenCreatePost()}
        onOpenAddAccount={() => setActiveTab('vault')}
        totalAccounts={store.accounts.length}
        totalScheduled={store.scheduledCount}
        onExportJson={store.exportAllDataJson}
        onImportJson={store.importDataJson}
        onResetData={store.resetToDefaultData}
      />

      {/* Main Content Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <Overview
            accounts={store.accounts}
            posts={store.posts}
            totalFollowers={store.totalFollowers}
            scheduledCount={store.scheduledCount}
            onOpenCreatePost={() => handleOpenCreatePost()}
            onOpenAddAccount={() => setActiveTab('vault')}
            setActiveTab={setActiveTab}
            setSelectedPlatform={store.setSelectedPlatform}
          />
        )}

        {activeTab === 'content' && (
          <ContentOrganizer
            posts={store.filteredPosts}
            accounts={store.accounts}
            selectedPlatform={store.selectedPlatform}
            setSelectedPlatform={store.setSelectedPlatform}
            searchQuery={store.searchQuery}
            setSearchQuery={store.setSearchQuery}
            onOpenCreatePost={handleOpenCreatePost}
            onUpdatePostStatus={store.updatePostStatus}
            onDeletePost={store.deletePost}
            onExportCsv={store.exportPostsCsv}
          />
        )}

        {activeTab === 'vault' && (
          <PasswordVault
            accounts={store.accounts}
            selectedPlatform={store.selectedPlatform}
            setSelectedPlatform={store.setSelectedPlatform}
            searchQuery={store.searchQuery}
            setSearchQuery={store.setSearchQuery}
            onAddAccount={store.addAccount}
            onUpdateAccount={store.updateAccount}
            onDeleteAccount={store.deleteAccount}
          />
        )}
      </main>

      {/* Post Creator / Editor Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSavePost={handleSavePost}
        accounts={store.accounts}
        postToEdit={editingPost}
      />

      {/* Clean Unboxed Footer */}
      <footer className="border-t-[3px] border-black bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-black text-black">CUANSTACK</span>
            <span>·</span>
            <span className="text-neutral-600">Sosial Media Organizer & Password Vault</span>
            <span>·</span>
            <span className="text-neutral-600">100% Mandiri Tanpa Kunci Pihak Ketiga</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-600">
            <span>TikTok</span>
            <span>·</span>
            <span>Instagram</span>
            <span>·</span>
            <span>YouTube</span>
            <span>·</span>
            <span>Facebook</span>
            <span>·</span>
            <span>Threads</span>
            <span>·</span>
            <span>X</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
