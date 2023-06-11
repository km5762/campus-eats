/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./routes/campus.js":
/*!**************************!*\
  !*** ./routes/campus.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var createClient = (__webpack_require__(/*! @supabase/supabase-js */ "@supabase/supabase-js").createClient);
var express = __webpack_require__(/*! express */ "express");
var router = express.Router();
(__webpack_require__(/*! dotenv */ "dotenv").config)();
var supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
var supabaseKey = process.env.SUPABASE_KEY;
var supabase = createClient(supabaseUrl, supabaseKey);
router.get("/search", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, _a, data, error, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                search = req.query.query;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, supabase
                        .from("campus")
                        .select()
                        .ilike("name", "%".concat(search, "%"))];
            case 2:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    throw error;
                }
                res.json(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;


/***/ }),

/***/ "./routes/dishes.js":
/*!**************************!*\
  !*** ./routes/dishes.js ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var createClient = (__webpack_require__(/*! @supabase/supabase-js */ "@supabase/supabase-js").createClient);
var express = __webpack_require__(/*! express */ "express");
var router = express.Router();
(__webpack_require__(/*! dotenv */ "dotenv").config)();
var supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
var supabaseKey = process.env.SUPABASE_KEY;
var supabase = createClient(supabaseUrl, supabaseKey);
router.get("/:id/dishes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var locationID, _a, data, error, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                locationID = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, supabase
                        .from("dish")
                        .select("*")
                        .eq("location_id", locationID)];
            case 2:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    throw error;
                }
                res.json(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;


/***/ }),

/***/ "./routes/locations.js":
/*!*****************************!*\
  !*** ./routes/locations.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var createClient = (__webpack_require__(/*! @supabase/supabase-js */ "@supabase/supabase-js").createClient);
var express = __webpack_require__(/*! express */ "express");
var router = express.Router();
(__webpack_require__(/*! dotenv */ "dotenv").config)();
var supabaseUrl = "https://praaunntraqzwomikleq.supabase.co";
var supabaseKey = process.env.SUPABASE_KEY;
var supabase = createClient(supabaseUrl, supabaseKey);
router.get("/:id/locations", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var campusID;
    return __generator(this, function (_a) {
        campusID = req.params.id;
        console.log(campusID);
        res.json(queryLocations(campusID));
        return [2 /*return*/];
    });
}); });
function queryLocations(campusID) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, supabase.rpc("fn_get_locations_at", {
                            p_id: campusID,
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error) {
                        throw error;
                    }
                    return [2 /*return*/, data];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error:", error_1);
                    return [2 /*return*/, { error: "Internal Server Error" }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    router: router,
    queryLocations: queryLocations,
};


/***/ }),

/***/ "./server.jsx":
/*!********************!*\
  !*** ./server.jsx ***!
  \********************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SchoolPage = (__webpack_require__(/*! ./src/components/SchoolPage */ "./src/components/SchoolPage.tsx")["default"]);
var React = __webpack_require__(/*! react */ "react");
var campusRouter = __webpack_require__(/*! ./routes/campus */ "./routes/campus.js");
var dishesRouter = __webpack_require__(/*! ./routes/dishes */ "./routes/dishes.js");
var renderToString = (__webpack_require__(/*! react-dom/server */ "react-dom/server").renderToString);
var locations = __webpack_require__(/*! ./routes/locations */ "./routes/locations.js");
var express = __webpack_require__(/*! express */ "express");
var ejs = __webpack_require__(/*! ejs */ "ejs");
var app = express();
var port = process.env.PORT || 3000;
var path = __webpack_require__(/*! path */ "path");
(__webpack_require__(/*! dotenv */ "dotenv").config)();
app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/campus", campusRouter);
app.use("/api/campus", locations.router);
app.use("/api/locations", dishesRouter);
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/campus/:id/locations", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var initialState, campusName, schoolPageApp, filePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, locations.queryLocations(req.params.id)];
            case 1:
                initialState = _a.sent();
                campusName = initialState[0].campus_name;
                initialState = initialState.map(function (location) { return ({
                    id: location.id,
                    name: location.name,
                    rating: location.rating,
                    count: location.dish_count,
                }); });
                schoolPageApp = renderToString(React.createElement(SchoolPage, { locations: initialState, name: campusName }));
                filePath = path.join(__dirname, "dist", "school-page.ejs");
                initialState = JSON.stringify(initialState);
                ejs.renderFile(filePath, { schoolPageApp: schoolPageApp, initialState: initialState, campusName: campusName }, function (err, html) {
                    if (err) {
                        console.error("Error rendering template:", err);
                        return res.status(500).end();
                    }
                    res.send(html);
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});


