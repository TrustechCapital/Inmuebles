class CacheService {
    keys: Set<string> = new Set();

    constructor() {}

    set(key: string, data: any) {
        this.keys.add(key);
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    get(key: string): any {
        const data = sessionStorage.getItem(key);
        if (!data) {
            return null;
        }

        return JSON.parse(data);
    }

    delete(key: string) {
        this.keys.delete(key);
        sessionStorage.delete(key);
    }
}

export default new CacheService();
