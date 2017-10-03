import { Component, createElement } from "react";
import * as classNames from "classnames";
import { findDOMNode } from "react-dom";
import Bezier from "./bezier";
import Point from "./point";

interface WrapperProps {
    class?: string;
    mxObject: mendix.lib.MxObject;
    style?: string;
}

export interface SignatureProps extends WrapperProps {
    dataUrl: string;
    timeOut?: number;
    penSize?: number;
    maxWidth?: string;
    minWidth?: string;
    velocityFilterWeight?: string;
    penColor?: string;
    height?: number;
    width?: number;
    showgrid?: boolean;
    gridx?: number;
    gridy?: number;
    gridColor?: string;
    gridBorder?: number;
    responsive?: boolean;
    resetCaption?: string;
    responsiveRatio?: string;
    className?: string;
}
export interface Signaturestate {
    signature_set: boolean;
    signature_unset: boolean;
}

export class SignatureCanvas extends Component<SignatureProps, Signaturestate> {
    private canvas: HTMLCanvasElement;
    private movedTo: boolean;
    private divNode: HTMLDivElement;
    private image: HTMLImageElement;
    private isEmpty: boolean;
    private timer: number;
    private points: any[] = [];
    private button: HTMLButtonElement;
    private lastVelocity: number;
    private lastWidth: number;

    constructor(props: SignatureProps) {
        super(props);
        this.movedTo = false;

        this.state = {
            signature_set: false,
            signature_unset: true
        };

        this.getCanvasRef = this.getCanvasRef.bind(this);
        this.getImageRef = this.getImageRef.bind(this);
        this.getButtonRef = this.getButtonRef.bind(this);
        this.finalizeSignature = this.finalizeSignature.bind(this);
        this.showImage = this.showImage.bind(this);
        this.eventResetClicked = this.eventResetClicked.bind(this);

    }

    render() {
        if (this.state.signature_unset) {

            return createElement("div", {
                className: classNames("wgt-Signature", this.props.className),
                ref: (node: HTMLDivElement) => this.divNode = node
            },
                createElement("canvas", {
                    className: classNames("wgt-Signature", this.props.className),
                    gridBorder: this.props.gridBorder + "px solid",
                    gridx: this.props.gridx,
                    gridy: this.props.gridy,
                    height: this.props.height,
                    ref: this.getCanvasRef,
                    style: { border: this.props.gridBorder + "px solid", display: "block" },
                    width: this.props.width
                }),
                createElement("img", {
                    className: classNames("signature_set", this.props.className),
                    height: this.props.height,
                    ref: this.getImageRef,
                    style: { display: "none", opacity: 0.5, border: this.props.gridBorder + "px solid" },
                    width: this.props.width
                }));

        } else if (this.state.signature_set) {
            return createElement("div", {
                className: classNames("wgt-Signature", this.props.className),
                ref: (node: HTMLDivElement) => this.divNode = node
            },
                createElement("canvas", {
                    className: classNames("signture_set", this.props.className),
                    gridBorder: this.props.gridBorder + "px solid",
                    gridx: this.props.gridx,
                    gridy: this.props.gridy,
                    height: this.props.height,
                    ref: this.getCanvasRef,
                    style: { border: this.props.gridBorder + "px solid", display: "none" },
                    width: this.props.width
                }),
                createElement("img", {
                    className: classNames("signature_set", this.props.className),
                    height: this.props.height,
                    ref: this.getImageRef,
                    src: this.image.src,
                    style: { display: "block", opacity: 0.5, border: this.props.gridBorder + "px solid" },
                    width: this.props.width
                }),
                createElement("button", {
                    className: classNames(" signature_set", this.props.className),
                    onClick: this.eventResetClicked,
                    ref: this.getButtonRef,
                    resetCaption: this.props.resetCaption,
                    style: { width: this.canvas.width }
                }, "Reset Signature"));

        }
        return null;
    }

    private getCanvasRef(node2: HTMLCanvasElement) {
        this.canvas = node2;
    }

    private getImageRef(node3: HTMLImageElement) {
        this.image = node3;
    }

    private getButtonRef(node4: HTMLButtonElement) {
        this.button = node4;
    }

    componentDidMount() {
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.resizeCanvas();
        this.setupEvents();
    }

