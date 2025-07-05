export const userData = () => {
    try {
        const data = localStorage.getItem('user');
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error("Invalid JSON for 'user' in localStorage", err);
        return null;
    }
};

export const userId = () => {
    return localStorage.getItem('userId');
};
