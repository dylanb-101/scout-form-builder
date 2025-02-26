import type PageSection from "./PageSection.svelte";

export default class InputPage {

    private _sections: PageSection[] = $state([]);
    private _footerText: string = $state("");
    private _footerHelpText: string = $state("");
    private _name: string = $state("");
    private _footerButtons: {"cancel": boolean, "next": boolean, "submit": boolean} = $state({cancel: false, next: false, submit: false});

    constructor(name: string, footerText?: string) {
        this.name = name;
        this.footerText = footerText || this.footerText;
    }

    addSection(section: PageSection): void {
        this.sections.push(section);
    }

    parseFooterButtons(): string {

        let str = ""
        Object.keys(this.footerButtons).forEach((val, index) => {
            if(this.footerButtons[val as keyof typeof this.footerButtons]) {
                if(str.length == 0) str += val;
                else str += "," + val;
            }
        });

        return str;
    }

    sectionNames(): string {
        let str = "";

        this.sections.forEach((val, index) => {
            if(index == 0) str+= val.header;
            else str += "," + val.header;
        });

        return str
    }

    sectionHelpTexts(): string {
        let str = "";

        this.sections.forEach((val, index) => {
            if(index == 0) {
                str += val.helpText
            } else {
                str += "," + val.helpText;
            }
        })

        return str;
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

    get footerButtons(): {cancel: boolean, next: boolean, submit: boolean} {
        return this._footerButtons;
    }

    set footerButtons(value: {cancel: boolean, next: boolean, submit: boolean}) {
        this._footerButtons = value;
    }

}