/**
 * // to do
 *
 * date: 2024/7/30 17:28
 *
 * author: qingshan
 *
 * version: 1.0
 *
 * last modified date: 2024/7/30 17:28.
 */

export class Cell {
  x: number
  y: number
  value: number = 0
  constructor( x: number,  y: number) {
    this.x = x
    this.y = y
  }
}

export  class Board {

  grid: number[][] = []
  private size: number = 0

  constructor(size: number) {
    this.size = size
    for (let i = 0; i < size; i++) {
      this.grid.push([])
      for (let j = 0; j < size; j++) {
        this.grid[i].push(0)
      }
    }
  }

  usefulCell(): Cell[]{
    let cells: Cell[] = [];
    for(let i = 0; i < this.size; i++)
      for(let j = 0; j < this.size; j++) {
        if(this.grid[i][j] == 0) {  // 若可用则记录坐标
          cells.push(new Cell(i, j));
        }
      }
    return cells;
  }

  selectCell(): Cell{
    let cells = this.usefulCell();
    if(cells.length) {
      return cells[Math.floor(Math.random()*cells.length)];
    }
    return new Cell(-1, -1);
  }

  cellEmpty():boolean{
    return this.usefulCell().length == 0;
  }
}
