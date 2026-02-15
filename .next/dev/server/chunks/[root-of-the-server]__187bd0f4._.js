module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, {
            dbName: "shopkeeper"
        }).then((mongooseInstance)=>mongooseInstance);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAuthCookies",
    ()=>clearAuthCookies,
    "getAuthUserId",
    ()=>getAuthUserId,
    "setAuthCookies",
    ()=>setAuthCookies,
    "signAccessToken",
    ()=>signAccessToken,
    "signRefreshToken",
    ()=>signRefreshToken,
    "verifyAccessToken",
    ()=>verifyAccessToken,
    "verifyRefreshToken",
    ()=>verifyRefreshToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
function signAccessToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, accessSecret, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m"
    });
}
function signRefreshToken(payload) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, refreshSecret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES || "30d"
    });
}
function verifyAccessToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, accessSecret);
    } catch  {
        return null;
    }
}
function verifyRefreshToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, refreshSecret);
    } catch  {
        return null;
    }
}
function setAuthCookies(response, { accessToken, refreshToken, remember }) {
    const isProd = ("TURBOPACK compile-time value", "development") === "production";
    response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd,
        path: "/",
        maxAge: 60 * 15
    });
    response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: isProd,
        path: "/",
        maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7
    });
}
function clearAuthCookies(response) {
    response.cookies.set("accessToken", "", {
        maxAge: 0,
        path: "/"
    });
    response.cookies.set("refreshToken", "", {
        maxAge: 0,
        path: "/"
    });
}
function getAuthUserId(accessToken) {
    const decoded = verifyAccessToken(accessToken);
    return decoded?.sub || null;
}
}),
"[project]/models/Item.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const ItemSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    userId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    smallPacketsPerBox: {
        type: Number,
        required: true,
        default: 1
    },
    sellingPricePerSmallPacket: {
        type: Number,
        default: 0
    },
    unit: {
        type: String,
        default: "box"
    } // Unit of measurement
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Item || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Item", ItemSchema);
}),
"[project]/models/Purchase.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const PurchaseSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    userId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "User",
        required: true
    },
    itemId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    perItemCost: {
        type: Number,
        required: true
    },
    smallPacketsPerBox: {
        type: Number,
        required: true
    },
    sellingPricePerSmallPacket: {
        type: Number,
        default: 0
    },
    sellingPricePerBox: {
        type: Number,
        default: 0
    },
    profitPerBox: {
        type: Number,
        default: 0
    },
    profitMarginPercent: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Purchase || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("Purchase", PurchaseSchema);
}),
"[project]/app/api/reports/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Item$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Item.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Purchase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Purchase.js [app-route] (ecmascript)");
;
;
;
;
;
function getUserId(request) {
    const token = request.cookies.get("accessToken")?.value;
    const decoded = token ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyAccessToken"])(token) : null;
    return decoded?.sub || null;
}
async function GET(request) {
    const userId = getUserId(request);
    if (!userId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get("type") || "profit"; // profit, inventory, purchases
    const itemId = searchParams.get("itemId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    if (reportType === "purchases") {
        const query = {
            userId
        };
        if (itemId) query.itemId = itemId;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }
        const purchases = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Purchase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(query).sort({
            date: -1
        }).populate("itemId", "name category sku");
        const rows = purchases.map((purchase)=>({
                itemName: purchase.itemId?.name || "N/A",
                category: purchase.itemId?.category || "N/A",
                sku: purchase.itemId?.sku || "N/A",
                date: new Date(purchase.date).toLocaleDateString(),
                quantity: purchase.quantity,
                totalCost: purchase.totalCost,
                perBoxCost: purchase.perItemCost,
                sellingPricePerBox: purchase.sellingPricePerBox,
                profitPerBox: purchase.profitPerBox,
                profitMargin: purchase.profitMarginPercent,
                totalProfit: (purchase.profitPerBox || 0) * (purchase.quantity || 0)
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: rows,
            reportType: "purchases"
        });
    }
    if (reportType === "inventory") {
        const query = {
            userId
        };
        if (itemId) query._id = itemId;
        const items = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Item$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(query).sort({
            name: 1
        });
        const rows = items.map((item)=>({
                name: item.name,
                category: item.category,
                sku: item.sku,
                stock: item.stock,
                smallPacketsPerBox: item.smallPacketsPerBox,
                sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
                sellingPricePerBox: (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1),
                stockValue: (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1) * (item.stock || 0)
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: rows,
            reportType: "inventory"
        });
    }
    // Default: profit report
    const items = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Item$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(itemId ? {
        userId,
        _id: itemId
    } : {
        userId
    });
    const purchaseQuery = {
        userId
    };
    if (itemId) purchaseQuery.itemId = itemId;
    if (startDate || endDate) {
        purchaseQuery.date = {};
        if (startDate) purchaseQuery.date.$gte = new Date(startDate);
        if (endDate) purchaseQuery.date.$lte = new Date(endDate);
    }
    const latestPurchases = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Purchase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(purchaseQuery).sort({
        date: -1
    });
    const purchaseMap = new Map();
    latestPurchases.forEach((purchase)=>{
        if (!purchaseMap.has(purchase.itemId.toString())) {
            purchaseMap.set(purchase.itemId.toString(), purchase);
        }
    });
    const rows = items.map((item)=>{
        const purchase = purchaseMap.get(item._id.toString());
        const cost = purchase?.perItemCost || 0;
        const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
        const profit = sellingPricePerBox - cost;
        const margin = sellingPricePerBox ? Math.round(profit / sellingPricePerBox * 100) : 0;
        return {
            name: item.name,
            category: item.category,
            sku: item.sku,
            smallPacketsPerBox: item.smallPacketsPerBox,
            sellingPricePerSmallPacket: item.sellingPricePerSmallPacket,
            costPerBox: cost,
            sellingPricePerBox,
            profitPerBox: profit,
            margin,
            stock: item.stock,
            totalProfit: profit * (item.stock || 0)
        };
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data: rows,
        reportType: "profit"
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__187bd0f4._.js.map