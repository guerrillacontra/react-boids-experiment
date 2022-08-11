import {Vector2} from "./vector2";
import {Boid} from "./boid";

export type GridPosition = {
    column: number,
    row: number,
}

export type Cell = {
    gridPos: GridPosition,
    canvasPos: Vector2,
    colourHEX: string,
    boids: Boid[]
}

export const generateGridFromCanvas = (canvas: HTMLCanvasElement, cellSize: number, colourHEX: string): Cell[][] => {

    const columns = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);

    const cells: Cell[][] = [];

    for (let row: number = 0; row <= rows; row++) {

        const colCell: Cell[] = [];

        for (let column: number = 0; column <= columns; column++) {
            colCell.push({
                colourHEX,
                gridPos: {row, column},
                canvasPos: {x: column * cellSize, y: row * cellSize},
            } as Cell);
        }

        cells.push(colCell);
    }

    return cells;

}

export const iterateGrid = (cells: Cell[][], callback: (cell: Cell) => void): void => {

    const rows: number = cells.length;
    const columns: number = cells[0].length;

    for (let row: number = 0; row < rows; row++) {

        for (let column: number = 0; column < columns; column++) {

            const cell: Cell = cells[row][column];
            callback(cell)
        }
    }
}

export const getCellFromCanvasPos = (grid:Cell[][], cellSize:number, pos:Vector2) : Cell|null => {

    const row = Math.floor(pos.y / cellSize);
    const col = Math.floor(pos.x / cellSize);

    const rows: number = grid.length;
    const columns: number = grid[0].length;

    if(row < 0 || row >= rows || col < 0 || col >= columns)return null;

    return grid[row][col];
}

export const renderGridLines = (cells: Cell[][], cellSize: number, ctx: CanvasRenderingContext2D, lineWidth: number): void => {

    const rows: number = cells.length;
    const columns: number = cells[0].length;

    ctx.lineWidth = lineWidth;

    for (let column: number = 0; column <= columns; column++) {
        ctx.beginPath();
        ctx.moveTo(column * cellSize, 0);
        ctx.lineTo(column * cellSize, ctx.canvas.height);
        ctx.stroke();
    }

    for (let row: number = 0; row <= rows; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * cellSize);
        ctx.lineTo(ctx.canvas.width, row * cellSize);
        ctx.stroke();
    }

}

export const renderTiles = (ctx: CanvasRenderingContext2D, grid: Cell[][], cellSize: number): void => {

    iterateGrid(grid, (cell) => {
        ctx.fillStyle = cell.colourHEX;
        ctx.fillRect(cell.gridPos.column*cellSize, cell.gridPos.row*cellSize, cellSize, cellSize);
        return true;
    });
}