<template>

<template>
    <div class="container mx-auto p-4">
      <!-- Judul -->
      <h2 class="text-center font-bold text-xl mb-4">Keranjang Pemesanan</h2>
    
      <!-- Daftar Barang dalam Keranjang -->
      <div class="max-w-md mx-auto">
        <div v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between border-b border-gray-300 py-2">
          <div class="flex items-center">
            <span class="font-bold">{{ item.name }}</span>
            <span class="mx-2">|</span>
            <span>{{ item.quantity }}</span>
          </div>
          <div class="flex items-center">
            <button @click="decrementQuantity(index)" class="px-2 py-1 bg-gray-200 rounded-full text-gray-700 mr-2">-</button>
            <button @click="incrementQuantity(index)" class="px-2 py-1 bg-gray-200 rounded-full text-gray-700 mr-2">+</button>
            <button @click="removeItem(index)" class="px-2 py-1 bg-red-500 rounded-full text-white">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          { id: 1, name: 'Barang 1', quantity: 1 },
          { id: 2, name: 'Barang 2', quantity: 2 },
          { id: 3, name: 'Barang 3', quantity: 1 }
        ]
      };
    },
    methods: {
      incrementQuantity(index) {
        this.cartItems[index].quantity++;
      },
      decrementQuantity(index) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        }
      },
      removeItem(index) {
        this.cartItems.splice(index, 1);
      }
    }
  };
  </script>
  
  <style>
  /* Gaya tambahan sesuai kebutuhan */
  </style>
  

    <div class="container mx-auto p-4">
      <!-- Judul -->
      <h2 class="text-center font-bold text-xl mb-4">Keranjang Pemesanan</h2>
    
      <!-- Daftar Barang dalam Keranjang -->
      <div class="max-w-md mx-auto">
        <div v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between border-b border-gray-300 py-2">
          <div class="flex items-center">
            <span class="font-bold">{{ item.name }}</span>
            <span class="mx-2">|</span>
            <span>{{ item.quantity }}</span>
          </div>
          <div class="flex items-center">
            <button @click="decrementQuantity(index)" class="px-2 py-1 bg-gray-200 rounded-full text-gray-700 mr-2">-</button>
            <button @click="incrementQuantity(index)" class="px-2 py-1 bg-gray-200 rounded-full text-gray-700 mr-2">+</button>
            <button @click="removeItem(index)" class="px-2 py-1 bg-red-500 rounded-full text-white">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cartItems: [
          { id: 1, name: 'Barang 1', quantity: 1 },
          { id: 2, name: 'Barang 2', quantity: 2 },
          { id: 3, name: 'Barang 3', quantity: 1 }
        ]
      };
    },
    methods: {
      incrementQuantity(index) {
        this.cartItems[index].quantity++;
      },
      decrementQuantity(index) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        }
      },
      removeItem(index) {
        this.cartItems.splice(index, 1);
      }
    }
  };
  </script>
  
  <style>
  /* Gaya tambahan sesuai kebutuhan */
  </style>
  