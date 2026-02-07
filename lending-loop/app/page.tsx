
import { prisma } from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";

import SearchBar from "@/components/SearchBar";

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q;

  const items = await prisma.item.findMany({
    where: {
      OR: query ? [
        { title: { contains: query } },
        { description: { contains: query } },
        { category: { contains: query } }
      ] : undefined
    },
    include: { owner: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px', color: '#1e293b' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>Discover Items</h1>
        <p style={{ color: '#64748b' }}>Borrow what you need, lend what you don&apos;t.</p>
      </div>

      <SearchBar />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            category={item.category}
            imageUrl={item.imageUrl}
            ownerName={item.owner.name || item.owner.email}
            ownerId={item.owner.id}
          />
        ))}
        {items.length === 0 && (
          <div className="login-container" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <p>No items listed yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
