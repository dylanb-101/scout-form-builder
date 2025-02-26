<script lang="ts">
    import type { Row } from "$lib";
    import type App from "$lib/App.svelte";
    import Button from "./Button.svelte";


    let { app }: { app: App } = $props();


    // let rows: Row[] = $state(app.convertInputsToRows());

    app.rows = app.convertInputsToRows();

    let selectedRow = $state(0);

    // rows.push({index: 0, name: "1676", type: "string"});
    // rows.push({index: 1, name: "1807", type: "string"});
    // rows.push({index: 2, name: "2222", type: "string"});
    // rows.push({index: 3, name: "9015", type: "string"});

    function click(e: MouseEvent & { currentTarget: EventTarget & HTMLTableRowElement }, index: number) {

        selectedRow = index;

    }

    function keyPress(e: KeyboardEvent) {

        console.log(e.key)

        if(selectedRow == -1) return;

        if(e.key == "ArrowDown") {

            if(selectedRow  >= app.rows.length-1) return;
            app.rows[selectedRow+1].index -=1;
            app.rows[selectedRow].index += 1;
            selectedRow+=1

            app.rows.sort((a, b) => a.index-b.index);

        } else if(e.key == "ArrowUp") {

            if(selectedRow <= 0) return;
            app.rows[selectedRow-1].index += 1;
            app.rows[selectedRow].index -=1;
            selectedRow -= 1;

            app.rows.sort((a, b) => a.index-b.index)

        }

    }

    let implicitCSVOptions: string[] = [ "user_id", "comp", "timestamp", "team_num", "user_name"];

    let option = $state("user_id");

    function addOption() {
        app.rows.push({index: app.rows.length, id: option, type: "string"})
    }

    

</script>

<select bind:value={option}>
    {#each implicitCSVOptions as opt}
        <option value="{opt}">{opt}</option>
    {/each}
</select>

<Button click={() => {addOption()}} text="Add Implicit Value"/>



<table class="bg-slate-100">

    <thead>
        <tr>
            {#each Object.keys(app.rows[0]) as key}
                <th>{key}</th>
            {/each}
        </tr>
    </thead>

    <tbody>

        {#each app.rows as row, i}
            
            <tr onclick={(e) => {click(e, i)}} class={i == selectedRow ? "bg-gray-500" : ""}>
                {#each Object.values(row) as val}
                    <td>{val}</td>
                {/each}
            </tr>

        {/each}

    </tbody>

</table>

<Button text="Finish & Activate Form" click={() => {app.uploadForm()}}/>

<svelte:window onkeydown={(e) => {keyPress(e)}}/>