'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { login } from '../actions/auth'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="login-btn" disabled={pending} style={{ opacity: pending ? 0.7 : 1 }}>
            {pending ? (
                <span><i className="fas fa-circle-notch fa-spin"></i> Signing In...</span>
            ) : (
                <>
                    <span>Sign In</span>
                    <i className="fas fa-arrow-right"></i>
                </>
            )}
        </button>
    )
}

export default function LoginForm() {
    const [state, formAction] = useFormState(login, null)

    return (
        <div className="login-container">
            <div className="login-header">
                <h2>Welcome Back</h2>
                <p>Please sign in to your account</p>
            </div>

            <form action={formAction}>
                {state?.error && (
                    <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontSize: '14px' }}>
                        {state.error}
                    </div>
                )}
                <div className="input-group">
                    <i className="fas fa-envelope input-icon"></i>
                    <input type="email" id="email" name="email" placeholder="Email Address" required />
                </div>

                <div className="input-group">
                    <i className="fas fa-lock input-icon"></i>
                    <input type="password" id="password" name="password" placeholder="Password" required />
                    <i className="fas fa-eye toggle-password" id="togglePassword"></i>
                </div>

                <div className="form-options">
                    <label className="remember-me">
                        <input type="checkbox" name="remember" />
                        <span className="checkmark"></span>
                        Remember me
                    </label>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>

                <SubmitButton />

                <div className="divider">
                    <span>or continue with</span>
                </div>

                <div className="social-login">
                    <button type="button" className="social-btn google">
                        <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="social-btn apple">
                        <i className="fab fa-apple"></i>
                    </button>
                    <button type="button" className="social-btn facebook">
                        <i className="fab fa-facebook-f"></i>
                    </button>
                </div>
            </form>

            <div className="login-footer">
                <p>Don&apos;t have an account? <a href="#">Sign up</a></p>
                <p style={{ marginTop: '10px', fontSize: '12px' }}>Try: alice@example.com / password123</p>
            </div>
        </div>
    )
}
