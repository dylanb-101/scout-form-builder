import Input from "./Input";

export default class NumberInput extends Input {

    private _required: boolean = $state(false);
    private _questionText: string = $state("New Number Input!");
    private _helpText: string = $state("");
    private _min: number = $state(0);
    private _max: number = $state(100000);
    /**Whether the number should increase by one every time the form is submitted */
    private _autoIncrement: boolean = $state(false);
    private _defaultValue: number = $state(0);
    private _id: string = $state("");

    public exportDataForDatabase() {
        return {
            inputType: "number",
            required: this.required,
            questionText: this.questionText,
            helpText: this.helpText,
            defaultValue: this.defaultValue,
            cssId: this.id,
            numMix: this.min,
            numMax: this.max,
            numIncrement: this.autoIncrement
        }
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
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

    get autoIncrement(): boolean {
        return this._autoIncrement;
    }

    set autoIncrement(value: boolean) {
        this._autoIncrement = value;
    }

    get defaultValue(): number {
        return this._defaultValue;
    }

    set defaultValue(value: number) {
        this._defaultValue = value;
    }



    
}