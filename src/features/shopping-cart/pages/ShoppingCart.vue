<template>
  <div class="table-container">
    <div v-if="cartItems.length > 0">
      <div class="title">Shopping Cart</div>
      <div class="table">
        <div class="row">Nr. crt</div>
        <div class="row">Quantity</div>
        <div class="row">Pizza Name</div>
        <div class="row">Size</div>
        <div class="row">Price</div>
        <div class="row">Total</div>
      </div>
      <div class="table" v-for="(item, index) in cartItems" :key="index">
        <div class="row">{{ index + 1 }}</div>

        <div class="row">
          <button class="button1" @click="decreaseQuantity(item)">
            -
          </button>
          <span>{{ item.quantity }}</span>
          <button class="button1" @click="increaseQuantity(item)">
            +
          </button>
        </div>
        <div class="row">{{ item.name }}</div>
        <div class="row">{{ item.size }}</div>
        <div class="row">{{ parseFloat(item.price).toFixed(2) + " RON" }}</div>
        <div class="row">
          {{ parseFloat(item.quantity * item.price).toFixed(2) + " RON" }}
        </div>
      </div>
      <div class="class">
        <p>
          <strong
            >Order total:
            {{ parseFloat(totalPrice).toFixed(2) + " RON" }}</strong
          >
        </p>
      </div>

      <div>
        <w-button outline bg-color="green" class="button1" @click="placeOrder"
          >Place Order</w-button
        >
      </div>

      <div>
        <w-button bg-color="green" outline class="button" @click="deleteCart()"
          >Clear cart</w-button
        >
      </div>
    </div>

    <div class="title" v-else>
      <p>{{ cartEmptyText }}</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {
  computed,
  // ref
} from "vue";

export default {
  setup() {
    let cartEmptyText = "Your shopping cart is empty!";

    const store = useStore();

    let cartItems = computed(() => store.getters["menuModule/getAllCartItems"]);

    let totalPrice = computed(() => store.getters["menuModule/cartTotalPrice"]);

    // const orderTotal = computed(() => {
    //   let totalCost = 0;
    //   for (let item in cartItems.value) {
    //     let individualItem = cartItems.value[item];
    //     totalCost += individualItem.quantity * individualItem.price;
    //   }
    //   return parseFloat(totalCost).toFixed(2) + " RON";
    // });

    function placeOrder() {
      cartItems = [];
      cartEmptyText = "Thank you for your order!";
    }

    function deleteCart() {
      store.dispatch("menuModule/resetCartState");
    }

    function increaseQuantity(item) {

      store.dispatch("menuModule/increaseQuantity", { item});
    }

    function decreaseQuantity(item) {

      store.dispatch("menuModule/decreaseQuantity", { item});

    }

    return {
      cartEmptyText,
      cartItems,
      totalPrice,
      // orderTotal,
      placeOrder,
      deleteCart,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>

<style scoped>
.table-container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1em;
  width: 95%;
}
.table {
  display: flex;
  flex-flow: row wrap;
}
.row {
  width: calc(100% / 7);
  text-align: center;
  padding: 1%;
}
.warning {
  color: #9f6000;
  background-color: #feefb3;
}
.title {
  border-bottom: 1px solid #e1e8ee;
  padding: 3%;
  margin: 2%;
  color: #5e6977;
  font-size: 18px;
  font-weight: 400;
}
.button {
  background-color: rgb(240, 49, 49);
  border: none;
  color: white;
  padding: 3px 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 13px;
  margin: 10px 10px;
}
.button1 {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 3px 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 13px;
  margin: 10px 10px;
}
.orderButton {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 34px;
  text-align: center;
  text-decoration: none;
}
</style>
