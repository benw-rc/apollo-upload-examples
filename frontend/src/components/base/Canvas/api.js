import * as d3 from 'd3';

/**
 * Canvas component wraps a simple canvas and provides a number of
 * access features to its context, while also attaching a zoom/pan
 * listener.
 * 
 * When attaching a ref to this component, you gain direct access to:
 * * this.canvas - ref to internal canvas
 * * this.d3_canvas - d3 reference to canvas
 * * this.ctx - canvas context
 * * this.fit_to_screen() - resize content back to canvas size.
 *
 * @param height {number} - canvas height (pixels)
 * @param width {number} - canvas width (pixels)
 * @param draw {func} - function to be called on re-render (drag/zoom)
 * @param onmousemove {func} - function to be called with the mouse position of
 *                             mousemove events.
 * @param onmouseout {func} - function to be called on mouseout events.
 * @param onzoom {func} - function to be called with new transform on drag/zoom
 */
export class Canvas extends Object {
  constructor(el) {
    super(el.props);
    this.el = el;
    this.grid_zoom = null;
    this.initial_scale = 3;
    this.scale_extent = [1/8, 20];
    this.transform = { x: 0, y: 0, k: 1 };
    this.img_props = [ null, 0, 0, 1, 1 ];
  }

  initialize() {
    this.enable_zoom();
    this.draw();
    const d3_canvas = this.d3_canvas();
    d3_canvas.on("mousemove", this.onmousemove);
    d3_canvas.on("mouseout", this.onmouseout);
  }

  /**
   * @return { object } - element props
   */
  props = () => this.el.props;

  /**
   * Calls the element's setState method with the passed args.
   */
  setState = (...args) => this.el.setState(...args);

  /**
   * @return - canvas element
   */
  canvas = () => this.el.refs.canvas;

  /**
   * @return - d3 canvas selection
   */
  d3_canvas = () => d3.select(this.canvas());

  /**
   * @return - canvas context
   */
  ctx = () => this.canvas().getContext('2d');

  /**
   * Callback for onmousemove events.
   *
   * Calls passed onmousemove callback from element with scaled location.
   */
  onmousemove = () => {
    const { offsetX, offsetY } = d3.event;
    const { x, y, k } = this.transform;
    this.props().onmousemove([
      (offsetX - x) / k,
      (offsetY - y) / k,
    ]);
  }

  /**
   * Callback for onmouseout events.
   *
   * Calls passed onmouseout callback from element.
   */
  onmouseout = () => {
    this.props().onmouseout();
  }

  /**
   * Re-draws last image.
   */
  draw = () => {
    if (this.img_props[0] !== null) {
      this.draw_image(...this.img_props);
    }
  }

  /**
   * Calls drawImage on the canvas context with the passed args
   * after setting the translation and scal eot match the trasnform.
   */
  draw_image(...props) {
    const ctx = this.ctx();

    this.img_props = props;

    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.scale(this.transform.k, this.transform.k);
    ctx.drawImage(...this.img_props);

    ctx.restore();
  }

  /**
   * Resets the canvas by toggling its width.
   */
  clear = () => this.canvas().width = this.props().width;

  /**
   * Apply zoom transform on zoom event.
   */
  zoomed = (transform) => {
    this.props().on_zoom(transform);
    this.transform = transform;
    this.clear();
    this.draw();
  }

  /**
   * Register zoom interaction callback.
   */
  enable_zoom = () => {
    const zoomed = () => this.zoomed(d3.event.transform);
    const { width, height } = this.props();

    const w = this.initial_scale * width;
    const h = this.initial_scale * height;

    this.grid_zoom = d3.zoom()
      .scaleExtent(this.scale_extent)
      .translateExtent([[-w, -h], [w, h]])
      .on("zoom", zoomed);
    this.d3_canvas().call(this.grid_zoom);
  }

  /**
   * Apply identity transform
   */
  fit_to_screen = () => {
    this.zoomed({x: 0, y: 0, k: 1});
  }
}

export default Canvas;
