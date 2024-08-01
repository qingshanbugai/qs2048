import { Rule } from './Rule'
import { matrix4, promptAction } from '@kit.ArkUI';
import { Button } from '@kit.InputKit';

PersistentStorage.persistProp('bestScore', 0);

@Entry
@Component
export struct Index {
  private rule: Rule = new Rule(4)
  private hidden: boolean = false
  private start: string = "开始游戏"
  @State num: number[][] = []
  @State score: number = 0
  @StorageLink('bestScore') bestScore: number = 0 // 最高分
  private endMsg: string = ''
  @State over: boolean = false // 游戏是否结束
  @State translateX: number = 0
  @State translateY: number = 0

  aboutToAppear(): void {
    this.num = this.rule.board.grid
  }

  build() {
    Column() {
      Row() {
        // Image($r('app.media.setting')).width(24).height(24).margin({ left: 16, right: 16 }).onClick(() => {
        //
        // })

        Text('2048').fontWeight(FontWeight.Bold).fontSize(30).layoutWeight(1.0).textAlign(TextAlign.Center)

        Image($r('app.media.refresh')).width(24).height(24).margin({ right: 16, left: 16 }).onClick(() => {
          try {
            promptAction.showDialog({
              title:'温馨提示',
              message: '是否重新开始游戏？',
              buttons: [ {
                text: '取消',
                color: '#000000'
              },
                {
                  text: '确定',
                  color: 'Color.Blue'
                }]
            }).then(data => {
              console.info('showDialog success, click button: ' + data.index);
              if (data.index == 1){
                this.rule = new Rule(4)
                this.num = this.rule.board.grid
              }
            })
          }
          catch (e) {
            console.error(e)
          }
        })
      }.height(50).width('100%').justifyContent(FlexAlign.Center)

      Row() {
        Text(`得分\n${this.score}`)
          .fontColor('#FF9B9B9B')
          .backgroundColor('#FFBDADA0')
          .width(80)
          .height(80)
          .textAlign(TextAlign.Center)
          .lineHeight(25)
          .borderRadius(4)
        Text(`最高分\n${this.bestScore}`)
          .fontColor('#FF9B9B9B')
          .backgroundColor('#FFBDADA0')
          .width(80)
          .height(80)
          .textAlign(TextAlign.Center)
          .lineHeight(25)
          .borderRadius(4)
      }.width('100%').height(80).margin({ top: 16 }).justifyContent(FlexAlign.SpaceAround)

      Row() {
        Stack() {
          GridRow({ gutter: 10, columns: 4 }) {
            ForEach(this.num, (x: number[], index) => {
              ForEach(x, (number: number, index: number) => {
                GridCol() {
                  this.getItemViewBack(number)
                }.width(80).height(80)
              })
            })
          }

          GridRow({ gutter: 10, columns: 4 }) {
            ForEach(this.num, (x: number[], index) => {
              ForEach(x, (number: number, index: number) => {
                GridCol() {
                  this.getItemView(number)
                }.width(80).height(80)
              })
            })
          }
        }.width('100%')
      }
      .backgroundColor(Color.Gray)
      .borderRadius(4)
      .margin({ top: 100, left: 16, right: 16 })
      .padding({
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      })
      .gesture(
        PanGesture({ direction: PanDirection.Right })
          .onActionEnd(() => {
            this.panAction(PanDirection.Right)
            this.translateX = 50
            this.translateY = 0
          })
      )
      .gesture(
        PanGesture({ direction: PanDirection.Left })
          .onActionEnd(() => {
            this.panAction(PanDirection.Left)
            this.translateX = -50
            this.translateY = 0
          })
      )
      .gesture(
        PanGesture({ direction: PanDirection.Down })
          .onActionEnd(() => {
            this.panAction(PanDirection.Down)
            this.translateY = 50
            this.translateX = 0
          })
      )
      .gesture(
        PanGesture({ direction: PanDirection.Up })
          .onActionEnd(() => {
            this.panAction(PanDirection.Up)
            this.translateY = -50
            this.translateX = 0
          })
      )
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Start)
    .backgroundColor($r('app.color.main_background'))
    .expandSafeArea([SafeAreaType.KEYBOARD, SafeAreaType.SYSTEM])
  }

  private panAction(dir: PanDirection) {
    if (this.rule.isOver()) { // 游戏是否结束
      this.gameOver();
    } else {
      this.start = "重新开始"
      let data = this.rule.move(dir);
      this.updateView(data);
    }
  }

  private updateView(data: number[][]) {
    let max = 0
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (data[i][j] != 0 && data[i][j] > max) {
          max = (data[i][j])
        }
      }
    }
    this.num = data
    this.score = max
  }

  private gameOver() {
    this.over = true
    if (this.score >= 2028) {
      this.endMsg = '恭喜达到2048！'
      AppStorage.setOrCreate('bestScore', 2048)
    } else if (this.score > this.bestScore) {
      this.endMsg = '创造新纪录！'
      AppStorage.setOrCreate('bestScore', this.score);
    } else {
      this.endMsg = '游戏结束！'
      if (this.bestScore == 0) {
        AppStorage.setOrCreate('bestScore', this.score);
      }
    }
    // promptAction.showToast({ message: this.endMsg })
    promptAction.showDialog({
      title:'游戏结束',
      message: this.endMsg,
      buttons: [ {
        text: '重新开始',
        color: '#000000'
      }]
    }).then(data => {
      console.info('showDialog success, click button: ' + data.index);
      this.rule = new Rule(4)
      this.num = this.rule.board.grid
    })
  }

  @Builder
  private getItemView(number: number) {
    Row() {
      Text(number.toString()).fontSize(30).fontWeight(FontWeight.Bold).fontColor($r(`app.color.font${number}`))
    }
    .backgroundColor($r(`app.color.view${number}`))
    .width('100%')
    .height('100%')
    .alignItems(VerticalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .animation({
      duration: number == 0 ? 0 : 5000,
      curve: Curve.EaseInOut
    })
    .borderRadius(4)
  }

  @Builder
  private getItemViewBack(number: number) {
    Row() {
      Text(number.toString()).fontSize(30).fontWeight(FontWeight.Bold).fontColor($r(`app.color.font${number}`))
    }
    .backgroundColor($r(`app.color.view${number}`))
    .width('100%')
    .height('100%')
    .alignItems(VerticalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .animation({
      duration: number == 0 ? 0 : 5000,
      curve: Curve.EaseOut
    })
    .borderRadius(4)
  }
}

