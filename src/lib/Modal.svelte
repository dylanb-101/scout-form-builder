<script lang="ts">

    import CancelButton from "./CancelButton.svelte";


    let { showModal = $bindable(), header, children } = $props();

    let dialog: HTMLDialogElement = $state()!;

    $effect(() => {
        if(showModal) dialog?.showModal();
    })

</script>


<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog bind:this={dialog} onclose={() => (showModal = false)} onclick={(e) => { if(e.target === dialog) dialog.close();}} 
    class="max-w-lg rounded-sm border-none p-0 backdrop:bg-gray-900 backdrop:bg-opacity-30">

    <div class="p-4">
        {@render header?.()}
        <hr/>
        {@render children?.()}
        <hr class="mt-4 mb-4"/>

        <CancelButton text="Close" click={() => {dialog.close()}}></CancelButton>
    </div>

</dialog>

