<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <RouterView />
</template>
  
<script >
  export default {
    data() {
      return {
        items: [
          { id: 1, name: 'Item 1', quantity: 10, price: 20.5 },
          { id: 2, name: 'Item 2', quantity: 15, price: 30.75 },
          { id: 3, name: 'Item 3', quantity: 5, price: 15.25 }
        ]
      };
    }
  };
  </script>
  

  