    private resizeCanvas() {
        if (this.props.responsive) {
            const position = findDOMNode(this.divNode).getBoundingClientRect();

            let node_height = this.divNode.offsetHeight;
            let node_width = this.divNode.offsetWidth;
            let ratio = parseFloat(this.props.responsiveRatio as string);

            if (isNaN(ratio)) {
                ratio = 1.5;
            }

            node_width = (position.width > 0 && this.props.responsive)
                ? position.width
                : (position.width < 0 && this.props.responsive)
                    ? this.props.width as number
                    : this.props.width as number;

            if (position.height > 0 && this.props.responsive) {
                const node_width2 = this.divNode.offsetWidth;
                const height = Math.floor(node_width2 / ratio);

                node_height = (position.height < height)
                    ? position.height
                    : (position.height > height)
                        ? height
                        : height;
            } else {
                node_height = this.props.height as number;
            }

            this.canvas.height = node_height;
            this.canvas.width = node_width - 4;
            this.image.height = node_height;
            this.image.width = node_width;
            this.resetCanvas();
        }
    }

    private eventResetClicked() {
        this.resetMxObject();
        this.resetCanvas();
        this.hideImage();

    }

    private resetMxObject() {
        this.props.mxObject.set(this.props.dataUrl, "");
    }

    private hideImage() {
        this.image.src = "";
        this.setState({ signature_set: false, signature_unset: true });
    }

    private showImage() {
        const obj = this.props.mxObject;
        this.image.src = obj.get(this.props.dataUrl) as string;
        this.setState({ signature_set: !this.state.signature_set, signature_unset: !this.state.signature_unset });
    }

    private resetCanvas() {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    }

    private drawGrid() {
        if (!this.props.showgrid) return;
        let x = this.props.gridx as number;
        let y = this.props.gridy as number;
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const width = this.canvas.width as number;
        const height = this.canvas.height as number;

        context.beginPath();

        for (; x < width; x += this.props.gridx as number) {
            context.moveTo(x, 0);
            context.lineTo(x, this.canvas.height);
        }

        for (; y < height; y += this.props.gridy as number) {
            context.moveTo(0, y);
            context.lineTo(this.canvas.width, y);
        }

        context.lineWidth = 1;
        context.strokeStyle = this.props.gridColor as string;
        context.stroke();
    }

    private setupEvents() {
        this.canvas.addEventListener("touchstart", this.handleTouchStart.bind(this));
        this.canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
        this.canvas.addEventListener("touchend", this.handleTouchEnd.bind(this));

        if (this.props.responsive) {
            window.addEventListener("resize", this.resizeCanvas.bind(this));
        }
    }

    private reset() {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const minWidth = parseFloat(this.props.minWidth as string);
        const maxWidth = parseFloat(this.props.maxWidth as string);
        this.points = [];
        this.lastVelocity = 0;
        this.lastWidth = ((minWidth) + (maxWidth) / 2);
        this.isEmpty = true;
        context.fillStyle = this.props.penColor as string;
    }

    private handleTouchStart(event: TouchEvent) {
        const touch = event.changedTouches[0];
        this.strokeBegin(touch);
    }

    private handleTouchMove(event: TouchEvent) {
        event.preventDefault();
        const touch = event.changedTouches[0];
        this.strokeUpdate(touch);
    }

    private handleTouchEnd(event: TouchEvent) {
        const wasCanvasTouched = event.target === this.canvas;
        if (wasCanvasTouched) {
            this.strokeEnd(event);
        }
    }

    private strokeBegin(event: Touch) {
        this.stopTimeout();
        this.reset();
        this.strokeUpdate(event);
    }

    private strokeUpdate(event: Touch) {
        const point = this.createPoint(event);
        this.stopTimeout();
        this.addPoint(point);
    }

    private strokeEnd(event: TouchEvent) {
        event.preventDefault();
        this.stopTimeout();
        const canDrawCurve = this.points.length > 2;
        const point = this.points[0];

        if (!canDrawCurve && point) {
            this.strokeDraw(point);
        }
        this.timer = setTimeout(this.finalizeSignature, this.props.timeOut);
    }

    private strokeDraw(point: Point) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const penSize = (this.props.penSize) ? this.props.penSize : this.penSize();

