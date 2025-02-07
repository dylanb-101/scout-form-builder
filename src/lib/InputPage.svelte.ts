import type PageSection from "./PageSection.svelte";

export default class InputPage {

    private _sections: PageSection[] = $state([]);
    private _footerText: string = $state("");
    private _footerHelpText: string = $state("");
    private _name: string = $state("");

    constructor(name: string, footerText?: string) {
        this.name = name;
        this.footerText = footerText || this.footerText;
    }

    addSection(section: PageSection): void {
        this.sections.push(section);
    }

    // getters and setters

    get sections(): PageSection[] {
        return this._sections;
    }

    set sections(value: PageSection[]) {
        this._sections = value;
    }

    get footerText(): string {
        return this._footerText;
    }

    set footerText(value: string) {
        this._footerText = value;
    }

    get footerHelpText(): string {
        return this._footerHelpText;
    }

    set footerHelpText(value: string) {
        this._footerHelpText = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

}