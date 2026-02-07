import Link from 'next/link';
import { getSession } from '@/lib/session';
import { logout } from '@/app/actions/auth';

export default async function Navbar() {
    const session = await getSession();

    return (
        <nav className="login-container" style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 100,
            borderRadius: '50px'
        }}>
            <Link href="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#6366f1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-circle-nodes"></i> Lending Loop
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link href="/" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: '500' }}>Browse</Link>

                {session ? (
                    <>
                        <Link href={`/profile/${session.user.id}`} style={{ textDecoration: 'none', color: '#1e293b', fontWeight: '500' }}>My Profile</Link>
                        <form action={logout}>
                            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: '500', fontSize: '16px' }}>
                                Logout
                            </button>
                        </form>
                    </>
                ) : (
                    <Link href="/login" className="login-btn" style={{ padding: '8px 20px', borderRadius: '20px', fontSize: '14px', width: 'auto' }}>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