/***/ }),

/***/ "./src/components/BreadCrumbs.tsx":
/*!****************************************!*\
  !*** ./src/components/BreadCrumbs.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BreadCrumbs)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function BreadCrumbs(_a) {
    var breadCrumbs = _a.breadCrumbs, setBreadCrumbs = _a.setBreadCrumbs, setContentArray = _a.setContentArray, setContentClass = _a.setContentClass;
    function handleBreadCrumbClick(index) {
        var breadCrumb = breadCrumbs[index];
        setContentArray(breadCrumb.cards);
        setContentClass(breadCrumb.class);
        setBreadCrumbs(breadCrumbs.slice(0, index + 1));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bread-crumbs" }, breadCrumbsToButtons(breadCrumbs, handleBreadCrumbClick)));
}
function breadCrumbsToButtons(breadCrumbs, handleBreadCrumbClick) {
    var buttons = [];
    var _loop_1 = function (i) {
        var breadCrumb = breadCrumbs[i];
        buttons.push(react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { key: breadCrumb.class, onClick: function () { return handleBreadCrumbClick(i); } }, breadCrumb.name));
    };
    for (var i = 0; i < breadCrumbs.length; i++) {
        _loop_1(i);
    }
    return buttons;
}


/***/ }),

/***/ "./src/components/ContentContainer.tsx":
/*!*********************************************!*\
  !*** ./src/components/ContentContainer.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContentContainer)
/* harmony export */ });
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material */ "@mui/material");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BreadCrumbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BreadCrumbs */ "./src/components/BreadCrumbs.tsx");
/* harmony import */ var _services_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/cache */ "./src/services/cache.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




function ContentContainer(_a) {
    var locations = _a.locations, campusName = _a.campusName;
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("locations"), contentClass = _b[0], setContentClass = _b[1];
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(locations.map(function (location) { return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LocationCard, { key: location.id, id: location.id, name: location.name, rating: location.rating, count: location.count, onLocationCardClick: handleLocationCardClick })); })), contentArray = _c[0], setContentArray = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        { class: "locations", name: campusName, cards: contentArray },
    ]), breadCrumbs = _d[0], setBreadCrumbs = _d[1];
    function handleLocationCardClick(id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var res, dishes, dishCards;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0,_services_cache__WEBPACK_IMPORTED_MODULE_3__["default"])("location.".concat(id))];
                    case 1:
                        res = _a.sent();
                        dishes = res.map(function (dish) { return (__assign({}, dish)); });
                        dishCards = dishes.map(function (dish) { return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(DishCard, { id: dish.id, name: dish.name, price: dish.price, availability: dish.availability, rating: dish.rating, onDishCardClick: function (id) { return console.log("yee"); } })); });
                        setContentClass("dishes");
                        setBreadCrumbs(function (breadCrumbs) { return __spreadArray(__spreadArray([], breadCrumbs, true), [
                            { class: "dishes", name: name, cards: dishCards },
                        ], false); });
                        setContentArray(dishCards);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_BreadCrumbs__WEBPACK_IMPORTED_MODULE_2__["default"], { breadCrumbs: breadCrumbs, setContentArray: setContentArray, setContentClass: setContentClass, setBreadCrumbs: setBreadCrumbs }),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: contentClass }, contentArray)));
}
function LocationCard(_a) {
    var id = _a.id, name = _a.name, rating = _a.rating, count = _a.count, onLocationCardClick = _a.onLocationCardClick;
    var smallScreen = (0,_mui_material__WEBPACK_IMPORTED_MODULE_0__.useMediaQuery)("(max-width: 890px)");
    var handleButtonClick = function () {
        onLocationCardClick(id, name);
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "location" },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, name),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "rating-container" },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", { className: "decimal-value" }, rating),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_0__.Rating, { name: "read-only", value: smallScreen ? 1 : rating, max: smallScreen ? 1 : 5, precision: 0.25, sx: smallScreen ? { svg: { width: "4vw" } } : undefined, readOnly: true })),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", { onClick: handleButtonClick }, "See all ".concat(count, " dishes"))));
}
function DishCard(_a) {
    var id = _a.id, name = _a.name, price = _a.price, availability = _a.availability, rating = _a.rating, onDishCardClick = _a.onDishCardClick;
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "dish" },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "top-half" },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h2", null, name),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_0__.Rating, { name: "read-only", value: rating, precision: 0.25, readOnly: true })),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: "bottom-half" },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h2", null, "$".concat(price)),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement("h3", null, formatAvailability(availability)))));
}
function formatAvailability(binaryString) {
    var formattedString = "";
    if (binaryString.charAt(0) === "1") {
        formattedString += "Breakfast, ";
    }
    if (binaryString.charAt(1) === "1") {
        formattedString += "Lunch, ";
    }
    if (binaryString.charAt(2) === "1") {
        formattedString += "Dinner";
    }
    // Remove trailing comma and whitespace
    formattedString = formattedString.trim().replace(/,\s*$/, "");
    return formattedString;
}


