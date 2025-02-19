<script lang="ts">
    import {onMount} from "svelte";
    import {createSwiper} from "$lib/utils/LessonSwipper";
    import Header from "$lib/components/Header.svelte";

    let page = 0;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        page = parseInt(urlParams.get('page') ?? '0');

        createSwiper({
            initialSlide: page,
            after: "road/basics/variables",
        });
    });

</script>

<Header road="/road/basics" direction="horizontal" />

<div class="w-screen h-screen block fixed top-0 left-0" id="map">
<h1 class="text-2xl font-bold m-3 max-md:mt-16 max-md:text-center text-end">What is code?</h1>
<hr class="m-5 text-blue-900" />
</div>

<div class="max-md:mt-32 mt-16">
</div>
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