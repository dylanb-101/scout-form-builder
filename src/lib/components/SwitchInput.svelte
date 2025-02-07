<script lang="ts">

    let { title, val = $bindable(false) }: { title: string, val: boolean } = $props();

</script>


<label class="text-xl">{title}</label>
<input class="bg-amber-200 p-2 rounded-md text-gray-800 m-4" bind:checked={val} type="checkbox"/>