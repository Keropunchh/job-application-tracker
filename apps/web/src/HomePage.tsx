import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from './api';
import type { Application, Me } from './api';

export function HomePage() {
  const navigate = useNavigate();
  const [me, setMe] = useState<Me | null>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await api.me();
        const list = await api.listApplications();
        if (!cancelled) {
          setMe(user);
          setApps(list);
        }
      } catch {
        if (!cancelled) navigate('/login');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const created = await api.createApplication(company, title);
      setApps((prev) => [created, ...prev]);
      setCompany('');
      setTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    }
  }

  async function onLogout() {
    await api.logout();
    navigate('/login');
  }

  if (loading) {
    return <main className="page">Loading…</main>;
  }

  if (!me) {
    return null;
  }

  return (
    <main className="page">
      <header className="row">
        <div>
          <h1>Job Application Tracker</h1>
          <p className="muted">Signed in as {me.email}</p>
        </div>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </header>

      <section className="stack">
        <h2>Applications (Phase 1 placeholder)</h2>
        <form className="row" onSubmit={onCreate}>
          <input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
        {error && <p className="error">{error}</p>}
        <ul>
          {apps.map((a) => (
            <li key={a.id}>
              <Link to={`/applications/${a.id}`}>
                {a.company} — {a.title}
              </Link>{' '}
              <span className="muted">({a.status})</span>
            </li>
          ))}
          {apps.length === 0 && <li className="muted">ยังไม่มีใบสมัคร</li>}
        </ul>
      </section>
    </main>
  );
}
