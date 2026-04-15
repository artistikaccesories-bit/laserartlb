import React, { useState, useEffect } from 'react';
import type { } from 'react/jsx-runtime';
import { db, storage, collection, addDoc, getDocs, query, orderBy, onSnapshot, doc, deleteDoc, ref, uploadBytes, getDownloadURL } from '../utils/firebase';
import { Package, Plus, Trash2, Image as ImageIcon, Loader2, X, Edit2 } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    images?: string[];
    category: string;
    stock?: number;
}

const InventoryScreen: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('keychain');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('10');
    const [files, setFiles] = useState<FileList | null>(null);

    useEffect(() => {
        if (!db) return;
        const q = query(collection(db, 'products'), orderBy('name', 'asc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const items: Product[] = [];
            snapshot.forEach(doc => {
                items.push({ id: doc.id, ...doc.data() } as Product);
            });
            setProducts(items);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setName(product.name);
        setPrice(product.price.toString());
        setCategory(product.category);
        setDescription(product.description);
        setStock(product.stock?.toString() || '10');
        setFiles(null);
        setShowModal(true);
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setName('');
        setPrice('');
        setCategory('keychain');
        setDescription('');
        setStock('10');
        setFiles(null);
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!db || !storage) {
            alert("Database or Storage not initialized. Please check your connection.");
            return;
        }

        if (!editingProduct && (!files || files.length === 0)) {
            alert("Please select at least one image.");
            return;
        }

        if (!name || !price || !description) {
            alert("Please fill in all required fields.");
            return;
        }

        setUploading(true);

        try {
            let imageUrls = editingProduct?.images || [];
            let mainImage = editingProduct?.image || '';

            if (files && files.length > 0) {
                const uploadPromises = Array.from(files).map(async (file) => {
                    const storageRef = ref(storage, `products/${Date.now()}_${Math.random().toString(36).substring(7)}_${file.name}`);
                    const uploadResult = await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(uploadResult.ref);
                    return url;
                });

                imageUrls = await Promise.all(uploadPromises);
                mainImage = imageUrls[0];
            }

            const productData = {
                name: name.trim(),
                price: parseFloat(price),
                category,
                description: description.trim(),
                image: mainImage,
                images: imageUrls,
                stock: parseInt(stock),
                updatedAt: new Date(),
                handle: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            };

            if (editingProduct) {
                await updateDoc(doc(db, 'products', editingProduct.id), productData);
                alert("Product updated successfully!");
            } else {
                await addDoc(collection(db, 'products'), {
                    ...productData,
                    createdAt: new Date()
                });
                alert("Product added successfully!");
            }
            
            setShowModal(false);
        } catch (error: any) {
            console.error("Error saving product:", error);
            alert(`Failed to save product: ${error.message || 'Unknown error'}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!db || !window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteDoc(doc(db, 'products', id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="screen">
            <div className="screen-header">
                <div>
                    <h1 className="screen-title">Inventory</h1>
                    <p className="screen-subtitle">{products.length} products in shop</p>
                </div>
                <button className="add-btn" onClick={openAddModal}>
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner" />
                    <p>Loading inventory...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <Package size={48} className="empty-state__icon" />
                    <p className="empty-state__title">No products yet</p>
                    <p className="empty-state__sub">Add your first product to see it here.</p>
                </div>
            ) : (
                <div className="product-list">
                    {products.map(p => (
                        <div key={p.id} className="product-item">
                            <img src={p.image} alt={p.name} className="product-item__img" />
                            <div className="product-item__info">
                                <h3 className="product-item__name">{p.name}</h3>
                                <p className="product-item__price">${p.price}</p>
                                <p className="product-item__cat">{p.category} • Stock: {p.stock || 0}</p>
                            </div>
                            <div className="product-item__actions">
                                <button className="product-item__btn edit" onClick={() => openEditModal(p)}>
                                    <Edit2 size={16} />
                                </button>
                                <button className="product-item__btn delete" onClick={() => handleDeleteProduct(p.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">{editingProduct ? 'Edit Product' : 'New Product'}</h2>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Custom Keychain" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price ($)</label>
                                    <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required placeholder="10.00" />
                                </div>
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} required placeholder="10" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="keychain">Keychain</option>
                                    <option value="tag">Tag</option>
                                    <option value="accessory">Accessory</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} required placeholder="Product details..." rows={3} />
                            </div>
                            <div className="form-group">
                                <label>Images {editingProduct && '(Leave empty to keep existing)'}</label>
                                <div className="file-input-wrap">
                                    <input type="file" multiple accept="image/*" onChange={e => setFiles(e.target.files)} id="file-input" className="hidden-input" />
                                    <label htmlFor="file-input" className="file-input-label">
                                        <ImageIcon size={20} />
                                        <span>{files ? `${files.length} images selected` : 'Choose Images'}</span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="submit-btn" disabled={uploading}>
                                {uploading ? <><Loader2 size={18} className="animate-spin" /> {editingProduct ? 'Updating...' : 'Uploading...'}</> : (editingProduct ? 'Update Product' : 'Save Product')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryScreen;
