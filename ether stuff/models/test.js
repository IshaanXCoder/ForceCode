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
var user_1 = require("./user");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function testForceCode() {
    return __awaiter(this, void 0, void 0, function () {
        var forceCode, fee, teamRegistration, friendRegistration, contestantAddress, contestant, pointsUpdate, prizePool, distribution, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    forceCode = new user_1.default({
                        providerUrl: process.env.PROVIDER_URL || '', // Your provider URL
                        contractAddress: process.env.CONTRACT_ADDRESS || '', // Your contract address
                        privateKey: process.env.PRIVATE_KEY || '' // Your private key
                    });
                    console.log('🏁 Starting ForceCode Service tests...\n');
                    // 1. Get registration fee
                    console.log('📝 Getting registration fee...');
                    return [4 /*yield*/, forceCode.getRegistrationFee()];
                case 1:
                    fee = _a.sent();
                    console.log("Registration fee: ".concat(fee, " wei\n"));
                    // 2. Register a team
                    console.log('👥 Registering a team...');
                    return [4 /*yield*/, forceCode.registerTeam({
                            codeforcesID: 'player1_cf',
                            discordID: 'player1#1234',
                            friend1Address: '0xc6a1CeBD4cC5aE3ad37925970356Ee26bC859B9E',
                            friend2Address: '0x7b7EaEf766584F54A70D82dc89156459A1F18B9b',
                            friend1CodeforcesID: 'friend1_cf',
                            friend1DiscordID: 'friend1#5678',
                            friend2CodeforcesID: 'friend2_cf',
                            friend2DiscordID: 'friend2#9012'
                        })];
                case 2:
                    teamRegistration = _a.sent();
                    console.log('Team registration transaction receipt:', (teamRegistration === null || teamRegistration === void 0 ? void 0 : teamRegistration.hash) || 'Failed');
                    console.log('Team registered successfully!\n');
                    // 3. Register a friend
                    console.log('👤 Registering a friend...');
                    return [4 /*yield*/, forceCode.registerAsFriend({
                            codeforcesID: 'friend3_cf',
                            discordID: 'friend3#3456'
                        })];
                case 3:
                    friendRegistration = _a.sent();
                    console.log('Friend registration transaction receipt:', (friendRegistration === null || friendRegistration === void 0 ? void 0 : friendRegistration.hash) || 'Failed');
                    console.log('Friend registered successfully!\n');
                    // 4. Get contestant details
                    console.log('🔍 Getting contestant details...');
                    contestantAddress = '0xc6a1CeBD4cC5aE3ad37925970356Ee26bC859B9E';
                    return [4 /*yield*/, forceCode.getContestant(contestantAddress)];
                case 4:
                    contestant = _a.sent();
                    console.log('Contestant details:', contestant, '\n');
                    // 5. Update points (admin only)
                    console.log('📊 Updating contestant points...');
                    return [4 /*yield*/, forceCode.updatePoints(contestantAddress, 100)];
                case 5:
                    pointsUpdate = _a.sent();
                    console.log('Points update transaction receipt:', (pointsUpdate === null || pointsUpdate === void 0 ? void 0 : pointsUpdate.hash) || 'Failed');
                    console.log('Points updated successfully!\n');
                    // 6. Get prize pool
                    console.log('🏆 Getting prize pool...');
                    return [4 /*yield*/, forceCode.getPrizePool()];
                case 6:
                    prizePool = _a.sent();
                    console.log("Current prize pool: ".concat(prizePool, " ETH\n"));
                    // 7. Distribute prizes (admin only)
                    console.log('💰 Distributing prizes...');
                    return [4 /*yield*/, forceCode.distributePrizes()];
                case 7:
                    distribution = _a.sent();
                    console.log('Prize distribution transaction receipt:', (distribution === null || distribution === void 0 ? void 0 : distribution.hash) || 'Failed');
                    console.log('Prizes distributed successfully!\n');
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('❌ Error occurred:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Create a .env file with the following variables:
// PROVIDER_URL=your_provider_url
// CONTRACT_ADDRESS=your_contract_address
// PRIVATE_KEY=your_private_key
// Run the tests
testForceCode()
    .then(function () { return process.exit(0); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