/***/ }),

/***/ "./src/components/MiniSearchBar.tsx":
/*!******************************************!*\
  !*** ./src/components/MiniSearchBar.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSearchBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchBar */ "./src/components/SearchBar.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



function MiniSearchBar(_a) {
    var placeholder = _a.placeholder;
    var initialState = [];
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialState), suggestions = _b[0], setSuggestions = _b[1];
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), searchValue = _c[0], setSearchValue = _c[1];
    function handleInput(event) {
        return __awaiter(this, void 0, void 0, function () {
            var currentSearch, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentSearch = event.target.value;
                        setSearchValue(currentSearch);
                        result = [];
                        if (!(currentSearch !== "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_1__["default"])(currentSearch)];
                    case 1:
                        result = _a.sent();
                        if (result.length > 5) {
                            result = result.slice(0, 5);
                        }
                        _a.label = 2;
                    case 2:
                        setSuggestions(result);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { type: "search", onInput: handleInput, value: searchValue, placeholder: placeholder }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SearchBar__WEBPACK_IMPORTED_MODULE_2__.Suggestions, { suggestions: suggestions })));
}


/***/ }),

/***/ "./src/components/SchoolPage.tsx":
/*!***************************************!*\
  !*** ./src/components/SchoolPage.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SchoolPage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MiniSearchBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MiniSearchBar */ "./src/components/MiniSearchBar.tsx");
/* harmony import */ var _ContentContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContentContainer */ "./src/components/ContentContainer.tsx");



function SchoolPage(_a) {
    var locations = _a.locations, name = _a.name;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("header", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "/" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", { title: "Campus Eats" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", { media: "(min-width: 400px)", srcSet: "/images/campus-eats-logo-black.svg" }),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: "/images/campus-eats-logo-mini.svg", alt: "campus-eats-logo" }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", { className: "places-at" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Places"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "at"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "search-container" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_MiniSearchBar__WEBPACK_IMPORTED_MODULE_1__["default"], { placeholder: name }))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", { className: "login-signup" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "login" }, "Log in"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: "signup" }, "Sign up"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ContentContainer__WEBPACK_IMPORTED_MODULE_2__["default"], { locations: locations, campusName: name }))));
}


/***/ }),

/***/ "./src/components/SearchBar.tsx":
/*!**************************************!*\
  !*** ./src/components/SearchBar.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Suggestions": () => (/* binding */ Suggestions),
