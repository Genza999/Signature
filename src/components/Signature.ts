import { Component, createElement } from "react";
import * as classNames from "classnames";
import { findDOMNode } from "react-dom";
import "../ui/Signature.css";
// import Bezier from "./bezier";
// import Point from "./point";

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

export interface Coordinates {
    x: number;
    y: number;
}

export class SignatureCanvas extends Component<SignatureProps, Signaturestate> {
    private canvas: HTMLCanvasElement;
    private movedTo: boolean;
    private divNode: HTMLDivElement;
    private image: HTMLImageElement;
    private bezierBuf: any[] = [];
    private button: HTMLButtonElement;
    private timer: number;
    private smoothingpct: number;
    private bezier1: number;
    private bezier2: number;
    private bezier3: number;
    private bezier4: number;

    constructor(props: SignatureProps) {
        super(props);
        this.movedTo = false;
        this.smoothingpct = 0.9;

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
        this.updateCurve = this.updateCurve.bind(this);
        this.endCurve = this.endCurve.bind(this);

    }

    render() {
        if (this.state.signature_unset) {

            return createElement("div", {
                className: classNames("wgt_Signature signature_unset", this.props.className),
                ref: (node: HTMLDivElement) => this.divNode = node
            },
                createElement("canvas", {
                    gridx: this.props.gridx,
                    gridy: this.props.gridy,
                    height: this.props.height,
                    ref: this.getCanvasRef,
                    style: { border: this.props.gridBorder + "px solid", display: "block" },
                    width: this.props.width
                }),
                createElement("img", {
                    height: this.props.height,
                    ref: this.getImageRef,
                    style: { display: "none", opacity: 0.5, border: this.props.gridBorder + "px solid" },
                    width: this.props.width
                }));

        } else if (this.state.signature_set) {
            return createElement("div", {
                className: classNames("wgt_Signature signature_set", this.props.className),
                ref: (node: HTMLDivElement) => this.divNode = node
            },
                createElement("canvas", {
                    gridx: this.props.gridx,
                    gridy: this.props.gridy,
                    height: this.props.height,
                    ref: this.getCanvasRef,
                    style: { border: this.props.gridBorder + "px solid", display: "none" },
                    width: this.props.width
                }),
                createElement("img", {
                    height: this.props.height,
                    ref: this.getImageRef,
                    src: this.image.src,
                    style: { display: "block", opacity: 0.5, border: this.props.gridBorder + "px solid" },
                    width: this.props.width
                }),
                createElement("button", {
                    className: classNames(" btn", this.props.className),
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
        this.setUpWidget();
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

    private setUpWidget() {
        const t = this.smoothingpct;
        const u = 1 - t;
        // https://javascript.info/bezier-curve
        // P = (1−t)3P1 + 3(1−t)2tP2 +3(1−t)t2P3 + t3P4
        this.bezier1 = t * t * t;
        this.bezier2 = 3 * t * t * u;
        this.bezier3 = 3 * t * u * u;
        this.bezier4 = u * u * u;

        this.bezierBuf = [];
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
        this.canvas.addEventListener("pointerdown", this.beginCurve.bind(this));

        if (this.props.responsive) {
            window.addEventListener("resize", this.resizeCanvas.bind(this));
        }
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

    private beginCurve(e: PointerEvent) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        e.preventDefault();
        e.stopPropagation();

        this.bezierBuf = [];

        this.stopTimeout();

        context.lineWidth = this.props.penSize as number;
        context.strokeStyle = this.props.penColor as string;
        context.lineJoin = "round";
        context.beginPath();
        this.canvas.addEventListener("pointermove", this.updateCurve);
        this.canvas.addEventListener("pointerup", this.endCurve);
    }

    private updateCurve(e: PointerEvent) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        e.preventDefault();
        e.stopPropagation();

        this.stopTimeout();

        if (this.movedTo) {
            this.bezierBuf.push(this.getCoords(e));

            if (this.bezierBuf.length === 4) {
                const point = this.bezierPoint.apply(this, this.bezierBuf);

                context.lineTo(point.x, point.y);
                context.stroke();

                this.bezierBuf.shift();
                this.bezierBuf[0] = point;

            }
        } else {
            context.moveTo(this.getCoords(e).x, this.getCoords(e).y);
            this.movedTo = true;
        }
    }

    private getCoords(e: PointerEvent) {
        const pos = this.canvas.getBoundingClientRect();
        const pageX = e.pageX;
        const pageY = e.pageY;
        const x = Math.floor(pageX - pos.left);
        const y = Math.floor(pageY - pos.top);

        return { x, y };
    }

    private bezierPoint(c1: Coordinates, c2: Coordinates, c3: Coordinates, c4: Coordinates) {
        return {
            x: c1.x * this.bezier1 + c2.x * this.bezier2 +
            c3.x * this.bezier3 + c4.x * this.bezier4,
            y: c1.y * this.bezier1 + c2.y * this.bezier2 +
            c3.y * this.bezier3 + c4.y * this.bezier4
        };
    }

    private endCurve(e: PointerEvent) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        e.preventDefault();
        e.stopPropagation();

        this.stopTimeout();
        // Finish last points in Bezier buffer
        this.bezierBuf.forEach((position: Coordinates) => {
            context.lineTo(position.x, position.y);
        }, this);

        context.stroke();
        this.canvas.removeEventListener("pointermove", this.updateCurve);
        this.canvas.removeEventListener("pointerup", this.endCurve);
        this.timer = setTimeout(this.finalizeSignature, this.props.timeOut);
    }

}
