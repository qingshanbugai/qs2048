if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    rule?: Rule;
    hidden?: boolean;
    start?: string;
    num?: number[][];
    score?: number;
    bestScore?: number;
    endMsg?: string;
    over?: boolean;
    translateX?: number;
    translateY?: number;
}
import { Rule } from "@bundle:com.qingshan.2048/entry/ets/pages/Rule";
import promptAction from "@ohos:promptAction";
PersistentStorage.persistProp('bestScore', 0);
export class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.rule = new Rule(4);
        this.hidden = false;
        this.start = "开始游戏";
        this.__num = new ObservedPropertyObjectPU([], this, "num");
        this.__score = new ObservedPropertySimplePU(0, this, "score");
        this.__bestScore = this.createStorageLink('bestScore', 0 // 最高分
        , "bestScore");
        this.endMsg = '';
        this.__over = new ObservedPropertySimplePU(false // 游戏是否结束
        , this, "over");
        this.__translateX = new ObservedPropertySimplePU(0, this, "translateX");
        this.__translateY = new ObservedPropertySimplePU(0, this, "translateY");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.rule !== undefined) {
            this.rule = params.rule;
        }
        if (params.hidden !== undefined) {
            this.hidden = params.hidden;
        }
        if (params.start !== undefined) {
            this.start = params.start;
        }
        if (params.num !== undefined) {
            this.num = params.num;
        }
        if (params.score !== undefined) {
            this.score = params.score;
        }
        if (params.endMsg !== undefined) {
            this.endMsg = params.endMsg;
        }
        if (params.over !== undefined) {
            this.over = params.over;
        }
        if (params.translateX !== undefined) {
            this.translateX = params.translateX;
        }
        if (params.translateY !== undefined) {
            this.translateY = params.translateY;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__num.purgeDependencyOnElmtId(rmElmtId);
        this.__score.purgeDependencyOnElmtId(rmElmtId);
        this.__bestScore.purgeDependencyOnElmtId(rmElmtId);
        this.__over.purgeDependencyOnElmtId(rmElmtId);
        this.__translateX.purgeDependencyOnElmtId(rmElmtId);
        this.__translateY.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__num.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
        this.__bestScore.aboutToBeDeleted();
        this.__over.aboutToBeDeleted();
        this.__translateX.aboutToBeDeleted();
        this.__translateY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private rule: Rule;
    private hidden: boolean;
    private start: string;
    private __num: ObservedPropertyObjectPU<number[][]>;
    get num() {
        return this.__num.get();
    }
    set num(newValue: number[][]) {
        this.__num.set(newValue);
    }
    private __score: ObservedPropertySimplePU<number>;
    get score() {
        return this.__score.get();
    }
    set score(newValue: number) {
        this.__score.set(newValue);
    }
    private __bestScore: ObservedPropertyAbstractPU<number>; // 最高分
    get bestScore() {
        return this.__bestScore.get();
    }
    set bestScore(newValue: number) {
        this.__bestScore.set(newValue);
    }
    private endMsg: string;
    private __over: ObservedPropertySimplePU<boolean>; // 游戏是否结束
    get over() {
        return this.__over.get();
    }
    set over(newValue: boolean) {
        this.__over.set(newValue);
    }
    private __translateX: ObservedPropertySimplePU<number>;
    get translateX() {
        return this.__translateX.get();
    }
    set translateX(newValue: number) {
        this.__translateX.set(newValue);
    }
    private __translateY: ObservedPropertySimplePU<number>;
    get translateY() {
        return this.__translateY.get();
    }
    set translateY(newValue: number) {
        this.__translateY.set(newValue);
    }
    aboutToAppear(): void {
        this.num = this.rule.board.grid;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Start);
            Column.backgroundColor({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.qingshan.2048", "moduleName": "entry" });
            Column.expandSafeArea([SafeAreaType.KEYBOARD, SafeAreaType.SYSTEM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(50);
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
            //
            // })
            Text.create('2048');
            // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
            //
            // })
            Text.fontWeight(FontWeight.Bold);
            // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
            //
            // })
            Text.fontSize(30);
            // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
            //
            // })
            Text.layoutWeight(1.0);
            // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
            //
            // })
            Text.textAlign(TextAlign.Center);
        }, Text);
        // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
        //
        // })
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777221, "type": 20000, params: [], "bundleName": "com.qingshan.2048", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.margin({ right: 16, left: 16 });
            Image.onClick(() => {
                try {
                    promptAction.showDialog({
                        title: '温馨提示',
                        message: '是否重新开始游戏？',
                        buttons: [{
                                text: '取消',
                                color: '#000000'
                            },
                            {
                                text: '确定',
                                color: 'Color.Blue'
                            }]
                    }).then(data => {
                        console.info('showDialog success, click button: ' + data.index);
                        if (data.index == 1) {
                            this.rule = new Rule(4);
                            this.num = this.rule.board.grid;
                        }
                    });
                }
                catch (e) {
                    console.error(e);
                }
            });
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(80);
            Row.margin({ top: 16 });
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`得分\n${this.score}`);
            Text.fontColor('#FF9B9B9B');
            Text.backgroundColor('#FFBDADA0');
            Text.width(80);
            Text.height(80);
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(25);
            Text.borderRadius(4);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`最高分\n${this.bestScore}`);
            Text.fontColor('#FF9B9B9B');
            Text.backgroundColor('#FFBDADA0');
            Text.width(80);
            Text.height(80);
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(25);
            Text.borderRadius(4);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.backgroundColor(Color.Gray);
            Row.borderRadius(4);
            Row.margin({ top: 100, left: 16, right: 16 });
            Row.padding({
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
            });
            Gesture.create(GesturePriority.Low);
            PanGesture.create({ direction: PanDirection.Right });
            PanGesture.onActionEnd(() => {
                this.panAction(PanDirection.Right);
                this.translateX = 50;
                this.translateY = 0;
            });
            PanGesture.pop();
            Gesture.pop();
            Gesture.create(GesturePriority.Low);
            PanGesture.create({ direction: PanDirection.Left });
            PanGesture.onActionEnd(() => {
                this.panAction(PanDirection.Left);
                this.translateX = -50;
                this.translateY = 0;
            });
            PanGesture.pop();
            Gesture.pop();
            Gesture.create(GesturePriority.Low);
            PanGesture.create({ direction: PanDirection.Down });
            PanGesture.onActionEnd(() => {
                this.panAction(PanDirection.Down);
                this.translateY = 50;
                this.translateX = 0;
            });
            PanGesture.pop();
            Gesture.pop();
            Gesture.create(GesturePriority.Low);
            PanGesture.create({ direction: PanDirection.Up });
            PanGesture.onActionEnd(() => {
                this.panAction(PanDirection.Up);
                this.translateY = -50;
                this.translateX = 0;
            });
            PanGesture.pop();
            Gesture.pop();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({ gutter: 10, columns: 4 });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const x = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const number = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            GridCol.create();
                            GridCol.width(80);
                            GridCol.height(80);
                        }, GridCol);
                        this.getItemViewBack.bind(this)(number, this);
                        GridCol.pop();
                    };
                    this.forEachUpdateFunction(elmtId, x, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
            };
            this.forEachUpdateFunction(elmtId, this.num, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        GridRow.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({ gutter: 10, columns: 4 });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const x = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const number = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            GridCol.create();
                            GridCol.width(80);
                            GridCol.height(80);
                        }, GridCol);
                        this.getItemView.bind(this)(number, this);
                        GridCol.pop();
                    };
                    this.forEachUpdateFunction(elmtId, x, forEachItemGenFunction, undefined, true, false);
                }, ForEach);
                ForEach.pop();
            };
            this.forEachUpdateFunction(elmtId, this.num, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        GridRow.pop();
        Stack.pop();
        Row.pop();
        Column.pop();
    }
    private panAction(dir: PanDirection) {
        if (this.rule.isOver()) { // 游戏是否结束
            this.gameOver();
        }
        else {
            this.start = "重新开始";
            let data = this.rule.move(dir);
            this.updateView(data);
        }
    }
    private updateView(data: number[][]) {
        let max = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (data[i][j] != 0 && data[i][j] > max) {
                    max = (data[i][j]);
                }
            }
        }
        this.num = data;
        this.score = max;
    }
    private gameOver() {
        this.over = true;
        if (this.score >= 2028) {
            this.endMsg = '恭喜达到2048！';
            AppStorage.setOrCreate('bestScore', 2048);
        }
        else if (this.score > this.bestScore) {
            this.endMsg = '创造新纪录！';
            AppStorage.setOrCreate('bestScore', this.score);
        }
        else {
            this.endMsg = '游戏结束！';
            if (this.bestScore == 0) {
                AppStorage.setOrCreate('bestScore', this.score);
            }
        }
        // promptAction.showToast({ message: this.endMsg })
        promptAction.showDialog({
            title: '温馨提示',
            message: this.endMsg,
            buttons: [{
                    text: '重新开始',
                    color: '#000000'
                }]
        });
    }
    private getItemView(number: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Context.animation({
                duration: number == 0 ? 0 : 5000,
                curve: Curve.EaseOut
            });
            Row.backgroundColor({ "id": -1, "type": -1, params: [`app.color.view${number}`], "bundleName": "com.qingshan.2048", "moduleName": "entry" });
            Row.width('100%');
            Row.height('100%');
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.Center);
            Context.animation(null);
            Row.borderRadius(4);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(number.toString());
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": -1, "type": -1, params: [`app.color.font${number}`], "bundleName": "com.qingshan.2048", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
    }
    private getItemViewBack(number: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Context.animation({
                duration: number == 0 ? 0 : 5000,
                curve: Curve.EaseOut
            });
            Row.backgroundColor({ "id": -1, "type": -1, params: [`app.color.view${number}`], "bundleName": "com.qingshan.2048", "moduleName": "entry" });
            Row.width('100%');
            Row.height('100%');
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.Center);
            Context.animation(null);
            Row.borderRadius(4);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(number.toString());
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": -1, "type": -1, params: [`app.color.font${number}`], "bundleName": "com.qingshan.2048", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.qingshan.2048", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });
