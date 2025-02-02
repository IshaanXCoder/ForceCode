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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var dotenv = require("dotenv");
dotenv.config();
var CONTRACT_ABI = [
    "function register(string _codeforcesID, string _discordID, address _friend1, address _friend2, string _friend1CodeforcesID, string _friend1DiscordID, string _friend2CodeforcesID, string _friend2DiscordID) payable external",
    "function registerFriend(string _codeforcesID, string _discordID) payable external",
    "function updatePoints(address _contestantAddress, uint256 _points) external",
    "function distributePrize() external",
    "function contestants(address) public view returns (address wallet, string codeforcesID, string discordID, uint256 points, bool registered)",
    "function registrationFee() public view returns (uint256)",
    "function prizePool() public view returns (uint256)"
];
var ForceCodeService = /** @class */ (function () {
    function ForceCodeService(config) {
        this.provider = new ethers_1.JsonRpcProvider(config.providerUrl);
        this.wallet = new ethers_1.Wallet(config.privateKey, this.provider);
        this.contract = new ethers_1.Contract(config.contractAddress, CONTRACT_ABI, this.wallet);
    }
    // Rest of the class implementation remains the same
    ForceCodeService.prototype.getRegistrationFee = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.registrationFee()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ForceCodeService.prototype.registerTeam = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRegistrationFee()];
                    case 1:
                        fee = _a.sent();
                        return [4 /*yield*/, this.contract.register(params.codeforcesID, params.discordID, params.friend1Address, params.friend2Address, params.friend1CodeforcesID, params.friend1DiscordID, params.friend2CodeforcesID, params.friend2DiscordID, { value: fee })];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ForceCodeService.prototype.registerAsFriend = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var fee, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRegistrationFee()];
                    case 1:
                        fee = _a.sent();
                        return [4 /*yield*/, this.contract.registerFriend(params.codeforcesID, params.discordID, { value: fee })];
                    case 2:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ForceCodeService.prototype.updatePoints = function (contestantAddress, points) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.updatePoints(contestantAddress, points)];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ForceCodeService.prototype.distributePrizes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.distributePrize()];
                    case 1:
                        tx = _a.sent();
                        return [4 /*yield*/, tx.wait()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ForceCodeService.prototype.getContestant = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, wallet, codeforcesID, discordID, points, registered;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.contract.contestants(address)];
                    case 1:
                        _a = _b.sent(), wallet = _a[0], codeforcesID = _a[1], discordID = _a[2], points = _a[3], registered = _a[4];
                        return [2 /*return*/, {
                                wallet: wallet,
                                codeforcesID: codeforcesID,
                                discordID: discordID,
                                points: points.toString(),
                                registered: registered
                            }];
                }
            });
        });
    };
    ForceCodeService.prototype.getPrizePool = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.prizePool()];
                    case 1:
                        pool = _a.sent();
                        return [2 /*return*/, (0, ethers_1.formatEther)(pool)];
                }
            });
        });
    };
    return ForceCodeService;
}());
exports.default = ForceCodeService;
