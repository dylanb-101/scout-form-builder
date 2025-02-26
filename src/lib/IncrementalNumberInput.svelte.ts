import Input from "./Input";

export default class IncrementalNumberInput extends Input {
    private _required: boolean = $state(false);
    private _questionText: string = $state("New Incremnetal Number");
    private _helpText: string = $state("");
    private _defaultValue: number = $state(0);
    private _min: number = $state(0);
    private _max: number = $state(100);
    private _id: string = $state("");

    public exportDataForDatabase() {
        return {
            inputType: "incrementalNumber",
            required: this.required,
            questionText: this.questionText,
            helpText: this.helpText,
            defaultValue: this.defaultValue,
            cssId: this.id,
            numMix: this.min,
            numMax: this.max
        }
    }

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

    get defaultValue(): number {
        return this._defaultValue;
    }

    set defaultValue(value: number) {
        this._defaultValue = value;
    }

    get min(): number {
        return this._min;
    }

    set min(value: number) {
        this._min = value;
    }

    get max(): number {
        return this._max;
    }

    set max(value: number) {
        this._max = value;
    }
    
}