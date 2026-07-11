"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Trash2, Upload, X } from "lucide-react";
import type { Product, ProductInput } from "@/lib/types";

const EMPTY: ProductInput = {
  name: "",
  brand: "",
  category: "",
  price: 0,
  priceUsed: undefined,
  images: [],
  description: "",
  sizes: [],
  featured: false,
};

export function ProductForm({
  initial,
  brands,
  onClose,
  onSaved,
}: {
  initial?: Product;
  brands: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ProductInput>(
    initial ? { ...initial } : { ...EMPTY }
  );
  const [sizesText, setSizesText] = useState((initial?.sizes ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof ProductInput>(k: K, v: ProductInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function handleUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      set("images", [...(form.images ?? []), ...data.urls]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload: ProductInput = {
      ...form,
      category: form.category || form.brand,
      sizes: sizesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      price: Number(form.price) || 0,
      priceUsed:
        form.priceUsed === undefined || form.priceUsed === null
          ? undefined
          : Number(form.priceUsed),
    };
    try {
      const res = await fetch(
        initial ? `/api/products/${initial.id}` : "/api/products",
        {
          method: initial ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSaved();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-gold";

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {initial ? "Edit product" : "Add product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-medium">
            Name
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={`mt-1 ${inputCls}`}
              placeholder="Nike Air Zoom Maxfly 2"
            />
          </label>

          <label className="text-sm font-medium">
            Brand
            <input
              required
              list="brand-list"
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              className={`mt-1 ${inputCls}`}
              placeholder="Nike"
            />
            <datalist id="brand-list">
              {brands.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </label>

          <label className="text-sm font-medium">
            Category
            <input
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={`mt-1 ${inputCls}`}
              placeholder="Defaults to brand"
            />
          </label>

          <label className="text-sm font-medium">
            Price (¥, new)
            <input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
              className={`mt-1 ${inputCls}`}
            />
          </label>

          <label className="text-sm font-medium">
            Used price (¥, optional)
            <input
              type="number"
              min={0}
              value={form.priceUsed ?? ""}
              onChange={(e) =>
                set(
                  "priceUsed",
                  e.target.value === "" ? undefined : Number(e.target.value)
                )
              }
              className={`mt-1 ${inputCls}`}
            />
          </label>

          <label className="sm:col-span-2 text-sm font-medium">
            Available sizes (comma separated)
            <input
              value={sizesText}
              onChange={(e) => setSizesText(e.target.value)}
              className={`mt-1 ${inputCls}`}
              placeholder="39, 40, 41, 42, 43"
            />
          </label>

          <label className="sm:col-span-2 text-sm font-medium">
            Description
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className={`mt-1 ${inputCls} resize-none`}
            />
          </label>
        </div>

        {/* Images */}
        <div className="mt-4">
          <p className="text-sm font-medium">Images</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {(form.images ?? []).map((src) => (
              <div
                key={src}
                className="group relative h-20 w-20 overflow-hidden rounded-xl border border-[var(--border)] bg-white"
              >
                <Image src={src} alt="" fill className="object-contain p-1" />
                <button
                  type="button"
                  onClick={() =>
                    set(
                      "images",
                      (form.images ?? []).filter((i) => i !== src)
                    )
                  }
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="grid h-20 w-20 place-items-center rounded-xl border border-dashed border-[var(--border)] text-[var(--fg-muted)] transition hover:border-gold hover:text-gold"
            >
              {uploading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Upload size={20} />
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => handleUpload(e.target.files)}
            />
          </div>
        </div>

        {/* Featured toggle */}
        <label className="mt-4 flex items-center gap-3 text-sm font-medium">
          <input
            type="checkbox"
            checked={Boolean(form.featured)}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 accent-gold"
          />
          Show in Featured Products
        </label>

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="btn-outline">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-gold">
            {saving && <Loader2 className="animate-spin" size={16} />}
            {initial ? "Save changes" : "Add product"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
