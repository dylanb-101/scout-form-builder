export enum ButtonType {
    DEFAULT = 0,
    CONFIRM = 1,
    CANCEL = 2
}

export default class Button {

    private _type: ButtonType;
    private _text: string = $state("New Button!")
    private _click: () => void;

    constructor(type: ButtonType, text: string, click: () => void) {
        this._type = type;
        this._text = text;
        this._click = click;
    }

    get type(): ButtonType {
        return this._type;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get click(): () => void {
        return this._click;
    }

}