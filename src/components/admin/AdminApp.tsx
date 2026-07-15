"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/config";
import { BrandLogo } from "../BrandLogo";
import { ProductForm } from "./ProductForm";

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(Boolean(d.authed)))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="animate-spin text-brand" size={28} />
      </div>
    );
  }

  return authed ? (
    <Dashboard onLogout={() => setAuthed(false)} />
  ) : (
    <Login onSuccess={() => setAuthed(true)} />
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Login failed");
      }
      onSuccess();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-sm p-8"
      >
        <div className="flex flex-col items-center text-center">
          <BrandLogo className="h-14 w-14" />
          <h1 className="mt-4 font-display text-2xl uppercase tracking-tight">
            Admin Access
          </h1>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Enter your password to manage products.
          </p>
        </div>

        <div className="relative mt-6">
          <Lock
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]"
          />
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-9 pr-3 text-sm outline-none focus:border-brand"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-brand mt-5 w-full"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          Sign in
        </button>
        <Link
          href="/"
          className="mt-4 block text-center text-xs text-[var(--fg-muted)] hover:text-brand"
        >
          ← Back to store
        </Link>
      </motion.form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products]
  );

  async function load() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function logout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    onLogout();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setBusyId(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setBusyId(null);
    load();
  }

  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen">
      <header className="glass sticky top-0 z-40 border-b border-[var(--border)]">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo className="h-8 w-8" />
            <span className="font-display text-lg uppercase tracking-tight">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="btn-brand"
            >
              <Plus size={16} /> Add product
            </button>
            <button type="button" onClick={logout} className="btn-outline">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-x py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Total products" value={products.length} />
          <Stat label="Featured" value={featuredCount} />
          <Stat label="Brands" value={brands.length} />
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg-elevated)] text-xs uppercase tracking-wider text-[var(--fg-muted)]">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="hidden px-4 py-3 sm:table-cell">Brand</th>
                <th className="px-4 py-3">Price</th>
                <th className="hidden px-4 py-3 md:table-cell">Sizes</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    <Loader2 className="mx-auto animate-spin text-brand" />
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-[var(--border)] align-middle"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-white">
                          {p.images[0] && (
                            <Image
                              src={p.images[0]}
                              alt=""
                              fill
                              className="object-contain p-1"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          {p.featured && (
                            <Star
                              size={14}
                              className="text-brand"
                              fill="currentColor"
                            />
                          )}
                          {p.name}
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--fg-muted)] sm:table-cell">
                      {p.brand}
                    </td>
                    <td className="px-4 py-3">
                      {p.priceLabel ?? formatPrice(p.price)}
                    </td>
                    <td className="hidden px-4 py-3 text-[var(--fg-muted)] md:table-cell">
                      {p.sizes.join(", ")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(p)}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] hover:border-brand hover:text-brand"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          disabled={busyId === p.id}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-red-500 hover:border-red-500"
                          aria-label="Delete"
                        >
                          {busyId === p.id ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <AnimatePresence>
        {(creating || editing) && (
          <ProductForm
            initial={editing ?? undefined}
            brands={brands}
            onClose={() => {
              setCreating(false);
              setEditing(null);
            }}
            onSaved={() => {
              setCreating(false);
              setEditing(null);
              load();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-wider text-[var(--fg-muted)]">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}
