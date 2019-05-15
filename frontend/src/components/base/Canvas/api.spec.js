import * as d3 from 'd3';

import Canvas from './api';

jest.mock('d3');

describe('Canvas component API', () => {
  let el, canvas, ctx, props, mock_canvas;
  beforeEach(() => {
    ctx = {
      drawImage: jest.fn(),
      restore: jest.fn(),
      save: jest.fn(),
      scale: jest.fn(),
      translate: jest.fn(),
    }
    mock_canvas = {
      getContext: jest.fn(() => ctx),
    };
    props = {
      height: 1,
      width: 2,
      draw: jest.fn(),
      onmousemove: jest.fn(),
      onmouseout: jest.fn(),
      on_zoom: jest.fn(),
    };
    el = {
      props,
      refs: { canvas: mock_canvas },
      setState: jest.fn(),
      canvas: jest.fn(() => mock_canvas),
      ctx: jest.fn(() => ctx),
    };
    d3.zoom = jest.fn(() => d3);
    d3.scaleExtent = jest.fn(() => d3);
    d3.translateExtent = jest.fn(() => d3);
    d3.on = jest.fn(() => d3);
    d3.event = { transform: { x: 2, y: 12, k: 120 } };
    canvas = new Canvas(el);
  });
  describe('constructor', () => {
    it('takes an element as constructor arg, and sets default values', () => {
      expect(canvas.el).toEqual(el);
      expect(canvas.grid_zoom).toEqual(null);
      expect(canvas.initial_scale).toEqual(3);
      expect(canvas.scale_extent).toEqual([1/8, 20]);
      expect(canvas.transform).toEqual({ x: 0, y: 0, k: 1 });
      expect(canvas.img_props).toEqual([null, 0, 0, 1, 1]);
    });
  });
  describe('constructed methods', () => {
    describe('initialize', () => {
      const on = jest.fn();
      beforeEach(() => {
        canvas.enable_zoom = jest.fn();
        canvas.draw = jest.fn();
        canvas.d3_canvas = jest.fn(() => ({ on }));
        canvas.onmousemove = jest.fn(() => "On Mouse Move");
        canvas.onmouseout = jest.fn(() => "On Mouse Out");
        canvas.initialize();
      });
      it('enables zoom and calls initial draw', () => {
        expect(canvas.enable_zoom).toHaveBeenCalled();
        expect(canvas.draw).toHaveBeenCalled();
      });
      it('connects mouse events', () => {
        expect(on.mock.calls[0][0]).toEqual('mousemove');
        expect(on.mock.calls[0][1]()).toEqual(canvas.onmousemove());
        expect(on.mock.calls[1][0]).toEqual('mouseout');
        expect(on.mock.calls[1][1]()).toEqual(canvas.onmouseout());
      });
    });
    describe('element accessors', () => {
      it('provides a gettter for the current element props', () => {
        expect(canvas.props()).toEqual(el.props);
      });
      it('provides a shortcut for element setState', () => {
        const args = { some: 'args' };
        canvas.setState(args);
        expect(el.setState).toHaveBeenCalledWith(args);
      });
    });
    describe('onmousemove', () => {
      it('calls onmousemove element prop with mouse offset, scaled by transform', () => {
        canvas.transform = { x: 20, y: 30, k: 10 };
        d3.event = { offsetX: 100, offsetY: 200 };
        const onmousemove = jest.fn();
        canvas.props = jest.fn(() => ({ onmousemove }));
        canvas.onmousemove();
        expect(onmousemove).toHaveBeenCalledWith([8, 17]); // offset - dim / scale
      });
    });
    describe('onmouseout', () => {
      it('calls onmouseout element prop', () => {
        const onmouseout = jest.fn();
        canvas.props = jest.fn(() => ({ onmouseout }));
        canvas.onmouseout();
        expect(onmouseout).toHaveBeenCalled();
      });
    });
    describe('draw', () => {
      it('calls draw_image with img_props if image has loaded', () => {
        canvas.draw_image = jest.fn();
        canvas.draw();
        expect(canvas.draw_image).not.toHaveBeenCalled();
        const props = ['img', 1, 2, 3 ,4 ];
        canvas.img_props = props;
        canvas.draw();
        expect(canvas.draw_image).toHaveBeenCalledWith(...props);
      });
    });
    describe('draw_image', () => {
      it('saves image props, then applies transform, and draws the image', () => {
        const props = ['img', 1, 2, 3 ,4 ];
        const transform = { x: 1, y: 2, k: 3 };
        canvas.transform = transform;
        canvas.draw_image(...props);
        expect(canvas.img_props).toEqual(props);
        expect(ctx.save).toHaveBeenCalled();
        expect(ctx.translate).toHaveBeenCalledWith(transform.x, transform.y);
        expect(ctx.scale).toHaveBeenCalledWith(transform.k, transform.k);
        expect(ctx.drawImage).toHaveBeenCalledWith(...props);
        expect(ctx.restore).toHaveBeenCalled();
      });
    });
    describe('clear', () => {
      it('resets the canvas by reseting its width', () => {
        mock_canvas.width = 23;
        canvas.clear();
        expect(mock_canvas.width).toEqual(props.width);
      });
    });
    describe('zoomed', () => {
      it('calls on_zoom, sets the transform, then clears ctx and calls draw', () => {
        const transform = { x: 1, y: 2, k: 3 };
        canvas.clear = jest.fn();
        canvas.draw = jest.fn();
        canvas.zoomed(transform);
        expect(props.on_zoom).toHaveBeenCalledWith(transform);
        expect(canvas.transform).toEqual(transform);
        expect(canvas.clear).toHaveBeenCalled();
        expect(canvas.draw).toHaveBeenCalled();
      });
    });
    describe('enable_zoom', () => {
      it('sets grid_zoom callback', () => {
        const call = jest.fn();
        canvas.d3_canvas = jest.fn(() => ({ call }));
        canvas.zoomed = jest.fn(() => 'zoomed');
        canvas.enable_zoom();
        expect(canvas.grid_zoom).toEqual(d3);
        expect(call).toHaveBeenCalledWith(d3);
        expect(d3.zoom).toHaveBeenCalled();
        const w = canvas.initial_scale * props.width;
        const h = canvas.initial_scale * props.height;
        expect(d3.scaleExtent).toHaveBeenCalledWith(canvas.scale_extent);
        expect(d3.translateExtent).toHaveBeenCalledWith([[-w, -h], [w, h]]);
        const zoomed = d3.on.mock.calls[0][1];
        expect(canvas.zoomed).not.toHaveBeenCalled();
        expect(zoomed()).toEqual('zoomed');
        expect(canvas.zoomed).toHaveBeenCalledWith(d3.event.transform);
      });
    });
    describe('fit_to_screen', () => {
      it('calls zoomed with identity transform', () => {
        canvas.zoomed = jest.fn();
        canvas.fit_to_screen();
        expect(canvas.zoomed).toHaveBeenCalledWith({ x: 0, y: 0, k: 1 });
      });
    });
  });
});
