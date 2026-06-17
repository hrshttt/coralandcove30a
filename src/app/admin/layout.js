"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Coral & Cove CMS</h1>
        </div>
        
        <nav className={styles.nav}>
          <Link 
            href="/admin" 
            className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`}
          >
            <LayoutDashboard size={20} />
            <span>Content Editor</span>
          </Link>
          <a 
            href="/" 
            target="_blank"
            className={styles.navLink}
            style={{ marginTop: 'auto' }}
          >
            <Home size={20} />
            <span>View Live Site</span>
          </a>
        </nav>
        
        <div className={styles.logoutContainer}>
          <button 
            onClick={async () => {
              document.cookie = 'cms_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              window.location.href = '/admin/login';
            }}
            className={styles.logoutBtn}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