/* harmony export */   "default": () => (/* binding */ SearchBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


function SearchBar() {
    var initialState = [];
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialState), suggestions = _a[0], setSuggestions = _a[1];
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""), searchValue = _b[0], setSearchValue = _b[1];
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("15px"), borderRadius = _c[0], setBorderRadius = _c[1];
    function handleInput(event) {
        return __awaiter(this, void 0, void 0, function () {
            var currentSearch, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentSearch = event.target.value;
                        setSearchValue(currentSearch);
                        result = [];
                        if (!(currentSearch !== "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0,_services_api__WEBPACK_IMPORTED_MODULE_1__["default"])(currentSearch)];
                    case 1:
                        result = _a.sent();
                        if (result.length > 5) {
                            result = result.slice(0, 5);
                        }
                        _a.label = 2;
                    case 2:
                        setSuggestions(result);
                        if (result.length > 0) {
                            setBorderRadius("15px 15px 0px 0px");
                        }
                        else {
                            setBorderRadius("15px");
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { style: { borderRadius: borderRadius }, type: "search", onInput: handleInput, value: searchValue, placeholder: "Find my school!" }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Suggestions, { suggestions: suggestions })));
}
function Suggestions(_a) {
    var suggestions = _a.suggestions;
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "suggestions" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", null, suggestions.map(function (suggestion) { return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", { key: suggestion.id },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "/campus/".concat(suggestion.id, "/locations") },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: "/images/magnify.svg", alt: "Magnify" }),
                suggestion.name))); }))));
}


/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchSearch),
/* harmony export */   "fetchDishes": () => (/* binding */ fetchDishes),
/* harmony export */   "fetchLocations": () => (/* binding */ fetchLocations)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function fetchSearch(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, suggestions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/campus/search?query=".concat(encodeURIComponent(query)))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        // Handle HTTP errors
                        throw new Error("HTTP error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 2:
                    suggestions = _a.sent();
                    return [2 /*return*/, JSON.parse(suggestions)];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error occurred during fetchSearch:", error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchLocations(campusID) {
    return __awaiter(this, void 0, void 0, function () {
        var response, locations, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/campus/".concat(campusID, "/locations"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 2:
                    locations = _a.sent();
                    return [2 /*return*/, JSON.parse(locations)];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error occurred during fetchLocations:", error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchDishes(locationID) {
    return __awaiter(this, void 0, void 0, function () {
        var response, dishes, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/locations/".concat(locationID, "/dishes"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 2:
                    dishes = _a.sent();
                    return [2 /*return*/, JSON.parse(dishes)];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error occurred during fetchDishes:", error_3);
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/services/cache.ts":
/*!*******************************!*\
  !*** ./src/services/cache.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cache": () => (/* binding */ cache),
/* harmony export */   "default": () => (/* binding */ queryThroughCache)
/* harmony export */ });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/services/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var cache = { campus: {}, location: {} };
function queryThroughCache(query) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, type, idString, id, cacheType, fetchData, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(cache);
                    _a = query.split("."), type = _a[0], idString = _a[1];
                    id = parseInt(idString);
                    if (!(type === "campus" || type === "location")) return [3 /*break*/, 2];
                    cacheType = cache[type];
                    if (id in cacheType) {
                        console.log("cached!");
                        return [2 /*return*/, cacheType[id]];
                    }
                    fetchData = type === "campus" ? _api__WEBPACK_IMPORTED_MODULE_0__.fetchLocations : _api__WEBPACK_IMPORTED_MODULE_0__.fetchDishes;
                    return [4 /*yield*/, fetchData(id)];
                case 1:
                    data = _b.sent();
                    cacheType[id] = data;
                    return [2 /*return*/, data];
                case 2: throw new Error("Error: cache type ".concat(type, " does not exist"));
            }
        });
    });
}


/***/ }),

/***/ "@mui/material":
/*!********************************!*\
  !*** external "@mui/material" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("ejs");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./server.jsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map