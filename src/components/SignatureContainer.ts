import { Component, createElement } from "react";
import { SignatureCanvas } from "./Signature";

interface WrapperProps {
    mxObject: mendix.lib.MxObject;
}

export interface SignatureContainerProps extends WrapperProps {
    dataUrl: string;
    height?: number;
    width?: number;
    gridx?: number;
    gridy?: number;
    gridColor?: string;
    gridBorder?: number;
    penColor?: string;
    maxWidth?: string;
    minWidth?: string;
    velocityFilterWeight?: string;
    className?: string;
    responsive?: boolean;
    responsiveRatio?: string;
    timeOut?: number;
    showGrid?: boolean;
}

interface SignatureContainerState {
    url: string;
}

export default class SignatureContainer extends Component<SignatureContainerProps, SignatureContainerState> {
    private subscriptionHandles: number[];
    constructor(props: SignatureContainerProps) {
        super(props);
        this.state = {
            url : this.getValue(this.props.dataUrl, this.props.mxObject)
        };
        this.subscriptionHandles = [];
        this.handleSubscriptions = this.handleSubscriptions.bind(this);
    }

    render() {
        return createElement(SignatureCanvas, {
            dataUrl: this.props.dataUrl,
            gridBorder: this.props.gridBorder,
            gridColor: this.props.gridColor,
            gridx: this.props.gridx,
            gridy: this.props.gridy,
            height: this.props.height,
            maxWidth: this.props.maxWidth,
            minWidth: this.props.minWidth,
            mxObject: this.props.mxObject,
            penColor: this.props.penColor,
            responsive: this.props.responsive,
            responsiveRatio: this.props.responsiveRatio,
            showGrid: this.props.showGrid,
            timeOut: this.props.timeOut,
            velocityFilterWeight: this.props.velocityFilterWeight,
            width: this.props.width
        });
    }

    componentWillReceiveProps(newProps: SignatureContainerProps) {
        this.resetSubscriptions(newProps.mxObject);
        this.setState({
            url: this.getValue(this.props.dataUrl, newProps.mxObject)
        });
    }

    private resetSubscriptions(mxObject?: mendix.lib.MxObject) {
        this.subscriptionHandles.forEach(window.mx.data.unsubscribe);

        if (mxObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: this.handleSubscriptions,
                guid: mxObject.getGuid()
            }));
        }
    }

    private handleSubscriptions() {
        this.setState({
            url : this.getValue(this.props.dataUrl, this.props.mxObject)
        });
    }

    private getValue(attributeName: string, mxObject?: mendix.lib.MxObject): string {
        if (mxObject && attributeName) {
           return mxObject.get(attributeName) as string;
        }

        return "";
    }
}
