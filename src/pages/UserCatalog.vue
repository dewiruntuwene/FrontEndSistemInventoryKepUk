<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export interface CartItem {
    nama: string;
    kode: string;
    jumlah: number;
}


const cartItems = ref<CartItem[]>([]);

function tambahKeKeranjang() {
    const newItem: CartItem = { nama: 'GLOVE STERIL', kode: 'A001', jumlah: 1 };
    cartItems.value.push(newItem);
    alert('Item telah ditambahkan ke keranjang!');
    const router = useRouter();
    router.push('/keranjang'); // Arahkan ke halaman keranjang setelah menambahkan item
}


</script>

<template>
    <div class="mt-20 sm:ml-5 h-full ">   
        <div class="flex items-center sm:justify-between mt-10 ml-5 font-medium border-b border-gray-200 dark:text-natural-900 dark:border-gray-700 w-11/12 p-6 pl-6 space-x-7 space-x-reverse">
            <span>My Course</span>
            <button id="mega-menu-dropdown-button" data-dropdown-toggle="mega-menu-dropdown" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
            All <svg aria-hidden="true" class="w-5 h-5 ml-1 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
              
            <div class="flex-row justify-between">
                <router-link to="/addcoursedesc">
                    <a href="#" class="static inline-block text-sm px-4 py-2 leading-none border-black rounded text-black border-white hover:border-transparent hover:text-natural-900 bg-white mt-4 lg:mt-0">+ Add New Course</a>
                </router-link>

            </div>
        </div>

        <!-- Card -->
        <div class="md:flex items-center justify-between p-6">
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/keranjang">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2 flex justify-between items-center">
                            <div>
                                <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">GLOVE STERIL</h5>
                                <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">A001</p>
                            </div>
                            <button class="focus:outline-none" @click="tambahKeKeranjang()">
                                <img src="keranjang.png" alt="Add to Cart" class="w-6 h-6 mr-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>  
            
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="md:flex items-center justify-between p-6">
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>  
            
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="md:flex items-center justify-between p-6">
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>  
            
            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-2">
                <div class="w-56 h-80">
                    <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <router-link to="/course">
                            <img class="rounded-t-lg" src="https://smartguy.com/webservice/storage/category/web-design.jpg" alt="" />
                        </router-link>
                        <div class="p-2">
                            <h5 class="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Fundamental of Web Design</h5>
                            <p class="mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">30 Participant</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
  <RouterView />
</template>