import Link from 'next/link';

interface ItemProps {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string | null;
    ownerName?: string;
    ownerId?: string;
}

export default function ItemCard({ id, title, description, category, imageUrl, ownerName, ownerId }: ItemProps) {
    return (
        <div className="login-container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
            {imageUrl && (
                <div style={{ width: '100%', height: '150px', background: '#ccc', borderRadius: '10px', overflow: 'hidden' }}>
                    <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}
            <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6366f1', fontWeight: 'bold' }}>{category}</span>
                <Link href={`/item/${id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{title}</h3>
                </Link>
                {ownerName && ownerId && (
                    <p style={{ fontSize: '12px', color: '#64748b' }}>
                        Owned by <Link href={`/profile/${ownerId}`} style={{ color: '#6366f1', textDecoration: 'underline' }}>{ownerName}</Link>
                    </p>
                )}
            </div>
            <p style={{ fontSize: '14px', color: '#475569', flex: 1 }}>{description}</p>

            <Link href={`/item/${id}`} className="login-btn" style={{ padding: '8px', fontSize: '14px', marginTop: 'auto', textAlign: 'center' }}>
                View Details
            </Link>
        </div>
    );
}
