"use strict";
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
        while (_) try {
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
exports.__esModule = true;
// @ts-ignore
var puppeteer_1 = require("puppeteer");
var discord_js_1 = require("discord.js");
var dotenv_flow_1 = require("dotenv-flow");
var messageHandling_1 = require("./messageHandling");
(0, dotenv_flow_1.config)();
var client = new discord_js_1.Client({ intents: [discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMessages] });
client.on('ready', function () {
    var _a;
    console.log("Logged in as ".concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.tag, "!"));
});
client.login(process.env.BOT_TOKEN);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1["default"].launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setCacheEnabled(false)];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.goto(process.env.PAGE_URL)];
            case 4:
                _a.sent();
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var element, time, stamp, dropName;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, page.reload()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, page.waitForSelector(process.env.SCREENSHOT_ELEMENT)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, page.waitForSelector(process.env.DROP_ELEMENT)];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, page.$(process.env.SCREENSHOT_ELEMENT)];
                            case 4:
                                element = _a.sent();
                                if (!element) return [3 /*break*/, 7];
                                time = new Date();
                                stamp = "".concat(time.getFullYear(), "-").concat(time.getMonth() + 1, "-").concat(time.getDate(), "_").concat(time.getHours(), "-").concat(time.getMinutes());
                                return [4 /*yield*/, element.screenshot({ path: "img/".concat(stamp, ".png") })];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, page.$eval(process.env.DROP_ELEMENT, function (element) {
                                        return element.innerHTML;
                                    })];
                            case 6:
                                dropName = (_a.sent()).replaceAll('\n', '').trim();
                                (0, messageHandling_1["default"])(client, stamp, dropName);
                                _a.label = 7;
                            case 7: return [2 /*return*/];
                        }
                    });
                }); }, 5 * 60 * 1000);
                return [2 /*return*/];
        }
    });
}); })();
