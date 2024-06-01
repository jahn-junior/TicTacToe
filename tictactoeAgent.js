// Tic Tac Toe
class Agent {
    constructor() {}

    // 8 1 6
    // 3 5 7
    // 4 9 2

    // Basic minimax approach: ~3075ms
    // Naively moving for first winning state found: ~2750ms
    // Alpha-Beta Pruning: ~2650ms

    minimax(board, isMax, alpha, beta) {

        switch(board.gameOver()) {
            case 1:
                return 1
            case 2:
                return -1
            case 3:
                return 0
        }

        let currentBest = 0
        if (isMax) {
            currentBest = alpha
            // iterates through moves until it finds a winning game
            for (let i = 1; i <= board.cells.length && alpha < beta; i++) {
                if (board.cellFree(i)) {
                    let nextBoard = board.clone()
                    nextBoard.move(i)
                    let testScore = this.minimax(nextBoard, 0, alpha, beta)
                    currentBest = testScore > currentBest ? testScore : currentBest
                    alpha = alpha > currentBest ? alpha : currentBest
                }
            }
        } else {
            currentBest = beta
            // iterates through moves until it finds a winning game
            for (let i = 1; i <= board.cells.length && alpha < beta; i++) {
                if (board.cellFree(i)) {
                    let nextBoard = board.clone()
                    nextBoard.move(i)
                    let testScore = this.minimax(nextBoard, 1, alpha, beta)
                    currentBest = testScore < currentBest ? testScore : currentBest
                    beta = beta < currentBest ? beta : currentBest
                }
            }
        }

        return currentBest
    }

    selectMove(board) {
        let max = Number.MIN_SAFE_INTEGER
        let min = Number.MAX_SAFE_INTEGER

        let maxMove = null
        let minMove = null

        for (let i = 1; i <= board.cells.length; i++) {
            if (board.cellFree(i)) {
                let nextBoard = board.clone()
                nextBoard.move(i)
                let testScore = this.minimax(nextBoard, !board.playerOne, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

                if (testScore > max) {
                    max = testScore
                    maxMove = i
                }

                if (testScore < min) {
                    min = testScore
                    minMove = i
                }

                min = testScore < min ? testScore : min
            }
        }

        return board.playerOne ? maxMove : minMove
    }

}