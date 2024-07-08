import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192"
}) 

export const getHeader = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register-user", registration);
    return response.data;
  } catch (error) {
    if(error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if(response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}
export async function updateUser(userId, value) {
	try {
		const response = await api.put(`/users/${userId}`, value, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

export async function getUser(userId) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}
export async function getAllUser() {
	try {
		const response = await api.get(`/users/all`, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}
export async function getAllRole() {
	try {
		const response = await api.get(`/roles/all-roles`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function changePassword(email, password) {
	try {
		const response = await api.put(`/users/change-password/${email}`, password, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllBrands() {
	try {
		const response = await api.get(`/brands/all`)
		return response.data
	} catch (error) {
		throw error
	}
}
export async function getBrand(id) {
	try {
		const response = await api.get(`/brands/${id}`)
		return response.data
	} catch (error) {
		throw error
	}
}


export async function createBrand(name) {
	try {
		const response = await api.post(`/brands`, name, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllCategories() {
	try {
		const response = await api.get(`/categories/all`)
		return response.data
	} catch (error) {
		throw error
	}
}

export async function createCategory(name) {
	try {
		const response = await api.post(`/categories`, name, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function createProduct(values) {
  try {
    const file = values.file.fileList[0]?.originFileObj || values.file.file;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    formData.append("brandId", values.brandId);
    formData.append("file", file);
		const response = await api.post(`/products`, formData, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllProducts() {
  try {
		const response = await api.get(`/products`)
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getProductById(id) {
  try {
		const response = await api.get(`/products/${id}`)
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getProductsByBrandId(id) {
  try {
		const response = await api.get(`/products/brand/${id}`)
		return response.data
	} catch (error) {
		throw error
	}
}


export async function updateProduct(id, values) {
	try {
		const file = values.file?.fileList[values.file.fileList.length - 1]?.originFileObj || values.file?.file || null;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId?.key || values.categoryId);
    formData.append("brandId", values.brandId?.key || values.brandId);
    formData.append("file", file);
		const response = await api.put(`/products/${id}`, formData, 
		{
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function deleteProduct(id) {
	try {
		const ids = [id];
		const response = await api.delete(`/products/${ids}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function createOrder(order) {
	try {
		const response = await api.post(`/orders`, order)
		return response.data
	} catch (error) {
		throw error
	}
}

export async function deleteOrder(id) {
	try {
		const response = await api.delete(`/orders/${id}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function confirmOrder(id, status) {
	try {
		const formData = new FormData();
    formData.append("status", status);
		const response = await api.put(`/orders/${id}`, formData, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllOrder() {
	try {
		const response = await api.get(`/orders`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllOrderDetail() {
	try {
		const response = await api.get(`/order_details/all`, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}
export async function findProducts(search) {
	try {
		  const response = await api.get(`/products/search`, {
			  headers: getHeader(true),
			  params: search
		  })
		  return response.data
	  } catch (error) {
		  throw error
	}
}
export async function getOrderDetailByOrderId(orderId) {
	try {
		const response = await api.get(`/order_details/order/${orderId}`, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getOrderByEmail(email) {
	try {
		const response = await api.get(`/orders/user/${email}`, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function createContact(contact) {
	try {
		const response = await api.post(`/contacts`, contact)
		return response.data
	} catch (error) {
		throw error
	}
}

export async function getAllContact() {
	try {
		const response = await api.get(`/contacts`, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}

export async function confirmContact(id) {
	try {
		const name = "confirm"
		const response = await api.put(`/contacts/${id}`, name, {
			headers: getHeader(true)
		})
		return response.data
	} catch (error) {
		throw error
	}
}






