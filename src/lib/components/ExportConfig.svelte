<script lang="ts">
    import type { Row } from "$lib";
    import type App from "$lib/App.svelte";


    let { app }: { app: App } = $props();


    let rows: Row[] = $state(app.convertInputsToRows());

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

            if(selectedRow  >= rows.length-1) return;
            rows[selectedRow+1].index -=1;
            rows[selectedRow].index += 1;
            selectedRow+=1

            rows.sort((a, b) => a.index-b.index);

        } else if(e.key == "ArrowUp") {

            if(selectedRow <= 0) return;
            rows[selectedRow-1].index += 1;
            rows[selectedRow].index -=1;
            selectedRow -= 1;

            rows.sort((a, b) => a.index-b.index)

        }

    }

    

    

</script>

<table class="bg-slate-100">

    <thead>
        <tr>
            {#each Object.keys(rows[0]) as key}
                <th>{key}</th>
            {/each}
        </tr>
    </thead>

    <tbody>

        {#each rows as row, i}
            
            <tr onclick={(e) => {click(e, i)}} class={i == selectedRow ? "bg-gray-500" : ""}>
                {#each Object.values(row) as val}
                    <td>{val}</td>
                {/each}
            </tr>

        {/each}

    </tbody>

</table>

<svelte:window onkeydown={(e) => {keyPress(e)}}/>