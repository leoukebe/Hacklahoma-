
import { prisma } from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import { notFound } from "next/navigation";

import './profile.css';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await prisma.user.findUnique({
        where: { id },
        include: { items: true },
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="profile-card">
            <div className="profile-header">
                {/* Placeholder image or user's image if available */}
                <div className="profile-pic">
                    {user.name?.[0] || 'U'}
                </div>
                {/* <img src="profile_placeholder.png" alt="Profile Picture" className="profile-pic" /> */}
                <div className="profile-info-container">
                    <div className="profile-names">
                        <h1 className="full-name">{user.name}</h1>
                        <p className="username">{user.email}</p>
                    </div>
                    <p className="school-info">{user.university || "University Info"}</p>
                </div>
            </div>

            <div className="rating-section">
                <div className="stars" aria-label="Rating: 4.8 out of 5">
                    ★★★★☆
                </div>
                <span className="rating-count">4.8 (120 reviews)</span>
            </div>

            <div className="bio-section">
                <p className="bio-text">{user.bio || "Passionate developer and student. Open to freelance projects!"}</p>
            </div>

            <div className="listings-section">
                <h2 className="section-title">Listings</h2>
                <div className="listings-container">
                    {user.items.length > 0 ? (
                        user.items.map(item => (
                            <div key={item.id} style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '10px', overflow: 'hidden' }}>
                                <ItemCard
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    category={item.category}
                                    imageUrl={item.imageUrl}
                                // ownerName is not needed here as we are on the owner's profile
                                />
                            </div>
                        ))
                    ) : (
                        <p className="empty-listings-msg">No active listings.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
