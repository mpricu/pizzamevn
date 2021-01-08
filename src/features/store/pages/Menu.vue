<template>
  <div class="card-container">
    <div>
      <h3>
        <strong>Please choose from our delicious menu!</strong>
      </h3>
    </div>
    <div class="table">
      <div class="row2">
        <w-button
          v-bind:title="actionsAddToolTip"
          bg-color="success"
          @click="$router.push('/add-pizza')"
          >Add new pizza</w-button
        >
      </div>
      <div class="row">Size</div>
      <div class="row">Price</div>
      <div class="row" :style="[styleObject, styleObjectTwo]">Add to basket</div>
    </div>
    <div v-for="item in menuItems" :key="item.id">
      <div class="row" :class="item.vegan ? 'veganFood' : ''" v-if="isAdmin">
        <strong>{{ item.name }}</strong>
      </div>
      <div v-else class="table">
        <div class="row">
          <!-- <router-link :to="{ name: 'EditPizza', params: { id: item._id } }"> -->
          <w-button
            v-bind:title="actionsEditToolTip"
            bg-color="success"
            icon="wi-star"
            @click="$router.push({ name: 'EditPizza', params: { id: item._id } })"
          >
          </w-button>
          <!-- </router-link> -->
          <w-button
            v-bind:title="actionsDeleteToolTip"
            bg-color="error"
            icon="wi-cross"
            @click="deletePizza(item._id)"
          ></w-button>
        </div>
        <div class="row"></div>
        <strong>{{ item.name }}</strong>
        <div class="leaf" v-show="item.vegan"></div>
        <div class="row"></div>
        <div class="row"></div>
      </div>
      <div class="table" v-for="option in item.options" :key="option.id">
        <div class="row2"></div>
        <div class="row">{{ option.size }}</div>
        <div class="row">
          {{ parseFloat(option.price).toFixed(2) + " RON" }}
        </div>
        <div class="row">
          <button class="button" type="button" @click="addToCart(item, option)">+</button>
          <button class="button" type="button" @click="deleteFromCart(item, option)">
            -
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import pizzaService from "../services/pizza.service";

export default {
  setup() {
    let menuItems = ref([]);
    const actionsDeleteToolTip = "Delete pizza";
    const actionsAddToolTip = "Add pizza";
    const actionsEditToolTip = "Edit pizza";

    const isAdmin = false;
    const color = "green";

    const styleObject = {
      color: "green",
      fontSize: "20px",
    };

    const styleObjectTwo = {
      color: "green",
      fontSize: "20px",
    };

    // fetch("http://localhost:3000/menuItems")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     menuItems.value = data;
    //   });

    onMounted(async () => {
      await pizzaService
        .getAllPizzas()
        .then((response) => response.json())
        .then((data) => {
          menuItems.value = data;
          // console.log("data", data);
        })
        .catch(function (error) {
          console.log("Found error: \n", error);
        });
    });

    const store = useStore();

    let cartItems = computed(() => store.getters["menuModule/getAllCartItems"]);

    function addToCart(item, option) {
      store.dispatch("menuModule/addToOrder", { item, option });
    }

    function deleteFromCart(item, option) {
      store.dispatch("menuModule/deleteFromOrder", { item, option });
    }

    function blurred() {
      console.log(`Blurry lines ${JSON.stringify(this.menuItems)}`);
    }

    function deletePizza(id) {
      pizzaService.deletePizza(id);
      pizzaService
        .getAllPizzas()
        .then((response) => response.json())
        .then((data) => {
          menuItems.value = data;
        })
        .catch(function (error) {
          console.log("Found error: \n", error);
        });
    }

    return {
      menuItems,
      actionsAddToolTip,
      actionsEditToolTip,
      actionsDeleteToolTip,
      isAdmin,
      color,
      styleObject,
      styleObjectTwo,
      addToCart,
      deleteFromCart,
      blurred,
      cartItems,
      deletePizza,
    };
  },
};
</script>

<style scoped>
.card-container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 90%;
  /* height: 70vh; */
  border-radius: 5px;
  padding: 1em;
}
.table {
  display: flex;
  flex-flow: row wrap;
  padding-top: 1%;
}
.row {
  width: calc(100% / 4);
  text-align: center;
  /* padding-top: 1%; */
}
.row2 {
  width: calc(100% / 8);
  text-align: center;
  /* padding-top: 1%; */
}
.veganFood {
  margin: 1em;
  padding: 0.5em;
  border: 1px dotted green;
  color: green;
}
.leaf {
  width: 20px;
  height: 20px;
  background-color: #a0de21;
  border-radius: 20px 0px;
}
.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 3px 10px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 13px;
  margin-right: 0.5em;
}
.review {
  background: #eee;
  opacity: 0.8;
  max-width: 60%;
  margin: 0 auto;
  padding: 20px 0;
}
</style>
