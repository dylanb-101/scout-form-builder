import type { Row } from "$lib";
import TextInput from "./TextInput.svelte";
import Group from "./Group.svelte";
import type Input from "./Input";
import type InputPage from "./InputPage.svelte";
import NumberInput from "./NumberInput.svelte";
import PillboxInput, { PillBoxOrientation } from "./PillboxInput.svelte";
import ToggleInput from "./ToggleInput.svelte";
import IncrementalNumberInput from "./IncrementalNumberInput.svelte";

export default class App {

    inputChecked: boolean = $state(false);
    inputTypeValue: string = $state("text");
    name: string = $state("new form!");
    rows: Row[] = $state([]);

    pages: InputPage[] = $state([]);

    addPage(page: InputPage): void {
        this.pages.push(page);
    }

    async request(path: string, method: string, body?: string): Promise<any> {

        let req = await fetch(path, {
            method, 
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let res = await req.json();

        return res;

    }

    async uploadForm() {

        let inputs: {id: string, uid: number}[] = [];

        let formReq = await this.request("/api/form", "POST", JSON.stringify({
            name: this.name,
            active: false,
            csvOrder: ""
        }));

        const formId: number = formReq.uid;

        console.log(formReq)


        for(let page of this.pages) {

            let pageReq = await this.request("/api/page", "POST", JSON.stringify({
                formId, 
                name: page.name,
                footerText: page.footerText,
                footerHelpText: page.footerHelpText,
                footerButtons: page.parseFooterButtons(),
                sectionNames: page.sectionNames(),
                sectionHelpTexts: page.sectionHelpTexts()
            }));

            console.log(pageReq);

            const pageId: number = pageReq.insertId;

            let pageIndex = 0;

            for(let i = 0; i < page.sections.length; i++) {

                let section = page.sections[i];

                for(let element of section.elements) {

                    let groupId = -1;

                    if(element instanceof Group) {

                        let groupReq = await this.request("/api/group", "POST", JSON.stringify({
                            formId,
                            pageId,
                            img: element.img,
                            title: element.title,
                            helpText: element.helpText
                        }));
                        
                        groupId = groupReq.insertId;

                        for(let input of element.inputs) {

                            let data = input.exportDataForDatabase();

                            data.formId = formId;
                            data.pageIndex = pageIndex++;
                            data.groupId = groupId;
                            data.pageId = pageId;
                            data.sectionIndex = i;

                            let inputReq = await this.request("/api/input", "POST", JSON.stringify(data));

                            inputs.push({id: input.id, uid: inputReq.insertId});
                        }
                    } else {
                            let data = element.exportDataForDatabase();

                            data.formId = formId;
                            data.pageIndex = pageIndex++;
                            data.groupId = 0;
                            data.pageId = pageId;
                            data.sectionIndex = i;

                            let inputReq = await this.request("/api/input", "POST", JSON.stringify(data));

                            inputs.push({id: element.id, uid: inputReq.insertId});
                    }
                }

            }
        }


        let formUpdate = await this.request("/api/form", "PUT", JSON.stringify({
            uid: formId,
            active: false,
            name: this.name,
            csvOrder: this.convertRowsToCSV(inputs)
        }))

        let activateForm = await this.request("/api/form/activate/"+formId, "GET");

        console.log(formUpdate);

    }

    convertRowsToCSV(inputs: {id: string, uid: number}[]): string {

        let str = "";

        let implicitCSVOptions: string[] = [ "user_id", "comp", "timestamp", "team_num", "user_name"];

        for(let row of this.rows) {

            if(implicitCSVOptions.indexOf(row.id) != -1) {
                str+=row.id + ","
            } else {
                let input = inputs.find((val) => {
                    console.log(val.id + "," + row.id)
                    console.log(val.id == row.id);
                    console.log(val);
                    return val.id == row.id;
                });
    
                str += input!.uid + ",";
            }
        }

        str = str.substring(0, str.length-1);

        return str;

    }

    allInputsValid(): boolean {

        let previousIds: string[] = [];

        for(let i = 0; i < this.pages.length; i++) {

            let page = this.pages[i];

            for(let j = 0; j < page.sections.length; j++) {

                let section = page.sections[j];

                for(let k = 0; k < section.elements.length; k++) {

                    let element = section.elements[k];

                    if(element instanceof Group) {
                        
                        for(let p = 0; p < element.inputs.length; p++) {

                            let input = element.inputs[p];

                            if(input.id == "" || previousIds.indexOf(input.id) != -1) {
                                return false;
                            } 
                            previousIds.push(input.id)
                        }

                    } else {

                        if(element.id == "" || previousIds.indexOf(element.id) != -1) {
                            return false;
                        } 
                        previousIds.push(element.id)

                    }

                }

            }

        }


        return true;
    }

    convertInputsToRows(): Row[] {

        let inputs: Row[] = []

        let index = 0;

        for(let i = 0; i < this.pages.length; i++) {

            let page = this.pages[i];

            for(let j = 0; j < page.sections.length; j++) {

                let section = page.sections[j];

                for(let k = 0; k < section.elements.length; k++) {

                    let element = section.elements[k];

                    if(element instanceof Group) {
                        
                        for(let p = 0; p < element.inputs.length; p++) {

                            let input = element.inputs[p];

                            inputs.push({ index, id: input.id, type: (typeof input.defaultValue) || "pillbox"})
                            index += 1;
                            
                        }

                    } else {

                        inputs.push({ index, id: element.id, type: (typeof element.defaultValue != "undefined") ? typeof element.defaultValue : "pillbox"});
                        index += 1;

                    }

                }

            }

        }

        return inputs;

    }

    generateHTML(): void {
        
        let body = '<div class="main-content">'

        for(let page of this.pages) {

            let pageNum = 1;

          for(let section of page.sections) {

            let text = `<div class="page page-${pageNum}">\n`
            text += `<h1>${section.header}</h1>\n<hr/>\n`

            for(let element of section.elements) {

                if(element instanceof TextInput) {

                    text += `<div class="input-group input-group-sm mb-3">\n`;

                    text += `<span class="input-group-text" id="inputGroup-sizing-sm">\n`
                    text += `<help-btn msg="${element.helpText}"></help-btn>\n`
                    text += `${element.questionText}</span>\n`

                    text += `<input id="input${pageNum}-${element.id}" pattern="\d*" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/> </div>`

                } else if(element instanceof NumberInput) {

                    text += `<div class="input-group input-group-sm mb-3">\n`;

                    text += `<span class="input-group-text" id="inputGroup-sizing-sm">\n`
                    text += `<help-btn msg="${element.helpText}"></help-btn>\n`
                    text += `${element.questionText}</span>\n`

                    text += `<input id="input${pageNum}-${element.id}" inputmode="numeric" pattern="\d*" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/> </div>`

                } else if(element instanceof PillboxInput && element.orientation == PillBoxOrientation.HORIZONTAL) {

                    // getting rid of the for attribute bc i dont think its neccesary but we shall see
                    text += `<label class="form-label" style="margin-bottom: 0;">
                                <help-btn msg="${element.helpText}"></help-btn>
                                ${element.questionText} 
                            </label>\n`;
                    text += `<div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">\n`

                    for(let i = 0; i < element.options.length; i++) {

                        text += `<input id="input${pageNum}-${element.options[i] + i}" type="radio" class="btn-check" name="${element.id}" autocomplete="off" value="${element.values[i]}">
                                <label class="btn btn-outline-danger" for="input${pageNum}-${element.options[i] + i}">${element.options[i]}</label>\n`

                    };

                    
                    text += `</div>\n`;

                } else if(element instanceof PillboxInput && element.orientation == PillBoxOrientation.VERTICAL) {

                    text += `<label class="form-label" for="${element.id}-radio">
                                ${element.questionText}
                                <help-btn msg="${element.helpText}"></help-btn>
                            </label>`;

                    text += `<div style="padding: 5px; width: 100%" class="btn-group-vertical btn-group-sm" role="group" aria-label="Basic radio toggle button group">`; 
                  
                  for(let i = 0; i < element.options.length; i++) {

                        text += `<input id="input${pageNum}-${element.options[i] + i}" type="radio" class="btn-check" name="${element.id}" autocomplete="off" value="${element.values[i]}">
                                <label class="btn btn-outline-primary" for="input${pageNum}-${element.options[i] + i}">${element.options[i]}</label>\n`

                    };
                 
                } else if(element instanceof ToggleInput) {
                    text += `<div class="input-row"> 
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="input${pageNum}-${element.id}"/>
                                    <label class="form-check-label for="flexSwitchCheckChecked">
                                    ${element.questionText}
                                    <help-btn msg="${element.helpText}"></help-btn>
                                     </label>
                                </div>
                            </div>`
                                    
                } else if(element instanceof IncrementalNumberInput) {

                    text += `<div class="input-group m-1">
                                <span class="input-group-text">
                                    ${element.questionText}
                                    <help-btn msg="${element.helpText}></help-btn>
                                </span>
                                <span class="input-group-btn">
                                   <button type="button" class="quantity-left-minus btn btn-danger btn-number" style="padding-top: 14px;" data-type="minus" data-field>
                                        <ion-icon name="remove-outline" role="img" class="md hydrated"></ion-icon>
                                    </button>
                                </span>
                                <input id="input${pageNum}-${element.id}" inputmode="numeric" pattern="\d*" class="form-control input-number" placeholder="0" aria-label="${element.questionText}">
                                <span class="input-group-btn">
                                    <button type="button" class="quantity-right-plus btn btn-success btn-number" style="padding-top: 14px;" data-type="plus" data-field>
                                        <ion-icon name="add-outline" role="img" class="md hydrated"></ion-icon>
                                    </button>
                                </span>
                            </div>`;
                } else if(element instanceof Group) {
                    
                }

            }

          }

        }


    }


    
}