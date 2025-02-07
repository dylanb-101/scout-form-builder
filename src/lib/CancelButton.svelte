<script lang=ts>
    let { text, click }: {text: string, click: () => void | undefined} = $props();
</script>


<button class=" bg-red-200 p-2 rounded-md text-gray-800 hover:drop-shadow-md" onclick={() => {click()}}>{text}</button>