import { API_ENDPOINTS } from '../../constants';
import { CreateProductRequest, Product } from '../../types';
import apiClient from '../client';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(
      API_ENDPOINTS.PRODUCTS.LIST,
    );
    return response.data;
  },
  async createProduct(data: CreateProductRequest): Promise<Product> {
    const formData = new FormData();

    // Append all fields - FormData converts everything to strings
    // The backend handles string-to-int conversion for seller
    formData.append('seller', String(data.seller));
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('purchase_price', data.purchase_price);
    formData.append('rent_price', data.rent_price);
    formData.append('rent_option', data.rent_option);

    // Append categories as individual items
    data.categories.forEach(category => {
      formData.append('categories', category);
    });

    // Append image if exists
    if (data.product_image) {
      formData.append('product_image', {
        uri: data.product_image.uri,
        type: data.product_image.type || 'image/jpeg',
        name: data.product_image.fileName || 'product.jpg',
      } as any);
    }

    const response = await apiClient.post<Product>(
      API_ENDPOINTS.PRODUCTS.CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(
      API_ENDPOINTS.PRODUCTS.DETAIL(id),
    );
    return response.data;
  },
  async updateProduct(
    id: number,
    data: Partial<CreateProductRequest>,
  ): Promise<Product> {
    const formData = new FormData();

    // Append fields that exist
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.purchase_price)
      formData.append('purchase_price', data.purchase_price);
    if (data.rent_price) formData.append('rent_price', data.rent_price);
    if (data.rent_option) formData.append('rent_option', data.rent_option);

    // Append categories if provided
    if (data.categories) {
      data.categories.forEach(category => {
        formData.append('categories', category);
      });
    }

    // Append image if provided
    if (data.product_image) {
      formData.append('product_image', {
        uri: data.product_image.uri,
        type: data.product_image.type || 'image/jpeg',
        name: data.product_image.fileName || 'product.jpg',
      } as any);
    }

    const response = await apiClient.patch<Product>(
      API_ENDPOINTS.PRODUCTS.UPDATE(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },
};
