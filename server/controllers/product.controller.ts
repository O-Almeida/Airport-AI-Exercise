import { CreateProductDto } from "../dto/product/create-product.dto";
import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CustomError } from "../models/error/custom-error.model";
import _ from "lodash";
import { ProductDto } from "../dto/product/product.dto";

const productService = new ProductService();

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const createProductDto: CreateProductDto = req.body;
      const product = await productService.create(createProductDto);
      return res.status(201).json(product);
    } catch (error: any) {
      throw new CustomError("Something went wrong creating the product.", 500, {
        message: error.message,
      });
    }
  }

  async searchByMessage(req: Request, res: Response) {
    try {
      const { search, lostAt } = req.query;

      const products = await productService.searchByMessage(
        search as string,
        lostAt as string
      );
      return res.status(200).json(products);
    } catch (error: any) {
      throw new CustomError(
        "Something went wrong searching by products.",
        500,
        { message: error.message }
      );
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const deletedProduct = await productService.deleteById(id);

      if (!deletedProduct)
        return res
          .status(400)
          .json({ message: `${id} doesn't correspond to any product.` });

      return res.json({ message: "Product deleted with success.", id: id });
    } catch (error: any) {
      throw new CustomError("Something went wrond deleting the product.", 500, {
        message: error.message,
      });
    }
  }

  async showProducts(req: Request, res: Response) {
    try {
      if (_.isEmpty(req.query)) {
        const products = await productService.getAll();
        return res.status(200).json(products);
      } else {
        const { id, type, brand, model, location, lostAt } = req.query;

        const productDto: ProductDto = new ProductDto(
          lostAt as string,
          id as string,
          type as string,
          brand as string,
          model as string,
          location as string
        );

        const products = await productService.searchByKeywords(productDto);
        return res.status(200).json(products);
      }
    } catch (error: any) {
      throw new CustomError("Something went wrong searching products", 500, {
        message: error.message,
      });
    }
  }
}
