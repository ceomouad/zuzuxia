import fitz, os, io, re, json, glob
from PIL import Image

PDF = r"C:\Users\itsmd\Documents\xwechat_files\wxid_to505vwy7a0a12_c45e\msg\file\2026-07\Dex TRACK SPIKE SHOP_20260525_073922_0000.pdf"
ROOT = r"E:\abde"
OUT_IMG = os.path.join(ROOT, "public", "products")
OUT_DATA = os.path.join(ROOT, "data", "products.json")

# page = 1-based PDF page. imgs = "all" or list of indices into the
# position-sorted image list for that page. new/used = MYR range labels.
P = [
    # page, imgs, name, brand, category, new, used
    (1,  "all", "Adidas Adizero Sprintstar",        "Adidas", "Sprint",   "MYR400+",       "MYR100-200+"),
    (2,  "all", "Adidas Adizero Finesse 1",         "Adidas", "Sprint",   "MYR400-500+",   "MYR100-200+"),
    (3,  "all", "Adidas Adizero Finesse 2",         "Adidas", "Sprint",   "MYR600-700+",   "MYR400+"),
    (4,  "all", "Adidas Adizero Prime SP2",         "Adidas", "Sprint",   "MYR1000-2000+", "MYR500-600+"),
    (5,  "all", "Adidas Adizero Prime SP3",         "Adidas", "Sprint",   "MYR600-700+",   "MYR399-500+"),
    (6,  "all", "Adidas Adizero Prime SP4",         "Adidas", "Sprint",   "MYR700-800+",   "MYR500-600+"),
    (7,  "all", "Adidas Adizero Ambition 1",        "Adidas", "Distance", "MYR700+",       "MYR300-400+"),
    (8,  "all", "Adidas Adizero Ambition 2",        "Adidas", "Distance", "MYR700+",       "MYR500+"),
    (9,  "all", "Adidas Adizero Avanti 2",          "Adidas", "Distance", "MYR700+",       "MYR500+"),
    (10, [0,1], "Adidas Adizero Ambition 3",        "Adidas", "Distance", "From MYR700+",  "From MYR400+"),
    (10, [2,3], "Adidas Adizero Avanti 3",          "Adidas", "Distance", "From MYR700+",  "From MYR400+"),
    (10, [4,5], "Adidas Adizero Finesse 3",         "Adidas", "Sprint",   "MYR700+",       "MYR500+"),
    (11, "all", "Adidas Adizero TJ/PV",             "Adidas", "Jumps",    "MYR500+",       "MYR300-400+"),
    (12, "all", "Adidas Adizero LJ",                "Adidas", "Jumps",    "MYR600+",       "MYR400+"),
    (13, "all", "Adidas Adizero HJ",                "Adidas", "Jumps",    "MYR600-700+",   "MYR400-500+"),
    (14, "all", "Adidas Adizero Javelin 2",         "Adidas", "Throws",   "MYR600+",       "MYR400-500+"),
    (15, "all", "Nike Air Zoom Maxfly 1",           "Nike",   "Sprint",   "MYR900+",       "MYR300-600+"),
    (16, "all", "Nike Air Zoom Maxfly 2",           "Nike",   "Sprint",   "MYR700+",       "MYR500+"),
    (17, "all", "Nike Zoom Victory 1",              "Nike",   "Distance", "MYR500-600+",   "MYR300-400+"),
    (18, "all", "Nike Zoom Victory 2",              "Nike",   "Distance", "MYR600-700+",   "MYR400+"),
    (19, "all", "Nike Zoom Dragonfly 1",            "Nike",   "Distance", "MYR600-700+",   "MYR300-400+"),
    (20, "all", "Nike Zoom Dragonfly 2",            "Nike",   "Distance", "MYR500-600+",   "MYR300-400+"),
    (21, "all", "Nike Zoom Dragonfly 2 Elite",      "Nike",   "Distance", "MYR500-650+",   "MYR400+"),
    (22, "all", "Nike Air Zoom Superfly Elite 2",   "Nike",   "Sprint",   "MYR400-500+",   "MYR300+"),
    (23, "all", "Nike Zoom Ja Fly 4",               "Nike",   "Sprint",   "MYR400+",       "MYR200-300+"),
    (24, "all", "Nike Zoom Rival Sprint",           "Nike",   "Sprint",   "MYR300-400+",   "MYR150-200+"),
    (25, "all", "Nike Zoom Rival Jump",             "Nike",   "Jumps",    "MYR400-500+",   "MYR200-300+"),
    (26, "all", "Nike Air Zoom LJ Elite",           "Nike",   "Jumps",    "MYR600+",       "MYR300-400+"),
    (27, "all", "Nike Air Zoom TJ Elite",           "Nike",   "Jumps",    "MYR500-600+",   "MYR300-400+"),
    (28, "all", "Nike Air Zoom HJ Elite",           "Nike",   "Jumps",    "MYR600-700+",   "MYR400-500+"),
    (29, "all", "Nike Zoom Javelin Elite",          "Nike",   "Throws",   "MYR700-800+",   "MYR400-500+"),
    (30, "all", "Asics Cyberblade",                 "Asics",  "Sprint",   "MYR600-700+",   "MYR400-500+"),
    (31, "all", "Asics Sonicsprint Elite 3",        "Asics",  "Sprint",   "MYR650+",       "MYR400-500+"),
    (32, "all", "Asics Metaspeed SP 1",             "Asics",  "Sprint",   "MYR800+",       "MYR400-500+"),
    (33, "all", "Asics Metaspeed SP 2",             "Asics",  "Sprint",   "MYR1000-1500+", "MYR800-900+"),
    (34, "all", "Asics Metaspeed MD",               "Asics",  "Distance", "MYR600+",       "MYR400+"),
    (35, "all", "Asics Metaspeed MD 2",             "Asics",  "Distance", "MYR900+",       "MYR600-700+"),
    (36, "all", "Asics Metaspeed LD 2",             "Asics",  "Distance", "MYR800+",       "MYR600-700+"),
    (37, [0,1,2,3],       "Puma evoSPEED Sprint Nitro 2",   "Puma", "Sprint",   "MYR1000+",     "MYR500+"),
    (37, [4,5,6,7,8],     "Puma evoSPEED 400 Nitro 2",      "Puma", "Sprint",   "MYR1000+",     "MYR500+"),
    (38, [0,1,2],         "Puma evoSPEED Forte Nitro Elite","Puma", "Distance", "MYR1000+",     None),
    (38, [3],             "Puma evoSPEED LD",               "Puma", "Distance", "MYR700+",      "MYR400-500+"),
    (38, [4],             "Puma evoSPEED Distance Nitro",   "Puma", "Distance", "MYR700+",      "MYR400-500+"),
    (39, [0],             "Puma evoSPEED Long Jump",        "Puma", "Jumps",    "MYR1200+",     "MYR500-600+"),
    (39, [1],             "Puma evoSPEED Triple Jump",      "Puma", "Jumps",    "MYR1200+",     "MYR500-600+"),
    (39, [2],             "Puma Nitro evoSPEED Javelin",    "Puma", "Throws",   "MYR700-800+",  "MYR500-600+"),
]

