// ─────────────────────────────────────────────────────────────────
//  appwrite.js  →  PHP/MySQL backend (drop-in replacement)
//
//  Set VITE_API_BASE_URL in .env.local
//    · cPanel production  : leave empty (same-origin)
//    · Local dev (XAMPP)  : http://localhost
// ─────────────────────────────────────────────────────────────────

const BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

// ── Token helpers (JWT stored in localStorage) ────────────────────
const TOKEN_KEY = 'medin_admin_token';
const getToken  = ()  => localStorage.getItem(TOKEN_KEY);
const setToken  = (t) => localStorage.setItem(TOKEN_KEY, t);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken() ?? ''}`,
});


// ── Auth ──────────────────────────────────────────────────────────

export const login = async (email, password) => {
    const res = await fetch(`${BASE}/api/auth.php`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Login failed');
    }
    const { token, user } = await res.json();
    setToken(token);
    return user;
};

export const logout = async () => {
    clearToken();
};

const getAccount = async () => {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${BASE}/api/auth.php`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
};

// Compat object so AuthContext.jsx works without changes
export const account = {
    createEmailPasswordSession: async (email, password) => login(email, password),
    deleteSession: async () => logout(),
    get: async () => {
        const user = await getAccount();
        if (!user) throw new Error('Not authenticated');
        return user;
    },
};


// ── Site Content ──────────────────────────────────────────────────

export const getSiteContent = async (key) => {
    try {
        const res = await fetch(`${BASE}/api/content.php?key=${encodeURIComponent(key)}`);
        if (!res.ok) return null;
        const json = await res.json();
        if (!json) return null;
        return JSON.parse(json.data);
    } catch (err) {
        console.warn(`getSiteContent("${key}") failed:`, err?.message ?? err);
        return null;
    }
};

export const setSiteContent = async (key, data) => {
    const res = await fetch(`${BASE}/api/content.php`, {
        method:  'POST',
        headers: authHeaders(),
        body:    JSON.stringify({ key, data: JSON.stringify(data) }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Failed to save content');
    }
};


// ── Images ────────────────────────────────────────────────────────

export const uploadImage = async (file) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE}/api/upload.php`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${getToken() ?? ''}` },
        // No Content-Type header — browser sets it with the boundary for multipart
        body: form,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? 'Image upload failed');
    }    
    const { id } = await res.json();
    return id;
};

export const getBannerUrl = (fileId) => {
    if (!fileId) return null;
    return `${BASE}/uploads/${fileId}`;
};


// ── Products ──────────────────────────────────────────────────────

export const addToDB = async (formData, imageId) => {
    const res = await fetch(`${BASE}/api/products.php`, {
        method:  'POST',
        headers: authHeaders(),
        body:    JSON.stringify({
            name:        formData.name,
            description: formData.description,
            creator:     formData.creator,
            imageId,
        }),
    });
    if (!res.ok) throw new Error('Failed to add product');
    const data = await res.json();
    return data['$id'];
};

export const getItems = async () => {
    try {
        const res = await fetch(`${BASE}/api/products.php`);
        if (!res.ok) return [];
        const items = await res.json();
        // Attach imageUrl so callers can render images directly
        return items.map(item => ({
            ...item,
            imageUrl: getBannerUrl(item.imageId),
        }));
    } catch {
        return [];
    }
};

export const deleteItems = async (documentId, imageId) => {
    const params = new URLSearchParams({ id: documentId });
    if (imageId) params.set('imageId', imageId);
    const res = await fetch(`${BASE}/api/products.php?${params}`, {
        method:  'DELETE',
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete product');
};
