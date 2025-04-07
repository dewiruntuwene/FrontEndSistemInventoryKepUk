<template>
  <LayoutKaprodi />
  <div class="app">
    <h1>All User Transactions</h1>

    <!-- Dropdown Select User -->
    <div class="user-select">
      <label for="username">Select Username:</label>
      <select id="username" v-model="selectedUsername" @change="onUsernameChange">
        <option value="" disabled>Select a username</option>
        <option v-for="user in Object.keys(users)" :key="user" :value="user">{{ user }}</option>
      </select>
    </div>

    <!-- Table of PreOrders -->
    <div v-if="selectedUsername && transactions.length" class="preorder-table">
      <h2>Transaction for {{ selectedUsername }}</h2>
      <table>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama Prasat</th>
            <th>Nama Barang</th>
            <th>Debit (PO)</th>
            <th>Kredit (Order)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ formatDate(transaction.tanggal) }}</td>
            <td>{{ transaction.nama_prasat }}</td>
            <td>{{ transaction.nama_barang }}</td>
            <td>{{ transaction.jenis_transaksi === 'Debit' ? `${transaction.jumlah} item` : '0 item' }}</td>
            <td>{{ transaction.jenis_transaksi === 'Credit' ? `${transaction.jumlah} item` : '0 item' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message for No PreOrders -->
    <div v-else>
      <p v-if="selectedUsername">No pre-orders available for the selected user.</p>
      <p v-else>Please select a user to view pre-orders.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import LayoutKaprodi from "../components/LayoutKaprodi.vue";
  
export default defineComponent({
  components: {
    LayoutKaprodi,
  },
  name: 'App',
  setup() {
    const apiUrl = import.meta.env.VITE_API_URL;

    // Reactive Data
    const users = ref<Record<string, any[]>>({});
    const selectedUsername = ref<string>('');
    const transactions = ref<any[]>([]);

    // Fetch Usernames and Transactions from API
    const fetchUserTransactions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/alltransaction`);
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching user transactions:', error);
      }
    };

    // Handle Username Change
    const onUsernameChange = () => {
      if (selectedUsername.value) {
        transactions.value = users.value[selectedUsername.value] || [];
      }
    };

    // Format Date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    };

    // Fetch Data on Mount
    onMounted(fetchUserTransactions);

    return {
      users,
      selectedUsername,
      transactions,
      onUsernameChange,
      formatDate,
    };
  },
});
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.user-select {
  margin-bottom: 20px;
}

.user-select label {
  margin-right: 10px;
}

.preorder-table {
  margin-top: 20px;
}

.preorder-table table {
  width: 100%;
  border-collapse: collapse;
}

.preorder-table th,
.preorder-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.preorder-table th {
  background-color: #f2f2f2;
}
</style>
