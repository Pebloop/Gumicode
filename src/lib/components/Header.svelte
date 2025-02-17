<script lang="ts">

    import {onMount} from "svelte";
    import {SimpleGraphMaker} from "$lib/utils/SimpleGraphMaker";

    function toggleMenu() {
        const menu = document.getElementById('menu');
        if (menu.hidden) {
            menu.hidden = false;
        } else {
            menu.hidden = true;
        }
    }

    function toggleSubMenu(menu_id: string) {
        return () => {
            const menu = document.getElementById(menu_id);
            if (menu.style.display === 'none') {
                menu.style.display = 'flex';
            } else {
                menu.style.display = 'none';
            }
        }
    }
</script>

<div class="flex flex-row relative z-50">
    <div class="flex flex-col h-screen bg-blue-800 fixed w-72 max-md:w-screen" id="menu" hidden>
        <div class="flex flex-col items-center p-4">
            <a href="/" class="text-white hover:text-blue-200 p-2 font-bold text-2xl">Gumicode</a>
        </div>

        <hr class="border-2 border-blue-200 my-2">

        <div class="flex flex-col">
            <button class="flex flex-row items-center p-2" on:click={toggleSubMenu('beginner')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="white" d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"/></svg>
                <h2 class="text-white hover:text-blue-200 p-2 font-bold text-xl">Beginner</h2>
            </button>

            <div id="beginner" class="flex-col hidden ml-10">
                <a href="/road/beginner/000-what-is-a-variable" class="text-white hover:text-blue-200 p-1 font-bold">What is a variable ?</a>
                <a href="/road/beginner/001-what-is-a-function" class="text-white hover:text-blue-200 p-1 font-bold">What is a function ?</a>
            </div>
        </div>

        <div class="flex flex-col">
            <button class="flex flex-row items-center p-2" on:click={toggleSubMenu('intermediate')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="white" d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"/></svg>
                <h2 class="text-white hover:text-blue-200 p-2 font-bold text-xl">Intermediate</h2>
            </button>

            <div id="intermediate" class="flex-col hidden ml-10">

            </div>
        </div>

        <div class="flex flex-col">
            <button class="flex flex-row items-center p-2" on:click={toggleSubMenu('advanced')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...$$props}><path fill="white" d="m184.49 136.49l-80 80a12 12 0 0 1-17-17L159 128L87.51 56.49a12 12 0 1 1 17-17l80 80a12 12 0 0 1-.02 17"/></svg>
                <h2 class="text-white hover:text-blue-200 p-2 font-bold text-xl">Advanced</h2>
            </button>

            <div id="advanced" class="flex-col hidden ml-10">

            </div>
        </div>

    </div>
    <nav class="flex justify-start p-4 flex-row fixed">
        <button class="p-2 font-bold rounded-2xl" on:click={toggleMenu}>
            <img src="/icons/PhListBold.svg" alt="menu" class="w-8 h-8">
        </button>

    </nav>
</div>