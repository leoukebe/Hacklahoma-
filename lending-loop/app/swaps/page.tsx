import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SwapsPage() {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const userId = session.user.id;

    const incoming = await prisma.trade.findMany({
        where: { ownerId: userId },
        include: { item: true, requester: true },
        orderBy: { createdAt: 'desc' },
    });

    const outgoing = await prisma.trade.findMany({
        where: { requesterId: userId },
        include: { item: true, owner: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="centered-page" style={{ alignItems: 'flex-start', paddingTop: '100px' }}>
            <div style={{ width: '100%', maxWidth: '1000px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#1e293b' }}>Your Swaps</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {/* Incoming Requests */}
                    <div className="login-container">
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Incoming Requests</h2>
                        {incoming.length === 0 ? (
                            <p style={{ color: '#64748b' }}>No requests yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {incoming.map(trade => (
                                    <div key={trade.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#6366f1' }}>{trade.item.title}</span>
                                            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', background: trade.status === 'PENDING' ? '#fbbf24' : '#10b981', color: 'white' }}>{trade.status}</span>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#475569' }}>Requested by <strong>{trade.requester.name}</strong></p>
                                        <p style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(trade.createdAt).toLocaleDateString()}</p>

                                        {trade.status === 'PENDING' && (
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                <button style={{ flex: 1, padding: '8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Accept</button>
                                                <button style={{ flex: 1, padding: '8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reject</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Outgoing Requests */}
                    <div className="login-container">
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Your Requests</h2>
                        {outgoing.length === 0 ? (
                            <p style={{ color: '#64748b' }}>You haven't requested anything yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {outgoing.map(trade => (
                                    <div key={trade.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#6366f1' }}>{trade.item.title}</span>
                                            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '10px', background: trade.status === 'PENDING' ? '#fbbf24' : '#10b981', color: 'white' }}>{trade.status}</span>
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#475569' }}>Owner: <strong>{trade.owner.name}</strong></p>
                                        <p style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(trade.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
