'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  const isActive = (path: string) => pathname === path;

  const linkStyle = (isActiveLink: boolean) => ({
    fontWeight: isActiveLink ? 'bold' : '500',
    color: isActiveLink ? '#ffdd57' : '#fff',
  });

  const displayName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : user?.email?.split('@')[0] || 'Utilisateur';

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href={user ? '/dashboard' : '/'} className="nav-brand">
          <span className="brand-mark">TF</span>
          <span>TaskFlow</span>
        </Link>
        {user && (
          <div className="nav-center">
            <Link href="/dashboard" style={linkStyle(isActive('/dashboard'))}>
              Tableau de bord
            </Link>
            <Link href="/projects" style={linkStyle(isActive('/projects'))}>
              Projets
            </Link>
          </div>
        )}
        <div className="nav-right">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
              <span style={{ fontSize: '0.875rem' }}>{displayName}</span>
              <button onClick={handleLogout} className="btn btn-sm btn-error">
                Déconnexion
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {pathname !== '/login' && (
                <Link href="/login" className="btn btn-sm btn-outline">
                  Connexion
                </Link>
              )}
              {pathname !== '/register' && (
                <Link href="/register" className="btn btn-sm btn-primary">
                  S&apos;inscrire
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
