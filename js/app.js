


function Furry() {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';

}

function Coin() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

function Game() {
    const self = this;
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    let scoreBoard = document.querySelector('strong');
    this.index = function(x,y) {
        return x + (y * 10);
    }
    this.showFurry = function () {
        self.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }
    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');

    };


    this.startGame = function() {

        setInterval(function () {
            self.moveFurry()

        }, 250);

    };

    this.moveFurry = function () {
        if(this.furry.direction === "right") {
            this.furry.x ++;
        } else if (this.furry.direction === 'left') {
            this.furry.x --;
        } else if (this.furry.direction === 'up') {
            this.furry.y --;
        } else if (this.furry.direction === 'down') {
            this.furry.y ++;
        }


        this.checkCoinCollision();

        this.gameOver();

        this.showFurry();

    };

    this.hideVisibleFurry = function () {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i].classList.remove('furry')
        }
    }
    this.turnFurry = function() {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        };
    };
    this.checkCoinCollision = function () {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            let coinClass = document.querySelector('.coin');
            coinClass.classList.remove("coin");
            this.score++;
            scoreBoard.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.setInterval())
            this.hideVisibleFurry();
            this.board.classList.add('invisible')
            document.querySelector('#over').classList.remove('invisible')

        }
    };
};
document.addEventListener('keydown', function(event){
    ngame.turnFurry(event);
})

const ngame = new Game();
ngame.showCoin();
ngame.startGame();




