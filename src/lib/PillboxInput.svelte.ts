import Input from "./Input";

export enum PillBoxOrientation {
    HORIZONTAL = 0,
    VERTICAL = 1
}

export default class PillboxInput extends Input {
    private _required: boolean = $state(false);
    private _questionText: string = $state("New Pillbox");
    private _helpText: string = $state("");
    private _options: string[] = $state([]);
    private _values: any[] = $state([]);
    private _orientation: PillBoxOrientation = $state(0)
    private _defaultValue: any = $state(this._values[0])
    private _id: string = $state("");
    
    addOption(displayText: string, value: any) {
        this.options.push(displayText);
        this.values.push(value);
    }

    updateOptions(options: {text: string, value: any}[]) {
        let o: string[] = [];
        let v: any[] = [];
        options.forEach((opt) => {
            o.push(opt.text);
            v.push(opt.value);
        });
        this.options = o;
        this.values = v;

    }

    // getters and setters

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = value;
    }

    get questionText(): string {
        return this._questionText;
    }

    set questionText(value: string) {
        this._questionText = value;
    }

    get helpText(): string {
        return this._helpText;
    }

    set helpText(value: string) {
        this._helpText = value;
    }

    get options(): string[] {
        return this._options;
    }

    set options(value: string[]) {
        this._options = value;
    }

    get values(): any[] {
        return this._values;
    }

    set values(value: any[]) {
        this._values = value;
    }

    get orientation(): PillBoxOrientation {
        return this._orientation;
    }

    set orientation(value: PillBoxOrientation) {
        this._orientation = value;
    }

    get defaultValue(): any {
        return this._defaultValue;
    }

    set defaultValue(value: any) {
        this._defaultValue = value;
    }
    
}