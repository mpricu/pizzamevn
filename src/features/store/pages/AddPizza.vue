<template lang="">
  <w-card title="Add pizza" title-class="blue-light5--bg"> <w-form
  @submit.prevent="addPizza"> <w-input label="ID" id="id" name="id" v-model="pizza.id"
  :validators="[validators.required]"> </w-input> <w-input label="Name" id="name"
  name="name" v-model="pizza.name" :validators="[validators.required]"> </w-input>
  <w-input label="Description" id="description" name="description"
  v-model="pizza.description" :validators="[validators.required]"> </w-input> <w-input
  label="Vegan" id="vegan" name="vegan" v-model="pizza.vegan"
  :validators="[validators.required]"> </w-input> <w-input label="Size" id="size1"
  name="size" v-model="pizza.options[0].size" :validators="[validators.required]">
  </w-input> <w-input label="Price" id="price1" name="price1"
  v-model="pizza.options[0].price" :validators="[validators.required]"> </w-input>
  <w-input label="Size" id="size2" value="40 cm" name="size2"
  v-model="pizza.options[1].size" :validators="[validators.required]"> </w-input> <w-input
  label="Price" id="price2" name="price2" v-model="pizza.options[1].price"
  :validators="[validators.required]"> </w-input> <w-button type="submit"
  bg-color="success">Add pizza</w-button><w-button bg-color="orange"
  style="margin-left:10px" @click="$router.push('/pizza-menu')">Cancel</w-button></w-form>
  </w-card>
</template>
<script>
import pizzaService from "../services/pizza.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const validators = {
      required: (value) => !!value || "This field is required",
    };

    const pizza = ref({
      id: "",
      name: "",
      description: "",
      vegan: "",
      options: [
        { size: "20 cm", price: "" },
        { size: "40 cm", price: "" },
      ],
    });

    const addPizza = () => {
      pizzaService.addPizza(pizza.value);
      router.push("/pizza-menu");
    };

    return {
      validators,
      addPizza,
      pizza,
    };
  },
};
</script>
<style lang="scss">
.w-card {
  width: 50%;
  margin: auto;
}
</style>
