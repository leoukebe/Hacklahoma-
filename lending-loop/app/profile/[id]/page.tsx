import { prisma } from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: { id: params.id },
        include: { items: true },
    });

    if (!user) {
        notFound();
    }

    return (
        <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="login-container" style={{ marginBottom: '40px', maxWidth: '100%' }}>
                <div className="login-header" style={{ alignItems: 'flex-start', textAlign: 'left', display: 'flex', gap: '20px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '32px' }}>
                        {user.name?.[0] || 'U'}
                    </div>
                    <div>
                        <h2>{user.name}</h2>
                        <p style={{ color: '#6366f1', fontWeight: '600' }}>{user.university}</p>
                        <p style={{ marginTop: '10px' }}>{user.bio || "No bio yet."}</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}>
                        <strong>{user.items.length}</strong> Items Listed
                    </div>
                    {/* Placeholder for reputation or trades logic */}
                    <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.5)', borderRadius: '10px' }}>
                        <strong>0</strong> Trades Completed
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Items ({user.items.length})</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {user.items.map(item => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        category={item.category}
                        imageUrl={item.imageUrl}
                    />
                ))}
                {user.items.length === 0 && (
                    <p style={{ color: '#64748b' }}>No items listed yet.</p>
                )}
            </div>
        </div>
    );
}
