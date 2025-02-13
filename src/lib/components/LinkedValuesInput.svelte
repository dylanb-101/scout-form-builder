<script lang="ts">
    import CancelButton from "$lib/CancelButton.svelte";
    import TextInput from "./TextInput.svelte";


    let { title, val = $bindable([]) }: { title: string, val: { text: string, value: any}[] } = $props();
    

</script>


<label class="text-xl">{title}</label>
<div>
    <label class="text-lg">Display Value:</label>
    <label class="text-lg">Data Value:</label>
</div>
{#each val as { text, value }, i}
    <div>
        <TextInput val={text} title=""></TextInput>
        <TextInput val={value} title=""></TextInput>
        {#if val.length != 1}
            <CancelButton text="X" click={() => {val.splice(i, 1)}}></CancelButton>
        {/if}
    </div>
{/each}