FEATURED = {
    "Nike Air Zoom Maxfly 1", "Adidas Adizero Prime SP2", "Asics Metaspeed SP 2",
    "Puma evoSPEED Sprint Nitro 2", "Nike Zoom Dragonfly 2 Elite",
    "Adidas Adizero Avanti 3", "Nike Zoom Victory 2", "Asics Metaspeed MD 2",
}

BLURB = {
    ("Adidas", "Sprint"):   "Adizero sprint DNA — a stiff carbon-infused plate and aggressive spike plate built for explosive top-end speed.",
    ("Adidas", "Distance"): "Adizero middle- and long-distance racing spike with responsive Lightstrike and a locked-in race-day fit.",
    ("Adidas", "Jumps"):    "Adizero field spike engineered for horizontal and vertical jumps with a rigid plate and secure lockdown.",
    ("Adidas", "Throws"):   "Adizero throws spike with a supportive strap and grippy plate for powerful, planted release.",
    ("Nike",   "Sprint"):   "Nike Air Zoom sprint spike — featherlight, propulsive and tuned for maximum turnover down the straight.",
    ("Nike",   "Distance"): "Nike Zoom distance spike with springy Air Zoom units and a breathable upper for fast, efficient laps.",
    ("Nike",   "Jumps"):    "Nike Air Zoom Elite field spike built for the jumps with an aggressive plate and confident board contact.",
    ("Nike",   "Throws"):   "Nike Elite throws spike offering a stable platform and grip for explosive javelin release.",
    ("Asics",  "Sprint"):   "Asics sprint spike with precise geometry and a snappy plate for confident, high-speed turnover.",
    ("Asics",  "Distance"): "Asics Metaspeed distance spike — lightweight, responsive and built to hold race pace lap after lap.",
    ("Puma",   "Sprint"):   "Puma evoSPEED with NITRO foam and a carbon plate — springy energy return in a barely-there sprint spike.",
    ("Puma",   "Distance"): "Puma evoSPEED NITRO distance spike delivering lively energy return and a locked-in feel over the miles.",
    ("Puma",   "Jumps"):    "Puma evoSPEED field spike engineered for the jumps with a powerful plate and secure midfoot strap.",
    ("Puma",   "Throws"):   "Puma NITRO evoSPEED throws spike built for a stable base and explosive javelin delivery.",
}

