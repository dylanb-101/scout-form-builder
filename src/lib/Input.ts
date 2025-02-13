export default abstract class Input {

    public abstract get required(): boolean;
    public abstract set required(value: boolean);

    public abstract get questionText(): string;
    public abstract set questionText(value: string);

    public abstract get helpText(): string;
    public abstract set helpText(value: string);

    public abstract get defaultValue(): any;
    public abstract set defaultValue(value: any);

    public abstract get id(): string;
    public abstract set id(valie: string);
}