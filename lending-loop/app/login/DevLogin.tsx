'use client'

import { useActionState } from 'react'
import { login } from '../actions/auth'

function DevLoginButton({ email, name }: { email: string, name: string }) {
    const [state, formAction] = useActionState(login, null)

    return (
        <form action={formAction}>
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="password" value="password123" />
            <button
                type="submit"
                className="dev-login-btn"
                style={{
                    padding: '8px 16px',
                    margin: '5px',
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'left'
                }}
            >
                <i className="fas fa-user-circle" style={{ marginRight: '8px' }}></i>
                Login as {name}
            </button>
        </form>
    )
}

export default function DevLogin() {
    return (
        <div style={{
            marginTop: '20px',
            padding: '15px',
            border: '1px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            width: '100%',
            maxWidth: '400px'
        }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <i className="fas fa-code"></i> Dev Login
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <DevLoginButton email="alice@example.com" name="Alice (Sophomore)" />
                <DevLoginButton email="bob@example.com" name="Bob (History Major)" />
            </div>
        </div>
    )
}