        context.beginPath();
        this.drawPoint(point.x, point.y, penSize as number);
        context.closePath();
        context.fill();
    }

    private stopTimeout() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
    }

    private finalizeSignature() {
        if (this.props.mxObject) {
            if (this.props.dataUrl) {
                this.props.mxObject.set(this.props.dataUrl, this.canvas.toDataURL());
            } else {
                // tslint:disable-next-line:no-console
                console.error("finalizeSignature: no dataUrl attribute found.");
            }
        }
        this.showImage();
    }

    private penSize() {
        const minWidth = parseFloat(this.props.minWidth as string);
        const maxWidth = parseFloat(this.props.maxWidth as string);
        return (((minWidth) + (maxWidth)) / 2);
    }

    private createPoint(event: Touch) {
        const rect = this.canvas.getBoundingClientRect();
        return new Point(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
    }

    private addPoint(point: Point) {
        const points = this.points;
        let c2;
        let c3;
        let curve;
        let tmp;

        points.push(point);

        if (points.length > 2) {
            // To reduce the initial lag make it work with 3 points
            // by copying the first point to the beginning.
            if (points.length === 3) points.unshift(points[0]);

            tmp = this.calculateCurveControlPoints(points[0], points[1], points[2]);
            c2 = tmp.c2;
            tmp = this.calculateCurveControlPoints(points[1], points[2], points[3]);
            c3 = tmp.c1;
            curve = new Bezier(points[1], c2, c3, points[2]);
            this.addCurve(curve);

            // Remove the first element from the list,
            // so that we always have no more than 4 points in points array.
            points.shift();
        }
    }

    private calculateCurveControlPoints(s1: Point, s2: Point, s3: Point) {
        const dx1 = s1.x - s2.x;
        const dy1 = s1.y - s2.y;
        const dx2 = s2.x - s3.x;
        const dy2 = s2.y - s3.y;

        const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
        const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };

        const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const dxm = (m1.x - m2.x);
        const dym = (m1.y - m2.y);

        const k = l2 / (l1 + l2);
        const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };

        const tx = s2.x - cm.x;
        const ty = s2.y - cm.y;

        return {
            c1: new Point(m1.x + tx, m1.y + ty),
            c2: new Point(m2.x + tx, m2.y + ty)
        };
    }

    private addCurve(curve: Bezier) {
        const startPoint = curve.startPoint;
        const endPoint = curve.endPoint;
        const velocityFilterWeight = parseFloat(this.props.velocityFilterWeight as string);
        let velocity;
        let newWidth;

        velocity = endPoint.velocityFrom(startPoint);
        velocity = (velocityFilterWeight) * velocity
            + (1 - (velocityFilterWeight)) * this.lastVelocity;

        newWidth = this.strokeWidth(velocity);
        this.drawCurve(curve, this.lastWidth, newWidth);

        this.lastVelocity = velocity;
        this.lastWidth = newWidth;
    }

    private strokeWidth(velocity: number) {
        const minWidth = parseFloat(this.props.minWidth as string);
        const maxWidth = parseFloat(this.props.maxWidth as string);
        return Math.max(maxWidth / (velocity + 1), minWidth);
    }

    private drawCurve(curve: Bezier, startWidth: number, endWidth: number) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const widthDelta = endWidth - startWidth;
        let drawSteps;
        let width;
        let i;
        let t;
        let tt;
        let ttt;
        let u;
        let uu;
        let uuu;
        let x;
        let y;

        drawSteps = Math.floor(curve.length());
        context.beginPath();
        for (i = 0; i < drawSteps; i++) {
            // Calculate the Bezier (x, y) coordinate for this step.
            t = i / drawSteps;
            tt = t * t;
            ttt = tt * t;
            u = 1 - t;
            uu = u * u;
            uuu = uu * u;

            x = uuu * curve.startPoint.x;
            x += 3 * uu * t * curve.control1.x;
            x += 3 * u * tt * curve.control2.x;
            x += ttt * curve.endPoint.x;

            y = uuu * curve.startPoint.y;
            y += 3 * uu * t * curve.control1.y;
            y += 3 * u * tt * curve.control2.y;
            y += ttt * curve.endPoint.y;

            width = startWidth + ttt * widthDelta;
            this.drawPoint(x, y, width);
        }
        context.closePath();
        context.fill();
    }

    private drawPoint(x: number, y: number, size: number) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.moveTo(x, y);
        context.arc(x, y, size, 0, 2 * Math.PI, false);
        this.isEmpty = false;
    }
}
