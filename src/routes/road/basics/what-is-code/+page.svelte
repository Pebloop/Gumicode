<script lang="ts">
    import {onMount} from "svelte";
    import {createSwiper} from "$lib/utils/LessonSwipper";
    import Header from "$lib/components/Header.svelte";

    let page = 0;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        page = parseInt(urlParams.get('page') ?? '0');
    }

    onMount(() => {
        createSwiper({
            initialSlide: page,
            after: "road/basics/variables",
        });
    });

</script>

<Header road="/road/basics" direction="horizontal" />

<h1 class="text-2xl font-bold m-5 text-end absolute top-0 right-0">What is code?</h1>
<hr class="m-5 text-blue-900" />

<div class="swiper">
    <div class="swiper-wrapper">

        <div class="swiper-slide">
            <div class="h-screen">
                <h2 class="text-center text-xl m-3">Storing data</h2>
                <p>
                    Variable are used to store data.
                </p>
            </div>
        </div>

        <div class="swiper-slide">
            <h2 class="text-center text-xl m-3">Small game to explain</h2>
            <p>
                Variable are used to store data.
            </p>
        </div>

        <div class="swiper-slide">
            <h2 class="text-center text-xl m-3">Modifying data</h2>
            <p>
                Variable are used to change data.
            </p>
        </div>

        <div class="swiper-slide">
            <p class="text-center text-xl m-3">Going to next lesson</p>
        </div>
    </div>
</div>