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
"[project]/models/SellingPrice.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const SellingPriceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
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
    sellingPrice: {
        type: Number,
        required: true
    },
    bulkPrice: {
        type: Number
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.SellingPrice || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model("SellingPrice", SellingPriceSchema);
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
"[project]/app/api/analytics/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Purchase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Purchase.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$SellingPrice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/SellingPrice.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Item$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Item.js [app-route] (ecmascript)");
;
;
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
    const period = searchParams.get("period") || "6months"; // week, month, year, 6months
    const itemId = searchParams.get("itemId");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDB"])();
    const userObjectId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].Types.ObjectId(userId);
    // Build date filter based on period
    const now = new Date();
    let startDate = new Date();
    let seriesCount = 6;
    switch(period){
        case "week":
            startDate.setDate(now.getDate() - 7);
            seriesCount = 7;
            break;
        case "month":
            startDate.setMonth(now.getMonth() - 1);
            seriesCount = 30;
            break;
        case "year":
            startDate.setFullYear(now.getFullYear() - 1);
            seriesCount = 12;
            break;
        case "6months":
        default:
            startDate.setMonth(now.getMonth() - 6);
            seriesCount = 6;
    }
    const purchaseQuery = {
        userId: userObjectId,
        date: {
            $gte: startDate
        }
    };
    if (itemId) purchaseQuery.itemId = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].Types.ObjectId(itemId);
    const [purchaseTotal, items, prices, purchases] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Purchase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].aggregate([
            {
                $match: purchaseQuery
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalCost"
                    },
                    totalProfit: {
                        $sum: {
                            $multiply: [
                                "$profitPerBox",
                                "$quantity"
                            ]
                        }
                    }
                }
            }
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Item$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(itemId ? {
            userId,
            _id: itemId
        } : {
            userId
        }).lean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$SellingPrice$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
            userId
        }).lean(),
        __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Purchase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(purchaseQuery).sort({
            date: -1
        }).lean()
    ]);
    const monthLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const buildSeries = (count, type = "month")=>{
        const series = [];
        if (type === "month") {
            for(let i = count - 1; i >= 0; i -= 1){
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                series.push({
                    key,
                    label: monthLabels[date.getMonth()],
                    value: 0,
                    profit: 0,
                    count: 0
                });
            }
        } else if (type === "day") {
            for(let i = count - 1; i >= 0; i -= 1){
                const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                series.push({
                    key,
                    label: `${date.getMonth() + 1}/${date.getDate()}`,
                    value: 0,
                    profit: 0,
                    count: 0
                });
            }
        }
        return series;
    };
    const purchaseSeries = period === "week" || period === "month" ? buildSeries(seriesCount, "day") : buildSeries(seriesCount, "month");
    const purchaseMap = new Map(purchaseSeries.map((entry)=>[
            entry.key,
            entry
        ]));
    purchases.forEach((purchase)=>{
        const date = new Date(purchase.date || purchase.createdAt || Date.now());
        let key;
        if (period === "week" || period === "month") {
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        } else {
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        }
        const entry = purchaseMap.get(key);
        if (entry) {
            entry.value += purchase.totalCost || 0;
            entry.profit += (purchase.profitPerBox || 0) * (purchase.quantity || 0);
            entry.count += purchase.quantity || 0;
        }
    });
    const marginSeries = period === "week" || period === "month" ? buildSeries(seriesCount, "day") : buildSeries(seriesCount, "month");
    const marginTotals = new Map(marginSeries.map((entry)=>[
            entry.key,
            {
                sum: 0,
                count: 0
            }
        ]));
    purchases.forEach((purchase)=>{
        const margin = purchase.profitMarginPercent || 0;
        const date = new Date(purchase.date || purchase.createdAt || Date.now());
        let key;
        if (period === "week" || period === "month") {
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        } else {
            key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        }
        const bucket = marginTotals.get(key);
        if (bucket && Number.isFinite(margin)) {
            bucket.sum += parseFloat(margin);
            bucket.count += 1;
        }
    });
    marginSeries.forEach((entry)=>{
        const bucket = marginTotals.get(entry.key);
        if (bucket && bucket.count > 0) {
            entry.value = Math.round(bucket.sum / bucket.count);
        }
    });
    const purchaseValue = purchaseTotal[0]?.total || 0;
    const totalProfit = purchaseTotal[0]?.totalProfit || 0;
    let salesValue = 0;
    let netProfit = 0;
    let lowStockCount = 0;
    const topItems = items.map((item)=>{
        const latestPurchase = purchases.find((p)=>p.itemId.toString() === item._id.toString());
        const cost = latestPurchase?.perItemCost || 0;
        const sellingPricePerBox = (item.sellingPricePerSmallPacket || 0) * (item.smallPacketsPerBox || 1);
        const profit = sellingPricePerBox - cost;
        const stockValue = sellingPricePerBox * (item.stock || 0);
        const margin = sellingPricePerBox ? Math.round(profit / sellingPricePerBox * 100) : 0;
        salesValue += stockValue;
        netProfit += profit * (item.stock || 0);
        if ((item.stock || 0) <= 5) {
            lowStockCount += 1;
        }
        return {
            itemId: item._id.toString(),
            name: item.name,
            margin,
            stock: item.stock,
            stockValue
        };
    }).sort((a, b)=>b.margin - a.margin).slice(0, 6);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        data: {
            totals: {
                itemCount: items.length,
                purchaseValue,
                salesValue: Math.round(salesValue),
                netProfit: Math.round(netProfit),
                totalProfit: Math.round(totalProfit),
                lowStockCount
            },
            trends: {
                purchases: purchaseSeries.map(({ label, value, profit, count })=>({
                        label,
                        value,
                        profit,
                        count
                    })),
                margins: marginSeries.map(({ label, value })=>({
                        label,
                        value
                    }))
            },
            topItems
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2732d67f._.js.map