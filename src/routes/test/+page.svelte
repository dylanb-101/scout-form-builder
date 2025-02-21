<script lang="ts">
    


</script>

<button onclick={async () => {
    console.log("hi")
    const req = await fetch('/api/form', {
					method: 'PATCH',
					body: JSON.stringify({ uid: 1, name: "a", active: true }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

    let res = await req.json();
    console.log(res);
}}>Click me!</button>