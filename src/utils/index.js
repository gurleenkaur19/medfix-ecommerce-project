export const navOptions = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "baby-care",
    label: "Baby Care",
    path: "/product/listing/baby-care",
  },
  {
    id: "test-kit",
    label: "Test Kit",
    path: "/product/listing/test-kit",
  },
  {
    id: "beauty",
    label: "Beauty",
    path: "/product/listing/beauty",
  },
];
export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "input",
  },
  {
    id: "role",
    label: "Role",
    type: "",
    placeholder: "",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "Customer",
      },
    ],
  },
];
export const loginFormControls = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "test-kit",
        label: "Test Kit",
      },
      {
        id: "beauty",
        label: "Beauty",
      },
      {
        id: "baby-care",
        label: "Baby Care",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
];

// export const AvailableSizes = [
//   {
//     id: "s",
//     label: "S",
//   },
//   {
//     id: "m",
//     label: "M",
//   },
//   {
//     id: "l",
//     label: "L",
//   },
// ];
