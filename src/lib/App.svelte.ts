import type Input from "./Input";
import type InputPage from "./InputPage.svelte";

export default class App {

    inputChecked: boolean = $state(false);
    inputTypeValue: string = $state("text");

    pages: InputPage[] = $state([]);






    addPage(page: InputPage): void {
        this.pages.push(page);
    }


    
}