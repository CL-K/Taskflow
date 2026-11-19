'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="landing-page">
      <div className="landing-content">
        <section className="landing-copy">
          <span className="eyebrow">Une organisation plus simple</span>
          <h1>
            Faites avancer vos projets, <span style={{ color: '#5b5ce2' }}>sans friction.</span>
          </h1>
          <p>
            Rassemblez vos projets et vos tâches au même endroit. Gardez une vue claire sur les priorités
            et avancez sereinement, une étape à la fois.
          </p>
          <div className="landing-actions">
            <Link href={user ? '/dashboard' : '/register'} className="btn btn-lg btn-primary">
              {user ? 'Ouvrir mon espace' : 'Créer mon espace'} <span aria-hidden="true">→</span>
            </Link>
            {!user && (
              <Link href="/login" className="btn btn-lg btn-outline">
                J’ai déjà un compte
              </Link>
            )}
          </div>
          <div className="landing-points">
            <span>✓</span><span>Projets organisés</span>
            <span>✓</span><span>Suivi des tâches</span>
            <span>✓</span><span>Progression visible</span>
          </div>
        </section>

        <div className="landing-preview" aria-label="Aperçu du tableau de bord TaskFlow">
          <div className="preview-window">
            <div className="preview-topbar">
              <span>Vue d’ensemble</span>
              <div className="preview-dots" aria-hidden="true"><span /><span /><span /></div>
            </div>
            <div className="preview-content">
              <div className="preview-stat"><strong>08</strong><span>Projets actifs</span></div>
              <div className="preview-stat"><strong>24</strong><span>Tâches terminées</span></div>
              <div className="preview-task">
                <div className="preview-task-row"><span>Cette semaine</span><span className="preview-tag">3 priorités</span></div>
                <div className="preview-task-row"><span>Finaliser la maquette</span><span className="preview-tag">En cours</span></div>
                <div className="preview-task-row"><span>Préparer le lancement</span><span className="preview-tag">À faire</span></div>
                <div className="preview-task-row"><span>Revue du projet</span><span className="preview-tag">Terminé</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}