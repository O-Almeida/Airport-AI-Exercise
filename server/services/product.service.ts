import { IProduct } from "../models/products/product.interface";
import ProductRepository from "../models/products/product.model";

export class ProductService {
  async listAll(): Promise<IProduct[]> {
    return await ProductRepository.find();
  }
}
