(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/store/useUIStore.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUIStore",
    ()=>useUIStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
"use client";
;
// Get initial currency from localStorage
const getInitialCurrency = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return localStorage.getItem("currency") || "INR";
    }
    //TURBOPACK unreachable
    ;
};
// Get initial theme from localStorage
const getInitialTheme = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return localStorage.getItem("theme") || "dark";
    }
    //TURBOPACK unreachable
    ;
};
const useUIStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set, get)=>({
        sidebarOpen: false,
        sidebarExpanded: true,
        currency: getInitialCurrency(),
        theme: getInitialTheme(),
        toggleSidebar () {
            set((state)=>({
                    sidebarOpen: !state.sidebarOpen
                }));
        },
        toggleSidebarExpanded () {
            set((state)=>({
                    sidebarExpanded: !state.sidebarExpanded
                }));
        },
        setSidebarExpanded (expanded) {
            set({
                sidebarExpanded: expanded
            });
        },
        setCurrency (currency) {
            set({
                currency
            });
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("currency", currency);
            }
        },
        setTheme (theme) {
            set({
                theme
            });
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("theme", theme);
                document.documentElement.classList.toggle("dark", theme === "dark");
            }
        },
        toggleTheme () {
            const currentTheme = get().theme;
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            get().setTheme(newTheme);
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ThemeProvider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useUIStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/useUIStore.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ThemeProvider({ children }) {
    _s();
    const { theme, setTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useUIStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            // Apply theme on mount
            if ("TURBOPACK compile-time truthy", 1) {
                const savedTheme = localStorage.getItem("theme") || "dark";
                setTheme(savedTheme);
            }
        }
    }["ThemeProvider.useEffect"], [
        setTheme
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ThemeProvider, "xHq+jBlKJlyjBNYfjYds9lI/SRs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$useUIStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUIStore"]
    ];
});
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_8f7dd17a._.js.map