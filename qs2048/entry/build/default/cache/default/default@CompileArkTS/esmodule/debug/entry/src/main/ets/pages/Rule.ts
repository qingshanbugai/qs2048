import { Board } from "@bundle:com.qingshan.2048/entry/ets/pages/Board";
import type { Cell } from "@bundle:com.qingshan.2048/entry/ets/pages/Board";
export class Rule {
    sizeNum: number = 0;
    board: Board = new Board(4);
    private startData = 2;
    constructor(sizeNum: number) {
        this.sizeNum = sizeNum;
        this.board = new Board(sizeNum);
        this.setDataRandom();
        this.startData = 1;
    }
    addRandomData() {
        if (!this.board.cellEmpty()) {
            let value = Math.random() < 0.9 ? 2 : 4;
            let cell = this.board.selectCell();
            cell.value = value;
            this.update(cell);
        }
    }
    update(cell: Cell) {
        this.board.grid[cell.x][cell.y] = cell.value;
    }
    move(dir: PanDirection): number[][] {
        // 0:上, 1:右, 2:下, 3:左
        let curList = this.formList(dir);
        let list = this.combine(curList);
        let result: number[][] = [[], [], [], []];
        for (let i = 0; i < this.sizeNum; i++)
            for (let j = 0; j < this.sizeNum; j++) {
                switch (dir) {
                    case PanDirection.Up:
                        result[i][j] = list[j][i];
                        break;
                    case PanDirection.Right:
                        result[i][j] = list[i][this.sizeNum - 1 - j];
                        break;
                    case PanDirection.Down:
                        result[i][j] = list[j][this.sizeNum - 1 - i];
                        break;
                    case PanDirection.Left:
                        result[i][j] = list[i][j];
                        break;
                }
            }
        this.board.grid = result;
        this.setDataRandom();
        return result;
    }
    setDataRandom() {
        for (let i = 0; i < this.startData; i++) {
            this.addRandomData();
        }
    }
    formList(dir: PanDirection): number[][] {
        let list: number[][] = [[], [], [], []];
        for (let i = 0; i < this.sizeNum; i++)
            for (let j = 0; j < this.sizeNum; j++) {
                switch (dir) {
                    case PanDirection.Up:
                        list[i].push(this.board.grid[j][i]);
                        break;
                    case PanDirection.Right:
                        list[i].push(this.board.grid[i][this.sizeNum - 1 - j]);
                        break;
                    case PanDirection.Down:
                        list[i].push(this.board.grid[this.sizeNum - 1 - j][i]);
                        break;
                    case PanDirection.Left:
                        list[i].push(this.board.grid[i][j]);
                        break;
                }
            }
        return list;
    }
    combine(list: number[][]): number[][] {
        for (let i = 0; i < list.length; i++) // 数字靠边
            list[i] = this.changeItem(list[i]);
        for (let i = 0; i < this.sizeNum; i++) {
            for (let j = 1; j < this.sizeNum; j++) {
                if (list[i][j - 1] == list[i][j] && list[i][j] != 0) {
                    list[i][j - 1] += list[i][j];
                    list[i][j] = 0;
                }
            }
        }
        for (let i = 0; i < list.length; i++) // 再次数字靠边
            list[i] = this.changeItem(list[i]);
        return list;
    }
    changeItem(item: number[]): number[] {
        let cnt = 0;
        for (let i = 0; i < item.length; i++)
            if (item[i] != 0)
                item[cnt++] = item[i];
        for (let j = cnt; j < item.length; j++)
            item[j] = 0;
        return item;
    }
    isOver() {
        if (!this.board.cellEmpty()) {
            return false;
        }
        else {
            for (let i = 0; i < this.sizeNum; i++) // 左右不等
                for (let j = 1; j < this.sizeNum; j++) {
                    if (this.board.grid[i][j] == this.board.grid[i][j - 1])
                        return false;
                }
            for (let j = 0; j < this.sizeNum; j++) // 上下不等
                for (let i = 1; i < this.sizeNum; i++) {
                    if (this.board.grid[i][j] == this.board.grid[i - 1][j])
                        return false;
                }
        }
        return true;
    }
}
