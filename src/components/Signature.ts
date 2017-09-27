import { Component, createElement } from "react";
import * as classNames from "classnames";
import { findDOMNode } from "react-dom";
import "../ui/Signature.css";

interface WrapperProps {
    class?: string;
    mxObject: mendix.lib.MxObject;
    style?: string;
}

export interface SignatureProps extends WrapperProps {
    dataUrl: string;
    height?: number;
    width?: number;
    gridx?: number;
    gridy?: number;
    gridColor?: string;
    timeOut?: number;
    penColor?: string;
    penSize?: number;
    gridBorder?: number;
    resetCaption?: string;
    className?: string;
    responsive?: boolean;
    responsiveRatio?: string;
    ref?: () => void;
    showgrid?: boolean;
}

export interface Signaturestate {
    signature_set: boolean;
    signature_unset: boolean;
}

export class SignatureCanvas extends Component<SignatureProps, Signaturestate> {

    private divNode: HTMLDivElement;
    private button: HTMLButtonElement;
    private canvas: HTMLCanvasElement;
    private image: HTMLImageElement;
    private timer: number;
    private ongoingTouches: any[] = [];

    constructor(props: SignatureProps) {
        super(props);

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
                    }, "Reset Caption"));

        }
        return null;
    }
    private getCanvasRef(node2: HTMLCanvasElement) {
        this.canvas = node2;
    }

    private getButtonRef(node4: HTMLButtonElement) {
        this.button = node4;
    }

    private getImageRef(node3: HTMLImageElement) {
        this.image = node3;
    }

    componentDidMount() {
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.resizeCanvas();
        this.setupEvents();
    }

    private eventResetClicked() {
            this.resetMxObject();
            this.resetCanvas();
            this.hideImage();
        }

    private resetMxObject() {
        this.props.mxObject.set(this.props.dataUrl, "");
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
                node_height = (this.props.height) as number;
            }
            this.canvas.height = node_height;
            this.canvas.width = node_width - 4;
            this.image.height = node_height;
            this.image.width = node_width;
            this.resetCanvas();
        }
    }

    private hideImage() {
            this.image.src = "";
            this.setState({ signature_set: false, signature_unset: true });
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
        this.canvas.addEventListener("touchstart", this.beginCurve.bind(this));
        this.canvas.addEventListener("touchmove", this.updateCurve.bind(this));
        this.canvas.addEventListener("touchend", this.endCurve.bind(this));

        if (this.props.responsive) {
            window.addEventListener("resize", this.resizeCanvas.bind(this));
        }
    }

    private copyTouch(touch: Touch) {
        return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
    }

    private updateCurve(evt: TouchEvent) {
    evt.preventDefault();
    const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    const canvaspos = findDOMNode(this.canvas).getBoundingClientRect();
    const touches = evt.changedTouches;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < touches.length; i++) {
        const idx = this.ongoingTouchIndexById(touches[i].identifier);

        if (idx >= 0) {
            context.beginPath();
            // tslint:disable-next-line:max-line-length
            context.moveTo(this.ongoingTouches[idx].pageX - canvaspos.left, this.ongoingTouches[idx].pageY - canvaspos.top);
            context.lineTo(touches[i].pageX - canvaspos.left, touches[i].pageY - canvaspos.top);
            context.lineWidth = this.props.penSize as number;
            context.strokeStyle = this.props.penColor as string;
            context.stroke();

            this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i]));  // swap in the new touch record
        } else {
            logger.debug("can't figure out which touch to continue");
        }
    }
}

    private ongoingTouchIndexById(idToFind: number) {
        for (let i = 0; i < this.ongoingTouches.length; i++) {
            const id = this.ongoingTouches[i].identifier;

            if (id === idToFind) {
                return i;
            }
        }
        return -1;
    }

    endCurve(evt: TouchEvent) {
        evt.preventDefault();
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const canvaspos = findDOMNode(this.canvas).getBoundingClientRect();
        const touches = evt.changedTouches;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < touches.length; i++) {
            const idx = this.ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) {
                context.lineWidth = 4;
                context.fillStyle = this.props.penColor as string;
                context.beginPath();
                // tslint:disable-next-line:max-line-length
                context.moveTo(this.ongoingTouches[idx].pageX - canvaspos.left, this.ongoingTouches[idx].pageY - canvaspos.top);
                context.lineTo(touches[i].pageX - canvaspos.left, touches[i].pageY - canvaspos.top);
                this.ongoingTouches.splice(idx, 1);  // remove it; we're done
            } else {
                logger.debug("can't figure out which touch to end");
            }
        }
        this.timer = setTimeout(this.finalizeSignature, this.props.timeOut);
    }

    private beginCurve(e: TouchEvent) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        e.preventDefault();
        const touches = e.changedTouches;

        this.stopTimeout();

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(this.copyTouch(touches[i]));
            context.beginPath();
            context.lineWidth = this.props.penSize as number;
            context.strokeStyle = this.props.penColor as string;
            context.lineJoin = "round";
            context.fill();
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

    private showImage() {
        const obj = this.props.mxObject;
        this.image.src = obj.get(this.props.dataUrl) as string;
        this.setState({ signature_set: !this.state.signature_set, signature_unset: !this.state.signature_unset });
    }

}
