(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/LoadingSkeleton.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoadingSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function LoadingSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-pulse space-y-4 rounded-2xl border border-border bg-card/50 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-4 w-1/2 rounded bg-card/80"
            }, void 0, false, {
                fileName: "[project]/components/LoadingSkeleton.js",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-3 w-full rounded bg-card/80"
            }, void 0, false, {
                fileName: "[project]/components/LoadingSkeleton.js",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-3 w-5/6 rounded bg-card/80"
            }, void 0, false, {
                fileName: "[project]/components/LoadingSkeleton.js",
                lineNumber: 6,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LoadingSkeleton.js",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = LoadingSkeleton;
var _c;
__turbopack_context__.k.register(_c, "LoadingSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/currency.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency,
    "getCurrencySymbol",
    ()=>getCurrencySymbol
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useUIStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useUIStore.js [app-client] (ecmascript)");
;
const CURRENCY_CONFIG = {
    USD: {
        locale: "en-US",
        symbol: "$"
    },
    INR: {
        locale: "en-IN",
        symbol: "₹"
    }
};
function formatCurrency(value, overrideCurrency = null) {
    // Get currency from store or use override
    const currency = overrideCurrency || (("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("currency") || "INR" : "TURBOPACK unreachable");
    const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG["INR"];
    return new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(value || 0);
}
function getCurrencySymbol(currency = null) {
    const activeCurrency = currency || (("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("currency") || "INR" : "TURBOPACK unreachable");
    const config = CURRENCY_CONFIG[activeCurrency] || CURRENCY_CONFIG["INR"];
    return config.symbol;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/purchases/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PurchasesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadingSkeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LoadingSkeleton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/currency.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const emptyLineItem = {
    itemId: "",
    quantity: "",
    totalCost: ""
};
const emptyForm = {
    date: new Date().toISOString().split("T")[0],
    notes: "",
    lineItems: [
        emptyLineItem
    ]
};
function PurchasesPage() {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [purchases, setPurchases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filterItemId, setFilterItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterPeriod, setFilterPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const loadData = async ()=>{
        setStatus("loading");
        try {
            let purchaseUrl = "/api/purchases?";
            if (filterItemId) purchaseUrl += `itemId=${filterItemId}&`;
            if (filterPeriod !== "all") {
                const now = new Date();
                let startDate = new Date();
                if (filterPeriod === "week") startDate.setDate(now.getDate() - 7);
                else if (filterPeriod === "month") startDate.setMonth(now.getMonth() - 1);
                else if (filterPeriod === "year") startDate.setFullYear(now.getFullYear() - 1);
                purchaseUrl += `startDate=${startDate.toISOString()}`;
            }
            const [itemsRes, purchasesRes] = await Promise.all([
                fetch("/api/items", {
                    cache: "no-store"
                }),
                fetch(purchaseUrl, {
                    cache: "no-store"
                })
            ]);
            const itemsPayload = await itemsRes.json();
            const purchasesPayload = await purchasesRes.json();
            if (!itemsPayload.success) {
                throw new Error(itemsPayload.error || "Failed to load items");
            }
            if (!purchasesPayload.success) {
                throw new Error(purchasesPayload.error || "Failed to load purchases");
            }
            setItems(itemsPayload.data);
            setPurchases(purchasesPayload.data);
            setStatus("success");
        } catch (err) {
            setError(err.message || "Unable to load purchases");
            setStatus("error");
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PurchasesPage.useEffect": ()=>{
            loadData();
        }
    }["PurchasesPage.useEffect"], [
        filterItemId,
        filterPeriod
    ]);
    const itemMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PurchasesPage.useMemo[itemMap]": ()=>new Map(items.map({
                "PurchasesPage.useMemo[itemMap]": (item)=>[
                        item._id,
                        item
                    ]
            }["PurchasesPage.useMemo[itemMap]"]))
    }["PurchasesPage.useMemo[itemMap]"], [
        items
    ]);
    const totalPurchaseValue = purchases.reduce((sum, purchase)=>sum + (purchase.totalCost || 0), 0);
    const totalProfitPotential = purchases.reduce((sum, purchase)=>{
        if (Number.isFinite(purchase.totalProfit)) return sum + purchase.totalProfit;
        const legacyProfit = (purchase.profitPerBox || 0) * (purchase.quantity || 0);
        const lineProfit = (purchase.lineItems || []).reduce((lineSum, line)=>lineSum + (line.profitPerBox || 0) * (line.quantity || 0), 0);
        return sum + (lineProfit || legacyProfit || 0);
    }, 0);
    const handleLineItemChange = (index, field, value)=>{
        setForm((prev)=>{
            const updated = [
                ...prev.lineItems
            ];
            updated[index] = {
                ...updated[index],
                [field]: value
            };
            return {
                ...prev,
                lineItems: updated
            };
        });
    };
    const addLineItem = ()=>{
        setForm((prev)=>({
                ...prev,
                lineItems: [
                    ...prev.lineItems,
                    {
                        ...emptyLineItem
                    }
                ]
            }));
    };
    const removeLineItem = (index)=>{
        setForm((prev)=>{
            const updated = prev.lineItems.filter((_, i)=>i !== index);
            return {
                ...prev,
                lineItems: updated.length ? updated : [
                    {
                        ...emptyLineItem
                    }
                ]
            };
        });
    };
    const handleChange = (event)=>{
        const { name, value } = event.target;
        setForm((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setError("");
        const lineItems = form.lineItems.filter((line)=>line.itemId && line.quantity && line.totalCost).map((line)=>({
                itemId: line.itemId,
                quantity: Number(line.quantity),
                totalCost: Number(line.totalCost)
            }));
        if (!lineItems.length) {
            setError("Add at least one item to the purchase.");
            return;
        }
        const payload = {
            date: form.date,
            notes: form.notes,
            lineItems
        };
        const url = editingId ? `/api/purchases/${editingId}` : "/api/purchases";
        const method = editingId ? "PUT" : "POST";
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!result.success) {
            setError(result.error || "Failed to save purchase");
            return;
        }
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        await loadData();
    };
    const normalizeLineItems = (purchase)=>{
        if (Array.isArray(purchase.lineItems) && purchase.lineItems.length > 0) {
            return purchase.lineItems.map((line)=>({
                    itemId: line.itemId?.toString() || line.itemId,
                    quantity: String(line.quantity || ""),
                    totalCost: String(line.totalCost || "")
                }));
        }
        return [
            {
                itemId: purchase.itemId?.toString() || purchase.itemId || "",
                quantity: String(purchase.quantity || ""),
                totalCost: String(purchase.totalCost || "")
            }
        ];
    };
    const handleEdit = (purchase)=>{
        setForm({
            date: new Date(purchase.date).toISOString().split("T")[0],
            notes: purchase.notes || "",
            lineItems: normalizeLineItems(purchase)
        });
        setEditingId(purchase._id);
        setShowForm(true);
        setError("");
    };
    const handleDelete = async (id)=>{
        if (!confirm("Are you sure you want to delete this purchase record?")) return;
        const response = await fetch(`/api/purchases/${id}`, {
            method: "DELETE"
        });
        const result = await response.json();
        if (!result.success) {
            alert(result.error || "Failed to delete purchase");
            return;
        }
        await loadData();
    };
    const handleCancel = ()=>{
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
        setError("");
    };
    const calculateLineItem = (line)=>{
        const item = itemMap.get(line.itemId);
        if (!item || !line.quantity || !line.totalCost) return null;
        const quantity = Number(line.quantity);
        const totalCost = Number(line.totalCost);
        const perItemCost = totalCost / quantity;
        const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
        const profitPerBox = sellingPricePerBox - perItemCost;
        const totalProfit = profitPerBox * quantity;
        return {
            perItemCost,
            sellingPricePerBox,
            profitPerBox,
            totalProfit
        };
    };
    if (status === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4 md:space-y-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadingSkeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/dashboard/purchases/page.js",
                lineNumber: 225,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/purchases/page.js",
            lineNumber: 224,
            columnNumber: 7
        }, this);
    }
    if (status === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-2xl border border-border bg-card p-6 text-danger shadow-soft",
            children: error || "Unable to load purchases."
        }, void 0, false, {
            fileName: "[project]/app/dashboard/purchases/page.js",
            lineNumber: 232,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 md:space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg md:text-xl font-semibold",
                        children: "Purchase Tracking"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs md:text-sm text-muted",
                        children: "Add multiple items in one purchase. The system calculates profits per item automatically."
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 md:mt-6 grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl bg-card p-3 md:p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.2em] text-muted",
                                        children: "Total Purchases"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-base md:text-lg font-semibold",
                                        children: purchases.length
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl bg-card p-3 md:p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.2em] text-muted",
                                        children: "Purchase Value"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-base md:text-lg font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalPurchaseValue)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl bg-card p-3 md:p-4 col-span-2 md:col-span-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs uppercase tracking-[0.2em] text-muted",
                                        children: "Profit Potential"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-base md:text-lg font-semibold text-primary",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalProfitPotential)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/purchases/page.js",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            !showForm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowForm(true),
                className: "w-full md:w-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90",
                children: "+ Add New Purchase"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/purchases/page.js",
                lineNumber: 262,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base md:text-lg font-semibold",
                        children: editingId ? "Edit Purchase" : "Add New Purchase"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "mt-4 md:mt-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 md:grid-cols-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs uppercase tracking-[0.2em] text-muted",
                                            children: "Date *"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/purchases/page.js",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "date",
                                            type: "date",
                                            value: form.date,
                                            onChange: handleChange,
                                            required: true,
                                            className: "mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 md:py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/purchases/page.js",
                                            lineNumber: 277,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/purchases/page.js",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: form.lineItems.map((line, index)=>{
                                    const calculations = calculateLineItem(line);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border border-border bg-card/80 p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-3 md:grid-cols-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs uppercase tracking-[0.2em] text-muted",
                                                                children: "Item *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 295,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: line.itemId,
                                                                onChange: (event)=>handleLineItemChange(index, "itemId", event.target.value),
                                                                required: true,
                                                                className: "mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select item"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                                        lineNumber: 302,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: item._id,
                                                                            children: [
                                                                                item.name,
                                                                                " (",
                                                                                item.smallPacketsPerBox,
                                                                                " pkts/box)"
                                                                            ]
                                                                        }, item._id, true, {
                                                                            fileName: "[project]/app/dashboard/purchases/page.js",
                                                                            lineNumber: 304,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 296,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 294,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs uppercase tracking-[0.2em] text-muted",
                                                                children: "Quantity *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 311,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "1",
                                                                value: line.quantity,
                                                                onChange: (event)=>handleLineItemChange(index, "quantity", event.target.value),
                                                                required: true,
                                                                className: "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation",
                                                                placeholder: "Boxes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 312,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 310,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-xs uppercase tracking-[0.2em] text-muted",
                                                                children: "Total Cost *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 323,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                step: "0.01",
                                                                value: line.totalCost,
                                                                onChange: (event)=>handleLineItemChange(index, "totalCost", event.target.value),
                                                                required: true,
                                                                className: "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation",
                                                                placeholder: "Amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 324,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 322,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 293,
                                                columnNumber: 21
                                            }, this),
                                            calculations ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 grid gap-2 rounded-lg bg-primary/10 p-3 text-xs text-foreground grid-cols-2 sm:grid-cols-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted",
                                                                children: "Cost/Box"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 340,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold truncate",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(calculations.perItemCost)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 341,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 339,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted",
                                                                children: "Sell/Box"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 344,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold truncate",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(calculations.sellingPricePerBox)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 345,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 343,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted",
                                                                children: "Profit/Box"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 348,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-primary truncate",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(calculations.profitPerBox)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 349,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 347,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted",
                                                                children: "Total Profit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 352,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-semibold text-primary truncate",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(calculations.totalProfit)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 353,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 351,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 338,
                                                columnNumber: 23
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex justify-end",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>removeLineItem(index),
                                                    className: "rounded-lg bg-danger/15 px-4 py-3 text-xs font-semibold text-danger transition hover:bg-danger/25 touch-manipulation min-h-[44px]",
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/purchases/page.js",
                                                    lineNumber: 359,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 358,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 292,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 288,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: addLineItem,
                                className: "w-full rounded-full border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-border/40 touch-manipulation min-h-[44px]",
                                children: "+ Add Another Item"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs uppercase tracking-[0.2em] text-muted",
                                        children: "Notes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "notes",
                                        value: form.notes,
                                        onChange: handleChange,
                                        className: "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none touch-manipulation",
                                        rows: 2,
                                        placeholder: "Optional notes..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-danger",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 392,
                                columnNumber: 22
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "w-full sm:flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 touch-manipulation min-h-[44px]",
                                        children: editingId ? "Update Purchase" : "Record Purchase"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCancel,
                                        className: "w-full sm:w-auto rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-card touch-manipulation min-h-[44px]",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 394,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/purchases/page.js",
                lineNumber: 269,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-border bg-card p-4 md:p-6 text-foreground shadow-soft",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base md:text-lg font-semibold",
                                children: "Purchase History"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 415,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 md:flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterItemId,
                                        onChange: (e)=>setFilterItemId(e.target.value),
                                        className: "rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All Items"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 422,
                                                columnNumber: 15
                                            }, this),
                                            items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: item._id,
                                                    children: item.name
                                                }, item._id, false, {
                                                    fileName: "[project]/app/dashboard/purchases/page.js",
                                                    lineNumber: 424,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: filterPeriod,
                                        onChange: (e)=>setFilterPeriod(e.target.value),
                                        className: "rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "all",
                                                children: "All Time"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 432,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "week",
                                                children: "Last Week"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 433,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "month",
                                                children: "Last Month"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 434,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "year",
                                                children: "Last Year"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 435,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 427,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 416,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 md:mt-6 space-y-3",
                        children: status === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadingSkeleton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/app/dashboard/purchases/page.js",
                            lineNumber: 442,
                            columnNumber: 13
                        }, this) : purchases.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted text-center py-8",
                            children: "No purchases yet."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/purchases/page.js",
                            lineNumber: 444,
                            columnNumber: 13
                        }, this) : purchases.map((purchase)=>{
                            const itemsList = purchase.lineItems?.length ? purchase.lineItems : [
                                {
                                    itemId: purchase.itemId,
                                    quantity: purchase.quantity,
                                    totalCost: purchase.totalCost,
                                    perItemCost: purchase.perItemCost,
                                    sellingPricePerBox: purchase.sellingPricePerBox,
                                    profitPerBox: purchase.profitPerBox,
                                    profitMarginPercent: purchase.profitMarginPercent
                                }
                            ];
                            const totalBoxes = purchase.totalBoxes || itemsList.reduce((sum, line)=>sum + (line.quantity || 0), 0);
                            const totalProfit = Number.isFinite(purchase.totalProfit) ? purchase.totalProfit : itemsList.reduce((sum, line)=>sum + (line.profitPerBox || 0) * (line.quantity || 0), 0);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-3 sm:gap-4 rounded-2xl border border-border bg-card/90 p-3 sm:p-4 text-sm text-muted",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm sm:text-base font-semibold text-foreground",
                                                        children: [
                                                            "Purchase on ",
                                                            new Date(purchase.date).toLocaleDateString()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 473,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-muted mt-1",
                                                        children: [
                                                            itemsList.length,
                                                            " items · ",
                                                            totalBoxes,
                                                            " boxes · ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(purchase.totalCost)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 474,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 472,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-semibold text-primary",
                                                children: [
                                                    "Profit: ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalProfit)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 478,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 471,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: itemsList.map((line, index)=>{
                                            const item = itemMap.get(line.itemId?.toString?.() || line.itemId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-2 rounded-xl border border-border bg-card/80 p-3 text-xs sm:flex-row sm:items-center sm:justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold text-foreground",
                                                                children: item?.name || "Unknown item"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 492,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted",
                                                                children: [
                                                                    line.quantity,
                                                                    " boxes · Cost/Box ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(line.perItemCost || 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 495,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 491,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2 sm:gap-3 text-xs text-muted",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Line Cost: ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(line.totalCost || 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 500,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Sell/Box: ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(line.sellingPricePerBox || 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 501,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-primary",
                                                                children: [
                                                                    "Profit/Box: ",
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$currency$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(line.profitPerBox || 0),
                                                                    line.profitMarginPercent ? ` (${line.profitMarginPercent}%)` : ""
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                                lineNumber: 502,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                                        lineNumber: 499,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, `${purchase._id}-${index}`, true, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 487,
                                                columnNumber: 25
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 483,
                                        columnNumber: 19
                                    }, this),
                                    purchase.notes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted italic",
                                        children: purchase.notes
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 513,
                                        columnNumber: 21
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 sm:gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleEdit(purchase),
                                                className: "rounded-lg bg-warning/15 px-4 py-3 text-xs font-semibold text-warning transition hover:bg-warning/25 touch-manipulation min-h-[44px]",
                                                children: "Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 517,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDelete(purchase._id),
                                                className: "rounded-lg bg-danger/15 px-4 py-3 text-xs font-semibold text-danger transition hover:bg-danger/25 touch-manipulation min-h-[44px]",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/purchases/page.js",
                                                lineNumber: 523,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/purchases/page.js",
                                        lineNumber: 516,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, purchase._id, true, {
                                fileName: "[project]/app/dashboard/purchases/page.js",
                                lineNumber: 467,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/purchases/page.js",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/purchases/page.js",
                lineNumber: 413,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/purchases/page.js",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
_s(PurchasesPage, "fHC+Q/3l10xs+c47b/ZF0dLsjhw=");
_c = PurchasesPage;
var _c;
__turbopack_context__.k.register(_c, "PurchasesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_61c48300._.js.map