"use client";

import React, { useEffect, useState, useCallback } from "react";
import { getProductDetail } from "@/networking/endpoints/products/getProduct";
import { updateProduct } from "@/networking/endpoints/products/updateProduct";
import { getCategories } from "@/networking/endpoints/categories/getCategories";
import { getSubCategories } from "@/networking/endpoints/categories/getSubCategories";
import { useParams } from "next/navigation";
import { AllCategoriesTypes } from "@/types/categoriesType";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Colour { name: string }
interface Size { size: string }
interface ProductImage { title: string; description: string; url: string }

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#9aa5c4] mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#e9edf8]" />
            {children}
            <span className="h-px flex-1 bg-[#e9edf8]" />
        </h3>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7b8ec8]">
                {label}
            </label>
            {children}
            {error && <p className="text-xs text-red-500 font-mono">{error}</p>}
        </div>
    );
}

function ReadOnlyField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7b8ec8]">
                {label}
            </label>
            <div className="w-full bg-[#f7f8fc] border border-[#e9edf8] rounded-xl px-4 py-3 text-sm text-[#9aa5c4] font-sans cursor-not-allowed select-none">
                {children}
            </div>
        </div>
    );
}

function TagPill({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 bg-[#f0f4ff] text-[#9aa5c4] text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-[#c7d3f5] tracking-wide">
            {label}
        </span>
    );
}

function SelectChevron() {
    return (
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa5c4]">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
}

const selectCls =
    "w-full bg-white border border-[#e2e8f8] rounded-xl px-4 py-3 text-sm text-[#1a1a2e] font-sans focus:outline-none focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/10 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EditProductPage() {
    const params = useParams<{ id: string; type: string }>();
    const productId = params.id;

    // ── State ──
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Dropdown data
    const [categories, setCategories] = useState<AllCategoriesTypes[]>([]);
    const [subCategories, setSubCategories] = useState<AllCategoriesTypes[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    // Read-only fields (still needed for the update payload)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [oldPrice, setOldPrice] = useState("");
    const [currentPrice, setCurrentPrice] = useState("");
    const [unitsAvailable, setUnitsAvailable] = useState(0);
    const [colours, setColours] = useState<Colour[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [images, setImages] = useState<ProductImage[]>([]);
    const [isThrift, setIsThrift] = useState(false);
    const [madeInNigeria, setMadeInNigeria] = useState(false);
    const [isFreebie, setIsFreebie] = useState(false);

    // ✏️ Editable fields
    const [categoryId, setCategoryId] = useState<string>("");
    const [subCategoryId, setSubCategoryId] = useState<string>("");


    // ── Load dropdown options ──
    useEffect(() => {
        async function loadDropdowns() {
            try {
                setCategoriesLoading(true);
                const [cats, productCats] = await Promise.all([
                    getCategories(),
                    getSubCategories(),
                ]);

                console.log({ cats, productCats });
                setCategories(cats.data);
                setSubCategories(productCats);
            } catch (err) {
                console.error("Failed to load category dropdowns:", err);
            } finally {
                setCategoriesLoading(false);
            }
        }
        loadDropdowns();
    }, []);

    // ── Load product ──
    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const productResult = await getProductDetail(productId);
                const product = productResult?.data;
                setName(product.name ?? "");
                setDescription(product.description ?? "");
                setCategoryId(product.category?.id ? String(product.category.id) : "");
                setSubCategoryId(product.product_category?.id ? String(product.product_category.id) : "");
                setOldPrice(product.old_price ?? "");
                setCurrentPrice(product.price ?? "");
                setUnitsAvailable(product.units ?? 0);
                setColours(product.colours ?? []);
                setSizes(product.sizes ?? []);
                setImages(product.media ?? []);
                setIsThrift(product.thrift ?? false);
                setMadeInNigeria(product.made_in_nigeria ?? false);
                setIsFreebie(product.isFreebie ?? false);
            } catch (err) {
                setFetchError("Could not load product. Check the product ID or network.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [productId]);

    // ── Validate & submit ──
    const validate = () => {
        const errs: Record<string, string> = {};
        if (!categoryId) errs.category = "Category is required.";
        if (!subCategoryId) errs.subCategory = "Sub-category is required.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!validate()) return;
        try {
            setSaving(true);
            setSaveError(null);
            setSaveSuccess(false);
            console.log({
                categoryId,
                subCategoryId,
            })
            await updateProduct(productId, {
                id: productId,

                category_id: categoryId,
                product_category_id: subCategoryId,

            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 4000);
        } catch (err) {
            setSaveError("Failed to save changes. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    // ── Render states ──
    if (loading || categoriesLoading) {
        return (
            <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-[#4f6ef7] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-mono text-[#9aa5c4] tracking-widest uppercase">Loading product…</p>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center p-8">
                <div className="bg-white border border-red-100 rounded-2xl p-8 max-w-md text-center shadow-sm">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-sm font-mono text-red-500">{fetchError}</p>
                </div>
            </div>
        );
    }
    console.log({ categories, subCategories });
    return (
        <div className="min-h-screen bg-[#f7f8fc]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#e9edf8]">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white" />
                                <rect x="13" y="3" width="8" height="8" rx="1.5" fill="white" opacity=".5" />
                                <rect x="3" y="13" width="8" height="8" rx="1.5" fill="white" opacity=".5" />
                                <rect x="13" y="13" width="8" height="8" rx="1.5" fill="white" opacity=".3" />
                            </svg>
                        </div>
                        <span className="text-xs font-mono font-bold tracking-[0.15em] uppercase text-[#1a1a2e]">
                            Kikae Admin
                        </span>
                    </div>
                    <div className="text-xs font-mono text-[#9aa5c4] tracking-wide">
                        PRODUCT / <span className="text-[#4f6ef7]">EDIT</span>
                    </div>
                </div>
            </header>

            {/* Page title */}
            <div className="max-w-4xl mx-auto px-6 pt-10 pb-6">
                <h1 className="text-3xl font-semibold text-[#1a1a2e] leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Edit Product
                </h1>
                <p className="text-sm text-[#9aa5c4] font-mono mt-1">
                    ID: <span className="text-[#4f6ef7]">{productId}</span>
                </p>
            </div>

            {/* Save feedback */}
            {saveSuccess && (
                <div className="max-w-4xl mx-auto px-6 mb-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 text-sm font-mono text-emerald-700 flex items-center gap-2">
                        <span>✓</span> Product updated successfully.
                    </div>
                </div>
            )}
            {saveError && (
                <div className="max-w-4xl mx-auto px-6 mb-4">
                    <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-3 text-sm font-mono text-red-600 flex items-center gap-2">
                        <span>!</span> {saveError}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="max-w-4xl mx-auto px-6 pb-24 space-y-6">

                    {/* ── Card: Basic Info (read-only) ── */}
                    <div className="bg-white rounded-2xl border border-[#e9edf8] p-7 shadow-sm space-y-5">
                        <SectionHeading>Basic Information</SectionHeading>

                        <ReadOnlyField label="Product Name">
                            {name || "—"}
                        </ReadOnlyField>

                        <ReadOnlyField label="Description">
                            <span className="whitespace-pre-wrap line-clamp-4">{description || "—"}</span>
                        </ReadOnlyField>

                        {/* ✏️ Editable: Category & Sub-category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Field label="Category" error={errors.category}>
                                <div className="relative">
                                    <select
                                        className={selectCls}
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        disabled={categoriesLoading}
                                    >
                                        <option value="" disabled>
                                            {categoriesLoading ? "Loading…" : "Select a category"}
                                        </option>
                                        {categories?.length > 0 && categories.map((cat) => (
                                            <option key={cat.id} value={String(cat.id)}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    <SelectChevron />
                                </div>
                            </Field>

                            <Field label="Sub-Category" error={errors.subCategory}>
                                <div className="relative">
                                    <select
                                        className={selectCls}
                                        value={subCategoryId}
                                        onChange={(e) => setSubCategoryId(e.target.value)}
                                        disabled={categoriesLoading}
                                    >
                                        <option value="" disabled>
                                            {categoriesLoading ? "Loading…" : "Select a sub-category"}
                                        </option>
                                        {subCategories?.length > 0 && subCategories.map((cat) => (
                                            <option key={cat.id} value={String(cat.id)}>
                                                {cat?.name}
                                            </option>
                                        ))}
                                    </select>
                                    <SelectChevron />
                                </div>
                            </Field>
                        </div>
                    </div>

                    {/* ── Card: Pricing (read-only) ── */}
                    <div className="bg-white rounded-2xl border border-[#e9edf8] p-7 shadow-sm space-y-5">
                        <SectionHeading>Pricing & Stock</SectionHeading>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <ReadOnlyField label="Old Price (₦)">
                                {oldPrice ? `₦${oldPrice}` : "—"}
                            </ReadOnlyField>
                            <ReadOnlyField label="Current Price (₦)">
                                {isFreebie ? "Free" : currentPrice ? `₦${currentPrice}` : "—"}
                            </ReadOnlyField>
                            <ReadOnlyField label="Units Available">
                                {unitsAvailable}
                            </ReadOnlyField>
                        </div>
                    </div>

                    {/* ── Card: Attributes (read-only) ── */}
                    <div className="bg-white rounded-2xl border border-[#e9edf8] p-7 shadow-sm space-y-6">
                        <SectionHeading>Product Attributes</SectionHeading>

                        <div className="space-y-2">
                            <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7b8ec8]">
                                Available Colours
                            </label>
                            {colours.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {colours.map((c, i) => <TagPill key={i} label={c.name} />)}
                                </div>
                            ) : (
                                <p className="text-sm text-[#c4cce8] font-mono">None specified</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#7b8ec8]">
                                Available Sizes
                            </label>
                            {sizes.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((s, i) => <TagPill key={i} label={s.size} />)}
                                </div>
                            ) : (
                                <p className="text-sm text-[#c4cce8] font-mono">None specified</p>
                            )}
                        </div>
                    </div>

                    {/* ── Card: Flags (read-only) ── */}
                    <div className="bg-white rounded-2xl border border-[#e9edf8] p-7 shadow-sm">
                        <SectionHeading>Product Flags</SectionHeading>
                        <div className="divide-y divide-[#f0f3fb]">
                            {[
                                { label: "Thrift Item", desc: "This product is second-hand or pre-owned", value: isThrift },
                                { label: "Made in Nigeria", desc: "This product was manufactured in Nigeria", value: madeInNigeria },
                                { label: "Freebie", desc: "This item is given away for free", value: isFreebie },
                            ].map((flag) => (
                                <div key={flag.label} className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                                    <div>
                                        <p className="text-sm text-[#1a1a2e] font-medium">{flag.label}</p>
                                        <p className="text-xs text-[#9aa5c4] font-mono mt-0.5">{flag.desc}</p>
                                    </div>
                                    <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full border ${flag.value ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-[#f7f8fc] text-[#9aa5c4] border-[#e9edf8]"}`}>
                                        {flag.value ? "YES" : "NO"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Card: Images (read-only) ── */}
                    <div className="bg-white rounded-2xl border border-[#e9edf8] p-7 shadow-sm space-y-4">
                        <SectionHeading>Product Images</SectionHeading>
                        <p className="text-xs font-mono text-[#9aa5c4] -mt-2">{images.length} / 10 images</p>
                        {images.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                {images.map((img, i) => (
                                    <div key={i} className="relative">
                                        <div className="aspect-square rounded-xl overflow-hidden bg-[#f0f4ff] border border-[#e2e8f8] flex items-center justify-center">
                                            <span className="text-2xl opacity-30">🖼</span>
                                        </div>
                                        {img.url && (
                                            <p className="text-[9px] font-mono text-[#c4cce8] mt-1 truncate">{img.url}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-[#e2e8f8] rounded-xl py-10 text-center">
                                <p className="text-sm font-mono text-[#c4cce8]">No images attached</p>
                                <p className="text-xs font-mono text-[#d8ddee] mt-1">Images are managed from the mobile app</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Sticky save bar ── */}
                <div className="fixed bottom-0 inset-x-0 z-30 bg-white/80 backdrop-blur-md border-t border-[#e9edf8]">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                        <p className="text-xs font-mono text-[#9aa5c4]">
                            Editing <span className="text-[#1a1a2e] font-semibold">{name || "—"}</span>
                        </p>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2.5 bg-[#1a1a2e] hover:bg-[#4f6ef7] text-white text-sm font-mono font-semibold tracking-wide px-7 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    SAVING…
                                </>
                            ) : (
                                "SAVE CHANGES"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}