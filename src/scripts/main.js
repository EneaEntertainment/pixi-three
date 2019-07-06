import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, PointLight, MeshPhongMaterial, AmbientLight } from 'three';
import { Renderer, Container, Sprite, BLEND_MODES } from 'pixi.js';

let tick = 0;

/**
 *
 * Boot
 *
 * @export
 * @class Boot
 */
export default class Boot
{
    /**
     * Creates an instance of Boot.
     */
    constructor()
    {
        // init renderers
        this.initThreeRenderer();
        this.initPixiRenderer();

        // create scenes
        this.createThreeScene();
        this.createPixiScene();

        // render loop
        this.renderLoop = this.renderLoop.bind(this);

        this.renderLoop();

        // resize
        const windowResizeHandler = () =>
        {
            const { innerWidth, innerHeight } = window;

            // three
            this.threeRenderer.setSize(innerWidth, innerHeight);

            this.threeCamera.aspect = window.innerWidth / window.innerHeight;
            this.threeCamera.updateProjectionMatrix();

            // pixi
            this.pixiRenderer.resize(innerWidth, innerHeight);

            // reposition element(s)
            this.onResize(innerWidth, innerHeight);
        };

        windowResizeHandler();

        window.addEventListener('resize', windowResizeHandler);
    }

    /**
     *
     * initThreeRenderer
     *
     */
    initThreeRenderer()
    {
        // renderer
        this.threeRenderer = new WebGLRenderer({ antialias: true, alpha: true });

        // scene
        this.threeScene = new Scene();

        // camera
        this.threeCamera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 16);

        this.threeCamera.position.set(0, 4, 10);
        this.threeCamera.lookAt(0, 0, 0);

        // append renderer
        document.getElementById('canvas-holder').appendChild(this.threeRenderer.domElement);
    }

    /**
     *
     * initPixiRenderer
     *
     */
    initPixiRenderer()
    {
        const options =
        {
            view              : this.threeRenderer.domElement,
            clearBeforeRender : false
        };

        this.pixiRenderer = new Renderer(options);

        this.pixiScene = new Container();
    }

    /**
     *
     * createThreeScene
     *
     */
    createThreeScene()
    {
        this.threeScene.add(new AmbientLight(0x404040));

        const light = new PointLight(0xFFFFFF, 1, 100);

        light.position.set(7, 7, 5);

        this.threeScene.add(light);

        const geometry = new BoxGeometry(5, 5, 5);
        const material = new MeshPhongMaterial({ color: 0x4040c0, shininess: 0.25, specular: 0x808080 });

        this.threeCube = new Mesh(geometry, material);

        this.threeScene.add(this.threeCube);
    }

    /**
     *
     * createPixiScene
     *
     */
    createPixiScene()
    {
        this.pixiSprite = new Sprite.from('images/logos.png');

        this.pixiSprite.anchor.set(0.5);
        this.pixiSprite.blendMode = BLEND_MODES.SCREEN;

        this.pixiScene.addChild(this.pixiSprite);
    }

    /**
     *
     * onResize
     *
     * @param {number} width
     * @param {number} height
     */
    onResize(width, height)
    {
        this.pixiSprite.x = width >> 1;
        this.pixiSprite.y = height >> 1;
    }

    /**
     *
     * renderLoop
     *
     */
    renderLoop()
    {
        requestAnimationFrame(this.renderLoop);

        tick++;

        const d = 0.01;

        this.threeCube.rotation.x -= d;
        this.threeCube.rotation.y -= d;
        this.threeCube.rotation.z -= d;

        this.pixiSprite.scale.set((0.1 * Math.sin(d * tick)) + 1);

        /**
         * https://github.com/pixijs/pixi.js/issues/5411#issuecomment-460868533
         *
         * @ivanpopelyshev thanks!
         */
        this.threeRenderer.state.reset();
        this.pixiRenderer.reset();

        this.threeRenderer.render(this.threeScene, this.threeCamera);

        this.threeRenderer.state.reset();
        this.pixiRenderer.reset();

        this.pixiRenderer.render(this.pixiScene);
    }
}