SIZE_POOL = ["6", "7", "8", "9", "10", "11", "12", "13"]
def sizes_for(i):
    start = i % 2
    end = len(SIZE_POOL) - (i % 3)
    return SIZE_POOL[start:end]

def first_int(s):
    m = re.search(r"(\d+)", s or "")
    return int(m.group(1)) if m else 0

def sorted_images(page):
    info = page.get_image_info(xrefs=True)
    # sort top-to-bottom (banded), then left-to-right
    info.sort(key=lambda im: (round(im["bbox"][1] / 60), round(im["bbox"][0])))
    return info

def main():
    # clean old images
    for f in glob.glob(os.path.join(OUT_IMG, "*.jpg")) + glob.glob(os.path.join(OUT_IMG, "*.png")):
        os.remove(f)
    os.makedirs(OUT_IMG, exist_ok=True)

    doc = fitz.open(PDF)
    products = []
    base = 1751360400  # 2026-07-01T09:00:00Z epoch-ish; incremented per product
    pnum = 0
    for i, (page1, sel, name, brand, cat, new, used) in enumerate(P):
        page = doc[page1 - 1]
        imgs = sorted_images(page)
        if sel == "all":
            chosen = imgs
        else:
            chosen = [imgs[k] for k in sel]

        pnum += 1
        rel_images = []
        for j, im in enumerate(chosen):
            pix = fitz.Pixmap(doc, im["xref"])
            if pix.n >= 5 or pix.alpha:  # CMYK / alpha -> RGB
                pix = fitz.Pixmap(fitz.csRGB, pix)
            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            # normalize onto a clean white 4:3 canvas, trimmed
            img = trim_white(img)
            canvas = fit_contain(img, 1000, 750)
            fname = f"s{pnum:02d}{chr(97 + j)}.jpg"
            canvas.save(os.path.join(OUT_IMG, fname), "JPEG", quality=88)
            rel_images.append(f"/products/{fname}")

        products.append({
            "id": f"sku-{pnum:03d}",
            "name": name,
            "brand": brand,
            "category": cat,
            "price": first_int(new),
            "priceUsed": (first_int(used) if used else None),
            "priceLabel": new,
            "priceUsedLabel": used,
            "images": rel_images,
            "description": f"Authentic {name}. " + BLURB[(brand, cat)] + " 100% genuine, delivered anywhere in China with fast, reliable WhatsApp support.",
            "sizes": sizes_for(i),
            "featured": name in FEATURED,
            "createdAt_epoch": base + i * 3600,
        })

    # finalize createdAt iso
    import datetime
    for p in products:
        e = p.pop("createdAt_epoch")
        p["createdAt"] = datetime.datetime.utcfromtimestamp(e).strftime("%Y-%m-%dT%H:%M:%S.000Z")
        if p["priceUsed"] is None:
            del p["priceUsed"]
        if p["priceUsedLabel"] is None:
            del p["priceUsedLabel"]

    with open(OUT_DATA, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    print(f"wrote {len(products)} products, {sum(len(p['images']) for p in products)} images")

def trim_white(img, thresh=245):
    import numpy as np
    a = np.asarray(img)
    mask = (a[:, :, 0] < thresh) | (a[:, :, 1] < thresh) | (a[:, :, 2] < thresh)
    if not mask.any():
        return img
    ys, xs = mask.any(1), mask.any(0)
    y0, y1 = ys.argmax(), len(ys) - ys[::-1].argmax()
    x0, x1 = xs.argmax(), len(xs) - xs[::-1].argmax()
    pad = 8
    y0 = max(0, y0 - pad); x0 = max(0, x0 - pad)
    y1 = min(a.shape[0], y1 + pad); x1 = min(a.shape[1], x1 + pad)
    return img.crop((x0, y0, x1, y1))

def fit_contain(img, W, H, margin=0.08):
    canvas = Image.new("RGB", (W, H), (255, 255, 255))
    iw, ih = img.size
    avail_w, avail_h = W * (1 - margin), H * (1 - margin)
    scale = min(avail_w / iw, avail_h / ih)
    nw, nh = max(1, int(iw * scale)), max(1, int(ih * scale))
    img = img.resize((nw, nh), Image.LANCZOS)
    canvas.paste(img, ((W - nw) // 2, (H - nh) // 2))
    return canvas

if __name__ == "__main__":
    main()
