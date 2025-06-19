// User interface
export const createUser = (data) => ({
  id: "",
  name: "",
  email: "",
  phone: "",
  profileImage: undefined,
  university: "",
  createdAt: new Date(),
  ...data,
});

// Item interface
export const createItem = (data) => ({
  id: "",
  title: "",
  description: "",
  price: 0,
  category: "",
  condition: "good",
  images: [],
  sellerId: "",
  sellerName: "",
  sellerPhone: "",
  isSold: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...data,
});

// Auth context interface
export const createAuthContext = () => ({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateProfile: () => {},
});
