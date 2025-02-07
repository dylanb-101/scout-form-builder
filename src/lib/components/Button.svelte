<script lang=ts>
    let { text, click }: {text: string, click: () => void | undefined} = $props();
</script>


<button class=" bg-amber-200 p-2 rounded-md text-gray-800 hover:drop-shadow-md" onclick={() => {click()}}>{text}</button>