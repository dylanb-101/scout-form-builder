import Input from "./Input";

export default class TextInput extends Input {

    private _required: boolean = $state(false);
    private _questionText: string = $state("");
    private _helpText: string = $state("");
    private _limit: number = $state(524288);
    private _defaultValue: string = $state("");
    private _id: string = $state("");

    public exportDataForDatabase() {
        return {
            inputType: "text",
            required: this.required,
            questionText: this.questionText,
            helpText: this.helpText,
            defaultValue: this.defaultValue,
            cssId: this.id,
            textLimit: this.limit
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

    get limit(): number {
        return this._limit;
    }

    set limit(value: number) {
        this._limit = value;
    }

    get defaultValue(): string {
        return this._defaultValue;
    }

    set defaultValue(value: string) {
        this._defaultValue = value;
    }


    
}