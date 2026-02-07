'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`/?${params.toString()}`);
    }

    return (
        <div className="input-group" style={{ marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
            <i className="fas fa-search input-icon"></i>
            <input
                type="text"
                placeholder="Search for items..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
                style={{ padding: '15px 15px 15px 45px', borderRadius: '30px', border: '1px solid #ccc' }}
            />
        </div>
    );
}
