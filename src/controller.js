export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        let isPlaying = false;

        let intervalId = null;
        let timerSpeed = 1000;

        let keyDown = {
            '37': false,
            '38': false,
            '39': false,
            '40': false,
            '65': false,
            '68': false,
            '83': false,
            '87': false
        }

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.view.renderStartScreen();
    }

    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(state);
        }
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
        if (this.timerSpeed > 1000 - this.game.getState().level * 100) {
            this.stopTimer();
            this.startTimer();
            console.log(1);
        }
    }

    play() {
        this.updateView();
        this.isPlaying = true;
        this.startTimer();
    }

    pause() {
        this.updateView();
        this.isPlaying = false;
        this.stopTimer();
    }

    startTimer() {
        this.timerSpeed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.update()
            }, this.timerSpeed > 0 ? this.timerSpeed : 100);
        }
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
                
            case 65:
            case 37:
                this.game.movePieceLeft();
                this.updateView();
                break;
        
            case 38:
            case 87:
                this.game.rotatePiece();
                this.updateView();
                break;
                    
            case 39:
            case 68:
                this.game.movePieceRight();
                this.updateView();
                break;
                    
            case 40:
            case 83:
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }
}