export interface StorageRepository<K> {
	getItem: (key: keyof K) => string | null;
	setItem: (key: keyof K, value: string) => void;
	removeItem: (key: keyof K) => void;
}
