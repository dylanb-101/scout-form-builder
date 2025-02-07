import type Input from "./Input";

export default class Group {
    private _inputs: Array<Input> = $state([]);
    private _img: string = $state("");
    private _title: string = $state("New Group");
    private _helpText: string = $state("");

    constructor(title?: string, inputs?: Array<Input>, img?: string, helpText?: string ) {

        this.title = title || this.title;
        this.inputs = inputs || this.inputs;
        this.img = img || this.img;
        this.helpText = helpText || this.helpText;

    }

    addInput(input: Input): void {
        this.inputs.push(input)
    }



    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get inputs(): Array<Input> {
        return this._inputs;
    }

    set inputs(inputs: Array<Input>) {
        this._inputs = inputs;
    }

    get img(): string {
        return this._img;
    }

    set img(img: string) {
        this._img = img;
    }

    get helpText(): string {
        return this._helpText;
    }

    set helpText(helpText: string) {
        this._helpText = helpText;
    }


}