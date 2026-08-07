import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Application } from './api';

export function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`/api/applications/${id}`, {
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        if (response.status === 404) {
          if (!cancelled) setError('Not found (หรือไม่ใช่ของบัญชีนี้ — IDOR ถูกกันแล้ว)');
          return;
        }
        if (!response.ok) {
          throw new Error(`Failed (${response.status})`);
        }
        const data = (await response.json()) as Application;
        if (!cancelled) setItem(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  return (
    <main className="page">
      <p>
        <Link to="/">← Back</Link>
      </p>
      {error && <p className="error">{error}</p>}
      {item && (
        <>
          <h1>
            {item.company} — {item.title}
          </h1>
          <p className="muted">Status: {item.status}</p>
          <p className="muted">Id: {item.id}</p>
        </>
      )}
    </main>
  );
}
