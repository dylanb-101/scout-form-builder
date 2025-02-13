import Input from "./Input";

export default class ToggleInput extends Input {

    private _required: boolean = $state(false);
    private _questionText: string = $state("");
    private _helpText: string = $state("Toggle Input");
    private _defaultValue: boolean = $state(false);
    private _id: string = $state("");

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

    get defaultValue(): boolean {
        return this._defaultValue;
    }

    set defaultValue(value: boolean) {
        this._defaultValue = value;
    }
    
}