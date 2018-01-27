var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var Pudding = (function (_super) {
    __extends(Pudding, _super);
    function Pudding(level) {
        var _this = _super.call(this) || this;
        _this.STEP_ROT = 3;
        _this.PUD_WIDTH = 300;
        _this.PUD_HEI = 300;
        _this.FORK_WIDTH = 60;
        _this.FORK_HEI = 240;
        //插入深度
        _this.DEPTH = 5;
        //当前等级
        _this.level = 1;
        //剩余叉子
        _this.forkNum = 0;
        //每个等级对应的叉子数量
        _this.FORK_NUM = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
        //每个等级对应的旋转速度
        _this.SPEED = [3, 4, 5, 6, 7, 8, 9, 9, 9, 9];
        //游戏结束
        _this.gameOver = false;
        _this.STEP_ROT = _this.SPEED[_this.level - 1];
        _this.forkNum = _this.FORK_NUM[_this.level - 1];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Pudding.prototype.onAddToStage = function (evt) {
        this.spr = new egret.Sprite;
        this.loadResource();
        this.addChild(this.spr);
    };
    //加载资源
    Pudding.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.imageComp, this);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Pudding.prototype.drawInfo = function () {
        this.textInfo = new egret.TextField();
        this.addChild(this.textInfo);
        this.textInfo.text = "\u5F53\u524D\u5173\u5361\uFF1A" + this.level + "\n\u5269\u4F59\u53C9\u5B50\u6570\uFF1A" + this.forkNum;
        this.textInfo.textColor = 0x0000DD;
        this.textInfo.x = 100;
        this.textInfo.y = this.stage.stageHeight * 0.75;
        ;
    };
    Pudding.prototype.updateInfo = function () {
        this.textInfo.text = "\u5F53\u524D\u5173\u5361\uFF1A" + this.level + "\n\u5269\u4F59\u53C9\u5B50\u6570\uFF1A" + this.forkNum;
    };
    Pudding.prototype.createSprPud = function () {
        this.spr_pud = new egret.Sprite;
        this.spr_pud.width = this.PUD_WIDTH + this.FORK_HEI;
        this.spr_pud.height = this.PUD_WIDTH + this.FORK_HEI * 2;
        this.spr_pud.anchorOffsetX = this.spr_pud.width / 2;
        this.spr_pud.anchorOffsetY = this.spr_pud.height / 2;
        this.spr_pud.x = this.stage.stageWidth / 2;
        this.spr_pud.y = this.stage.stageHeight * 0.3;
        this.spr.addChild(this.spr_pud);
    };
    Pudding.prototype.drawPudding = function () {
        this.pudding_img = new egret.Bitmap;
        this.pudding_img.texture = RES.getRes("pudding_png");
        this.pudding_img.width = this.PUD_WIDTH;
        this.pudding_img.height = this.PUD_HEI;
        this.pudding_img.anchorOffsetX = this.pudding_img.width / 2;
        this.pudding_img.anchorOffsetY = this.pudding_img.height / 2;
        this.pudding_img.x = this.spr_pud.width / 2;
        this.pudding_img.y = this.spr_pud.height / 2;
        this.spr_pud.addChild(this.pudding_img);
    };
    Pudding.prototype.drawFork = function () {
        this.fork_img = new egret.Bitmap;
        this.fork_img.texture = RES.getRes("fork_png");
        this.fork_img.width = this.FORK_WIDTH;
        this.fork_img.height = this.FORK_HEI;
        this.fork_img.anchorOffsetX = this.fork_img.width / 2;
        this.fork_img.anchorOffsetY = this.fork_img.height / 2;
        this.fork_img.x = this.stage.stageWidth / 2;
        this.fork_img.y = this.stage.stageHeight * 0.75;
        this.spr.addChild(this.fork_img);
    };
    Pudding.prototype.imageComp = function () {
        this.createSprPud();
        this.drawPudding();
        this.drawFork();
        this.launchAnimations();
        this.drawInfo();
        //监听点击事件
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shotFork, this);
    };
    //甜甜圈转动
    Pudding.prototype.launchAnimations = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.loopFunc, this);
    };
    Pudding.prototype.loopFunc = function (evt) {
        this.spr_pud.rotation += this.STEP_ROT;
        return false; /// 友情提示： startTick 中回调返回值表示执行结束是否立即重绘
    };
    Pudding.prototype.shotFork = function (evt) {
        console.log("click");
        this.tween = egret.Tween.get(this.fork_img, { onChange: this.funcChange, onChangeObj: this });
        this.tween.to({ x: this.fork_img.x, y: this.spr_pud.y + this.PUD_WIDTH / 2 + this.FORK_HEI / 2 - this.DEPTH }, 300, egret.Ease.sineIn)
            .call(this.afterSucc, this);
        //移除点击监听
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.shotFork, this);
    };
    //成功插入后
    Pudding.prototype.afterSucc = function () {
        this.addForkToPud();
        if (this.fork_img.parent) {
            this.fork_img.parent.removeChild(this.fork_img);
        }
        this.fork_img = null;
        this.drawFork();
        if (!this.gameOver) {
            this.forkNum--;
        }
        if (this.forkNum == 0) {
            this.nextLevel(this.level + 1);
        }
        this.updateInfo();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shotFork, this);
    };
    //添加叉子
    Pudding.prototype.addForkToPud = function () {
        var fork_new = new egret.Bitmap();
        fork_new.texture = RES.getRes("fork_png");
        fork_new.anchorOffsetX = this.FORK_WIDTH / 2;
        fork_new.anchorOffsetY = 0;
        fork_new.width = this.FORK_WIDTH;
        fork_new.height = this.FORK_HEI;
        //关键代码
        //注意：该坐标系和笛卡尔坐标系的纵坐标相反！！！！
        //算坐标，公式：
        //x=ox-sin(å)*r(o为原点)
        //y=oy-cos(å)*r
        var ox = this.spr_pud.width / 2;
        var oy = this.spr_pud.height / 2;
        var r = this.PUD_WIDTH / 2 - this.DEPTH;
        //注意，math函数为弧度制
        var a = (180 - this.spr_pud.rotation) / 180 * Math.PI;
        //console.log(a);
        var px = ox + Math.sin(a) * r;
        var py = oy - Math.cos(a) * r;
        //console.log(Math.sin(a)*r);
        //console.log(Math.cos(a)*r);
        // fork_new.x=this.spr_pud.width/2;
        // fork_new.y=this.spr_pud.height-this.FORK_HEI-this.DEPTH;
        fork_new.x = px;
        fork_new.y = py;
        fork_new.rotation = -this.spr_pud.rotation;
        this.spr_pud.addChild(fork_new);
    };
    //碰撞检测
    Pudding.prototype.funcChange = function () {
        // console.log(this.fork_img.y-this.fork_img.anchorOffsetY);
        // console.log(this.spr_pud.y+this.PUD_WIDTH/2-this.DEPTH)
        var p1x = this.fork_img.x + this.FORK_WIDTH / 2;
        var p2x = this.fork_img.x - this.FORK_WIDTH / 2;
        var py = parseInt((this.fork_img.y - this.fork_img.anchorOffsetY).toString());
        if (!this.gameOver) {
            var rsl1 = this.spr_pud.hitTestPoint(p1x, py, true);
            var rsl2 = this.spr_pud.hitTestPoint(p2x, py, true);
            if (rsl1 || rsl2) {
                //TODO 碰撞检测
                console.log("!!!!!");
                this.gameOver = true;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.loopFunc, this);
            }
        }
    };
    //下一关
    Pudding.prototype.nextLevel = function (level) {
        this.level++;
        this.STEP_ROT = this.SPEED[this.level - 1];
        this.forkNum = this.FORK_NUM[this.level - 1];
        console.log(this.numChildren);
        this.spr_pud.removeChildren();
        this.spr_pud.addChild(this.pudding_img);
        // this.createSprPud();
        // this.drawPudding();
        // this.drawFork();
        // this.launchAnimations();
        // this.drawInfo();
    };
    return Pudding;
}(egret.Sprite));
__reflect(Pudding.prototype, "Pudding");
//# sourceMappingURL=Pudding.js.map