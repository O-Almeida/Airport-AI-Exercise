import { CreateProductDto } from "../dto/product/create-product.dto";
import { ProductDto } from "../dto/product/product.dto";
import { IProduct } from "../models/products/product.interface";
import ProductRepository from "../models/products/product.model";
import moment from "moment";
import { TIMEFRAME } from "../constants/moment.constants";
import _ from "lodash";
import { CustomError } from "../models/error/custom-error.model";

export class ProductService {
  async searchByMessage(
    search: string,
    lostAt: string = `${moment().format()}`
  ): Promise<IProduct[]> {
    const startDate = moment(lostAt).subtract(TIMEFRAME, "seconds").toDate();
    const endDate = moment().toDate();

    const products = await ProductRepository.find({
      $text: { $search: search },
      $and: [{ lostAt: { $gte: startDate } }, { lostAt: { $lte: endDate } }],
    })
      .select({ score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(20);

    return products;
  }

  async create(createProductDto: CreateProductDto): Promise<IProduct> {
    const product = new ProductRepository(createProductDto);
    return product.save();
  }

  async getAll(): Promise<IProduct[]> {
    return await ProductRepository.find();
  }

  async searchByKeywords(productDto: ProductDto): Promise<IProduct[]> {
    const { lostAt } = productDto;

    const startDate = moment(lostAt).subtract(TIMEFRAME, "seconds").toDate();
    const endDate = moment().toDate();

    const queryFields: { [key: string]: string } = {};

    Object.entries(productDto).forEach((element: [string, string]) => {
      if (!_.isEmpty(element[1]) && element[0] !== "lostAt") {
        queryFields[element[0]] = element[1].toLowerCase();
      }
    });

    return await ProductRepository.find().and([
      {
        lostAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      queryFields,
    ]);
  }

  async deleteById(id: string) {
    return await ProductRepository.findByIdAndDelete(id);
  }
}
