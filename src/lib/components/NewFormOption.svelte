<script lang=ts>

import Button from "$lib/components/Button.svelte";
import ConfirmButton from "$lib/ConfirmButton.svelte";
import Modal from "$lib/Modal.svelte";
import { displayFormOptions, backendFormOptions } from "$lib";

let { checked = $bindable(false), type = $bindable(""), confirm}: {checked: boolean, type: string, confirm: () => void} = $props();

let showModal = $state(false);

</script>


<Button text="Add Input" click={() => {showModal = true}}></Button>

<Modal bind:showModal> 

    {#snippet header()}
        <h1 class="text-2xl">Choose a form input to add</h1>
    {/snippet}

    <label>Type:</label>
    <select class="bg-amber-200 p-2 rounded-md text-gray-800 m-4" bind:value={type}>
        {#each displayFormOptions as option, i}
            <option value={Object.values(backendFormOptions)[i]}>{option}</option>
        {/each}
    </select>

    <label>Make group:</label>
    <input type="checkbox" bind:checked={checked}/>
    <br/>
    <ConfirmButton text="Create" click={() => {confirm()}}></ConfirmButton>

</Modal>