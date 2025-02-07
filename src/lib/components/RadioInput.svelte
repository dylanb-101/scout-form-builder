<script module lang="ts" >

    // svelte-ignore non_reactive_update
        let name = 0;

</script>

<script lang="ts">

    let { title, val = $bindable(0), options }: { title: string, val: number, options: string[] } = $props();

    

</script>


<label class="text-xl">{title}</label>

{#each options as option, i}
    <input type="radio" id="{option+i}" name="{name++}}" value={i} bind:group={val}/>
    <label for="{option+i}">{option}</label>
{/each}