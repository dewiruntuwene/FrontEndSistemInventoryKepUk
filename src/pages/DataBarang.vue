<template>

<script setup lang="ts">
  function Open() {
    document.querySelector(".sidebar")?.classList.toggle('left-[-200px]');
  }
</script>

<template>
  <div class="mx-auto max-w-1400 h-1531">
    
    <div class="sm:flex sm:w-full flex-col p-4">
      <!-- Header --> 
      <div class="lg:left-0 left-[-200px] fixed top-0 z-50 w-full pl-60 flex items-center justify-between bg-slate-200 p-5 ">
        <div class="flex space-x-5">
          <button
            class="lg:hidden flex cursor pointer inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg" onclick="Open()"
            data-te-sidenav-toggle-ref
            data-te-target="#sidenav-8"
            aria-controls="#sidenav-8"
            aria-haspopup="true">
            <span class="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </button>
          <div>
            <router-link to="/">
              Logo
            </router-link>
          </div>
          <div class="md:w-32 lg:w-48">
            <input type="text" class="w-96 rounded-full pl-3 py-1" placeholder="Search">
          </div>
        </div>

        <div class="py-2 flex space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-8 w-8">
            <path
              d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
          </svg>

          <div class="flex-row ">
            <router-link to="/logout">
              <a href="#" class="inline-block text-sm px-4 py-2 leading-none border-black rounded text-black border-white hover:border-transparent hover:text-natural-900 hover:bg-white mt-4 lg:mt-0">Logout</a>
            </router-link>
          </div>
        </div>       
      </div>

      <div class="flex md:hidden">
        <button id="hamburger">
          <img class="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="40" height="40" />
          <img class="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="40" height="40" />
        </button>
      </div>

      <div>
          <!-- Sidenav -->
  
          <nav
            id="sidenav-8"
            class="lg:left-0 left-[-300px] fixed top-0 left-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-slate-200"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-position="absolute"
            data-te-sidenav-accordion="true">


            <a
              class="mb-3 flex space-x-3 ml-7 border-b-2 border-solid border-gray-100 py-6 outline-none"
              href="#!"
             >
             
              
              <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </div>

              <div class="">
                <span>John Doe</span>
                <p class="text-xs text-slate-500">Instructor</p>
              </div>

              <div class="active:shadow-lg hidden" onclick="Open()">
                <svg class="h-7 w-7 text-black "  width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
              </div>
          
            </a>
            <ul
              class="relative m-0 list-none px-[0.2rem] pb-12"
              data-te-sidenav-menu-ref>
              
              <li class="relative pt-4">
                <a
                  class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900  hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-neutral-900">
                  </span>
                  <span>
                    <router-link to="/dashboard">
                      Dashboard
                    </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                  </span>
                  <span>
                    <router-link to="/DataPeminjaman">
                      Data Peminjaman
                    </router-link>
                  </span>
                </a>
              </li>
             
                
              <li class="relative pt-4">
                <a
                  class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span
                    class="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-400 dark:[&>svg]:fill-gray-300">
                    
                  </span>
                  <span>
                    <router-link to="/DataBarang">
                      Data Barang
                    </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900  hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-neutral-900">
                  </span>
                  <span>
                    <router-link to="/BarangMasuk">
                      Barang Masuk
                    </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900  hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-neutral-900">
                  </span>
                  <span>
                    <router-link to="/BarangKeluar">
                      Barang Keluar
                    </router-link>
                  </span>
                </a>
              </li>

              <li class="relative pt-4">
                <a
                  class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900  hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref>
                  <span
                    class="mr-4 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400 dark:[&>svg]:text-neutral-900">
                  </span>
                  <span>
                    <router-link to="/History">
                      History
                    </router-link>
                  </span>
                </a>
              </li>

            </ul>
          </nav>

          
      
      </div>

      
    </div>
    

  </div>
  <RouterView />
</template>


    <div class="container mx-auto p-4">
      <!-- Judul -->
      <h2 class="text-center font-bold text-xl mb-4 px-20 ml-20 py-14 border-b border-gray-">Data Barang</h2>
  
      <div class="max-w-6xl mx-auto">
        <!-- Tabel kosong -->
        <div class="bg-white max-w-5xl ml-20 pl-28">
          <table class="min-w-max w-full table-auto">
            <thead>
              <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-2 text-left border">Id Barang</th>
                <th class="py-3 px-2 text-left border">Nama Barang</th>
                <th class="py-3 px-2 text-left border">Total Stok</th>
                <th class="py-3 px-2 text-left border">Jenis Barang</th>
                <th class="py-3 px-2 text-left border"></th> <!-- Kolom untuk tombol delete -->
              </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
              <!-- Data dari array -->
              <tr v-for="(item, index) in data" :key="index">
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang"></td>
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.nama" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Nama Barang"></td>
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Total Stok"></td>
                <td class="py-3 px-2 text-left border"><input type="text" v-model="item.jenis" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Jenis Barang"></td>
                <td class="py-3 px-2 text-left border">
                  <button @click="editItem(index)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">Edit</button>
                  <button @click="deleteItem(index)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Kolom baru di bagian bawah -->
      <div class="max-w-5xl ml-20 pl-28 mt-4 flex justify-end">
        <div class="flex flex-col">
          <input type="text" v-model="newItem.id" class="border border-gray-300 rounded px-2 py-1 w-full" placeholder="Id Barang">
          <input type="text" v-model="newItem.nama" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Nama Barang">
          <input type="text" v-model="newItem.totalStok" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Total Stok">
          <input type="text" v-model="newItem.jenis" class="border border-gray-300 rounded px-2 py-1 w-full mt-2" placeholder="Jenis Barang">
          <button @click="addItem" class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mt-2">Add</button>
        </div>
      </div>
      
      <!-- Tombol "Add" -->
      <router-link to="/addcoursematerial">
        <button type="button" class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto">Add</button>
      </router-link>
  
      <!-- Komponen router-view untuk menampilkan halaman yang diarahkan -->
      <router-view />
    </div>
  </template>
  
  <script>
  // Import komponen RouterView dari Vue Router jika belum diimpor
  import { RouterView } from 'vue-router';
  
  export default {
    components: {
      RouterView,
    },
    data() {
      return {
        data: [ // contoh data
          { id: '', nama: '', totalStok: '', jenis: '' },
          { id: '', nama: '', totalStok: '', jenis: '' },
        ],
        newItem: { id: '', nama: '', totalStok: '', jenis: '' } // data baru yang akan ditambahkan
      }
    },
    methods: {
      deleteItem(index) {
        this.data.splice(index, 1);
      },
      editItem(index) {
        // Lakukan sesuatu saat tombol edit ditekan
      },
      addItem() {
        // Tambahkan newItem ke data
        this.data.push({...this.newItem});
        // Kosongkan newItem untuk persiapan input data baru
        this.newItem = { id: '', nama: '', totalStok: '', jenis: '' };
      }
    }
  };
  </script>
  
  <style>
  /* Tidak diperlukan jika menggunakan Tailwind CSS dari CDN */
  </style>
  