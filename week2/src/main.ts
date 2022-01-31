import * as PIXI from "pixi.js"

interface AppState {
    velocity: any,
    time: number,
    sprite: PIXI.Sprite,
    graphics: PIXI.Graphics
}

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);
    let sprite = new PIXI.Sprite(
        app.loader.resources['assets/hello-world.png'].texture
    );
    sprite.scale.set(0.5, 0.5);
    sprite.anchor.set(0.5,0.5);
    sprite.x = window.innerWidth / 2 - sprite.width / 2;
    sprite.y = window.innerHeight / 2 - sprite.height / 2;
    // sprite.position.set(
    //     window.innerWidth / 2 - sprite.width / 2,
    //     window.innerHeight / 2 - sprite.height / 2
    // )
    app.stage.addChild(sprite);

    const graphics = new PIXI.Graphics();
    graphics.x = window.innerWidth / 2 - graphics.width / 2;
    graphics.y = window.innerHeight / 2 - graphics.height / 2;
    app.stage.addChild(graphics);

    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        sprite.x = window.innerWidth / 2 - sprite.width / 2;
        sprite.y = window.innerHeight / 2 - sprite.height / 2;
    });

    document.body.appendChild(app.view);

    let time = 0;

    let context: AppState = {
        velocity: { x: 1, y: 1 },
        sprite,
        graphics,
        time
    };

    app.ticker.add(update, context);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(this: any, delta: number) {
    this.time += delta;

    // const scale = (Math.sin(this.time * 0.05) + 1) / 2;
    // this.sprite.scale.set(scale, scale);

    if (this.sprite.x - this.sprite.width/2 <= 0 || this.sprite.x >= window.innerWidth - this.sprite.width/2) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.sprite.y - this.sprite.height/2 <= 0 || this.sprite.y >= window.innerHeight - this.sprite.height/2) {
        this.velocity.y = -this.velocity.y;
    }
    this.sprite.x += this.velocity.x;
    this.sprite.y += this.velocity.y;

    this.graphics.clear()
    this.graphics.position.set(
        this.sprite.position.x, 
        this.sprite.position.y
        )
    this.graphics.lineStyle(10, 0xffffff, 1)
    this.graphics.drawCircle(0, 0, 100)
};

main();

