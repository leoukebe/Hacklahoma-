import LoginForm from './LoginForm';
import DevLogin from './DevLogin';

export default function LoginPage() {
    return (
        <main className="centered-page" style={{ flexDirection: 'column', gap: '2rem' }}>
            <LoginForm />
            <DevLogin />
        </main>
    );
}
