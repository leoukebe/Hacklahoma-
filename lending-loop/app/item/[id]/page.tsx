import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from 'next/link';
import { requestTrade } from "@/app/actions/trade";

export default async function ItemPage({ params }: { params: { id: string } }) {
    const item = await prisma.item.findUnique({
        where: { id: params.id },
        include: { owner: true },
    });

    if (!item) {
        notFound();
    }

    return (
        <div className="centered-page" style={{ alignItems: 'flex-start', paddingTop: '100px' }}>
            <div className="login-container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                    <i className="fas fa-arrow-left"></i> Back to browse
                </Link>

                <div style={{ display: 'flex', gap: '30px', flexDirection: 'column' }}>
                    {item.imageUrl && (
                        <div style={{ width: '100%', height: '300px', background: '#ccc', borderRadius: '15px', overflow: 'hidden' }}>
                            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}

                    <div>
                        <span style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6366f1', fontWeight: 'bold' }}>{item.category}</span>
                        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginTop: '5px' }}>{item.title}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px', padding: '10px', background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                {item.owner.name?.[0] || 'U'}
                            </div>
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: '14px' }}>Owned by {item.owner.name}</p>
                                <p style={{ fontSize: '12px', color: '#64748b' }}>{item.owner.university}</p>
                            </div>
                            <Link href={`/profile/${item.owner.id}`} style={{ marginLeft: 'auto', fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>
                                View Profile
                            </Link>
                        </div>

                        <p style={{ marginTop: '20px', lineHeight: '1.6', color: '#475569' }}>{item.description}</p>

                        <div style={{ marginTop: '30px' }}>
                            <form action={async () => {
                                'use server';
                                await requestTrade(item.id, item.ownerId);
                            }}>
                                <button type="submit" className="login-btn">
                                    Request to Borrow
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
