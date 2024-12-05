<template>
    <div>
      <button @click="showNotifications = !showNotifications" class="notification-button">Notifications</button>
      <div v-if="showNotifications" class="notification-dropdown">
        <h2 class="notification-header">Notifications</h2>
        <ul>
          <li v-for="notification in notifications" :key="notification.id" class="notification-item">
            <span class="notification-message">{{ notification.message }}</span>
            <span class="notification-date">{{ notification.date }}</span>
            <button @click="markAsRead(notification.id)" class="notification-mark-read">Mark as Read</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL; // Ganti dengan URL API Anda

// interface Notification {
//     id: number;
//     message: string;
//     date: string;
//     type: string;
//     isRead: boolean;
// }

// interface User {
//     username: string;
// }

// interface BarangPinjam {
//   kode_barang: string;
//   jumlah_barang: number;
//   nama_barang: string;
// }

// interface Transaction {
//   id_peminjam: number;
//   nama_matakuliah: string;
//   prasat: string;
//   jam_praktek: string;
//   tanggal_pengambilan: string;
//   tanggal_kembali_alat: string;
//   ruangan_lab: string;
//   status: "sukses" | "pending" | "dibatalkan";
//   users: User;
//   barangHabisPakai: BarangPinjam[];
// }


  const showNotifications = ref(false);
  const transactions = ref<Transaction[]>([]);
  const notifications = computed<Notification[]>(() => {
    const today = new Date();
    return transactions.value.map((transaction, index) => {
      const returnDate = new Date(transaction.tanggal_kembali_alat);
      const timeDiff = returnDate.getTime() - today.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      
      if (daysDiff <= 2) {
        return {
          id: index,
          message: `Tanggal kembali untuk barang pinjam ${transaction.id_peminjam} sudah dekat.`,
          date: transaction.tanggal_kembali_alat,
          type: 'reminder',
          isRead: false
        };
      }
      return null;
    }).filter(notification => notification !== null);
  });
  
  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
    }
  };
  
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${apiUrl}/dataOrderBarang`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      transactions.value = response.data.map((transaction: any): Transaction => {
        if (transaction.type === "BarangKeluar") {
          transaction.status = "sukses";
        } else if (transaction.type === "BarangPinjam") {
          transaction.status = "sukses";
        } else if (transaction.type === "PENDING") {
          transaction.status = "pending";
        } else if (transaction.type === "CANCEL") {
          transaction.status = "dibatalkan";
        }
        return transaction as Transaction;
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  
  fetchTransactions();
  </script>
  
  <style scoped>
  .notification-button {
    background: blue;
    color: white;
    padding: 10px;
    cursor: pointer;
  }
  
  .notification-button:hover {
    background: darkblue;
  }
  
  .notification-dropdown {
    position: absolute;
    right: 0;
    top: 50px;
    background: white;
    border: 1px solid #ccc;
    width: 300px;
    z-index: 1000;
  }
  
  .notification-header {
    padding: 10px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    font-weight: bold;
  }
  
  .notification-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .notification-message {
    flex: 1;
  }
  
  .notification-date {
    flex: 1;
    text-align: right;
  }
  
  .notification-mark-read {
    background: green;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .notification-mark-read:hover {
    background: darkgreen;
  }
  </style>
  