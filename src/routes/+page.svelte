<script lang="ts">
    import App from "$lib/App.svelte";


    import NewFormOption from "$lib/components/NewFormOption.svelte";
    import InputPageSection from "$lib/components/InputPage.svelte";
    import NumberInput from "$lib/components/NumberInput.svelte";
    import TextInput from "$lib/components/TextInput.svelte";
    import InputPage from "$lib/InputPage.svelte";
    import Button from "$lib/components/Button.svelte";
    import ExportConfig from "$lib/components/ExportConfig.svelte";
    
    const app = new App();

    app.addPage(new InputPage("Pre Match Info"))

    let state = $state("form-config")

    function finishFormCreation() {

        if(app.allInputsValid()) {
            state = "export-config"
        } else {
            alert("all inputs need to have an id, and it needs to be unique!")
        }


    }
    

    

</script>
<div class="w-screen h-full min-h-screen bg-slate-300 flex flex-col gap-10 items-center">

    <!-- header -->
    <div class="w-screen h-16 bg-gray-700 flex flex-col justify-center">
        <h1 class=" ml-4 text-4xl text-white">EGISC</h1>
    </div>

    {#if state == "form-config"}
        
        {#each app.pages as page}
            <InputPageSection page={page}></InputPageSection>
        {/each}

        <Button text="Add Page" click={() => {app.addPage(new InputPage("New Page"))}}></Button>
        <Button text="Finish Form Creation" click={() => {finishFormCreation()}}></Button>

    {:else if state == "export-config"}

        <ExportConfig app={app}/>

    {/if}


</div>
