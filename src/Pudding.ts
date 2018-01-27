class Pudding extends egret.Sprite{
    private STEP_ROT:number=3;
    private PUD_WIDTH:number=300;
    private PUD_HEI:number=300;
    private FORK_WIDTH:number=60;
    private FORK_HEI:number=240;
    //插入深度
    private DEPTH=5;
    //当前等级
    private level:number=1;
    //剩余叉子
    private forkNum:number=0;
    //每个等级对应的叉子数量
    private FORK_NUM:Array<number>=[4,6,8,10,12,14,16,18,20,22];
    //每个等级对应的旋转速度
    private SPEED:Array<number>=[3,4,5,6,7,8,9,9,9,9];
    //游戏结束
    private gameOver:boolean=false;

    public constructor(level:number){
        super();
        this.STEP_ROT=this.SPEED[this.level-1];
        this.forkNum=this.FORK_NUM[this.level-1];
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

    }

    private spr:egret.Sprite;
    private onAddToStage(evt:egret.Event){
        this.spr=new egret.Sprite;
        this.loadResource();
        
        this.addChild(this.spr);
        
    }

    //加载资源
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.imageComp,this);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    //绘制提示信息
    private textInfo:egret.TextField;
    private drawInfo():void{
        this.textInfo=new egret.TextField();
        this.addChild(this.textInfo);
        this.textInfo.text=`当前关卡：${this.level}\n剩余叉子数：${this.forkNum}`;
        this.textInfo.textColor=0x0000DD;
        this.textInfo.x=100;
        this.textInfo.y=this.stage.stageHeight*0.75;;
    }
    private updateInfo():void{
        this.textInfo.text=`当前关卡：${this.level}\n剩余叉子数：${this.forkNum}`;
    }

    //绘制甜甜圈容器
    private spr_pud:egret.Sprite;
    private createSprPud():void{
        this.spr_pud=new egret.Sprite;
        this.spr_pud.width=this.PUD_WIDTH+this.FORK_HEI;
        this.spr_pud.height=this.PUD_WIDTH+this.FORK_HEI*2;
        this.spr_pud.anchorOffsetX=this.spr_pud.width/2;
        this.spr_pud.anchorOffsetY=this.spr_pud.height/2;
        this.spr_pud.x=this.stage.stageWidth/2;
        this.spr_pud.y=this.stage.stageHeight*0.3;
        this.spr.addChild(this.spr_pud);
    }



    //绘制甜甜圈
    private pudding_img:egret.Bitmap;
    private drawPudding():void{
        this.pudding_img=new egret.Bitmap;
        this.pudding_img.texture=RES.getRes("pudding_png");
        this.pudding_img.width=this.PUD_WIDTH;
        this.pudding_img.height=this.PUD_HEI;
        this.pudding_img.anchorOffsetX=this.pudding_img.width/2;
        this.pudding_img.anchorOffsetY=this.pudding_img.height/2;
        this.pudding_img.x=this.spr_pud.width/2;
        this.pudding_img.y=this.spr_pud.height/2;
        
        this.spr_pud.addChild(this.pudding_img);
        
    }
    //绘制下方叉子
    private fork_img:egret.Bitmap;
    private drawFork():void{
        this.fork_img=new egret.Bitmap;
        this.fork_img.texture=RES.getRes("fork_png");
        this.fork_img.width=this.FORK_WIDTH;
        this.fork_img.height=this.FORK_HEI;
        this.fork_img.anchorOffsetX=this.fork_img.width/2;
        this.fork_img.anchorOffsetY=this.fork_img.height/2;
        this.fork_img.x=this.stage.stageWidth/2;
        this.fork_img.y=this.stage.stageHeight*0.75;
        this.spr.addChild(this.fork_img);

        
    }

    private imageComp(){
        this.createSprPud();
        this.drawPudding();
        this.drawFork();
        this.launchAnimations();
        this.drawInfo();
        //监听点击事件
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shotFork,this);
    }

    //甜甜圈转动
    private launchAnimations():void {
        this.addEventListener( egret.Event.ENTER_FRAME, this.loopFunc, this );
    }
    private loopFunc(evt:egret.Event){
        this.spr_pud.rotation += this.STEP_ROT;
        return false;  /// 友情提示： startTick 中回调返回值表示执行结束是否立即重绘
    }

    //发射！点击事件回调
    private tween:egret.Tween;
    private shotFork(evt:egret.Event){
        console.log("click");
        this.tween=egret.Tween.get( this.fork_img, { onChange:this.funcChange, onChangeObj:this }  );
        this.tween.to( {x:this.fork_img.x,y:this.spr_pud.y+this.PUD_WIDTH/2+this.FORK_HEI/2-this.DEPTH}, 300, egret.Ease.sineIn )
        .call(this.afterSucc,this);
        //移除点击监听
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.shotFork,this);
    }

    //成功插入后
    private afterSucc(){
        this.addForkToPud();
        
        if( this.fork_img.parent )
        {
            this.fork_img.parent.removeChild( this.fork_img );
        }
        this.fork_img=null;
        this.drawFork();
        if(!this.gameOver){
            this.forkNum--;
        }
        if(this.forkNum==0){
            this.nextLevel(this.level+1);
        }
        this.updateInfo();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shotFork,this);
    }

    //添加叉子
    private addForkToPud(){
        var fork_new =new egret.Bitmap();
        fork_new.texture=RES.getRes("fork_png");
        fork_new.anchorOffsetX=this.FORK_WIDTH/2;
        fork_new.anchorOffsetY=0;
        fork_new.width=this.FORK_WIDTH;
        fork_new.height=this.FORK_HEI; 
        //关键代码
        //注意：该坐标系和笛卡尔坐标系的纵坐标相反！！！！
        //算坐标，公式：
        //x=ox-sin(å)*r(o为原点)
        //y=oy-cos(å)*r
        var ox=this.spr_pud.width/2;
        var oy=this.spr_pud.height/2;
        var r=this.PUD_WIDTH/2-this.DEPTH;
        //注意，math函数为弧度制
        var a=(180-this.spr_pud.rotation)/180*Math.PI;
        //console.log(a);
        var px=ox+Math.sin(a)*r;
        var py=oy-Math.cos(a)*r;
        //console.log(Math.sin(a)*r);
        //console.log(Math.cos(a)*r);
        // fork_new.x=this.spr_pud.width/2;
        // fork_new.y=this.spr_pud.height-this.FORK_HEI-this.DEPTH;
        fork_new.x=px;
        fork_new.y=py;
        fork_new.rotation=-this.spr_pud.rotation;
        this.spr_pud.addChild(fork_new);
        
    }

    //碰撞检测
    private funcChange():void{
        // console.log(this.fork_img.y-this.fork_img.anchorOffsetY);
        // console.log(this.spr_pud.y+this.PUD_WIDTH/2-this.DEPTH)
        var p1x=this.fork_img.x+this.FORK_WIDTH/2;
        var p2x=this.fork_img.x-this.FORK_WIDTH/2;
        var py=parseInt((this.fork_img.y-this.fork_img.anchorOffsetY).toString());
        if(!this.gameOver){//避免多次检测。减少性能开销
            var rsl1:boolean=this.spr_pud.hitTestPoint(p1x,py,true);
            var rsl2:boolean=this.spr_pud.hitTestPoint(p2x,py,true);
            if(rsl1||rsl2){
                //TODO 碰撞检测
                console.log("!!!!!");
                this.gameOver=true;
                this.removeEventListener( egret.Event.ENTER_FRAME, this.loopFunc, this );
            }
        }
    }


    //下一关
    private nextLevel(level:number):void{
        this.level++;
        this.STEP_ROT=this.SPEED[this.level-1];
        this.forkNum=this.FORK_NUM[this.level-1];
        console.log(this.numChildren)
        this.spr_pud.removeChildren();
        this.spr_pud.addChild(this.pudding_img);
        // this.createSprPud();
        // this.drawPudding();
        // this.drawFork();
        // this.launchAnimations();
        // this.drawInfo();
    }
}

