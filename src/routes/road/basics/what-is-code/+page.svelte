<script lang="ts">
    import {onMount} from "svelte";
    import {createSwiper} from "$lib/utils/LessonSwipper";
    import Header from "$lib/components/Header.svelte";
    import Code from "$lib/components/Code.svelte";


    let page = 0;
    let slideHeight = $state(0);

    function resize() {
        const widthChange = 768;
        const spacing = 4;
        const space = window.innerWidth > widthChange ? spacing * 20 : spacing * 32;
        slideHeight = window.innerHeight - space - 10;
    }

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        page = parseInt(urlParams.get('page') ?? '0');
        resize();

        window.onresize = () => {
            resize();
        }

        $effect(() => {
            document.querySelectorAll('.slide').forEach((el) => {
                let element = el as HTMLElement;
                element.style.height = `${slideHeight}px`;
            });
        });

        createSwiper({
            initialSlide: page,
            after: "/road/basics/functions",
            height: slideHeight,
        });
    });

</script>

<Header road="/road/basics" direction="horizontal" />

<div class="w-screen h-screen block fixed top-0 left-0">
<h1 class="text-2xl font-bold m-3 max-md:mt-16 max-md:text-center text-end">What is code?</h1>
<hr class="m-5 text-blue-900" />
</div>

<div class="max-md:pt-32 pt-20 ">
</div>
<div class="swiper">
    <div class="swiper-wrapper">

        <div class="swiper-slide">
            <div class="w-full flex justify-center slide" style="height: {slideHeight}px;">
                <div class="flex flex-col w-2/3 max-md:w-full p-4 bg-white rounded-md h-full">
                    <h2 class="text-center text-xl mb-3">Definition</h2>
                    <p class="text-lg">
                        Code is a set of instructions that a computer can understand. Computers are not smart, they are just fast.
                        They can do a lot of things in a short time but they need to be told what to do. That's where code comes in.

                        <br />

                        Code is written in a programming language. There are many programming languages like Python, JavaScript, Java, C++, etc.
                        Each programming language has its own syntax and rules. But the main goal is the same: to tell the computer what to do.
                    </p>
                    <img src="/lessons/basics/what-is-code/input.png" class="w-full mt-5" alt="code exemple" />
                </div>
            </div>
        </div>

        <div class="swiper-slide">
            <div class="w-full flex justify-center slide" style="height: {slideHeight}px;">
                <div class="flex flex-col w-2/3 max-md:w-full p-4 bg-white rounded-md h-full">
                    <h2 class="text-center text-xl mb-3">A bit of history</h2>
                    <p class="text-lg">
                        The first programming language was created in 1954 by Grace Hopper. It was called FLOW-MATIC.
                        It was used to write code in English-like sentences. It was a big step forward because before that, code was written in binary.
                        Binary is a language that uses only 0 and 1. It was very hard to write and understand.
                    </p>
                    <div class="text-sm mt-5 overflow-x-scroll bg-gray-100 p-4 rounded-md">
                        <Code>
(0)  INPUT INVENTORY FILE-A PRICE FILE-B ; OUTPUT PRICED-INV FILE-C UNPRICED-INV
FILE-D ; HSP D .
(1)  COMPARE PRODUCT-NO (A) WITH PRODUCT-NO (B) ; IF GREATER GO TO OPERATION 10 ;
IF EQUAL GO TO OPERATION 5 ; OTHERWISE GO TO OPERATION 2 .
(2)  TRANSFER A TO D .
(3)  WRITE-ITEM D .
(4)  JUMP TO OPERATION 8 .
(5)  TRANSFER A TO C .
(6)  MOVE UNIT-PRICE (B) TO UNIT-PRICE (C) .
(7)  WRITE-ITEM C .
(8)  READ-ITEM A ; IF END OF DATA GO TO OPERATION 14 .
(9)  JUMP TO OPERATION 1 .
(10)  READ-ITEM B ; IF END OF DATA GO TO OPERATION 12 .
(11)  JUMP TO OPERATION 1 .
(12)  SET OPERATION 9 TO GO TO OPERATION 2 .
(13)  JUMP TO OPERATION 2 .
(14)  TEST PRODUCT-NO (B) AGAINST ; IF EQUAL GO TO OPERATION 16 ;
OTHERWISE GO TO OPERATION 15 .
(15)  REWIND B .
(16)  CLOSE-OUT FILES C ; D .
(17)  STOP . (END)
                        </Code>
                    </div>
                </div>
            </div>
        </div>

        <div class="swiper-slide">
            <div class="w-full flex justify-center slide" style="height: {slideHeight}px;">
                <div class="flex flex-col w-2/3 max-md:w-full p-4 bg-blue-950 rounded-md h-full items-center justify-center">
                    <p class="text-xl text-white">
                        Loading next lesson
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background-color: #eff4fb;
    }
</style>